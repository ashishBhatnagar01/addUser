import Login from "./Components/Login";
import Tabs from "./Components/Tabs";
import {BrowserRouter as Router, Routes,Route, BrowserRouter} from "react-router-dom"
function App() {
  return(
    <Router>
      <Routes>
        <Route index path="/" element={<Login/>} />
        <Route  path="/tabs" element={<Tabs/>} />
      </Routes>
    </Router>
  )
}

export default App;
