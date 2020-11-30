import { configureStore } from '@reduxjs/toolkit';
import iconReducer from '../features/iconSlice';
export default configureStore({
  reducer: {
    icons: iconReducer,
  },
});
