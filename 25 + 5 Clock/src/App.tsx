import "./App.css";
import FocusPreview from "./components/focus-preview";
import Settings from "./components/settings";
import Header from "./components/shared/header";
import { FocusConfigProvider } from "./context/focus-config";

function App() {
  return (
    <>
      <Header />
      <FocusConfigProvider>
        <FocusPreview />
        <Settings />
      </FocusConfigProvider>
    </>
  );
}

export default App;
