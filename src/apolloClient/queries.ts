import { gql } from "apollo-boost";

export const GET_SESSION = gql`
  query GetSession {
    hasSession @client
  }
`;

export const GET_ALL_BLOGS_LIST = gql`
  query ListBlogs {
    listBlogs {
      items {
        id
        name
        owner
      }
    }
  }
`;

export const GET_BLOG_BY_ID = gql`
  query GetBlog($id: ID!) {
    getBlog(id: $id) {
      id
      name
      owner
      posts {
        items {
          id
          title
          owner
        }
      }
    }
  }
`;

export const CURRENT_USER = gql`
  query CurrentUser @client {
    currentUser
  }
`;
