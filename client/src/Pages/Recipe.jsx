import React, { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GET_RECIPE } from '../queries/Recipes';
import LikeRecipe from '../Components/LikeRecipe';
import { useRouteMatch } from 'react-router';
import { AuthContext } from '../utils/AuthContext';
import { Row, Col } from 'antd';
import Loading from '../Components/Loading';
import {
  RecipeContent,
  RecipeHeader,
  Span,
} from '../Components/styleComponent';

const Recipe = () => {
  const {
    state: { user },
  } = useContext(AuthContext);

  const match = useRouteMatch();

  const { data, loading, error } = useQuery(GET_RECIPE, {
    variables: { _id: match.params._id },
    onError(error) {
      console.log('networkError==>', error);
    },
  });

  if (loading) return <Loading />;
  if (error) return <h1>{error.message || 'error...'}</h1>;

  const {
    _id,
    name,
    category,
    username,
    description,
    instructions,
    imageUrl,
    likes,
  } = data.getRecipe;

  return (
    <>
      <Row>
        <Col>
          <RecipeHeader>
            <img src={imageUrl} alt={name} />
            <h2>
              <strong>{name}</strong>
            </h2>
            <Span category={category}>{category}</Span>
          </RecipeHeader>
        </Col>
      </Row>
      <Row>
        <Col>
          <RecipeContent>
            <div className={'descriptionBox'}>
              <p>{description}</p>
            </div>
            <div
              className="recipe-instructions"
              dangerouslySetInnerHTML={{
                __html: instructions,
              }}
            />
            <div className={'like'}>
              {user && (
                <>
                  <LikeRecipe _id={_id} user={user} />

                  <span role="img" aria-label="heart">
                    {likes === 0 ? '' : likes}
                  </span>
                </>
              )}
            </div>
            <p className={'created'}>
              Created by <strong>{username}</strong>
            </p>
          </RecipeContent>
        </Col>
      </Row>
    </>
  );
};

export default Recipe;
