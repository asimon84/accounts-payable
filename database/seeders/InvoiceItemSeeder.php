<?php

namespace Database\Seeders;

use Database\Factories\InvoiceItemFactory;
use Illuminate\Database\Seeder;

class InvoiceItemSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        InvoiceItemFactory::factory(10)->create();
    }
}
