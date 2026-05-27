<?php

namespace App\Http\Controllers;

use App\Models\Schedule;
use Illuminate\Http\Request;

class ScheduleController extends Controller
{

    public function index()
    {

        return response()->json(
            Schedule::orderBy('date')->get()
        );

    }

    public function store(Request $request)
    {

        $schedule = Schedule::create([

            'date' => $request->date,
            'hour' => $request->hour,
            'vacant' => true

        ]);

        return response()->json($schedule);

    }

    public function update(Request $request, $id)
    {

        $schedule = Schedule::findOrFail($id);

        $schedule->update([

            'date' => $request->date,
            'hour' => $request->hour,
            'vacant' => $request->vacant

        ]);

        return response()->json($schedule);

    }

    public function destroy($id)
    {

        Schedule::destroy($id);

        return response()->json([
            "message" => "Horario eliminado"
        ]);

    }

}