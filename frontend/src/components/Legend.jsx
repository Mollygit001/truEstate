import React from 'react';

const Legend = () => {
    const colorGroups = [
        { label: 'Meta', color: 'gray-500', bgColor: 'bg-gray-100', description: 'Transaction ID, Date' },
        { label: 'Product', color: 'emerald-500', bgColor: 'bg-emerald-100', description: 'Category, SKU, Name, Brand, Price' },
        { label: 'Quantity', color: 'yellow-500', bgColor: 'bg-yellow-100', description: 'Order Quantity' },
        { label: 'Pricing & Payment', color: 'yellow-500', bgColor: 'bg-yellow-100', description: 'Discount, Amount, Payment Method' },
        { label: 'Operational', color: 'purple-500', bgColor: 'bg-purple-100', description: 'Status, Delivery, Store, Salesperson' },
        { label: 'Customer', color: 'indigo-500', bgColor: 'bg-indigo-100', description: 'Name, Gender, Age, Type, Region' },
        { label: 'Tags', color: 'teal-500', bgColor: 'bg-teal-100', description: 'Tags' },
    ];

    return (
        <div className="mb-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-3">Column Groups</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-2">
                {colorGroups.map((group) => (
                    <div key={group.label} className="flex flex-col items-center text-center">
                        <div className={`w-6 h-1 rounded-full mb-2 bg-${group.color}`} style={{ backgroundColor: `var(--color-${group.color})` }} />
                        <div className={`w-full px-2 py-1 rounded text-xs font-medium ${group.bgColor} text-gray-700 dark:text-gray-300`}>
                            {group.label}
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 leading-tight">{group.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Legend;
