import { Container } from '@mui/material';
import type { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <Container sx={{ mt: 4, mb: 4 }}>{children}</Container>
      <Footer />
    </>
  );
}
