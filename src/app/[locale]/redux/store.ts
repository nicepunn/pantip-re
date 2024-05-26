// import { combineReducers, configureStore } from '@reduxjs/toolkit';
// import type { TypedUseSelectorHook } from 'react-redux';
// import { useSelector } from 'react-redux';
// import { persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';

// // eslint-disable-next-line import/no-named-as-default
// import postSlice from './features/postSlice';

// const persistConfig = {
//   // key: 'rootPersist',
//   key: 'root',
//   storage,
//   whitelist: ['addPost', 'removePost'], // List of reducers to persist
// };

// const rootReducer = combineReducers({ postSlice });
// const reduxPersistedReducer = persistReducer(persistConfig, rootReducer);

// export const store = configureStore({
//   reducer: reduxPersistedReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         // Ignore these action types
//         ignoredActions: ['your/action/type'],
//         // Ignore these field paths in all actions
//         ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
//         // Ignore these paths in the state
//         ignoredPaths: ['items.dates'],
//       },
//     }),
// });

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// eslint-disable-next-line import/no-named-as-default
import postSlice from './features/postSlice';

// Combine all reducers into the rootReducer
const rootReducer = combineReducers({
  mySession: postSlice,
  // Add other reducers here if needed
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['mySession'], // List of reducers to persist
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// const store = configureStore({
//   reducer: rootReducer,
// });

// Create the Redux store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export { store };
export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
