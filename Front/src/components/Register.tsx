import { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import Cookies from 'js-cookie';

export default function Register() {
  const [username, setU] = useState('');
  const [password, setP] = useState('');
  const navigate = useNavigate();

  const submit = async () => {
    const res = await api.post('/auth/register', { username, password });
    Cookies.set('token', res.data.token);
    localStorage.setItem('token', res.data.token);

    navigate('/');
  };

  return (
    <Box sx={{ maxWidth:300, mx:'auto', mt:4, display:'flex', flexDirection:'column', gap:2}}>
      <TextField label='Username' value={username} onChange={e=>setU(e.target.value)} />
      <TextField type='password' label='Password' value={password} onChange={e=>setP(e.target.value)} />
      <Button variant='contained' onClick={submit}>Register</Button>
    </Box>
  );
}
