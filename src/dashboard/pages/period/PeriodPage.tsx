import React from 'react';
import PeriodTable from '../../components/period/PeriodTable';

const PeriodPage = () => {
  return (
    <div className="mt-3 card shadow-sm p-1">
      <h2 className="mb-4 text-center text-muted">Gestión de Periodos y Subperiodos</h2>
      <div className=" p-4 bg-white rounded w-75 mx-auto">
        <PeriodTable />
      </div>
    </div>
  );
};

export default PeriodPage;
