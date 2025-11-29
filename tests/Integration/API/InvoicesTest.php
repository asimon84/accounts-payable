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
        $data = [
            'customer_name' => 'Test Name',
        ];

        $user = User::factory()->create();
        $invoice = Invoice::factory()->create();

//        $this->assertEquals($user->id, 1);
        $this->actingAs($user)->post('/api/invoice/'.$invoice->id, $data);

        $response = $this->actingAs($user)->get('/api/invoice/'.$invoice->id);

        $response = json_decode($response->getContent(), true);
var_dump($response->data);
        die();
//        $this->assertEquals($response->toJSON(), $data['customer_name']);
//
//        $this->assertJsonFragment([
//            'customer_name' => $data['customer_name'],
//        ]);
    }
}
