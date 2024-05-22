// 'use client';

// import { useCallback, useEffect } from 'react';

// import type { AllPosts, Post } from '@/app/[locale]/pantip-re/interface';

// const axios = require('axios');

// interface FeedItem {
//   title?: string;
//   [key: string]: any;
// }

// export default function Test() {
//   const FetchLandingPage = useCallback(async () => {
//     const posts: Post[] = [];
//     try {
//       console.log('Get data from local server');
//       const feed = await axios.get('http://localhost:4000/pantip-feed');
//       console.log('Finished fetch');
//       feed.data.rss.channel[0].item.forEach((item: FeedItem) => {
//         const post: Post = {
//           creator: item['dc:creator'] ? item['dc:creator'][0] : null,
//           title: item.title ? item.title[0] : null,
//           link: item.link ? item.link[0] : null,
//           pubDate: item.pubDate ? item.pubDate[0] : null,
//           content: item.description ? item.description[0] : null,
//           contentSnippet: item.description
//             ? item.description[0].substring(0, 100)
//             : null, // Snippet of the first 100 characters
//           categories: item.category
//             ? item.category.map((cat: any) => cat._)
//             : null,
//           isoDate: item.pubDate
//             ? new Date(item.pubDate[0]).toISOString()
//             : null,
//           coverImg: null,
//           authorImg: null,
//           commentCount: null,
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

//   useEffect(() => {
//     const allPosts = FetchLandingPage();
//     console.log(allPosts);
//   }, []);

//   return <div />;
// }

'use client';

import {
  type Dispatch,
  type SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';
import Parser from 'rss-parser';

import type { Post } from '@/app/[locale]/pantip-re/interface';

interface FeedItem {
  title?: string;
  [key: string]: any;
}

const parser = new Parser();

export default function Test() {
  const [data, setData] = useState<Post[]>([]);
  const FetchLandingPage = useCallback(
    async (setAllPosts: Dispatch<SetStateAction<Post[]>>): Promise<void> => {
      const posts: Post[] = [];
      try {
        // console.log('Fetching landing page post');
        const feed = await parser.parseURL('https://pantip.com/forum/feed');
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
        setAllPosts(posts);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error fetching or parsing the RSS feed:', error);
      }
    },
    [],
  );

  useEffect(() => {
    FetchLandingPage(setData);
  }, [FetchLandingPage]);

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log(data);
  }, [data]);
  return <div />;
}
