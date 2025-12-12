<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class InvoicesTest extends TestCase
{
    use RefreshDatabase;

    public function test_guests_are_redirected_to_the_login_page()
    {
        $this->get('/invoices')->assertRedirect(route('login'));
    }

    public function test_authenticated_users_can_visit_details_page()
    {
        $this->actingAs($user = User::factory()->create());

        $this->get('/invoices')->assertOk();
    }
}
