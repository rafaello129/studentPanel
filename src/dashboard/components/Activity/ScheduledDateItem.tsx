import React from 'react';
import { ListItem, ListItemText, Paper } from '@mui/material';

export interface ScheduledDateItemProps {
  sched: any;
}

const ScheduledDateItem: React.FC<ScheduledDateItemProps> = ({ sched }) => {
  return (
    <ListItem sx={{ pl: 2 }}>
      <ListItemText
        primary={
          <Paper variant="outlined" sx={{ p: 1, backgroundColor: '#f5f5f5' }}>
            {JSON.stringify(sched, null, 2)}
          </Paper>
        }
        primaryTypographyProps={{ fontSize: 14 }}
      />
    </ListItem>
  );
};

export default ScheduledDateItem;