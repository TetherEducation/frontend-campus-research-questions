import { StepOFResearch, StepOfCampusAround, StepOfEnrollmentSection, StepOfPerformanceAndPayment } from "@/enums/stepOfResearch.enum";
import { defaultLocation } from "@/mocks/defaultLocation";
import { ResearchLocation } from "@/interfaces/research.interface";
import { defineStore } from "pinia";
import { i18n } from "../i18n";
import { ActionDataOfResearch } from "@/enums/actionDataOfResearch.enum";
import { campuses } from "@/mocks/campuses";

export const useResearchStore = defineStore('research', {
    state: () => ({
        isValidStep: true,
        step: StepOFResearch.EnrollmentSection,
        stepChild: StepOfEnrollmentSection.DescriptionEnrollmentSection as number,
        userLocation: defaultLocation as ResearchLocation,
        listOfCampus: [],
        dataOfResearch: {} as any,
        campusesAround: campuses,
        // campusesAround: [],
        answerCampusAround: null || 0,
        answerCampusPaymentAndPerformance: null || 0,
        treatment: 0,
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
            return {
                [StepOFResearch.EnrollmentSection as number]: Object.keys(StepOfEnrollmentSection).length,
                [StepOFResearch.CampusAround as number]: Object.keys(StepOfCampusAround).length,
                [StepOFResearch.PerformanceAndPayment as number]: Object.keys(StepOfPerformanceAndPayment).length,
            }
        },
        getTreatment: (state) => state.treatment,
        getListOfCampus: (state) => state.listOfCampus,
    },
    actions: {
        setDataResearch(actionDataOfResearch: ActionDataOfResearch, data: any) {
            const setTreatment = () => {
                this.treatment = data.treatment;
                this.userLocation = data.currentLocation;
                this.dataOfResearch.num_estab_correct1 = data.campusesAround.total;
                this.dataOfResearch.num_estab_correct2 = data.campusesAround.payment + data.campusesAround.performance || 0;
            };
            const setListOfCampus = () => {
                this.listOfCampus = data;
            };

            const actions = {
                [ActionDataOfResearch.setTreatment as string]: () => setTreatment(),
                [ActionDataOfResearch.getListOfCampus as string]: () => setListOfCampus(),
            }

            actions[actionDataOfResearch]();
        },
        setAnswersResearch(data: any) {
            this.dataOfResearch[data.key] = data.value;
            this.isValidStep = true;
        },
        setIsValidStep(isValid: boolean) {
            this.isValidStep = isValid;
        },
        getBreadcrumb() {
            const breadcrumEnrollmentSection = () => {
                const isFirstStep = this.stepChild === 0;
                const label = i18n.global.t('enrollment_section.title', isFirstStep ? 2 : 1);

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
        sendTopPostMessage(action: string, value: any) {
            window.top!.postMessage(
                {
                    context: 'explorer',
                    action,
                    value,
                }, '*');
        },
        nextStep() {
            if (this.step === 1 && this.stepChild === 1 || this.step === 2 && (this.stepChild === 1 || this.stepChild === 3)) {
                this.isValidStep = true;
            }

            if (this.step === 3) {
                this.sendTopPostMessage('setAnswer', {...this.dataOfResearch})
                this.sendTopPostMessage('close', true);
            }

            if (!this.isValidStep) return;

            const isNextStep = ((this.sizeOfSteps[this.step] / 2) - 1) === this.stepChild

            if (isNextStep) {
                this.stepChild = 0;
                this.step++;
                this.router.push({ name: StepOFResearch[this.step] });
                return;
            }

            if (this.stepChild === 1 && this.step === 0 && this.dataOfResearch?.plans_to_enroll === 2) {
                this.stepChild = 0;
                this.step = 1;
                this.router.push({ name: StepOFResearch[this.step] });
                return;
            }

            if (this.stepChild === 2 && this.step === 0 && this.dataOfResearch?.knows_school !== 0) {
                this.stepChild = 0;
                this.step = 1;
                this.router.push({ name: StepOFResearch[this.step] });
                return;
            }
            this.stepChild++;
            this.isValidStep = false;
        },
        previousStep() {
            if (this.stepChild === 0) {
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
