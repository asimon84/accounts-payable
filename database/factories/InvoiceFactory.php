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
        $days_ago = rand(0, 7);

        $date = new \DateTime();

        $date->modify("-$days_ago days");

        return [
            'customer_name' => fake()->firstName() . fake()->lastName(),
            'due_date' => fake()->date(),
            'paid' => fake()->boolean(),
            'created_at' => $date->format('Y-m-d H:i:s'),
        ];
    }
}
