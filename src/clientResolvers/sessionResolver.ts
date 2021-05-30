import { gql } from "apollo-boost";

const getLoginInfo = gql`
  query GetSession @client {
    hasSession
    currentUser
  }
`;

export const resolvers = {
  Mutation: {
    login(parent, { input, username }, { cache }, info) {
      cache.writeQuery({
        query: getLoginInfo,
        data: { hasSession: input, currentUser: username }
      });
      return null;
    }
  }
};
