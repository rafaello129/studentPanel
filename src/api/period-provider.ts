import { axiosWithToken } from "../helpers/axios";
import { Period } from "../interfaces/period";


export const apiGetAllPeriod = async ( page: number, limit :number ) => {
 
    try {
        return await axiosWithToken( `/period/findAll?page=${page}&limit=${limit}`);
    } catch (error: any) {
        console.log(error);
        throw error;
    }

}
export const apiSearchPeriodByKeyword = async( page: number, limit: number, keyword:string )=>{
    try {                                  
        return await axiosWithToken( `/period/search?keyword=${keyword}&page=${page}&limit=${limit}`);
    } catch (error: any) {
        console.log(error);
        throw error;
    }
}

export const apiCreatePeriod= async(values: Period)=>{

    try {
        return await axiosWithToken( `/period/create`, values, 'POST' );
    } catch (error: any) {
        console.log(error);
        throw error;
    }
}
export const apiEditPeriod= async(id:number, values: Period)=>{

    try {
        return await axiosWithToken( `/period/update/${id}`, values, 'PATCH' );
    } catch (error: any) {
        console.log(error);
        throw error;
    }
}


export const apiCurrentPeriod= async(id : number)=>{
    try {
        return await axiosWithToken( `/period/current/${id}`,{}, 'POST' );
    } catch (error: any) {
        console.log(error);
        return {
            status: false,
            message: error.message
        }
    }
}