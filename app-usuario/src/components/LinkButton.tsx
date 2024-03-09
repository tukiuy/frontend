import Link from "next/link";
import React from "react";

export default function LinkButton({ href, icon, children }: { href: string, icon: JSX.Element, children: React.ReactNode }) {
    return (
        <Link href={href} className='group rounded-md flex flex-row items-center justify-center relative bg-white px-8 py-2 my-4 overflow-hidden border-1 border-dark border-opacity-30' >
            <span className="absolute top-0 left-0 w-40 h-40 bg-primary rounded-full transition-all ease-in duration-100 group-hover:-mt-16 scale-0 group-hover:animate-one-pulse group-hover:-ml-16"></span>
            {icon}
            <span className="relative ml-2 flex justify-center items-center text-sm text-center font-normal text-dark opacity-80">
                {children}
            </span>
        </Link>
    )
}