
export const mockDoctors = [
  { doctorId: 1, name: "Nguyễn Văn A" },
  { doctorId: 2, name: "Trần Thị B" },
  { doctorId: 3, name: "Lê Văn C" },
  { doctorId: 4, name: "Phạm Thị D" },
];

export const mockDoctorSchedules = {
  1: [
    { scheduleId: 101, date: "2025-06-25", slotId: 1, isAvailable: true },
    { scheduleId: 102, date: "2025-06-26", slotId: 2, isAvailable: true },
  ],
  2: [
    { scheduleId: 201, date: "2025-06-25", slotId: 1, isAvailable: true },
    { scheduleId: 202, date: "2025-06-27", slotId: 2, isAvailable: false },
  ],
  3: [
    { scheduleId: 301, date: "2025-06-26", slotId: 1, isAvailable: true },
  ],
  4: [
    { scheduleId: 401, date: "2025-06-25", slotId: 2, isAvailable: true },
  ],
};

export const mockAvailableDoctorsByDateSlot = {
  "2025-06-25_1": [
    { doctorId: 1, name: "Nguyễn Văn A" },
    { doctorId: 3, name: "Lê Văn C" },
  ],
  "2025-06-25_2": [
    { doctorId: 2, name: "Trần Thị B" },
    { doctorId: 4, name: "Phạm Thị D" },
  ],
  "2025-06-26_1": [
    { doctorId: 3, name: "Lê Văn C" },
  ],
  "2025-06-26_2": [
    { doctorId: 1, name: "Nguyễn Văn A" },
  ],
};
