// import { zodResolver } from '@hookform/resolvers/zod';
// import { Loader } from '@storybook/react';
// import router from 'next/dist/shared/lib/router/router';
// import { usePathname, useSearchParams } from 'next/navigation';
// import { useCallback, useEffect } from 'react';
// import { useForm } from 'react-hook-form';
// import { z } from 'zod';

// import Ground from './_component/Ground';
// import { FetchLandingPage } from './api/routers/posts';

// export default function LandingPage() {
//   // async function fetch() {
//   //   const data = await FetchLandingPage();
//   //   console.log(data);
//   //   return data;
//   // }

//   const searchParams = useSearchParams();
//   const pathname = usePathname();
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   const createPageURL = (_searchString: string, filterTag: string) => {
//     const params = new URLSearchParams(searchParams);
//     params.set('search', _searchString);
//     params.set('filter', filterTag);
//     return `${pathname}?${params.toString()}`;
//   };
//   // const getUrlParamsValue = (key: string) => {
//   //   const params = new URLSearchParams(searchParams);
//   //   return params.get(key) ?? '';
//   // };

//   const methods = useForm({
//     resolver: zodResolver(
//       z.object({
//         searchQuery: z.string(),
//       }),
//     ),
//     defaultValues: {
//       searchQuery: '',
//     },
//   });
//   const { handleSubmit, setValue } = methods;
//   const formSubmit = (searchQuery: { searchQuery: string }) => {
//     setSearchString(searchQuery.searchQuery);
//   };

//   const [isLoading, setLoading] = useState(true);
//   const fetchData = useCallback(
//     async (
//       start: number,
//       limit: number,
//       _searchString: string,
//       _selectedTag: string,
//     ) => {
//       setLoading(true);
//       try {
//         const token = process.env.API_TOKEN; // add TOKEN
//         const path = `/articles`;
//         const filters = _selectedTag
//           ? {
//               title: { $containsi: _searchString },
//               tags: { name: { $eq: _selectedTag } },
//             }
//           : {
//               title: { $containsi: _searchString },
//             };
//         const urlParamsObject = {
//           sort: { createdAt: 'desc' },
//           populate: {
//             cover: { fields: ['url'] },
//             category: { populate: '*' },
//             authorsBio: {
//               populate: '*',
//             },
//             tags: { fields: ['name'] },
//           },
//           pagination: {
//             start,
//             limit,
//           },
//           filters,
//         };
//         const options = { headers: { Authorization: `Bearer ${token}` } };
//         const responseData = await FetchLandingPage();
//         console.log(responseData);
//         if (start === 0) {
//           setData(responseData);
//         } else {
//           setData((prevData: any[]) => [...prevData, ...responseData]);
//         }
//         setMeta(responseData.meta);
//       } catch (error) {
//         // eslint-disable-next-line no-console
//         console.error(error);
//       } finally {
//         setLoading(false);
//       }
//       console.log(' ');
//     },
//     [],
//   );

//   function loadMorePosts(): void {
//     // const nextPosts = meta!.pagination.start + meta!.pagination.limit;
//     // fetchData(
//     //   nextPosts,
//     //   Number(process.env.NEXT_PUBLIC_PAGE_LIMIT),
//     //   // getUrlParamsValue("search"),
//     //   // getUrlParamsValue("filter")
//     //   searchString,
//     //   selectedTag,
//     // );
//   }

//   useEffect(() => {
//     router.push(createPageURL(searchString, selectedTag));
//     fetchData(
//       0,
//       12,
//       // getUrlParamsValue("search"),
//       // getUrlParamsValue("filter")
//       searchString,
//       selectedTag,
//     );
//   }, [searchString, selectedTag]);

//   if (isLoading) return <Loader />;

//   // const mockMeta: Meta = {
//   //   pagination: {
//   //     start: 0,
//   //     limit: 6,
//   //     total: 12,
//   //   },
//   // };

//   return <Ground />;
// }

'use client';

import { zodResolver } from '@hookform/resolvers/zod';
// import { fetchAPI } from '@utils/fetch-api';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import {
  type Dispatch,
  type SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

// import bgimg1 from '../assets/bgimg1.png';
// import bgimg2 from '../assets/bgimg2.jpeg';
import { Form } from '../component/Form';
import TopicCard from '../component/TopicCard';
import type { Post, Tag } from '../interface';

// eslint-disable-next-line unused-imports/no-unused-vars
// const mockPosts: Post[] = [
//   {
//     creator: 'John Doe',
//     title: 'Lorem Ipsum Dolor Sit Amet',
//     link: 'https://example.com/post1',
//     pubDate: '2024-05-20T08:00:00Z',
//     content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//     contentSnippet: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//     categories: ['Tech', 'Programming'],
//     isoDate: '2024-05-20T08:00:00Z',
//     coverImg:
//       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfZ5Cl3V0oy7WXC5D4q-DbnJQYTo35hHu9qRosauNr5g&s',
//     authorImg: profile,
//     commentCount: 10,
//   },
//   {
//     creator: 'Jane Smith',
//     title: 'Nulla Facilisi',
//     link: 'https://example.com/post2',
//     pubDate: '2024-05-19T08:00:00Z',
//     content: 'Nulla facilisi. Sed ut ligula eget nisi vehicula sodales.',
//     contentSnippet: 'Nulla facilisi. Sed ut ligula eget nisi vehicula sodales.',
//     categories: ['Science', 'Research'],
//     isoDate: '2024-05-19T08:00:00Z',
//     coverImg: null,
//     authorImg: profile,
//     commentCount: 4,
//   },
//   // Repeat similar structures for other posts
//   {
//     creator: 'Alice Johnson',
//     title: 'Vestibulum Ante Ipsum Primis',
//     link: 'https://example.com/post12',
//     pubDate: '2024-05-08T08:00:00Z',
//     content:
//       'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae.',
//     contentSnippet:
//       'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae.',
//     categories: ['Travel', 'Adventure'],
//     isoDate: '2024-05-08T08:00:00Z',
//     coverImg:
//       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsuaGN1PaTeRiUEc9Vb74XQYruHzIWtn1khha7gmN25Q&s',
//     authorImg: null,
//     commentCount: 23,
//   },
// ];

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
  // const [innerPosts, setInnerPosts] = useState<any[]>([]);
  const [selectedTag, setSelectedTag] = useState<Tag>({ name: '', slug: '' });
  // const [selectedTag, setSelectedTag] = useState('');
  const [searchValueShow, setSearchValueShow] = useState('');
  // const [meta, setMeta] = useState<Meta | undefined | null>();
  const [isLoading, setLoading] = useState(true);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const createPageURL = (_searchString: string, filterTag: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('search', _searchString);
    params.set('filter', filterTag);
    return `${pathname}?${params.toString()}`;
  };
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

  // eslint-disable-next-line react-hooks/rules-of-hooks, consistent-return
  const FetchByFilter = useCallback(async (tag: Tag) => {
    setLoading(true);
    // eslint-disable-next-line unused-imports/no-unused-vars, @typescript-eslint/no-shadow
    const tagName = tag.name;
    const tagSlug = tag.slug;
    try {
      const response = await fetch(
        `https://pantip.com/api/forum-service/tag/tag_topic_trend?tag_name=${encodeURIComponent(tagName)}&limit=12`,
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
      // eslint-disable-next-line no-console
      console.log('Finished fetch');
      const result = await response.json();
      const { data } = result;
      const post = data.map((item: any) => ({
        creator: item.author ? item.author.name : null,
        title: item.title || null,
        link: item.author ? `https://pantip.com/topic/${item.topic_id}` : null,
        pubDate: item.created_time || null,
        content: null, // Assuming content is not provided in raw data
        contentSnippet: null, // Assuming contentSnippet is not provided in raw data
        tags: item.tags
          ? item.tags.map((tagg: any) => ({ name: tagg.name, slug: tagg.slug }))
          : null,
        isoDate: item.created_time || null,
        coverImg: item.thumbnail_url || null,
        authorImg:
          item.author && item.author.avatar
            ? item.author.avatar.original
            : null,
        commentCount: item.comments_count || null,
      }));
      // setInnerPosts(post);
      // setPosts(post);
      return post;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error fetching or parsing the RSS feed:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const FetchLandingPage = useCallback(
    async (
      // eslint-disable-next-line @typescript-eslint/no-shadow
      setPosts: Dispatch<SetStateAction<Post[]>>,
      _searchString: string,
      _selectedTag: Tag,
    ) => {
      setLoading(true);
      try {
        // eslint-disable-next-line no-console
        console.log('Get data from local server');
        const response = await fetch(
          'https://pantip.com/api/forum-service/home/get_tag_hit?limit=10',
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
        // eslint-disable-next-line no-console
        console.log('Finished fetch');
        const result = await response.json();
        const { data } = result;
        // const tags =
        //   _selectedTag.name === '' && _selectedTag.slug === ''
        //     ? data.map((item: any) => ({ name: item.name, slug: item.slug }))
        //     : [_selectedTag];
        const tags = data.map((item: any) => ({
          name: item.name,
          slug: item.slug,
        }));
        const postPromises = tags.map((tag: Tag) => FetchByFilter(tag));

        const resolvedPosts = await Promise.all(postPromises);
        const flattenedPosts = resolvedPosts.flat();

        setPosts(flattenedPosts);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error fetching or parsing the RSS feed:', error);
      } finally {
        setLoading(false);
      }
    },
    [FetchByFilter],
  );

  useEffect(() => {
    if (selectedTag.name !== '' || searchString !== '') {
      setShowAllPosts(true);
    }
  }, [searchString, selectedTag]);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    // createPageURL(searchString, selectedTag.slug);
    FetchLandingPage(setPosts, searchString, selectedTag);
    // const iData = FetchByFilter({
    //   name: 'วันพีซ One piece',
    //   slug: 'วันพีซ_One_piece',
    // });
    // setPosts(iData);
  }, [FetchLandingPage, FetchByFilter, router, searchString, selectedTag]);

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log(posts);
  }, [posts]);

  if (isLoading) return <Loader />;

  return (
    <div
      className={`flex size-full flex-col gap-y-6 px-2 pt-12 md:px-24 ${searchString === '' && selectedTag === '' ? '' : 'pb-12'}`}
    >
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
              className="rounded-lg px-6 py-3 text-sm hover:underline dark:bg-gray-900 dark:text-gray-400"
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
