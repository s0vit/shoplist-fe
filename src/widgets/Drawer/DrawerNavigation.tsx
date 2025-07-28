import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from 'src/shared/ui-kit';
import { Divider } from 'src/shared/ui-kit';
import { Box } from 'src/shared/ui-kit';

import RoutesEnum from 'src/shared/constants/routesEnum.ts';
import { ReactElement, useEffect } from 'react';
import { matchPath, useLocation, useNavigate } from 'react-router-dom';
import useWindowWidth from 'src/utils/hooks/useWindowWidth.ts';
import { Icon } from 'src/shared/ui-kit';
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
  { title: 'Home', link: RoutesEnum.ROOT, icon: <Icon name="home" size="md" /> },
  { title: 'Profile', link: RoutesEnum.PROFILE, icon: <Icon name="user" size="md" /> },
  { title: 'Categories', link: RoutesEnum.CATEGORY, icon: <Icon name="menu" size="md" /> },
  { title: 'Accounts', link: RoutesEnum.PAYMENT_SOURCE, icon: <Icon name="card" size="md" /> },
];

const DrawerNavigation = ({ isDrawerOpen, setIsDrawerOpen }: TDrawerNavigationProps) => {
  const { isDesktopWidth } = useWindowWidth();
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation('translation');

  const isRouteActive = (link: string) => {
    return matchPath(location.pathname, link) !== null;
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  useEffect(() => {
    if (!isDesktopWidth && !navigationList.some((route) => route.link === RoutesEnum.EXPENSES_LIST)) {
      navigationList.push({
        title: t('Expenses'),
        link: RoutesEnum.EXPENSES_LIST,
        icon: <Icon name="coin" size="md" />,
      });
    }
  }, [isDesktopWidth, t]);

  return (
    <Drawer anchor="left" open={isDrawerOpen} onClose={closeDrawer}>
      <Box style={{ width: 250 }}>
        <List>
          {navigationList.map((route) => (
            <ListItem key={route.link} disablePadding>
              <ListItemButton
                onClick={() => {
                  navigate(route.link);
                  closeDrawer();
                }}
              >
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
