import { axiosWithToken } from "../helpers/axios";

export const apiGetAllUsers = async (page : number, limit : number) =>{
    try {
        return await axiosWithToken(`/users/findAll?page=${page}&limit=${limit}`);
    } catch (error:any) {
        console.log(error);
        return{
            status: false,
            message:error.message,
        };
    }
}