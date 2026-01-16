import ClientPortal from './pages/ClientPortal';
import Home from './pages/Home';
import Portfolio from './pages/Portfolio';
import ProjectDetail from './pages/ProjectDetail';
import ProjectPortal from './pages/ProjectPortal';
import ServiceDetail from './pages/ServiceDetail';
import __Layout from './Layout.jsx';


export const PAGES = {
    "ClientPortal": ClientPortal,
    "Home": Home,
    "Portfolio": Portfolio,
    "ProjectDetail": ProjectDetail,
    "ProjectPortal": ProjectPortal,
    "ServiceDetail": ServiceDetail,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};