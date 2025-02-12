import React, { useState } from "react";
import {
  Alert,
  AlertTitle,
  Box,
  List,
  Pagination,
  Skeleton,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  useTheme
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useGetClassesByStudentIdQuery } from "../../../services/api/providers/classApi";
import { ClassOutlined, ErrorOutline } from "@mui/icons-material";
import ClassListItem from "./components/ClassListItem";
import PeriodTabs from "./components/PeriodTabs";
import EmptyState from "./components/EmptyState";

interface StudentAssignedClassesPageProps {
  studentId: number;
  page?: number;
  pageSize?: number;
  isCurrent?: boolean;
}

type ClassFilter = "active" | "finished";

const StudentAssignedClassesPage: React.FC<StudentAssignedClassesPageProps> = ({
  studentId,
  page = 1,
  pageSize = 10,
  isCurrent = true
}) => {
  const [classFilter, setClassFilter] = useState<ClassFilter>(isCurrent ? "active" : "finished");
  const [currentPage, setCurrentPage] = useState(page);
  const [selectedPeriodIndex, setSelectedPeriodIndex] = useState(0);

  const navigate = useNavigate();
  const theme = useTheme();

  // Realiza la consulta pasando el filtro según el estado actual
  const { data, isLoading, error, refetch } = useGetClassesByStudentIdQuery({
    studentId,
    page: currentPage,
    pageSize,
    isCurrent: classFilter === "active"
  });

  // Debug output
  console.log(data);

  // Maneja la navegación a la vista detallada, pasando la data de la clase en el state
  const handleViewDetails = (classData: any) => {
    navigate("/class-details", { state: { classData } });
  };

  // Maneja el cambio de página desde el componente Pagination
  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  // Maneja el cambio de filtro entre clases activas y finalizadas
  const handleClassFilterChange = (
    event: React.MouseEvent<HTMLElement>,
    newFilter: ClassFilter | null
  ) => {
    if (newFilter !== null) {
      setClassFilter(newFilter);
      // Reinicia la paginación y el índice de periodo seleccionado
      setCurrentPage(1);
      setSelectedPeriodIndex(0);
      refetch();
    }
  };

  if (isLoading) {
    return (
      <Box sx={{ mt: 4 }}>
        {[...Array(3)].map((_, i) => (
          <Skeleton
            key={i}
            variant="rectangular"
            height={120}
            sx={{ mb: 2, borderRadius: 2 }}
            animation="wave"
          />
        ))}
      </Box>
    );
  }

  if (error) {
    return (
      <EmptyState
        icon={<ErrorOutline sx={{ fontSize: 60 }} />}
        title="Error al cargar las clases"
        description="Por favor intenta nuevamente más tarde"
        sx={{ py: 8 }}
      />
    );
  }

  // periodGroups es un array de periodos agrupados según la estructura de la API
  const periodGroups = data?.data || [];

  // Calcula el total de páginas según la información meta (total de registros dividido entre el límite)
  const totalPages = data && data.limit ? Math.ceil(data.total / data.limit) : 1;

  return (
    <Box sx={{ mt: 4, px: 2 }}>
      {/* Encabezado siempre visible */}
      <Box sx={{ mb: 2, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Typography variant="h4">Mis Clases</Typography>
        <ToggleButtonGroup
          value={classFilter}
          exclusive
          onChange={handleClassFilterChange}
          size="small"
        >
          <ToggleButton value="active">Clases Activas</ToggleButton>
          <ToggleButton value="finished">Clases Finalizadas</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {/* Si no hay clases, se muestra un estado vacío, pero se mantiene el ToggleButton */}
      {periodGroups.length === 0 ? (
        <EmptyState
          icon={<ClassOutlined sx={{ fontSize: 60 }} />}
          title="No se encontraron clases"
          description={`No hay clases ${classFilter === "active" ? "actuales" : "históricas"} registradas`}
          sx={{ py: 8 }}
        />
      ) : (
        <>
          {/* Tabs para periodos */}
          <PeriodTabs
            periods={periodGroups}
            selectedIndex={selectedPeriodIndex}
            onTabChange={setSelectedPeriodIndex}
          />

          {/* Contenido del periodo seleccionado */}
          <Box sx={{ position: "relative", minHeight: 300 }}>
            {periodGroups.map((periodGroup: any, index: number) => (
              <Box
                key={index}
                role="tabpanel"
                hidden={selectedPeriodIndex !== index}
                sx={{
                  animation: selectedPeriodIndex === index ? "fadeIn 0.3s ease" : "none",
                  "@keyframes fadeIn": {
                    from: { opacity: 0, transform: "translateY(10px)" },
                    to: { opacity: 1, transform: "translateY(0)" }
                  }
                }}
              >
                {selectedPeriodIndex === index && (
                  <List disablePadding>
                    {periodGroup.classes.map((classItem: any) => (
                      <React.Fragment key={classItem.id}>
                        <ClassListItem
                          classItem={classItem}
                          onViewDetails={() => handleViewDetails(classItem)}
                        />
                      </React.Fragment>
                    ))}
                  </List>
                )}
              </Box>
            ))}
          </Box>

          {/* Paginación */}
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
            />
          </Box>

          {/* Nota informativa */}
          <Alert severity="info" sx={{ mt: 4, borderRadius: 2 }}>
            <AlertTitle>Información importante</AlertTitle>
            {classFilter === "active"
              ? "Las clases actuales pueden modificarse hasta el cierre del período académico."
              : "Las clases históricas son de consulta únicamente."}
          </Alert>
        </>
      )}
    </Box>
  );
};

export default StudentAssignedClassesPage;