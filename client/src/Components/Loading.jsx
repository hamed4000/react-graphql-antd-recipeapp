import React from 'react';
import { TransverseLoading } from 'react-loadingg';
import { LoadingContainer } from './styleComponent';
import { Col, Row } from 'antd';

const Loading = () => {
  return (
    <Row>
      <Col>
        <LoadingContainer>
          <TransverseLoading size={'large'} speed={1} />
        </LoadingContainer>
      </Col>
    </Row>
  );
};

export default Loading;
