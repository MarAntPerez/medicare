<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AppointmentController extends Controller
{

    /* OBTENER HORARIOS DISPONIBLES */

    public function horariosDisponibles($fecha)
    {

        $horarios = DB::table('schedules')
            ->where('date', $fecha)
            ->where('vacant', 1)
            ->get();

        return response()->json($horarios);

    }

    /* SOLICITAR CITA */

    public function solicitarCita(Request $request)
    {

        DB::table('appointments')->insert([

            'patient_id' => $request->patient_id,

            'schedule_id' => $request->schedule_id,

            'cause' => $request->motivo,

            'status' => 'Pendiente',

            'created_at' => now(),

            'updated_at' => now()

        ]);

        /* MARCAR HORARIO COMO OCUPADO */

        DB::table('schedules')
            ->where('schedule_id', $request->schedule_id)
            ->update([
                'vacant' => 0
            ]);

        return response()->json([
            'message' => 'Cita solicitada correctamente'
        ]);

    }

}