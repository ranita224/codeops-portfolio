import Header from "./component/Header/Header";
import Footer from "./component/Footer/Footer";
import SideBar from "./component/Menu/SideBar/SideBar";
import Main from "./component/Menu/Main/Main";
import { SavedProvider } from "./context/SavedProvider";
import "./App.css";

function App() {
  return (
    <SavedProvider>
      <div className="app-container">
        <header>
          <Header />
        </header>

        <div className="content">
          <div className="main">
            <Main />
          </div>
        </div>

        <footer>
          <Footer />
        </footer>
      </div>
    </SavedProvider>
  );
}

export default App;