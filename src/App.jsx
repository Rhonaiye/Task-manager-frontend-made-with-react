import Home from "./components/home";
import Login from "./components/login";
import Signup from "./components/sign-up";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";


const App = () => {

  return (
    <Router>
         <Routes>
             <Route path="/" element={<Home/>}/>
             <Route path="/login" element={<Login/>}/>
             <Route path="/sign-up" element={<Signup/>}/>
         </Routes>
    </Router>
  );
};

export default App;
