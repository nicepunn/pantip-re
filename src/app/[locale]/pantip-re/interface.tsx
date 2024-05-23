// export interface TopicProps {
//   id: number;
//   attributes: {
//     title: string;
//     description: string;
//     slug: string;
//     createdAt: string;
//     updatedAt: string;
//     publishedAt: string;
//     rating: number;
//     cover: {
//       data: {
//         attributes: {
//           url: any | null;
//         };
//       };
//     };
//     tags: {
//       data: {
//         id: number;
//         attributes: {
//           name: string;
//         };
//       }[];
//     };
//     category: {
//       data: {
//         attributes: {
//           name: string;
//           slug: string;
//         };
//       };
//     };
//     authorsBio: {
//       data: {
//         attributes: {
//           name: string;
//           avatar: {
//             data: {
//               attributes: {
//                 url: any | null;
//               };
//             };
//           };
//         };
//       };
//     };
//     comments: any[]; // interface Comment
//   };
// }

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
