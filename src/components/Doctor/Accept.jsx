import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import emailjs from "emailjs-com";

export default function Accept() {
  const { appointmentId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const acceptAppointment = async () => {
      await updateDoc(doc(db, "appointments", appointmentId), {
        status: "Accepted"
      });

      // Send confirmation email
      const appointment = await getDoc(doc(db, "appointments", appointmentId));
      await emailjs.send(
        "service_beqkndb",
        "template_brhcrdh",
        {
          patient_email: appointment.data().email,
          patient_name: appointment.data().name
        },
        "dJspKxdkkmod62sVT"
      );

      navigate("/status", { state: { appointmentId } });
    };
    acceptAppointment();
  }, [appointmentId, navigate]);

  return <div>Appointment Accepted!</div>;
}