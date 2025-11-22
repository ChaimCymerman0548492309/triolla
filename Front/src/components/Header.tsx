import { AppBar, Toolbar, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

export default function Header() {
  const navigate = useNavigate();
  const token = Cookies.get('token') || localStorage.getItem('token');

  const logout = () => {
    Cookies.remove('token');
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <AppBar position='static'>
      <Toolbar>
        <Button color='inherit' onClick={()=>navigate('/')}>Home</Button>
        {!token && <Button color='inherit' onClick={()=>navigate('/login')}>Login</Button>}
        {!token && <Button color='inherit' onClick={()=>navigate('/register')}>Register</Button>}
        {token && <Button color='inherit' onClick={logout}>Logout</Button>}
      </Toolbar>
    </AppBar>
  );
}
