import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

const client = new ApolloClient({
  uri: process.env.REACT_APP_URI,
  credentials: 'same-origin',
  request: operation => {
    operation.setContext({
      headers: {
        authorization: localStorage.getItem('auth'),
      },
    });
  },
});

export default ({ children }) => (
    <ApolloProvider client={client}>{children}</ApolloProvider>
);