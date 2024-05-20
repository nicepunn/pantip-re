export interface TopicProps {
  id: number;
  attributes: {
    title: string;
    description: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    rating: number;
    cover: {
      data: {
        attributes: {
          url: any | null;
        };
      };
    };
    tags: {
      data: {
        id: number;
        attributes: {
          name: string;
        };
      }[];
    };
    category: {
      data: {
        attributes: {
          name: string;
          slug: string;
        };
      };
    };
    authorsBio: {
      data: {
        attributes: {
          name: string;
          avatar: {
            data: {
              attributes: {
                url: any | null;
              };
            };
          };
        };
      };
    };
    comments: any[]; // interface Comment
  };
}
