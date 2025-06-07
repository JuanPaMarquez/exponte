import { Suspense } from 'react';
import { UserLoading } from "@/ui/Fallback/FallbackPage";
import PortafolioUsuarioPage from '@/ui/Portfolio/PortafolioUsuarioPage';

export default function PortfolioPage() {
  return (
    <Suspense fallback={<UserLoading />}>
      <PortafolioUsuarioPage />
    </Suspense>
  );
}