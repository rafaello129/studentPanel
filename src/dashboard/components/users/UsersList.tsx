import { useState } from 'react';
import { User } from '../../../interfaces/auth-response';
import { useEditUserRoleMutation, useGetRolesQuery } from '../../../services/api/providers/roleApi';
import { useGetUsersQuery } from '../../../services/api/providers/userApi';
import { usePageQueryParams } from '../../hooks/usePageQueryParams';
import Pagination from '../shared/Pagination';
import UserRow from './userRow';
import './users.css';

export const UsersList = () => {
  const [page, setPage] = usePageQueryParams();
  const limit = 10;

  const urlImage = import.meta.env.VITE_API_URL_AUTH;
  const [editingUserId, setEditingUserId] = useState<number | null>(null);

  const [assignRole] = useEditUserRoleMutation();
  const { data: usersResponse, isLoading } = useGetUsersQuery({
    page,
    limit,
  });
  const { data } = useGetRolesQuery();

  const roles = data || [];
  const users = usersResponse?.data || [];
  const totalUsers = usersResponse?.total || 0; // Total de usuarios para el paginador

  const handleRoleChange = (userId: number, roleId: number) => {
    assignRole({ userId, roleId });
    setEditingUserId(null);
  };

  const handleEditClick = (userId: number) => {
    setEditingUserId(userId);
  };

  const handleCancelEdit = () => {
    setEditingUserId(null);
  };

  return (
    <div className='card mt-3 p-1'>
      <table className='table text-center'>
        <thead>
          <tr>
            <th scope='col'></th>
            <th scope='col'>Nombre</th>
            <th scope='col'>Apellido paterno</th>
            <th scope='col'>Apellido materno</th>
            <th scope='col'>Estatus</th>
            <th scope='col'>Tipo de usuario</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user: User) => (
            <UserRow
              key={user.id}
              user={user}
              urlImage={urlImage}
              roles={roles}
              loading={isLoading}
              error={null}
              editingUserId={editingUserId}
              onEditClick={handleEditClick}
              onCancelEdit={handleCancelEdit}
              onRoleChange={handleRoleChange}
            />
          ))}
        </tbody>
      </table>

      <div className='container-fluid d-flex align-items-center justify-content-center'>
        <Pagination
          currentPage={page}
          pageSize={limit} // Se usa el mismo `limit` para `pageSize`
          totalCount={totalUsers}
          onPageChange={setPage}
          className='justify-content-center'
        />
      </div>
    </div>
  );
};
