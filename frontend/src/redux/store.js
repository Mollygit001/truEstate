import { configureStore } from '@reduxjs/toolkit';
import salesReducer from './salesSlice';
import themeReducer from './themeSlice';

export const store = configureStore({
    reducer: {
        sales: salesReducer,
        theme: themeReducer,
    },
});
