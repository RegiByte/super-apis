<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\URL;

class Pin extends Model
{
    use HasFactory;

    protected $fillable = ['posted_by', 'title', 'destination', 'image', 'category_id'];

    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'posted_by');
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(PinCategory::class, 'category_id');
    }

    public function savedByUsers(): BelongsToMany
    {
        return $this->belongsToMany(User::class)->using(UserPin::class);
    }

    protected function image(): Attribute
    {
        return Attribute::make(
            get: fn($value) => URL::to('/storage/' . $value)
        );
    }
}
