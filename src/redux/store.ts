import { configureStore } from '@reduxjs/toolkit';
import appReducer from '../views/HomePage/redux';
import layoutReducer from '../views/Layout/redux';

export const store = configureStore({
  reducer: {
    app: appReducer,
    layout: layoutReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
