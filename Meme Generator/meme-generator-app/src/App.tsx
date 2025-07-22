import "./App.css";
import Footer from "./components/footer";
import Header from "./components/header";
import MemeDisplay from "./pages/meme-display";

function App() {
  return (
    <>
      <Header />
      <main>
        <MemeDisplay />
        <Footer />
      </main>
    </>
  );
}

export default App;
