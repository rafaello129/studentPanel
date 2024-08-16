import { useMemo, useState } from 'react';
import { Class } from '../../../interfaces/class';
import { useEditClassMutation, useGetClassesQuery } from '../../../services/api/providers/classApi';
import { useGetPackagesQuery } from '../../../services/api/providers/packageApi';
import ClassList from '../../components/class/ClassList';
import CreateClassModal from '../../components/class/CreateClassModal';
import CreatePackageModal from '../../components/class/CreatePackageModal';
import EditClassModal from '../../components/class/EditClassModal';
import Button from '../../components/shared/Button';
import Loading from '../../components/shared/Loading';
import Pagination from '../../components/shared/Pagination';
import SearchBarWithButton from '../../components/shared/SearchBarWithButton';
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
  const packages = useMemo(
    () => packagesResponse?.data || [],
    [packagesResponse],
  );
  const classes = useMemo(() => classesResponse?.data || [], [classesResponse]);
  const total = useMemo(() => classesResponse?.total || 0, [classesResponse]);

  const [editClass] = useEditClassMutation();
  const [selectedClass, setSelectedClass] = useState<Class | null>(null);

  const [showCreateClassModal, setShowCreateClassModal] = useState(false);
  const [showEditClassModal, setShowEditClassModal] = useState(false);

  const [showCreatePackageModal, setShowCreatePackageModal] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      {showCreatePackageModal && (
        <CreatePackageModal
          onDismiss={() => setShowCreatePackageModal(false)}
        />
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

      <div className='d-flex flex-column p-5 gap-4'>
        <div className='col-md-6'>
          <label htmlFor='package'>Selecciona un paquete</label>

          <Select
            name='package'
            id='package'
            value={packageId}
            onChange={(e) => {
              setPackageId(+e.target.value);
              setPage(1);
            }}
          >
            <Select.Option value='0'>Todos los paquetes</Select.Option>

            {packages.map((pkg: Package) => (
              <Select.Option key={pkg.id} value={pkg.id}>
                {pkg.name}
              </Select.Option>
            ))}
          </Select>
        </div>

        <SearchBarWithButton query={searchQuery} setQuery={setSearchQuery}>
          <Button
            className='d-flex align-items-center'
            onClick={() => setShowCreateClassModal(true)}
          >
            Nueva clase <i className='fa-solid fa-plus'></i>
          </Button>

          <Button
            variant='secondary'
            className='d-flex align-items-center'
            onClick={() => setShowCreatePackageModal(true)}
          >
            Nueva paquete <i className='fa-solid fa-plus'></i>
          </Button>
        </SearchBarWithButton>

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

        <Pagination
          className='justify-content-center'
          currentPage={page}
          totalCount={total}
          pageSize={limit}
          onPageChange={setPage}
        />
      </div>
    </>
  );
}
