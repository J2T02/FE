import axiosClients from "./axiosClients";

const updateCustomer = async (id, body) => {
  return await axiosClients.put(`/Customer/update?AccountId=${id}`, body);
};

export { updateCustomer };
