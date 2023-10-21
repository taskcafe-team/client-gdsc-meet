
import { DefaultLoading } from '@/components/Loading';


export default function Layout({ children }: { children: React.ReactNode }) {
  

  return (
    <div className={`layout`}>
      {children}
    </div>
  );
}
