import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";

export default function AppointmentStatus() {
  const { state } = useLocation();
  const [status, setStatus] = useState("Pending");

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, "appointments", state.appointmentId), 
      (doc) => setStatus(doc.data().status)
    );
    return () => unsubscribe();
  }, [state.appointmentId]);

  return (
    <div>
      <h2>Appointment Status</h2>
      <p>Current Status: {status}</p>
    </div>
  );
}