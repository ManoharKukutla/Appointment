import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import DoctorList from "./components/Doctor/DoctorList";
import AppointmentForm from "./components/Doctor/AppointmentForm";
import AppointmentStatus from "./components/Doctor/AppointmentStatus";
import Accept from "./components/Doctor/Accept";
import Reject from "./components/Doctor/Reject";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<DoctorList />} />
          <Route path="book" element={<AppointmentForm />} />
          <Route path="status" element={<AppointmentStatus />} />
          <Route path="accept/:appointmentId" element={<Accept />} />
          <Route path="reject/:appointmentId" element={<Reject />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}