import React from "react";
import { Authenticator } from "aws-amplify-react-native";
import { NavigationInjectedProps } from "react-navigation";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";
import { Auth } from "aws-amplify";

interface Props extends NavigationInjectedProps {}

enum AuthStates {
  signIn = "signIn",
  signUp = "signUp",
  confirmSignIn = "confirmSignIn",
  confirmSignUp = "confirmSignUp",
  forgotPassword = "forgotPassword",
  requireNewPassword = "requireNewPassword",
  verifyContact = "verifyContact",
  signedIn = "signedIn"
}

const Login = gql`
  mutation Login($input: boolean, $username: string) {
    login(input: $input, username: $username) @client {
      hasSession
    }
  }
`;

const LoginScreen = ({ navigation }: Props) => {
  const [login] = useMutation<null, { input: boolean; username: string }>(
    Login
  );
  const handleAuthStateChange = async (state: AuthStates) => {
    if (state === AuthStates.signedIn) {
      const currentAuth = await Auth.currentAuthenticatedUser();

      login({ variables: { input: true, username: currentAuth.username } });
      navigation.navigate("Home");
    }
  };

  return <Authenticator onStateChange={handleAuthStateChange} />;
};

export default LoginScreen;
