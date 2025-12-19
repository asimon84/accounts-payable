import { Suspense, lazy } from 'react';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import '../../css/dashboard.css';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

const Chart = lazy(() => import('@/components/chart'));

const ReportSummary = lazy(() => import('@/components/report-summary'));

const InvoiceTable = lazy(() => import('@/components/invoice-table'));

const ItemTable = lazy(() => import('@/components/item-table'));


export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div id="dashboard-container" className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <Suspense>
                    <Chart/>
                </Suspense>
                <Suspense>
                    <ReportSummary/>
                </Suspense>
                <Suspense>
                    <InvoiceTable/>
                </Suspense>
                <Suspense>
                    <ItemTable/>
                </Suspense>
            </div>
        </AppLayout>
    );
}
