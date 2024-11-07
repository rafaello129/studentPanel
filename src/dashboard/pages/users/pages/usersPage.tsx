import { useEffect, useMemo, useState } from "react";
import { Paginator } from "../../../components/shared/Paginator";
import { CreateUsersModal, UsersList } from "../../../components/users";
import { AppDispatch, RootState } from "../../../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { useGetUsersQuery } from "../../../../services/api/providers/userApi";


export const UsersPage = () => {

    const [page, setPage] = useState<number>(1)

    const res = useGetUsersQuery({page: page, limit:  0});
    
    const {data: usersResponse } = res
    
    const users = useMemo(() => usersResponse?.data || [], [usersResponse]);

    console.log(res);
    
    return (
        <div className="p-5">



            <UsersList />

        </div>


    );
}