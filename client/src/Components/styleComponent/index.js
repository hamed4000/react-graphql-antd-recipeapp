import styled, { css } from 'styled-components';

const category = ['Breakfast', 'Lunch', 'Snack', 'Dinner'];

export const AppContainer = styled.div`
  text-align: center;
  width: 80%;
  max-width: 1024px;
  margin: 0 auto;
`;

export const MainContainer = styled.div`
  margin: 0 auto;
  padding: 2rem 0;
`;

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
`;

export const Card = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: center;
  padding: 20px 20px;
  border-radius: 10px;
  box-shadow: 0 0 0 rgba(0, 0, 0, 0), 0 1px 3px rgba(0, 0, 0, 0.22);
  transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
  overflow: hidden;
  //background: url("");
  background-size: 100%;
  &:hover {
    background-size: 175%;
  }
  .operator {
    position: absolute;
    bottom: 0;
    left: 0;
    padding: 0.4rem;
    display: flex;
    justify-content: end;
    width: 100%;
    background: rgb(243, 207, 63);
    box-shadow: 2px 0 20px 0 rgba(0, 0, 0, 0.29);
    overflow: inherit;
    span {
      font-size: 1.1rem;
      margin-left: 1rem;
    }
  }
`;

export const Span = styled.span`
  position: absolute;
  margin: 0;
  z-index: 1;
  padding: 7px;
  border-radius: 10px 0 0 0;
  right: 0;
  bottom: 0;
  color: white;
  box-shadow: 0 0 11px 2px rgba(0, 0, 0, 0.4);
  ${props =>
    props.category === category[0]
      ? css`
          background: linear-gradient(to right, #e193ff, #00d4ff);
        `
      : props.category === category[1]
      ? css`
          background: linear-gradient(to right, #514a9d, #4b5367);
        `
      : props.category === category[2]
      ? css`
          background: linear-gradient(
            to right,
            rgb(80, 146, 143),
            rgb(2, 105, 100)
          );
        `
      : css`
          background: linear-gradient(to right, #b24592, #f15f79);
        `}
`;

export const Title = styled.div`
  color: white;
  h4 {
    margin: 0 0 5px;
    font-family: 'Source Code Pro', sans-serif;
    font-size: 24px;
    line-height: 1.35;
    text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.7);
    transform: skewY(-8deg);
    > span {
      background-color: rgba(241, 196, 15, 0.8);
    }
  }
`;
export const RecipeHeader = styled.div`
  height: 30vh;
  position: relative;
  overflow: hidden;
  box-shadow: 0 5px 15px 5px rgba(0, 0, 0, 0.25);
  z-index: 1;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  h2 {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%) skewY(-8deg);
    font-family: 'Source Code Pro', sans-serif;
    font-size: 34px;
    line-height: 1.35;
    text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.7);
    > strong {
      background-color: rgba(241, 196, 15, 0.8);
    }
  }
`;

export const RecipeContent = styled.div`
  font-family: 'Josefin Sans', sans-serif;
  .descriptionBox {
    width: 80%;
    margin: 0 auto;
    background: rgba(250, 173, 20, 0.85);
    padding: 2rem 2rem;
    border: none;
    border-radius: 0 0 5px 5px;
  }
  .like {
    margin: 20px auto;
    width: 20%;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.5rem 0.3rem;
    position: relative;
    span {
      position: absolute;
    }
  }
  .created {
    margin-top: 0.5rem;
  }
  .recipe-instructions {
    width: 90%;
    background: rgba(255, 255, 255, 0);
    margin: -20px auto;
    padding: 3rem 1rem;
    text-align: left;
    position: relative;
    z-index: -1;
    border-radius: 5px;
    box-shadow: 0 0 20px 10px rgba(0, 0, 0, 0.14);
    h1 {
      text-align: center;
    }
    p {
      text-indent: 1rem;
    }
  }
`;

//////////////////////////////////////////////
//////////////NOTFOUND COMPONENT//////////////
export const NotFoundWrapper = styled.div`
  position: relative;
  height: 100vh;
  .notfound {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    max-width: 520px;
    width: 100%;
    line-height: 1.4;
    text-align: center;
    .notfound-404 {
      position: relative;
      height: 200px;
      margin: 0 auto 20px;
      z-index: -1;
      h1 {
        font-family: 'Montserrat', sans-serif;
        font-size: 236px;
        font-weight: 200;
        margin: 0;
        color: #211b19;
        text-transform: uppercase;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
      @media only screen and (max-width: 767px) {
        h1 {
          font-size: 148px;
        }
      }
      @media only screen and (max-width: 480px) {
        h1 {
          font-size: 86px;
        }
      }
      h2 {
        font-family: 'Montserrat', sans-serif;
        font-size: 28px;
        font-weight: 400;
        text-transform: uppercase;
        color: #211b19;
        background: #fff;
        padding: 10px 5px;
        margin: auto;
        display: inline-block;
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
      }
      @media only screen and (max-width: 480px) {
        h2 {
          font-size: 16px;
        }
      }
    }
    @media only screen and (max-width: 480px) {
      .notfound-404 {
        height: 148px;
        margin: 0 auto 10px;
      }
    }
    a {
      font-family: 'Montserrat', sans-serif;
      display: inline-block;
      font-weight: 700;
      text-decoration: none;
      color: #fff;
      text-transform: uppercase;
      padding: 13px 23px;
      background: #ff6300;
      font-size: 18px;
      transition: 0.2s all;
      &:hover {
        color: #ff6300;
        background: #211b19;
      }
    }
    @media only screen and (max-width: 480px) {
      a {
        padding: 7px 15px;
        font-size: 14px;
      }
    }
  }
`;
