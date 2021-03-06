import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import ApolloProvider from './ApolloProvider';
import { BrowserRouter } from 'react-router-dom';
import AuthProvider from './utils/AuthContext';
import 'antd/dist/antd.css';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <BrowserRouter>
      <AuthProvider>
        <ApolloProvider>
          <App />
        </ApolloProvider>
      </AuthProvider>
    </BrowserRouter>,
    document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
