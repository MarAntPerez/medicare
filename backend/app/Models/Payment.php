<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    protected $fillable = [
        'patient_id',
        'amount',
        'date',
        'method'
    ];

    public function patient()
    {
        return $this->belongsTo(User::class);
    }
}