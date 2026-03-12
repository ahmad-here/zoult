'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import blogsData from '../../data/blogs.js'
import blog1 from '../assets/blog1.jpg'
import blog2 from '../assets/blog2.jpg'
import blog3 from '../assets/blog3.jpg'
import Seemore from '../Seemore'

interface MainblogProps {
    onBlogSelect?: (blogId: number) => void;
}

export default function Mainblog({ onBlogSelect }: MainblogProps) {
    // Function to manage blog history and avoid repetition
    const getNextBlog = (): number => {
        const HISTORY_KEY = 'mainblog_history';
        const MAX_HISTORY = 10;

        // Get current history from localStorage
        let history: number[] = [];
        try {
            if (typeof window !== 'undefined') {
                const stored = localStorage.getItem(HISTORY_KEY);
                history = stored ? JSON.parse(stored) : [];
            }
        } catch (error) {
            history = [];
        }

        // Get available blog indices (excluding recent history)
        const allIndices = Array.from({ length: blogsData.length }, (_, i) => i);
        const availableIndices = allIndices.filter(index => !history.includes(index));

        let selectedIndex: number;

        // If we have available blogs that haven't been shown recently
        if (availableIndices.length > 0) {
            selectedIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];
        } else {
            // All blogs have been shown recently, reset history and pick random
            history = [];
            selectedIndex = Math.floor(Math.random() * blogsData.length);
        }

        // Add selected blog to history
        history.push(selectedIndex);

        // Keep only the last MAX_HISTORY entries
        if (history.length > MAX_HISTORY) {
            history = history.slice(-MAX_HISTORY);
        }

        // Save updated history
        try {
            if (typeof window !== 'undefined') {
                localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
            }
        } catch (error) {
            // Handle localStorage errors gracefully
        }

        return selectedIndex;
    };

    // Use lazy initialization to prevent re-renders and blinking
    const [selectedBlogIndex] = useState<number>(() => getNextBlog());
    const [isLoaded, setIsLoaded] = useState(false)
    const router = useRouter()

    // Array of imported images for dynamic assignment
    const blogImages = [blog1.src, blog2.src, blog3.src];

    // Get image for blog based on blogid
    const getImageForBlog = (blogid: number): string => {
        // blogid starts from 1, array index starts from 0
        const imageIndex = (blogid - 1) % blogImages.length;
        return blogImages[imageIndex];
    };

    useEffect(() => {
        // Set loaded state and notify parent of selected blog
        setIsLoaded(true);
        if (onBlogSelect && blogsData[selectedBlogIndex]) {
            onBlogSelect(blogsData[selectedBlogIndex].blogid);
        }
    }, [onBlogSelect, selectedBlogIndex]);

    // Show loading only until component is ready
    if (!isLoaded) {
        return (
            <div className="max-w-[700px] w-[80%]">
                <div className="animate-pulse">
                    <div className="h-8 bg-gray-200 rounded mb-6"></div>
                    <div className="h-64 bg-gray-200 rounded mb-6"></div>
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
            </div>
        );
    }

    const selectedBlog = blogsData[selectedBlogIndex];

    // Truncate content for preview
    const truncateContent = (content: string, maxLength: number = 150): string => {
        if (content.length <= maxLength) return content;
        return content.substr(0, maxLength) + '...';
    };

    // Navigate to individual blog page
    const handleBlogClick = () => {
        if (selectedBlog) {
            router.push(`/blogs/${selectedBlog.blogid}`)
        }
    };

    return (
        <div
            className="max-w-[700px] w-[80%] cursor-pointer group"
            onClick={handleBlogClick}
        >
            <h1 className="text-3xl font-bold mb-6 font-poppins transition-colors duration-300">
                {selectedBlog.tittle}
            </h1>

            <div className="mb-6 shadow-[0px_4px_17px_-5px_rgba(0,_0,_0,_0.8)] overflow-hidden rounded-lg group-hover:shadow-xl transition-shadow duration-300">
                <img
                    src={getImageForBlog(selectedBlog.blogid)}
                    alt={selectedBlog.tittle}
                    className="w-full h-auto group-hover:scale-105 transition-transform duration-300"
                />
            </div>

            <p className="text-base font-poppins text-gray-700">
                {truncateContent(selectedBlog.content)}
            </p>
            <div onClick={(e) => {
                e.stopPropagation() // Prevent blog container click when clicking see more
                handleBlogClick()
            }}>
                <Seemore />
            </div>
        </div>
    )
}