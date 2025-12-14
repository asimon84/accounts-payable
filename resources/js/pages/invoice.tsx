import AppLayout from '@/layouts/app-layout';
import { invoices } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { EditInvoiceForm } from '@/components/edit-invoice-form.tsx';
import '../../css/invoice.css';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Invoice Details',
        href: invoices().url,
    },
];

export default function Invoice({invoice}) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Invoice" />
            <div id="edit-invoice-container" className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <EditInvoiceForm object={invoice} />
            </div>
        </AppLayout>
    );
}
