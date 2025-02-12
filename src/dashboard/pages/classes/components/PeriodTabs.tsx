import { Tab, Tabs } from "@mui/material";
import { Class } from "../../../../interfaces/class";

// Componente para las pestañas de período
const PeriodTabs: React.FC<{
    periods: Class[];
    selectedIndex: number;
    onTabChange: (index: number) => void;
  }> = ({ periods, selectedIndex, onTabChange }) => (
    <Tabs
      value={selectedIndex}
      onChange={(_e, v) => onTabChange(v)}
      variant="scrollable"
      scrollButtons="auto"
      sx={{
        mb: 3,
        '& .MuiTabs-indicator': {
          height: 3,
        },
      }}
    >
      {periods.map((period, index) => (
        <Tab
          key={index}
          label={period.periodName}
          sx={{
            textTransform: 'none',
            fontSize: '1rem',
            py: 1,
            px: 3,
          }}
        />
      ))}
    </Tabs>
  );
  
  export default PeriodTabs;