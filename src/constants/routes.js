export const routes = {
    AUTH: '/auth',
    HOME: '/',
    PROFILE: '/profile',
    JOBS: '/jobs',
    WELCOME: '/welcome',
    TECHS: '/techs',
    CREATE_CUSTOMER_FORM: '/create-customer',
    CREATE_TEAM_FORM: '/teams/create',
    CREATE_TECH: '/techs/create',
    REGISTER_COMPANY: '/register-company',
    AUTH_REGISTER_COMPANY: '/auth/register-company',
    CUSTOMERS: '/customers',
    CUSTOMER_PROFILE: '/customers/:customer_id',
    JOB_DETAILS: '/customers/:customer_id/:job_id',
    USERS: '/users',
    USER_PROFILE: '/users/:user_id',
};

export const privateRoutes = [
    {
        name: 'Dashboard',
        path: routes.HOME,
    },
    {
        name: 'Welcome',
        path: routes.WELCOME,
    },
    {
        name: 'Profile',
        path: routes.PROFILE,
    },
    {
        name: 'Calendar',
        path: routes.CALENDAR,
    },
    {
        name: 'Techs',
        path: routes.TECHS,
    },
    {
        name: 'Create Customer Form',
        path: routes.CREATE_CUSTOMER_FORM,
    },
    {
        name: 'Create Team Form',
        path: routes.CREATE_TEAM_FORM,
    },
    {
        name: 'Create Tech',
        path: routes.CREATE_TECH,
    },
    {
        name: 'Register Company',
        path: routes.REGISTER_COMPANY,
    },
    {
        name: 'Customers',
        path: routes.CUSTOMERS,
    },
    {
        name: 'Specific Customer',
        path: routes.CUSTOMER_PROFILE,
    },
    {
        name: 'Users',
        path: routes.USERS,
    },
    {
        name: 'Specific User',
        path: routes.USER_PROFILE,
    }
];

export const publicRoutes = [
    {
        name: 'Auth',
        path: routes.AUTH,
    },
];

export default {
    routes,
    privateRoutes,
    publicRoutes,
};
