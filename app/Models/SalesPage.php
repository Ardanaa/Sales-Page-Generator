<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SalesPage extends Model
{
    protected $fillable = [
        'user_id',
        'name',
        'description',
        'features',
        'target_audience',
        'price',
        'usps',
        'template',
        'html_content',
        'generated_data',
    ];

    protected $casts = [
        'generated_data' => 'array',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
