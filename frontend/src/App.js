import { UserContextProvider } from "./contexts/UserContext";
import { ToastContainer } from "react-toastify";
import Screens from "./screens";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  return (
    <div className="App">
      <ToastContainer position="top-right" autoClose={1000} />
      <UserContextProvider>
        <Screens />
      </UserContextProvider>
    </div>
  );
}

export default App;
