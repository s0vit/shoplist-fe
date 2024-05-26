import useUserStore from "src/entities/user/model/store/useUserStore.ts";
import selectUserEmail from "src/entities/user/model/selectors/selectUserEmail.ts";
import {RoutesEnum} from "src/shared/constants/routesEnum.ts";
import {Navigate, Outlet} from "react-router-dom";

const Redirector = () => {
    const email = useUserStore(selectUserEmail);

    const isLoggedIn = !!email;
    const from = `to=${location.pathname}${location.search}`;

    if (!isLoggedIn) {
        return (
            <Navigate
                to={{
                    pathname: RoutesEnum.Login,
                    search: from,
                }}
            />
        );
    }

    return <Outlet />;
}

export default Redirector;