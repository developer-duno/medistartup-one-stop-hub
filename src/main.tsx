
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './styles/index.css';

// 시뮬레이터 초기화를 위한 기본 데이터 확인
const checkSimulatorData = () => {
  try {
    const storedSimulators = localStorage.getItem('simulators');
    
    if (!storedSimulators) {
      // 기본 시뮬레이터 데이터 생성
      const defaultSimulators = [
        {
          id: 1,
          title: '개원 비용 시뮬레이터',
          description: '진료과목별 평균 개원 비용 시뮬레이션',
          type: 'financial',
          active: true,
          views: 0
        },
        {
          id: 2,
          title: '수익성 분석 시뮬레이터',
          description: '지역 및 진료과목별 예상 수익 시뮬레이션',
          type: 'revenue',
          active: true,
          views: 0
        }
      ];
      
      localStorage.setItem('simulators', JSON.stringify(defaultSimulators));
      console.log('앱 초기화: 기본 시뮬레이터 데이터가 설정되었습니다.');
    }
  } catch (error) {
    console.error('시뮬레이터 데이터 초기화 중 오류:', error);
  }
};

// 앱 시작 시 초기 데이터 확인
checkSimulatorData();

// 루트 엘리먼트 가져오기
const rootElement = document.getElementById('root');

// 엘리먼트가 없으면 오류 로깅
if (!rootElement) {
  console.error('Root element not found! Check if the HTML has a div with id "root".');
}

// React 앱 렌더링
try {
  ReactDOM.createRoot(rootElement as HTMLElement).render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  );
  console.log('앱이 성공적으로 렌더링되었습니다.');
} catch (error) {
  console.error('앱 렌더링 중 오류가 발생했습니다:', error);
  
  // 최소한의 오류 UI 표시 시도
  if (rootElement) {
    rootElement.innerHTML = `
      <div style="padding: 20px; text-align: center; font-family: sans-serif;">
        <h1 style="color: #e11d48;">앱 로딩 오류</h1>
        <p>메디스타트업 앱을 로드하는 중 문제가 발생했습니다.</p>
        <button onclick="window.location.reload()" 
                style="padding: 10px 20px; background: #2563eb; color: white; border: none; border-radius: 4px; cursor: pointer;">
          새로고침
        </button>
      </div>
    `;
  }
}
