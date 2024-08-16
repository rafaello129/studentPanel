import React from 'react';
import { Subject } from '../../../interfaces/subject';

interface SemesterCardProps {
  semester: number;
  subjects: Subject[];
  onAddSubject: (semester: number) => void;
}

const SemesterCard: React.FC<SemesterCardProps> = ({ semester, subjects, onAddSubject }) => {
  return (
    <div className="d-flex flex-row m-2">
      <div className="semester-card card">
        <span>Semestre {semester}</span>
      </div>
      {subjects.map(subject => (
        <div key={subject.id} className="subject-card card">
          <span>{subject.name}</span>
          <span>{subject.clave}</span>
        </div>
      ))}
      <button type="button" className="btn btn-outline-success btn-add-subject" onClick={() => onAddSubject(semester)}>
        <span>Agregar materia</span>
        <i className="fa-regular fa-square-plus ms-2"></i>
      </button>
    </div>
  );
};

export default React.memo(SemesterCard);
