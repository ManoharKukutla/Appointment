
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import emailjs from 'emailjs-com';

export default function Accept() {
  const { appointmentId } = useParams();
  const navigate = useNavigate();
  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load appointment details
  useEffect(() => {
    const fetchAppointment = async () => {
      const docSnap = await getDoc(doc(db, "appointments", appointmentId));
      setAppointment(docSnap.data());
      setLoading(false);
    };
    fetchAppointment();
  }, [appointmentId]);

  const handleFinalAccept = async () => {
    try {
      // Update status in Firestore
      await updateDoc(doc(db, "appointments", appointmentId), {
        status: "Accepted",
        respondedAt: new Date()
      });

      // Send confirmation email
      await emailjs.send(
        "service_beqkndb",
        "template_brhcrdh",
        {
          patient_name: appointment.patientName,
          patient_email: appointment.patientEmail,
          appointment_date: appointment.date,
          appointment_time: appointment.time
        },
        "dJspKxdkkmod62sVT"
      );

      navigate(`/status/${appointmentId}`);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (loading) return <div>Loading appointment details...</div>;

  return (
    <div className="confirmation-page">
      <h2>Confirm Appointment Acceptance</h2>
      <p>Patient: {appointment.patientName}</p>
      <p>Date: {appointment.date} at {appointment.time}</p>
      
      <div className="confirmation-buttons">
        <button onClick={handleFinalAccept} className="accept-btn">
          ✅ Final Accept
        </button>
        <button onClick={() => navigate(`/reject/${appointmentId}`)} className="reject-btn">
          ❌ Reject Instead
        </button>
      </div>
    </div>
  );
}