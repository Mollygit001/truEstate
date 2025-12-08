import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter, resetFilters } from '../redux/salesSlice';

const FilterSection = ({ title, children }) => (
    <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2 uppercase tracking-wider">{title}</h3>
        <div className="space-y-2">{children}</div>
    </div>
);

const CheckboxFilter = ({ label, value, checked, onChange }) => (
    <label className="flex items-center space-x-3 cursor-pointer group">
        <input
            type="checkbox"
            className="form-checkbox h-5 w-5 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:checked:bg-indigo-500 transition duration-150 ease-in-out"
            checked={checked}
            onChange={(e) => onChange(value, e.target.checked)}
        />
        <span className="text-gray-700 dark:text-gray-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition duration-150">{label}</span>
    </label>
);

const Sidebar = () => {
    const dispatch = useDispatch();
    const { filters, currentFilters } = useSelector((state) => state.sales);

    const handleMultiSelectChange = (field, value, isChecked) => {
        const currentValues = Array.isArray(currentFilters[field]) ? currentFilters[field] : [];
        const newValues = isChecked
            ? [...currentValues, value]
            : currentValues.filter((v) => v !== value);

        dispatch(setFilter({ [field]: newValues }));
    };

    const getArray = (field) => {
        const v = currentFilters[field];
        return Array.isArray(v) ? v : [];
    };

    const handleRangeChange = (field, value) => {
        dispatch(setFilter({ [field]: value }));
    };

    return (
        <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 h-full overflow-y-auto p-6 transition-colors duration-300">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Filters</h2>
                <button
                    onClick={() => dispatch(resetFilters())}
                    className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline"
                >
                    Reset All
                </button>
            </div>

            {/* Date Range */}
            <FilterSection title="Date Range">
                <div className="flex flex-col space-y-2">
                    <input
                        type="date"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-white"
                        value={currentFilters.dateFrom || ''}
                        onChange={(e) => handleRangeChange('dateFrom', e.target.value)}
                    />
                    <input
                        type="date"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-white"
                        value={currentFilters.dateTo || ''}
                        onChange={(e) => handleRangeChange('dateTo', e.target.value)}
                    />
                </div>
            </FilterSection>

            {/* Region */}
            <FilterSection title="Region">
                {filters.regions.map((region) => (
                    <CheckboxFilter
                        key={region}
                        label={region}
                        value={region}
                        checked={getArray('regions').includes(region)}
                        onChange={(val, checked) => handleMultiSelectChange('regions', val, checked)}
                    />
                ))}
            </FilterSection>

            {/* Category */}
            <FilterSection title="Category">
                {filters.categories.map((category) => (
                    <CheckboxFilter
                        key={category}
                        label={category}
                        value={category}
                        checked={getArray('categories').includes(category)}
                        onChange={(val, checked) => handleMultiSelectChange('categories', val, checked)}
                    />
                ))}
            </FilterSection>

            {/* Age Range */}
            <FilterSection title="Age Range">
                <div className="flex items-center space-x-2">
                    <input
                        type="number"
                        placeholder="Min"
                        className="w-1/2 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-white"
                        value={currentFilters.ageMin ?? ''}
                        onChange={(e) => handleRangeChange('ageMin', e.target.value)}
                    />
                    <span className="text-gray-500">-</span>
                    <input
                        type="number"
                        placeholder="Max"
                        className="w-1/2 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-white"
                        value={currentFilters.ageMax ?? ''}
                        onChange={(e) => handleRangeChange('ageMax', e.target.value)}
                    />
                </div>
            </FilterSection>

            {/* Gender */}
            <FilterSection title="Gender">
                {filters.genders.map((gender) => (
                    <CheckboxFilter
                        key={gender}
                        label={gender}
                        value={gender}
                        checked={getArray('genders').includes(gender)}
                        onChange={(val, checked) => handleMultiSelectChange('genders', val, checked)}
                    />
                ))}
            </FilterSection>

            {/* Payment Method */}
            <FilterSection title="Payment Method">
                {filters.paymentMethods.map((method) => (
                    <CheckboxFilter
                        key={method}
                        label={method}
                        value={method}
                        checked={getArray('paymentMethods').includes(method)}
                        onChange={(val, checked) => handleMultiSelectChange('paymentMethods', val, checked)}
                    />
                ))}
            </FilterSection>

            {/* Tags */}
            <FilterSection title="Tags">
                {filters.tags.map((tag) => (
                    <CheckboxFilter
                        key={tag}
                        label={tag}
                        value={tag}
                        checked={getArray('tags').includes(tag)}
                        onChange={(val, checked) => handleMultiSelectChange('tags', val, checked)}
                    />
                ))}
            </FilterSection>
        </aside>
    );
};

export default Sidebar;
