import {createBrowserRouter, RouteObject} from "react-router-dom";
import {RoutesEnum} from "src/shared/constants/routesEnum.ts";
import {rootLoader} from "src/pages/loaders/rootLoader.ts";
import {Suspense} from "react";
import ErrorBoundary from "src/utils/components/ErrorBoundary.tsx";
import Layout from "src/utils/components/Layout.tsx";
import UserPage from "src/pages/UserPage/UserPage.tsx";
import HomePage from "src/pages/HomePage/HomePage.tsx";
import Redirector from "src/utils/components/Redirector.tsx";
import LoginPage from "src/pages/LoginPage/LoginPage.tsx";
import ErrorPage from "src/pages/ErrorPage/ErrorPage.tsx";

const routes: RouteObject[] = [
    {
        id: "root",
        path: RoutesEnum.Root,
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
                        path: RoutesEnum.Profile,
                        element: <UserPage />,
                    },
                ]
            },
            {
                path: RoutesEnum.Login,
                element: <LoginPage />
            },
            {
                id: "not-found",
                path: "*",
                element: <div>Not found</div>
            }
            ]
    }
]

export const Router = createBrowserRouter(routes);