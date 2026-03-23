<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class NetflixAccount extends Model
{
    use HasFactory;

    protected $fillable = [
        'email',
        'password',
        'profile_name',
        'pin',
        'category',
        'status',
        'user_id',
        'expire_date',
    ];

    protected function casts(): array
    {
        return [
            'expire_date' => 'date',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
