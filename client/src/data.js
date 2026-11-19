import { portfolioAssets } from "./portfolioAssets.js";

export const profile = {
  name: "Dhilip Kumar P.",
  initials: "DK",
  role: "Electrical and Electronics Engineering",
  intro:
    "I am an Electrical and Electronics Engineering student passionate about building intelligent engineering solutions through electronics, embedded systems, automation, and emerging technologies. I enjoy transforming real-world problems into practical technological solutions by combining hardware, software, and engineering fundamentals.",
  college: "Sri Krishna College of Technology (SKCT)",
  degree: "B.E. Electrical and Electronics Engineering",
  educationPeriod: "Expected graduation: 2027",
  cgpa: "8.02 / 10",
  portraitUrl: "/images/profile/dhilip-profile.jpg",
  resumeUrl: portfolioAssets.resume,
  email: "dhilip2005p@gmail.com",
  phone: "+91-8248299376",
  location: "Coimbatore, Tamil Nadu",
  repositoryUrl: "https://github.com/Dhilip2005/dhilip-portfolio",
  socials: {
    GitHub: "https://github.com/Dhilip2005",
    LinkedIn: "https://www.linkedin.com/in/dhilip-kumar-111517286/",
    LeetCode: "https://leetcode.com/u/dhilip0203/",
    Instagram: "",
    HackerRank: "",
    CodeChef: ""
  }
};

export const navItems = [
  ["Home", "/"],
  ["About", "/about"],
  ["Skills", "/skills"],
  ["Projects", "/projects"],
  ["Experience", "/experience"],
  ["Coding", "/coding"],
  ["Achievements", "/achievements"],
  ["Contact", "/contact"]
];

export const projects = [
  {
    slug: "voltguard", name: "VoltGuard", title: "Smart LT Distribution Fault Detection System", category: "IoT", number: "01",
    repositoryUrl: "https://github.com/Dhilip2005/VoltGuard",
    duration: "August 2025 – September 2025",
    description: "A low-cost concept designed to detect broken low-voltage overhead conductors and improve electrical distribution safety.",
    problem: "Broken low-voltage overhead conductors can create hazardous conditions while remaining difficult to identify quickly across a distribution network.",
    solution: "Use CT/VT sensing and an ESP32 monitoring node for fault indication, with LoRa communication and solar backup. A location-reporting and MQTT dashboard remain planned components.",
    architecture: "CT / VT sensors → ESP32 monitoring node → LoRa → fault alerts / location reporting → planned MQTT dashboard",
    tech: ["ESP32", "CT / VT sensors", "LoRa", "Solar backup", "MQTT — planned", "IoT dashboard — planned"],
    status: "Concept / prototype direction", visual: "volt",
    sections: ["Problem Statement", "Proposed Solution", "System Architecture", "Hardware Components", "Communication Architecture", "My Contribution", "Future Development"]
  },
  {
    slug: "leafiq", name: "LeafIQ", title: "Plant Health Monitoring Using ESP32-CAM", category: "Embedded Systems", number: "02",
    duration: "September 2025 – October 2025",
    description: "A low-cost plant-monitoring prototype using ESP32-CAM images for crop-health assessment.",
    problem: "Visual plant inspection can be repetitive and difficult to monitor consistently over time.",
    solution: "Acquire plant imagery with ESP32-CAM, process RGB values and Excess Green, isolate a region of interest, normalize ExG, and apply a rule-based classification.",
    architecture: "ESP32-CAM capture → RGB processing → ExG / normalized ExG → region of interest → rule-based classification",
    tech: ["ESP32-CAM", "RGB analysis", "Excess Green (ExG)", "Region-of-interest processing", "Rule-based classification", "Embedded systems"],
    status: "Low-cost prototype", visual: "leaf",
    sections: ["Problem Statement", "Image Acquisition", "RGB Processing", "ExG Calculation", "Region-of-Interest Processing", "Classification", "My Contribution"]
  },
  {
    slug: "beltguard", name: "BELTGUARD", title: "Intelligent Conveyor Belt Fault Detection, Monitoring and Protection System", category: "AI / Computer Vision", number: "03",
    duration: "Smart India Hackathon 2026 concept",
    description: "An AI-powered intelligent conveyor-belt monitoring and protection concept for detecting and responding to damage in mining industries.",
    problemId: "SIH26008", team: "TEAM INNOV8",
    problem: "Conventional conveyor belt inspections are often manual and periodic, which can delay identification of cracks, tears, joint/splice damage, edge damage, or deterioration.",
    solution: "Combine YOLO-based edge AI, camera monitoring, vibration, tension/load, temperature, and current sensor nodes with gateway intelligence, fault classification, and an automated isolation concept.",
    architecture: "Camera → YOLO edge AI → damage detection / localization → sensor nodes + gateway intelligence → fault classification → protection control → SCADA / web dashboard / alerts",
    tech: ["YOLO edge AI", "Computer vision", "Vibration sensing", "Tension / load", "Temperature", "Current sensing", "ML gateway", "MCCB isolation — concept"],
    status: "Proposed SIH 2026 concept", visual: "belt",
    sections: ["Mining Industry Problem", "Existing Inspection Limitations", "BELTGUARD Architecture", "AI Vision Module", "Sensor Monitoring Module", "Edge Intelligence", "Protection and Isolation", "Dashboard and Alerts", "Expected Impact", "My Contribution and Team Details"]
  },
  {
    slug: "wireman-safety", name: "Smart Safety Device", title: "Smart Safety Device for Electrical Wireman", category: "Industrial Safety", number: "04",
    duration: "Project Work Phase I", department: "Electrical and Electronics Engineering", batch: "14", supervisor: "Dr. K. Muthukumaran", teamMembers: ["Libika T M", "Dhilip Kumar P", "Boopathiraja T", "Arulmani P"],
    description: "A smart worker-safety monitoring concept to identify dangerous conditions, monitor movement, provide local warnings, and support emergency alerts with location information.",
    problem: "Basic electrical safety tools do not independently provide integrated real-time condition monitoring, movement and fall detection, or emergency alert support with location.",
    solution: "Use an ESP32 with voltage, current, gas, temperature, MPU6050, GPS, and GSM inputs to classify conditions, provide buzzer/LED warnings, and support future emergency alerting. The Proteus presentation reports successful simulation monitoring of voltage, current, gas, temperature, safe/unsafe states, LCD readings, and buzzer/LED warnings; GPS, GSM, and fall detection remain proposed unless separately verified.",
    architecture: "Sensor inputs → ESP32 → safe / unsafe classification → buzzer / LED; MPU6050 movement / fall concept; GPS location; GSM emergency alert concept",
    tech: ["ESP32", "Voltage / current sensing", "Gas / temperature sensing", "MPU6050", "GPS", "GSM", "LCD", "Buzzer / LED"],
    status: "Proteus simulation verified", visual: "tilt",
    sections: ["Problem Statement", "Project Objectives", "Existing Safety Methods", "Proposed System", "Sensor Architecture", "Proteus Simulation", "Verified Simulation Results", "Expected Benefits", "Future Development"]
  }
];

export const skillGroups = [
  { title: "Programming", icon: "code", description: "Foundational languages for firmware, scripting, and web development.", skills: ["C", "Java", "Python", "JavaScript"] },
  { title: "Embedded systems", icon: "cpu", description: "Microcontroller fundamentals, communication, and connected devices.", skills: ["ESP32", "Arduino", "Microcontrollers", "UART", "I²C", "SPI", "LoRa", "MQTT", "Sensor interfacing", "Embedded communication"] },
  { title: "Electrical & electronics", icon: "zap", description: "Core engineering concepts and electrical system fundamentals.", skills: ["Circuit analysis", "Electrical machines", "Power systems", "Electrical measurements", "Basic electronics", "Industrial electrical systems"] },
  { title: "Development tools", icon: "terminal", description: "Tools used to prototype, document, and collaborate on engineering work.", skills: ["VS Code", "Git", "GitHub", "Proteus", "LabVIEW", "Arduino IDE"] },
  { title: "Web development", icon: "globe", description: "Building interfaces and full-stack applications as a complementary skill set.", skills: ["HTML", "CSS", "JavaScript", "React", "Node.js", "Express.js", "MongoDB"] }
];

export const experiences = [
  {
    company: "Wind Kraft Energy Services",
    location: "Coimbatore",
    role: "Junior Engineer Intern",
    date: "May 2025 – June 2025",
    points: ["Learned wind-energy conversion, turbine operation, and electricity generation.", "Gained exposure to turbine-performance monitoring and SCADA-based monitoring concepts."]
  },
  {
    company: "Salzer Electronics Limited",
    location: "Coimbatore",
    role: "Junior Engineer Intern",
    date: "May 2025",
    points: ["Observed transformer manufacturing, wire production, and switch assembly processes.", "Assisted with electrical-component testing and inspection against technical specifications."]
  },
  {
    company: "TANTRANSCO",
    location: "Coimbatore",
    role: "Industrial Trainee",
    date: "May 2026",
    points: ["Studied circuit breakers, power transformers, CTs, PTs, protective relays, and lightning arresters.", "Learned feeder operation, isolation procedures, protection systems, and electrical safety.", "Gained exposure to SCADA and Substation Automation Systems."]
  }
];

export const codingProfiles = [
  { name: "GitHub", icon: "github", description: "Code, experiments, and project repositories.", urlKey: "GitHub" },
  { name: "LeetCode", icon: "leetcode", description: "Problem-solving practice and algorithm challenges.", urlKey: "LeetCode" },
  { name: "HackerRank", icon: "terminal", description: "Programming practice, badges, and verified certifications.", urlKey: "HackerRank" },
  { name: "CodeChef", icon: "code", description: "Competitive programming practice and contests.", urlKey: "CodeChef" }
];

export const achievements = [
  { title: "EKNA-2023 Quiz Competition", label: "Winner", year: "2023", note: "Winner of the EKNA-2023 Quiz Competition.", category: "Competitions", image: "/images/achievements/ekna-event.png", imageAlt: "EKNA quiz event photograph featuring Dhilip Kumar P." },
  { title: "Nobel World Records / SIH", label: "Participant", year: "2024, 2025", note: "Participant in Nobel World Records / Smart India Hackathon participation records.", category: "Competitions" },
  { title: "Karate", label: "Black Belt", year: "Verified achievement", note: "Karate Black Belt achievement.", category: "Sports & Other Achievements", image: "/images/certificates/nobel-world-record-karate.png", imageAlt: "Nobel World Records certificate for Dhilip Kumar P.'s karate blocking technique demonstration." },
  { title: "Anna University Chess Tournament", label: "Valuable Player Award", year: "2025", note: "Received the Valuable Player Award at the Anna University Chess Tournament.", category: "Sports & Other Achievements", image: "/images/achievements/sahasvat-2025-award.png", imageAlt: "Sahasvat 2025 award and medal photograph." },
  { title: "SKCT 40th Annual Day", label: "Technical participation", year: "2025", note: "Featured in Sri Krishna College of Technology's 40th Annual Day programme.", category: "Technical Events", image: "/images/achievements/40th-annual-day.png", imageAlt: "Dhilip Kumar P. receiving recognition during SKCT's 40th Annual Day." },
  { title: "Vision-Guided Precision Pesticide Spraying System", label: "Certificate of presentation", year: "2026", note: "Presented at the 18th International Conference on Science & Innovative Engineering, held 11–12 October 2026 in Chennai.", category: "Technical Events", image: "/images/conference-certificate.png", imageAlt: "Certificate of Presentation for Dhilip Kumar P.'s paper at the 18th International Conference on Science & Innovative Engineering 2026." }
];
