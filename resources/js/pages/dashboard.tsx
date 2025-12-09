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

const ReportSummary = lazy(() =>
    import('@/components/report-summary').then(module => ({ default: module.ReportSummary }))
);

const InvoiceTable = lazy(() =>
    import('@/components/invoice-table').then(module => ({ default: module.InvoiceTable }))
);

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div id="dashboard-container" className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <Suspense>
                    <ReportSummary/>
                </Suspense>
                <Suspense>
                    <InvoiceTable/>
                </Suspense>
            </div>
        </AppLayout>
    );
}
