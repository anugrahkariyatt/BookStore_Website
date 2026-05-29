import { Routes, Route } from "react-router-dom";
import "./App.css";
import Homepage from "./pages/Homepage";
import MainLayout from "./layouts/MainLayout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Books from "./pages/Books";
import Book from "./pages/Book";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route element={<MainLayout />}>
          <Route path="/home" element={<Homepage />} />
          <Route path="/product/:id" element={<Book />} />
          <Route path="/books" element={<Books />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
