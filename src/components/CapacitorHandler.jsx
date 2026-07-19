import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { App as CapApp } from '@capacitor/app';

export default function CapacitorHandler() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const initBackButton = async () => {
      const listener = await CapApp.addListener('backButton', () => {
        const rootPaths = ['/dashboard', '/login', '/register', '/'];
        if (rootPaths.includes(location.pathname)) {
          CapApp.exitApp();
        } else {
          navigate(-1);
        }
      });

      return listener;
    };

    const listenerPromise = initBackButton();

    return () => {
      listenerPromise.then((listener) => {
        listener.remove();
      });
    };
  }, [location.pathname, navigate]);

  return null;
}
