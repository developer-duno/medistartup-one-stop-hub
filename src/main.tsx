
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './styles/index.css';

// 루트 엘리먼트 가져오기
const rootElement = document.getElementById('root');

// 엘리먼트가 없으면 오류 로깅
if (!rootElement) {
  console.error('Root element not found! Check if the HTML has a div with id "root".');
}

// React 앱 렌더링
ReactDOM.createRoot(rootElement as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
