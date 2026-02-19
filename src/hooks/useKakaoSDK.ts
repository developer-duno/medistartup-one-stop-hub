import { useEffect, useState } from 'react';

declare global {
  interface Window {
    Kakao: any;
  }
}

const KAKAO_APP_KEY = 'c43d5347a799e3c48342ab2155fc1acc';

export const useKakaoSDK = () => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // 이미 초기화된 경우
    if (window.Kakao?.isInitialized?.()) {
      setIsReady(true);
      return;
    }

    // 이미 스크립트가 로드된 경우
    if (window.Kakao) {
      window.Kakao.init(KAKAO_APP_KEY);
      setIsReady(true);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://t1.kakaocdn.net/kakao_js_sdk/2.7.4/kakao.min.js';
    script.integrity = 'sha384-DKYJZ8NLiK8MN4/C5P2dtSmLQ4KwPaoqAfyA/DfmOs1lPZhAR0VB/oFKLBqdegM';
    script.crossOrigin = 'anonymous';
    script.async = true;
    script.onload = () => {
      if (window.Kakao && !window.Kakao.isInitialized()) {
        window.Kakao.init(KAKAO_APP_KEY);
      }
      setIsReady(true);
    };
    document.head.appendChild(script);
  }, []);

  return isReady;
};

export const shareToKakao = ({
  title,
  description,
  imageUrl,
  linkUrl,
}: {
  title: string;
  description: string;
  imageUrl?: string;
  linkUrl: string;
}) => {
  if (!window.Kakao?.Share) return false;

  window.Kakao.Share.sendDefault({
    objectType: 'feed',
    content: {
      title,
      description,
      imageUrl: imageUrl || 'https://medistartup.co.kr/og-image.jpg',
      link: { mobileWebUrl: linkUrl, webUrl: linkUrl },
    },
    buttons: [
      { title: '자세히 보기', link: { mobileWebUrl: linkUrl, webUrl: linkUrl } },
    ],
  });
  return true;
};
