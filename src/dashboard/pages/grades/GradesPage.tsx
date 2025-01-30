import React, { useState } from 'react';
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
  weight: number;
  feedback: string;
}

interface Theme {
  id: number;
  name: string;
  activities: Activity[];
}

const GradesPage = () => {
  const selectedClass = useSelector((state: RootState) => state.class.selectedClass);
  const [expandedThemes, setExpandedThemes] = useState<{ [key: number]: boolean }>({});

  const themes: Theme[] = [
    {
      id: 1,
      name: 'Unidad 1',
      activities: [
        { id: 1, title: 'Actividad 1.1', grade: 85, weight: 20, feedback: 'Buen trabajo' },
        { id: 2, title: 'Actividad 1.2', grade: 90, weight: 25, feedback: 'Excelente desempeño' },
      ],
    },
    {
      id: 2,
      name: 'Unidad 2',
      activities: [
        { id: 3, title: 'Actividad 2.1', grade: 78, weight: 15, feedback: 'Necesita mejorar' },
        { id: 4, title: 'Actividad 2.2', grade: 92, weight: 30, feedback: 'Muy bien hecho' },
        { id: 12, title: 'Actividad 2.3', grade: 80, weight: 10, feedback: 'Buen esfuerzo' },
        { id: 13, title: 'Actividad 2.4', grade: 90, weight: 15, feedback: 'Excelente' },
      ],
    },
    {
      id: 3,
      name: 'Unidad 3',
      activities: [
        { id: 5, title: 'Actividad 3.1', grade: 88, weight: 10, feedback: 'Buen esfuerzo' },
        { id: 6, title: 'Actividad 3.2', grade: 95, weight: 15, feedback: 'Excelente' },
        { id: 7, title: 'Actividad 3.3', grade: 80, weight: 10, feedback: 'Buen esfuerzo' },
        { id: 8, title: 'Actividad 3.4', grade: 90, weight: 15, feedback: 'Excelente' },
        { id: 9, title: 'Actividad 3.5', grade: 70, weight: 20, feedback: 'Buen esfuerzo' },
        { id: 10, title: 'Actividad 3.6', grade: 92, weight: 15, feedback: 'Excelente' },
        { id: 11, title: 'Actividad 3.7', grade: 100, weight: 15, feedback: 'Excelente' },
      ],
    },
  ];

  const allActivities = themes.flatMap(theme => theme.activities);
  const totalWeight = allActivities.reduce((sum, activity) => sum + activity.weight, 0);
  const totalGrade = allActivities.reduce((sum, activity) => sum + (activity.grade * activity.weight), 0);
  const averageGrade = totalGrade / totalWeight;

  const data = {
    labels: allActivities.map(activity => activity.title),
    datasets: [
      {
        label: 'Calificaciones',
        backgroundColor: 'rgb(195,77,84)',
        borderColor: 'rgb(240,128,128)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgb(250,128,114)',
        hoverBorderColor: 'rgb(205,92,92)',
        data: allActivities.map(activity => activity.grade),
      },
    ],
  };

  const toggleTheme = (themeId: number) => {
    setExpandedThemes(prevState => ({
      ...prevState,
      [themeId]: !prevState[themeId],
    }));
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', color: '#333' }}>
      <h1 style={{ textAlign: 'center', color: '#000' }}>Calificaciones para {selectedClass?.name}</h1>
      <div style={{ marginBottom: '20px', textAlign: 'center', fontSize: '18px' }}>
        <strong>Promedio de calificaciones: {averageGrade.toFixed(2)}</strong>
      </div>
      {themes.map(theme => {
        const themeTotalWeight = theme.activities.reduce((sum, activity) => sum + activity.weight, 0);
        const themeTotalGrade = theme.activities.reduce((sum, activity) => sum + (activity.grade * activity.weight), 0);
        const themeAverageGrade = themeTotalGrade / themeTotalWeight;
        return (
          <div key={theme.id} style={{ marginBottom: '30px' }}>
            <h2
              style={{ color: '#555', cursor: 'pointer' }}
              onClick={() => toggleTheme(theme.id)}
            >
              {theme.name}
            </h2>
            {expandedThemes[theme.id] && (
              <>
                <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '10px' }}>
                  <thead>
                    <tr>
                      <th style={{ border: '0px solid #ddd', padding: '10px', color: '#ddd', backgroundColor: '#661c37' }}>Actividad</th>
                      <th style={{ border: '0px solid #ddd', padding: '10px', color: '#ddd', backgroundColor: '#661c37' }}>Ponderación</th>
                      <th style={{ border: '0px solid #ddd', padding: '10px', color: '#ddd', backgroundColor: '#661c37' }}>Calificación</th>
                      <th style={{ border: '1px solid #ddd', padding: '10px', color: '#ddd', backgroundColor: '#661c37' }}>Porcentaje</th>
                      <th style={{ border: '1px solid #ddd', padding: '10px', color: '#ddd', backgroundColor: '#661c37' }}>Retroalimentación</th>
                      <th style={{ border: '1px solid #ddd', padding: '10px', color: '#ddd', backgroundColor: '#661c37' }}>Contribución total al curso</th>
                    </tr>
                  </thead>
                  <tbody>
                    {theme.activities.map(activity => (
                      <tr key={activity.id}>
                        <td style={{ border: '1px solid #ddd', padding: '10px', color: '#555', backgroundColor: '#f4e5e6' }}>{activity.title}</td>
                        <td style={{ border: '1px solid #ddd', padding: '10px' }}>{activity.weight}%</td>
                        <td style={{ border: '1px solid #ddd', padding: '10px' }}>{activity.grade}</td>
                        <td style={{ border: '1px solid #ddd', padding: '10px' }}>{((activity.grade / 100) * activity.weight).toFixed(2)}%</td>
                        <td style={{ border: '1px solid #ddd', padding: '10px' }}>{activity.feedback}</td>
                        <td style={{ border: '1px solid #ddd', padding: '10px' }}>{((activity.grade * activity.weight) / totalGrade * 100).toFixed(2)}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div style={{ textAlign: 'right', fontSize: '16px', color: '#000' }}>
                  <strong>Promedio de la Unidad: {themeAverageGrade.toFixed(2)}</strong>
                </div>
              </>
            )}
          </div>
        );
      })}
      <div style={{ marginTop: '30px' }}>
        <Bar data={data} />
      </div>
    </div>
  );
};

export default GradesPage;