import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import CategoryIcon from '@mui/icons-material/Category';
import PeopleIcon from '@mui/icons-material/People';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import RoutesEnum from 'src/shared/constants/routesEnum.ts';
import { ReactElement } from 'react';
import { useLocation, useNavigate, matchPath } from 'react-router-dom';

type TDrawerNavigationProps = {
  isDrawerOpen: boolean;
  setIsDrawerOpen: (isOpen: boolean) => void;
};

type TNavigationItem = {
  title: string;
  link: string;
  icon: ReactElement;
};
// ROOT = '/',
// LOGIN = '/login',
// PROFILE = '/profile',
// RESET_PASSWORD = '/reset-password',
// CONFIRM_EMAIL = '/confirm',
// CATEGORY = '/category',
// PAYMENT_SOURCE = '/payment-source',
const NavigationList: Array<TNavigationItem> = [
  { title: 'Home', link: RoutesEnum.ROOT, icon: <HomeIcon /> },
  { title: 'Profile', link: RoutesEnum.PROFILE, icon: <AccountCircleIcon /> },
  { title: 'Categories', link: RoutesEnum.CATEGORY, icon: <CategoryIcon /> },
  { title: 'Accounts', link: RoutesEnum.PAYMENT_SOURCE, icon: <PeopleIcon /> },
];

const DrawerNavigation = ({ isDrawerOpen, setIsDrawerOpen }: TDrawerNavigationProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isRoutActive = (link: string) => {
    return matchPath(location.pathname, link) !== null;
  };

  return (
    <Drawer anchor="left" open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
      <Box sx={{ width: 250 }} role="presentation" onClick={() => setIsDrawerOpen(false)}>
        <List>
          {NavigationList.map((rout) => (
            <ListItem key={rout.link} disablePadding>
              <ListItemButton onClick={() => navigate(rout.link)}>
                <ListItemIcon>{rout.icon}</ListItemIcon>
                <ListItemText
                  primary={rout.title}
                  primaryTypographyProps={isRoutActive(rout.link) ? { fontWeight: 'bold' } : {}}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default DrawerNavigation;
