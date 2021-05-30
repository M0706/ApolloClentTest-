import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import { Auth } from "aws-amplify";
import styled from "styled-components/native";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { NavigationInjectedProps } from "react-navigation";

import BlogEditor from "../components/TextEditorModal";
import BlogList from "../components/BlogList";
import Button from "../components/Button";

// graphql
import { GET_SESSION, GET_ALL_BLOGS_LIST } from "../apolloClient/queries";
import { LOGIN, CREATE_BLOG } from "../apolloClient/mutations";

interface Props extends NavigationInjectedProps {}

interface Session {
  hasSession: boolean;
}

const Home = ({ navigation }: Props) => {
  const [isLoggedIn, setLogin] = useState<boolean>(false);
  const [isOpened, setOpen] = useState<boolean>(false);
  const [login] = useMutation<null, { input: boolean; username: string }>(
    LOGIN
  );
  const { data } = useQuery<Session>(GET_SESSION);

  const [createBlog] = useMutation<
    { createBlog: { id: string } },
    { name: string }
  >(CREATE_BLOG, {
    refetchQueries: [{ query: GET_ALL_BLOGS_LIST }],
    onCompleted: () => toggleModal()
  });

  useEffect(() => {
    getCurrentUser();
  }, [data.hasSession]);

  const getCurrentUser = async () => {
    try {
      const currentAuth = await Auth.currentAuthenticatedUser();
      login({ variables: { input: true, username: currentAuth.username } });
      setLogin(true);
    } catch (error) {
      console.log("user not found");
      login({ variables: { input: false, username: "" } });
      setLogin(false);
    }
  };

  const redirectToLogin = () => {
    navigation.navigate("Login");
  };

  const signOut = async () => {
    try {
      await Auth.signOut();
      login({ variables: { input: false, username: "" } });
      setLogin(false);
    } catch (error) {
      console.log("failed signout ", error.message);
    }
  };

  const toggleModal = () => {
    setOpen(!isOpened);
  };

  const handleCreateBlog = (input: string) => {
    createBlog({ variables: { name: input } });
  };

  return (
    <SafeAreaView>
      <Container>
        {isLoggedIn ? (
          <ButtonContainer>
            <Button onPress={signOut} label="Sign Out" />
            <Button onPress={toggleModal} label="Create New Blog" />
          </ButtonContainer>
        ) : (
          <LoginButton onPress={redirectToLogin} label="Login" />
        )}
        <BlogList />
      </Container>
      <BlogEditor
        isOpened={isOpened}
        toggleModal={toggleModal}
        onSubmit={handleCreateBlog}
        headerText="Create a new blog"
        label="Name"
      />
    </SafeAreaView>
  );
};

export default Home;

const LoginButton = styled(Button)`
  align-self: flex-end;
`;

const ButtonText = styled.Text`
  color: #ffffff;
`;

const Container = styled.View`
  padding-top: 30px;
  padding-horizontal: 15px;
`;

const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 30px;
`;
