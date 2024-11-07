// src/components/user-response/CreateOrUpdateUserResponse.tsx
import React from 'react';
import { useCreateOrUpdateUserResponseMutation } from '../../../services/api/providers/userResponseApi';
import { CreateUserResponseDto } from '../../../interfaces/create-user-response.dto';

const CreateOrUpdateUserResponse: React.FC = () => {
  const [createOrUpdateUserResponse, { isLoading, error }] =
    useCreateOrUpdateUserResponseMutation();

  const handleSubmit = async (dto: CreateUserResponseDto) => {
    try {
      await createOrUpdateUserResponse(dto).unwrap();
      alert('Respuesta guardada correctamente.');
    } catch (err) {
      console.error('Error al guardar la respuesta:', err);
      alert('Error al guardar la respuesta.');
    }
  };

  return (
    <div>
      {/* Formulario para crear o actualizar respuesta de usuario */}
      {/* Implementa el formulario según tus necesidades */}
    </div>
  );
};

export default CreateOrUpdateUserResponse;
