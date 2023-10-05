import Providers from '@/redux/providers';
import Theme from '@/Theme/Theme';
import { Roboto } from 'next/font/google';
import '@livekit/components-styles';
import '@livekit/components-styles/prefabs';
import 'react-toastify/dist/ReactToastify.css';
import '@/scss/style.scss';
import { ToastContainer } from 'react-toastify';
import AuthProvider from '@/container/AuthProvider';

const roboto = Roboto({
  weight: '500',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata = {
  title: 'GDSC Meet ',
  description: 'Online meeting with AI GC',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning={true} className={roboto.className}>
      <body>
        <Providers>
          <Theme>
            <AuthProvider>{children}</AuthProvider>
            <ToastContainer />
          </Theme>
        </Providers>
      </body>
    </html>
  );
}
