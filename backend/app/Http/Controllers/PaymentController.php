<?php

namespace App\Http\Controllers;

use App\Models\Payment;
use Illuminate\Http\Request;

class PaymentController extends Controller
{

    public function index()
    {

        $payments = Payment::with('patient.user')->get();

        return response()->json(

            $payments->map(function ($p) {

                return [

                    'id' => $p->id,

                    'patient_name' =>
                        $p->patient->user->name . " " .
                        $p->patient->user->lastname,

                    'amount' => $p->amount,

                    'date' => $p->date,

                    'method' => $p->method

                ];

            })

        );

    }

    public function store(Request $request)
    {

        $payment = Payment::create($request->all());

        return response()->json($payment);

    }

    public function update(Request $request, $id)
    {

        $payment = Payment::findOrFail($id);

        $payment->update($request->all());

        return response()->json($payment);

    }

    public function destroy($id)
    {

        Payment::destroy($id);

        return response()->json([
            'message' => 'Pago eliminado'
        ]);

    }

}