import { Toaster } from 'react-hot-toast';
import { Routes, Route } from 'react-router-dom';
import MainLoader from './Watch';
import { authOperations } from '../redux/auth';
import { authSelectors } from '../redux/auth/';
import { useEffect, lazy, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import Appbar from './Appbar';
import Container from 'react-bootstrap/Container';
import styled from 'styled-components';


const HomePage = lazy(() => import('../pages/HomePage'));
const RegisterPage = lazy(() => import('../pages/RegisterPage'));
const LoginPage = lazy(() => import('../pages/LoginPage'));
const MainContentPage = lazy(() => import('../pages/MainContentPage'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'));

const StyledContainer = styled(Container)`
padding: 50px;

@media (max-width: 767px){
    width: 100%;
  };

@media (min-width: 768px){
    width: 75%;
  };

@media (min-width: 1024px){
    width: 50%;
  }  `;
const App = () => {
  const dispatch = useDispatch();
  const isFetchingCurrentUser = useSelector(authSelectors.getIsFetchingCurrent);
  
  useEffect(() => {
    dispatch(authOperations.fetchCurrentUser())
  }, [dispatch]);
  return (!isFetchingCurrentUser && (
    <>
      <Appbar />
      
      <StyledContainer fluid>
        <Suspense fallback={<MainLoader/>}>
          <Routes>
            <Route path="/" element={<PublicRoute />}>
              <Route path="/" element={<HomePage />}/>
            </Route>
            
            <Route path="/register" element={<PublicRoute restricted redirectTo="/contacts"/>}>
              <Route path="/register" element={<RegisterPage />}/>
            </Route>
            <Route path="/login" element={<PublicRoute restricted redirectTo="/contacts"/>}>
              <Route path="/login" element={<LoginPage />}/>
            </Route>
            <Route path="/contacts" element={<PrivateRoute redirectTo="/login"/>}>
              <Route path="/contacts" element={<MainContentPage />}/>
            </Route> 
            <Route path="*" element={<PublicRoute restricted redirectTo="/contacts" />}>
              <Route path="*" element={<NotFoundPage/> }/>
            </Route>
            
          </Routes>
        </Suspense>
        <Toaster />
        </StyledContainer>
    </>
    )
  );
};

export default App;
