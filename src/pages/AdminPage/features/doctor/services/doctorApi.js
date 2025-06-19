// features/doctor/services/doctorApi.js

// Fake API delay
const fakeDelay = (ms = 300) => new Promise((res) => setTimeout(res, ms));

// Dữ liệu giả mock ban đầu (chỉ dùng nội bộ file này)
let doctors = [
  {
    doctorId: 1,
    doctorName: "Nguyễn Văn A",
    email: "bs.a@gmail.com",
    phone: "0909123456",
    gender: 1,
    yob: "1990-06-01",
    image: "/anhcuong.jpg",
    experience: 4,
    startDate: "2021-06-01",
    status: 1,
    certification: [
      { cerId: 1, cerName: "Tiến sĩ IVF" },
      { cerId: 3, cerName: "Chuyên gia IUI" },
    ],
  },
  {
    doctorId: 2,
    doctorName: "Trần Thị B",
    email: "bs.b@gmail.com",
    phone: "0909123457",
    gender: 2,
    yob: "1985-03-15",
    image: "/anhhuynh.png",
    experience: 10,
    startDate: "2013-04-10",
    status: 1,
    certification: [
      { cerId: 2, cerName: "Chuyên gia IVF" },
      { cerId: 4, cerName: "Thạc sĩ Sản khoa" },
    ],
  },
  {
    doctorId: 3,
    doctorName: "Lê Văn C",
    email: "bs.c@gmail.com",
    phone: "0909123458",
    gender: 1,
    yob: "1988-12-20",
    image: "/anhket.jpg",
    experience: 7,
    startDate: "2016-01-15",
    status: 2,
    certification: [{ cerId: 1, cerName: "Tiến sĩ IVF" }],
  },
  {
    doctorId: 4,
    doctorName: "Phạm Thị D",
    email: "bs.d@gmail.com",
    phone: "0909123459",
    gender: 2,
    yob: "1992-07-10",
    image: "/anhnhan.jpg",
    experience: 3,
    startDate: "2022-01-01",
    status: 1,
    certification: [{ cerId: 5, cerName: "Bác sĩ Nội trú" }],
  },
  {
    doctorId: 5,
    doctorName: "Đỗ Văn E",
    email: "bs.e@gmail.com",
    phone: "0909123460",
    gender: 1,
    yob: "1980-09-25",
    image: "/anhthinh.jpg",
    experience: 15,
    startDate: "2009-05-20",
    status: 3,
    certification: [
      { cerId: 2, cerName: "Chuyên gia IVF" },
      { cerId: 6, cerName: "Chuyên gia Di truyền" },
    ],
  },
  {
    doctorId: 6,
    doctorName: "Ngô Thị F",
    email: "bs.f@gmail.com",
    phone: "0909123461",
    gender: 2,
    yob: "1995-01-30",
    image: "/doctorhuy.jpg",
    experience: 2,
    startDate: "2023-03-10",
    status: 1,
    certification: [{ cerId: 4, cerName: "Thạc sĩ Sản khoa" }],
  },
  {
    doctorId: 7,
    doctorName: "Võ Văn G",
    email: "bs.g@gmail.com",
    phone: "0909123462",
    gender: 1,
    yob: "1987-11-11",
    image: "/femaledoctor.jpg",
    experience: 8,
    startDate: "2015-06-20",
    status: 1,
    certification: [{ cerId: 3, cerName: "Chuyên gia IUI" }],
  },
  {
    doctorId: 8,
    doctorName: "Huỳnh Thị H",
    email: "bs.h@gmail.com",
    phone: "0909123463",
    gender: 2,
    yob: "1991-04-05",
    image: "/khanhtuyensinh.jpg",
    experience: 5,
    startDate: "2019-09-01",
    status: 2,
    certification: [
      { cerId: 1, cerName: "Tiến sĩ IVF" },
      { cerId: 5, cerName: "Bác sĩ Nội trú" },
    ],
  },
  {
    doctorId: 9,
    doctorName: "Bùi Văn I",
    email: "bs.i@gmail.com",
    phone: "0909123464",
    gender: 1,
    yob: "1983-08-08",
    image: "/maihadoctor.jpg",
    experience: 12,
    startDate: "2011-02-18",
    status: 1,
    certification: [{ cerId: 2, cerName: "Chuyên gia IVF" }],
  },
  {
    doctorId: 10,
    doctorName: "Tô Thị K",
    email: "bs.k@gmail.com",
    phone: "0909123465",
    gender: 2,
    yob: "1989-10-10",
    image: "/quocanh.jpg",
    experience: 6,
    startDate: "2017-08-01",
    status: 3,
    certification: [
      { cerId: 3, cerName: "Chuyên gia IUI" },
      { cerId: 4, cerName: "Thạc sĩ Sản khoa" },
    ],
  },
];

let schedules = [
  {
    scheduleId: 1,
    doctorId: 1,
    date: "2025-06-20",
    slotId: 1,
    note: "Khám IVF buổi sáng",
    isAvailable: true,
    maxBooking: 5,
  },
  {
    scheduleId: 2,
    doctorId: 2,
    date: "2025-06-20",
    slotId: 2,
    note: "",
    isAvailable: true,
    maxBooking: 5,
  },
  {
    scheduleId: 3,
    doctorId: 3,
    date: "2025-06-21",
    slotId: 1,
    note: "Khám nam khoa",
    isAvailable: false,
    maxBooking: 5,
  },
  {
    scheduleId: 4,
    doctorId: 4,
    date: "2025-06-21",
    slotId: 1,
    note: "Khám nội tiết",
    isAvailable: true,
    maxBooking: 5,
  },
  {
    scheduleId: 5,
    doctorId: 5,
    date: "2025-06-22",
    slotId: 2,
    note: "Khám hiếm muộn",
    isAvailable: true,
    maxBooking: 5,
  },
  {
    scheduleId: 6,
    doctorId: 1,
    date: "2025-06-23",
    slotId: 1,
    note: "",
    isAvailable: false,
    maxBooking: 5,
  },
  {
    scheduleId: 7,
    doctorId: 2,
    date: "2025-06-23",
    slotId: 2,
    note: "Lịch tái khám IUI",
    isAvailable: true,
    maxBooking: 5,
  },
  {
    scheduleId: 8,
    doctorId: 6,
    date: "2025-06-24",
    slotId: 1,
    note: "",
    isAvailable: false,
    maxBooking: 5,
  },
  {
    scheduleId: 9,
    doctorId: 7,
    date: "2025-06-25",
    slotId: 1,
    note: "Tư vấn IVF",
    isAvailable: true,
    maxBooking: 5,
  },
  {
    scheduleId: 10,
    doctorId: 8,
    date: "2025-06-25",
    slotId: 2,
    note: "",
    isAvailable: true,
    maxBooking: 5,
  },
];

export const doctorApi = {
  async getDoctors() {
    await fakeDelay();
    return [...doctors];
  },

  async createDoctor(newDoctor) {
    await fakeDelay();
    const doctor = {
      ...newDoctor,
      id: Date.now(),
      fullName:
        newDoctor.fullName || `${newDoctor.lastName} ${newDoctor.firstName}`,
      status: "Đang làm việc",
    };
    doctors.push(doctor);
    return doctor;
  },

  async updateDoctor(updated) {
    await fakeDelay();
    doctors = doctors.map((d) => (d.id === updated.id ? updated : d));
    return updated;
  },

  async getSchedules() {
    await fakeDelay();
    return [...schedules];
  },

  async addSchedule(schedule) {
    await fakeDelay();
    schedules.push(schedule);
    return schedule;
  },

  async updateSchedule(updated) {
    await fakeDelay();
    schedules = schedules.map((s) =>
      s.doctorId === updated.doctorId &&
      s.date === updated.date &&
      s.shift === updated.shift
        ? updated
        : s
    );
    return updated;
  },

  async removeSchedule({ doctorId, date, slotId }) {
    await fakeDelay();
    schedules = schedules.filter(
      (s) =>
        !(s.doctorId === doctorId && s.date === date && s.slotId === slotId)
    );
    return true;
  },
};
