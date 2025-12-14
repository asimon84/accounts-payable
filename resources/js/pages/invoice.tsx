import AppLayout from '@/layouts/app-layout';
import { invoice } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { EditInvoiceForm } from '@/components/edit-invoice-form.tsx';
import '../../css/details.css';

export default function Invoice({invoice}) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Invoice Details',
            href: invoice({invoice}).url,
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Invoice" />
            <div id="edit-invoice-container" className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <EditInvoiceForm object={invoice} />
            </div>
        </AppLayout>
    );
}
