import { createWebHistory, createRouter } from "vue-router";
import UserLogin from "../components/UserLogin.vue";
import SignUp from "../components/SignUp.vue";
import HomePage from "../components/HomePage.vue";
import InstructorHome from "../components/InstructorHome.vue";
import ClientHome from "../components/ClientHome.vue";
import AdminHome from "../components/AdminHome.vue";
import UserRegistration from "../components/UserRegistration.vue";
import UserProfile from "@/components/UserProfile.vue";
import ClientProfileUpdate from "@/components/ClientProfileUpdate.vue";
import AppointmentList from "../components/AppointmentList.vue";
import InstructorProfileUpdate from "@/components/InstructorProfileUpdate.vue";

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
        alias: "/profile",
        name: "profile",
        component: UserProfile
      },
      {
        path: "/update-profile-client",
        name: "UpdateProfileClient",
        component: ClientProfileUpdate,
      },
      {
        path: "/update-profile-instructor",
        name: "UpdateProfileInstructor",
        component: InstructorProfileUpdate,
      },      
    {
        path: "/",
        alias: "/instructor",
        name: "instructor",
        component: UserLogin
    },
    {
        path: "/",
        alias: "/appointment",
        name: "appointment",
        component: AppointmentList
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
