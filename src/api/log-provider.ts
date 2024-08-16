import { axiosWithToken } from "../helpers/axios";

export const apiGetAllLog = async (page : number, limit : number) => {
    try {
        let queryString = `/log/findAll?page=${page}&limit=${limit}`;
        return await axiosWithToken(queryString);
    } catch (error:any) {
        console.log(error);
        return{
            status: false,
            message: error.message,
        };
    }
}
