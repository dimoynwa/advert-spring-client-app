import React from "react";

// Layout Types
import { DefaultLayout, LoginLayout } from "./layouts";

import { Redirect } from "react-router-dom";

// Route Views
import BlogOverview from "./views/BlogOverview";
import UserProfileLite from "./views/UserProfileLite";
import AddNewPost from "./views/AddNewPost";
import Errors from "./views/Errors";
import ComponentsOverview from "./views/ComponentsOverview";
import Tables from "./views/Tables";
import BlogPosts from "./views/BlogPosts";
import Login from "./views/Login";
import SignUp from './views/SignUp';
import ChangePassword from './views/ChangePassword';
import ForgotPassword from './views/ForgotPassword';
import ActivateUser from './views/ActivateUser';
import Posts from './views/Posts';
import EditJobPost from './views/EditJobPost';
import JobPostOverview from './views/JobPostOverview';
import UserProfileOverview from './views/UserProfileOverview';

import {logOut} from './utils/Services';

export default [
  {
    path: "/",
    exact: true,
    layout: LoginLayout,
    component:  () => <Redirect to="/login" />
  },
  {
    path: "/login",
    layout: LoginLayout,
    component: () => {logOut(); return (<Login />);}
  },
  {
    path: "/registration",
    layout: LoginLayout,
    component: SignUp
  },
  {
    path: "/forgot-password",
    layout: LoginLayout,
    component: ForgotPassword
  },
  {
    path: "/activateUser",
    layout: LoginLayout,
    component: ActivateUser,
  },
  {
    path: "/change-password",
    layout: DefaultLayout,
    component: ChangePassword,
    private: true
  },
  {
    path: "/dashboard",
    layout: DefaultLayout,
    component: BlogOverview,
    private: true
  },
  {
    path: "/my-posts",
    layout: DefaultLayout,
    component: () => {return (<Posts mine/>);},
    private: true
  },
  {
    path: "/post-preview/:id",
    layout: DefaultLayout,
    component: JobPostOverview,
    private: true
  },
  {
    path: "/users/:username",
    layout: DefaultLayout,
    component: UserProfileOverview,
    private: true
  },
  {
    path: "/posts",
    layout: DefaultLayout,
    component: Posts,
    private: true,
  },
  {
    path: "/edit-post/:id",
    layout: DefaultLayout,
    component: EditJobPost,
    private: true,
  },
  {
    path: "/blog-overview",
    layout: DefaultLayout,
    component: BlogOverview,
    private: true,
  },
  {
    path: "/user-profile-lite",
    layout: DefaultLayout,
    component: UserProfileLite,
    private: true,
  },
  {
    path: "/add-new-post",
    layout: DefaultLayout,
    component: AddNewPost,
    private: true,
  },
  {
    path: "/errors",
    layout: DefaultLayout,
    component: Errors,
    private: true,
  },
  {
    path: "/components-overview",
    layout: DefaultLayout,
    component: ComponentsOverview,
    private: true,
  },
  {
    path: "/tables",
    layout: DefaultLayout,
    component: Tables,
    private: true,
  },
  {
    path: "/blog-posts",
    layout: DefaultLayout,
    component: BlogPosts,
    private: true,
  }
];
