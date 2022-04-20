import type { LinksFunction, LoaderFunction, MetaFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react';
import normalizeUrl from 'normalize.css';
import appStylesUrl from '~/styles/app.css';
import variablesStylesUrl from '~/styles/variables.css';
import { getUser } from './models/session.server';

export const meta: MetaFunction = () => ({
    charset: 'utf-8',
    title: 'Cypress workshop',
    viewport: 'width=device-width,initial-scale=1',
});

export const links: LinksFunction = () => {
    return [
        {
            rel: 'icon',
            href: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22> 🦒 </text></svg>',
        },
        {
            rel: 'stylesheet',
            href: variablesStylesUrl,
        },
        {
            rel: 'stylesheet',
            href: normalizeUrl,
        },
        {
            rel: 'stylesheet',
            href: appStylesUrl,
        },
        {
            rel: 'preconnect',
            href: 'https://fonts.googleapis.com',
        },
        {
            rel: 'preconnect',
            href: 'https://fonts.gstatic.com',
            crossOrigin: 'anonymous',
        },
        {
            rel: 'stylesheet',
            href: 'https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700&display=swap',
        },
    ];
};

type LoaderData = {
    user: Awaited<ReturnType<typeof getUser>>;
};

export const loader: LoaderFunction = async ({ request }) => {
    return json<LoaderData>({
        user: await getUser(request),
    });
};

export default function App() {
    return (
        <html lang="en">
            <head>
                <Meta />
                <Links />
            </head>
            <body>
                <Outlet />
                <ScrollRestoration />
                <Scripts />
                <LiveReload />
            </body>
        </html>
    );
}
