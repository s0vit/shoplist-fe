import { useEffect, useState } from 'react';

const useWindowWidth = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const isMobileWidth = windowWidth <= 600;
  const isTabletWidth = windowWidth > 600 && windowWidth <= 900;
  const isDesktopWidth = windowWidth > 900;

  return { isMobileWidth, isTabletWidth, isDesktopWidth };
};

export default useWindowWidth;
