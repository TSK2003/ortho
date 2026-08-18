export const initialWardsList = [
  {
    id: "robotic-icu",
    name: "Robotic Joint & Post-Op Critical Care ICU",
    type: "Intensive Care Unit",
    floor: "3rd Floor - Surgical Wing",
    totalBeds: 8,
    occupiedBeds: 5,
    nurseInCharge: "Nurse Supervisor Rekha, RN, CCRN",
    description: "Equipped with continuous cardiac monitoring, arterial blood gas analyzers, invasive hemodynamic monitors, and dedicated post-arthroplasty warming blankets."
  },
  {
    id: "spine-hdu",
    name: "Spine Surgery High Dependency Unit (HDU)",
    type: "High Dependency Unit",
    floor: "3rd Floor - Spine Wing",
    totalBeds: 6,
    occupiedBeds: 4,
    nurseInCharge: "Nurse Senior Aruna, RN, B.Sc Nursing",
    description: "Specialized step-down care for post-spinal fusion, microdiscectomy, and scoliosis correction with continuous neurological monitoring."
  },
  {
    id: "trauma-ward",
    name: "Orthopedic Trauma & Polytrauma Ward",
    type: "Acute Fracture Ward",
    floor: "2nd Floor - Trauma Block",
    totalBeds: 12,
    occupiedBeds: 9,
    nurseInCharge: "Nurse Incharge Karthik, RN",
    description: "Dedicated to multi-fracture stabilization, traction management, Ilizarov ring frame care, and cast monitoring."
  },
  {
    id: "deluxe-ortho-suites",
    name: "Deluxe Private Orthopedic Suites",
    type: "Private Post-Surgical Room",
    floor: "4th Floor - Executive Wing",
    totalBeds: 10,
    occupiedBeds: 6,
    nurseInCharge: "Nurse Supervisor Deepa, RN",
    description: "Spacious private recovery suites with mechanized orthopedic low-height beds, attendant accommodation, and in-suite physiotherapy bays."
  }
];

export const initialBedsList = [
  {
    id: "bed-icu-101",
    wardId: "robotic-icu",
    wardName: "Robotic Joint & Post-Op Critical Care ICU",
    bedNumber: "ICU-101",
    status: "occupied",
    patientName: "M. Ramasamy (Age 64)",
    patientId: "ORT-98214",
    admittedDate: "2026-08-17",
    attendingDoctor: "Dr. Rajeshwar V. Natarajan, MS (Ortho)",
    rehabSupport: "Robotic Bilateral TKR - Day 1 Mobilization Protocol",
    notes: "Post-op Day 1. Vitals stable. CPM knee flexion 70° achieved. Hemoglobin 12.8."
  },
  {
    id: "bed-icu-102",
    wardId: "robotic-icu",
    wardName: "Robotic Joint & Post-Op Critical Care ICU",
    bedNumber: "ICU-102",
    status: "occupied",
    patientName: "S. Lakshmi (Age 58)",
    patientId: "ORT-98219",
    admittedDate: "2026-08-18",
    attendingDoctor: "Dr. Rajeshwar V. Natarajan, MS (Ortho)",
    rehabSupport: "Direct Anterior Total Hip Replacement (THR)",
    notes: "Post-op 4 hours. Epidural infusion on taper. Unassisted bedside standing completed."
  },
  {
    id: "bed-icu-103",
    wardId: "robotic-icu",
    wardName: "Robotic Joint & Post-Op Critical Care ICU",
    bedNumber: "ICU-103",
    status: "available",
    patientName: "",
    patientId: "",
    admittedDate: "",
    attendingDoctor: "",
    rehabSupport: "Mechanized Orthopedic ICU Bed",
    notes: "Sterilized and prepped for evening emergency robotic joint case."
  },
  {
    id: "bed-hdu-201",
    wardId: "spine-hdu",
    wardName: "Spine Surgery High Dependency Unit (HDU)",
    bedNumber: "HDU-201",
    status: "occupied",
    patientName: "K. Venkatesh (Age 46)",
    patientId: "ORT-98188",
    admittedDate: "2026-08-16",
    attendingDoctor: "Dr. Arun Sharma, MS (Ortho, Spine)",
    rehabSupport: "L4-L5 MIS-TLIF Spine Fusion Protocol",
    notes: "Neuro checks normal. Lower limb power 5/5 bilateral. Log-roll mobilization active."
  },
  {
    id: "bed-hdu-202",
    wardId: "spine-hdu",
    wardName: "Spine Surgery High Dependency Unit (HDU)",
    bedNumber: "HDU-202",
    status: "available",
    patientName: "",
    patientId: "",
    admittedDate: "",
    attendingDoctor: "",
    rehabSupport: "Spine Alignment Pressure-Relief Mattress",
    notes: "Sanitized & available."
  },
  {
    id: "bed-trauma-301",
    wardId: "trauma-ward",
    wardName: "Orthopedic Trauma & Polytrauma Ward",
    bedNumber: "TRM-301",
    status: "occupied",
    patientName: "A. Praveen Kumar (Age 29)",
    patientId: "ORT-98201",
    admittedDate: "2026-08-15",
    attendingDoctor: "Dr. K. Senthil Nathan, MS (Ortho)",
    rehabSupport: "Distal Femur Fracture MIPPO Plating + Knee Brace",
    notes: "Distal neurovascular status intact. Quad isometric drills initiated."
  },
  {
    id: "bed-trauma-302",
    wardId: "trauma-ward",
    wardName: "Orthopedic Trauma & Polytrauma Ward",
    bedNumber: "TRM-302",
    status: "occupied",
    patientName: "V. Thangavel (Age 52)",
    patientId: "ORT-98194",
    admittedDate: "2026-08-14",
    attendingDoctor: "Dr. K. Senthil Nathan, MS (Ortho)",
    rehabSupport: "Tibia Non-Union with Ilizarov Circular Ring Fixator",
    notes: "Distraction osteogenesis day 3 (0.25mm x 4 daily). Pin-tract care completed."
  },
  {
    id: "bed-suite-401",
    wardId: "deluxe-ortho-suites",
    wardName: "Deluxe Private Orthopedic Suites",
    bedNumber: "STE-401",
    status: "occupied",
    patientName: "Mrs. Jennifer Anand (Age 61)",
    patientId: "ORT-98170",
    admittedDate: "2026-08-16",
    attendingDoctor: "Dr. Rajeshwar V. Natarajan, MS (Ortho)",
    rehabSupport: "Mako Robotic Right Knee Replacement Post-Op Day 2",
    notes: "Stair climbing training with physiotherapist completed. Discharge scheduled tomorrow."
  },
  {
    id: "bed-suite-402",
    wardId: "deluxe-ortho-suites",
    wardName: "Deluxe Private Orthopedic Suites",
    bedNumber: "STE-402",
    status: "available",
    patientName: "",
    patientId: "",
    admittedDate: "",
    attendingDoctor: "",
    rehabSupport: "Executive Orthopedic Low-Height Bed",
    notes: "Available for elective admission."
  }
];
