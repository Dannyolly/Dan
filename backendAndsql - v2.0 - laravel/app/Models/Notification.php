<?php

namespace App\Models;

use App\Enums\InformType;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\Notification
 *
 * @method static Builder|Notification newModelQuery()
 * @method static Builder|Notification newQuery()
 * @method static Builder|Notification query()
 * @mixin \Eloquent
 * @property int $id
 * @property string $content
 * @property int $from_id
 * @property int $to_id
 * @property int $type -- InformType
 * @property int $post_id
 * @method static Builder|Notification whereContent($value)
 * @method static Builder|Notification whereFromId($value)
 * @method static Builder|Notification whereId($value)
 * @method static Builder|Notification whereToId($value)
 * @method static Builder|Notification whereType($value)
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static Builder|Notification whereCreatedAt($value)
 * @method static Builder|Notification wherePostId($value)
 * @method static Builder|Notification whereUpdatedAt($value)
 */
class Notification extends Model
{
    use HasFactory;

    protected $table='notification';

    protected $fillable = [
        'content',
        'from_id',
        'to_id',
        'type',
        'post_id',
    ];


    public function __construct( string $content ='', int $from_id =1, int $to_id=1, int $type=0,$postId = 1)
    {
        $this->fill([
            'content' => $content,
            'from_id' => $from_id,
            'to_id' => $to_id,
            'type' =>  $type,
            'post_id' => $postId
        ]);
    }


}
