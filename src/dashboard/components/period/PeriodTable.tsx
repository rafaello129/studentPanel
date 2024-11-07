import React, { useState } from 'react';
import { Accordion, Badge, Button, Table, Alert, Card } from 'react-bootstrap';
import SubperiodRow from './SubperiodRow';
import CreatePeriodModal from './CreatePeriodModal';
import {
  useGetPeriodsQuery,
  useCreatePeriodMutation,
  useActivatePeriodMutation,
  useDeactivatePeriodMutation
} from '../../../services/api/providers/periodApi';
import CreateSubperiodModal from './createSubperiodModal';
import periodIcon from '../../../assets/icons/periodo-icon.png';

const PeriodTable = () => {
  const { data, error, isLoading, refetch } = useGetPeriodsQuery();
  const [createPeriod] = useCreatePeriodMutation();
  const [activatePeriod] = useActivatePeriodMutation();
  const [deactivatePeriod] = useDeactivatePeriodMutation();
  const [showPeriodModal, setShowPeriodModal] = useState(false);
  const [showSubperiodModal, setShowSubperiodModal] = useState(false);
  const [selectedPeriodId, setSelectedPeriodId] = useState<number | null>(null);

  if (isLoading) return <p>Cargando...</p>;
  if (error) return <p>Error al cargar los periodos</p>;

  const handleSavePeriod = async (newPeriodData) => {
    await createPeriod(newPeriodData);
    refetch();
    setShowPeriodModal(false);
  };

  const handleOpenSubperiodModal = (periodId: number) => {
    setSelectedPeriodId(periodId);
    setShowSubperiodModal(true);
  };

  const handleActivatePeriod = async (id: number) => {
    await activatePeriod(id);
    refetch();
  };

  const handleDeactivatePeriod = async (id: number) => {
    await deactivatePeriod(id);
    refetch();
  };

  return (
    <>
      <Card className="p-2 mb-4">
        <Alert variant="info">
          <strong>Instrucciones:</strong> Para gestionar los periodos y subperiodos, primero cree un nuevo periodo utilizando el botón "Crear Periodo". Una vez creado, puede agregar subperiodos y activar o desactivar periodos y subperiodos según sea necesario. Solo un periodo puede estar activo a la vez, y cada subperiodo depende del estado del periodo principal.
          <br /> <br />
          <strong>Nota:</strong> Las clases vinculadas solo estarán activas cuando tanto el periodo como el subperiodo correspondiente estén activos, así como las entidades relacionadas necesarias. Si no ve todas las clases esperadas, verifique el estado de activación del periodo y los subperiodos asociados o contacte al administrador.
        </Alert>
        <div className="d-flex justify-content-center mb-4">
          <Button variant="primary" onClick={() => setShowPeriodModal(true)} className="px-4 py-2 d-flex align-items-center gap-1">
            <i className="fa-solid fa-calendar-plus"></i> Crear Periodo
          </Button>
        </div>
      </Card>

      <CreatePeriodModal
        show={showPeriodModal}
        onHide={() => setShowPeriodModal(false)}
        onSave={handleSavePeriod}
      />

      <CreateSubperiodModal
        show={showSubperiodModal}
        onHide={() => setShowSubperiodModal(false)}
        periodId={selectedPeriodId}
        onSave={() => refetch()}
      />

      <Accordion defaultActiveKey="0">
        {Array.isArray(data) && data.map((period, index) => (
          <Accordion.Item eventKey={index.toString()} key={period.id}>
            <Accordion.Header>
            <img
                  style={{ borderRadius: '100%' }}
                  width='35'
                  className='me-2'
                  src={periodIcon}
                  alt='unit image'
                />
              <strong>{period.name}</strong>
              <Badge
                bg={period.isCurrent ? "success" : "danger"}
                className="ms-2"
              >
                {period.isCurrent ? "Activo" : "Inactivo"}
              </Badge>
            </Accordion.Header>
            <Accordion.Body>
              <div className="d-flex flex-column mb-3">
                <div><strong>Clave:</strong> {period.key}</div>
                <div><strong>Fecha de inicio:</strong> {new Date(period.startDate).toLocaleDateString()}</div>
                <div><strong>Fecha de fin:</strong> {new Date(period.endDate).toLocaleDateString()}</div>
              </div>
              <div className="d-flex justify-content-end mb-3 gap-2">
                <Button
                  variant="warning"
                  size="sm"
                  onClick={() => handleOpenSubperiodModal(period.id)}
                  disabled={!period.isCurrent}
                  className="d-flex align-items-center gap-1"
                >
                  <i className="fa-solid fa-plus"></i> Crear Subperiodo
                </Button>
                <Button
                  variant="success"
                  size="sm"
                  onClick={() => handleActivatePeriod(period.id)}
                  disabled={period.isCurrent}
                  className="d-flex align-items-center gap-1"
                >
                  <i className="fa-solid fa-check-circle"></i> Activar
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDeactivatePeriod(period.id)}
                  disabled={!period.isCurrent}
                  className="d-flex align-items-center gap-1"
                >
                  <i className="fa-solid fa-times-circle"></i> Desactivar
                </Button>
              </div>

              <Table bordered hover responsive className="mt-3">
                <thead className="table-light">
                  <tr>
                    <th>Nombre del Subperiodo</th>
                    <th>Clave</th>
                    <th>Fecha de inicio</th>
                    <th>Fecha de fin</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  <SubperiodRow subperiods={period.subperiods} isPeriodActive={period.isCurrent} />
                </tbody>
              </Table>
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </>
  );
};

export default PeriodTable;
