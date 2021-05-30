import React, { useState } from "react";
import { ActivityIndicator } from "react-native";
import styled from "styled-components/native";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { NavigationInjectedProps } from "react-navigation";

import { updateDeleteBlog } from "../apolloClient/updateBlog";
import _Button from "../components/Button";
import TextEditorModal from "../components/TextEditorModal";
import PostList from "../components/PostList";

// graphql
import { GET_BLOG_BY_ID, CURRENT_USER } from "../apolloClient/queries";
import { DELETE_BLOG, CREATE_POST } from "../apolloClient/mutations";
import { authClient, publicClient } from "../config";

interface Post {
  id: string;
  title: string;
  owner: string;
}

interface Blog {
  id: String;
  name: String;
  owner: String;
  posts: {
    items: Post[];
  };
}

interface User {
  currentUser: String;
}

interface PostInput {
  postInput: {
    title: String;
    postBlogId: String;
  };
}

interface CreatePost {
  createPost: {
    id: string;
    title: string;
  };
}

interface Props extends NavigationInjectedProps {}

const BlogDetail = ({ navigation }: Props) => {
  const blogId: string = navigation.getParam("id");
  const [isOpened, setOpen] = useState<boolean>(false);

  const {
    data: { currentUser }
  } = useQuery<User>(CURRENT_USER);

  const client: any = currentUser ? authClient : publicClient;

  const { loading, error, data, refetch, networkStatus } = useQuery<{
    getBlog: Blog;
  }>(GET_BLOG_BY_ID, {
    variables: { id: blogId },
    skip: !blogId,
    client
  });

  const [deleteBlog] = useMutation<
    { deleteBlog: { id: string } },
    { id: string }
  >(DELETE_BLOG, {
    update: updateDeleteBlog,
    onCompleted: () => navigation.navigate("Home")
  });

  const afterCreatePost = () => {
    refetch();
    toggleModal();
  };

  const [createPost] = useMutation<CreatePost, PostInput>(CREATE_POST, {
    onCompleted: afterCreatePost
  });

  const handleDeleteBlog = () => {
    deleteBlog({ variables: { id: blogId } });
  };

  const toggleModal = () => {
    setOpen(!isOpened);
  };

  const handleCreatePost = (input: string) => {
    createPost({
      variables: { postInput: { title: input, postBlogId: blogId } }
    });
  };

  if (loading || networkStatus === 4) {
    return (
      <Wrapper>
        <ActivityIndicator size="small" />
      </Wrapper>
    );
  }

  if (error) {
    return (
      <Wrapper>
        <Container>
          <Title>Error during fetching Blog</Title>
        </Container>
      </Wrapper>
    );
  }

  const blog = data.getBlog;

  return (
    <Wrapper>
      <TextEditorModal
        isOpened={isOpened}
        toggleModal={toggleModal}
        onSubmit={handleCreatePost}
        headerText="Create a New Post"
        label="Title"
      />
      <Container>
        {!!currentUser && (
          <CreatePostButton label="Create a post" onPress={toggleModal} />
        )}
        <Title>Post List</Title>
        <PostList posts={blog.posts.items} refetchBlog={refetch} />
      </Container>
      {currentUser === blog.owner && (
        <DeleteBlogButton onPress={handleDeleteBlog} label="Delete Blog" />
      )}
    </Wrapper>
  );
};

const Title = styled.Text`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 20px;
`;

const Container = styled.View`
  padding-horizontal: 15px;
  padding-top: 30px;
  flex: 1;
`;

const CreatePostButton = styled(_Button)`
  align-self: flex-end;
`;

const DeleteBlogButton = styled(_Button)`
  align-self: center;
`;

const Wrapper = styled.SafeAreaView`
  flex: 1;
`;

export default BlogDetail;
