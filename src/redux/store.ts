import { configureStore } from '@reduxjs/toolkit';
import appReducer from '../views/HomePage/redux';
import layoutReducer from '../views/Layout/redux';
import resultsReducer from '../views/ExploreResults/redux';
import setupReducer from '../views/components/SetUpFlight/redux';

export const store = configureStore({
  reducer: {
    app: appReducer,
    layout: layoutReducer,
    results: resultsReducer,
    setup: setupReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
