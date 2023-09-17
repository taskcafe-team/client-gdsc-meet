'use client';
import { Store } from './store';
import { Provider } from 'react-redux';

export default  function providers({ children }: { children: React.ReactNode }) {
  return <Provider store={Store}>{children}</Provider>;
}
