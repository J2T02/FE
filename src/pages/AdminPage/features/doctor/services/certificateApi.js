// Fake API delay
const fakeDelay = (ms = 300) => new Promise((res) => setTimeout(res, ms));
// Danh sách chứng chỉ mẫu
let certificates = [
  { cerId: 1, cerName: "Tiến sĩ IVF" },
  { cerId: 2, cerName: "Chuyên gia IVF" },
  { cerId: 3, cerName: "Chuyên gia IUI" },
  { cerId: 4, cerName: "Thạc sĩ Sản khoa" },
  { cerId: 5, cerName: "Bác sĩ Nội trú" },
  { cerId: 6, cerName: "Chuyên gia Di truyền" },
];

export const certificateApi = {
  async getCertificates() {
    await fakeDelay();
    return [...certificates];
  },

  async getCertificateById(id) {
    await fakeDelay();
    return certificates.find((c) => c.cerId === id) || null;
  },

  async createCertificate(newCertificate) {
    await fakeDelay();
    const newCer = {
      ...newCertificate,
      cerId: certificates.length
        ? Math.max(...certificates.map((c) => c.cerId)) + 1
        : 1,
    };
    certificates.push(newCer);
    return newCer;
  },

  async updateCertificate(updatedCertificate) {
    await fakeDelay();
    certificates = certificates.map((c) =>
      c.cerId === updatedCertificate.cerId ? updatedCertificate : c
    );
    return updatedCertificate;
  },

  async deleteCertificate(cerId) {
    await fakeDelay();
    certificates = certificates.filter((c) => c.cerId !== cerId);
    return true;
  },
};
