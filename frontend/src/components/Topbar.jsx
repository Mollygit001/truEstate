import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../redux/salesSlice';
import { toggleTheme } from '../redux/themeSlice';

const Topbar = () => {
    const dispatch = useDispatch();
    const { currentFilters } = useSelector((state) => state.sales);
    const { darkMode } = useSelector((state) => state.theme);
    const [searchTerm, setSearchTerm] = useState(currentFilters.search || '');

    // Debounce search
    useEffect(() => {
        const timer = setTimeout(() => {
            if (searchTerm !== currentFilters.search) {
                dispatch(setFilter({ search: searchTerm }));
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [searchTerm, dispatch, currentFilters.search]);

    return (
        <header className="bg-white dark:bg-gray-800 shadow-sm z-10 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                <div className="flex items-center">
                    <h1 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">RetailStats</h1>
                </div>

                <div className="flex-1 max-w-lg mx-8">
                    <div className="relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 dark:border-gray-600 rounded-md py-2 dark:bg-gray-700 dark:text-white transition-colors duration-300"
                            placeholder="Search by Customer Name or Phone..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="flex items-center">
                    <button
                        onClick={() => dispatch(toggleTheme())}
                        className="p-2 rounded-full text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none transition-colors duration-300"
                        aria-label="Toggle Dark Mode"
                    >
                        {darkMode ? (
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sun-icon lucide-sun"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-moon-icon lucide-moon"><path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"/></svg>
                        )}
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Topbar;
