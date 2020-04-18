import { gql } from 'apollo-boost';

export const GET_ALL_RECIPES = gql`
  query {
    getAllRecipes {
      _id
      name
      category
      imageUrl
    }
  }
`;
export const GET_RECIPE = gql`
  query($_id: ID!) {
    getRecipe(_id: $_id) {
      _id
      name
      category
      description
      instructions
      imageUrl
      likes
      createdDate
      username
    }
  }
`;

export const GET_USER_RECIPES = gql`
  query($username: String!) {
    getUserRecipes(username: $username) {
      _id
      name
      category
      imageUrl
      likes
    }
  }
`;

export const SEARCH_RECIPE = gql`
  query($searchTerm: String) {
    searchRecipes(searchTerm: $searchTerm) {
      _id
      name
      likes
      category
      imageUrl
    }
  }
`;

// MUTATION

export const ADD_RECIPE = gql`
  mutation(
    $name: String!
    $imageUrl: String!
    $description: String!
    $category: String!
    $instructions: String!
    $username: String
  ) {
    addRecipe(
      name: $name
      imageUrl: $imageUrl
      description: $description
      category: $category
      instructions: $instructions
      username: $username
    ) {
      _id
      name
      imageUrl
      category
      description
      instructions
      createdDate
      likes
      username
    }
  }
`;

export const DELETE_RECIPE_USER = gql`
  mutation($_id: ID!) {
    deleteUserRecipe(_id: $_id) {
      _id
    }
  }
`;

export const LIKE_RECIPE = gql`
  mutation($_id: ID!, $username: String!) {
    likeRecipe(_id: $_id, username: $username) {
      _id
      likes
    }
  }
`;
export const UNLIKE_RECIPE = gql`
  mutation($_id: ID!, $username: String!) {
    unlikeRecipe(_id: $_id, username: $username) {
      _id
      likes
    }
  }
`;
