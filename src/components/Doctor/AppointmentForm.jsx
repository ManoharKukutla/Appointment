import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { collection, addDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import emailjs from "emailjs-com";

export default function AppointmentForm() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    date: "",
    time: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Save to Firestore
      const appointmentRef = await addDoc(collection(db, "appointments"), {
        doctorId: state.doctorId,
        ...form,
        status: "Pending"
      });

      // Get doctor's email
      const doctorDoc = await getDoc(doc(db, "doctors", state.doctorId));
      const doctorEmail = doctorDoc.data().email;

      // Send email to doctor
      await emailjs.send(
        "service_beqkndb",
        "template_9aqwql4",
        {
          doctor_email: doctorEmail,
          patient_name: form.name,
          patient_email: form.email,
          date: form.date,
          time: form.time,
          accept_link: `https://appointment-inky-beta.vercel.app/accept/${appointmentRef.id}`,
          reject_link: `https://appointment-inky-beta.vercel.app/reject/${appointmentRef.id}`
        },
        "dJspKxdkkmod62sVT"
      );

      navigate("/status", { state: { appointmentId: appointmentRef.id } });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Book Appointment</h2>
      <input
        type="text"
        placeholder="Your Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        required
      />
      {/* Add other fields similarly */}
      <button type="submit">Confirm Booking</button>
    </form>
  );
}