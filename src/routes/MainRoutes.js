import React, {lazy} from 'react';
import {Route, Switch, useLocation} from 'react-router-dom';
import MainLayout from './../layout/MainLayout';

const DashboardDefault = lazy(() => import('../views/dashboard/Default'));
const LifeTimeMembers = lazy(() => import('../views/lifetimemembers/LifeTimeMembers'));
const PatronMembers = lazy(() => import('../views/patronmembers/PatronMembers'));
const PendingMID = lazy(() => import('../views/pendingmid/PendingMID'));
const NewRegister = lazy(() => import('../views/newregister/NewRegister'));
const SamajEvents = lazy(() => import('../views/samajevents/SamaJEvents'));
const MahilaEvents = lazy(() => import('../views/mahilaevents/MahilaEvents'));
const NewMID = lazy(() => import('../views/newmid/NewMID'));
const MemberView = lazy(() => import('../views/memberview/MemberView'));
const FamilyMemberList = lazy(() => import('../views/familymember/FamilyMemberList'));
const FamilyMemberAdd = lazy(() => import('../views/familymember/FamilyMemberAdd'));
const FamilyMemberEdit = lazy(() => import('../views/familymember/FamilyMemberEdit'));
const Developer = lazy(() => import('../views/developer/Developer'));
const ProfileEdit = lazy(() => import('../views/profileedit/ProfileEdit'));
const Commingsoon = lazy(() => import('../views/comingsoon'));

const MainRoutes = () => {
    const location = useLocation();

    return (
        <Route
            path={[
                '/dashboard',
                '/life-time-members',
                '/patron-members',
                '/pending-mid',
                '/new-register',
                '/samaj-events',
                '/mahila-events',
                '/new-mid-assign',
                '/member-view',
                '/family-member-list',
                '/family-member-add',
                '/family-member-edit',
                '/developer',
                '/profile-edit',
                '/commingsoon',
                
            ]}
        >
            <MainLayout showBreadcrumb={true}>
                <Switch location={location} key={location.pathname}>
                    <Route path="/dashboard" component={DashboardDefault} />
                    <Route path='/life-time-members' component={LifeTimeMembers}/>
                    <Route path='/patron-members' component={PatronMembers}/>
                    <Route path='/pending-mid' component={PendingMID}/>
                    <Route path='/new-register' component={NewRegister}/>
                    <Route path='/samaj-events' component={SamajEvents}/>
                    <Route path='/mahila-events' component={MahilaEvents}/>
                    <Route path='/new-mid-assign' component={NewMID}/>
                    <Route path='/member-view' component={MemberView}/>
                    <Route path='/family-member-list' component={FamilyMemberList}/>
                    <Route path='/family-member-add' component={FamilyMemberAdd}/>
                    <Route path='/family-member-edit' component={FamilyMemberEdit}/>
                    <Route path='/developer' component={Developer}/>
                    <Route path='/profile-edit' component={ProfileEdit}/>
                    <Route path='/commingsoon' component={Commingsoon}/>
                </Switch>
            </MainLayout>
        </Route>
    );
};

export default MainRoutes;
