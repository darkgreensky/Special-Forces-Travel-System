import React from 'react';
import ReactDOM from 'react-dom/client';
// import './index.css';
import './styles/index.css';
import './styles/sideBar.css';
import './styles/app.css'
import './component/sideBar';
import App from './component/app';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap';
import { Provider } from 'react-redux';
import store from './redux/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store = {store}>
    <BrowserRouter>
        <App />
    </BrowserRouter>
  </Provider>
);