import React from "react";
import "../styles/Consultants.css";

const Consultants = () => {
  // Mock Data for Doctors
  const doctorsBySpecialization = [
    {
      specialization: "General Medicine",
      doctors: [
        {
          id: 1,
          name: "Dr. John Doe",
          email: "johndoe@example.com",
          mobile: "+1 123-456-7890",
        },
        {
          id: 2,
          name: "Dr. Jane Smith",
          email: "janesmith@example.com",
          mobile: "+1 987-654-3210",
        },
      ],
    },
    {
      specialization: "Gynecology",
      doctors: [
        {
          id: 3,
          name: "Dr. Emily Brown",
          email: "emilybrown@example.com",
          mobile: "+1 555-123-4567",
        },
        {
          id: 4,
          name: "Dr. Sarah Johnson",
          email: "sarahjohnson@example.com",
          mobile: "+1 555-987-6543",
        },
      ],
    },
    {
      specialization: "Cardiology",
      doctors: [
        {
          id: 5,
          name: "Dr. Michael Lee",
          email: "michaellee@example.com",
          mobile: "+1 555-456-7890",
        },
        {
          id: 6,
          name: "Dr. Robert Wilson",
          email: "robertwilson@example.com",
          mobile: "+1 555-654-3210",
        },
      ],
    },
    {
      specialization: "ENT",
      doctors: [
        {
          id: 7,
          name: "Dr. David Clark",
          email: "davidclark@example.com",
          mobile: "+1 555-789-1234",
        },
        {
          id: 8,
          name: "Dr. Laura Adams",
          email: "lauraadams@example.com",
          mobile: "+1 555-321-6547",
        },
      ],
    },
    {
      specialization: "Dermatology",
      doctors: [
        {
          id: 9,
          name: "Dr. Olivia Taylor",
          email: "oliviataylor@example.com",
          mobile: "+1 555-234-5678",
        },
        {
          id: 10,
          name: "Dr. James White",
          email: "jameswhite@example.com",
          mobile: "+1 555-876-5432",
        },
      ],
    },
    {
      specialization: "Ophthalmology",
      doctors: [
        {
          id: 11,
          name: "Dr. Sophia Martinez",
          email: "sophiamartinez@example.com",
          mobile: "+1 555-345-6789",
        },
        {
          id: 12,
          name: "Dr. Daniel Anderson",
          email: "danielanderson@example.com",
          mobile: "+1 555-765-4321",
        },
      ],
    },
    {
      specialization: "Pediatrics",
      doctors: [
        {
          id: 13,
          name: "Dr. Emma Harris",
          email: "emmaharris@example.com",
          mobile: "+1 555-456-7891",
        },
        {
          id: 14,
          name: "Dr. Noah Martin",
          email: "noahmartin@example.com",
          mobile: "+1 555-654-3219",
        },
      ],
    },
    {
      specialization: "Orthopedics",
      doctors: [
        {
          id: 15,
          name: "Dr. Ava Thompson",
          email: "avathompson@example.com",
          mobile: "+1 555-567-8912",
        },
        {
          id: 16,
          name: "Dr. Liam Garcia",
          email: "liamgarcia@example.com",
          mobile: "+1 555-432-1987",
        },
      ],
    },
  ];

  return (
    <div className="consultants-page">
      <h1>Consultants</h1>
      <div className="specializations-list">
        {doctorsBySpecialization.map((specialization) => (
          <div key={specialization.specialization} className="specialization-card">
            <h2>{specialization.specialization}</h2>
            <div className="doctors-list">
              {specialization.doctors.map((doctor) => (
                <div key={doctor.id} className="doctor-card">
                  <h3>{doctor.name}</h3>
                  <p><strong>Email:</strong> {doctor.email}</p>
                  <p><strong>Mobile:</strong> {doctor.mobile}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Consultants;