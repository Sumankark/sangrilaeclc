// App.js
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Main from "./pages/Main";
import AdminDashBoard from "./pages/AdminDashBoard";
import AdminLogin from "./pages/AdminLogin";
import Users from "./components/Users";
import Carousel from "./components/Carousel";
import Goals from "./components/Goals";
import Services from "./components/Services";
import Volunteering from "./components/Volunteering";
import About from "./components/About";
import Organization from "./components/Organization";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Gallery from "./components/Gallery";
import LangTranslator from "./components/LangTranslator";
import GoalsDetails from "./components/Users/GoalsDetails";
import OurGallery from "./components/Users/OurGallery";
import ServiceDetails from "./components/ServiceDetails";
import AboutUs from "./components/Users/AboutUs";
import AddAbout from "./components/Organization/AddAbout";
import AddAddress from "./components/Organization/AddAddress";
import AddContact from "./components/Organization/AddContact";
import AddIframe from "./components/Organization/AddIframe";
import ServiceDetailsFnt from "./components/Users/ServiceDetailsFnt";
import ContactUs from "./components/Users/ContactUs";

function App() {
  return (
    <div>
      <div>
        <LangTranslator />
      </div>
      <div className="relative">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/services/:id" element={<ServiceDetailsFnt />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/goals" element={<GoalsDetails />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/our-gallery" element={<OurGallery />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashBoard />}>
            <Route index element={<Home />} />
            <Route path="profile" element={<Profile />} />
            <Route path="user" element={<Users />} />
            <Route path="carousel" element={<Carousel />} />
            <Route path="gallery" element={<Gallery />} />
            <Route path="goals" element={<Goals />} />
            <Route path="services" element={<Services />} />
            <Route
              path="service-details/:serviceId"
              element={<ServiceDetails />}
            />
            <Route path="volunteering" element={<Volunteering />} />
            <Route path="about" element={<About />} />
            <Route path="organization" element={<Organization />}>
              <Route index element={<AddAbout />} />
              <Route path="add-address" element={<AddAddress />} />
              <Route path="add-contact" element={<AddContact />} />
              <Route path="add-iframe" element={<AddIframe />} />
            </Route>
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
