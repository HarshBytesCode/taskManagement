'use client'

import { Suspense } from "react";

export default function ProjectLayout({
    children,
  }: Readonly<{ children: React.ReactNode }>) {
    return (
        <Suspense>
            {children}
        </Suspense>

    );
}