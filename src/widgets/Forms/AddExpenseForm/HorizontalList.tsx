import { alpha, Box, Button, useTheme } from '@mui/material';

type THorizontalListProps = {
  items: { _id: string; title: string; color?: string }[];
  disabled: boolean;
  selectedItem: string;
  setSelectedItem: (id: string) => void;
};

const HorizontalList = ({ items, disabled, selectedItem, setSelectedItem }: THorizontalListProps) => {
  const theme = useTheme();

  return (
    <Box paddingBottom={1} sx={{ overflowX: 'auto', display: 'flex' }}>
      {items.map((item) => (
        <Button
          disabled={disabled}
          key={item._id}
          variant={selectedItem === item._id ? 'contained' : 'outlined'}
          color="primary"
          onClick={() => setSelectedItem(item._id)}
          sx={
            selectedItem === item._id
              ? {
                  backgroundColor: alpha(item.color || '', 0.7),
                  color: theme.palette.getContrastText(item.color || ''),
                }
              : { borderColor: item.color }
          }
          style={{ marginRight: '8px', flexShrink: 0 }}
        >
          {item.title}
        </Button>
      ))}
    </Box>
  );
};

export default HorizontalList;
