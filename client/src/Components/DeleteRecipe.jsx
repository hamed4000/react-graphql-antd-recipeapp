import React from 'react';
import DeleteOutlined from '@ant-design/icons/lib/icons/DeleteOutlined';
import { useMutation } from '@apollo/react-hooks';
import {
  DELETE_RECIPE_USER,
  GET_ALL_RECIPES,
  GET_USER_RECIPES,
} from '../queries/Recipes';
import { Spin } from 'antd';

const DeleteRecipe = ({ id, user }) => {
  const [deleteUserRecipe, { loading, error }] = useMutation(
    DELETE_RECIPE_USER,
    {
      update(cache, { data: { deleteUserRecipe } }) {
        const { getUserRecipes } = cache.readQuery({
          query: GET_USER_RECIPES,
          variables: { username: user.username },
        });
        cache.writeQuery({
          query: GET_USER_RECIPES,
          variables: { username: user.username },
          data: {
            getUserRecipes: getUserRecipes.filter(
              recipe => recipe._id !== deleteUserRecipe._id,
            ),
          },
        });
      },
      refetchQueries: [{ query: GET_ALL_RECIPES }],
    },
  );

  if (error) return error.message;
  return (
    <>
      {loading ? (
        <Spin style={{ fontSize: '.3rem' }} />
      ) : (
        <DeleteOutlined
          onClick={() => deleteUserRecipe({ variables: { _id: id } })}
        />
      )}
    </>
  );
};

export default DeleteRecipe;
