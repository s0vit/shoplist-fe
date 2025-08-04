import { useLocation, useNavigate } from 'react-router-dom';
import useUserStore from 'src/entities/user/model/store/useUserStore.ts';
import RoutesEnum from 'src/shared/constants/routesEnum.ts';
import { BottomNavigation, BottomNavigationAction, Fab } from 'src/shared/ui-kit';
import { Box, Icon } from 'src/shared/ui-kit';

import { useTranslation } from 'react-i18next';

const FootBar = () => {
  const isLoggedIn = useUserStore.use.user?.() !== undefined;
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation('translation');

  const navigationItems = [
    {
      label: 'Accounts',
      icon: <Icon name="card" size="md" />,
      route: RoutesEnum.PAYMENT_SOURCE,
    },
    {
      label: 'Expenses',
      icon: <Icon name="coin" size="md" />,
      route: RoutesEnum.EXPENSES_LIST,
    },
    {
      label: 'Profile',
      icon: <Icon name="user" size="md" />,
      route: RoutesEnum.PROFILE,
    },
    {
      label: 'Categories',
      icon: <Icon name="menu" size="md" />,
      route: RoutesEnum.CATEGORY,
    },
  ];

  return (
    isLoggedIn && (
      <Box sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1 }}>
        <BottomNavigation showLabels value={location.pathname}>
          {navigationItems.map((item) => (
            <BottomNavigationAction
              key={item.label}
              value={item.route}
              label={t(item.label)}
              icon={item.icon}
              onClick={() => navigate(item.route)}
              style={{
                border: '1px solid var(--color-text-secondary)',
                borderRadius: '8px',
                maxWidth: 'none',
              }}
            />
          ))}
        </BottomNavigation>
        {location.pathname !== RoutesEnum.ROOT && (
          <Fab
            color="success"
            onClick={() => navigate(RoutesEnum.ROOT)}
            style={{
              position: 'absolute',
              top: -28,
              left: 'calc(50% - 28px)',
              border: '1px solid var(--color-text-secondary)',
            }}
          >
            <Icon name="plus" size="md" />
          </Fab>
        )}
      </Box>
    )
  );
};

export default FootBar;
