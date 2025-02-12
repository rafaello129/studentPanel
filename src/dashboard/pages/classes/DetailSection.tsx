import { Box, Typography } from "@mui/material";

// Componente auxiliar para secciones
const DetailSection: React.FC<{
    title: string;
    content: React.ReactNode;
  }> = ({ title, content }) => (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h6" gutterBottom sx={{ color: 'text.secondary' }}>
        {title}
      </Typography>
      {content}
    </Box>
  );
  
  export default DetailSection;