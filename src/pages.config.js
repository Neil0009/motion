import ClientPortal from './pages/ClientPortal';
import Home from './pages/Home';
import Portfolio from './pages/Portfolio';
import ProjectDetail from './pages/ProjectDetail';
import ProjectPortal from './pages/ProjectPortal';
import ServiceDetail from './pages/ServiceDetail';
import ProductAnimationService from './pages/ProductAnimationService';
import ArchitecturalService from './pages/ArchitecturalService';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import BlogEditor from './pages/BlogEditor';
import __Layout from './Layout.jsx';


export const PAGES = {
    "ClientPortal": ClientPortal,
    "Home": Home,
    "Portfolio": Portfolio,
    "ProjectDetail": ProjectDetail,
    "ProjectPortal": ProjectPortal,
    "ServiceDetail": ServiceDetail,
    "ProductAnimationService": ProductAnimationService,
    "ArchitecturalService": ArchitecturalService,
    "Blog": Blog,
    "BlogPost": BlogPost,
    "BlogEditor": BlogEditor,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};