/* eslint-disable unused-imports/no-unused-vars */

'use client';

// import { getStrapiMedia } from '@utils/api-helpers';
import Image from 'next/image';
import Link from 'next/link';
import React, {
  type Dispatch,
  type SetStateAction,
  useEffect,
  useState,
} from 'react';

import anonymous from '../assets/anonymous.jpg';
import type { Post, Tag } from '../interface';

export default function TopicCard({
  data,
  setSearchString,
  searchString,
  setSearchValueShow,
  selectedTag,
  setSelectedTag,
  isShowAllPost,
  children,
}: {
  data: Post[];
  setSearchString: Dispatch<SetStateAction<string>>;
  searchString: string;
  setSearchValueShow: Dispatch<SetStateAction<string>>;
  selectedTag: Tag;
  setSelectedTag: Dispatch<SetStateAction<Tag>>;
  isShowAllPost: boolean;
  children?: React.ReactNode;
}) {
  const [dataShow, setDataShow] = useState(data.slice(0, 12));

  useEffect(() => {
    const filteredData = data.filter(
      (post: Post) =>
        (selectedTag.slug !== '' &&
          post.tags?.some((tag) => tag.slug === selectedTag.slug)) ||
        (searchString !== '' &&
          (post.title?.includes(searchString) ||
            post.content?.includes(searchString))) ||
        (selectedTag.slug === '' && searchString === ''),
    );

    if (isShowAllPost) {
      setDataShow(filteredData);
    } else {
      setDataShow(filteredData.slice(0, Math.min(12, data.length)));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchString, selectedTag, isShowAllPost, data]);

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log(
      `isShowAllPost: ${isShowAllPost} \n searchString: ${searchString} \n selectedTag: ${selectedTag.name}`,
    );
    // eslint-disable-next-line no-console
    console.log(dataShow);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataShow]);

  // useEffect(() => {
  //   console.log(selectedTag);
  // }, [selectedTag]);

  return (
    <div className="flex w-full flex-col items-center overflow-y-auto">
      <div className="flex w-full flex-wrap justify-center gap-16 gap-x-[40px] gap-y-8">
        {/* <div className="grid gap-x-[60px] gap-y-6 grid-flow-row grid-cols-[repeat(auto-fill,340px)]"> */}
        {dataShow && dataShow.length !== 0 ? (
          dataShow.map((post: Post) => {
            const imageUrl =
              post.coverImg ??
              'https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvdjU0NmJhdGNoMy1teW50LTM0LWJhZGdld2F0ZXJjb2xvcl8xLmpwZw.jpg';
            const avatarUrl = post.authorImg;
            const liststr = post.tags;
            return (selectedTag.slug !== '' &&
              post.tags?.some((tag) => tag.slug === selectedTag.slug)) ||
              (searchString !== '' &&
                (post.title?.includes(searchString) ||
                  post.content?.includes(searchString))) ||
              (selectedTag.slug === '' && searchString === '') ? (
              <Link
                className="flex size-fit"
                href={post.link ?? '/'}
                key={post.link}
              >
                <div
                  style={{
                    backgroundImage: `url(${
                      imageUrl as string
                    }), linear-gradient(180deg, rgba(47, 47, 47, 0.55) 30%, rgba(149, 149, 149, 0.00) 70%)

                    `,
                    backgroundSize: 'cover',
                    backgroundBlendMode: 'overlay',
                  }}
                  className="flex h-[300px] w-[415px] flex-col overflow-hidden rounded-lg px-6 py-4"
                >
                  <div className="flex h-fit w-full flex-col gap-y-1">
                    <div className="flex h-fit w-full items-center py-0.5">
                      <span className="line-clamp-2 text-left text-2xl font-semibold leading-[34px] text-white hover:underline">
                        {post.title}
                      </span>
                    </div>
                    <div className="flex h-fit w-full flex-row items-center gap-x-4">
                      <div className="flex size-fit max-w-44 flex-row items-center gap-x-2">
                        <Image
                          alt="profiepic"
                          src={(avatarUrl as string) ?? anonymous}
                          className="size-9 rounded-full"
                          width={36}
                          height={36}
                        />
                        <div className="line-clamp-1 text-left text-sm font-normal text-white">
                          {post.creator ?? 'Anonymous'}
                        </div>
                      </div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="4"
                        height="4"
                        viewBox="0 0 3 4"
                        fill="none"
                      >
                        <ellipse
                          cx="1.5"
                          cy="1.5"
                          rx="1.5"
                          ry="1.5"
                          fill="#D9D9D9"
                        />
                      </svg>
                      <div className="flex size-fit flex-row items-end gap-x-2">
                        <svg
                          className="size-[24px] text-Babu-df dark:text-white"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M4 3a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h1v2a1 1 0 0 0 1.707.707L9.414 13H15a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H4Z"
                            clip-rule="evenodd"
                          />
                          <path
                            fill-rule="evenodd"
                            d="M8.023 17.215c.033-.03.066-.062.098-.094L10.243 15H15a3 3 0 0 0 3-3V8h2a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-1v2a1 1 0 0 1-1.707.707L14.586 18H9a1 1 0 0 1-.977-.785Z"
                            clip-rule="evenodd"
                          />
                        </svg>

                        <div className="line-clamp-1 pb-0.5 text-sm font-normal text-white">
                          {post.commentCount
                            ? post.commentCount.toString()
                            : 'N/A'}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex size-full flex-col-reverse">
                    <div className="flex h-fit w-full flex-row gap-x-2 overflow-x-auto">
                      {liststr && liststr.length !== 0 ? (
                        liststr.map((item: Tag, _index) => {
                          return (
                            <button
                              type="button"
                              // eslint-disable-next-line react/no-array-index-key
                              key={_index}
                              className={`flex h-[29px] w-fit items-center text-nowrap rounded-lg px-2 text-sm font-normal opacity-85 hover:opacity-95 ${
                                selectedTag.slug === item.slug
                                  ? 'bg-Hof-df text-white'
                                  : 'bg-white text-Hof-df'
                              }`}
                              onClick={(e) => {
                                e.preventDefault();
                                // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                                selectedTag.slug === item.slug
                                  ? setSelectedTag({ name: '', slug: '' })
                                  : setSelectedTag(item);
                                setSearchValueShow('');
                                setSearchString('');
                              }}
                            >
                              {`#${item.name}`}
                            </button>
                          );
                        })
                      ) : (
                        <div />
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ) : (
              // eslint-disable-next-line react/jsx-no-useless-fragment
              <></>
            );
          })
        ) : (
          <div className="flex h-fit w-full flex-col items-center justify-center gap-y-4 rounded-lg bg-Babu-df/10 px-2.5 py-16">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="64"
              height="64"
              viewBox="0 0 64 64"
              fill="none"
            >
              <path
                d="M31.9999 58.6668C46.7275 58.6668 58.6666 46.7278 58.6666 32.0002C58.6666 17.2726 46.7275 5.3335 31.9999 5.3335C17.2723 5.3335 5.33325 17.2726 5.33325 32.0002C5.33325 46.7278 17.2723 58.6668 31.9999 58.6668Z"
                stroke="#2F2F2F"
                stroke-width="2"
                stroke-linecap="round"
              />
              <path
                d="M21.3333 24.1334V23.8667M42.6666 24.1334V23.8667"
                stroke="#2F2F2F"
                stroke-width="2"
                stroke-linecap="round"
              />
              <path
                d="M42.6666 42.667C41.3333 38.667 37.8933 34.667 31.9999 34.667C26.1066 34.667 22.6666 38.667 21.3333 42.667"
                stroke="#2F2F2F"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <div className="text-sm font-bold text-Hof-df">
              Sorry, we couldn{`'`}t find any results.
            </div>
          </div>
        )}
      </div>
      {children && children}
    </div>
  );
}
