import { configureStore } from "@reduxjs/toolkit";
import { UISlice } from "./slices/UISlice";
import { DrawSlice } from "./slices/DrawSlice";

export const store = configureStore({
  reducer: {
    [UISlice.name]: UISlice.reducer,
    [DrawSlice.name]: DrawSlice.reducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
