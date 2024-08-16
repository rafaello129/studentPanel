import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store/store';


export const CardListLog = () => {
    const dispatch = useDispatch<AppDispatch>(); 

 



  return (
    <div className="card">
      <div className="card-header">
        Ultimas actividades/modificaciones
      </div>
      <div className="card-body">
        <ol className="list-group list-group-numbered">
          
        </ol>
      </div>
    </div>
  );
};
