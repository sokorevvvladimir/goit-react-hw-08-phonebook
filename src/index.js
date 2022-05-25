import React from 'react';
import ReactDOM from 'react-dom/client';
import App from 'components/App';
import './index.css';
import { store, persistor } from './redux/store';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ThemeProvider from 'react-bootstrap/ThemeProvider'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    <React.StrictMode>
        <BrowserRouter basename="/goit-react-hw-08-phonebook">
          <ThemeProvider
  breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
>
            <App />
            </ThemeProvider>
        </BrowserRouter>
      </React.StrictMode>
    </PersistGate>
  </Provider>
);
