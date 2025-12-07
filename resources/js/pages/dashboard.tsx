import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { ReportSummary } from '@/components/report-summary.tsx';
import '../../css/dashboard.css';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div id="dashboard-container"  className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <ReportSummary/>
            </div>
        </AppLayout>
    );
}
