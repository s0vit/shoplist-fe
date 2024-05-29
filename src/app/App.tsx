import './App.css';
import Routes from 'src/app/providers/Routes.tsx';
import ThemeProviderWithToggle from 'src/app/providers/Theme.tsx';
import QueryProvider from 'src/app/providers/Query.tsx';

function App() {
  return (
    <QueryProvider>
      <ThemeProviderWithToggle>
        <Routes />
      </ThemeProviderWithToggle>
    </QueryProvider>
  );
}

export default App;
