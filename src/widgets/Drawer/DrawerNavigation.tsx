import { Box, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import CategoryIcon from '@mui/icons-material/Category';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import RoutesEnum from 'src/shared/constants/routesEnum.ts';
import { ReactElement, useEffect } from 'react';
import { matchPath, useLocation, useNavigate } from 'react-router-dom';
import useWindowWidth from 'src/utils/hooks/useWindowWidth.ts';
import { Money, Payments } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

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
  { title: 'Accounts', link: RoutesEnum.PAYMENT_SOURCE, icon: <Payments /> },
];

const DrawerNavigation = ({ isDrawerOpen, setIsDrawerOpen }: TDrawerNavigationProps) => {
  const { isDesktopWidth } = useWindowWidth();
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation('tools');

  const isRouteActive = (link: string) => {
    return matchPath(location.pathname, link) !== null;
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  useEffect(() => {
    if (!isDesktopWidth && !navigationList.some((route) => route.link === RoutesEnum.EXPENSES_LIST)) {
      navigationList.push({ title: 'Expenses', link: RoutesEnum.EXPENSES_LIST, icon: <Money /> });
    }
  }, [isDesktopWidth]);

  return (
    <Drawer anchor="left" open={isDrawerOpen} onClose={closeDrawer}>
      <Box sx={{ width: 250 }} onClick={closeDrawer}>
        <List>
          {navigationList.map((route) => (
            <ListItem key={route.link} disablePadding>
              <ListItemButton onClick={() => navigate(route.link)}>
                <ListItemIcon>{route.icon}</ListItemIcon>
                <ListItemText
                  primary={t(route.title)}
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
