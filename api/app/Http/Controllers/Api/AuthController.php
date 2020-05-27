<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\User;
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
    	$loginData=$request->validate([
    		'email' => 'email|required',
    		'password' => 'required'
    	]);

    	if(!auth()->attempt($loginData)){
    		return response(['message' => 'Credenciales Inválidas']);
    	}

    	$accessToken = auth()->user()->createToken('authToken')->accessToken;

    	return response(['user' => auth()->user(),'access_token' => $accessToken]);
    }
}
