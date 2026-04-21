<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    
    protected $primaryKey = "order_id";

    protected $fillable = [
        'service_id',
        'buyer_id',
        'booster_id',
        'rank_from',
        'rank_to',
        'price',
        'status',
        'order_details'
    ];

    protected $casts = [
        'order_details' => 'array',
        'price' => 'decimal:2',
    ];

    public function buyer()
    {
        return $this->belongsTo(User::class, 'buyer_id', 'user_id');
    }

    public function booster()
    {
        return $this->belongsTo(User::class, 'booster_id', 'user_id');
    }

    public function service()
    {
        return $this->belongsTo(Service::class, 'service_id', 'service_id');
    }
}
