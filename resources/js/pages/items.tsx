import { Suspense, lazy } from 'react';
import AppLayout from '@/layouts/app-layout';
import { items } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import '../../css/items.css';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Items',
        href: items().url,
    },
];

const ItemTable = lazy(() => import('@/components/item-table'));

export default function Items() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Items" />
            <div id="create-items-container" className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <Suspense>
                    <ItemTable/>
                </Suspense>
            </div>
        </AppLayout>
    );
}
