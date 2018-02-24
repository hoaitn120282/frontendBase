import React from 'react';
import { Redirect, Switch } from 'react-router-dom';

import { EmptyLayout, AuthLayout, AdminLayout } from 'components/layout';

import { RouteLayout, PrivateRouteLayout } from 'components/common';
// import Authorization from 'components/common/Authorization';

// pages
import Page404 from 'components/pages/404';
import Page403 from 'components/pages/403';

import AccountContainer from 'modules/account/AccountContainer';
import HomePage from 'modules/home/HomeContainer';
import LoginContainer from 'modules/login/LoginContainer';
import DashboardContainer from 'modules/dashboard/DashboardContainer';

// Guard
// const AllRoleGuard = Authorization(['seller', 'agent', 'developer', 'admin']);
// const AdminGuard = Authorization(['admin']);
// const SellerGuard = Authorization(['seller']);
// const AdminDeveloperGuard = Authorization(['developer', 'admin']);
// const AdminSellerGuard = Authorization(['seller', 'admin']);
// const AdminAgentGuard = Authorization(['agent', 'admin']);
// const AdminAgentSellerGuard = Authorization(['agent', 'seller', 'admin']);
// const AdminDeveloperAgentGuard = Authorization(['agent', 'developer', 'admin']);
// const SellerDeveloperGuard = Authorization(['seller', 'developer']);

export default (
    <Switch>
        <RouteLayout exact path="/" component={HomePage} />
        <RouteLayout layout={EmptyLayout} path="/login" component={LoginContainer} />
        <PrivateRouteLayout layout={AuthLayout} path="/account" component={AccountContainer} />
        <PrivateRouteLayout layout={AdminLayout} path="/dashboard" component={DashboardContainer} />

        <RouteLayout layout={EmptyLayout} path="/404" component={Page404} />
        <PrivateRouteLayout layout={EmptyLayout} path="/403" component={Page403} />

        <Redirect from="*" to="/404" />
    </Switch>
);
