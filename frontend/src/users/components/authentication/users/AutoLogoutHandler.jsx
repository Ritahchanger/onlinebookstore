import { useEffect } from 'react'; 
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../../Redux/features/authSlice'; 

const AutoLogoutHandler = ({ user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    let timer;

    const startTimer = () => {
      timer = setTimeout(() => {
        handleLogout();
      }, 8 * 60 * 1000); // 10 minutes
    };

    const resetTimer = () => {
      clearTimer();
      startTimer();
    };

    const clearTimer = () => {
      if (timer) {
        clearTimeout(timer);
      }
    };

    const handleLogout = () => {
      dispatch(logout());
      navigate('/login');
    };

    if (user) {
      startTimer();
      document.addEventListener('mousemove', resetTimer);
      document.addEventListener('keypress', resetTimer);
      document.addEventListener('click', resetTimer);
    }

    return () => {
      clearTimer();
      document.removeEventListener('mousemove', resetTimer);
      document.removeEventListener('keypress', resetTimer);
      document.removeEventListener('click', resetTimer);
    };
  }, [user, dispatch, navigate]);

  return null;
};

export default AutoLogoutHandler;
