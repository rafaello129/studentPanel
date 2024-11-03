// src/components/MyEvaluationDetail.tsx
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import MySection from './MySection';
import { useDispatch, useSelector } from 'react-redux';
import { useGetEvaluationQuery } from '../../../services/api/providers/evaluationApi';
import { useSubmitEvaluationMutation } from '../../../services/api/providers/userResponseApi';
import { setEvaluationId, resetResponses, setAnswer } from '../../../store/slices/responseSlice';
import { RootState } from '../../../store/store';


const MyEvaluationDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const evaluationId = Number(id);
  const { data, error, isLoading } = useGetEvaluationQuery(evaluationId);
  const [submitEvaluation, { isLoading: isSubmitting }] =
    useSubmitEvaluationMutation();
  const dispatch = useDispatch();
  const answers = useSelector((state: RootState) => state.responses.answers);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setEvaluationId(evaluationId));
    return () => {
      dispatch(resetResponses());
    };
  }, [dispatch, evaluationId]);

  if (isLoading) return <div>Cargando evaluación...</div>;
  if (error) return <div>Error al cargar la evaluación.</div>;
  if (!data?.data) return <div>No se encontró la evaluación.</div>;

  const handleAnswerChange = (questionId: number, answer: any) => {
    dispatch(setAnswer({ questionId, answer }));
  };

  const handleSubmit = async () => {
    const submission = {
      evaluationId,
      classId: data.data.classes[0]?.id || 0,
      answers: Object.entries(answers).map(([questionId, answer]) => ({
        questionId: Number(questionId),
        ...answer,
      })),
    };

    try {
      await submitEvaluation(submission).unwrap();
      alert('Evaluación enviada correctamente.');
      navigate('/');
    } catch (err) {
      console.error('Error al enviar la evaluación:', err);
      alert('Error al enviar la evaluación.');
    }
  };

  return (
    <div>
      <h1>{data.data.title}</h1>
      <p>{data.data.description}</p>
      {data.data.sections.map((section) => (
        <MySection
          key={section.id}
          section={section}
          onAnswerChange={handleAnswerChange}
          existingAnswers={answers}
        />
      ))}
      <button onClick={handleSubmit} disabled={isSubmitting}>
        {isSubmitting ? 'Enviando...' : 'Enviar Evaluación'}
      </button>
    </div>
  );
};

export default MyEvaluationDetail;
