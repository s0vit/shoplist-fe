import { useLocation, useNavigate } from 'react-router-dom';
import useUserStore from 'src/entities/user/model/store/useUserStore.ts';
import RoutesEnum from 'src/shared/constants/routesEnum.ts';
import { BottomNavigation, BottomNavigationAction, Fab } from 'src/shared/ui-kit';
import { Box, Icon, IconButton } from 'src/shared/ui-kit';

import { useTranslation } from 'react-i18next';

const FootBar = () => {
  const isLoggedIn = useUserStore.use.user?.() !== undefined;
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation('translation');

  const navigationItems = [
    {
      label: 'Accounts',
      iconName: 'card' as const,
      route: RoutesEnum.PAYMENT_SOURCE,
    },
    {
      label: 'Expenses',
      iconName: 'coin' as const,
      route: RoutesEnum.EXPENSES_LIST,
    },
    {
      label: 'Profile',
      iconName: 'user' as const,
      route: RoutesEnum.PROFILE,
    },
    {
      label: 'Categories',
      iconName: 'menu' as const,
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
              icon={
                <IconButton
                  variant={location.pathname === item.route ? 'contained' : 'text'}
                  width="48px"
                  height="48px"
                  onClick={() => navigate(item.route)}
                  style={{
                    borderRadius: '12px',
                  }}
                >
                  <Icon name={item.iconName} size="md" />
                </IconButton>
              }
              onClick={() => navigate(item.route)}
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
