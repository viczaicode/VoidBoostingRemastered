<?php

namespace Tests\Feature\Api;

use App\Models\Order;
use App\Models\Service;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class AdminApiTest extends TestCase
{
    use RefreshDatabase;

    private function createService(string $title = 'Coaching'): Service
    {
        return Service::create([
            'title' => $title,
            'description' => 'Desc',
            'photo' => '/img/service.png',
            'status' => 'active',
        ]);
    }

    private function createOrder(Service $service, int $buyerId, ?int $boosterId = null, string $status = 'pending'): Order
    {
        return Order::create([
            'service_id' => $service->service_id,
            'buyer_id' => $buyerId,
            'booster_id' => $boosterId,
            'rank_from' => 'Gold IV',
            'rank_to' => 'Platinum IV',
            'price' => 140,
            'status' => $status,
        ]);
    }

    public function test_non_admin_cannot_access_admin_orders_endpoint(): void
    {
        $user = User::factory()->create(['role' => 1]);
        Sanctum::actingAs($user);

        $response = $this->getJson('/api/orders');

        $response
            ->assertForbidden()
            ->assertJsonPath('message', 'Unauthorized');
    }

    public function test_admin_can_list_orders_with_relations(): void
    {
        $admin = User::factory()->create(['role' => 2]);
        $buyer = User::factory()->create(['role' => 0]);
        $booster = User::factory()->create(['role' => 1]);
        $service = $this->createService();

        $order = $this->createOrder($service, $buyer->user_id, $booster->user_id, 'in_progress');

        Sanctum::actingAs($admin);

        $response = $this->getJson('/api/orders');

        $response
            ->assertOk()
            ->assertJsonCount(1)
            ->assertJsonPath('0.order_id', $order->order_id)
            ->assertJsonPath('0.service.service_id', $service->service_id)
            ->assertJsonPath('0.buyer.user_id', $buyer->user_id)
            ->assertJsonPath('0.booster.user_id', $booster->user_id);
    }

    public function test_admin_can_update_order_status_back_to_pending(): void
    {
        $admin = User::factory()->create(['role' => 2]);
        $buyer = User::factory()->create(['role' => 0]);
        $service = $this->createService();

        $order = $this->createOrder($service, $buyer->user_id, null, 'completed');

        Sanctum::actingAs($admin);

        $response = $this->patchJson('/api/orders/'.$order->order_id, [
            'status' => 'pending',
        ]);

        $response
            ->assertOk()
            ->assertJsonPath('status', 'pending');

        $this->assertDatabaseHas('orders', [
            'order_id' => $order->order_id,
            'status' => 'pending',
        ]);
    }

    public function test_admin_can_assign_booster_to_order(): void
    {
        $admin = User::factory()->create(['role' => 2]);
        $buyer = User::factory()->create(['role' => 0]);
        $booster = User::factory()->create(['role' => 1]);
        $service = $this->createService();

        $order = $this->createOrder($service, $buyer->user_id, null, 'pending');

        Sanctum::actingAs($admin);

        $response = $this->patchJson('/api/orders/'.$order->order_id, [
            'booster_id' => $booster->user_id,
        ]);

        $response
            ->assertOk()
            ->assertJsonPath('booster_id', $booster->user_id);
    }

    public function test_admin_update_order_validates_status_values(): void
    {
        $admin = User::factory()->create(['role' => 2]);
        $buyer = User::factory()->create(['role' => 0]);
        $service = $this->createService();
        $order = $this->createOrder($service, $buyer->user_id, null, 'pending');

        Sanctum::actingAs($admin);

        $response = $this->patchJson('/api/orders/'.$order->order_id, [
            'status' => 'not-valid',
        ]);

        $response->assertUnprocessable();
    }

    public function test_admin_can_delete_order(): void
    {
        $admin = User::factory()->create(['role' => 2]);
        $buyer = User::factory()->create(['role' => 0]);
        $service = $this->createService();
        $order = $this->createOrder($service, $buyer->user_id, null, 'pending');

        Sanctum::actingAs($admin);

        $response = $this->deleteJson('/api/orders/'.$order->order_id);

        $response
            ->assertOk()
            ->assertJsonPath('message', 'Order deleted');

        $this->assertDatabaseMissing('orders', ['order_id' => $order->order_id]);
    }

    public function test_admin_can_list_users(): void
    {
        $admin = User::factory()->create(['role' => 2]);
        User::factory()->count(2)->create(['role' => 0]);

        Sanctum::actingAs($admin);

        $response = $this->getJson('/api/users');

        $response->assertOk();
        $this->assertGreaterThanOrEqual(3, count($response->json()));
    }

    public function test_admin_can_update_user_role(): void
    {
        $admin = User::factory()->create(['role' => 2]);
        $user = User::factory()->create(['role' => 0]);

        Sanctum::actingAs($admin);

        $response = $this->patchJson('/api/users/'.$user->user_id.'/role', [
            'role' => 1,
        ]);

        $response
            ->assertOk()
            ->assertJsonPath('user.role', 1);

        $this->assertDatabaseHas('users', [
            'user_id' => $user->user_id,
            'role' => 1,
        ]);
    }

    public function test_admin_role_update_rejects_invalid_role_value(): void
    {
        $admin = User::factory()->create(['role' => 2]);
        $user = User::factory()->create(['role' => 0]);

        Sanctum::actingAs($admin);

        $response = $this->patchJson('/api/users/'.$user->user_id.'/role', [
            'role' => 7,
        ]);

        $response->assertStatus(400);
    }

    public function test_admin_cannot_delete_own_account(): void
    {
        $admin = User::factory()->create(['role' => 2]);
        Sanctum::actingAs($admin);

        $response = $this->deleteJson('/api/users/'.$admin->user_id);

        $response
            ->assertStatus(422)
            ->assertJsonPath('message', 'You cannot delete your own account.');
    }

    public function test_admin_can_manage_services_create_and_delete(): void
    {
        $admin = User::factory()->create(['role' => 2]);
        Sanctum::actingAs($admin);

        $createResponse = $this->postJson('/api/services', [
            'title' => 'Duo Queue',
            'description' => 'Play together',
            'photo' => '/img/duo.png',
        ]);

        $createResponse
            ->assertOk()
            ->assertJsonPath('title', 'Duo Queue')
            ->assertJsonPath('status', 'active');

        $serviceId = $createResponse->json('service_id');

        $deleteResponse = $this->deleteJson('/api/services/'.$serviceId);

        $deleteResponse
            ->assertOk()
            ->assertJsonPath('message', 'Service deleted');

        $this->assertDatabaseMissing('services', ['service_id' => $serviceId]);
    }

    public function test_non_admin_cannot_manage_services(): void
    {
        $booster = User::factory()->create(['role' => 1]);
        Sanctum::actingAs($booster);

        $createResponse = $this->postJson('/api/services', [
            'title' => 'Duo Queue',
            'description' => 'Play together',
            'photo' => '/img/duo.png',
        ]);

        $createResponse->assertForbidden();
    }
}
