import dynamic from 'next/dynamic';
import { UserLoading } from "@/ui/Fallback/FallbackPage";

const ClientOnlyPortfolio = dynamic(
  () => import('./PortafolioUsuarioPageClient'),
  { 
    ssr: false,
    loading: () => <UserLoading />
  }
);

export default ClientOnlyPortfolio;