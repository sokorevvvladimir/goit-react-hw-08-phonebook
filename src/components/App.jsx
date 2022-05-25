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
import Container from 'react-bootstrap/Container'

const HomePage = lazy(() => import('../pages/HomePage'));
const RegisterPage = lazy(() => import('../pages/RegisterPage'));
const LoginPage = lazy(() => import('../pages/LoginPage'));
const MainContentPage = lazy(() => import('../pages/MainContentPage'));

const App = () => {
  const dispatch = useDispatch();
  const isFetchingCurrentUser = useSelector(authSelectors.getIsFetchingCurrent);

  useEffect(() => {
    dispatch(authOperations.fetchCurrentUser())
  }, [dispatch]);
  return (!isFetchingCurrentUser && (
    <>
      <Appbar/>
      <Container fluid className="w-50" style={{padding: 50}}>
        <Suspense fallback={<MainLoader/>}>
          <Routes>
            <Route path="/" element={<PublicRoute />}>
              <Route path="/" element={<HomePage />}/>
            </Route>
            
            <Route path="/register" element={<PublicRoute restricted redirectTo="/"/>}>
              <Route path="/register" element={<RegisterPage />}/>
            </Route>
            <Route path="/login" element={<PublicRoute restricted redirectTo="/contacts"/>}>
              <Route path="/login" element={<LoginPage />}/>
            </Route>
            <Route path="/contacts" element={<PrivateRoute redirectTo="/login"/>}>
              <Route path="/contacts" element={<MainContentPage />}/>
            </Route> 
            
          </Routes>
        </Suspense>
        <Toaster />
        </Container>
    </>
    )
  );
};

export default App;
