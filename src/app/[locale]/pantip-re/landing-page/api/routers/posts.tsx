import type { Dispatch, SetStateAction } from 'react';
import Parser from 'rss-parser';

import type { AllPosts, Post } from '@/app/[locale]/pantip-re/interface';

interface FeedItem {
  title?: string;
  [key: string]: any;
}

const parser = new Parser();

export const FetchLandingPage = async (
  setAllPosts: Dispatch<SetStateAction<AllPosts | undefined>>,
): Promise<void> => {
  const posts: Post[] = [];
  try {
    // console.log('Fetching landing page post');
    const feed = await parser.parseURL('https://pantip.com/forum/feed');
    // console.log('Fetching finished');
    feed.items.forEach((item: FeedItem) => {
      const post: Post = {
        creator: item.creator,
        title: item.title ?? '',
        link: item.link,
        pubDate: item.pubDate,
        content: item.content,
        contentSnippet: item.contentSnippet,
        tags: item.categories?.map((category: any) => category._),
        isoDate: item.isoDate,
        authorImg: null,
        coverImg: null,
        commentCount: 14,
      };
      posts.push(post);
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error fetching or parsing the RSS feed:', error);
  }
  const allPosts: AllPosts = { posts, meta: null };
  // console.log(allPosts);
  setAllPosts(allPosts);
};
