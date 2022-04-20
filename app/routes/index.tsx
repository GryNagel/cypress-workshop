import type { LinksFunction } from '@remix-run/node';
import { json } from '@remix-run/node';

import { Form, Link, Outlet, useLoaderData } from '@remix-run/react';

import { getPosts } from '~/models/post.server';
import { getRandomJoke } from '~/models/joke.server';
import indexStylesUrl from '~/styles/index.css';
import { useOptionalUser } from '../utils';

export const links: LinksFunction = () => {
    return [
        {
            rel: 'stylesheet',
            href: indexStylesUrl,
        },
    ];
};

type LoaderData = {
    posts: Awaited<ReturnType<typeof getPosts>>;
    joke: Awaited<ReturnType<typeof getRandomJoke>>;
};

export const loader = async () => {
    const posts = await getPosts();
    const joke = await getRandomJoke();

    return json<LoaderData>({
        posts,
        joke,
    });
};

export default function Index() {
    const { posts, joke } = useLoaderData<LoaderData>();
    const user = useOptionalUser();

    return (
        <div>
            <header className="header">
                <h1>Hello cypress 👋! </h1>
                {user ? (
                    <div>
                        {`Hello, ${user.email}`}
                        <Form action="/logout" method="post">
                            <button type="submit">Logout</button>
                        </Form>
                    </div>
                ) : (
                    <Link to="/login"> Login </Link>
                )}
            </header>
            <div className="container">
                <div className="card">
                    <h2>Posts</h2>
                    <ul>
                        {posts.map((post) => (
                            <li key={post.slug}>
                                <Link to={`post/${post.slug}`}>{post.title}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="card">
                    <h2>Random joke</h2>
                    <p>{joke}</p>
                </div>
            </div>
        </div>
    );
}
