import {Outlet} from "react-router-dom";

const Layout = () => {
    return (
        <div>
            <header>
                <h1>Shoplist</h1>
            </header>
            <div>
                <Outlet />
            </div>
        </div>
    );
}

export default Layout;