<?php

namespace Tests\Integration\API;

use App\Models\Invoice;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PaymentsTest extends TestCase
{
    use RefreshDatabase;

    public function test_unauthorized_post_payments(): void
    {
        $response = $this->post('/api/payments/');
        $response = json_decode($response->getContent(), true);

        $this->assertNull($response);
    }

    public function test_post_payments(): void
    {
        $user = User::factory()->create();
        $invoice = Invoice::factory()->create();

        $response = $this->actingAs($user)->post('/api/payments/', ['invoiceId' => $invoice->id, 'amount' => 123]);
        $response = json_decode($response->getContent(), true);

        $this->assertNotNull($response);
    }
}
