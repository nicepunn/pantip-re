export interface Meta {
  pagination: {
    start: number;
    limit: number;
    total: number;
  };
}

export interface Tag {
  name: string;
  slug: string;
}
export interface Post {
  creator: string | null;
  title: string | null | undefined;
  link: string | null;
  pubDate: string | null;
  content: string | null;
  contentSnippet: string | null;
  tags: Tag[] | null;
  isoDate: string | null;
  coverImg: string | null;
  authorImg: any | null;
  commentCount: number | null;
}

export interface AllPosts {
  posts: Post[];
  meta: Meta | null;
}
