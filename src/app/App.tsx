import 'react-toastify/dist/ReactToastify.css';
import Routes from 'src/app/providers/Routes.tsx';
import ThemeProviderWithToggle from 'src/app/providers/Theme.tsx';
import QueryProvider from 'src/app/providers/Query.tsx';
import { ToastContainer } from 'react-toastify';
import MuiLocalizationProvider from 'src/app/providers/MuiLocalizationProvider.tsx';

function App() {
  return (
    <QueryProvider>
      <ThemeProviderWithToggle>
        <MuiLocalizationProvider>
          <Routes />
          <ToastContainer stacked hideProgressBar />
        </MuiLocalizationProvider>
      </ThemeProviderWithToggle>
    </QueryProvider>
  );
}

export default App;
