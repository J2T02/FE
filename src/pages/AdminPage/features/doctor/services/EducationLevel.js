// Fake API delay
const fakeDelay = (ms = 300) => new Promise((res) => setTimeout(res, ms));

// Danh sách trình độ học vấn mẫu
let educationLevels = [
  { eduId: 1, eduName: "Cử nhân" },
  { eduId: 2, eduName: "Thạc sĩ" },
  { eduId: 3, eduName: "Tiến sĩ" },
];

// API cho trình độ học vấn
export const educationLevelApi = {
  async getEducationLevels() {
    await fakeDelay();
    return [...educationLevels];
  },

  async getEducationLevelById(id) {
    await fakeDelay();
    return educationLevels.find((e) => e.eduId === id) || null;
  },

  async createEducationLevel(newEducationLevel) {
    await fakeDelay();
    const newEdu = {
      ...newEducationLevel,
      eduId: educationLevels.length
        ? Math.max(...educationLevels.map((e) => e.eduId)) + 1
        : 1,
    };
    educationLevels.push(newEdu);
    return newEdu;
  },

  async updateEducationLevel(updatedEducationLevel) {
    await fakeDelay();
    educationLevels = educationLevels.map((e) =>
      e.eduId === updatedEducationLevel.eduId ? updatedEducationLevel : e
    );
    return updatedEducationLevel;
  },

  async deleteEducationLevel(eduId) {
    await fakeDelay();
    educationLevels = educationLevels.filter((e) => e.eduId !== eduId);
    return true;
  },
};
