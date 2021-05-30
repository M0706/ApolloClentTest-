import React, { useState } from "react";
import { FlatList, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import { useQuery, useMutation } from "@apollo/react-hooks";

// graphql
import { CURRENT_USER } from "../apolloClient/queries";
import { DELETE_POST, UPDATE_POST } from "../apolloClient/mutations";

import TextEditorModal from "../components/TextEditorModal";

interface User {
  currentUser: String;
}

interface Post {
  id: string;
  title: string;
  owner: string;
}

interface Props {
  posts: Post[];
  refetchBlog: () => void;
}

interface DeleteBlog {
  deleteBlog: {
    id: String;
  };
}

interface DeleteBlogInput {
  id: String;
}

const PostList: React.FC<Props> = ({ posts, refetchBlog }) => {
  const {
    data: { currentUser }
  } = useQuery<User>(CURRENT_USER);
  const [selectedId, setPostId] = useState<string>("");

  const [deletePost] = useMutation<DeleteBlog, DeleteBlogInput>(DELETE_POST, {
    onCompleted: () => refetchBlog()
  });

  const afterUpdatePost = () => {
    toggleModal("")();
    refetchBlog();
  };

  const [updatePost] = useMutation(UPDATE_POST, {
    onCompleted: afterUpdatePost
  });
  const handleDeletePost = (postId: string) => () => {
    deletePost({ variables: { id: postId } });
  };

  const handleUpdatePost = (text: string) => {
    updatePost({ variables: { updateInput: { id: selectedId, title: text } } });
  };

  const toggleModal = (postId: string) => () => {
    if (selectedId) {
      setPostId("");
    } else {
      setPostId(postId);
    }
  };

  const keyExtractor = (item: Post) => item.id;

  const renderPostItem = ({ item }: { item: Post }) => {
    return (
      <ListItem>
        <Title>{item.title}</Title>
        {currentUser === item.owner && (
          <ButtonContainer>
            <EditButton onPress={toggleModal(item.id)}>
              <Ionicons name="md-create" size={24} />
            </EditButton>
            <TouchableOpacity onPress={handleDeletePost(item.id)}>
              <Ionicons name="md-trash" size={24} color="#cb0200" />
            </TouchableOpacity>
          </ButtonContainer>
        )}
      </ListItem>
    );
  };

  return (
    <>
      <TextEditorModal
        toggleModal={toggleModal("")}
        isOpened={!!selectedId}
        label="Title"
        headerText="Edit Post"
        onSubmit={handleUpdatePost}
      />

      <FlatList
        data={posts}
        keyExtractor={keyExtractor}
        renderItem={renderPostItem}
        ItemSeparatorComponent={Seperator}
      />
    </>
  );
};

const EditButton = styled.TouchableOpacity`
  margin-right: 20px;
`;

const Title = styled.Text``;

const ListItem = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const Seperator = styled.View`
  height: 15px;
`;

const ButtonContainer = styled.View`
  flex-direction: row;
`;

export default PostList;
