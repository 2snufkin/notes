import './App.css';
import {Route, Routes} from "react-router-dom";
import {PageNotFound, Test} from "./pages";

function App() {
  return (
    <div className="App">
            <Routes>
                <Route path="/test" element={Test} />
                <Route path="*" element={PageNotFound} />
            </Routes>

    </div>
  );
}

export default App;
