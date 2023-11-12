import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../features/api/apiSlice";
import cartSlice from "../features/cart/cartSlice";
import authSlice from "../features/auth/authSlice";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    cart: cartSlice,
    auth: authSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

const storeState = store.getState;
const storeDispatch = store.dispatch;

export { store, storeState as RootState, storeDispatch as AppDispatch };
