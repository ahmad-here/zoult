'use client'

import { useMemo } from 'react'
import jobsData from '../../data/jobs.js'

interface JoblistProps {
    searchTerm?: string;
    count?: number;
}

export default function Joblist({ searchTerm = "", count }: JoblistProps) {
    // Filter jobs based on search term
    const filteredJobs = useMemo(() => {
        if (!searchTerm.trim()) {
            return jobsData;
        }
        
        const searchLower = searchTerm.toLowerCase().trim();
        return jobsData.filter(job => 
            job.title.toLowerCase().includes(searchLower) ||
            job.company.toLowerCase().includes(searchLower) ||
            job.location.toLowerCase().includes(searchLower) ||
            job.workType.toLowerCase().includes(searchLower) ||
            job.skills.some(skill => skill.toLowerCase().includes(searchLower)) ||
            job.description.toLowerCase().includes(searchLower)
        );
    }, [searchTerm]);

    // Limit results if count is specified
    const jobsToShow = count ? filteredJobs.slice(0, count) : filteredJobs;

    const handleApply = (jobId: number, jobTitle: string) => {
        // Handle job application logic
        console.log(`Applied to job: ${jobTitle} (ID: ${jobId})`);
        // You can add actual application logic here
    };

    if (jobsToShow.length === 0) {
        return (
            <div className="w-full max-w-4xl mx-auto p-6">
                <div className="text-center py-12">
                    <p className="text-xl text-gray-500 font-poppins">
                        {searchTerm ? `No jobs found for "${searchTerm}"` : "No jobs available at the moment."}
                    </p>
                    {searchTerm && (
                        <p className="text-gray-400 mt-2 font-poppins">
                            Try searching with different keywords or check back later.
                        </p>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="w-full max-w-4xl mx-auto p-6 font-poppins">
            <div className="space-y-6">
                {jobsToShow.map((job) => (
                    <div 
                        key={job.id} 
                        className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-300"
                    >
                        {/* Job Title */}
                        <h2 className="text-xl font-bold text-gray-900 mb-2">
                            {job.title}
                        </h2>
                        
                        {/* Work Type */}
                        <p className="text-gray-600 mb-3">
                            Work: {job.workType}
                        </p>
                        
                        {/* Description */}
                        <p className="text-gray-700 leading-relaxed mb-4 text-sm">
                            {job.description}
                        </p>
                        
                        {/* Bottom Section with Salary and Apply Button */}
                        <div className="flex items-center justify-between">
                            <div className="flex flex-col">
                                <span className="text-gray-900 font-medium">
                                    Salary: {job.salary}
                                </span>
                                <span className="text-gray-500 text-sm mt-1">
                                    {job.company} • {job.location}
                                </span>
                            </div>
                            
                            <button
                                onClick={() => handleApply(job.id, job.title)}
                                className="bg-[#A8D400] hover:bg-[#96c000] text-black font-medium px-6 py-2 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#A8D400] focus:ring-opacity-50"
                            >
                                Apply
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}