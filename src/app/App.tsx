import "./App.css";
import Routes from "src/app/providers/Routes.tsx";
import ThemeProviderWithToggle from "src/app/providers/Theme.tsx";

function App() {
  return (
    <ThemeProviderWithToggle>
      <Routes />
    </ThemeProviderWithToggle>
  );
}

export default App;
