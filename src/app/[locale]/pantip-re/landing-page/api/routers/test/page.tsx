/* eslint-disable consistent-return */
/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
// eslint-disable-next-line lines-around-directive
'use client';

import {
  type Dispatch,
  type SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';

import type { Post, Tag } from '@/app/[locale]/pantip-re/interface';

export default function Test() {
  const FetchByFilter = useCallback(async (tag: Tag) => {
    const posts: Post[] = [];
    const tagName = tag.name;
    const tagSlug = tag.slug;
    try {
      const response = await fetch(
        `https://pantip.com/api/forum-service/tag/tag_topic_trend?tag_name=${encodeURIComponent(tagName)}&limit=10`,
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
      const post = data.map((item: any) => ({
        creator: item.author ? item.author.name : null,
        title: item.title || null,
        link: item.author ? `https://yourwebsite.com${item.author.slug}` : null,
        pubDate: item.created_time || null,
        content: null, // Assuming content is not provided in raw data
        contentSnippet: null, // Assuming contentSnippet is not provided in raw data
        tags: item.tags
          ? item.tags.map((_tag: any) => ({ name: _tag.name, slug: _tag.slug }))
          : null,
        isoDate: item.created_time || null,
        coverImg: item.thumbnail_url || null,
        authorImg:
          item.author && item.author.avatar
            ? item.author.avatar.original
            : null,
        commentCount: item.comments_count || null,
      }));
      return post;
    } catch (error) {
      console.error('Error fetching or parsing the RSS feed:', error);
    }
  }, []);

  const FetchLandingPage = useCallback(
    async (
      setPosts: Dispatch<SetStateAction<Post[]>>,
      _searchString: string,
      _selectedTag: Tag,
    ) => {
      const posts = [];
      try {
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
        console.log('Finished fetch');
        const result = await response.json();
        const { data } = result;
        let tags: Tag[];
        if (_selectedTag.name === '' && _selectedTag.slug === '') {
          tags = data.map((item: any) => {
            const tag: Tag = {
              name: item.name,
              slug: item.slug,
            };
            return tag;
          });
        } else {
          tags = [_selectedTag];
        }
        posts.push(
          tags.map(async (item: Tag) => {
            const post = await FetchByFilter(item);
            return post;
          }),
        );
        const flattenedArray = posts.flat();
        Promise.all(flattenedArray).then((_result: any) => {
          setPosts(_result.flat());
        });
      } catch (error) {
        console.error('Error fetching or parsing the RSS feed:', error);
      }
    },
    [],
  );

  const [posts, setPosts] = useState<any[]>([]);
  const [selectedTag, setSelectedTag] = useState<Tag>({ name: '', slug: '' });
  useEffect(() => {
    FetchLandingPage(setPosts, '', selectedTag);
  }, []);

  useEffect(() => {
    console.log(posts);
  }, [posts]);

  return <div />;
}
