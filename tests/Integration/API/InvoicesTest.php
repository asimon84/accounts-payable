<?php

namespace Tests\Integration\API;

use App\Models\Invoice;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class InvoicesTest extends TestCase
{
    use RefreshDatabase;

    public function test_unauthorized_get_invoice(): void
    {
        $invoice = Invoice::factory()->create();

        $response = $this->get('/api/invoice/'.$invoice->id);
        $response = json_decode($response->getContent(), true);

        $this->assertNull($response);

    }

    public function test_update_invoice(): void
    {
        $data = [
            'customer_name' => 'Test Name',
        ];

        $user = User::factory()->create();
        $invoice = Invoice::factory()->create();

        $this->actingAs($user)->put('/api/invoice/'.$invoice->id, $data);

        $response = $this->actingAs($user)->get('/api/invoice/'.$invoice->id);
        $response = json_decode($response->getContent(), true);

        $this->assertEquals($response['customer_name'], $data['customer_name']);

    }
}
