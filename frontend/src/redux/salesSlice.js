import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchSales, fetchFilters } from '../services/api';

export const getSales = createAsyncThunk('sales/getSales', async (params) => {
    const response = await fetchSales(params);
    return response;
});

export const getFilters = createAsyncThunk('sales/getFilters', async () => {
    const response = await fetchFilters();
    return response.data;
});

const initialState = {
    sales: [],
    total: 0,
    totalPages: 0,
    currentPage: 1,
    loading: false,
    error: null,
    filters: {
        regions: [],
        genders: [],
        categories: [],
        paymentMethods: [],
        tags: []
    },
    currentFilters: {
        search: '',
        sort: '-date',
        page: 1,
                limit: 50,
        // Dynamic filters will be added here
    }
};

const salesSlice = createSlice({
    name: 'sales',
    initialState,
    reducers: {
        setFilter: (state, action) => {
            state.currentFilters = { ...state.currentFilters, ...action.payload, page: 1 }; // Reset to page 1 on filter change
        },
        setPage: (state, action) => {
            state.currentFilters.page = action.payload;
        },
        resetFilters: (state) => {
            state.currentFilters = {
                search: '',
                sort: '-date',
                page: 1,
                limit: 50
            };
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getSales.pending, (state) => {
                state.loading = true;
            })
            .addCase(getSales.fulfilled, (state, action) => {
                state.loading = false;
                state.sales = action.payload.data.sales;
                state.total = action.payload.total;
                state.totalPages = action.payload.totalPages;
                state.currentPage = action.payload.currentPage;
            })
            .addCase(getSales.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(getFilters.fulfilled, (state, action) => {
                state.filters = action.payload;
            });
    },
});

export const { setFilter, setPage, resetFilters } = salesSlice.actions;
export default salesSlice.reducer;
