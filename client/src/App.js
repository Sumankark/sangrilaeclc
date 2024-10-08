// App.js
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Main from "./pages/Main";
import AdminDashBoard from "./pages/AdminDashBoard";
import AdminLogin from "./pages/AdminLogin";
import LangTranslator from "./components/LangTranslator";
import Users from "./components/Users";
import Carousel from "./components/Carousel";
import Images from "./components/Images";
import Goals from "./components/Goals";
import Services from "./components/Services";
import Volunteering from "./components/Volunteering";
import About from "./components/About";
import Organization from "./components/Organization";
import Home from "./components/Home";
import Profile from "./components/Profile";

function App() {
  return (
    <div>
      <div>
        <LangTranslator />
      </div>
      <div className="relative">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashBoard />}>
            <Route index element={<Home />} />
            <Route path="profile" element={<Profile />} />
            <Route path="user" element={<Users />} />
            <Route path="carousel" element={<Carousel />} />
            <Route path="images" element={<Images />} />
            <Route path="goals" element={<Goals />} />
            <Route path="services" element={<Services />} />
            <Route path="volunteering" element={<Volunteering />} />
            <Route path="about" element={<About />} />
            <Route path="organization" element={<Organization />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
