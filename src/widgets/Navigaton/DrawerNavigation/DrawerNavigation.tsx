import { Box, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
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

const navigationList: Array<TNavigationItem> = [
  { title: 'Home', link: RoutesEnum.ROOT, icon: <HomeIcon /> },
  { title: 'Profile', link: RoutesEnum.PROFILE, icon: <AccountCircleIcon /> },
  { title: 'Categories', link: RoutesEnum.CATEGORY, icon: <CategoryIcon /> },
  { title: 'Accounts', link: RoutesEnum.PAYMENT_SOURCE, icon: <PeopleIcon /> },
];

const DrawerNavigation = ({ isDrawerOpen, setIsDrawerOpen }: TDrawerNavigationProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isRouteActive = (link: string) => {
    return matchPath(location.pathname, link) !== null;
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  return (
    <Drawer anchor="left" open={isDrawerOpen} onClose={closeDrawer}>
      <Box sx={{ width: 250 }} onClick={closeDrawer}>
        <List>
          {navigationList.map((route) => (
            <ListItem key={route.link} disablePadding>
              <ListItemButton onClick={() => navigate(route.link)}>
                <ListItemIcon>{route.icon}</ListItemIcon>
                <ListItemText
                  primary={route.title}
                  primaryTypographyProps={isRouteActive(route.link) ? { fontWeight: 'bold' } : {}}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
      <Divider />
    </Drawer>
  );
};

export default DrawerNavigation;
