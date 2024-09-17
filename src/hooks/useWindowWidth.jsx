import { useState, useEffect } from 'react';

function useWindowWidth() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);

    window.addEventListener('resize', handleResize);

    // Limpeza do event listener quando o componente desmonta
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowWidth;
}

export {useWindowWidth}