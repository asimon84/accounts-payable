import { Suspense, lazy } from 'react';
import AppLayout from '@/layouts/app-layout';
import { createInvoice } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import '../../css/create-invoice.css';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Create Invoice',
        href: createInvoice().url,
    },
];

const CreateInvoiceForm = lazy(() => import('@/components/create-invoice-form'));

export default function CreateInvoice() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Invoice" />
            <div id="create-invoice-container" className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <Suspense>
                    <CreateInvoiceForm/>
                </Suspense>
            </div>
        </AppLayout>
    );
}
