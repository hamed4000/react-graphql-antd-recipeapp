import React, { useState } from 'react';
import { Row, Col } from 'antd';
import RecipeItem from '../Components/RecipeItem';
import SearchInput from '../Components/SearchInput';
import Loading from '../Components/Loading';
import { MainContainer } from '../Components/styleComponent';
import { useQuery } from '@apollo/react-hooks';
import { GET_ALL_RECIPES } from '../queries/Recipes';

const Home = () => {
  const [result, setResult] = useState([]);

  const { data, loading, error } = useQuery(GET_ALL_RECIPES);

  if (loading) return <Loading />;
  if (error) return <h1>error...</h1>;
  return (
    <MainContainer>
      <Row type={'flex'} justify={'center'} className={'paddingTB'}>
        <Col xs={18} sm={12} md={8}>
          <SearchInput setResult={setResult} />
        </Col>
      </Row>
      <Row
        gutter={[16, 24]}
        type={'flex'}
        justify={'center'}
        className={'paddingTB'}
      >
        {result.length !== 0
          ? result.map((recipe, i) => <RecipeItem key={i} {...recipe} />)
          : data.getAllRecipes.map((recipe, i) => (
              <RecipeItem key={i} {...recipe} />
            ))}
      </Row>
    </MainContainer>
  );
};

export default Home;
