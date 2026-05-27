<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\ScheduleController;

Route::post('/login', [AuthController::class, 'login']);

Route::get('/citas', function () {

    return DB::table('appointments')
        ->join('users', 'appointments.patient_id', '=', 'users.user_id')
        ->join('schedules', 'appointments.schedule_id', '=', 'schedules.schedule_id')
        ->select(
            'appointments.appointment_id',
            'users.name',
            'users.lastname',
            'schedules.date',
            'schedules.hour'
        )
        ->get();

});

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

Route::get('/buscar-pacientes', function (Request $request) {

    return DB::table('users')
        ->where('user_type', 'paciente')
        ->where(function ($query) use ($request) {

            $query->where('name', 'like', '%' . $request->search . '%')
                ->orWhere('lastname', 'like', '%' . $request->search . '%');

        })
        ->select(
            'user_id',
            'name',
            'lastname'
        )
        ->limit(5)
        ->get();

});

// citas de pacientes en especifico
Route::get('/mis-citas/{id}', function ($id) {

    return DB::table('appointments')
        ->join(
            'schedules',
            'appointments.schedule_id',
            '=',
            'schedules.schedule_id'
        )
        ->where('appointments.patient_id', $id)
        ->select(
            'appointments.appointment_id',
            'appointments.status',
            'appointments.cause',
            'schedules.date',
            'schedules.hour'
        )
        ->orderBy('schedules.date', 'desc')
        ->get();

});

// PAGOS DE PACIENTE
Route::get('/mis-pagos/{id}', function ($id) {

    return DB::table('payments')
        ->join(
            'appointments',
            'payments.appointment_id',
            '=',
            'appointments.appointment_id'
        )
        ->where('appointments.patient_id', $id)
        ->select(
            'payments.payment_id',
            'payments.amount',
            'payments.payment_method',
            'payments.status',
            'payments.payment_date'
        )
        ->orderBy('payments.payment_date', 'desc')
        ->get();

});

// OBTENER Y EDITAR PERFIL DE PACIENTE
Route::get('/perfil-paciente/{id}', function ($id) {

    return DB::table('users')
        ->where('user_id', $id)
        ->first();

});

Route::put('/perfil-paciente/{id}', function (Request $request, $id) {

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
        'message' => 'Perfil actualizado'
    ]);

});

Route::get('/pacientes', [AuthController::class, 'pacientes']);

Route::post('/pacientes', [AuthController::class, 'storePaciente']);

Route::put('/pacientes/{id}', [AuthController::class, 'updatePaciente']);

Route::delete('/pacientes/{id}', [AuthController::class, 'deletePaciente']);

Route::apiResource('pagos', PaymentController::class);

Route::apiResource('horarios', ScheduleController::class);

use App\Http\Controllers\AppointmentController;

Route::get('/horarios-disponibles/{fecha}', [AppointmentController::class, 'horariosDisponibles']);

Route::post('/solicitar-cita', [AppointmentController::class, 'solicitarCita']);