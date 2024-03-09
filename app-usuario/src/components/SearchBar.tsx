'use client'

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";


export default function SearchBar({ className } : { className?: string}): JSX.Element {
    const router = useRouter();
    const path = usePathname();
    const params = useSearchParams();
    const [search, setSearch] = useState("");

    const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
        const current = new URLSearchParams(Array.from(params.entries()));
        setSearch(event.target.value);
        current.set("search", event.target.value);
        const queryParams = current.toString();
        const query = queryParams ? `?${queryParams}` : "";
        router.push(`${path}${query}`);
    }

    return <>
        <div className={`${className} group flex flex-row items-center justify-around rounded-xl px-1 py-2 border-1 border-dark border-opacity-10
        bg-opacity-40 bg-light backdrop-saturate-150 saturate-10 `}>
            <input type="search" name="search" onChange={handleSearch} value={search} placeholder="Estoy buscando"
                className="w-5/6 outline-none p-1 text-dark rounded- bg-transparent  border-primary border-opacity-40
                focus:outline-none focus:border-b-1"/>
            <MagnifyingGlassIcon className="w-5 text-primary"/>
        </div>
    </>
}