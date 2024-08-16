import React from 'react';
import defaultUserImage from '../../../assets/icons/userpicture.png';
import type { User } from '../../../interfaces/auth-response';
import type { Role } from '../../../interfaces/role';

interface UserRowProps {
  user: User;
  urlImage: string;
  roles: Role[];
  loading: boolean;
  error: string | null;
  editingUserId: number | null;
  onEditClick: (userId: number) => void;
  onCancelEdit: () => void;
  onRoleChange: (userId: number, roleId: number) => void;
}

const UserRow: React.FC<UserRowProps> = ({
  user,
  urlImage,
  roles,
  loading,
  error,
  editingUserId,
  onEditClick,
  onCancelEdit,
  onRoleChange,
}) => {
  return (
    <tr key={user.id}>
      <td>
        <img
          width={40}
          className='me-2 rounded-circle'
          src={
            user.picture === 'none'
              ? defaultUserImage
              : `${urlImage}/files/users/${user.picture}`
          }
          alt='User image'
          onError={(e) => (e.currentTarget.src = defaultUserImage)}
          loading='lazy'
        />
      </td>
      <td>{user.name}</td>
      <td>{user.lastName}</td>
      <td>{user.motherLastName}</td>
      <td>
        <span
          className={`badge rounded-pill ${
            user.isActive ? 'text-bg-success' : 'text-bg-danger'
          }`}
        >
          {user.isActive ? 'Activo' : 'No activo'}
        </span>
      </td>
      <td>
        {editingUserId === user.id ? (
          <div className='d-flex justify-content-center align-items-center'>
            <select
              className='form-select form-select-sm'
              aria-label='Default select example'
              value={
                user.activeRole
                  ? roles.find((role) => role.name === user.activeRole)?.id ||
                    ''
                  : ''
              }
              onChange={(e) => onRoleChange(user.id!, Number(e.target.value))}
              style={{ width: 'auto' }}
            >
              <option value='' disabled>
                Selecciona una opción
              </option>
              {loading ? (
                <option>Cargando roles...</option>
              ) : error ? (
                <option>Error al cargar roles</option>
              ) : (
                roles.map((role) => (
                  <option key={role.id} value={role.id}>
                    {role.name}
                  </option>
                ))
              )}
            </select>
            <button
              className='btn btn-outline-danger rounded-circle ms-2'
              onClick={onCancelEdit}
            >
              <i className='fa-solid fa-xmark'></i>
            </button>
          </div>
        ) : (
          <>
            {user.activeRole ? user.activeRole : ''}
            <button
              className='btn btn-outline-success ms-2'
              onClick={() => onEditClick(user.id!)}
            >
              {user.activeRole ? (
                <i className='fa-solid fa-pen-to-square'></i>
              ) : (
                <>
                  Asignar{' '}
                  <i className='fa-regular fa-address-card mt-1 ms-1'></i>
                </>
              )}
            </button>
          </>
        )}
      </td>
    </tr>
  );
};

export default React.memo(UserRow);
