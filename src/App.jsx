import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Layout from "./components/Layout";
import DoctorList from "./components/Doctor/DoctorList";
import AppointmentForm from "./components/Doctor/AppointmentForm";
import AppointmentStatus from "./components/Doctor/AppointmentStatus";
import Accept from "./components/Doctor/Accept";
import Reject from "./components/Doctor/Reject";

// URL Parameter Handler Component
function UrlParamHandler() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const action = params.get('action');
    const id = params.get('id');

    if (action && id) {
      // Redirect to the proper route
      navigate(`/${action}/${id}`, { replace: true });
    }
  }, [location.search, navigate]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <UrlParamHandler />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<DoctorList />} />
          <Route path="book" element={<AppointmentForm />} />
          <Route path="accept/:appointment_Id" element={<Accept />} />
          <Route path="reject/:appointment_Id" element={<Reject />} />
          <Route path="status/:appointment_Id" element={<AppointmentStatus />} />

          {/* <Route path="status/:appointmentId" element={<AppointmentStatus />} />
          {/* <Route path="status" element={<AppointmentStatus />} /> */}
          {/* <Route path="accept/:appointmentId" element={<Accept />} /> */}
          {/* <Route path="reject/:appointmentId" element={<Reject />} /> */} 
        </Route>
      </Routes>
    </BrowserRouter>
  );
}