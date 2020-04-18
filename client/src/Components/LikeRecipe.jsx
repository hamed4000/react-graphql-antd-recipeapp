import React, { useEffect, useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { GET_RECIPE, LIKE_RECIPE, UNLIKE_RECIPE } from '../queries/Recipes';
import { HeartTwoTone } from '@ant-design/icons';

const LikeRecipe = ({ _id, user }) => {
  const [liked, setLiked] = useState(false);

  const [likeRecipe] = useMutation(LIKE_RECIPE, {
    variables: { _id, username: user.username },
    update(cache, { data: { likeRecipe } }) {
      const { getRecipe } = cache.readQuery({
        query: GET_RECIPE,
        variables: { _id },
      });
      cache.writeQuery({
        query: GET_RECIPE,
        variables: { _id },
        data: {
          getRecipe: { ...getRecipe, likes: likeRecipe.likes + 1 },
        },
      });
    },
  });

  const [unLikeRecipe] = useMutation(UNLIKE_RECIPE, {
    variables: { _id, username: user.username },
    update(cache, { data: { unlikeRecipe } }) {
      const { getRecipe } = cache.readQuery({
        query: GET_RECIPE,
        variables: { _id },
      });
      cache.writeQuery({
        query: GET_RECIPE,
        variables: { _id },
        data: {
          getRecipe: { ...getRecipe, likes: unlikeRecipe.likes - 1 },
        },
      });
    },
  });

  useEffect(() => {
    user && user.favorites.find(fav => fav._id === _id)
      ? setLiked(true)
      : setLiked(false);
  }, [user, _id]);

  return (
    <>
      {liked ? (
        <HeartTwoTone
          onClick={async () => {
            await unLikeRecipe();
            setLiked(false);
          }}
          twoToneColor="#eb2f96"
          style={{ fontSize: '3rem' }}
        />
      ) : (
        <HeartTwoTone
          onClick={async () => {
            await likeRecipe();
            setLiked(true);
          }}
          style={{ fontSize: '3rem' }}
          twoToneColor="#e3e3e3"
        />
      )}
    </>
  );
};

export default LikeRecipe;
