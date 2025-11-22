import { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import Cookies from 'js-cookie';

export default function Login() {
  const [username, setU] = useState('');
  const [password, setP] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const submit = async () => {
    setError('');
    try {
      const res = await api.post('/auth/login', { username, password });
      Cookies.set('token', res.data.token);
      localStorage.setItem('token', res.data.token);

      navigate('/');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      if (err.response?.status === 401) {
        setError('Invalid username or password');
      } else {
        setError('Login failed, try again');
      }
    }
  };

  return (
    <Box sx={{ maxWidth: 300, mx: 'auto', mt: 4, display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TextField label="Username" value={username} onChange={(e) => setU(e.target.value)} />
      <TextField type="password" label="Password" value={password} onChange={(e) => setP(e.target.value)} />
      {error && <Typography color="error">{error}</Typography>}
      <Button variant="contained" onClick={submit}>
        Login
      </Button>
    </Box>
  );
}
