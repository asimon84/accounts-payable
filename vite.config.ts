import { wayfinder } from '@laravel/vite-plugin-wayfinder';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [
        laravel({
            input: [
                'resources/css/app.css',
                'resources/js/app.tsx',
                'resources/css/dashboard.css',
                'resources/css/report-summary.css',
                'resources/css/invoice-table.css',
                'resources/css/details.css',
                'resources/css/invoices.css',
                'resources/css/create-invoice.css',
                'resources/css/edit-invoice-form.css',
                'resources/css/create-invoice-form.css',
                'resources/css/item-table.css',
                'resources/css/create-item.css',
            ],
            ssr: 'resources/js/ssr.tsx',
            refresh: true,
        }),
        react({
            babel: {
                plugins: ['babel-plugin-react-compiler'],
            },
        }),
        tailwindcss(),
        wayfinder({
            formVariants: true,
        }),
    ],
    esbuild: {
        jsx: 'automatic',
    },
});
