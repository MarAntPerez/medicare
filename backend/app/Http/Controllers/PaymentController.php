<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PaymentController extends Controller
{

    /* OBTENER PAGOS */

    public function index()
    {

        $payments = DB::table('payments')

            ->join(
                'appointments',
                'payments.appointment_id',
                '=',
                'appointments.appointment_id'
            )

            ->join(
                'users',
                'appointments.patient_id',
                '=',
                'users.user_id'
            )

            ->select(

                'payments.payment_id',

                'payments.amount',

                'payments.payment_method',

                'payments.payment_date',

                'users.name',

                'users.lastname'

            )

            ->get();

        return response()->json(

            $payments->map(function ($p) {

                return [

                    'id' => $p->payment_id,

                    'patient_name' =>
                        $p->name . " " . $p->lastname,

                    'amount' => $p->amount,

                    'date' => $p->payment_date,

                    'method' => $p->payment_method

                ];

            })

        );

    }

    /* CREAR PAGO */

    public function store(Request $request)
    {

        DB::table('payments')->insert([

            'appointment_id' => $request->appointment_id,

            'amount' => $request->amount,

            'payment_method' => $request->payment_method,

            'status' => 'Pagado',

            'payment_date' => $request->payment_date,

            'created_at' => now(),

            'updated_at' => now()

        ]);

        return response()->json([
            "message" => "Pago registrado"
        ]);

    }

    /* ACTUALIZAR */

    public function update(Request $request, $id)
    {

        DB::table('payments')

            ->where('payment_id', $id)

            ->update([

                'amount' => $request->amount,

                'payment_method' => $request->payment_method,

                'payment_date' => $request->payment_date,

                'updated_at' => now()

            ]);

        return response()->json([
            "message" => "Pago actualizado"
        ]);

    }

    /* ELIMINAR */

    public function destroy($id)
    {

        DB::table('payments')

            ->where('payment_id', $id)

            ->delete();

        return response()->json([
            "message" => "Pago eliminado"
        ]);

    }

}