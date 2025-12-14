import AppLayout from '@/layouts/app-layout';
import { item } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { EditItemForm } from '@/components/edit-item-form.tsx';
import '../../css/details.css';

export default function Item({item}) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Item Details',
            href: item({item}).url,
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Item" />
            <div id="edit-invoice-container" className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <EditItemForm object={item} />
            </div>
        </AppLayout>
    );
}
