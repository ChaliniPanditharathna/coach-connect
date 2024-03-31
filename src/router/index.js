import { createWebHistory, createRouter } from "vue-router";
import UserLogin from "../components/UserLogin.vue";
import SignUp from "../components/SignUp.vue";
import HomePage from "../components/HomePage.vue";
import UserRegistration from "../components/UserRegistration.vue";
import InstructorHome from "../components/InstructorHome.vue";
import ClientHome from "../components/ClientHome.vue";
import AdminHome from "../components/AdminHome.vue";
const routes = [

    {
        path: "/",
        alias: "/home",
        name: "home",
        component: HomePage
    },
    {
        path: "/",
        alias: "/login",
        name: "login",
        component: UserLogin
    }
    ,
    {
        path: "/",
        alias: "/signup",
        name: "signup",
        component: SignUp
    },
    {
        path: "/",
        alias: "/register",
        name: "register",
        component: UserRegistration
    },
    {
        path: "/",
        alias: "/instructorhome",
        name: "instructorhome",
        component: InstructorHome
    },
    {
        path: "/",
        alias: "/clienthome",
        name: "clienthome",
        component: ClientHome
    },
    {
        path: "/",
        alias: "/adminhome",
        name: "adminhome",
        component: AdminHome
    }
    ,
    {
        path: "/",
        alias: "/instructor",
        name: "instructor",
        component: UserLogin
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
