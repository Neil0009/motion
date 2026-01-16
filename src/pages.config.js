import Home from './pages/Home';
import Portfolio from './pages/Portfolio';
import ProjectDetail from './pages/ProjectDetail';
import ServiceDetail from './pages/ServiceDetail';
import __Layout from './Layout.jsx';


export const PAGES = {
    "Home": Home,
    "Portfolio": Portfolio,
    "ProjectDetail": ProjectDetail,
    "ServiceDetail": ServiceDetail,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};