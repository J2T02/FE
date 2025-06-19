import axiosClients from "./axiosClients";

const register = async (body) => {
  return await axiosClients.post("/Account/register", body);
};

const signIn = async (body) => {
  return await axiosClients.post("/Account/login", body);
};

const getCusInfo = async (userId) => {
  return await axiosClients.get(`/Customer/${userId}`);
};
const createCustomer = async (payload) => {
  return new Promise((resolve) => {
    console.log("📤 Tạo khách hàng với dữ liệu:", payload);

    setTimeout(() => {
      resolve({
        data: {
          success: true,
          message: "Tạo khách hàng thành công",
          data: {
            cusId: "CUS12345",
            ...payload,
          },
        },
      });
    }, 1000);
  });
};

export { register, signIn, getCusInfo, createCustomer };
