import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  Alert
} from '@mui/material';
import { useGetStudentScheduleDetailsQuery } from '../../../services/api/providers/studentActivitiesApi';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB
const MAX_FILE_COUNT = 3;
const ALLOWED_FILE_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'image/png',
  'image/jpeg'
];

const ActivityDetailPage: React.FC = () => {
  // Obtener scheduleId de los parámetros de la URL.
  const { scheduleId } = useParams<{ scheduleId: string }>();
  // Obtener studentId de localStorage.
  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;
  const studentId = user?.id;
  const navigate = useNavigate();

  const { data, error, isLoading } = useGetStudentScheduleDetailsQuery({
    scheduleId: Number(scheduleId),
    studentId,
  });

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [submittedFiles, setSubmittedFiles] = useState<Array<{ name: string; date: string }>>([]);
  const [fileError, setFileError] = useState<string>('');
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editFile, setEditFile] = useState<File | null>(null);
  const [editError, setEditError] = useState<string>('');

  if (isLoading) {
    return (
      <Box sx={{ width: '100%', textAlign: 'center', mt: 4 }}>
        <Typography variant="h6">Cargando detalles de la actividad...</Typography>
      </Box>
    );
  }
  
  if (error || !data) {
    return (
      <Box sx={{ width: '100%', textAlign: 'center', mt: 4 }}>
        <Typography variant="h6" color="error">
          Ocurrió un error al obtener los detalles de la actividad.
        </Typography>
      </Box>
    );
  }

  const schedule = data;
  const startDate = new Date(schedule.startDate).toLocaleString();
  const endDate = new Date(schedule.endDate).toLocaleString();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFileError('');
    const files = event.target.files;
    if (!files) return;

    const currentFiles = Array.from(selectedFiles);
    const newFiles = Array.from(files);
    
    // Verificar el número máximo de archivos permitidos.
    if (currentFiles.length + newFiles.length > MAX_FILE_COUNT) {
      setFileError(`Número máximo de archivos permitidos: ${MAX_FILE_COUNT}.`);
      return;
    }

    // Validar cada archivo para tamaño y tipo permitido.
    for (const file of newFiles) {
      if (file.size > MAX_FILE_SIZE_BYTES) {
        setFileError(`El archivo ${file.name} excede el tamaño máximo permitido (10MB).`);
        return;
      }
      if (!ALLOWED_FILE_TYPES.includes(file.type)) {
        setFileError(`El tipo de archivo ${file.name} no está permitido.`);
        return;
      }
    }

    setSelectedFiles([...currentFiles, ...newFiles]);
    event.target.value = '';
  };

  const handleSubmit = () => {
    if (selectedFiles.length === 0) return;
    
    // Simula el envío de los archivos agregándolos a la lista de envíos.
    const newSubmissions = selectedFiles.map(file => ({
      name: file.name,
      date: new Date().toLocaleString(),
    }));
    setSubmittedFiles([...submittedFiles, ...newSubmissions]);
    setSelectedFiles([]);
  };

  const handleRemoveFile = (index: number) => {
    const newFiles = [...selectedFiles];
    newFiles.splice(index, 1);
    setSelectedFiles(newFiles);
  };

  const handleStartEdit = (index: number) => {
    setEditingIndex(index);
    setEditFile(null);
    setEditError('');
  };

  const handleEditFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditError('');
    const file = event.target.files && event.target.files[0];
    if (!file) return;

    if (file.size > MAX_FILE_SIZE_BYTES) {
      setEditError(`El archivo ${file.name} excede el tamaño máximo permitido (10MB).`);
      return;
    }
    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      setEditError(`El tipo de archivo ${file.name} no está permitido.`);
      return;
    }
    setEditFile(file);
  };

  const handleSaveEdit = () => {
    if (editingIndex === null || !editFile) return;
    // Actualizar la entrega simulada con el nuevo archivo.
    const updatedSubmission = {
      name: editFile.name,
      date: new Date().toLocaleString(),
    };
    const newSubmissions = submittedFiles.map((submission, index) =>
      index === editingIndex ? updatedSubmission : submission
    );
    setSubmittedFiles(newSubmissions);
    setEditingIndex(null);
    setEditFile(null);
    setEditError('');
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
    setEditFile(null);
    setEditError('');
  };

  return (
    <Box
      sx={{
        width: '100%',
        mt: 3,
        px: 2,
        // Use full width on small devices, and max 600px on medium and above.
        maxWidth: { xs: '100%', sm: 600 },
        mx: 'auto'
      }}
    >
      <Typography variant="h4" align="center" sx={{ mb: 2 }}>
        Detalles de la Actividad
      </Typography>
      <Box sx={{ border: '1px solid #ddd', borderRadius: 1, p: 2 }}>
        <Typography variant="h5" color="primary" gutterBottom>
          {schedule.activity.title}
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Box 
          sx={{ 
            mb: 2,
            fontSize: '0.95rem',
            lineHeight: 1.5, 
            color: 'text.secondary'
          }}
          dangerouslySetInnerHTML={{ __html: schedule.activity.content }}
        />
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', color: 'text.secondary', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <CalendarTodayIcon fontSize="small" />
            <Typography variant="body2">Inicio: {startDate}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <AccessTimeIcon fontSize="small" />
            <Typography variant="body2">Fin: {endDate}</Typography>
          </Box>
        </Box>
      </Box>
      
      {/* Simulación del sistema de envío de archivos y entrega de tareas */}
      <Box sx={{ mt: 4, border: '1px solid #ddd', borderRadius: 1, p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Simulación de Entrega de Tareas (Ekaanbal)
        </Typography>
        <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
          Selecciona hasta {MAX_FILE_COUNT} archivo{MAX_FILE_COUNT > 1 ? 's' : ''} (tamaño máximo de 10MB por archivo) y presiona "Enviar" para simular la entrega de tu tarea.
        </Typography>
        
        {fileError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {fileError}
          </Alert>
        )}
        
        <Button variant="outlined" component="label">
          Seleccionar Archivo(s)
          <input type="file" hidden onChange={handleFileChange} multiple />
        </Button>
        
        {selectedFiles.length > 0 && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2">Archivos seleccionados:</Typography>
            <List>
              {selectedFiles.map((file, index) => (
                <ListItem key={index} disablePadding
                  sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                >
                  <ListItemText 
                    primary={file.name} 
                    secondary={`Tamaño: ${(file.size / 1024 / 1024).toFixed(2)} MB`} 
                  />
                  <Button onClick={() => handleRemoveFile(index)} size="small" color="error">
                    Eliminar
                  </Button>
                </ListItem>
              ))}
            </List>
          </Box>
        )}
        
        <Box sx={{ mt: 2 }}>
          <Button variant="contained" disabled={selectedFiles.length === 0} onClick={handleSubmit}>
            Enviar
          </Button>
        </Box>

        {submittedFiles.length > 0 && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="subtitle1">Archivos Enviados:</Typography>
            <List>
              {submittedFiles.map((file, index) => (
                <ListItem key={index} disablePadding
                  sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                >
                  <ListItemText primary={file.name} secondary={`Enviado: ${file.date}`} />
                  {editingIndex === index ? (
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                      {editError && (
                        <Alert severity="error" sx={{ mb: 1 }}>
                          {editError}
                        </Alert>
                      )}
                      <Button variant="outlined" component="label" size="small">
                        Seleccionar Nuevo Archivo
                        <input type="file" hidden onChange={handleEditFileChange} />
                      </Button>
                      <Box sx={{ mt: 1 }}>
                        <Button variant="contained" onClick={handleSaveEdit} size="small" sx={{ mr: 1 }}>
                          Guardar
                        </Button>
                        <Button variant="outlined" onClick={handleCancelEdit} size="small">
                          Cancelar
                        </Button>
                      </Box>
                    </Box>
                  ) : (
                    <Button variant="text" onClick={() => handleStartEdit(index)} size="small">
                      Editar
                    </Button>
                  )}
                </ListItem>
              ))}
            </List>
          </Box>
        )}
      </Box>

      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', mt: 3 }}>
        <Button variant="contained" onClick={() => navigate(-1)}>
          Volver
        </Button>
      </Box>
    </Box>
  );
};

export default ActivityDetailPage;