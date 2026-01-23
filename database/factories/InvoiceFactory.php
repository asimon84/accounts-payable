<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Invoice>
 */
class InvoiceFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $days = rand(0, 7);

        $dueDate = new \DateTime();
        $dueDate->modify("+$days days");

        $createdDate = new \DateTime();
        $createdDate->modify("-$days days");

        return [
            'customer_name' => fake()->firstName() . ' ' . fake()->lastName(),
            'due_date' => $dueDate->format('Y-m-d H:i:s'),
            'paid' => fake()->boolean(),
            'created_at' => $createdDate->format('Y-m-d H:i:s'),
        ];
    }
}
