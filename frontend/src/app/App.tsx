import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import HomePage from "../pages/HomePage";
import AboutUs from "../pages/AboutUs";
import Services from "../pages/Services";
import ContactUs from "../pages/ContactUs";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import Projects from "../pages/Projects";
import ViewProject from "../pages/ViewProject";
import AdminLayout from "../admin/layouts/AdminLayout";
import AdminLogin from "../admin/pages/AdminLogin";
import Dashboard from "../admin/pages/Dashboard";
import AdminProfile from "../admin/pages/AdminProfile";
import ManageAdmins from "../admin/pages/ManageAdmins";
import ManageNavigation from "../admin/pages/ManageNavigation";
import ManageHero from "../admin/pages/ManageHero";
import ManageAbout from "../admin/pages/ManageAbout";
import ManageExpertise from "../admin/pages/ManageExpertise";
import ManageContactOffices from "../admin/pages/ManageContactOffices";
import ManageProjects from "../admin/pages/ManageProjects";
import ManageServices from "../admin/pages/ManageServices";
import ManageProcess from "../admin/pages/ManageProcess";
import ManageTestimonials from "../admin/pages/ManageTestimonials";
import ManageFooter from "../admin/pages/ManageFooter";
import ManageEnquiries from "../admin/pages/ManageEnquiries";

import CustomCursor from "./components/CustomCursor";

export default function App() {
  return (
    <BrowserRouter basename="/">
      <CustomCursor />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/services" element={<Services />} />
        <Route path="/projects" element={<Projects />} />
        {/* <Route
          path="/projects/:category/:projectSlug"
          element={<ViewProject />}
        /> */}
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />

        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/*" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="profile" element={<AdminProfile />} />
          <Route path="users" element={<ManageAdmins />} />
          <Route path="navigation" element={<ManageNavigation />} />
          <Route path="hero" element={<ManageHero />} />
          <Route path="about" element={<ManageAbout />} />
          <Route path="expertise" element={<ManageExpertise />} />
          <Route path="projects" element={<ManageProjects />} />
          <Route path="services" element={<ManageServices />} />
          <Route path="process" element={<ManageProcess />} />
          <Route path="testimonials" element={<ManageTestimonials />} />
          <Route path="footer" element={<ManageFooter />} />
          <Route path="contact-offices" element={<ManageContactOffices />} />
          <Route path="enquiries" element={<ManageEnquiries />} />
        </Route>
      </Routes>
      <Toaster position="top-right" richColors closeButton />
    </BrowserRouter>
  );
}
