
import axiosClients from "./axiosClients";

const GetAllAccount = async () => {
    return await axiosClients.get("/Account/getAllAccounts");
} 

export { GetAllAccount };