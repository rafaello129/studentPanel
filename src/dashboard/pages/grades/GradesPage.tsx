// src/pages/grades/GradesPage.tsx
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { RootState } from '../../../store/store';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface Activity {
  id: number;
  title: string;
  grade: number;
}

const GradesPage = () => {
  const selectedClass = useSelector((state: RootState) => state.class.selectedClass);

  const activities: Activity[] = [
    { id: 1, title: 'Actividad 1', grade: 85 },
    { id: 2, title: 'Actividad 2', grade: 90 },
    { id: 3, title: 'Actividad 3', grade: 78 },
    { id: 4, title: 'Actividad 4', grade: 92 },
    { id: 5, title: 'Actividad 5', grade: 88 },
  ];

  const averageGrade = activities.reduce((sum, activity) => sum + activity.grade, 0) / activities.length;

  const data = {
    labels: activities.map(activity => activity.title),
    datasets: [
      {
        label: 'Calificaciones',
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(75,192,192,0.6)',
        hoverBorderColor: 'rgba(75,192,192,1)',
        data: activities.map(activity => activity.grade),
      },
    ],
  };

  return (
    <div>
      <h1>Calificaciones para {selectedClass?.name}</h1>
      <div style={{ marginBottom: '20px' }}>
        <strong>Promedio de calificaciones: {averageGrade.toFixed(2)}</strong>
      </div>
      <Bar data={data} />
      <table style={{ width: '100%', marginTop: '20px', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Actividad</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Calificación</th>
          </tr>
        </thead>
        <tbody>
          {activities.map(activity => (
            <tr key={activity.id}>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{activity.title}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{activity.grade}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GradesPage;