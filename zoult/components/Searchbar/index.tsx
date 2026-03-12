'use client'

interface SearchbarProps {
    searchTerm: string;
    onSearchChange: (value: string) => void;
    placeholder?: string;
}

export default function Searchbar({ searchTerm, onSearchChange, placeholder = "Search jobs by title, company, location, or skills..." }: SearchbarProps) {
    const clearSearch = () => {
        onSearchChange('')
    }

    return (
        <div className="w-full max-w-2xl mx-auto px-6 mb-8">
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                    placeholder={placeholder}
                    className="block w-full pl-12 pr-12 py-4 border border-gray-300 rounded-full bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#A8D400] focus:border-transparent text-gray-900 placeholder-gray-500 font-poppins"
                />
                {searchTerm && (
                    <button
                        onClick={clearSearch}
                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600"
                    >
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                )}
            </div>
            
            {/* Search Stats */}
            {searchTerm && (
                <div className="mt-3 text-sm text-gray-600 font-poppins">
                    Searching for: <span className="font-medium text-gray-900">"{searchTerm}"</span>
                </div>
            )}
        </div>
    )
}