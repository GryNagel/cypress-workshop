import type { ActionFunction, LoaderFunction, MetaFunction } from '@remix-run/node';
import { json, redirect } from '@remix-run/node';
import { Form, Link, useActionData, useSearchParams } from '@remix-run/react';
import * as React from 'react';

import { getUserId, createUserSession } from '~/models/session.server';
import { createUser, getUserByEmail } from '~/models/user.server';
import { validateEmail } from '~/utils';

export const loader: LoaderFunction = async ({ request }) => {
    const userId = await getUserId(request);
    if (userId) return redirect('/');
    return json({});
};

interface ActionData {
    errors: {
        email?: string;
        password?: string;
    };
}

export const action: ActionFunction = async ({ request }) => {
    const formData = await request.formData();
    const email = formData.get('email');
    const password = formData.get('password');
    const redirectTo = formData.get('redirectTo');

    if (!validateEmail(email)) {
        return json<ActionData>({ errors: { email: 'Email is invalid' } }, { status: 400 });
    }

    if (typeof password !== 'string') {
        return json<ActionData>({ errors: { password: 'Password is required' } }, { status: 400 });
    }

    if (password.length < 8) {
        return json<ActionData>({ errors: { password: 'Password is too short' } }, { status: 400 });
    }

    const existingUser = await getUserByEmail(email);
    if (existingUser) {
        return json<ActionData>(
            { errors: { email: 'A user already exists with this email' } },
            { status: 400 }
        );
    }

    const user = await createUser(email, password);

    return createUserSession({
        request,
        userId: user.id,
        remember: false,
        redirectTo: typeof redirectTo === 'string' ? redirectTo : '/',
    });
};

export const meta: MetaFunction = () => {
    return {
        title: 'Sign Up',
    };
};

export default function Join() {
    const [searchParams] = useSearchParams();
    const redirectTo = searchParams.get('redirectTo') ?? undefined;
    const actionData = useActionData() as ActionData;
    const emailRef = React.useRef<HTMLInputElement>(null);
    const passwordRef = React.useRef<HTMLInputElement>(null);

    React.useEffect(() => {
        if (actionData?.errors?.email) {
            emailRef.current?.focus();
        } else if (actionData?.errors?.password) {
            passwordRef.current?.focus();
        }
    }, [actionData]);

    return (
        <div className="center-container">
            <div className="login">
                <h2>Sign up</h2>
                <Form method="post" className="form">
                    <div className="text-input">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <div className="mt-1">
                            <input
                                ref={emailRef}
                                id="email"
                                required
                                autoFocus={true}
                                name="email"
                                type="email"
                                autoComplete="email"
                                aria-invalid={actionData?.errors?.email ? true : undefined}
                                aria-describedby="email-error"
                            />
                            {actionData?.errors?.email && (
                                <div id="email-error" className="error-text">
                                    {actionData.errors.email}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="text-input">
                        <label htmlFor="password">Password</label>
                        <div className="mt-1">
                            <input
                                id="password"
                                ref={passwordRef}
                                name="password"
                                type="password"
                                autoComplete="new-password"
                                aria-invalid={actionData?.errors?.password ? true : undefined}
                                aria-describedby="password-error"
                            />
                            {actionData?.errors?.password && (
                                <div className="error-text" id="password-error">
                                    {actionData.errors.password}
                                </div>
                            )}
                        </div>
                    </div>

                    <input type="hidden" name="redirectTo" value={redirectTo} />
                    <button type="submit">Create Account</button>
                    <div>
                        <div>
                            Already have an account?{' '}
                            <Link
                                to={{
                                    pathname: '/login',
                                    search: searchParams.toString(),
                                }}
                            >
                                Log in
                            </Link>
                        </div>
                    </div>
                </Form>
            </div>
        </div>
    );
}
