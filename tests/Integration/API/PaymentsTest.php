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
        $response = $this->post('/api/payments/');
        $response = json_decode($response->getContent(), true);

        $this->assertNull($response);
    }
}
