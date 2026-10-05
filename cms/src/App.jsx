import HomePage from "./pages/HomePage"
import { BrowserRouter, Routes, Route } from "react-router";
import Login from "./pages/Login";
import BaseLayout from "./pages/BaseLayout";
import Add from "./pages/Add";
import Detail from "./pages/Detail";
import Edit from "./pages/Edit";

function App() {

  return (
    <>
    <div className="p-5">
    <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<BaseLayout />} >
        <Route path="/" element={<HomePage />} index/>
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/add" element={<Add />} />
        <Route path="/edit/:id" element={<Edit />} />
      </Route>
    </Routes>
  </BrowserRouter>
    </div>
    </>
  )
}

export default App
