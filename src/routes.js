import Dashboard from '@material-ui/icons/Dashboard';
//import Person from '@material-ui/icons/Person';
import Person from '@material-ui/icons/LocalLibraryOutlined';
import LibraryBooksOutlined from '@material-ui/icons/LibraryBooksOutlined';

// core components/views for Admin layout
import DashboardPage from 'views/Dashboard/Dashboard';
import Student from 'views/Student/Student';
import TableList from 'views/TableList/TableList';

// core components/views for RTL layout

const dashboardRoutes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    title: 'Dashboard',
    icon: Dashboard,
    component: DashboardPage,
    layout: '/admin',
  },
  {
    path: '/aluno',
    name: 'Aluno',
    title: 'Controle de aluno',
    icon: Person,
    component: Student,
    layout: '/admin',
  },
  {
    path: '/table',
    name: 'Tabelas',
    title: 'Tabelas primárias',
    icon: LibraryBooksOutlined,
    //icon: 'content_paste',
    component: TableList,
    layout: '/admin',
  },
];

export default dashboardRoutes;
