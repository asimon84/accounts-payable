<?php

namespace Tests\Integration\API;

use App\Models\Invoice;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ReportsTest extends TestCase
{
    use RefreshDatabase;

    public function test_unauthorized_get_invoice(): void
    {
        $response = $this->get('/api/reports/summary');
        $response = json_decode($response->getContent(), true);

        $this->assertEmpty($response['invoices']);
    }

    public function test_get_report_summary(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->get('/api/reports/summary');
        $response = json_decode($response->getContent(), true);

        $this->assertNotNull($response['invoices']);
    }
}
