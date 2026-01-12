import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { graniteEvent, closeView } from '@apps-in-toss/web-framework';

/**
 * apps-in-toss 공통 내비게이션 백버튼 이벤트 처리 훅
 * - 히스토리가 있으면 뒤로가기
 * - 최초 화면(/)에서는 앱 종료
 */
export function useBackEvent() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const cleanup = graniteEvent.addEventListener('backEvent', {
      onEvent: () => {
        // 최초 화면(/)에서는 앱 종료
        if (location.pathname === '/') {
          closeView();
        } else {
          // 그 외에는 히스토리 백
          navigate(-1);
        }
      },
      onError: (error) => {
        console.error('Back event error:', error);
      },
    });

    return cleanup;
  }, [location.pathname, navigate]);
}
