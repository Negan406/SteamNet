<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use Illuminate\Database\Eloquent\Relations\BelongsTo;

class IptvAccount extends Model
{
    protected $fillable = [
        'username',
        'password',
        'server_url',
        'expire_date',
        'status',
        'category',
        'user_id',
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
