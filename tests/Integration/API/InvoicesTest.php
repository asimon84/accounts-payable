<?php

namespace Tests\Integration\API;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class InvoicesTest extends TestCase
{
    use RefreshDatabase;

//    public function test_unauthorized_get_user(): void
//    {
//        $response = $this->get('/api/user');
//
//        $response->assertRedirect('/login');
//    }
//
//    public function test_unauthorized_patch_user(): void
//    {
//        $response = $this->patch('/api/user');
//
//        $response->assertRedirect('/login');
//    }
//
//    public function test_unauthorized_put_user(): void
//    {
//        $response = $this->put('/api/user');
//
//        $response->assertRedirect('/login');
//    }
//
//    public function test_unauthorized_delete_user(): void
//    {
//        $response = $this->delete('/api/user');
//
//        $response->assertRedirect('/login');
//    }
//
//    public function test_get_user(): void
//    {
//        $response = $this->actingAs(User::factory()->create())
//            ->get('/api/user');
//
//        $this->assertTrue($response['success']);
//        $this->assertNotEmpty($response['message']);
//        $this->assertNotEmpty($response['user']);
//    }
//
//    public function test_patch_user(): void
//    {
//        $data = [
//            'name' => 'New User Name',
//            'email' => 'new@email.com',
//            'password' => 'newpass1234',
//        ];
//
//        $response = $this->actingAs(User::factory()->create())
//            ->patch('/api/user', $data);
//
//        $this->assertTrue($response['success']);
//        $this->assertNotEmpty($response['message']);
//        $this->assertNotEmpty($response['user']);
//        $this->assertEquals($response['user']['name'], $data['name']);
//    }
//
//    public function test_put_user(): void
//    {
//        $data = [
//            'name' => 'New User Name',
//            'email' => 'new@email.com',
//            'password' => 'newpass1234',
//        ];
//
//        $response = $this->actingAs(User::factory()->create())
//            ->put('/api/user', $data);
//
//        $this->assertTrue($response['success']);
//        $this->assertNotEmpty($response['message']);
//        $this->assertNotEmpty($response['user']);
//        $this->assertEquals($response['user']['name'], $data['name']);
//    }
//
//    public function test_delete_user(): void
//    {
//        $response = $this->actingAs(User::factory()->create())
//            ->delete('/api/user');
//
//        $this->assertTrue($response['success']);
//        $this->assertNotEmpty($response['message']);
//    }
}
