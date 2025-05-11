import { configureStore } from '@reduxjs/toolkit';
import authReducer from './redux-toolkit/slices/user_slices/user_slice';

export default configureStore({
  reducer: {
    auth: authReducer
  }
});