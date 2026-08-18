export const technologiesList = [
  {
    id: "mako-robotic-arm",
    slug: "mako-robotic-arm",
    name: "Stryker Mako 4th Gen Robotic-Arm System",
    category: "Robotic Surgical Suite",
    icon: "Cpu",
    badge: "Gold Standard in Joint Replacement",
    heroImage: "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=1200&q=85",
    shortDesc: "Sub-millimeter 3D CT-guided robotic joint replacement system for total knee, partial knee, and hip arthroplasty.",
    description: "The Mako Robotic-Arm surgical system transforms joint replacement by combining patient-specific 3D CT bone mapping with real-time stereotactic haptic feedback. It ensures implant positioning accurate to within 0.5 millimeters and 0.5 degrees, minimizing healthy bone loss and soft tissue trauma.",
    keyBenefits: [
      "Sub-millimeter accuracy for optimal implant longevity (25-30+ years)",
      "Dynamic real-time ligament tension balancing throughout the full range of motion",
      "Stereotactic haptic boundaries protect vital blood vessels and popliteal nerves",
      "Muscle-sparing access with significantly less post-operative swelling and pain"
    ],
    technicalSpecs: [
      { label: "Positional Accuracy", value: "± 0.5 mm / ± 0.5°" },
      { label: "Imaging Modality", value: "Pre-Op 3D CT Reconstruction" },
      { label: "Surgeries Supported", value: "Total Knee, Partial Knee, Total Hip" },
      { label: "Haptic Boundary Speed", value: "Real-time 100 Hz refresh rate" }
    ],
    procedureHighlights: [
      "Pre-operative virtual surgery on patient’s exact 3D bone anatomy",
      "Intraoperative fine-tuning of component sizing and joint balance",
      "Autonomous boundary confinement preventing over-resection of bone"
    ]
  },
  {
    id: "3d-o-arm-navigation",
    slug: "3d-o-arm-navigation",
    name: "Medtronic 3D O-Arm & StealthStation Spine Navigation",
    category: "Intraoperative Spine Imaging",
    icon: "Zap",
    badge: "Sub-Millimeter Spinal Accuracy",
    heroImage: "https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=1200&q=85",
    shortDesc: "Real-time 3D volumetric intraoperative CT imaging coupled with optical navigation for high-precision spinal screw placement.",
    description: "The O-Arm surgical imaging system delivers multi-dimensional 3D CT images of the patient’s spine directly inside the operating room. Integrated with StealthStation optical tracking, surgeons place pedicle screws and decompression instruments with 99.8% precision, even in severe scoliosis or cervical deformities.",
    keyBenefits: [
      "Real-time 3D confirmation of implant placement before leaving the operating room",
      "Eliminates revision surgeries caused by malpositioned spinal hardware",
      "Reduces radiation exposure to both surgical team and patient by up to 70%",
      "Enables percutaneous minimally invasive spine fixation through tiny stab incisions"
    ],
    technicalSpecs: [
      { label: "Imaging Mode", value: "High-Res 3D Cone-Beam CT & 2D Fluoroscopy" },
      { label: "Gantry Aperture", value: "Large 96 cm bore for all patient body types" },
      { label: "Navigation Tracking", value: "Active & Passive Infrared Optical Localization" },
      { label: "Reconstruction Time", value: "Under 13 seconds for full 3D volume" }
    ],
    procedureHighlights: [
      "Seamless intraoperative scan with robotic gantry closure",
      "Automated image registration with zero manual calibration required",
      "Live tracking of surgical drills, taps, and screwdrivers on high-res 4K screens"
    ]
  },
  {
    id: "4k-arthroscopy-system",
    slug: "4k-arthroscopy-system",
    name: "Karl Storz & Smith+Nephew 4K Ultra-HD Arthroscopy Tower",
    category: "Keyhole Joint Surgery",
    icon: "ShieldCheck",
    badge: "Keyhole Visualization",
    heroImage: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=85",
    shortDesc: "Ultra-high-definition 4K optical camera and radiofrequency plasma ablation system for ACL, meniscus, and shoulder labral repairs.",
    description: "Our arthroscopy surgical suites are equipped with state-of-the-art 4K Ultra-HD video towers and high-frequency Coblation plasma wands. Providing 4 times the resolution of standard HD, surgeons can inspect microscopic cartilage fraying, repair torn meniscus with all-inside collagen sutures, and re-anchor shoulder labrums through tiny 4mm incisions.",
    keyBenefits: [
      "Exceptional optical clarity displaying micro-vascularity of joint tissue",
      "Coblation plasma technology enables cold tissue ablation with zero thermal bone damage",
      "Automated pressure-controlled fluid inflow/outflow preventing joint extravasation",
      "Day-care keyhole procedures with discharge within 12 to 24 hours"
    ],
    technicalSpecs: [
      { label: "Camera Resolution", value: "4K UHD (3840 x 2160 pixels)" },
      { label: "Light Source", value: "300W High-CRI LED Cold Illumination" },
      { label: "Ablation Frequency", value: "100 kHz Controlled Plasma Dissociation" },
      { label: "Arthroscope Diameter", value: "4.0 mm 30° / 70° wide-angle optics" }
    ],
    procedureHighlights: [
      "Keyhole insertion via two 4mm puncture portals",
      "All-inside suture pass and tensioning with Knotless suture anchors",
      "Instant video capture for post-operative patient counseling"
    ]
  },
  {
    id: "intraoperative-neuromonitoring",
    slug: "intraoperative-neuromonitoring",
    name: "Cadwell 32-Channel Intraoperative Neuro-Monitoring (IONM)",
    category: "Spine Neurological Safety",
    icon: "Activity",
    badge: "Zero Nerve Injury Standard",
    heroImage: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=85",
    shortDesc: "Continuous live tracking of spinal cord motor and sensory pathways (MEP, SSEP, EMG) throughout complex spine surgeries.",
    description: "Intraoperative Neuro-Monitoring (IONM) acts as an infallible safety net during delicate spinal decompression, scoliosis correction, and spinal tumor surgeries. By constantly firing and measuring electrical impulses across the spinal cord and peripheral nerves, it instantly alerts the surgeon to any nerve tension before irreversible injury can occur.",
    keyBenefits: [
      "Continuous real-time safeguarding of spinal cord, motor, and sensory nerves",
      "Permits aggressive, safe correction of severe spinal curves and deformities",
      "Dramatically reduces post-operative neurological deficits to near-zero levels",
      "Monitored live by dedicated neurophysiologists in the operating theatre"
    ],
    technicalSpecs: [
      { label: "Monitoring Channels", value: "32 Isolated Electrophysiology Channels" },
      { label: "Modalities Supported", value: "TcMEP, SSEP, Free-Run EMG, Triggered EMG, EEG" },
      { label: "Threshold Warning", value: "Real-time acoustic and visual alert system" },
      { label: "Safety Standard", value: "International Society of Intraoperative Neurophysiology" }
    ],
    procedureHighlights: [
      "Pre-incision baseline evoked potential calibration",
      "Continuous stimulation during pedicle screw insertion and spine distraction",
      "Instant feedback to lead spine surgeon confirming 100% nerve integrity"
    ]
  },
  {
    id: "hologic-dexa-scanner",
    slug: "hologic-dexa-scanner",
    name: "Hologic Horizon Dual-Energy DEXA Bone Densitometer",
    category: "Bone Mineral Diagnostics",
    icon: "ShieldCheck",
    badge: "Gold Standard Osteoporosis DX",
    heroImage: "https://images.unsplash.com/photo-1576091160291-248b1df53937?auto=format&fit=crop&w=1200&q=85",
    shortDesc: "Clinical gold-standard dual-energy bone density scanner for spine, hip, and forearm fracture risk assessment.",
    description: "The Hologic Horizon DEXA system provides ultra-low radiation, sub-millimeter accurate bone mineral density (BMD) analysis and vertebral fracture assessments. It calculates exact T-scores and Z-scores, predicting 10-year fracture probabilities (FRAX) and guiding targeted anti-osteoporotic drug therapy.",
    keyBenefits: [
      "Detects early osteopenia before catastrophic hip or spine fractures occur",
      "High-definition Instant Vertebral Assessment (IVA) in under 15 seconds",
      "Ultra-low radiation exposure (less than a cross-country flight)",
      "Monitors exact percentage response to bone-building therapies"
    ],
    technicalSpecs: [
      { label: "Scan Time", value: "10 to 15 seconds per anatomical site" },
      { label: "Radiation Dose", value: "< 1.5 µSv per scan" },
      { label: "Analysis Tools", value: "FRAX® Risk Engine + Advanced Body Composition" },
      { label: "Calibration", value: "Daily automated internal tissue phantom" }
    ],
    procedureHighlights: [
      "Comfortable open-table scan with no tunnel confinement",
      "Immediate automated reporting with color-coded fracture risk scores",
      "Integration into patient digital health record"
    ]
  },
  {
    id: "laminar-airflow-ot",
    slug: "laminar-airflow-ot",
    name: "Class-100 (ISO 5) Vertical Laminar Flow Operating Theatres",
    category: "Sterility & Infection Control",
    icon: "ShieldCheck",
    badge: "< 0.1% Joint Infection Rate",
    heroImage: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=85",
    shortDesc: "Ultra-clean surgical environment with 99.997% HEPA filtration, positive pressure airlocks, and space-suit surgical enclosures.",
    description: "Our dedicated orthopedic joint replacement and spine operating suites feature Class-100 vertical laminar airflow, ensuring that clean, HEPA-filtered air sweeps continuously over the surgical wound at 25 air changes per hour. Combined with double-door airlocks and surgical helmet space suits, we maintain a near-zero infection rate.",
    keyBenefits: [
      "Exceeds international NABH and CDC joint surgery sterility guidelines",
      "Eliminates airborne microbial contamination around prosthetic implants",
      "Positive pressure gradient prevents dust ingress from hospital corridors",
      "Continuous temperature and humidity regulation optimized for bone cement setting"
    ],
    technicalSpecs: [
      { label: "Air Cleanliness", value: "Class 100 / ISO Class 5 (< 3,520 particles/m³)" },
      { label: "Filtration", value: "0.3-Micron Ultra-Efficient HEPA Filters (99.997%)" },
      { label: "Air Velocity", value: "0.38 m/s vertical laminar downward flow" },
      { label: "Surgeon Protection", value: "Stryker Flyte Personal Space Suit Enclosures" }
    ],
    procedureHighlights: [
      "Terminal UV-C robotic disinfection between all surgical procedures",
      "RFID tracking and biological spore testing for 100% of instrument trays",
      "Positive pressure airlock monitoring with real-time digital readouts"
    ]
  }
];
