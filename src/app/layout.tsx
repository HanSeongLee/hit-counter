import React from 'react';
import { Metadata, Viewport } from 'next';
import { WEBSITE_DESCRIPTION, WEBSITE_OGI, WEBSITE_THEME_COLOR, WEBSITE_TITLE, WEBSITE_URL } from '@/constants/website';

export const metadata: Metadata = {
    title: WEBSITE_TITLE,
    description: WEBSITE_DESCRIPTION,
    openGraph: {
        type: 'website',
        url: WEBSITE_URL,
        siteName: WEBSITE_TITLE,
        images: [
            {
                url: WEBSITE_OGI,
                width: 1200,
                height: 630,
            },
        ],
    },
};

export const viewport: Viewport = {
    themeColor: WEBSITE_THEME_COLOR,
    width: 'device-width',
    initialScale: 1.0,
    maximumScale: 1.0,
    userScalable: false,
};

export default function RootLayout({
                                       // Layouts must accept a children prop.
                                       // This will be populated with nested layouts or pages
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body>
                {children}
            </body>
        </html>
    )
};
