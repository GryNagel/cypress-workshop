import { Form, useActionData, useTransition } from '@remix-run/react';
import { redirect, json } from '@remix-run/node';
import type { ActionFunction } from '@remix-run/node';
import invariant from 'tiny-invariant';

import { createPost } from '~/models/post.server';
import { requireUserId } from '~/models/session.server';

type ActionData =
    | {
          title: null | string;
          slug: null | string;
          markdown: null | string;
      }
    | undefined;

export const action: ActionFunction = async ({ request }) => {
    const userId = await requireUserId(request);

    const formData = await request.formData();
    const title = formData.get('title');
    const slug = formData.get('slug');
    const markdown = formData.get('markdown');

    const errors: ActionData = {
        title: title ? null : 'Title is required',
        slug: slug ? null : 'Slug is required',
        markdown: markdown ? null : 'Markdown is required',
    };
    const hasErrors = Object.values(errors).some((errorMessage) => errorMessage);
    if (hasErrors) {
        return json<ActionData>(errors);
    }

    invariant(typeof title === 'string', 'title must be a string');
    invariant(typeof slug === 'string', 'slug must be a string');
    invariant(typeof markdown === 'string', 'markdown must be a string');

    await createPost({ title, slug, markdown, userId });

    return redirect('/post/admin');
};

export default function NewPost() {
    const errors = useActionData();
    const transition = useTransition();
    const isCreating = Boolean(transition.submission);

    return (
        <Form method="post">
            <div className="new-post-container">
                <div className="text-input">
                    <label>
                        Post Title:{' '}
                        {errors?.title ? <em className="text-red-600">{errors.title}</em> : null}
                    </label>
                    <input type="text" name="title" />
                </div>
                <div className="text-input">
                    <label>
                        Post Slug:{' '}
                        {errors?.slug ? <em className="text-red-600">{errors.slug}</em> : null}
                    </label>
                    <input type="text" name="slug" />
                </div>
                <div className="text-input">
                    <label htmlFor="markdown">
                        Markdown:
                        {errors?.markdown ? (
                            <em className="text-red-600">{errors.markdown}</em>
                        ) : null}
                    </label>
                    <textarea id="markdown" rows={20} name="markdown" />
                </div>
                <p className="text-right">
                    <button type="submit" disabled={isCreating}>
                        {isCreating ? 'Creating...' : 'Create Post'}
                    </button>
                </p>
            </div>
        </Form>
    );
}
