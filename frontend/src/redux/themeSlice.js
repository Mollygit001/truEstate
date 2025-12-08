import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    darkMode: localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches),
};

const applyTheme = (isDark) => {
    const html = document.documentElement;
    if (isDark) {
        html.classList.add('dark');
    } else {
        html.classList.remove('dark');
    }
};

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        toggleTheme: (state) => {
            state.darkMode = !state.darkMode;
            applyTheme(state.darkMode);
            localStorage.setItem('theme', state.darkMode ? 'dark' : 'light');
        },
        initializeTheme: (state) => {
            applyTheme(state.darkMode);
        }
    },
});

export const { toggleTheme, initializeTheme } = themeSlice.actions;
export default themeSlice.reducer;
