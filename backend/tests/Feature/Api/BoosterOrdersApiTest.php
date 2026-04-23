<?php

namespace Tests\Feature\Api;

use App\Models\Order;
use App\Models\Service;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class BoosterOrdersApiTest extends TestCase
{
    use RefreshDatabase;

    private function createService(): Service
    {
        return Service::create([
            'title' => 'Boosting above masters',
            'description' => 'Desc',
            'photo' => '/img/b.png',
            'status' => 'active',
        ]);
    }

    private function createOrder(Service $service, int $buyerId, ?int $boosterId = null, string $status = 'pending'): Order
    {
        return Order::create([
            'service_id' => $service->service_id,
            'buyer_id' => $buyerId,
            'booster_id' => $boosterId,
            'rank_from' => 'Diamond IV',
            'rank_to' => 'Master',
            'price' => 300,
            'status' => $status,
        ]);
    }

    public function test_non_booster_cannot_access_booster_orders_endpoint(): void
    {
        $user = User::factory()->create(['role' => 0]);
        Sanctum::actingAs($user);

        $response = $this->getJson('/api/booster/orders');

        $response
            ->assertForbidden()
            ->assertJsonPath('message', 'Unauthorized');
    }

    public function test_booster_can_list_unassigned_and_own_orders_only(): void
    {
        $booster = User::factory()->create(['role' => 1]);
        $otherBooster = User::factory()->create(['role' => 1]);
        $buyer = User::factory()->create(['role' => 0]);
        $service = $this->createService();

        $unassigned = $this->createOrder($service, $buyer->user_id, null, 'pending');
        $mine = $this->createOrder($service, $buyer->user_id, $booster->user_id, 'in_progress');
        $others = $this->createOrder($service, $buyer->user_id, $otherBooster->user_id, 'in_progress');

        Sanctum::actingAs($booster);

        $response = $this->getJson('/api/booster/orders');

        $response->assertOk()->assertJsonCount(2);

        $orderIds = collect($response->json())->pluck('order_id');
        $this->assertTrue($orderIds->contains($unassigned->order_id));
        $this->assertTrue($orderIds->contains($mine->order_id));
        $this->assertFalse($orderIds->contains($others->order_id));
    }

    public function test_booster_can_claim_unassigned_order_and_status_switches_to_in_progress(): void
    {
        $booster = User::factory()->create(['role' => 1]);
        $buyer = User::factory()->create(['role' => 0]);
        $service = $this->createService();

        $order = $this->createOrder($service, $buyer->user_id, null, 'pending');

        Sanctum::actingAs($booster);

        $response = $this->postJson('/api/booster/orders/'.$order->order_id.'/assign');

        $response
            ->assertOk()
            ->assertJsonPath('booster_id', $booster->user_id)
            ->assertJsonPath('status', 'in_progress');
    }

    public function test_booster_cannot_claim_order_assigned_to_other_booster(): void
    {
        $booster = User::factory()->create(['role' => 1]);
        $otherBooster = User::factory()->create(['role' => 1]);
        $buyer = User::factory()->create(['role' => 0]);
        $service = $this->createService();

        $order = $this->createOrder($service, $buyer->user_id, $otherBooster->user_id, 'in_progress');

        Sanctum::actingAs($booster);

        $response = $this->postJson('/api/booster/orders/'.$order->order_id.'/assign');

        $response
            ->assertStatus(409)
            ->assertJsonPath('message', 'This order is already assigned to another booster.');
    }

    public function test_booster_can_update_status_only_on_assigned_orders(): void
    {
        $booster = User::factory()->create(['role' => 1]);
        $otherBooster = User::factory()->create(['role' => 1]);
        $buyer = User::factory()->create(['role' => 0]);
        $service = $this->createService();

        $ownOrder = $this->createOrder($service, $buyer->user_id, $booster->user_id, 'in_progress');
        $otherOrder = $this->createOrder($service, $buyer->user_id, $otherBooster->user_id, 'in_progress');

        Sanctum::actingAs($booster);

        $okResponse = $this->patchJson('/api/booster/orders/'.$ownOrder->order_id.'/status', [
            'status' => 'completed',
        ]);

        $okResponse
            ->assertOk()
            ->assertJsonPath('status', 'completed');

        $forbiddenResponse = $this->patchJson('/api/booster/orders/'.$otherOrder->order_id.'/status', [
            'status' => 'completed',
        ]);

        $forbiddenResponse
            ->assertForbidden()
            ->assertJsonPath('message', 'You can only update orders assigned to you.');
    }

    public function test_booster_status_update_validates_allowed_values(): void
    {
        $booster = User::factory()->create(['role' => 1]);
        $buyer = User::factory()->create(['role' => 0]);
        $service = $this->createService();

        $order = $this->createOrder($service, $buyer->user_id, $booster->user_id, 'in_progress');

        Sanctum::actingAs($booster);

        $response = $this->patchJson('/api/booster/orders/'.$order->order_id.'/status', [
            'status' => 'pending',
        ]);

        $response->assertUnprocessable();
    }
}
