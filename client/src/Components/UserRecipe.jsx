import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GET_USER_RECIPES } from '../queries/Recipes';
import Loading from './Loading';
import RecipeItem from './RecipeItem';
import { Row } from 'antd';

const UserRecipe = ({ user }) => {
  const { data, loading, error } = useQuery(GET_USER_RECIPES, {
    variables: { username: user.username },
  });

  if (loading) return <Loading />;
  if (error) return <p>{JSON.stringify({ error: error.message }, null, 2)}</p>;
  return (
    <Row
      gutter={[16, 24]}
      type={'flex'}
      justify="center"
      className={'paddingTB'}
    >
      <h3 style={{ textAlign: 'center', width: '80%' }}>User Recipe</h3>
      {!data.getUserRecipes.length ? (
        <p style={{ textAlign: 'center', width: '80%' }}>Not Found</p>
      ) : (
        data.getUserRecipes.map((recipe, i) => (
          <RecipeItem key={i} {...recipe} user={user} />
        ))
      )}
    </Row>
  );
};

export default UserRecipe;
