<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(Request $request)
    {

        $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user) {

            return response()->json([
                "message" => "Usuario no encontrado"
            ], 401);

        }

        if (!Hash::check($request->password, $user->password)) {

            return response()->json([
                "message" => "Contraseña incorrecta"
            ], 401);

        }

        return response()->json([
            "message" => "Login exitoso",
            "user" => $user
        ]);

    }

    public function pacientes()
    {

        $pacientes = User::where('user_type', 'paciente')
            ->get();

        return response()->json($pacientes);

    }

    public function storePaciente(Request $request)
    {

        $user = User::create([
            'name' => $request->name,
            'lastname' => $request->lastname,
            'email' => $request->email,
            'cellphone' => $request->cellphone,
            'birthdate' => $request->birthdate,
            'password' => bcrypt($request->password),
            'user_type' => 'paciente'
        ]);

        return response()->json($user);

    }

    public function updatePaciente(Request $request, $id)
    {

        $user = User::findOrFail($id);

        $user->update($request->all());

        return response()->json($user);

    }

    public function deletePaciente($id)
    {

        User::destroy($id);

        return response()->json([
            "message" => "Paciente eliminado"
        ]);

    }
}