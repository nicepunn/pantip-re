'use client';

import type { Post } from '../pantip-re/interface';
import { addPost, removeAllPost } from '../redux/features/postSlice';
import { useAppDispatch, useAppSelector } from '../redux/store';

export default function Test() {
  const mock = useAppSelector((state) => state.mySession.postItems);
  const dispatch = useAppDispatch();

  const addOne = () => {
    const mockPost: Post = {
      creator: 'nicepun',
      title: 'how to drum',
      link: null,
      pubDate: null,
      content: null,
      contentSnippet: null,
      tags: null,
      isoDate: null,
      coverImg: null,
      authorImg: undefined,
      commentCount: null,
    };
    dispatch(addPost(mockPost));
  };

  return (
    <div>
      <button type="button" onClick={() => addOne()}>
        add 1 null post
      </button>
      <div>{JSON.stringify(mock)}</div>

      <button type="button" onClick={() => dispatch(removeAllPost())}>
        delete all
      </button>
    </div>
  );
}
