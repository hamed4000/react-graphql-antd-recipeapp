import React from 'react';
import { Redirect } from 'react-router-dom';
import Home from '../Pages/Home';
import Profile from '../Pages/Profile';
import AddRecipes from '../Pages/AddRecipes';
import RegistrationForm from '../Pages/RegistrationForm';
import LoginForm from '../Pages/LoginForm';
import Recipe from '../Pages/Recipe';
import RenderRoutes from './RenderRoutes';

const ROUTES = [
  {
    path: '/',
    key: 'Home',
    exact: true,
    component: Home,
  },
  {
    path: '/profile',
    key: 'profile',
    exact: true,
    component: props =>
      !localStorage.getItem('auth') ? (
        <Redirect to={'/signin'} />
      ) : (
        <Profile {...props} />
      ),
  },
  // {
  //   path: '/add',
  //   key: 'add',
  //   exact: true,
  //   component: props =>
  //     !localStorage.getItem('auth') ? (
  //       <Redirect to={'/signin'} />
  //     ) : (
  //       <AddRecipes {...props} />
  //     ),
  // },
  {
    path: '/recipe/add',
    key: 'recipe',
    exact: true,
    component: RenderRoutes,
    routes: [
      {
        path: '/recipe/add',
        key: 'add',
        exact: true,
        component: props =>
          !localStorage.getItem('auth') ? (
            <Redirect to={'/signin'} />
          ) : (
            <AddRecipes {...props} />
          ),
      },
    ],
  },
  {
    path: '/recipe/:_id',
    key: 'recipe',
    exact: true,
    component: RenderRoutes,
    routes: [
      {
        path: '/recipe/:_id',
        key: 'single',
        exact: true,
        component: Recipe,
      },
    ],
  },
  {
    path: '/signin',
    key: 'signin',
    exact: true,
    component: props =>
      localStorage.getItem('auth') ? (
        <Redirect to={'/'} />
      ) : (
        <LoginForm {...props} />
      ),
  },
  {
    path: '/signup',
    key: 'signup',
    exact: true,
    component: props =>
      localStorage.getItem('auth') ? (
        <Redirect to={'/'} />
      ) : (
        <RegistrationForm {...props} />
      ),
  },
];

export default ROUTES;
