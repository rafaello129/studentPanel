import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';

export interface ActivityPreviewProps {
  content: string;
}

const ActivityPreview: React.FC<ActivityPreviewProps> = ({ content }) => {
  // Define the maximum length of the preview
  const previewLength = 200;
  const [expanded, setExpanded] = useState(false);

  const handleToggle = () => {
    setExpanded((prev) => !prev);
  };

  // Create a preview by slicing the raw HTML content.
  const previewContent =
    content.length > previewLength ? content.substring(0, previewLength) + '...' : content;

  return (
    <Box>
      <Box
        sx={{ mt: 1, mb: 2 }}
        // Render full HTML if expanded, otherwise only the preview.
        dangerouslySetInnerHTML={{ __html: expanded ? content : previewContent }}
      />
      {content.length > previewLength && (
        <Typography variant="body2" color="primary" sx={{ cursor: 'pointer' }} onClick={handleToggle}>
          {expanded ? 'Ver menos' : 'Ver más'}
        </Typography>
      )}
    </Box>
  );
};

export default ActivityPreview;