import { useEffect, useState } from 'react';

const useWindowWidth = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const isMobileWidth = windowWidth <= 600;
  const isTabletWidth = windowWidth > 600 && windowWidth <= 1200;
  const isDesktopWidth = windowWidth > 1200;

  return { isMobileWidth, isTabletWidth, isDesktopWidth, windowWidth, windowHeight };
};

export default useWindowWidth;
