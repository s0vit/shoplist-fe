import { createBrowserRouter, RouteObject } from 'react-router-dom';
import RoutesEnum from 'src/shared/constants/routesEnum.ts';
import rootLoader from 'src/pages/loaders/rootLoader.ts';
import { Suspense } from 'react';
import ErrorBoundary from 'src/utils/components/ErrorBoundary.tsx';
import Layout from 'src/utils/components/Layout.tsx';
import UserPage from 'src/pages/UserPage/UserPage.tsx';
import HomePage from 'src/pages/HomePage/HomePage.tsx';
import Redirector from 'src/utils/components/Redirector.tsx';
import LoginPage from 'src/pages/LoginPage/LoginPage.tsx';
import ErrorPage from 'src/pages/ErrorPage/ErrorPage.tsx';
import PasswordRecoveryPage from 'src/pages/PasswordRecoveryPage/PasswordRecoveryPage.tsx';
import NotFoundPage from 'src/pages/NotFoundPage/NotFoundPage.tsx';
import ConfirmPage from 'src/pages/ConfirmPage/ConfirmPage.tsx';
import CategoryPage from 'src/pages/CategoryPage/CategoryPage.tsx';
import PaymentSourcesPage from 'src/pages/PaymentSourcesPage/PaymentSourcesPage.tsx';
import ExpensesListMobilePage from 'src/pages/ExpensesMobilePage/ExpensesListMobilePage.tsx';

const routes: RouteObject[] = [
  {
    id: 'root',
    path: RoutesEnum.ROOT,
    loader: rootLoader,
    errorElement: <ErrorPage />,
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <ErrorBoundary>
          <Layout />
        </ErrorBoundary>
      </Suspense>
    ),
    children: [
      {
        element: <Redirector />,
        children: [
          {
            index: true,
            element: <HomePage />,
          },
          {
            path: RoutesEnum.PROFILE,
            element: <UserPage />,
          },
          {
            path: RoutesEnum.CATEGORY,
            element: <CategoryPage />,
          },
          {
            path: RoutesEnum.PAYMENT_SOURCE,
            element: <PaymentSourcesPage />,
          },
          {
            path: RoutesEnum.EXPENSES_LIST,
            element: <ExpensesListMobilePage />,
          },
        ],
      },
      {
        path: RoutesEnum.LOGIN,
        element: <LoginPage />,
      },
      {
        path: RoutesEnum.RESET_PASSWORD,
        element: <PasswordRecoveryPage />,
      },
      {
        path: RoutesEnum.CONFIRM_EMAIL,
        element: <ConfirmPage />,
      },
      {
        id: 'not-found',
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
];

const Router = createBrowserRouter(routes);

export default Router;
