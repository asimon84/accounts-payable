import AppLayout from '@/layouts/app-layout';
import { details } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { EditInvoiceForm } from '@/components/edit-invoice-form.tsx';

export default function Details({invoice}) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Invoice Details',
            href: details({invoice}).url,
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    <EditInvoiceForm object={invoice} />
                </div>
            </div>
        </AppLayout>
    );
}
