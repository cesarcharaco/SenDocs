<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Archivos extends Model
{
    protected $table='archivos';

    protected $fillable=['nombre','descripcion','fecha_subida','hora_subida','fecha_envio','hora_envio','status','url'];

    public function users()
    {
    	return $this->belongsToMany('App\User','user_has_envio','id_archivo','id_user')->withPivot('email_envio','status');
    }
}
