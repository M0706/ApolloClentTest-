import React from "react";
import { StyleSheet } from "react-native";
import Amplify, { Auth } from "aws-amplify";
import AWSAppSyncClient, { AUTH_TYPE } from "aws-appsync";
import { ApolloProvider } from "@apollo/react-hooks";
import { createAppContainer } from "react-navigation";
// amplify config
import config from "./aws-exports";
// Navigation
import MainNavigation from "./src/navigation/MainNavigation";
// client resolvers
import { resolvers } from "./src/clientResolvers/sessionResolver";
// config
import { authClient } from "./src/config";

Amplify.configure(config);
authClient.defaultOptions.query;

const AppContainer = createAppContainer(MainNavigation);

authClient.cache.writeData({ data: { hasSession: false, currentUser: "" } });
authClient.addResolvers(resolvers);

function App() {
  return (
    <ApolloProvider client={authClient as any}>
      <AppContainer />
    </ApolloProvider>
  );
}

export default App;
