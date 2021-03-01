import { configureStore } from '@reduxjs/toolkit'
import iconReducer from '../features/iconSlice'
import URLparamaterReducer from '../features/URLparamaterSlice'
export default configureStore({
  reducer: {
    icons: iconReducer,
    URLparamater: URLparamaterReducer,
  },
})
