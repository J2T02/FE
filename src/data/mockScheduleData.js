// Mock data for Schedule Management

// Patient avatars mapping
export const patientAvatars = {
  emily: "/anhcuong.jpg",
  sarah: "/anhhuynh.png",
  jessica: "/maihadoctor.jpg",
  michael: "/doctorhuy.jpg",
  david: "/hanguyen.jpg",
  sophia: "/femaledoctor.jpg",
  anna: "/anhket.jpg",
  robert: "/anhthinh.jpg",
  maria: "/quocanh.jpg",
  james: "/anhnhan.jpg",
  rachel: "/femaledoctor.jpg",
  kevin: "/doctorhuy.jpg",
  amanda: "/maihadoctor.jpg",
  daniel: "/anhcuong.jpg",
  jennifer: "/anhhuynh.png",
  carlos: "/anhthinh.jpg",
  helen: "/hanguyen.jpg",
  thomas: "/anhket.jpg",
  nicole: "/femaledoctor.jpg",
  mark: "/doctorhuy.jpg",
  stephanie: "/maihadoctor.jpg",
  patricia: "/quocanh.jpg",
  ryan: "/anhnhan.jpg",
  laura: "/hanguyen.jpg"
};

// Appointment types for fertility clinic
export const appointmentTypes = {
  INITIAL_CONSULTATION: "Initial Fertility Consultation",
  IVF_MONITORING: "IVF Cycle Monitoring",
  SEMEN_ANALYSIS: "Semen Analysis Review",
  MALE_INFERTILITY: "Male Infertility Consultation",
  COUPLE_COUNSELING: "Couple Counseling Session",
  OVULATION_INDUCTION: "Ovulation Induction Check",
  EGG_RETRIEVAL: "Egg Retrieval Consultation",
  FERTILITY_PRESERVATION: "Fertility Preservation",
  PCOS_TREATMENT: "PCOS Treatment Follow-up",
  IUI_PROCEDURE: "IUI Procedure",
  ENDOMETRIOSIS: "Endometriosis Consultation",
  VARICOCELE: "Varicocele Assessment",
  HORMONE_THERAPY: "Hormone Therapy Review",
  GENETIC_COUNSELING: "Genetic Counseling",
  EMBRYO_TRANSFER: "Embryo Transfer Prep",
  SPERM_DNA: "Sperm DNA Fragmentation",
  RECURRENT_MISCARRIAGE: "Recurrent Miscarriage",
  AZOOSPERMIA: "Azoospermia Consultation",
  EGG_FREEZING: "Egg Freezing Consultation",
  VASECTOMY_REVERSAL: "Post-Vasectomy Reversal",
  OVARIAN_RESERVE: "Ovarian Reserve Testing",
  MENOPAUSE: "Menopause Consultation",
  FERTILITY_ASSESSMENT: "Fertility Assessment",
  IVF_SUCCESS: "IVF Success Follow-up"
};

// Appointment statuses
export const appointmentStatuses = {
  CONFIRMED: "confirmed",
  PENDING: "pending",
  CANCELLED: "cancelled",
  COMPLETED: "completed",
  NO_SHOW: "no_show"
};

// Extended mock appointments data with more variety
export const mockAppointments = {
  "2024-11-18": [
    {
      id: 1,
      time: "08:30",
      patient: "Emily Clark",
      type: appointmentTypes.INITIAL_CONSULTATION,
      status: appointmentStatuses.CONFIRMED,
      avatar: patientAvatars.emily,
      duration: "45 min",
      notes: "First consultation, review medical history and discuss treatment options",
      priority: "high",
      room: "Room 101"
    },
    {
      id: 2,
      time: "09:15",
      patient: "Sarah Johnson",
      type: appointmentTypes.IVF_MONITORING,
      status: appointmentStatuses.CONFIRMED,
      avatar: patientAvatars.sarah,
      duration: "30 min",
      notes: "Day 8 monitoring, ultrasound and blood work required",
      priority: "medium",
      room: "Room 102"
    },
    {
      id: 3,
      time: "10:00",
      patient: "Jessica Lee",
      type: appointmentTypes.SEMEN_ANALYSIS,
      status: appointmentStatuses.PENDING,
      avatar: patientAvatars.jessica,
      duration: "20 min",
      notes: "Discuss results and treatment options",
      priority: "medium",
      room: "Room 103"
    },
    {
      id: 4,
      time: "12:30",
      patient: "Michael Brown",
      type: appointmentTypes.MALE_INFERTILITY,
      status: appointmentStatuses.CONFIRMED,
      avatar: patientAvatars.michael,
      duration: "40 min",
      notes: "Follow-up consultation, discuss treatment plan",
      priority: "high",
      room: "Room 101"
    },
    {
      id: 5,
      time: "14:15",
      patient: "David & Olivia Green",
      type: appointmentTypes.COUPLE_COUNSELING,
      status: appointmentStatuses.CONFIRMED,
      avatar: patientAvatars.david,
      duration: "60 min",
      notes: "Pre-IVF counseling session",
      priority: "medium",
      room: "Counseling Room"
    },
    {
      id: 6,
      time: "15:00",
      patient: "Sophia Rodriguez",
      type: appointmentTypes.OVULATION_INDUCTION,
      status: appointmentStatuses.CANCELLED,
      avatar: patientAvatars.sophia,
      duration: "25 min",
      notes: "Patient requested reschedule due to illness",
      priority: "low",
      room: "Room 102"
    }
  ],
  "2024-11-19": [
    {
      id: 7,
      time: "08:00",
      patient: "Anna Thompson",
      type: appointmentTypes.EGG_RETRIEVAL,
      status: appointmentStatuses.CONFIRMED,
      avatar: patientAvatars.anna,
      duration: "30 min",
      notes: "Pre-procedure consultation and consent",
      priority: "high",
      room: "Procedure Room"
    },
    {
      id: 8,
      time: "09:30",
      patient: "Robert Wilson",
      type: appointmentTypes.FERTILITY_PRESERVATION,
      status: appointmentStatuses.CONFIRMED,
      avatar: patientAvatars.robert,
      duration: "45 min",
      notes: "Cancer patient, urgent fertility preservation",
      priority: "urgent",
      room: "Room 101"
    },
    {
      id: 9,
      time: "10:45",
      patient: "Maria Garcia",
      type: appointmentTypes.PCOS_TREATMENT,
      status: appointmentStatuses.PENDING,
      avatar: patientAvatars.maria,
      duration: "35 min",
      notes: "Review medication response and adjust protocol",
      priority: "medium",
      room: "Room 102"
    },
    {
      id: 10,
      time: "11:30",
      patient: "James & Lisa Chen",
      type: appointmentTypes.IUI_PROCEDURE,
      status: appointmentStatuses.CONFIRMED,
      avatar: patientAvatars.james,
      duration: "20 min",
      notes: "Third IUI cycle",
      priority: "high",
      room: "Procedure Room"
    }
  ],
  "2024-11-20": [
    {
      id: 11,
      time: "13:00",
      patient: "Rachel Adams",
      type: appointmentTypes.ENDOMETRIOSIS,
      status: appointmentStatuses.CONFIRMED,
      avatar: patientAvatars.rachel,
      duration: "50 min",
      notes: "Discuss surgical options and treatment plan",
      priority: "high",
      room: "Room 101"
    },
    {
      id: 12,
      time: "14:00",
      patient: "Kevin Martinez",
      type: appointmentTypes.VARICOCELE,
      status: appointmentStatuses.CONFIRMED,
      avatar: patientAvatars.kevin,
      duration: "30 min",
      notes: "Post-surgery follow-up examination",
      priority: "medium",
      room: "Room 102"
    },
    {
      id: 13,
      time: "15:15",
      patient: "Amanda Foster",
      type: appointmentTypes.HORMONE_THERAPY,
      status: appointmentStatuses.PENDING,
      avatar: patientAvatars.amanda,
      duration: "25 min",
      notes: "Adjust hormone protocol based on response",
      priority: "medium",
      room: "Room 103"
    }
  ],
  "2024-11-21": [
    {
      id: 14,
      time: "08:15",
      patient: "Daniel Kim",
      type: appointmentTypes.GENETIC_COUNSELING,
      status: appointmentStatuses.CONFIRMED,
      avatar: patientAvatars.daniel,
      duration: "60 min",
      notes: "PGD consultation for genetic disorder",
      priority: "high",
      room: "Counseling Room"
    },
    {
      id: 15,
      time: "09:30",
      patient: "Jennifer White",
      type: appointmentTypes.EMBRYO_TRANSFER,
      status: appointmentStatuses.CONFIRMED,
      avatar: patientAvatars.jennifer,
      duration: "40 min",
      notes: "Final preparation for frozen embryo transfer",
      priority: "high",
      room: "Procedure Room"
    },
    {
      id: 16,
      time: "10:30",
      patient: "Carlos Rodriguez",
      type: appointmentTypes.SPERM_DNA,
      status: appointmentStatuses.CONFIRMED,
      avatar: patientAvatars.carlos,
      duration: "30 min",
      notes: "Review test results and discuss treatment options",
      priority: "medium",
      room: "Room 101"
    },
    {
      id: 17,
      time: "13:45",
      patient: "Helen Davis",
      type: appointmentTypes.RECURRENT_MISCARRIAGE,
      status: appointmentStatuses.CONFIRMED,
      avatar: patientAvatars.helen,
      duration: "45 min",
      notes: "Comprehensive evaluation and testing plan",
      priority: "high",
      room: "Room 102"
    },
    {
      id: 18,
      time: "14:45",
      patient: "Thomas Anderson",
      type: appointmentTypes.AZOOSPERMIA,
      status: appointmentStatuses.PENDING,
      avatar: patientAvatars.thomas,
      duration: "35 min",
      notes: "Discuss TESE procedure options",
      priority: "medium",
      room: "Room 103"
    }
  ],
  "2024-11-22": [
    {
      id: 19,
      time: "08:45",
      patient: "Nicole Taylor",
      type: appointmentTypes.EGG_FREEZING,
      status: appointmentStatuses.CONFIRMED,
      avatar: patientAvatars.nicole,
      duration: "40 min",
      notes: "Social egg freezing consultation, age 32",
      priority: "medium",
      room: "Room 101"
    },
    {
      id: 20,
      time: "09:45",
      patient: "Mark Johnson",
      type: appointmentTypes.VASECTOMY_REVERSAL,
      status: appointmentStatuses.CONFIRMED,
      avatar: patientAvatars.mark,
      duration: "30 min",
      notes: "6-month post-surgery follow-up",
      priority: "medium",
      room: "Room 102"
    },
    {
      id: 21,
      time: "10:30",
      patient: "Stephanie Lee",
      type: appointmentTypes.OVARIAN_RESERVE,
      status: appointmentStatuses.CANCELLED,
      avatar: patientAvatars.stephanie,
      duration: "25 min",
      notes: "Patient illness, needs reschedule",
      priority: "low",
      room: "Room 103"
    }
  ],
  "2024-11-24": [
    {
      id: 22,
      time: "13:30",
      patient: "Patricia Moore",
      type: appointmentTypes.MENOPAUSE,
      status: appointmentStatuses.CONFIRMED,
      avatar: patientAvatars.patricia,
      duration: "35 min",
      notes: "Hormone replacement therapy consultation",
      priority: "medium",
      room: "Room 101"
    },
    {
      id: 23,
      time: "14:30",
      patient: "Ryan Clark",
      type: appointmentTypes.FERTILITY_ASSESSMENT,
      status: appointmentStatuses.PENDING,
      avatar: patientAvatars.ryan,
      duration: "45 min",
      notes: "Initial male fertility evaluation",
      priority: "medium",
      room: "Room 102"
    },
    {
      id: 24,
      time: "15:30",
      patient: "Laura Williams",
      type: appointmentTypes.IVF_SUCCESS,
      status: appointmentStatuses.CONFIRMED,
      avatar: patientAvatars.laura,
      duration: "20 min",
      notes: "12-week pregnancy check and graduation",
      priority: "high",
      room: "Room 103"
    }
  ],
  "2024-11-30": [
    {
      time: "09:00",
      type: "preparation",
      title: "Saturday Morning Setup",
      description: "Weekend clinic preparation and emergency coverage",
      duration: 30,
      status: "scheduled",
      priority: "medium"
    },
    {
      time: "09:30",
      type: "appointment",
      title: "Emergency Consultation",
      description: "Urgent fertility consultation for weekend",
      duration: 60,
      status: "scheduled",
      priority: "high",
      room: "Room 101"
    },
    {
      time: "10:30",
      type: "procedure",
      title: "Weekend Monitoring",
      description: "Critical cycle monitoring",
      duration: 45,
      status: "scheduled",
      priority: "high",
      room: "Lab"
    }
  ],
  "2024-12-01": [
    {
      time: "10:00",
      type: "preparation",
      title: "Sunday Preparation",
      description: "Limited Sunday service preparation",
      duration: 30,
      status: "scheduled",
      priority: "medium"
    },
    {
      time: "10:30",
      type: "appointment",
      title: "Emergency Follow-up",
      description: "Critical patient follow-up",
      duration: 45,
      status: "scheduled",
      priority: "high",
      room: "Room 101"
    }
  ]
};

// Doctor weekly schedule - Extended for multiple weeks
export const doctorWeeklySchedule = {
  // Week 1: November 18-24, 2024
  "2024-11-18": ["morning", "afternoon"],
  "2024-11-19": ["morning"],
  "2024-11-20": ["afternoon"],
  "2024-11-21": ["morning", "afternoon"],
  "2024-11-22": ["morning"],
  "2024-11-23": [], // Weekend off
  "2024-11-24": ["afternoon"],
  
  // Week 2: November 25 - December 1, 2024
  "2024-11-25": ["morning", "afternoon"],
  "2024-11-26": ["morning"],
  "2024-11-27": ["afternoon"],
  "2024-11-28": [], // Thanksgiving holiday
  "2024-11-29": ["morning"],
  "2024-11-30": [], // Weekend off
  "2024-12-01": ["afternoon"],
  
  // Week 3: December 2-8, 2024
  "2024-12-02": ["morning", "afternoon"],
  "2024-12-03": ["morning", "afternoon"],
  "2024-12-04": ["morning"],
  "2024-12-05": ["afternoon"],
  "2024-12-06": ["morning", "afternoon"],
  "2024-12-07": [], // Weekend off
  "2024-12-08": [],
  
  // Week 4: December 9-15, 2024
  "2024-12-09": ["morning"],
  "2024-12-10": ["afternoon"],
  "2024-12-11": ["morning", "afternoon"],
  "2024-12-12": ["morning"],
  "2024-12-13": ["afternoon"],
  "2024-12-14": [], // Weekend off
  "2024-12-15": [],
  
  // Week 5: December 16-22, 2024
  "2024-12-16": ["morning", "afternoon"],
  "2024-12-17": ["morning"],
  "2024-12-18": ["afternoon"],
  "2024-12-19": ["morning", "afternoon"],
  "2024-12-20": ["morning"],
  "2024-12-21": [], // Weekend off
  "2024-12-22": [],
  
  // Week 6: December 23-29, 2024 (Holiday week)
  "2024-12-23": ["morning"], // Half day before Christmas
  "2024-12-24": [], // Christmas Eve
  "2024-12-25": [], // Christmas Day
  "2024-12-26": [], // Boxing Day
  "2024-12-27": ["afternoon"], // Limited schedule
  "2024-12-28": [], // Weekend off
  "2024-12-29": [],
  
  // Week 7: December 30 - January 5, 2025
  "2024-12-30": ["morning"], // Half day before New Year
  "2024-12-31": [], // New Year's Eve
  "2025-01-01": [], // New Year's Day
  "2025-01-02": ["afternoon"], // Back to work
  "2025-01-03": ["morning", "afternoon"],
  "2025-01-04": [], // Weekend off
  "2025-01-05": []
};

// Doctor shift details with more information
export const doctorShiftDetails = {
  morning: {
    startTime: "08:00",
    endTime: "12:00",
    maxPatients: 8,
    breakTime: "10:00-10:15",
    focusAreas: ["New consultations", "Follow-ups", "Lab reviews"],
    equipment: ["Ultrasound Room 1", "Consultation Room A", "Consultation Room B"]
  },
  afternoon: {
    startTime: "13:00",
    endTime: "17:00",
    maxPatients: 10,
    breakTime: "15:00-15:15",
    focusAreas: ["Procedures", "Complex cases", "Emergency consultations"],
    equipment: ["Procedure Room", "Ultrasound Room 2", "Consultation Room C"]
  },
  evening: {
    startTime: "17:30",
    endTime: "20:00",
    maxPatients: 4,
    breakTime: "18:30-18:45",
    focusAreas: ["Urgent cases", "Working patients", "Emergency procedures"],
    equipment: ["Emergency Room", "Consultation Room A"]
  }
};

// Doctor availability and leave schedule
export const doctorLeaveSchedule = {
  "2024-11-28": { type: "holiday", reason: "Thanksgiving", approved: true },
  "2024-12-24": { type: "holiday", reason: "Christmas Eve", approved: true },
  "2024-12-25": { type: "holiday", reason: "Christmas Day", approved: true },
  "2024-12-31": { type: "holiday", reason: "New Year's Eve", approved: true },
  "2025-01-01": { type: "holiday", reason: "New Year's Day", approved: true },
  "2024-12-02": { type: "conference", reason: "Fertility Medicine Conference", approved: true },
  "2024-12-16": { type: "training", reason: "Advanced IVF Techniques Workshop", approved: true }
};

// Special events and conferences
export const specialEvents = {
  "2024-11-20": {
    type: "meeting",
    title: "Monthly Department Meeting",
    time: "12:00-13:00",
    location: "Conference Room A",
    attendees: ["All medical staff"],
    priority: "high"
  },
  "2024-11-25": {
    type: "training",
    title: "New Equipment Training",
    time: "16:00-17:30",
    location: "Training Room",
    attendees: ["Medical staff", "Technicians"],
    priority: "medium"
  },
  "2024-12-02": {
    type: "conference",
    title: "Fertility Medicine Annual Conference",
    time: "09:00-17:00",
    location: "Convention Center",
    attendees: ["Dr. Smith", "Dr. Johnson"],
    priority: "high"
  },
  "2024-12-10": {
    type: "audit",
    title: "Quality Assurance Audit",
    time: "10:00-15:00",
    location: "Clinic",
    attendees: ["All staff"],
    priority: "high"
  },
  "2024-12-16": {
    type: "workshop",
    title: "Advanced IVF Techniques Workshop",
    time: "08:00-16:00",
    location: "Medical Center",
    attendees: ["Senior medical staff"],
    priority: "medium"
  }
};

// On-call schedule
export const onCallSchedule = {
  "2024-11-18": { doctor: "Dr. Smith", backup: "Dr. Johnson", type: "primary" },
  "2024-11-19": { doctor: "Dr. Johnson", backup: "Dr. Williams", type: "primary" },
  "2024-11-20": { doctor: "Dr. Williams", backup: "Dr. Smith", type: "primary" },
  "2024-11-21": { doctor: "Dr. Smith", backup: "Dr. Johnson", type: "primary" },
  "2024-11-22": { doctor: "Dr. Johnson", backup: "Dr. Williams", type: "primary" },
  "2024-11-23": { doctor: "Dr. Williams", backup: "Dr. Smith", type: "weekend" },
  "2024-11-24": { doctor: "Dr. Smith", backup: "Dr. Johnson", type: "weekend" },
  "2024-11-25": { doctor: "Dr. Johnson", backup: "Dr. Williams", type: "primary" },
  "2024-11-26": { doctor: "Dr. Williams", backup: "Dr. Smith", type: "primary" },
  "2024-11-27": { doctor: "Dr. Smith", backup: "Dr. Johnson", type: "primary" },
  "2024-11-28": { doctor: "Dr. Johnson", backup: "Dr. Williams", type: "holiday" },
  "2024-11-29": { doctor: "Dr. Williams", backup: "Dr. Smith", type: "primary" },
  "2024-11-30": { doctor: "Dr. Smith", backup: "Dr. Johnson", type: "weekend" },
  "2024-12-01": { doctor: "Dr. Johnson", backup: "Dr. Williams", type: "weekend" }
};

// Shift notes data
export const mockShiftNotes = {
  morning: {
    time: "08:00 - 12:00",
    notes: "Morning shift focus: New patient consultations and follow-up appointments. Review lab results from previous day. Prepare for afternoon procedures.",
    tasks: [
      "Review overnight lab results",
      "Prepare consultation materials",
      "Check equipment for procedures",
      "Update patient charts",
      "Coordinate with nursing staff"
    ],
    completedTasks: 3
  },
  afternoon: {
    time: "13:00 - 17:00",
    notes: "Afternoon shift focus: Procedures, treatments, and complex consultations. Complete documentation and prepare next day schedule.",
    tasks: [
      "Complete procedure documentation",
      "Review next day appointments",
      "Update patient treatment plans",
      "Follow up on lab results",
      "Prepare discharge summaries"
    ],
    completedTasks: 2
  }
};

// Important reminders data
export const mockReminders = [
  {
    id: 1,
    priority: "high",
    title: "Follow up with Patient Emily Clark for IVF Cycle results",
    time: "Today, 10:00 AM",
    color: "#ff4d4f",
    completed: false,
    category: "patient_followup"
  },
  {
    id: 2,
    priority: "medium",
    title: "Review new patient intake forms for next week",
    time: "Tomorrow, 2:00 PM",
    color: "#faad14",
    completed: false,
    category: "administrative"
  },
  {
    id: 3,
    priority: "low",
    title: "Prepare presentation for grand rounds on PGD",
    time: "Fri, 09:00 AM",
    color: "#1890ff",
    completed: false,
    category: "education"
  },
  {
    id: 4,
    priority: "medium",
    title: "Order new batch of fertility medications",
    time: "Mon, 03:00 PM",
    color: "#52c41a",
    completed: true,
    category: "inventory"
  },
  {
    id: 5,
    priority: "high",
    title: "Schedule team meeting for protocol updates",
    time: "Wed, 11:00 AM",
    color: "#ff4d4f",
    completed: false,
    category: "meeting"
  },
  {
    id: 6,
    priority: "low",
    title: "Update patient education materials",
    time: "Next week",
    color: "#1890ff",
    completed: false,
    category: "education"
  },
  {
    id: 7,
    priority: "medium",
    title: "Review insurance pre-authorizations",
    time: "Thu, 1:00 PM",
    color: "#faad14",
    completed: false,
    category: "administrative"
  },
  {
    id: 8,
    priority: "high",
    title: "Call patient about urgent lab results",
    time: "Today, 4:00 PM",
    color: "#ff4d4f",
    completed: false,
    category: "urgent"
  }
];

// Statistics data - Enhanced with more detailed metrics
export const mockStatistics = {
  // Daily metrics
  todayAppointments: 6,
  todayCompleted: 4,
  todayPending: 1,
  todayCancelled: 1,
  todayRevenue: 4500,
  
  // Weekly metrics
  weeklyAppointments: 24,
  weeklyCompleted: 20,
  weeklyPending: 2,
  weeklyCancelled: 2,
  weeklyRevenue: 18000,
  
  // Monthly metrics
  monthlyAppointments: 98,
  monthlyCompleted: 85,
  monthlyPending: 8,
  monthlyCancelled: 5,
  monthlyRevenue: 73500,
  
  // Performance metrics
  successRate: 85,
  patientSatisfaction: 4.8,
  averageWaitTime: 12, // minutes
  averageConsultationTime: 35, // minutes
  
  // Treatment success rates
  ivfSuccessRate: 78,
  iuiSuccessRate: 65,
  fertilityPreservationRate: 92,
  
  // Patient demographics
  newPatients: 15,
  returningPatients: 83,
  averagePatientAge: 32,
  
  // Operational metrics
  roomUtilization: 87, // percentage
  equipmentUptime: 98, // percentage
  staffEfficiency: 91, // percentage
  
  // Financial metrics
  insuranceCoverage: 75, // percentage of patients with insurance
  averageReimbursement: 850,
  outstandingPayments: 12500
};

// Weekly performance trends
export const weeklyTrends = {
  appointments: [18, 22, 24, 26, 24, 20, 25], // Last 7 weeks
  revenue: [13500, 16500, 18000, 19500, 18000, 15000, 18750],
  satisfaction: [4.6, 4.7, 4.8, 4.9, 4.8, 4.7, 4.8],
  waitTime: [15, 13, 12, 10, 12, 14, 11]
};

// Monthly comparison data
export const monthlyComparison = {
  currentMonth: {
    appointments: 98,
    revenue: 73500,
    newPatients: 15,
    successRate: 85
  },
  previousMonth: {
    appointments: 92,
    revenue: 69000,
    newPatients: 12,
    successRate: 82
  },
  yearToDate: {
    appointments: 1156,
    revenue: 867000,
    newPatients: 178,
    successRate: 84
  }
};

// Treatment type statistics
export const treatmentStats = {
  "Initial Consultation": { count: 25, percentage: 25.5, avgDuration: 45 },
  "IVF Monitoring": { count: 18, percentage: 18.4, avgDuration: 30 },
  "IUI Procedure": { count: 12, percentage: 12.2, avgDuration: 20 },
  "Genetic Counseling": { count: 8, percentage: 8.2, avgDuration: 60 },
  "Fertility Assessment": { count: 15, percentage: 15.3, avgDuration: 40 },
  "Follow-up": { count: 20, percentage: 20.4, avgDuration: 25 }
};

// Room availability with enhanced details
export const roomAvailability = {
  "Room 101": { 
    available: true, 
    nextAvailable: "16:00",
    currentPatient: null,
    equipment: ["Ultrasound", "Examination table", "Computer"],
    capacity: 3,
    lastCleaned: "14:30",
    status: "ready"
  },
  "Room 102": { 
    available: false, 
    nextAvailable: "15:30",
    currentPatient: "Sarah Johnson",
    equipment: ["Ultrasound", "Examination table", "Monitor"],
    capacity: 3,
    lastCleaned: "13:00",
    status: "occupied"
  },
  "Room 103": { 
    available: true, 
    nextAvailable: "now",
    currentPatient: null,
    equipment: ["Examination table", "Computer", "Printer"],
    capacity: 2,
    lastCleaned: "15:00",
    status: "ready"
  },
  "Procedure Room": { 
    available: false, 
    nextAvailable: "14:00",
    currentPatient: "Jennifer White",
    equipment: ["Surgical table", "Ultrasound", "Monitoring equipment", "Anesthesia"],
    capacity: 5,
    lastCleaned: "12:00",
    status: "in_procedure"
  },
  "Counseling Room": { 
    available: true, 
    nextAvailable: "now",
    currentPatient: null,
    equipment: ["Comfortable seating", "Whiteboard", "Educational materials"],
    capacity: 4,
    lastCleaned: "14:00",
    status: "ready"
  },
  "Laboratory": {
    available: true,
    nextAvailable: "now",
    currentPatient: null,
    equipment: ["Microscopes", "Incubators", "Centrifuge", "Analysis equipment"],
    capacity: 2,
    lastCleaned: "08:00",
    status: "ready"
  }
};

// Patient management data
export const patientProfiles = {
  "emily_clark": {
    id: "P001",
    name: "Emily Clark",
    age: 28,
    phone: "+1-555-0123",
    email: "emily.clark@email.com",
    address: "123 Main St, City, State 12345",
    emergencyContact: "John Clark - +1-555-0124",
    insurance: "Blue Cross Blue Shield",
    primaryDiagnosis: "Unexplained Infertility",
    treatmentPlan: "IVF Cycle",
    lastVisit: "2024-11-15",
    nextAppointment: "2024-11-18",
    notes: "Patient is anxious about first IVF cycle. Provide extra support.",
    allergies: ["Penicillin"],
    medications: ["Folic Acid", "Prenatal Vitamins"]
  },
  "sarah_johnson": {
    id: "P002",
    name: "Sarah Johnson",
    age: 31,
    phone: "+1-555-0125",
    email: "sarah.johnson@email.com",
    address: "456 Oak Ave, City, State 12345",
    emergencyContact: "Mike Johnson - +1-555-0126",
    insurance: "Aetna",
    primaryDiagnosis: "PCOS",
    treatmentPlan: "IVF with ICSI",
    lastVisit: "2024-11-16",
    nextAppointment: "2024-11-19",
    notes: "Responding well to current protocol. Continue monitoring.",
    allergies: [],
    medications: ["Metformin", "Letrozole", "Prenatal Vitamins"]
  }
};

// Treatment history data
export const treatmentHistory = {
  "emily_clark": [
    {
      date: "2024-10-15",
      type: "Initial Consultation",
      doctor: "Dr. Smith",
      notes: "Comprehensive fertility evaluation completed",
      results: "All tests within normal range",
      nextSteps: "Proceed with IVF cycle"
    },
    {
      date: "2024-11-01",
      type: "Pre-cycle Consultation",
      doctor: "Dr. Smith",
      notes: "IVF protocol explained and consent obtained",
      results: "Patient ready to start cycle",
      nextSteps: "Begin stimulation medications"
    },
    {
      date: "2024-11-15",
      type: "Cycle Monitoring",
      doctor: "Dr. Smith",
      notes: "Day 5 of stimulation, good response",
      results: "Multiple follicles developing",
      nextSteps: "Continue monitoring"
    }
  ],
  "sarah_johnson": [
    {
      date: "2024-09-20",
      type: "PCOS Consultation",
      doctor: "Dr. Johnson",
      notes: "PCOS diagnosis confirmed",
      results: "Insulin resistance present",
      nextSteps: "Start Metformin therapy"
    },
    {
      date: "2024-10-18",
      type: "Follow-up",
      doctor: "Dr. Johnson",
      notes: "Good response to Metformin",
      results: "Improved ovulation",
      nextSteps: "Consider IVF if no pregnancy in 3 months"
    },
    {
      date: "2024-11-16",
      type: "IVF Consultation",
      doctor: "Dr. Johnson",
      notes: "IVF cycle planned",
      results: "Patient ready for treatment",
      nextSteps: "Start IVF protocol next cycle"
    }
  ]
};

// Equipment and resource management
export const equipmentStatus = {
  "ultrasound_1": {
    name: "Ultrasound Machine 1",
    location: "Room 101",
    status: "operational",
    lastMaintenance: "2024-11-01",
    nextMaintenance: "2024-12-01",
    utilizationRate: 85,
    currentUser: null
  },
  "ultrasound_2": {
    name: "Ultrasound Machine 2",
    location: "Room 102",
    status: "in_use",
    lastMaintenance: "2024-10-28",
    nextMaintenance: "2024-11-28",
    utilizationRate: 92,
    currentUser: "Dr. Smith"
  },
  "incubator_1": {
    name: "Embryo Incubator 1",
    location: "Laboratory",
    status: "operational",
    lastMaintenance: "2024-11-10",
    nextMaintenance: "2024-12-10",
    utilizationRate: 78,
    currentUser: "Lab Technician"
  },
  "microscope_1": {
    name: "Laboratory Microscope 1",
    location: "Laboratory",
    status: "maintenance_required",
    lastMaintenance: "2024-09-15",
    nextMaintenance: "2024-11-20",
    utilizationRate: 65,
    currentUser: null
  }
};

// Staff schedule and availability
export const staffSchedule = {
  "dr_smith": {
    name: "Dr. Smith",
    role: "Fertility Specialist",
    schedule: {
      "2024-11-18": ["morning", "afternoon"],
      "2024-11-19": ["morning"],
      "2024-11-20": ["afternoon"],
      "2024-11-21": ["morning", "afternoon"],
      "2024-11-22": ["morning"]
    },
    specialties: ["IVF", "ICSI", "Genetic Counseling"],
    currentPatients: 15,
    maxPatients: 20
  },
  "dr_johnson": {
    name: "Dr. Johnson",
    role: "Reproductive Endocrinologist",
    schedule: {
      "2024-11-18": ["afternoon"],
      "2024-11-19": ["morning", "afternoon"],
      "2024-11-20": ["morning"],
      "2024-11-21": ["afternoon"],
      "2024-11-22": ["morning", "afternoon"]
    },
    specialties: ["PCOS", "Endometriosis", "Male Infertility"],
    currentPatients: 18,
    maxPatients: 22
  },
  "nurse_williams": {
    name: "Nurse Williams",
    role: "Fertility Nurse",
    schedule: {
      "2024-11-18": ["morning", "afternoon"],
      "2024-11-19": ["morning", "afternoon"],
      "2024-11-20": ["morning", "afternoon"],
      "2024-11-21": ["morning", "afternoon"],
      "2024-11-22": ["morning", "afternoon"]
    },
    specialties: ["Patient Education", "Injection Training", "Monitoring"],
    currentPatients: 25,
    maxPatients: 30
  }
};

// Daily timeline data with detailed hourly schedule
export const dailyTimeline = {
  "2024-11-18": [
    {
      time: "08:00",
      type: "preparation",
      title: "Morning Setup",
      description: "Review patient files and prepare for morning appointments",
      duration: 30,
      status: "completed",
      priority: "medium"
    },
    {
      time: "08:30",
      type: "appointment",
      title: "Emily Clark - IVF Consultation",
      description: "Initial consultation for IVF treatment",
      duration: 45,
      status: "completed",
      priority: "high",
      patientId: "emily_clark",
      room: "Room 101"
    },
    {
      time: "09:15",
      type: "appointment",
      title: "Sarah Johnson - Follow-up",
      description: "PCOS treatment follow-up",
      duration: 30,
      status: "completed",
      priority: "medium",
      patientId: "sarah_johnson",
      room: "Room 102"
    },
    {
      time: "10:00",
      type: "break",
      title: "Coffee Break",
      description: "Short break and chart review",
      duration: 15,
      status: "completed",
      priority: "low"
    },
    {
      time: "10:15",
      type: "procedure",
      title: "Ultrasound Monitoring",
      description: "Follicle monitoring for 3 patients",
      duration: 60,
      status: "completed",
      priority: "high",
      room: "Room 101"
    },
    {
      time: "11:15",
      type: "appointment",
      title: "New Patient Consultation",
      description: "Initial fertility assessment",
      duration: 60,
      status: "in_progress",
      priority: "high",
      room: "Room 102"
    },
    {
      time: "12:15",
      type: "break",
      title: "Lunch Break",
      description: "Lunch and administrative tasks",
      duration: 45,
      status: "scheduled",
      priority: "low"
    },
    {
      time: "13:00",
      type: "meeting",
      title: "Team Meeting",
      description: "Weekly team coordination meeting",
      duration: 30,
      status: "scheduled",
      priority: "medium",
      room: "Conference Room"
    },
    {
      time: "13:30",
      type: "appointment",
      title: "IVF Transfer Procedure",
      description: "Embryo transfer for patient",
      duration: 45,
      status: "scheduled",
      priority: "high",
      room: "Procedure Room"
    },
    {
      time: "14:15",
      type: "appointment",
      title: "Post-procedure Consultation",
      description: "Follow-up after IVF transfer",
      duration: 30,
      status: "scheduled",
      priority: "medium",
      room: "Room 101"
    },
    {
      time: "15:00",
      type: "administrative",
      title: "Chart Updates",
      description: "Update patient charts and treatment plans",
      duration: 30,
      status: "scheduled",
      priority: "medium"
    },
    {
      time: "15:30",
      type: "appointment",
      title: "Counseling Session",
      description: "Genetic counseling for high-risk patient",
      duration: 45,
      status: "scheduled",
      priority: "high",
      room: "Counseling Room"
    },
    {
      time: "16:15",
      type: "preparation",
      title: "End of Day Review",
      description: "Review day's activities and prepare for tomorrow",
      duration: 30,
      status: "scheduled",
      priority: "medium"
    }
  ],
  "2024-11-19": [
    {
      time: "08:00",
      type: "preparation",
      title: "Morning Preparation",
      description: "Equipment check and patient file review",
      duration: 30,
      status: "scheduled",
      priority: "medium"
    },
    {
      time: "08:30",
      type: "procedure",
      title: "Egg Retrieval Procedure",
      description: "Scheduled egg retrieval for IVF patient",
      duration: 90,
      status: "scheduled",
      priority: "high",
      room: "Procedure Room"
    },
    {
      time: "10:00",
      type: "appointment",
      title: "Post-procedure Monitoring",
      description: "Recovery monitoring after egg retrieval",
      duration: 45,
      status: "scheduled",
      priority: "high",
      room: "Recovery Room"
    },
    {
      time: "11:00",
      type: "appointment",
      title: "Consultation - Male Infertility",
      description: "Initial consultation for male factor infertility",
      duration: 60,
      status: "scheduled",
      priority: "medium",
      room: "Room 102"
    },
    {
      time: "12:00",
      type: "break",
      title: "Lunch Break",
      description: "Lunch and chart review",
      duration: 60,
      status: "scheduled",
      priority: "low"
    }
  ],
  "2024-11-20": [
    {
      time: "13:00",
      type: "appointment",
      title: "Pregnancy Monitoring",
      description: "Early pregnancy ultrasound",
      duration: 30,
      status: "scheduled",
      priority: "high",
      room: "Room 101"
    },
    {
      time: "13:30",
      type: "appointment",
      title: "IUI Procedure",
      description: "Intrauterine insemination procedure",
      duration: 45,
      status: "scheduled",
      priority: "high",
      room: "Procedure Room"
    },
    {
      time: "14:15",
      type: "appointment",
      title: "Endometriosis Consultation",
      description: "Treatment planning for endometriosis patient",
      duration: 45,
      status: "scheduled",
      priority: "medium",
      room: "Room 102"
    },
    {
      time: "15:00",
      type: "meeting",
      title: "Case Review Meeting",
      description: "Multidisciplinary team case review",
      duration: 60,
      status: "scheduled",
      priority: "medium",
      room: "Conference Room"
    },
    {
      time: "16:00",
      type: "administrative",
      title: "Insurance Reviews",
      description: "Review insurance authorizations",
      duration: 45,
      status: "scheduled",
      priority: "low"
    }
  ],
  "2024-11-21": [
    {
      time: "08:00",
      type: "preparation",
      title: "Morning Setup",
      description: "Review patient files and prepare equipment",
      duration: 30,
      status: "scheduled",
      priority: "medium"
    },
    {
      time: "08:30",
      type: "appointment",
      title: "Follow-up Consultation",
      description: "Post-treatment follow-up for IVF patient",
      duration: 45,
      status: "scheduled",
      priority: "high",
      patientId: "emily_clark",
      room: "Room 101"
    },
    {
      time: "09:15",
      type: "appointment",
      title: "New Patient Assessment",
      description: "Initial fertility evaluation",
      duration: 60,
      status: "scheduled",
      priority: "high",
      room: "Room 102"
    },
    {
      time: "10:15",
      type: "break",
      title: "Coffee Break",
      description: "Short break and chart review",
      duration: 15,
      status: "scheduled",
      priority: "low"
    },
    {
      time: "10:30",
      type: "procedure",
      title: "Ultrasound Monitoring",
      description: "Follicle development monitoring",
      duration: 45,
      status: "scheduled",
      priority: "high",
      room: "Room 101"
    },
    {
      time: "11:15",
      type: "appointment",
      title: "Patient Education Session",
      description: "IVF process education for new patients",
      duration: 60,
      status: "scheduled",
      priority: "medium",
      room: "Education Room"
    },
    {
      time: "12:15",
      type: "break",
      title: "Lunch Break",
      description: "Lunch and administrative tasks",
      duration: 45,
      status: "scheduled",
      priority: "low"
    },
    {
      time: "13:00",
      type: "appointment",
      title: "Hormone Therapy Consultation",
      description: "Hormone replacement therapy planning",
      duration: 45,
      status: "scheduled",
      priority: "medium",
      room: "Room 102"
    },
    {
      time: "13:45",
      type: "appointment",
      title: "Genetic Counseling",
      description: "Pre-conception genetic counseling",
      duration: 60,
      status: "scheduled",
      priority: "high",
      room: "Counseling Room"
    },
    {
      time: "14:45",
      type: "administrative",
      title: "Medical Records Update",
      description: "Update patient medical records",
      duration: 30,
      status: "scheduled",
      priority: "medium"
    },
    {
      time: "15:15",
      type: "appointment",
      title: "Treatment Plan Review",
      description: "Review and adjust treatment protocols",
      duration: 45,
      status: "scheduled",
      priority: "medium",
      room: "Room 101"
    },
    {
      time: "16:00",
      type: "preparation",
      title: "End of Day Review",
      description: "Review day's activities and prepare for tomorrow",
      duration: 30,
      status: "scheduled",
      priority: "medium"
    }
  ],
  "2024-11-22": [
    {
      time: "08:00",
      type: "preparation",
      title: "Morning Preparation",
      description: "Equipment check and patient file review",
      duration: 30,
      status: "scheduled",
      priority: "medium"
    },
    {
      time: "08:30",
      type: "procedure",
      title: "Embryo Transfer",
      description: "Fresh embryo transfer procedure",
      duration: 60,
      status: "scheduled",
      priority: "high",
      room: "Procedure Room"
    },
    {
      time: "09:30",
      type: "appointment",
      title: "Post-transfer Monitoring",
      description: "Recovery monitoring after embryo transfer",
      duration: 30,
      status: "scheduled",
      priority: "high",
      room: "Recovery Room"
    },
    {
      time: "10:00",
      type: "appointment",
      title: "PCOS Management",
      description: "PCOS treatment follow-up",
      duration: 45,
      status: "scheduled",
      priority: "medium",
      patientId: "sarah_johnson",
      room: "Room 102"
    },
    {
      time: "10:45",
      type: "break",
      title: "Coffee Break",
      description: "Short break and documentation",
      duration: 15,
      status: "scheduled",
      priority: "low"
    },
    {
      time: "11:00",
      type: "appointment",
      title: "Male Fertility Consultation",
      description: "Sperm analysis results discussion",
      duration: 45,
      status: "scheduled",
      priority: "medium",
      room: "Room 101"
    },
    {
      time: "11:45",
      type: "administrative",
      title: "Weekly Reports",
      description: "Prepare weekly treatment reports",
      duration: 30,
      status: "scheduled",
      priority: "low"
    },
    {
      time: "12:15",
      type: "break",
      title: "Lunch Break",
      description: "Lunch and team coordination",
      duration: 45,
      status: "scheduled",
      priority: "low"
    }
  ],
  "2024-11-23": [
    {
      time: "08:00",
      type: "preparation",
      title: "Saturday Morning Setup",
      description: "Weekend clinic preparation",
      duration: 30,
      status: "scheduled",
      priority: "medium"
    },
    {
      time: "08:30",
      type: "appointment",
      title: "Emergency Consultation",
      description: "Urgent fertility consultation",
      duration: 60,
      status: "scheduled",
      priority: "high",
      room: "Room 101"
    },
    {
      time: "09:30",
      type: "procedure",
      title: "Weekend Monitoring",
      description: "Hormone level monitoring",
      duration: 45,
      status: "scheduled",
      priority: "high",
      room: "Lab"
    },
    {
      time: "10:15",
      type: "appointment",
      title: "Couple Counseling",
      description: "Fertility counseling session",
      duration: 60,
      status: "scheduled",
      priority: "medium",
      room: "Counseling Room"
    },
    {
      time: "11:15",
      type: "administrative",
      title: "Weekend Documentation",
      description: "Complete patient records",
      duration: 45,
      status: "scheduled",
      priority: "low"
    },
    {
      time: "12:00",
      type: "break",
      title: "Weekend Break",
      description: "Extended break for weekend shift",
      duration: 60,
      status: "scheduled",
      priority: "low"
    }
  ],
  "2024-11-24": [
    {
      time: "09:00",
      type: "preparation",
      title: "Sunday Preparation",
      description: "Limited Sunday service preparation",
      duration: 30,
      status: "scheduled",
      priority: "medium"
    },
    {
      time: "09:30",
      type: "appointment",
      title: "Emergency Follow-up",
      description: "Post-procedure emergency follow-up",
      duration: 45,
      status: "scheduled",
      priority: "high",
      room: "Room 101"
    },
    {
      time: "10:15",
      type: "administrative",
      title: "Weekly Planning",
      description: "Plan upcoming week schedule",
      duration: 60,
      status: "scheduled",
      priority: "medium"
    },
    {
      time: "11:15",
      type: "break",
      title: "Sunday Rest",
      description: "Extended rest period",
      duration: 45,
      status: "scheduled",
      priority: "low"
    }
  ],
  "2024-11-25": [
    {
      time: "08:00",
      type: "preparation",
      title: "Monday Morning Setup",
      description: "Start of new week preparation",
      duration: 30,
      status: "scheduled",
      priority: "medium"
    },
    {
      time: "08:30",
      type: "meeting",
      title: "Weekly Team Meeting",
      description: "Monday morning team coordination",
      duration: 60,
      status: "scheduled",
      priority: "high",
      room: "Conference Room"
    },
    {
      time: "09:30",
      type: "appointment",
      title: "New Week Consultations",
      description: "Monday patient consultations",
      duration: 90,
      status: "scheduled",
      priority: "high",
      room: "Room 102"
    },
    {
      time: "11:00",
      type: "procedure",
      title: "IVF Cycle Start",
      description: "Begin new IVF treatment cycle",
      duration: 60,
      status: "scheduled",
      priority: "high",
      room: "Procedure Room"
    },
    {
      time: "12:00",
      type: "break",
      title: "Lunch Break",
      description: "Monday lunch and planning",
      duration: 60,
      status: "scheduled",
      priority: "low"
    },
    {
      time: "13:00",
      type: "appointment",
      title: "Afternoon Consultations",
      description: "Monday afternoon patient visits",
      duration: 120,
      status: "scheduled",
      priority: "medium",
      room: "Room 101"
    },
    {
      time: "15:00",
      type: "administrative",
      title: "Weekly Review",
      description: "Review previous week outcomes",
      duration: 60,
      status: "scheduled",
      priority: "medium"
    }
  ],
  "2024-11-26": [
    {
      time: "08:00",
      type: "preparation",
      title: "Tuesday Setup",
      description: "Equipment and schedule preparation",
      duration: 30,
      status: "scheduled",
      priority: "medium"
    },
    {
      time: "08:30",
      type: "procedure",
      title: "Egg Retrieval",
      description: "Scheduled egg retrieval procedure",
      duration: 90,
      status: "scheduled",
      priority: "high",
      room: "Procedure Room"
    },
    {
      time: "10:00",
      type: "appointment",
      title: "Post-procedure Monitoring",
      description: "Recovery and monitoring after procedure",
      duration: 45,
      status: "scheduled",
      priority: "high",
      room: "Recovery Room"
    },
    {
      time: "10:45",
      type: "break",
      title: "Mid-morning Break",
      description: "Short break and documentation",
      duration: 15,
      status: "scheduled",
      priority: "low"
    },
    {
      time: "11:00",
      type: "appointment",
      title: "Fertility Assessment",
      description: "Comprehensive fertility evaluation",
      duration: 75,
      status: "scheduled",
      priority: "high",
      room: "Room 102"
    },
    {
      time: "12:15",
      type: "break",
      title: "Lunch Break",
      description: "Lunch and administrative tasks",
      duration: 45,
      status: "scheduled",
      priority: "low"
    },
    {
      time: "13:00",
      type: "appointment",
      title: "Treatment Planning",
      description: "Develop personalized treatment plans",
      duration: 90,
      status: "scheduled",
      priority: "medium",
      room: "Room 101"
    },
    {
      time: "14:30",
      type: "administrative",
      title: "Insurance Coordination",
      description: "Handle insurance and billing matters",
      duration: 60,
      status: "scheduled",
      priority: "low"
    },
    {
      time: "15:30",
      type: "appointment",
      title: "Follow-up Consultations",
      description: "Patient follow-up appointments",
      duration: 90,
      status: "scheduled",
      priority: "medium",
      room: "Room 102"
    }
  ],
  "2024-11-27": [
    {
      time: "08:00",
      type: "preparation",
      title: "Wednesday Morning Setup",
      description: "Mid-week preparation and equipment check",
      duration: 30,
      status: "scheduled",
      priority: "medium"
    },
    {
      time: "08:30",
      type: "procedure",
      title: "Frozen Embryo Transfer",
      description: "FET procedure for patient cycle",
      duration: 75,
      status: "scheduled",
      priority: "high",
      room: "Procedure Room",
      patientId: "maria_garcia"
    },
    {
      time: "09:45",
      type: "appointment",
      title: "Post-FET Monitoring",
      description: "Recovery monitoring after frozen embryo transfer",
      duration: 30,
      status: "scheduled",
      priority: "high",
      room: "Recovery Room"
    },
    {
      time: "10:15",
      type: "break",
      title: "Coffee Break",
      description: "Short break and chart updates",
      duration: 15,
      status: "scheduled",
      priority: "low"
    },
    {
      time: "10:30",
      type: "appointment",
      title: "Ovulation Induction Consultation",
      description: "Plan ovulation induction protocol",
      duration: 60,
      status: "scheduled",
      priority: "medium",
      room: "Room 101"
    },
    {
      time: "11:30",
      type: "procedure",
      title: "Hysteroscopy",
      description: "Diagnostic hysteroscopy procedure",
      duration: 45,
      status: "scheduled",
      priority: "high",
      room: "Procedure Room"
    },
    {
      time: "12:15",
      type: "break",
      title: "Lunch Break",
      description: "Lunch and administrative work",
      duration: 45,
      status: "scheduled",
      priority: "low"
    },
    {
      time: "13:00",
      type: "appointment",
      title: "Recurrent Miscarriage Consultation",
      description: "Evaluation for recurrent pregnancy loss",
      duration: 75,
      status: "scheduled",
      priority: "high",
      room: "Room 102"
    },
    {
      time: "14:15",
      type: "meeting",
      title: "Multidisciplinary Team Meeting",
      description: "Weekly MDT case discussion",
      duration: 60,
      status: "scheduled",
      priority: "medium",
      room: "Conference Room"
    },
    {
      time: "15:15",
      type: "administrative",
      title: "Research Documentation",
      description: "Update clinical research data",
      duration: 45,
      status: "scheduled",
      priority: "low"
    }
  ],
  "2024-11-28": [
    {
      time: "08:00",
      type: "preparation",
      title: "Thursday Preparation",
      description: "Equipment setup and patient file review",
      duration: 30,
      status: "scheduled",
      priority: "medium"
    },
    {
      time: "08:30",
      type: "appointment",
      title: "IVF Cycle Monitoring",
      description: "Follicle development monitoring",
      duration: 45,
      status: "scheduled",
      priority: "high",
      room: "Room 101",
      patientId: "jennifer_lee"
    },
    {
      time: "09:15",
      type: "procedure",
      title: "Sperm Analysis Review",
      description: "Review and discuss sperm analysis results",
      duration: 30,
      status: "scheduled",
      priority: "medium",
      room: "Lab"
    },
    {
      time: "09:45",
      type: "appointment",
      title: "Fertility Preservation Consultation",
      description: "Egg freezing consultation for cancer patient",
      duration: 60,
      status: "scheduled",
      priority: "high",
      room: "Room 102"
    },
    {
      time: "10:45",
      type: "break",
      title: "Mid-morning Break",
      description: "Break and documentation",
      duration: 15,
      status: "scheduled",
      priority: "low"
    },
    {
      time: "11:00",
      type: "procedure",
      title: "Egg Freezing Procedure",
      description: "Oocyte cryopreservation procedure",
      duration: 90,
      status: "scheduled",
      priority: "high",
      room: "Procedure Room"
    },
    {
      time: "12:30",
      type: "break",
      title: "Lunch Break",
      description: "Extended lunch break",
      duration: 60,
      status: "scheduled",
      priority: "low"
    },
    {
      time: "13:30",
      type: "appointment",
      title: "Donor Egg Consultation",
      description: "Discuss donor egg treatment options",
      duration: 75,
      status: "scheduled",
      priority: "medium",
      room: "Room 101"
    },
    {
      time: "14:45",
      type: "administrative",
      title: "Quality Assurance Review",
      description: "Monthly QA procedures review",
      duration: 45,
      status: "scheduled",
      priority: "medium"
    },
    {
      time: "15:30",
      type: "appointment",
      title: "Pregnancy Test Results",
      description: "Discuss beta hCG results with patients",
      duration: 60,
      status: "scheduled",
      priority: "high",
      room: "Room 102"
    }
  ],
  "2024-11-29": [
    {
      time: "08:00",
      type: "preparation",
      title: "Friday Setup",
      description: "End of week preparation",
      duration: 30,
      status: "scheduled",
      priority: "medium"
    },
    {
      time: "08:30",
      type: "appointment",
      title: "Weekly Follow-up Rounds",
      description: "Check on all active treatment cycles",
      duration: 90,
      status: "scheduled",
      priority: "high",
      room: "Room 101"
    },
    {
      time: "10:00",
      type: "procedure",
      title: "Intrauterine Insemination",
      description: "IUI procedure for natural cycle",
      duration: 45,
      status: "scheduled",
      priority: "high",
      room: "Procedure Room"
    },
    {
      time: "10:45",
      type: "break",
      title: "Coffee Break",
      description: "Short break",
      duration: 15,
      status: "scheduled",
      priority: "low"
    },
    {
      time: "11:00",
      type: "appointment",
      title: "Surgical Consultation",
      description: "Pre-operative consultation for laparoscopy",
      duration: 60,
      status: "scheduled",
      priority: "medium",
      room: "Room 102"
    },
    {
      time: "12:00",
      type: "meeting",
      title: "Weekly Team Debrief",
      description: "End of week team meeting",
      duration: 45,
      status: "scheduled",
      priority: "medium",
      room: "Conference Room"
    },
    {
      time: "12:45",
      type: "break",
      title: "Lunch Break",
      description: "Friday lunch",
      duration: 45,
      status: "scheduled",
      priority: "low"
    },
    {
      time: "13:30",
      type: "administrative",
      title: "Weekly Reports",
      description: "Complete weekly treatment reports",
      duration: 60,
      status: "scheduled",
      priority: "medium"
    },
    {
      time: "14:30",
      type: "appointment",
      title: "End of Week Consultations",
      description: "Final consultations of the week",
      duration: 90,
      status: "scheduled",
      priority: "medium",
      room: "Room 101"
    }
  ]
};

// Weekly timeline summary
export const weeklyTimeline = {
  "2024-11-18": {
    totalAppointments: 6,
    totalProcedures: 2,
    totalDuration: 480, // minutes
    keyEvents: ["IVF Transfer", "Team Meeting", "Genetic Counseling"],
    workload: "high",
    efficiency: 92
  },
  "2024-11-19": {
    totalAppointments: 3,
    totalProcedures: 1,
    totalDuration: 285,
    keyEvents: ["Egg Retrieval", "Male Infertility Consultation"],
    workload: "medium",
    efficiency: 88
  },
  "2024-11-20": {
    totalAppointments: 4,
    totalProcedures: 1,
    totalDuration: 225,
    keyEvents: ["IUI Procedure", "Case Review Meeting"],
    workload: "medium",
    efficiency: 85
  },
  "2024-11-21": {
    totalAppointments: 5,
    totalProcedures: 0,
    totalDuration: 300,
    keyEvents: ["Follow-up Consultations", "Patient Education"],
    workload: "medium",
    efficiency: 90
  },
  "2024-11-22": {
    totalAppointments: 4,
    totalProcedures: 1,
    totalDuration: 240,
    keyEvents: ["Ultrasound Monitoring", "Treatment Planning"],
    workload: "low",
    efficiency: 87
  },
  "2024-11-23": {
    totalAppointments: 3,
    totalProcedures: 1,
    totalDuration: 240,
    keyEvents: ["Weekend Emergency", "Couple Counseling"],
    workload: "low",
    efficiency: 82
  },
  "2024-11-24": {
    totalAppointments: 2,
    totalProcedures: 0,
    totalDuration: 150,
    keyEvents: ["Emergency Follow-up", "Weekly Planning"],
    workload: "low",
    efficiency: 80
  },
  "2024-11-25": {
    totalAppointments: 4,
    totalProcedures: 2,
    totalDuration: 420,
    keyEvents: ["Team Meeting", "IVF Cycle Start", "Weekly Review"],
    workload: "medium",
    efficiency: 89
  },
  "2024-11-26": {
    totalAppointments: 6,
    totalProcedures: 2,
    totalDuration: 480,
    keyEvents: ["Egg Retrieval", "Fertility Assessment", "Treatment Planning"],
    workload: "high",
    efficiency: 91
  },
  "2024-11-27": {
    totalAppointments: 5,
    totalProcedures: 3,
    totalDuration: 450,
    keyEvents: ["Frozen Embryo Transfer", "Hysteroscopy", "MDT Meeting"],
    workload: "high",
    efficiency: 93
  },
  "2024-11-28": {
    totalAppointments: 6,
    totalProcedures: 3,
    totalDuration: 510,
    keyEvents: ["IVF Monitoring", "Egg Freezing", "Pregnancy Results"],
    workload: "high",
    efficiency: 94
  },
  "2024-11-29": {
    totalAppointments: 5,
    totalProcedures: 2,
    totalDuration: 420,
    keyEvents: ["Weekly Rounds", "IUI Procedure", "Team Debrief"],
    workload: "medium",
    efficiency: 88
  },
  "2024-11-30": {
    totalAppointments: 2,
    totalProcedures: 1,
    totalDuration: 135,
    keyEvents: ["Weekend Emergency", "Critical Monitoring"],
    workload: "low",
    efficiency: 85
  },
  "2024-12-01": {
    totalAppointments: 1,
    totalProcedures: 0,
    totalDuration: 75,
    keyEvents: ["Emergency Follow-up"],
    workload: "low",
    efficiency: 80
  }
};

// Real-time activity feed
export const activityFeed = [
  {
    id: "act_001",
    timestamp: "2024-11-18T11:30:00Z",
    type: "appointment_completed",
    title: "Appointment Completed",
    description: "Emily Clark - IVF consultation completed successfully",
    priority: "medium",
    user: "Dr. Smith",
    patientId: "emily_clark"
  },
  {
    id: "act_002",
    timestamp: "2024-11-18T11:15:00Z",
    type: "procedure_started",
    title: "Procedure Started",
    description: "Ultrasound monitoring session began",
    priority: "high",
    user: "Dr. Smith",
    room: "Room 101"
  },
  {
    id: "act_003",
    timestamp: "2024-11-18T10:45:00Z",
    type: "patient_arrived",
    title: "Patient Arrived",
    description: "Sarah Johnson checked in for follow-up appointment",
    priority: "low",
    user: "Reception",
    patientId: "sarah_johnson"
  },
  {
    id: "act_004",
    timestamp: "2024-11-18T10:30:00Z",
    type: "equipment_alert",
    title: "Equipment Alert",
    description: "Microscope 1 requires maintenance attention",
    priority: "high",
    user: "System",
    equipment: "microscope_1"
  },
  {
    id: "act_005",
    timestamp: "2024-11-18T09:45:00Z",
    type: "appointment_completed",
    title: "Appointment Completed",
    description: "Sarah Johnson - PCOS follow-up completed",
    priority: "medium",
    user: "Dr. Smith",
    patientId: "sarah_johnson"
  },
  {
    id: "act_006",
    timestamp: "2024-11-18T09:00:00Z",
    type: "shift_started",
    title: "Shift Started",
    description: "Dr. Smith began morning shift",
    priority: "low",
    user: "Dr. Smith"
  }
];

export default {
  // Appointment and schedule data
  mockAppointments,
  doctorWeeklySchedule,
  doctorShiftDetails,
  doctorLeaveSchedule,
  specialEvents,
  onCallSchedule,
  
  // Notes and reminders
  mockShiftNotes,
  mockReminders,
  
  // Statistics and analytics
  mockStatistics,
  weeklyTrends,
  monthlyComparison,
  treatmentStats,
  
  // Resource management
  roomAvailability,
  equipmentStatus,
  staffSchedule,
  
  // Patient management
  patientProfiles,
  treatmentHistory,
  
  // Timeline data
  dailyTimeline,
  weeklyTimeline,
  activityFeed,
  
  // Reference data
  appointmentTypes,
  appointmentStatuses,
  patientAvatars
};