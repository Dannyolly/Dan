<?php

namespace App\Models;

use Eloquent;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use mysql_xdevapi\Table;

/**
 * App\Models\AddRequest
 *
 * @property int $id
 * @property string $from_id
 * @property int $to_id
 * @property int $status
 * @property string $content
 * @method static \Illuminate\Database\Eloquent\Builder|AddRequest newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|AddRequest newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|AddRequest query()
 * @mixin Eloquent
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|AddRequest whereContent($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AddRequest whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AddRequest whereFromId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AddRequest whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AddRequest whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AddRequest whereToId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AddRequest whereUpdatedAt($value)
 */
class AddRequest extends Model
{
    use HasFactory;

    protected $fillable = [
        "from_id",
        "to_id",
        "content",
        "status"
    ];

    protected $table = 'add_request';

    public function setUp($fromId , $toId , $content){
        $this->fill([
            'from_id' => $fromId,
            'to_id' => $toId,
            'content' => $content
        ]);
        return $this;
    }
}
