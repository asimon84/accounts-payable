<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Invoice;
use Carbon\Carbon;
use Illuminate\Http\Request;

class ChartController extends Controller
{
    /**
     * Get data for the dashboard chart
     *
     * @param Request $request
     * @param int $days
     *
     * @return array
     */
    function getChartData(Request $request, int $days = 7): array
    {
        $startDate = Carbon::now()->subDays($days)->startOfDay();
        $endDate = Carbon::now()->endOfDay();

        $dateRange = [];
        for ($i = 0; $i < $days; $i++) {
            $date = $startDate->copy()->addDays($i)->format('Y-m-d');
            $dateRange[$date] = 0;
        }

        $dailyCounts = Invoice::selectRaw('DATE(created_at) as date, COUNT(*) as count')
            ->whereBetween('created_at', [$startDate, $endDate])
            ->groupBy('date')
            ->orderBy('date', 'ASC')
            ->get()
            ->keyBy('date')
            ->toArray();

        $finalCounts = array_replace($dateRange, array_column($dailyCounts, 'count', 'date'));

        $dates = array_keys($finalCounts);
        array_unshift($dates, "dates");

        $invoices = array_values($finalCounts);
        array_unshift($invoices, "invoices");

        return [$dates, $invoices];
    }
}
