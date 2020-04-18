import React from 'react';
import { AppContainer } from './Components/styleComponent';
import Navbar from "./Components/Navbar";
import RenderRoutes from './Router/RenderRoutes';
import ROUTES from './Router/Routes';
import './App.css';

function App() {
  return (
    <AppContainer>
      <Navbar />
      <RenderRoutes routes={ROUTES} />
    </AppContainer>
  );
}

export default App;
