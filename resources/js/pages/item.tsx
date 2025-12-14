import AppLayout from '@/layouts/app-layout';
import { items } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { EditItemForm } from '@/components/edit-item-form.tsx';
import '../../css/item.css';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Item Details',
        href: items().url,
    },
];

export default function Item({item}) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Item" />
            <div id="edit-invoice-container" className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <EditItemForm object={item} />
            </div>
        </AppLayout>
    );
}
