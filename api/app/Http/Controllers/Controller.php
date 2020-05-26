<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;

class Controller extends BaseController
{
    public function prueba(Request $request) {

       return $request;
    }
    public function prueba2() {
        return ('si funciona');
    }
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;
}
