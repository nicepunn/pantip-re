import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type { Post } from '../../pantip-re/interface';

type PostsState = {
  postItems: Post[];
};

const initialState: PostsState = {
  postItems: [],
};

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    addPost: (_state, _action: PayloadAction<Post>) => {
      console.log('add post');
      const action = _action;
      _state.postItems.push(action.payload);
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
    },
    removePost: (_state, _action: PayloadAction<Post>) => {
      const state = _state;
      const action = _action;
      const remainItems = state.postItems.filter((obj) => {
        return obj.link !== action.payload.link;
      });
      state.postItems = remainItems;
    },
    removeAllPost: (_state, _action: PayloadAction) => {
      console.log('remove all post');
      _state.postItems = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const { addPost, removePost, removeAllPost } = postSlice.actions;
export default postSlice.reducer;
