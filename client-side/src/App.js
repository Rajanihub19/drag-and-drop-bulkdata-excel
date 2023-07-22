import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import AllRoutes from "./routes";

function App() {
  return (
    <div className="">
      <BrowserRouter>
        <AllRoutes />
      </BrowserRouter>
    </div>
  );
}

export default App;
