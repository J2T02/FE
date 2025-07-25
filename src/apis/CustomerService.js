import axiosClients from "./axiosClients";

const getCustomerList = async () => {
  return await axiosClients.get("/Customer");
};
const updateCustomer = async (id, body) => {
  return await axiosClients.put(`/Customer/update?AccountId=${id}`, body);
};
const findCustomerByPhoneOrEmail = async (phoneOrEmail) => {
  return await axiosClients.get(`/Customer/FindCustomer/${phoneOrEmail}`);
};

export { getCustomerList, updateCustomer, findCustomerByPhoneOrEmail };
