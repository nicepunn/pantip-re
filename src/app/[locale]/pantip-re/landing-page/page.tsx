/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-console */

'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import {
  type Dispatch,
  type SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Form } from '../component/Form';
import TopicCard from '../component/TopicCard';
import type { Post, Tag } from '../interface';

function Loader() {
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center  bg-Hof-df/40">
      <div role="status">
        <svg
          aria-hidden="true"
          className="mr-2 inline size-8 animate-spin fill-purple-400 text-gray-200 dark:text-gray-600"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}

export default function Ground() {
  const router = useRouter();
  const [searchString, setSearchString] = useState('');
  const [posts, setPosts] = useState<any[]>([]);
  const [selectedTag, setSelectedTag] = useState<Tag>({ name: '', slug: '' });
  const [searchValueShow, setSearchValueShow] = useState('');
  // const [meta, setMeta] = useState<Meta | undefined | null>();
  const [isLoading, setLoading] = useState(true);

  // const searchParams = useSearchParams();
  // const pathname = usePathname();
  // const createPageURL = (_searchString: string, filterTag: string) => {
  //   const params = new URLSearchParams(searchParams);
  //   params.set('search', _searchString);
  //   params.set('filter', filterTag);
  //   return `${pathname}?${params.toString()}`;
  // };
  // const getUrlParamsValue = (key: string) => {
  //   const params = new URLSearchParams(searchParams);
  //   return params.get(key) ?? '';
  // };
  const methods = useForm({
    resolver: zodResolver(
      z.object({
        searchQuery: z.string(),
      }),
    ),
    defaultValues: {
      searchQuery: '',
    },
  });
  const { handleSubmit, setValue } = methods;
  const formSubmit = (searchQuery: { searchQuery: string }) => {
    setSearchString(searchQuery.searchQuery);
  };

  // eslint-disable-next-line react/no-unstable-nested-components
  const Speach = () => {
    return selectedTag.name === '' && selectedTag.slug === '' ? (
      <div className="flex w-full flex-col items-center gap-y-6">
        <div className="h-fit p-1 text-[32px] font-semibold text-Arches-df">
          Pantip.com
        </div>
        {/* <div className="h-fit max-w-full text-sm font-normal text-Hof-df">
          We{`'`}re thrilled to unveil the next chapter of our journey with you!
          Today marks a significant milestone as we introduce the refreshed
          Pantip.com—a platform built on innovation, connection, and community.
          At Pantip.com, we{`'`}ve always believed in the power of dialogue and
          the strength of our diverse community. With a fresh design and
          enhanced features, we{`'`}re excited to provide you with an even more
          enriching experience. Whether you{`'`}re here to share your thoughts,
          seek advice, or connect with like-minded individuals, Pantip.com is
          your destination for meaningful conversations and endless
          possibilities. To our loyal members, thank you for your continued
          support and engagement. Your passion drives us forward every day. To
          our new visitors, we extend a warm welcome and invite you to join our
          vibrant community. Together, let{`'`}s embark on this exciting journey
          of discovery, connection, and growth. Welcome to the New
          Pantip.com—where ideas thrive, and communities flourish. Happy
          exploring!
        </div> */}
      </div>
    ) : (
      <div className="flex w-full flex-col items-center gap-y-6">
        <div className="h-fit text-[32px] font-semibold text-black">
          {`#${selectedTag.name}`}
        </div>
      </div>
    );
  };

  const [isShowAllPosts, setShowAllPosts] = useState(false);

  const FetchBySearch = useCallback(async (searchStringForFetch: string) => {
    try {
      const response = await fetch(
        'https://pantip.com/api/search-service/search/query',
        {
          headers: {
            accept: 'application/json, text/plain, */*',
            'accept-language': 'en-US,en;q=0.9,ja;q=0.8',
            'cache-control': 'no-cache',
            'content-type': 'application/json;charset=UTF-8',
            pragma: 'no-cache',
            priority: 'u=1, i',
            ptauthorize: 'Basic dGVzdGVyOnRlc3Rlcg==',
            'sec-ch-ua':
              '"Chromium";v="124", "Google Chrome";v="124", "Not-A.Brand";v="99"',
            'sec-ch-ua-mobile': '?1',
            'sec-ch-ua-platform': '"Android"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-origin',
            cookie:
              'pantip_visitc=sdwhabqACrALls69t; _gid=GA1.2.626793181.1716403335; ka_iid=UR86RgWwFKXWS2rUX7Ev3Q; iUUID=d6d366011c97026b544a9d89dc16a477; PHPSESSID=8pej0d2cocp9phsqn50imk5m76; rlr=42729481; pantip_sessions=UvJUj9NIo02DG41aNupG5gbzViY58LliFc4xV5B94stX6iYPngTXxv2s554xoG6LmjcrftrQSthNVeHxVJLXsTxhAoRYgIMAM%2F8ngvB8%2Fnpus%2BosWVLwxnnaBS%2BMJl%2Bz2WOsnZMSbn%2FAv7JzHHspLPKr1pHlX%2BocHHli2lyqZOr3QP%2B%2FWKy%2Bi7QtFDs4jYxzy9ECAVwUvsiwCGbtJ3RPYQsm2NNfjTkhGc36lJQGylYPY4w2SpptsAopzJk3m9VOINL4eFzBxGb2qV%2BeLze6IxPR79PbMfAFbldry%2FFqZh48%2B0mMQKXbAhR9HRZQKGVY8SJRgWNytrX%2BrClAj9k0Uw%3D%3D; cto_bundle=34cm9F9lZXpJcCUyRlRSRHhlayUyQllyRWgwREhSWWwyZVJwdzNQTm5TcDlGYjRDYm13WTRvcCUyQmZhVWdDa1JEYjVqeVhyaVo0R3lPbEh0THdSTWJxcDNIJTJGN1NnMSUyRjZaY1NHT2c4S01iUHZncUJLeDhZb3FITGVMdzdpVmc0OWtPdFJBakFXWkdEUlB5cXVpM3M1SkNTclhjdVN4V0xBJTNEJTNE; freq.5f73e63e47e7040e00000000=1; innity.dmp.cks.innity=1; __gsas=ID=ed2a033e9bb0a9f6:T=1716515323:RT=1716515323:S=ALNI_MaTexi3EvLBuPaPPKbRlpxy5u4BaQ; innity.dmp.254.sess.id=27388905.254.1716517517709; ka_sid=XnXJQ1aSnunNi18sVs49bs; innity.dmp.254.sess=4.1716517517709.1716517837167.1716518031228; _dc_gtm_UA-10478864-2=1; _ga=GA1.1.2050989694.1716403335; _ga_ZMC2WGXL4Z=GS1.1.1716517644.8.1.1716518043.48.0.0',
            Referer: `https://pantip.com/search?q=${encodeURIComponent(searchStringForFetch)}`,
            'Referrer-Policy': 'strict-origin-when-cross-origin',
          },
          body: `{"keyword":"${searchStringForFetch}","limit":8,"type":"all","show_btn_search":"false"}`,
          method: 'POST',
        },
      );
      const result = await response.json();
      const { data } = result;
      const post = data
        .filter((item: any) => item !== undefined && item !== null)
        .map((item: any) =>
          item.type === 'tags'
            ? {
                name: item?.title ?? null,
                slug: item?.slug ?? null,
              }
            : null,
        )
        .filter((item: any) => item !== undefined && item !== null);
      return post;
    } catch (error) {
      console.error('Inner fetch error (fetch by search): ', error);
    }
  }, []);

  const FetchByFilter = useCallback(async (tag: Tag) => {
    const tagName = tag.name;
    const tagSlug = tag.slug;
    try {
      const response = await fetch(
        `https://pantip.com/api/forum-service/tag/tag_topic_trend?tag_name=${encodeURIComponent(tagName)}&limit=15`,
        {
          headers: {
            accept: 'application/json, text/plain, */*',
            'accept-language': 'en-US,en;q=0.9,ja;q=0.8',
            'cache-control': 'no-cache',
            pragma: 'no-cache',
            priority: 'u=1, i',
            ptauthorize: 'Basic dGVzdGVyOnRlc3Rlcg==',
            'sec-ch-ua':
              '"Chromium";v="124", "Google Chrome";v="124", "Not-A.Brand";v="99"',
            'sec-ch-ua-mobile': '?1',
            'sec-ch-ua-platform': '"Android"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-origin',
            cookie:
              'pantip_visitc=sdwhabqACrALls69t; freq.5f73e63e47e7040e00000000=1; _gid=GA1.2.626793181.1716403335; ka_iid=UR86RgWwFKXWS2rUX7Ev3Q; ka_sid=6caz5VnQK8p9M9CGZWrSGu; iUUID=d6d366011c97026b544a9d89dc16a477; innity.dmp.254.sess.id=27388905.254.1716403335083; innity.dmp.cks.innity=1; _dc_gtm_UA-10478864-2=1; innity.dmp.254.sess=14.1716403335083.1716407152361.1716407166993; _ga=GA1.1.2050989694.1716403335; _ga_ZMC2WGXL4Z=GS1.1.1716403334.1.1.1716407173.21.0.0',
            Referer: `https://pantip.com/tag/${encodeURIComponent(tagSlug)}`,
            'Referrer-Policy': 'strict-origin-when-cross-origin',
          },
          body: null,
          method: 'GET',
        },
      );
      console.log('Finished fetch');
      const result = await response.json();
      const { data } = result;
      const post = data
        .filter((item: any) => item !== undefined && item !== null)
        .map((item: any) => ({
          creator: item?.author ? item.author.name : null,
          title: item?.title || null,
          link: item?.author
            ? `https://pantip.com/topic/${item.topic_id}`
            : null,
          pubDate: item?.created_time || null,
          content: null, // Assuming content is not provided in raw data
          contentSnippet: null, // Assuming contentSnippet is not provided in raw data
          tags: item?.tags
            ? item.tags.map((tagg: any) => ({
                name: tagg.name,
                slug: tagg.slug,
              }))
            : null,
          isoDate: item?.created_time || null,
          coverImg: item?.thumbnail_url || null,
          authorImg:
            item?.author && item?.author.avatar
              ? item.author.avatar.original
              : null,
          commentCount: item?.comments_count || null,
        }));
      return post;
    } catch (error) {
      console.error('Inner fetch error (fetch by filter): ', error);
    }
  }, []);

  const FetchLandingPage = useCallback(
    async (
      setPosts: Dispatch<SetStateAction<Post[]>>,
      _searchString: string,
      _selectedTag: Tag,
    ) => {
      setLoading(true);
      async function createTags(
        __searchString: any,
        __selectedTag: any,
        _data: any,
      ) {
        if (_searchString !== '') {
          try {
            const result = await FetchBySearch(_searchString);
            return result;
          } catch (error) {
            console.error('Error fetching posts by search:', error);
            return [];
          }
        } else if (_selectedTag.name === '' && _selectedTag.slug === '') {
          return _data.map((item: any) => ({
            name: item.name,
            slug: item.slug,
          }));
        } else {
          return [_selectedTag];
        }
      }
      try {
        console.log('Get data from local server');
        const response = await fetch(
          'https://pantip.com/api/forum-service/home/get_tag_hit?limit=12',
          {
            headers: {
              accept: 'application/json, text/plain, */*',
              'accept-language': 'en-US,en;q=0.9,ja;q=0.8',
              priority: 'u=1, i',
              ptauthorize: 'Basic dGVzdGVyOnRlc3Rlcg==',
              'sec-ch-ua':
                '"Chromium";v="124", "Google Chrome";v="124", "Not-A.Brand";v="99"',
              'sec-ch-ua-mobile': '?1',
              'sec-ch-ua-platform': '"Android"',
              'sec-fetch-dest': 'empty',
              'sec-fetch-mode': 'cors',
              'sec-fetch-site': 'same-origin',
              cookie:
                'pantip_visitc=sdwhabqACrALls69t; _ga_ZMC2WGXL4Z=GS1.1.1716401809.1.1.1716403332.60.0.0; ka_sid=',
              Referer: 'https://pantip.com/',
              'Referrer-Policy': 'strict-origin-when-cross-origin',
            },
            body: null,
            method: 'GET',
          },
        );
        console.log('Finished fetch');
        const result = await response.json();
        const { data } = result;
        const tags = await createTags(_searchString, _selectedTag, data);
        console.log(tags);
        const postPromises = tags.map((tag: Tag) => FetchByFilter(tag));

        const resolvedPosts = await Promise.all(postPromises);
        const flattenedPosts = resolvedPosts.flat();

        setPosts(flattenedPosts);
      } catch (error) {
        console.error('Error fetching or parsing the RSS feed:', error);
      } finally {
        setLoading(false);
      }
    },
    [FetchByFilter, FetchBySearch],
  );

  useEffect(() => {
    if (selectedTag.name !== '' || searchString !== '') {
      setShowAllPosts(true);
    }
  }, [searchString, selectedTag]);

  useEffect(() => {
    // createPageURL(searchString, selectedTag.slug);
    FetchLandingPage(setPosts, searchString, selectedTag);
  }, [FetchLandingPage, FetchByFilter, router, searchString, selectedTag]);

  useEffect(() => {
    console.log(posts);
  }, [posts]);

  if (isLoading) return <Loader />;

  return (
    <div className="flex h-screen w-full flex-col gap-y-6 px-2 pt-6 md:px-[102px]">
      <div className="flex w-full flex-col gap-y-6" id="header">
        <Speach />
        {selectedTag.slug === '' ? (
          <Form {...methods}>
            <form
              onSubmit={handleSubmit(formSubmit)}
              className="relative mb-1 flex h-fit w-full"
            >
              {searchValueShow === '' ? (
                <div>
                  <button
                    aria-label="."
                    className="absolute right-3 top-2 size-6"
                    type="submit"
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="absolute right-3 top-2 self-center"
                  >
                    <path
                      d="M19.6 21L13.3 14.7C12.8 15.1 12.225 15.4167 11.575 15.65C10.925 15.8833 10.2333 16 9.5 16C7.68333 16 6.146 15.3707 4.888 14.112C3.63 12.8533 3.00067 11.316 3 9.5C3 7.68333 3.62933 6.146 4.888 4.888C6.14667 3.63 7.684 3.00067 9.5 3C11.3167 3 12.8543 3.62933 14.113 4.888C15.3717 6.14667 16.0007 7.684 16 9.5C16 10.2333 15.8833 10.925 15.65 11.575C15.4167 12.225 15.1 12.8 14.7 13.3L21 19.6L19.6 21ZM9.5 14C10.75 14 11.8127 13.5627 12.688 12.688C13.5633 11.8133 14.0007 10.7507 14 9.5C14 8.25 13.5627 7.18767 12.688 6.313C11.8133 5.43833 10.7507 5.00067 9.5 5C8.25 5 7.18767 5.43767 6.313 6.313C5.43833 7.18833 5.00067 8.25067 5 9.5C5 10.75 5.43767 11.8127 6.313 12.688C7.18833 13.5633 8.25067 14.0007 9.5 14Z"
                      fill="#E7E7E7"
                    />
                  </svg>
                </div>
              ) : (
                <div />
              )}
              <input
                value={searchValueShow}
                placeholder="Search"
                className="h-10 w-full rounded-full border border-solid border-Hof-df bg-white px-3 py-2 text-sm font-normal text-Hof-df placeholder:text-Hof-df focus:border-Foggy-df"
                onChange={(e) => {
                  setSearchValueShow(e.target.value);
                  setValue('searchQuery', e.target.value);
                }}
              />
            </form>
          </Form>
        ) : (
          <div />
        )}
      </div>
      <TopicCard
        data={posts}
        selectedTag={selectedTag}
        setSelectedTag={setSelectedTag}
        searchString={searchString}
        setSearchString={setSearchString}
        setSearchValueShow={setSearchValueShow}
        isShowAllPost={isShowAllPosts}
      >
        {searchString === '' && selectedTag.slug === '' && (
          <div className="flex justify-center">
            <button
              type="button"
              className="rounded-lg px-6 py-5 text-sm hover:underline md:py-3"
              onClick={() => {
                setShowAllPosts(!isShowAllPosts);
              }}
            >
              {isShowAllPosts ? 'See less posts...' : 'See more posts...'}
            </button>
          </div>
        )}
      </TopicCard>
    </div>
  );
}
