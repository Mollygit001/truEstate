import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPage, setFilter } from '../redux/salesSlice';
import Legend from './Legend';

const DataTable = () => {
    const dispatch = useDispatch();
    const { sales, total, totalPages, currentPage, loading, currentFilters } = useSelector((state) => state.sales);
    const limit = Number(currentFilters.limit) || 50;

    const handleSort = (field) => {
        const currentSort = currentFilters.sort;
        let newSort = field;
        if (currentSort === field) {
            newSort = `-${field}`;
        } else if (currentSort === `-${field}`) {
            newSort = field;
        }
        dispatch(setFilter({ sort: newSort }));
    };

    const getSortIcon = (field) => {
        if (currentFilters.sort === field) return '▲';
        if (currentFilters.sort === `-${field}`) return '▼';
        return '';
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    if (sales.length === 0) {
        return (
            <div className="flex flex-col justify-center items-center h-64 text-gray-500 dark:text-gray-400">
                <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <p className="text-lg">No sales found matching your criteria.</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full">
            <Legend />
            <div className="overflow-x-auto shadow-md sm:rounded-lg flex-grow">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                            {/* Meta */}
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:text-indigo-600 border-b-4 border-gray-500" onClick={() => handleSort('operational.orderId')}>
                                Transaction ID {getSortIcon('operational.orderId')}
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:text-indigo-600 border-b-4 border-gray-500" onClick={() => handleSort('date')}>
                                Date {getSortIcon('date')}
                            </th>

                            {/* Product group (green) */}
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider border-b-4 border-emerald-500">
                                Product
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:text-indigo-600 border-b-4 border-emerald-500" onClick={() => handleSort('product.sku')}>
                                SKU {getSortIcon('product.sku')}
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:text-indigo-600 border-b-4 border-emerald-500" onClick={() => handleSort('product.name')}>
                                Product Name {getSortIcon('product.name')}
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:text-indigo-600 border-b-4 border-emerald-500" onClick={() => handleSort('product.brand')}>
                                Brand {getSortIcon('product.brand')}
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:text-indigo-600 border-b-4 border-emerald-500" onClick={() => handleSort('product.price')}>
                                Unit Price {getSortIcon('product.price')}
                            </th>

                            {/* Quantity */}
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider border-b-4 border-yellow-500 cursor-pointer" onClick={() => handleSort('quantity')}>
                                Qty {getSortIcon('quantity')}
                            </th>

                            {/* Pricing & Payment (yellow) */}
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:text-indigo-600 border-b-4 border-yellow-500" onClick={() => handleSort('pricing.discount')}>
                                Discount {getSortIcon('pricing.discount')}
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:text-indigo-600 border-b-4 border-yellow-500" onClick={() => handleSort('pricing.finalAmount')}>
                                Amount {getSortIcon('pricing.finalAmount')}
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:text-indigo-600 border-b-4 border-yellow-500" onClick={() => handleSort('paymentMethod')}>
                                Payment {getSortIcon('paymentMethod')}
                            </th>

                            {/* Operational / Store / Salesperson (purple) */}
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:text-indigo-600 border-b-4 border-purple-500" onClick={() => handleSort('operational.status')}>
                                Order Status {getSortIcon('operational.status')}
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:text-indigo-600 border-b-4 border-purple-500" onClick={() => handleSort('operational.deliveryType')}>
                                Delivery {getSortIcon('operational.deliveryType')}
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:text-indigo-600 border-b-4 border-purple-500" onClick={() => handleSort('store.location')}>
                                Store {getSortIcon('store.location')}
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:text-indigo-600 border-b-4 border-purple-500" onClick={() => handleSort('salesperson.name')}>
                                Salesperson {getSortIcon('salesperson.name')}
                            </th>

                            {/* Customer group (indigo) */}
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:text-indigo-600 border-b-4 border-indigo-500" onClick={() => handleSort('customer.name')}>
                                Customer {getSortIcon('customer.name')}
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:text-indigo-600 border-b-4 border-indigo-500" onClick={() => handleSort('customer.gender')}>
                                Gender {getSortIcon('customer.gender')}
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:text-indigo-600 border-b-4 border-indigo-500" onClick={() => handleSort('customer.age')}>
                                Age {getSortIcon('customer.age')}
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:text-indigo-600 border-b-4 border-indigo-500" onClick={() => handleSort('customer.type')}>
                                Customer Type {getSortIcon('customer.type')}
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:text-indigo-600 border-b-4 border-indigo-500" onClick={() => handleSort('customer.region')}>
                                Region {getSortIcon('customer.region')}
                            </th>

                            {/* Tags (teal) */}
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider border-b-4 border-teal-500">
                                Tags
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        {sales.map((sale) => (
                            <tr key={sale._id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-150">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                                        {sale.operational?.orderId || sale._id}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                        {sale.date ? new Date(sale.date).toLocaleDateString() : ''}
                                    </td>

                                    {/* Product group */}
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 border-l-4 border-emerald-100">
                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                                            {sale.product?.category}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 border-l-4 border-emerald-100">
                                        {sale.product?.sku || ''}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white border-l-4 border-emerald-100">
                                        {sale.product?.name || ''}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 border-l-4 border-emerald-100">
                                        {sale.product?.brand || ''}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white border-l-4 border-emerald-100">
                                        ${sale.product?.price !== undefined ? Number(sale.product.price).toFixed(2) : '0.00'}
                                    </td>

                                    {/* Quantity */}
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 border-l-4 border-yellow-100">
                                        {sale.quantity}
                                    </td>

                                    {/* Pricing & Payment */}
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 border-l-4 border-yellow-100">
                                        {sale.pricing?.discount !== undefined ? sale.pricing.discount : ''}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white font-bold border-l-4 border-yellow-100">
                                        ${((sale.pricing && (sale.pricing.finalAmount ?? sale.pricing.totalAmount)) || 0).toFixed(2)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 border-l-4 border-yellow-100">
                                        {sale.paymentMethod || ''}
                                    </td>

                                    {/* Operational / Store / Salesperson */}
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 border-l-4 border-purple-100">
                                        {sale.operational?.status || ''}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 border-l-4 border-purple-100">
                                        {sale.operational?.deliveryType || ''}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 border-l-4 border-purple-100">
                                        {sale.store?.location || ''}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white border-l-4 border-purple-100">
                                        {sale.salesperson?.name || ''}
                                    </td>

                                    {/* Customer group */}
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white border-l-4 border-indigo-100">
                                        <div className="flex flex-col">
                                            <span>{sale.customer?.name}</span>
                                            <span className="text-xs text-gray-400">{sale.customer?.phone}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 border-l-4 border-indigo-100">
                                        {sale.customer?.gender || ''}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 border-l-4 border-indigo-100">
                                        {sale.customer?.age ?? ''}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 border-l-4 border-indigo-100">
                                        {sale.customer?.type || ''}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 border-l-4 border-indigo-100">
                                        {sale.customer?.region}
                                    </td>

                                    {/* Tags */}
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 border-l-4 border-teal-100">
                                        <div className="flex gap-1">
                                            {(sale.tags || []).map(tag => (
                                                <span key={tag} className="px-2 py-0.5 text-xs rounded bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-300">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="py-3 flex items-center justify-between border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 sm:px-6 mt-auto">
                <div className="flex-1 flex justify-between sm:hidden">
                    <button
                        onClick={() => dispatch(setPage(currentPage - 1))}
                        disabled={currentPage === 1}
                        className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                    >
                        Previous
                    </button>
                    <button
                        onClick={() => dispatch(setPage(currentPage + 1))}
                        disabled={currentPage === totalPages}
                        className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                            <div>
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                            Showing <span className="font-medium">{(currentPage - 1) * limit + 1}</span> to <span className="font-medium">{Math.min(currentPage * limit, total)}</span> of <span className="font-medium">{total}</span> results
                        </p>
                    </div>
                    <div>
                        <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                            <button
                                onClick={() => dispatch(setPage(currentPage - 1))}
                                disabled={currentPage === 1}
                                className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm font-medium text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50"
                            >
                                <span className="sr-only">Previous</span>
                                &larr;
                            </button>
                            {/* Simple pagination logic for brevity */}
                            {[...Array(totalPages)].map((_, i) => {
                                // Show first, last, current, and surrounding
                                if (i + 1 === 1 || i + 1 === totalPages || (i + 1 >= currentPage - 1 && i + 1 <= currentPage + 1)) {
                                    return (
                                        <button
                                            key={i}
                                            onClick={() => dispatch(setPage(i + 1))}
                                            className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${currentPage === i + 1 ? 'z-10 bg-indigo-50 dark:bg-indigo-900 border-indigo-500 text-indigo-600 dark:text-indigo-200' : 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600'}`}
                                        >
                                            {i + 1}
                                        </button>
                                    );
                                } else if (i + 1 === currentPage - 2 || i + 1 === currentPage + 2) {
                                    return <span key={i} className="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300">...</span>;
                                }
                                return null;
                            })}
                            <button
                                onClick={() => dispatch(setPage(currentPage + 1))}
                                disabled={currentPage === totalPages}
                                className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm font-medium text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50"
                            >
                                <span className="sr-only">Next</span>
                                &rarr;
                            </button>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DataTable;
