import { StepOFResearch, StepOfCampusAround, StepOfEnrollmentSection, StepOfPerformanceAndPayment } from "@/enums/stepOfResearch.enum";
import { defaultLocation } from "@/mocks/defaultLocation";
import { ResearchLocation } from "@/interfaces/research.interface";
import { defineStore } from "pinia";
import { i18n } from "../i18n";

export const useResearchStore = defineStore('research', {
    state: () => ({
        step: StepOFResearch.EnrollmentSection,
        stepChild: StepOfEnrollmentSection.DescriptionEnrollmentSection as number, 
        userLocation: defaultLocation as ResearchLocation,
        dataOfResearch: {} as any,
        campusesAround: [],
        answerCampusAround: null || 0,
        answerCampusPaymentAndPerformance: null || 0,
    }),
    getters: {
        currentStep: (state) => state.step,
        currentStepChild: (state) => state.stepChild,
        campuses: (state) => state.campusesAround,
        totalCampusesAround: (): number => 4,
        totalCampusesPaymentAndPerformance: (): number => 4,
        centerLocation: (state): ResearchLocation => state.userLocation,
        getAnswerCampusAround: (state) => state.answerCampusAround,
        getAnswerCampusPaymentAndPerformance: (state) => state.answerCampusPaymentAndPerformance,
        sizeOfSteps: () => {
            return  {
                [StepOFResearch.EnrollmentSection as number]: Object.keys(StepOfEnrollmentSection).length,
                [StepOFResearch.CampusAround as number]: Object.keys(StepOfCampusAround).length,
                [StepOFResearch.PerformanceAndPayment as number]: Object.keys(StepOfPerformanceAndPayment).length ,
            }
        },
    },
    actions: {
        setDataOfResearch(data: any) {
            this.dataOfResearch[data.key] = data.value;
        },
        getBreadcrumb() {
            const breadcrumEnrollmentSection = () => {
                const isFirstStep = this.stepChild === 0;
                const label = i18n.global.t('enrollment_section.title', isFirstStep ? 2 : 1 );

                return isFirstStep ? label : `${label} ${this.stepChild}`;
            }

            const breadcrumbOfStep = {
                [StepOFResearch.EnrollmentSection as number]: breadcrumEnrollmentSection(),
                [StepOFResearch.CampusAround as number]: breadcrumCampusAround(),
                [StepOFResearch.PerformanceAndPayment as number]: breadcrumPerformanceAndPayment(),
                [StepOFResearch.GoToExplorer as number]: breadcrumGoToExplorer(),

            }

            function breadcrumCampusAround() {
                return i18n.global.t('campus_around.title');
            }

            function breadcrumPerformanceAndPayment() {
                return i18n.global.t('performance_and_payment.title');
            }

            function breadcrumGoToExplorer() {
                return i18n.global.t('go_to_explorer.title');
            }


            return breadcrumbOfStep[this.step];
        },
        nextStep() {
            const isNextStep = ((this.sizeOfSteps[this.step] / 2) - 1) === this.stepChild
            
            if (isNextStep) {
                this.stepChild = 0;
                this.step++;
                this.router.push({ name: StepOFResearch[this.step] });
                return;
            }

            this.stepChild++;
            
        },
        previousStep() {
            if (this.stepChild === 0 ) {
                this.step = this.step - 1;
                this.stepChild = this.sizeOfSteps[this.step] / 2 - 1;
                this.router.push({ name: StepOFResearch[this.step] });
            } else {
                this.stepChild = this.stepChild - 1;
            }
            
        },
        setAnswerCampusAround(answer: number) {
            this.answerCampusAround = answer;
        },
        setAnswerCampusPaymentAndPerformance(answer: number) {
            this.answerCampusPaymentAndPerformance = answer;
        }
    }
});