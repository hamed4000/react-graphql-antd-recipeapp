import React from 'react';
import { Link } from 'react-router-dom';
import { Col } from 'antd';
import { Card, Span, Title } from './styleComponent';
import { useLocation } from 'react-router';
import UpdateRecipe from './UpdateRecipe';
import DeleteRecipe from './DeleteRecipe';

const RecipeItem = ({ _id, name, category, imageUrl, user }) => {
  const location = useLocation();

  return (
    <Col xs={18} sm={12} md={8} lg={6}>
      <Card style={{ background: `url(${imageUrl}) center/cover no-repeat` }}>
        <Span category={category}>{category}</Span>
        <Title className="card-text">
          <Link to={`/recipe/${_id}`}>
            <h4>
              <span>{name}</span>
            </h4>
          </Link>
        </Title>
        {location.pathname === '/profile' && user && (
          <div className={'operator'}>
            <UpdateRecipe />
            <DeleteRecipe id={_id} user={user} />
          </div>
        )}
      </Card>
    </Col>
  );
};

export default RecipeItem;
