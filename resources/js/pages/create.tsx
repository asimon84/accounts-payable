import AppLayout from '@/layouts/app-layout';
import { create } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import CreateInvoiceForm from '@/components/create-invoice-form.tsx';
import '../../css/create.css';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Create Invoice',
        href: create().url,
    },
];

export default function Create() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Invoice" />
            <div id="create-invoice-container" className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <CreateInvoiceForm/>
            </div>
        </AppLayout>
    );
}
