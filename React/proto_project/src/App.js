import './App.css';
import {BrowserRouter} from "react-router-dom";
import  {AllRoutes} from "../src/routes/AllRoutes"
function App() {
  return (
      <BrowserRouter>
           <AllRoutes />
      </BrowserRouter>

  );
}

export default App;
