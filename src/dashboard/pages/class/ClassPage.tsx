import { useMemo, useState } from 'react';
import { Accordion, Card } from 'react-bootstrap';
import { Class } from '../../../interfaces/class';
import { useDownloadTemplateQuery, useEditClassMutation, useGetClassesQuery, useUploadClassExcelMutation } from '../../../services/api/providers/classApi';
import { useGetPackagesQuery } from '../../../services/api/providers/packageApi';
import ClassList from '../../components/class/ClassList';
import CreateClassModal from '../../components/class/CreateClassModal';
import CreatePackageModal from '../../components/class/CreatePackageModal';
import EditClassModal from '../../components/class/EditClassModal';
import Button from '../../components/shared/Button';
import Loading from '../../components/shared/Loading';
import Pagination from '../../components/shared/Pagination';
import Select from '../../components/shared/Select';
import { usePackageQueryParams } from '../../hooks/usePackageQueryParams';
import { usePageQueryParams } from '../../hooks/usePageQueryParams';
import { Package } from '../../../interfaces/package';

export default function ClassPage() {
  const limit = 10;
  const [page, setPage] = usePageQueryParams();
  const [packageId, setPackageId] = usePackageQueryParams();
  const { data: packagesResponse } = useGetPackagesQuery({
    page: 1,
    limit: 0,
    isActive: true,
  });
  const { data: classesResponse, isLoading } = useGetClassesQuery({
    page,
    limit,
    packageId,
  });
  const packages = useMemo(() => packagesResponse?.data || [], [packagesResponse]);
  const classes = useMemo(() => classesResponse?.data || [], [classesResponse]);
  const total = useMemo(() => classesResponse?.total || 0, [classesResponse]);

  const [editClass] = useEditClassMutation();
  const [selectedClass, setSelectedClass] = useState<Class | null>(null);

  const [showCreateClassModal, setShowCreateClassModal] = useState(false);
  const [showEditClassModal, setShowEditClassModal] = useState(false);
  const [showCreatePackageModal, setShowCreatePackageModal] = useState(false);

  const { data: template } = useDownloadTemplateQuery();
  const [uploadClassExcel] = useUploadClassExcelMutation();


  if (isLoading) {
    return <Loading />;
  }


  const handleDownloadTemplate = () => {
    if (template) {
      const url = template;
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'class-template.xlsx');
      document.body.appendChild(link);
      link.click();
      link.remove();
    }
  };

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      await uploadClassExcel(formData);
    }
  };

  return (
    <>
      {showCreatePackageModal && (
        <CreatePackageModal onDismiss={() => setShowCreatePackageModal(false)} />
      )}
      {showCreateClassModal && (
        <CreateClassModal onDismiss={() => setShowCreateClassModal(false)} />
      )}
      {showEditClassModal && selectedClass && (
        <EditClassModal
          cls={selectedClass}
          onDismiss={() => setShowEditClassModal(false)}
        />
      )}

      <div className="d-flex flex-column p-4 gap-2">


        {/* Accordion for Instructions */}
        <Accordion >
          <Accordion.Item eventKey="0">
            <Accordion.Header>
              <strong>Instrucciones para Crear Clases (Haz clic para expandir)</strong>
            </Accordion.Header>
            <Accordion.Body>
              <p>
                Para poder crear nuevas clases, es necesario primero crear los paquetes,
                que funcionan como grupos de estudiantes y se asignan a una unidad específica,
                como un campus o ubicación de enseñanza. Esto permite organizar las clases
                según la unidad correspondiente.
              </p>
              <p>
                Una vez creados los paquetes, podrás crear clases asociadas a estos grupos.
                Asegúrate de seleccionar el paquete adecuado en el filtro de paquetes para ver
                solo las clases relacionadas con cada grupo.
              </p>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>

        {/* Card for Filter and Creation Buttons */}
        <Card className="p-3">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3 mb-4">
            {/* Filtro de paquetes y botones de creación */}
            <div className="d-flex flex-column flex-md-row align-items-center gap-3 col-md-12">
              <div className="col-md-6">
                <label htmlFor="package" className="form-label">Selecciona un paquete</label>
                <Select
                  name="package"
                  id="package"
                  value={packageId}
                  onChange={(e) => {
                    setPackageId(+e.target.value);
                    setPage(1);
                  }}
                >
                  <Select.Option value="0">Todos los paquetes</Select.Option>
                  {packages.map((pkg: Package) => (
                    <Select.Option key={pkg.id} value={pkg.id}>
                      {pkg.name} - {pkg.unitCampus?.name}
                    </Select.Option>
                  ))}
                </Select>
              </div>

              {/* Botones de creación */}
              <Button
                variant="success"
                className="d-flex align-items-center"
                onClick={() => setShowCreateClassModal(true)}
              >
                Nueva clase <i className="fa-solid fa-plus ms-1"></i>
              </Button>
              <Button
                variant="primary"
                className="d-flex align-items-center"
                onClick={() => setShowCreatePackageModal(true)}
              >
                Nuevo paquete <i className="fa-solid fa-plus ms-1"></i>
              </Button>
            </div>
          </div>

          {/* Sección de instrucciones y opciones de Excel */}
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
            {/* Instrucciones para carga rápida */}
            <Accordion className="col-md-8">
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  <strong>Instrucciones para Subida Rápida de Clases</strong>
                </Accordion.Header>
                <Accordion.Body>
                  <p>
                    Para subir clases en lote, descarga la plantilla de Excel, completa los datos necesarios en cada columna y luego carga el archivo de regreso aquí. Asegúrate de seguir las instrucciones en cada columna de la plantilla.
                  </p>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>

            {/* Botones de descarga y carga de plantilla */}
            <div className="d-flex gap-2">
              <Button
                variant="warning"
                className="d-flex align-items-center"
                onClick={handleDownloadTemplate}
              >
                Descargar Plantilla <i className="fa-solid fa-download ms-1"></i>
              </Button>
              <label htmlFor="uploadExcel" className="btn btn-outline-secondary d-flex align-items-center mb-0">
                Subir Excel <i className="fa-solid fa-upload ms-1"></i>
              </label>
              <input
                type="file"
                id="uploadExcel"
                onChange={handleUpload}
                style={{ display: 'none' }}
              />
            </div>
          </div>
        </Card>


        {/* Class List */}
        <ClassList
          classes={classes}
          onActiveClassChange={({ id }, isActive) =>
            editClass({ id, isCurrent: isActive })
          }
          onClassClick={(cls) => {
            setSelectedClass(cls);
            setShowEditClassModal(true);
          }}
        />

        {/* Pagination */}
        <Pagination
          className="justify-content-center"
          currentPage={page}
          totalCount={total}
          pageSize={limit}
          onPageChange={setPage}
        />
      </div>
    </>
  );
}
