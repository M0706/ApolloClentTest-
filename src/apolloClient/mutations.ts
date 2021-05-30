import { gql } from "apollo-boost";

interface CreatePostInput {
  title: string;
  postBlogId: string;
}

interface UpdatePostInput {
  id: String;
  title: String;
}

export const LOGIN = gql`
  mutation Login($input: boolean!, $username: string!) {
    login(input: $input, username: $username) @client {
      hasSession
    }
  }
`;

export const CREATE_BLOG = gql`
  mutation CreateBlog($name: String!) {
    createBlog(input: { name: $name }) {
      id
    }
  }
`;

export const DELETE_BLOG = gql`
  mutation DeleteBlog($id: ID!) {
    deleteBlog(input: { id: $id }) {
      id
    }
  }
`;

export const CREATE_POST = gql`
  mutation CreatPost($postInput: CreatePostInput!) {
    createPost(input: $postInput) {
      id
      title
    }
  }
`;

export const DELETE_POST = gql`
  mutation DeletePost($id: ID!) {
    deletePost(input: { id: $id }) {
      id
    }
  }
`;

export const UPDATE_POST = gql`
  mutation UpdatePost($updateInput: UpdatePostInput!) {
    updatePost(input: $updateInput) {
      id
      title
      owner
    }
  }
`;
