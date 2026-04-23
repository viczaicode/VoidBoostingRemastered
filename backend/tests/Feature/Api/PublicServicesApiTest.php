<?php

namespace Tests\Feature\Api;

use App\Models\Service;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PublicServicesApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_anyone_can_list_services(): void
    {
        Service::create([
            'title' => 'Boosting below masters',
            'description' => 'Desc',
            'photo' => '/img/a.png',
            'status' => 'active',
        ]);

        $response = $this->getJson('/api/services');

        $response
            ->assertOk()
            ->assertJsonCount(1)
            ->assertJsonPath('0.title', 'Boosting below masters');
    }

    public function test_anyone_can_get_single_service(): void
    {
        $service = Service::create([
            'title' => 'Coaching',
            'description' => 'Desc',
            'photo' => '/img/c.png',
            'status' => 'active',
        ]);

        $response = $this->getJson('/api/services/'.$service->service_id);

        $response
            ->assertOk()
            ->assertJsonPath('service_id', $service->service_id)
            ->assertJsonPath('title', 'Coaching');
    }

    public function test_service_show_returns_404_for_unknown_id(): void
    {
        $response = $this->getJson('/api/services/999999');

        $response->assertNotFound();
    }
}
