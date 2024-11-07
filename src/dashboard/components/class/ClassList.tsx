import { Class } from '../../../interfaces/class';
import Button from '../shared/Button';
import question from '../../../assets/icons/question.svg';

type ClassListProps = {
  classes: Class[];
  onActiveClassChange: (cls: Class, isActive: boolean) => void;
  onClassClick: (cls: Class) => void;
};

export default function ClassList({
  classes,
  onActiveClassChange,
  onClassClick,
}: ClassListProps) {
  if (classes.length === 0) {
    return (
      <div className="mt-3 p-2 text-center">
        <div className="d-flex justify-content-center mt-5">
          <img src={question} alt="escudo-y-logo" width={180} style={{ borderRadius: 10 }} />
        </div>
        No hay clases creadas.
      </div>
    );
  }
  return (
    
    <div className='card'>
      <table className='table text-center'>
        <thead>
          <tr>
            <th scope='col'>Paquete</th>
            <th scope='col'>Materia</th>
            <th scope='col'>Maestro</th>
            <th scope='col'>Tutor</th>
            <th scope='col'>Editar</th>
          </tr>
        </thead>
        <tbody>
          {classes.map((cls) => (
            <tr key={cls.id}>
              <td>{cls.package.name}</td>
              <td>{cls.subject.name}</td>
              <td>{cls.teacher.user.fullName}</td>
              {cls.tutor ? (<td>{cls.tutor.user.fullName}</td>):(<td>Sin asignar</td>)}
              <td>
                <Button size='small' onClick={() => onClassClick(cls)}>
                  <span className='fa-solid fa-pen'></span>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
