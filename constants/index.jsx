import { BookOpen } from "lucide-react"
export const navbarLinks = [
    {
        title: 'Home',
        route: '/',
        imgUrl: '/icons/Home.svg'
    },
    {
        title: 'Instructor',
        route: '/register/instructor',
        imgUrl: '/icons/instructor.svg',
    },
    {
        title: 'Courses',
        route: '/courses',
        imgUrl: '/icons/courses.svg',
    },
    {
        title: 'Login',
        route: '/login',
        imgUrl: '/icons/login.svg',
    },
    {
        title: 'Sign up',
        route: '/register/student',
        imgUrl: '/icons/signup.svg',
    },
]

export const studentNavbarLinks = [
    {
        title: 'My Learning',
        route: '/student/my-learning',
        imgUrl: <BookOpen />,
    },
]


export const instructorNavbarLinks = [
    {
        title: 'Home',
        route: '/instructor',
        imgUrl: '/icons/Home.svg'
    },
    {
        title: 'My Courses',
        route: '/instructor/courses',
        imgUrl: '/icons/courses.svg',
    },
    {
        title: 'Profile',
        route: '/instructor/profile',
        imgUrl: '/icons/profile.svg',
    },
]


export const sidebarLinks = [
    {
        label: 'Home',
        route: '/instructor',
        imgUrl: '/icons/Home.svg',
    },

    {
        label: 'Create Course',
        route: '/instructor/course/create',
        imgUrl: '/icons/add-personal.svg',
    },

    {
        label: 'My Courses',
        route: '/instructor/course',
        imgUrl: '/icons/upcoming.svg',
    },

    {
        label: 'Wallet',
        route: '/instructor/wallet',
        imgUrl: '/icons/wallet.svg',
    },

    {
        label: 'Settings',
        route: '/instructor/settings',
        imgUrl: '/icons/settings.svg',
    }
 ]