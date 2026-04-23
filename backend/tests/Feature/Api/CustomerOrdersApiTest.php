<?php

namespace Tests\Feature\Api;

use App\Models\Order;
use App\Models\Service;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class CustomerOrdersApiTest extends TestCase
{
    use RefreshDatabase;

    private function createService(): Service
    {
        return Service::create([
            'title' => 'Boosting below masters',
            'description' => 'Desc',
            'photo' => '/img/a.png',
            'status' => 'active',
        ]);
    }

    public function test_guest_cannot_create_order(): void
    {
        $service = $this->createService();

        $response = $this->postJson('/api/orders', [
            'service_id' => $service->service_id,
            'rank_from' => 'Gold IV',
            'rank_to' => 'Gold I',
            'price' => 100,
        ]);

        $response->assertUnauthorized();
    }

    public function test_authenticated_user_can_create_order(): void
    {
        $user = User::factory()->create(['role' => 0]);
        $service = $this->createService();

        Sanctum::actingAs($user);

        $response = $this->postJson('/api/orders', [
            'service_id' => $service->service_id,
            'rank_from' => 'Gold IV',
            'rank_to' => 'Gold I',
            'price' => 99.99,
            'order_details' => ['server' => 'EUW'],
        ]);

        $response
            ->assertCreated()
            ->assertJsonPath('status', 'pending')
            ->assertJsonPath('buyer_id', $user->user_id)
            ->assertJsonPath('booster_id', null);

        $this->assertDatabaseHas('orders', [
            'buyer_id' => $user->user_id,
            'service_id' => $service->service_id,
            'status' => 'pending',
        ]);
    }

    public function test_order_create_requires_valid_payload(): void
    {
        $user = User::factory()->create(['role' => 0]);
        Sanctum::actingAs($user);

        $response = $this->postJson('/api/orders', [
            'rank_from' => 'Gold IV',
            'rank_to' => 'Gold I',
            'price' => -1,
        ]);

        $response->assertUnprocessable();
        $response->assertJsonValidationErrors(['service_id', 'price']);
    }

    public function test_authenticated_user_can_fetch_only_own_orders(): void
    {
        $buyer = User::factory()->create(['role' => 0]);
        $otherBuyer = User::factory()->create(['role' => 0]);
        $service = $this->createService();

        $ownOrder = Order::create([
            'service_id' => $service->service_id,
            'buyer_id' => $buyer->user_id,
            'booster_id' => null,
            'rank_from' => 'Silver II',
            'rank_to' => 'Gold IV',
            'price' => 50,
            'status' => 'pending',
        ]);

        Order::create([
            'service_id' => $service->service_id,
            'buyer_id' => $otherBuyer->user_id,
            'booster_id' => null,
            'rank_from' => 'Silver II',
            'rank_to' => 'Gold IV',
            'price' => 60,
            'status' => 'pending',
        ]);

        Sanctum::actingAs($buyer);

        $response = $this->getJson('/api/my-orders');

        $response->assertOk()->assertJsonCount(1);
        $response->assertJsonPath('0.order_id', $ownOrder->order_id);
    }

    public function test_guest_cannot_fetch_my_orders(): void
    {
        $response = $this->getJson('/api/my-orders');

        $response->assertUnauthorized();
    }

    public function test_my_orders_response_contains_related_models(): void
    {
        $buyer = User::factory()->create(['role' => 0]);
        $booster = User::factory()->create(['role' => 1]);
        $service = $this->createService();

        Order::create([
            'service_id' => $service->service_id,
            'buyer_id' => $buyer->user_id,
            'booster_id' => $booster->user_id,
            'rank_from' => 'Platinum IV',
            'rank_to' => 'Diamond IV',
            'price' => 210,
            'status' => 'in_progress',
        ]);

        Sanctum::actingAs($buyer);

        $response = $this->getJson('/api/my-orders');

        $response
            ->assertOk()
            ->assertJsonPath('0.service.service_id', $service->service_id)
            ->assertJsonPath('0.buyer.user_id', $buyer->user_id)
            ->assertJsonPath('0.booster.user_id', $booster->user_id);
    }
}
