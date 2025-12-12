import AppLayout from '@/layouts/app-layout';
import { createItem } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import '../../css/create-item.css';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Create Item',
        href: createItem().url,
    },
];

export default function CreateItem() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Item" />
            <div id="create-item-container" className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">

            </div>
        </AppLayout>
    );
}
