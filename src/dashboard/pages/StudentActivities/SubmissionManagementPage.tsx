// src/pages/SubmissionManagementPage.tsx
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Card, CardContent, Divider, Typography, Button, TextField, Grid } from '@mui/material';
import { styled } from '@mui/system';
import { useSubmitStudentSubmissionMutation, useGetStudentSubmissionDetailsQuery, useUploadSubmissionFileMutation, useAddActivityCommentMutation } from '../../../services/api/providers/studentActivitiesApi';

const PageHeader = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  marginBottom: theme.spacing(4),
}));

const StyledCard = styled(Card)(({ theme }) => ({
  margin: theme.spacing(2, 'auto'),
  padding: theme.spacing(2),
  maxWidth: 800,
  borderRadius: theme.spacing(1),
  boxShadow: theme.shadows[3],
}));

const SubmissionManagementPage: React.FC = () => {
  // Get the scheduledActivityId from URL parameters.
  const { scheduleId } = useParams<{ scheduleId: string }>();
  // Get current student ID from localStorage.
  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;
  const studentId = user?.id;
  const navigate = useNavigate();

  // Mutation to create/update a submission.
  const [submitSubmission] = useSubmitStudentSubmissionMutation();
  const [uploadFile] = useUploadSubmissionFileMutation();
  const [addComment] = useAddActivityCommentMutation();

  // Local state values for comment and file.
  const [submissionComment, setSubmissionComment] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [activityComment, setActivityComment] = useState('');
  const [receiverId, setReceiverId] = useState<number>(0); // Assuming receiver is set by some method

  // For simplicity, load submission details (if any) using submissionId = scheduleId (or adjust as needed)
  const { data: submissionData, refetch } = useGetStudentSubmissionDetailsQuery({
    submissionId: Number(scheduleId), // Adjust if the submission ID is separate
  });

  // Handle submission creation/updation
  const handleSubmit = async () => {
    try {
      await submitSubmission({ studentId, scheduledActivityId: Number(scheduleId), comment: submissionComment });
      refetch();
    } catch (err) {
      console.error('Error submitting submission:', err);
    }
  };

  // Handle file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleFileUpload = async () => {
    if (!selectedFile) return;
    const formData = new FormData();
    formData.append('file', selectedFile);
    try {
      await uploadFile({ submissionId: Number(scheduleId), file: formData });
      refetch();
    } catch (err) {
      console.error('Error uploading file:', err);
    }
  };

  // Handle adding an activity comment
  const handleAddComment = async () => {
    try {
      await addComment({
        scheduledActivityId: Number(scheduleId),
        senderId: studentId,
        receiverId,
        message: activityComment,
      });
      setActivityComment('');
    } catch (err) {
      console.error('Error adding comment:', err);
    }
  };

  return (
    <Box sx={{ mx: 'auto', mt: 4, maxWidth: 800, p: 2 }}>
      <PageHeader>
        <Typography variant="h4">Gestión de Envíos y Comentarios</Typography>
      </PageHeader>
      <StyledCard>
        <CardContent>
          <Typography variant="h6" color="primary" gutterBottom>
            Envío de Actividad
          </Typography>
          <Divider sx={{ my: 2 }} />
          <TextField
            fullWidth
            label="Comentario del Envío"
            value={submissionComment}
            onChange={(e) => setSubmissionComment(e.target.value)}
            multiline
            rows={3}
          />
          <Box sx={{ mt: 2 }}>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Enviar Actividad
            </Button>
          </Box>
          <Divider sx={{ my: 2 }} />
          <Typography variant="h6" gutterBottom>
            Adjuntar Archivo
          </Typography>
          <input type="file" onChange={handleFileChange} />
          <Box sx={{ mt: 2 }}>
            <Button variant="contained" color="secondary" onClick={handleFileUpload}>
              Subir Archivo
            </Button>
          </Box>
          <Divider sx={{ my: 2 }} />
          <Typography variant="h6" gutterBottom>
            Agregar Comentario a la Actividad
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                type="number"
                fullWidth
                label="ID del Receptor"
                value={receiverId || ''}
                onChange={(e) => setReceiverId(Number(e.target.value))}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Comentario"
                value={activityComment}
                onChange={(e) => setActivityComment(e.target.value)}
                multiline
                rows={3}
              />
            </Grid>
          </Grid>
          <Box sx={{ mt: 2 }}>
            <Button variant="outlined" color="primary" onClick={handleAddComment}>
              Agregar Comentario
            </Button>
          </Box>
          <Divider sx={{ my: 2 }} />
          {submissionData && (
            <Box>
              <Typography variant="subtitle1" gutterBottom>
                Detalles de Envío:
              </Typography>
              <Typography variant="body2">
                Comentario: {submissionData.comment || 'No hay comentario'}
              </Typography>
              {submissionData.files.map((file) => (
                <Box key={file.id} sx={{ mt: 1, p: 1, border: '1px solid #ccc' }}>
                  <Typography variant="body2">
                    Archivo: {file.originalName} ({(file.size / 1024).toFixed(2)} KB)
                  </Typography>
                </Box>
              ))}
            </Box>
          )}
          <Box sx={{ mt: 2 }}>
            <Button variant="contained" onClick={() => navigate(-1)}>
              Volver
            </Button>
          </Box>
        </CardContent>
      </StyledCard>
    </Box>
  );
};

export default SubmissionManagementPage;