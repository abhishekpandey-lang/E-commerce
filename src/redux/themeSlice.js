import { createSlice } from '@reduxjs/toolkit';

const getInitialTheme = () => {
  const savedTheme = localStorage.getItem('theme');
  return savedTheme || 'light'; // default to light if no theme is saved
};

const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    mode: getInitialTheme(),
  },
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', state.mode); // Save to localStorage
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export const selectTheme = (state) => state.theme.mode;
export default themeSlice.reducer;
