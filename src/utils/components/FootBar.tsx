import { Money, Payments } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import CategoryIcon from '@mui/icons-material/Category';
import PersonIcon from '@mui/icons-material/Person';
import { BottomNavigation, BottomNavigationAction, Box, Fab, useTheme } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import useUserStore from 'src/entities/user/model/store/useUserStore.ts';
import RoutesEnum from 'src/shared/constants/routesEnum.ts';

const FootBar = () => {
  const isLoggedIn = useUserStore.use.user?.() !== undefined;
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();

  const navigationItems = [
    {
      label: 'Sources',
      icon: <Payments />,
      route: RoutesEnum.PAYMENT_SOURCE,
    },
    {
      label: 'List',
      icon: <Money />,
      route: RoutesEnum.EXPENSES_LIST,
    },
    {
      label: 'Profile',
      icon: <PersonIcon />,
      route: RoutesEnum.PROFILE,
    },
    {
      label: 'Categories',
      icon: <CategoryIcon />,
      route: RoutesEnum.CATEGORY,
    },
  ];

  return (
    isLoggedIn && (
      <Box sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}>
        <BottomNavigation showLabels>
          {navigationItems.map((item) => (
            <BottomNavigationAction
              disabled={location.pathname === item.route}
              key={item.label}
              label={item.label}
              icon={item.icon}
              onClick={() => navigate(item.route)}
              sx={{
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: theme.spacing(1),
                maxWidth: 'none',
              }}
            />
          ))}
        </BottomNavigation>
        <Fab
          disabled={location.pathname === RoutesEnum.ROOT}
          color="success"
          sx={{
            position: 'absolute',
            top: -28,
            left: 'calc(50% - 28px)',
            border: `1px solid ${theme.palette.divider}`,
            '&.Mui-disabled': {
              backgroundColor: theme.palette.grey[800],
              color: theme.palette.grey[300],
            },
          }}
          onClick={() => navigate(RoutesEnum.ROOT)}
        >
          <AddIcon />
        </Fab>
      </Box>
    )
  );
};

export default FootBar;
