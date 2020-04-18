import { gql } from 'apollo-boost';

// QUERY

export const GET_CURRENT_USER = gql`
  query {
    getCurrentUser {
      _id
      username
      email
      joinDate
      favorites {
        _id
        name
      }
    }
  }
`;

// MUTATION
export const SIGN_UP = gql`
  mutation($username: String!, $email: String!, $password: String!) {
    signUpUser(username: $username, email: $email, password: $password) {
      token
    }
  }
`;
export const SIGN_IN = gql`
  mutation($username: String!, $password: String!) {
    signInUser(username: $username, password: $password) {
      token
    }
  }
`;
