import SharedLayout from './pages/SharedLayout.js';
import Home from "./pages/Home";

import { Route,Routes } from "react-router-dom";


function App() {
  return (
    <>
    <Routes>
      <Route element={<SharedLayout/>}>
        <Route path='/' element={<Home/>}></Route>
      </Route>
    </Routes>
    </>
  );
}

export default App;
