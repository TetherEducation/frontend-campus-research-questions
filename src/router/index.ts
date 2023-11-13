import { ResearchConfiguration } from '@/interfaces/research.interface';
import { defaultLocation } from '@/mocks/defaultLocation';
import { useResearchStore } from '@/stores/research';
import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router';

const routes: RouteRecordRaw[] = [
    {
        path: '/research',
        name: 'research',
        component: () => import('../views/Research.vue'),
        beforeEnter: (to, _from, next) => {
            // The code below checks the query string for the treatment, value, and tenant parameters.
            // If the parameters exist, it uses the value parameter to set the totalCampusesAround and
            // totalCampusesAroundPaymentAndPerformance properties of the researchConfiguration object.
            const { treatment, value, tenant, grades, hasPriority: hasPriority, researchId, researchType } = to.query;
            
            if (treatment && value && tenant) {
                const store = useResearchStore();
                const researchConfiguration: ResearchConfiguration = {
                    tenant: tenant as any,
                    grades: grades?.toString().split(',').map((grade: string) => +grade) || null,
                    hasPriority: !!hasPriority,
                    totalCampusesAround: +value,
                    totalCampusesAroundPaymentAndPerformance: +value - 1,
                    treatment: +treatment,
                    location: defaultLocation,
                    researchId: +researchId!,
                    researchType: researchType as string || null,
                }
                store.setResearchConfiguration(researchConfiguration);
            }
            next();
        }
    },
    {
        path: '/research-legacy',
        name: 'researchLegacy',
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
            {
                path: 'performance-and-payment',
                name: 'PerformanceAndPayment',
                component: () => import('../views/PerformanceAndPayment.vue'),
            },
            {
                path: 'go-to-explorer',
                name: 'GoToExplorer',
                component: () => import('../views/GoToExplorerView.vue'),
            }
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