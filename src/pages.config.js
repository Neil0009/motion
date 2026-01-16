import Home from './pages/Home';
import Portfolio from './pages/Portfolio';
import ProjectDetail from './pages/ProjectDetail';
import ServiceDetail from './pages/ServiceDetail';
import ClientPortal from './pages/ClientPortal';
import ProjectPortal from './pages/ProjectPortal';
import __Layout from './Layout.jsx';


export const PAGES = {
    "Home": Home,
    "Portfolio": Portfolio,
    "ProjectDetail": ProjectDetail,
    "ServiceDetail": ServiceDetail,
    "ClientPortal": ClientPortal,
    "ProjectPortal": ProjectPortal,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};