import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Checkbox,
  Chip,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import api from '../api';

interface Todo {
  id: string;
  title: string;
  description?: string;
  url?: string;
  completed: boolean;
  createdAt: string;
  dueDate?: string;
  updatedAt?: string;
}

export default function Dashboard() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState('');

  const add = async () => {
    if (!title.trim()) return;
    const res = await api.post('/todos', { title });
    setTodos((prev) => [...prev, res.data.sqlTodo]);
    setTitle('');
  };

  const remove = async (id: string) => {
    await api.delete('/todos/' + id);
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  const toggleCompleted = async (id: string, completed: boolean) => {
    const res = await api.put(`/todos/${id}`, { completed });
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, completed: res.data.sqlTodo.completed } : t)));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') add();
  };

  useEffect(() => {
    async function load() {
      const res = await api.get('/todos');
      setTodos(res.data.sqlTodos);
    }
    load();
  }, []);

  return (
    <Box sx={{ maxWidth: 800, margin: '0 auto', p: 3 }}>
      <Typography variant="h4" gutterBottom color="primary">
        My Tasks
      </Typography>

      {/* Add new todo */}
      <Card sx={{ mb: 3, p: 2 }}>
        <Stack direction="row" spacing={1} alignItems="center">
          <TextField
            fullWidth
            label="What needs to be done?"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyPress={handleKeyPress}
            size="small"
          />
          <Button variant="contained" onClick={add} disabled={!title.trim()}>
            Add
          </Button>
        </Stack>
      </Card>

      {/* Todos list */}
      <Stack spacing={2}>
        {todos?.map((t) => (
          <Card key={t.id} variant="outlined" sx={{ opacity: t.completed ? 0.7 : 1 }}>
            <CardContent>
              <Stack direction="row" alignItems="flex-start" spacing={1}>
                <Checkbox
                  checked={t.completed ?? false}
                  onChange={() => toggleCompleted(t.id, !t.completed)}
                  sx={{ mt: 0.5 }}
                />
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" sx={{ textDecoration: t.completed ? 'line-through' : 'none' }}>
                    {t.title}
                  </Typography>
                  {t.description && (
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                      {t.description}
                    </Typography>
                  )}
                  {t.url && (
                    <Typography variant="body2" sx={{ mt: 0.5 }}>
                      <a href={t.url} target="_blank" rel="noopener noreferrer">
                        🔗 Open Link
                      </a>
                    </Typography>
                  )}
                  <Stack direction="row" spacing={1} sx={{ mt: 1 }} flexWrap="wrap">
                    <Chip
                      size="small"
                      label={`Created: ${new Date(t.createdAt).toLocaleDateString()} ${new Date(
                        t.createdAt,
                      ).toLocaleTimeString()}`}
                      variant="outlined"
                    />
                    {t.createdAt &&
                      (() => {
                        const now = new Date();
                        const created = new Date(t.createdAt);
                        const diffMs = now.getTime() - created.getTime();
                        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
                        const diffHours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
                        return <Chip size="small" color="info" label={`Created ${diffDays}d ${diffHours}h ago`} />;
                      })()}
                    {t.dueDate && (
                      <Chip size="small" color="warning" label={`Due: ${new Date(t.dueDate).toLocaleDateString()}`} />
                    )}
                    {t.completed && <Chip size="small" color="success" label="Completed" />}
                  </Stack>
                </Box>
              </Stack>
            </CardContent>

            <CardActions sx={{ justifyContent: 'flex-end' }}>
              <Button size="small" color="error" onClick={() => remove(t.id)}>
                Delete
              </Button>
            </CardActions>
          </Card>
        ))}
      </Stack>

      {todos.length === 0 && (
        <Typography textAlign="center" color="text.secondary" sx={{ mt: 4 }}>
          No tasks yet. Add your first task above!
        </Typography>
      )}
    </Box>
  );
}
