<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class PinCategory extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'slug'];

    public function pins(): HasMany
    {
        return $this->hasMany(Pin::class, 'category_id');
    }
}
