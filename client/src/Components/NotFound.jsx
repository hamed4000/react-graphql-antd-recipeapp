import React from 'react';
import { NotFoundWrapper } from './styleComponent';
import { Link } from 'react-router-dom';

const NotFound = ({title, content, code}) => {
  return (
    <NotFoundWrapper>
      <div className="notfound">
        <div className="notfound-404">
          <h1>{title}</h1>
          {code && <h2>{code} - {content}</h2>}
        </div>
        {code && <Link to={'/'}>Go TO Homepage</Link>}
      </div>
    </NotFoundWrapper>
  );
};

export default NotFound;
