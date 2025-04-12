import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

export default function Reject() {
  const { appointmentId } = useParams();

  useEffect(() => {
    const rejectAppointment = async () => {
      await updateDoc(doc(db, "appointments", appointmentId), {
        status: "Rejected"
      });
    };
    rejectAppointment();
  }, [appointmentId]);

  return <div>Appointment Rejected!</div>;
}