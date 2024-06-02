import 'react-toastify/dist/ReactToastify.css';
import Routes from 'src/app/providers/Routes.tsx';
import ThemeProviderWithToggle from 'src/app/providers/Theme.tsx';
import QueryProvider from 'src/app/providers/Query.tsx';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <QueryProvider>
      <ThemeProviderWithToggle>
        <Routes />
        <ToastContainer stacked />
      </ThemeProviderWithToggle>
    </QueryProvider>
  );
}

export default App;
