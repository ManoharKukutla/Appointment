import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { useNavigate } from "react-router-dom";

export default function DoctorList() {
  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctors = async () => {
      const querySnapshot = await getDocs(collection(db, "doctors"));
      setDoctors(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchDoctors();
  }, []);

  return (
    <div className="doctor-list">
      <h1>Available Doctors List</h1>
      {doctors.map(doctor => (
        <div key={doctor.id} className="doctor-card">
          <h3>{doctor.name}</h3>
          <p>{doctor.specialty}</p>
          <button onClick={() => navigate("/book", { state: { doctorId: doctor.id } })}>
            Book Appointment
          </button>
        </div>
      ))}
    </div>
  );
}