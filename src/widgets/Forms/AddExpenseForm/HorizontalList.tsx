import { AddCircle } from '@mui/icons-material';
import { alpha, Box, Button, IconButton, useTheme } from '@mui/material';

type THorizontalListProps = {
  items: { _id: string; title: string; color?: string }[];
  disabled: boolean;
  selectedItem: string;
  setSelectedItem: (id: string) => void;
  openModal: () => void;
};

const HorizontalList = ({ items, disabled, selectedItem, setSelectedItem, openModal }: THorizontalListProps) => {
  const theme = useTheme();

  return (
    <Box pt={1} pb={0.5} sx={{ overflowX: 'auto', display: 'flex' }}>
      {items.map((item) => (
        <Button
          size="small"
          disabled={disabled}
          key={item._id}
          variant={selectedItem === item._id ? 'contained' : 'outlined'}
          color="primary"
          onClick={() => setSelectedItem(selectedItem === item._id ? '' : item._id)}
          sx={
            selectedItem === item._id
              ? {
                  backgroundColor: `${alpha(item.color || '', 0.7)}!important`,
                  color: `${theme.palette.getContrastText(item.color || '')}!important`,
                }
              : { borderColor: `${item.color}!important`, color: theme.palette.text.secondary }
          }
          style={{ marginRight: '8px', flexShrink: 0 }}
        >
          {item.title}
        </Button>
      ))}
      <IconButton size="small" disabled={disabled} color="primary" onClick={openModal}>
        <AddCircle />
      </IconButton>
    </Box>
  );
};

export default HorizontalList;
