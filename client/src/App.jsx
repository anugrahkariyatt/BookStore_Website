import { Routes, Route } from "react-router-dom";
import "./App.css";
import Homepage from "./pages/Homepage";
import MainLayout from "./layouts/MainLayout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Books from "./pages/Books";
import Book from "./pages/Book";
import About from "./pages/About";
import Contact from "./pages/Contact";
import AdminDashBoard from "./pages/admin/DashBoard";
import AdminBooks from "./pages/admin/Books";
import AdminCategories from "./pages/admin/Categories";
import AdminOrders from "./pages/admin/Orders";
import AdminProfile from "./pages/admin/Profile";
import Users from "./pages/admin/Users";
import AdminLayout from "./layouts/AdminLayout";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route element={<AdminLayout />}>
          <Route path="/dashboard" element={<AdminDashBoard />} />
          <Route path="/adminbook" element={<AdminBooks />} />
          <Route path="/admincategories" element={<AdminCategories />} />
          <Route path="/adminorders" element={<AdminOrders />} />
          <Route path="/adminprofile" element={<AdminProfile />} />
          <Route path="/users" element={<Users />} />
        </Route>
        <Route element={<MainLayout />}>
          <Route path="/home" element={<Homepage />} />
          <Route path="/product/:id" element={<Book />} />
          <Route path="/books" element={<Books />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
