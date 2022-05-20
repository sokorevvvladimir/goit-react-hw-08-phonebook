import styled from 'styled-components';
import HomePage from '../pages/HomePage';
import Layout from './Layout';
import { Toaster } from 'react-hot-toast';
import { Routes, Route } from 'react-router-dom';
import RegisterPage from '../pages/RegisterPage';
import LoginPage from '../pages/LoginPage';
import MainContentPage from '../pages/MainContentPage';
import { authOperations } from '../redux/auth';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux'

const Container = styled.div`
  width: 95vw;
  margin: 0 auto;
`;

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authOperations.fetchCurrentUser())
  }, [dispatch]);
  return (
    <Container>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/contacts" element={ <MainContentPage/>}/>
        </Route>
      </Routes>
      <Toaster />
    </Container>
  );
};

export default App;
