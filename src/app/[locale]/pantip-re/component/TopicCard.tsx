'use client';

// import { getStrapiMedia } from '@utils/api-helpers';
import Image from 'next/image';
import Link from 'next/link';
import React, { type Dispatch, type SetStateAction } from 'react';

import anonymous from '../assets/anonymous.jpg';
import type { TopicProps } from '../interface';

export default function TopicCard({
  data,
  setSearchString,
  setSearchValueShow,
  selectedTag,
  setSelectedTag,
  children,
}: {
  data: TopicProps[];
  setSearchString: Dispatch<SetStateAction<string>>;
  setSearchValueShow: Dispatch<SetStateAction<string>>;
  selectedTag: string;
  setSelectedTag: Dispatch<SetStateAction<string>>;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex w-full flex-col items-center overflow-y-auto">
      <div className="flex w-full flex-wrap justify-center gap-16 gap-x-[40px] gap-y-8">
        {/* <div className="grid gap-x-[60px] gap-y-6 grid-flow-row grid-cols-[repeat(auto-fill,340px)]"> */}
        {data && data.length !== 0 ? (
          data.map((topicProps: TopicProps) => {
            // const imageUrl = getStrapiMedia(
            //   topicProps.attributes.cover.data?.attributes.url,
            // );
            const imageUrl = topicProps.attributes.cover.data?.attributes.url;

            const category = topicProps.attributes.category.data?.attributes;
            const authorsBio =
              topicProps.attributes.authorsBio.data?.attributes;

            // const avatarUrl = getStrapiMedia(
            //   authorsBio?.avatar.data.attributes.url,
            // );
            const avatarUrl = authorsBio?.avatar.data.attributes.url;
            const liststr = topicProps.attributes.tags.data;
            return (
              <Link
                className="flex size-fit"
                href={`/pantip-re/${category?.slug}/${topicProps.attributes.slug}`}
                key={topicProps.id}
              >
                <div
                  style={{
                    backgroundImage: `url(${
                      imageUrl as string
                    }), linear-gradient(180deg, rgba(47, 47, 47, 0.55) 0%, rgba(149, 149, 149, 0.00) 80%)

                    `,
                    backgroundSize: 'cover',
                    backgroundBlendMode: 'overlay',
                  }}
                  className="flex h-[250px] w-[300px] flex-col overflow-hidden rounded-lg px-6 py-4"
                >
                  <div className="flex h-fit w-full flex-col gap-y-1">
                    <div className="flex h-fit w-full items-center py-0.5">
                      <span className="line-clamp-2 text-left text-2xl font-semibold leading-[34px] text-white hover:underline">
                        {topicProps.attributes.title}
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
                          {topicProps.attributes.authorsBio?.data?.attributes
                            .name ?? 'Anonymous'}
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
                          {topicProps.attributes.comments
                            ? topicProps.attributes.comments.length.toString()
                            : '0'}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex size-full flex-col-reverse">
                    <div className="flex h-fit w-full flex-row gap-x-2 overflow-x-auto">
                      {liststr && liststr.length !== 0 ? (
                        liststr.map((item: any, _index) => {
                          return (
                            <button
                              type="button"
                              // eslint-disable-next-line react/no-array-index-key
                              key={_index}
                              className={`flex h-[29px] w-fit items-center text-nowrap rounded-lg px-2 text-sm font-normal opacity-85 hover:opacity-95 ${
                                selectedTag === item.attributes.name
                                  ? 'bg-Hof-df text-white'
                                  : 'bg-white text-Hof-df'
                              }`}
                              onClick={(e) => {
                                e.preventDefault();
                                // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                                selectedTag === item.attributes.name
                                  ? setSelectedTag('')
                                  : setSelectedTag(item.attributes.name);
                                setSearchValueShow('');
                                setSearchString('');
                              }}
                            >
                              {`#${item.attributes.name}`}
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
