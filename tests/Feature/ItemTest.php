<?php

namespace Tests\Feature;

use App\Models\Item;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ItemTest extends TestCase
{
    use RefreshDatabase;

    public function test_guests_are_redirected_to_the_login_page()
    {
        $item = Item::factory()->create();

        $this->get('/item/'.$item->id)->assertRedirect(route('login'));
    }

    public function test_authenticated_users_can_visit_details_page()
    {
        $this->actingAs($user = User::factory()->create());

        $item = Item::factory()->create();

        $this->get('/item/'.$item->id)->assertOk();
    }
}
