import { configureStore } from "@reduxjs/toolkit";
import assessorReducer from '../features/assessors/assessorSlice'
import centerReducer from '../features/center/centerSlice'
export const store = configureStore({
  reducer: {
    assessors: assessorReducer,
    centers: centerReducer,
  },
});
