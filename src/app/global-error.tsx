"use client";

import * as Sentry from '@sentry/nextjs';
import Error from 'next/error';
import { useEffect } from 'react';

export default function GlobalError({
                                        // eslint-disable-next-line @typescript-eslint/no-unused-vars
                                        error,
                                        reset,
                                    }: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        Sentry.captureException(error);
    }, [error]);

    return (
        <html lang="en">
            <body>
                <h2>Error</h2>
                <button type="button" onClick={() => reset()}>
                    Try again
                </button>
            </body>
        </html>
    );
};
