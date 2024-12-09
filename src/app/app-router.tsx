import { createBrowserRouter, Navigate } from "react-router-dom";
import { BaseLayout } from "./layouts/base-layout";
import { Home } from "@/pages/home";
import { Account } from "@/pages/account";
import { Employee } from "@/pages/employee";
import { EmployeeAdd } from "@/pages/employee-add";
import { EmployeeDetail } from "@/pages/employee-detail";
import { News } from "@/pages/news";
import { NewsAdd } from "@/pages/news-add";
import { NewsDetail } from "@/pages/news-detail";
import { Meetings } from "@/pages/meetings";
import { MeetingsDetail } from "@/pages/meetings-detail";
import { MeetingsAdd } from "@/pages/meetings-add/ui/meetings-add";
import { Calendar } from "@/pages/calendar";
import { SignIn } from "@/pages/sign-in";
import { SignUp } from "@/pages/sign-up";
import { Holidays } from "@/pages/holidays";
import { HolidaysAdd } from "@/pages/holidays-add";
import { Tasks } from "@/pages/tasks";


export const Router = () => {
  return createBrowserRouter([
    {
      path: "/",
      element: <Navigate to="home" />,
    },
    {
      children: [
        {
          path: "/signin",
          element: <SignIn />,
        },
        {
          path: "/signup/activate/:inviteId",
          element: <SignUp />,
        },
      ],
    },
    {
      element: (
          <BaseLayout />
      ),
      children: [
        {
          path: "home",
          element: <Home />,
        },
        {
          path: "tasks",
          element: <Tasks />,
        },
        {
          path: "account",
          element: <Account />,
        },
        {
          path: "employee",
          element: <Employee />,
        },
        {
          path: "employee/employee-add",
          element: <EmployeeAdd />,
        },
        {
          path: "employee/employee-detail/:id",
          element: <EmployeeDetail />,
        },
        {
          path: "holidays",
          element: <Holidays />,
        },
        {
          path: "holidays/holidays-add",
          element: <HolidaysAdd />,
        },
        {
          path: "news",
          element: <News />,
        },
        {
          path: "news/news-detail/:id",
          element: <NewsDetail />,
        },
        {
          path: "news/news-add",
          element: <NewsAdd />,
        },
        {
          path: "meetings",
          element: <Meetings />,
        },
        {
          path: "meetings/meetings-detail/:id",
          element: <MeetingsDetail />,
        },
        {
          path: "meetings/meetings-add",
          element: <MeetingsAdd />,
        },
        {
          path: "calendar",
          element: <Calendar />,
        },
      ],
    },
  ]);
};
