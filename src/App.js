import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import AddCategory from "./components/AddCategory";
import CreateThread from "./components/CreateThread";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/addcategory" element={<AddCategory />}></Route>
      </Routes>
      <Routes>
        <Route path="/createThread" element={<CreateThread />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
