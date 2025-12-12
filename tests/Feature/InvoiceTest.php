<?php

namespace Tests\Feature;

use App\Models\Invoice;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class InvoiceTest extends TestCase
{
    use RefreshDatabase;

    public function test_guests_are_redirected_to_the_login_page()
    {
        $invoice = Invoice::factory()->create();

        $this->get('/invoice/'.$invoice->id)->assertRedirect(route('login'));
    }

    public function test_authenticated_users_can_visit_details_page()
    {
        $this->actingAs($user = User::factory()->create());

        $invoice = Invoice::factory()->create();

        $this->get('/invoice/'.$invoice->id)->assertOk();
    }
}
