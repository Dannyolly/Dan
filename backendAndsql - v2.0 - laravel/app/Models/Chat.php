<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


/**
 * App\Models\Chat
 *
 * @property int $id
 * @property int $user_id
 * @property int $to_id
 * @property string $message
 * @property string $url
 * @property \Illuminate\Support\Carbon|null $created_at
 * @method static \Illuminate\Database\Eloquent\Builder|Chat newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Chat newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Chat query()
 * @method static \Illuminate\Database\Eloquent\Builder|Chat whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Chat whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Chat whereMessage($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Chat whereToId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Chat whereUrl($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Chat whereUserId($value)
 * @mixin \Eloquent
 */
class Chat extends Model
{
    use HasFactory;


    protected $fillable = [
        "id",
        "user_id",
        "to_id",
        "message",
        "url",
        'created_at'
    ];
}
