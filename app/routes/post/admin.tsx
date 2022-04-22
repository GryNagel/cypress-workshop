import type { LinksFunction, LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { Link, Outlet, useLoaderData } from '@remix-run/react';

import { getPosts } from '~/models/post.server';
import adminStylesUrl from '~/styles/admin.css';

export const links: LinksFunction = () => {
    return [
        {
            rel: 'stylesheet',
            href: adminStylesUrl,
        },
    ];
};

type LoaderData = {
    posts: Awaited<ReturnType<typeof getPosts>>;
};

export const loader: LoaderFunction = async () => {
    return json({ posts: await getPosts() });
};

export default function PostAdmin() {
    const { posts } = useLoaderData() as LoaderData;
    return (
        <div className="admin-container">
            <h1>Blog Admin</h1>
            <div>
                <nav>
                    <ul>
                        {posts.map((post) => (
                            <li key={post.slug}>
                                <Link target="_blank" to={`/post/${post.slug}`}>
                                    {post.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
                <main>
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
