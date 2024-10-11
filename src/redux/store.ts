import { configureStore } from '@reduxjs/toolkit';
import viewsReducer from '../views/redux';

export const store = configureStore({
  reducer: {
    views: viewsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
