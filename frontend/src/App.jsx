import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Layout from './components/Layout';
import DataTable from './components/DataTable';
import { getSales, getFilters } from './redux/salesSlice';
import { initializeTheme } from './redux/themeSlice';

function App() {
  const dispatch = useDispatch();
  const { currentFilters } = useSelector((state) => state.sales);
  const { darkMode } = useSelector((state) => state.theme);

  // Apply theme class on mount and when darkMode changes
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    dispatch(initializeTheme());
    dispatch(getFilters());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getSales(currentFilters));
  }, [dispatch, currentFilters]);

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-4 flex justify-between items-end">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Sales Dashboard</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">Manage and view retail sales data</p>
          </div>
        </div>
        <DataTable />
      </div>
    </Layout>
  );
}

export default App;
