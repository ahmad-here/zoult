'use client'

import { useState } from 'react'
import Joblist from "@/components/Joblist"
import Searchbar from "@/components/Searchbar"
import Navbar from "@/components/Navbar"
import Header from "@/components/Header"

export default function Jobs() {
    const [searchTerm, setSearchTerm] = useState('')

    const handleSearchChange = (value: string) => {
        setSearchTerm(value)
    }

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-50">
                <div className="flex flex-col items-center justify-center py-8">
                    <Header title="Job Opportunities" subtitle="Find your dream job" />
                    <Searchbar 
                        searchTerm={searchTerm} 
                        onSearchChange={handleSearchChange}
                    />
                    <div className="w-full">
                        <Joblist searchTerm={searchTerm} />
                    </div>
                </div>
            </div>
        </>
    )
}