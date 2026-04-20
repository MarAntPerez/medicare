<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\PaymentController;

Route::post('/login', [AuthController::class, 'login']);

Route::get('/citas-pendientes', function () {

    return DB::table('appointments')
        ->join('users', 'appointments.patient_id', '=', 'users.user_id')
        ->join('schedules', 'appointments.schedule_id', '=', 'schedules.schedule_id')
        ->where('appointments.status', 'Pendiente')
        ->select(
            'appointments.appointment_id',
            'users.name',
            'users.lastname',
            'schedules.date',
            'schedules.hour',
            'appointments.status',
            'appointments.cause'
        )
        ->get();

});

/* CONFIRMAR CITA */

Route::put('/confirmar-cita/{id}', function ($id) {

    DB::table('appointments')
        ->where('appointment_id', $id)
        ->update([
            'status' => 'Confirmada'
        ]);

    return response()->json([
        "message" => "Cita confirmada"
    ]);

});

/* CANCELAR CITA */

Route::put('/cancelar-cita/{id}', function ($id) {

    DB::table('appointments')
        ->where('appointment_id', $id)
        ->update([
            'status' => 'Cancelada'
        ]);

    return response()->json([
        "message" => "Cita cancelada"
    ]);

});

/* HISTORIAL DE CITAS */

Route::get('/historial-citas', function () {

    $citas = DB::table('appointments')
        ->join('users', 'appointments.patient_id', '=', 'users.user_id')
        ->join('schedules', 'appointments.schedule_id', '=', 'schedules.schedule_id')
        ->select(
            'appointments.appointment_id',
            'users.name',
            'users.lastname',
            'schedules.date',
            'schedules.hour',
            'appointments.cause',
            'appointments.status'
        )
        ->whereIn('appointments.status', ['Confirmada', 'Cancelada'])
        ->orderBy('schedules.date', 'desc') // ✅ CORRECTO
        ->get();

    return response()->json($citas);

});
/* OBTENER PERFIL */

Route::get('/perfil/{id}', function ($id) {

    $user = DB::table('users')
        ->where('user_id', $id)
        ->first();

    return response()->json($user);

});

/* ACTUALIZAR PERFIL */

Route::put('/actualizar-perfil/{id}', function (Request $request, $id) {

    DB::table('users')
        ->where('user_id', $id)
        ->update([

            'name' => $request->name,
            'lastname' => $request->lastname,
            'email' => $request->email,
            'cellphone' => $request->cellphone,
            'birthdate' => $request->birthdate,
            'updated_at' => now()

        ]);

    return response()->json([
        "message" => "Perfil actualizado"
    ]);

});

Route::get('/pacientes', [AuthController::class,'pacientes']);

Route::post('/pacientes', [AuthController::class, 'storePaciente']);

Route::put('/pacientes/{id}', [AuthController::class, 'updatePaciente']);

Route::delete('/pacientes/{id}', [AuthController::class, 'deletePaciente']);

Route::apiResource('/pagos', PaymentController::class);