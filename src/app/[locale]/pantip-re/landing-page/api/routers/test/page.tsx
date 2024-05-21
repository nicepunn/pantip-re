'use client';

import {
  type Dispatch,
  type SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';
import Parser from 'rss-parser';

import type { AllPosts, Post } from '@/app/[locale]/pantip-re/interface';

interface FeedItem {
  title?: string;
  [key: string]: any;
}

const parser = new Parser();

export default function Test() {
  const FetchLandingPage = useCallback(
    async (
      setAllPosts: Dispatch<SetStateAction<AllPosts | undefined>>,
    ): Promise<void> => {
      const posts: Post[] = [];
      try {
        // console.log('Fetching landing page post');
        const feed = await parser.parseURL('https://pantip.com/forum/feed'); // fail to fetch
        // console.log('Fetch finish');
        feed.items.forEach((item: FeedItem) => {
          const post: Post = {
            creator: item.creator,
            title: item.title ?? '',
            link: item.link,
            pubDate: item.pubDate,
            content: item.content,
            contentSnippet: item.contentSnippet,
            categories: item.categories?.map((category: any) => category._),
            isoDate: item.isoDate,
            authorImg: null,
            coverImg: null,
            commentCount: 14,
          };
          posts.push(post);
        });
        const allPosts: AllPosts = { posts, meta: null };
        // console.log(allPosts);
        setAllPosts(allPosts);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error fetching or parsing the RSS feed:', error);
      }
    },
    [],
  );

  const [allPosts, setAllPosts] = useState<AllPosts>();

  useEffect(() => {
    FetchLandingPage(setAllPosts);
  }, [FetchLandingPage]);

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log(allPosts);
  }, [allPosts]);
  return <div />;
}

// import { useCallback } from 'react';
// import Parser from 'rss-parser';

// import type { AllPosts, Post } from '@/app/[locale]/pantip-re/interface';

// interface FeedItem {
//   title?: string;
//   [key: string]: any;
// }

// const parser = new Parser();

// export default async function Test() {
//   const FetchLandingPage = useCallback(async () => {
//     console.log('Fetching landing page post');
//     const posts: Post[] = [];
//     try {
//       const feed = await parser.parseURL('https://pantip.com/forum/feed');
//       feed.items.forEach((item: FeedItem) => {
//         // console.log(item);
//         const post: Post = {
//           creator: item.creator,
//           title: item.title ?? '',
//           link: item.link,
//           pubDate: item.pubDate,
//           content: item.content,
//           contentSnippet: item.contentSnippet,
//           categories: item.categories?.map((category: any) => category._),
//           isoDate: item.isoDate,
//           authorImg: null,
//           coverImg: null,
//           commentCount: 14,
//         };
//         posts.push(post);
//       });
//       // console.log(posts);
//     } catch (error) {
//       console.error('Error fetching or parsing the RSS feed:', error);
//     } finally {
//       const allPosts: AllPosts = { posts, meta: null };
//       // console.log(allPosts);
//       return allPosts;
//     }
//   }, []);

//   const allPosts = await FetchLandingPage();
//   console.log(allPosts);

//   return <div />;
// }
