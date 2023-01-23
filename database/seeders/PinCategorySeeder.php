<?php

namespace Database\Seeders;

use App\Models\PinCategory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class PinCategorySeeder extends Seeder
{
    protected $categories = [
        'Websites',
        'Games',
        'Tools'
    ];

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        foreach ($this->categories as $category) {
            if (!PinCategory::where('name', $category)->exists()) {
                PinCategory::create([
                    'name' => $category,
                    'slug' => Str::of($category)->slug('-')
                ]);
            }
        }
    }
}
