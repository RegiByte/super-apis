<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\Pivot;

class UserPin extends Pivot
{
    use HasFactory;

    protected $fillable = ['user_id', 'pin_id'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function pin()
    {
        return $this->belongsTo(Pin::class);
    }
}
