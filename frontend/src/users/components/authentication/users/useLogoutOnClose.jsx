import { useEffect } from 'react';

const useLogoutOnClose = (logout) => {
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      // Custom logic for logging out the user
      logout();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [logout]);
};

export default useLogoutOnClose;
