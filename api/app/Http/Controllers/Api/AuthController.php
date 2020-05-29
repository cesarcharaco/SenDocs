<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Support\Facades\Auth;
class AuthController extends Controller
{
	

    public function register(Request $request)
    {
    	$validateData= $request->validate([
    		'name' => 'required|max:55',
    		'email' => 'email|required|unique:users',
    		'password' => 'required|confirmed'
    	]);

    	$validateData['password']=bcrypt($request->password);
    	$user = User::create($validateData);

    	$accessToken = $user->createToken('authToken')->accessToken;

    	return response(['user' => $user, 'accessToken' => $accessToken]);
    }


    public function login(Request $request)
    {
    	 /*$loginData=$this->validate($request,[
    		'email' => 'email|required',
    		'password' => 'required'
    	]);*/
  		$this->validateLogin($request);

		$loginData=['email' =>
				$request->email , 'password' =>
				$request->password
			];
    	if(!auth()->attempt($loginData)){
    		return response(['message' => 'Credenciales Inválidas']);
    	}

    	$accessToken = auth()->user()->createToken('authToken')->accessToken;

    	return response(['user' => auth()->user(),'access_token' => $accessToken]);

    	 
    }
}
