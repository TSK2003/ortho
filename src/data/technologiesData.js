export const technologiesList = [
  {
    id: "mako-robotic-arm",
    slug: "mako-robotic-arm",
    name: "Stryker Mako 4th Gen Robotic-Arm System",
    category: "Robotic Surgical Suite",
    icon: "Cpu",
    badge: "Gold Standard in Joint Replacement",
    heroImage: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=85",
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
    heroImage: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=85",
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
    heroImage: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=85",
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
    heroImage: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=1200&q=85",
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
      { label: "Modalities", value: "tcMEP, SSEP, Free-run EMG, Triggered EMG, D-Wave" },
      { label: "Response Latency", value: "< 1 millisecond real-time detection" },
      { label: "Safety Standard", value: "International Society of Intraoperative Neurophysiology" }
    ],
    procedureHighlights: [
      "Electrode placement prior to incision under total intravenous anesthesia (TIVA)",
      "Continuous baseline comparison during spinal instrumentation and rod rotation",
      "Instant audio-visual warning to the lead spine surgeon"
    ]
  },
  {
    id: "hologic-dexa-densitometer",
    slug: "hologic-dexa-densitometer",
    name: "Hologic Horizon Dual-Energy X-Ray Absorptiometry (DEXA)",
    category: "Bone Mineral Densitometry",
    icon: "Layers",
    badge: "Gold Standard BMD Testing",
    heroImage: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=85",
    shortDesc: "Ultra-fast, low-dose DEXA bone densitometer with Vertebral Fracture Assessment (VFA) and FRAX 10-year fracture risk score.",
    description: "The Hologic Horizon DEXA system is the world’s gold standard for diagnosing osteopenia, osteoporosis, and bone fragility. In a single 10-minute scan with negligible radiation, it evaluates bone mineral density across the lumbar spine, dual hips, and forearm, computing the FRAX 10-year fracture risk score.",
    keyBenefits: [
      "Detects early microscopic bone loss years before an osteoporotic fracture occurs",
      "Single-energy Vertebral Fracture Assessment (VFA) scans entire spine in 15 seconds",
      "Atypical Femur Fracture (AFF) assessment for long-term bisphosphonate patients",
      "Insignificant radiation dose (less than a one-way domestic flight)"
    ],
    technicalSpecs: [
      { label: "Scan Time", value: "10 seconds per region (Spine / Hip)" },
      { label: "Radiation Dose", value: "< 5 microsieverts (extremely low)" },
      { label: "Bone Calibration", value: "Internal Ceramic Calibration Phantom" },
      { label: "Features", value: "DEXA BMD, VFA, FRAX Score, Body Composition" }
    ],
    procedureHighlights: [
      "Comfortable open-table scan without injections or claustrophobia",
      "Immediate color-coded T-score and Z-score diagnostic report",
      "Follow-up rate-of-change comparison tracking bone growth under therapy"
    ]
  },
  {
    id: "class-100-laminar-ot",
    slug: "class-100-laminar-ot",
    name: "Class 100 Laminar Airflow Operation Theatres",
    category: "Zero-Infection Surgical Environment",
    icon: "ShieldCheck",
    badge: "Ultra-Clean Surgical Suite",
    heroImage: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=85",
    shortDesc: "HEPA-filtered vertical laminar airflow operating theatres maintaining < 0.1% surgical site infection rate for joint implants.",
    description: "Orthopedic joint replacements and spinal implants require pristine sterility. Our modular operating theatres utilize Class 100 vertical laminar airflow with medical-grade HEPA filters, positive pressure airlocks, seamless anti-microbial cladding, and ultraviolet germicidal terminal disinfection.",
    keyBenefits: [
      "Near-zero (< 0.1%) surgical site infection rate exceeding global CDC standards",
      "Constant downward unidirectional air velocity preventing airborne dust entry",
      "Hermetically sealed motorized doors and automated touchless surgical scrub bays",
      "Continuous digital monitoring of temperature, relative humidity, and positive pressure"
    ],
    technicalSpecs: [
      { label: "Air Cleanliness", value: "Class 100 / ISO Class 5 (< 100 particles/ft³)" },
      { label: "Air Changes", value: "> 35 air changes per hour (100% fresh filtered air)" },
      { label: "Filter Efficiency", value: "99.997% at 0.3 micron HEPA filtration" },
      { label: "Flooring & Walls", value: "Seamless anti-static conductive epoxy & antimicrobial glass" }
    ],
    procedureHighlights: [
      "3-stage sterile personnel entry airlock with space suits for joint surgery",
      "Ceiling-mounted surgical pendants eliminating all floor cables",
      "Dedicated sterile corridor direct to central sterilization unit (CSSD)"
    ]
  }
];
