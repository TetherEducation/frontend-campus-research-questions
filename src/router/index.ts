import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router';

const routes:RouteRecordRaw[] = [
    {
        path: '/research',
        name: 'research',
        component: () => import('../views/ResearchView.vue'),
        children: [
            {
                path: 'enrollment-section',
                name: 'EnrollmentSection',
                component: () => import('../views/EnrollmentSectionView.vue'),
            },
            {
                path: 'campus-around',
                name: 'CampusAround',
                component: () => import('../views/CampusAroundView.vue'),
            },
        ]
    },
    {
        path: '/:catchAll(.*)',
        redirect: { name: 'research' },
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;