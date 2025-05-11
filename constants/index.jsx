import { BookOpen, LayoutDashboard, Settings2, UserPlus, Bot, LogIn } from "lucide-react"
export const navbarLinks = [
    {
        title: 'Interview',
        route: '/student/interviews',
        imgUrl: <Bot />

    },
    {
        title: 'Login',
        route: '/login',
        imgUrl: <LogIn />,
    },
    {
        title: 'Sign up',
        route: '/register/student',
        imgUrl: <UserPlus />,
    },
]

export const studentNavbarLinks = [
    {
        title: 'My Learning',
        route: '/student/my-learning',
        imgUrl: <BookOpen />,
    },

    {
        title: 'Interview',
        route: '/student/interviews',
        imgUrl: <Bot />

    }
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
        label: 'Dashboard',
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


export const faqs = [
    {
      question: "What is Skillexa?",
      answer:
        "Skillexa is an e-learning platform offering expert-led courses in web development, cybersecurity, data science, cloud computing, and more. It also provides AI-driven mock interviews to help you prepare for real-world job interviews."
    },
    {
      question: "How does the AI mock interview work?",
      answer:
        "Our AI mock interviews simulate real-world interview scenarios via voice calls. You’ll receive instant feedback on your performance, helping you improve your skills and confidence."
    },
    {
      question: "Can I become an instructor on Skillexa?",
      answer:
        "Yes! Skillexa allows experts to create and share courses. You can register as an instructor, create courses, and earn money by sharing your knowledge."
    },
    {
      question: "What types of courses are available?",
      answer:
        "We offer courses in web development, cybersecurity, data science, mobile development, cloud computing, machine learning, and more. Our courses are designed to help you upskill and advance your career."
    },
    {
      question: "Is there a free trial available?",
      answer:
        "Yes, Skillexa offers a free trial for selected courses. You can explore the platform and decide if it’s the right fit for your learning needs."
    }
];



// course related 
export const CourseStatus = {
    DRAFT: 0,
    PENDING: 1,
    PUBLISHED: 2,
    ARCHIVED: 3,
}

export const CourseStatusLabel = {
    [CourseStatus.DRAFT]: "Draft",
    [CourseStatus.PENDING]: "Pending",
    [CourseStatus.PUBLISHED]: "Published",
    [CourseStatus.ARCHIVED]: "Archived",
};

export const LEVELS = {
    BEGINNER: 1,
    INTERMEDIATE: 2,
    ADVANCED: 3,
    ALL: 4,
}

export const CourseLevels = {
    [LEVELS.BEGINNER]: "Beginner",
    [LEVELS.INTERMEDIATE]: "Intermediate",
    [LEVELS.ADVANCED]: "Advanced",
    [LEVELS.ALL]: "All Levels",
};

export const courseFallbackImgUrl = "/images/home-image.avif";



