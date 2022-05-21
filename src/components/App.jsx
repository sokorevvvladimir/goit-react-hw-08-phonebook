import styled from 'styled-components';
import { Toaster } from 'react-hot-toast';
import { Routes, Route } from 'react-router-dom';
import MainLoader from './Watch';
import { authOperations } from '../redux/auth';
import { useEffect, lazy, Suspense } from 'react';
import { useDispatch } from 'react-redux';
import PrivateRoute from './PrivateRoute';
// import PublicRoute from './PublicRoute';

const Layout = lazy(() => import('./Layout'));
const HomePage = lazy(() => import('../pages/HomePage'));
const RegisterPage = lazy(() => import('../pages/RegisterPage'));
const LoginPage = lazy(() => import('../pages/LoginPage'));
const MainContentPage = lazy(() => import('../pages/MainContentPage'));

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
      <Suspense fallback={<MainLoader/>}>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/contacts" element={<PrivateRoute />}>
              <Route path="/contacts" element={<MainContentPage />} />
          </Route> 
        </Route>
      </Routes>
      </Suspense>
      <Toaster />
    </Container>
  );
};

export default App;
