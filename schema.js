exports.typeDefs = `

type Recipe {
  _id: ID
  name: String!
  category: String!
  description: String!
  instructions: String!
  imageUrl: String!
  createdDate: String
  likes: Int
  username: String
}

type User {
  _id: ID
  username: String! @unique
  password: String!
  email: String!
  joinDate: String
  favorites: [Recipe]
}

type Query {
  getAllRecipes: [Recipe]
  getRecipe(_id: ID!): Recipe
  searchRecipes(searchTerm: String): [Recipe]

  getCurrentUser: User
  getUserRecipes(username: String!): [Recipe]
}

type Token {
  token: String!
}

type Mutation {
  addRecipe(name: String!, description: String!, category: String!, instructions: String!, imageUrl: String!, username: String): Recipe
  deleteUserRecipe(_id: ID): Recipe
  updateUserRecipe(_id: ID!, name: String!, imageUrl: String!, description: String!, category: String!): Recipe
  likeRecipe(_id: ID!, username: String!): Recipe
  unlikeRecipe(_id: ID!, username: String!): Recipe
  signInUser(username: String!, password: String!): Token
  signUpUser(username: String!, email: String!, password: String!): Token
}

`;
