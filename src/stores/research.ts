import { StepOFResearch, StepOfCampusAround, StepOfEnrollmentSection, StepOfPerformanceAndPayment } from "@/enums/stepOfResearch.enum";
import { defaultLocation } from "@/mocks/defaultLocation";
import { ResearchLocation } from "@/interfaces/research.interface";
import { defineStore } from "pinia";

export const useResearchStore = defineStore('research', {
    state: () => ({
        step: StepOFResearch.EnrollmentSection,
        stepChild: StepOfEnrollmentSection.DescriptionEnrollmentSection as number, 
        userLocation: defaultLocation as ResearchLocation,
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
    },
    actions: {
        nextStep() {
            const steps = {
                [StepOFResearch.EnrollmentSection as number]: Object.keys(StepOfEnrollmentSection).length,
                [StepOFResearch.CampusAround as number]: Object.keys(StepOfCampusAround).length,
                [StepOFResearch.PerformanceAndPayment as number]: Object.keys(StepOfPerformanceAndPayment).length ,
            }

            const isNextStep = ((steps[this.step] / 2) - 1) === this.stepChild
            
            if (isNextStep) {
                this.stepChild = 0;
                this.step++;
                this.router.push({ name: 'campusAround' });
            } else {
                this.stepChild++;
            }
        },
        previousStep() {
            this.step--;
        },
        setAnswerCampusAround(answer: number) {
            this.answerCampusAround = answer;
        },
        setAnswerCampusPaymentAndPerformance(answer: number) {
            this.answerCampusPaymentAndPerformance = answer;
        }
    }
});
