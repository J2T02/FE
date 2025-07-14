import axiosClients from "./axiosClients";

const getRevenue = async (period) => {
  return axiosClients.get(`/DashboardRevenue/revenue?period=${period}`);
};

export { getRevenue };
