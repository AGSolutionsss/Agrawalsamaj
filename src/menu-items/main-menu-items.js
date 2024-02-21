import React from 'react';
import {FormattedMessage} from 'react-intl';

import {
    IconAtom,
    IconBasket,
    IconBellRinging,
    IconBorderAll,
    IconBorderRadius,
    IconBoxMultiple,
    IconBrandChrome,
    IconBrandGravatar,
    IconBrush,
    IconBug,
    IconCalendar,
    IconChartArcs,
    IconChartCandle,
    IconChartInfographic,
    IconCircle,
    IconCircleOff,
    IconClipboardList,
    IconDashboard,
    IconDeviceAnalytics,
    IconFiles,
    IconForms,
    IconHelp,
    IconId,
    IconKey,
    IconLayoutList,
    IconLoader,
    IconLockAccess,
    IconMail,
    IconMenu,
    IconMessages,
    IconNfc,
    IconPalette,
    IconPencil,
    IconPhoneCall,
    IconPictureInPicture,
    IconReceipt2,
    IconRun,
    IconShadow,
    IconShape,
    IconShieldLock,
    IconSitemap,
    IconTools,
    IconTypography,
    IconUser,
    IconUserCheck,
    IconUserPlus,
    IconUsers,
    IconWoman
} from '@tabler/icons';

const icons = {
    IconDashboard: IconDashboard,
    IconDeviceAnalytics,

    IconChartArcs: IconChartArcs,
    IconClipboardList: IconClipboardList,
    IconChartInfographic: IconChartInfographic,

    IconForms: IconForms,
    IconReceipt2: IconReceipt2,
    IconPencil: IconPencil,
    IconPalette: IconPalette,
    IconShadow: IconShadow,
    IconPhoneCall: IconPhoneCall,
    IconBrandChrome: IconBrandChrome,
    IconFiles: IconFiles,
    IconAtom: IconAtom,
    IconTools: IconTools,
    IconBrush: IconBrush,
    IconLockAccess: IconLockAccess,
    IconShieldLock: IconShieldLock,
    IconKey: IconKey,
    IconTypography: IconTypography,
    IconMenu: IconMenu,
    IconBoxMultiple: IconBoxMultiple,
    IconCircleOff: IconCircleOff,
    IconCircle: IconCircle,
    IconBorderRadius: IconBorderRadius,
    IconBrandGravatar: IconBrandGravatar,
    IconShape: IconShape,
    IconUserCheck: IconUserCheck,
    IconUserPlus: IconUserPlus,
    IconId: IconId,
    IconLayoutList: IconLayoutList,
    IconBug: IconBug,
    IconLoader: IconLoader,
    IconRun: IconRun,
    IconUser: IconUser,
    IconHelp: IconHelp,
    IconSitemap: IconSitemap,
    IconPictureInPicture: IconPictureInPicture,
    IconMail: IconMail,
    IconMessages: IconMessages,
    IconNfc: IconNfc,
    IconCalendar: IconCalendar,
    IconBellRinging: IconBellRinging,
    IconBorderAll: IconBorderAll,
    IconChartCandle: IconChartCandle,
    IconBasket: IconBasket,
    IconUsers: IconUsers,
    IconWoman: IconWoman,
};



    const menuItems1 = {
        items: [
            {
                
                id: 'dashboard',
                title: <FormattedMessage id="dashboard" />,
                type: 'group',
                children: [
                    {
                        id: 'dash-default',
                        title: <FormattedMessage id="Dashboard" />,
                        type: 'item',
                        url: '/dashboard',
                        icon: icons['IconDashboard'],
                        breadcrumbs: false
                    },
                    {
                        id: 'commingsoon',
                        title: <FormattedMessage id="Profile" />,
                        type: 'item',
                        url: '/profile-edit',
                        icon: icons['IconUser'],
                        
                    },
                    {
                        id: 'member',
                        title: <FormattedMessage id="Family Member" />,
                        type: 'item',
                        url: '/family-member-list',
                        icon: icons['IconUsers'],
                        
                    },
                ]
            },
            {
                id: 'utilities',
                title: <FormattedMessage id="Events" />,
                type: 'group',
                children: [
                    {
                        id: 'sample-page',
                        title: <FormattedMessage id="Samaj" />,
                        type: 'item',
                        url: '/samaj-events',
                        icon: icons['IconBrandChrome']
                    },
                    {
                        id: 'icons1',
                        title: <FormattedMessage id="Mahila" />,
                        type: 'item',
                        url: '/mahila-events',
                        icon: icons['IconCalendar'],
                        
                    },
                    {
                        id: 'icons',
                        title: <FormattedMessage id="Developer" />,
                        type: 'item',
                        url: '/developer',
                        icon: icons['IconLockAccess'],
                        
                    },
                    
                ]
            },
        
        ]
    };

    const menuItems2 = {
        items: [
            {
                
                id: 'dashboard',
                title: <FormattedMessage id="dashboard" />,
                type: 'group',
                children: [
                    {
                        id: 'dash-default',
                        title: <FormattedMessage id="Dashboard" />,
                        type: 'item',
                        url: '/dashboard',
                        icon: icons['IconDashboard'],
                        breadcrumbs: false
                    },
                    {
                        id: 'life-time-members',
                        title: <FormattedMessage id="Life Time Members" />,
                        type: 'item',
                        url: '/life-time-members',
                        icon: icons['IconUsers'],
                        
                    },
                    {
                        id: 'members',
                        title: <FormattedMessage id="Patron Members" />,
                        type: 'item',
                        url: '/patron-members',
                        icon: icons['IconUsers'],
                        
                    },
                    {
                        id: 'members1',
                        title: <FormattedMessage id="Pending MID" />,
                        type: 'item',
                        url: '/pending-mid',
                        icon: icons['IconUserCheck'],
                        
                    },
                    {
                        id: 'members2',
                        title: <FormattedMessage id="New Register" />,
                        type: 'item',
                        url: '/new-register',
                        icon: icons['IconUserPlus'],
                        
                    },
                    
                ]
            },
            {
                id: 'utilities',
                title: <FormattedMessage id="Events" />,
                type: 'group',
                children: [
                    {
                        id: 'sample-page',
                        title: <FormattedMessage id="Samaj" />,
                        type: 'item',
                        url: '/samaj-events',
                        icon: icons['IconBrandChrome']
                    },
                    {
                        id: 'icons1',
                        title: <FormattedMessage id="Mahila" />,
                        type: 'item',
                        url: '/mahila-events',
                        icon: icons['IconCalendar'],
                        
                    },
                    {
                        id: 'icons',
                        title: <FormattedMessage id="Developer" />,
                        type: 'item',
                        url: '/developer',
                        icon: icons['IconLockAccess'],
                        
                    },
                    
                ]
            },
        
        ]
    };

const menuItems = localStorage.getItem('user_type_id') === '2' ? menuItems2 : menuItems1;

export default menuItems;


 


    


