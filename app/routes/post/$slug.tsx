import { marked } from 'marked';
import type { LinksFunction, LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import invariant from 'tiny-invariant';

import type { Post } from '~/models/post.server';
import { getPost } from '~/models/post.server';
import blogStylesUrl from '~/styles/blog.css';

export const links: LinksFunction = () => {
    return [
        {
            rel: 'stylesheet',
            href: blogStylesUrl,
        },
    ];
};

type LoaderData = { post: Post; html: string };

export const loader: LoaderFunction = async ({ params }) => {
    invariant(params.slug, `params.slug is required`);

    const post = await getPost(params.slug);
    invariant(post, `Post not found: ${params.slug}`);

    const html = marked(post.markdown);
    return json<LoaderData>({ post, html });
};

export default function PostSlug() {
    const { post, html } = useLoaderData() as LoaderData;
    return (
        <main className="blog-container">
            <Link to="/">{`⬅️Go back`}</Link>
            <article className="blog-text">
                <h1>{post.title}</h1>
                <div dangerouslySetInnerHTML={{ __html: html }} />
            </article>
        </main>
    );
}
