import React, { useCallback } from "react";
import { FlatList, ActivityIndicator } from "react-native";
import styled from "styled-components/native";
import { useNavigation } from "react-navigation-hooks";

import { useQuery } from "@apollo/react-hooks";
import { publicClient, authClient } from "../config";

// grpqhl
import { GET_ALL_BLOGS_LIST, GET_SESSION } from "../apolloClient/queries";

interface Blog {
  id: string;
  name: string;
  owner: string;
}

interface Session {
  hasSession: boolean;
}

interface Blogs {
  listBlogs: {
    items: Blog[];
  };
}

const BlogList: React.FC = () => {
  const {
    data: { hasSession }
  } = useQuery<Session>(GET_SESSION);
  // apollo client needs type any
  const client: any = !hasSession ? publicClient : authClient;

  const { navigate } = useNavigation();

  const { loading: blogLoading, data } = useQuery<Blogs>(GET_ALL_BLOGS_LIST, {
    client
  });

  if (blogLoading) {
    return <ActivityIndicator size="small" />;
  }
  const { items } = data.listBlogs;

  const redirectToDetail = (item: Blog) => () => {
    navigate("BlogDetail", { id: item.id, title: item.name });
  };

  const renderBlogItem = ({ item }: { item: Blog }) => {
    return (
      <BlogContiner onPress={redirectToDetail(item)}>
        <BlogName>{item.name}</BlogName>
        <Writer>{item.owner}</Writer>
      </BlogContiner>
    );
  };
  const keyExtractor = (item: Blog) => item.id;

  return (
    <Container>
      <Title>All Blogs</Title>
      <FlatList
        keyExtractor={keyExtractor}
        data={items}
        renderItem={renderBlogItem}
        ItemSeparatorComponent={Seperator}
      />
    </Container>
  );
};

const Seperator = styled.View`
  height: 10px;
`;

const Container = styled.View``;

const Title = styled.Text`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 20px;
`;

const BlogContiner = styled.TouchableOpacity`
  border: 1px solid #ff9900;
  padding: 10px;
`;

const BlogName = styled.Text`
  font-size: 15px;
  font-weight: 600;
`;

const Writer = styled.Text`
  font-weight: 500;
  align-self: flex-end;
`;

export default BlogList;
