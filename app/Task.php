<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    protected $table = 'tasks';
    protected $fillable = ['title', 'project_id'];

    public function projects(){
        $this->belongsTo(Project::class);
    }
}
