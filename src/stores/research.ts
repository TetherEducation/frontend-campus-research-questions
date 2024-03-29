import { StepOFResearch, StepOfCampusAround, StepOfEnrollmentSection, StepOfPerformanceAndPayment } from "@/enums/stepOfResearch.enum";
import { ResearchLocation, ResearchConfiguration, ResearchAnswerCL, ResearchAnswerDO } from "@/interfaces/research.interface";
import { defineStore } from "pinia";
import { useI18n } from 'vue-i18n'
import { ActionDataOfResearch } from "@/enums/actionDataOfResearch.enum";
import { campuses } from "@/mocks/campuses";
import { ResearchStep } from "@/enums/researchStep.enum";
import { Tenant } from "@/enums/tenant.enum";


export const useResearchStore = defineStore('research', {
    state: () => ({
        loading: true,
        researchConfiguration: <ResearchConfiguration>{},
        treatment: 0,
        researchStep: <ResearchStep>{},
        historyStep: <any>[],
        // posibility deprecated
        isValidStep: true,
        step: StepOFResearch.EnrollmentSection,
        stepChild: StepOfEnrollmentSection.DescriptionEnrollmentSection as number,
        listOfCampus: [],
        listOfComuna: [],
        dataOfResearch: {
            num_estab_answer1: null,
            num_estab_correct1: null,
            num_estab_answer2: null,
            num_estab_correct2: null,
            plans_to_enroll: null,
            knows_school: null,
            school: null,
            knows_school_not_sure: false,
        } as any,
        campusesAround: campuses,
        answerCampusAround: null || 0,
        answerCampusPaymentAndPerformance: null || 0,
    }),
    getters: {
        isTenantCl: (state) => state.researchConfiguration?.tenant?.toUpperCase() === Tenant.CL,
        secondRoundKey: (state) => `${state.researchConfiguration?.researchId || ''}${state.researchConfiguration?.researchType || ''}`,
        answerPayment: (state) => state?.researchConfiguration?.interface?.question_cost || '',
        answerPerformance: (state) => state?.researchConfiguration?.interface?.question_performance || '',
        // posibility deprecated
        currentStep: (state) => state.step,
        currentStepChild: (state) => state.stepChild,
        campuses: (state) => state.campusesAround,
        totalCampusesAround: (): number => 4,
        totalCampusesPaymentAndPerformance: (): number => 4,
        centerLocation: (state): ResearchLocation => state.researchConfiguration.location,
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
        getListOfComuna: (state) => state.listOfComuna,
        getDataOfResearch: (state): any => state.researchConfiguration.interface,
    },
    actions: {
        initResearch() {
            this.setLoading(true);
            window.top!.postMessage({
                    context: 'explorer',
                    action: 'initData',
                }, '*');


            this.setLoading(false);
        },
        setLoading(loading: boolean) {
            this.loading = loading;
        },
        setResearchConfiguration(configuration: any) {
            const isTenantCl = configuration.tenant.toUpperCase() === Tenant.CL;
            this.researchConfiguration = configuration;
            this.researchStep = isTenantCl ? ResearchStep.firstQuestion : ResearchStep.welcome;

            if (isTenantCl) {
                this.researchStep = configuration.researchId && configuration.researchType ? ResearchStep.fourthQuestion : ResearchStep.firstQuestion;
            }
            else {
                this.researchStep = ResearchStep.welcome;
            }
            this.setInterface();
            this.setAnswer(configuration.totalCampusesWhitVacanciesAround , 'num_estab_correct1')
            this.setAnswer(configuration.totalCampusesWhitVacanciesAroundPaymentAndPerformance , 'num_estab_correct2')
            this.setAnswer(configuration.totalCampusesWhitVacanciesAround, 'totalCampusesWhitVacanciesAround')
            this.setAnswer(configuration.totalCampusesWhitVacanciesAroundPaymentAndPerformance, 'totalCampusesWhitVacanciesAroundPaymentAndPerformance')
            this.setLoading(false)
        },
        setInterface() {
            const interfaceDO: ResearchAnswerDO = {
                num_estab_answer1: null,
                num_estab_correct1: null,
                num_estab_answer2: null,
                num_estab_correct2: null,
                plans_to_enroll: null,
                knows_school: null,
                school: null,
                knows_school_not_sure: false,
            }

            const interfaceCL: ResearchAnswerCL = {
                num_estab_answer1: null,
                num_estab_correct1: null,
                num_estab_answer2: null,
                num_estab_correct2: null,
                school: null,
                comuna: null,
                question_1: null,
                question_2: null,
                question_3: null,
                question_4: null,
                num_estab_post: null,
                question_cost: null,
                question_performance: null,
                totalCampusesWhitVacanciesAround: null,
                totalCampusesWhitVacanciesAroundPaymentAndPerformance: null,
            }

            this.researchConfiguration.interface = this.isTenantCl ? interfaceCL : interfaceDO;
        },
        setResearchStep(step: ResearchStep) {
            this.historyStep.push(this.researchStep);
            this.sendTrackMixpanel(this.researchStep);
            this.researchStep = step;
            this.sendTopPostMessage('setAnswer', '', true);
        },
        sendTrackMixpanel(step: ResearchStep) {
            const trackMixpanelResearchStep = {
                [ResearchStep.fourthQuestion as string]: {
                    track: 'research_Q4',
                    data: {...this.getDataOfResearch, researchType: this.researchConfiguration.researchType }
                },
                [ResearchStep.firstQuestion as string]: {
                    track: 'research_Q1',
                    data: {...this.getDataOfResearch, researchType: this.researchConfiguration.researchType }
                },
                [ResearchStep.secondQuestion as string]: {
                    track: 'research_Q2',
                    data: {...this.getDataOfResearch, researchType: this.researchConfiguration.researchType }
                },
                [ResearchStep.thirdQuestion as string]: {
                    track: 'research_Q3',
                    data: {...this.getDataOfResearch, researchType: this.researchConfiguration.researchType }
                },
                [ResearchStep.questionCampusAround as string]: {
                    track: 'research_Qsch3k',
                    data: {...this.getDataOfResearch, researchType: this.researchConfiguration.researchType }
                },
                [ResearchStep.answerCampusAround as string]: {
                    track: 'research_Qsch3k_answer',
                    data: {...this.getDataOfResearch, researchType: this.researchConfiguration.researchType }
                },
                [ResearchStep.informationPayment as string]: {
                    track: 'research_payment_screen',
                    data: {...this.getDataOfResearch, researchType: this.researchConfiguration.researchType }
                },
                [ResearchStep.informationPerformance as string]: {
                    track: 'research_payment_performance',
                    data: {...this.getDataOfResearch, researchType: this.researchConfiguration.researchType }
                },
                [ResearchStep.questionPerformanceAndPayment as string]: {
                    track: 'research_payment_performance_question',
                    data: {...this.getDataOfResearch, researchType: this.researchConfiguration.researchType }
                },
                [ResearchStep.answerPerformanceAndPayment as string]: {
                    track: 'research_payment__performance_and_payment',
                    data: {...this.getDataOfResearch, researchType: this.researchConfiguration.researchType }
                },
                [ResearchStep.goToExplorer as string]: {
                    track: 'research_payment__go_to_explorer',
                    data: {...this.getDataOfResearch, researchType: this.researchConfiguration.researchType }
                },

            }

            this.sendTopPostMessage('setTrackMixPanel', { ...trackMixpanelResearchStep[step] });
        },
        setAnswer(answer: any, key: string) {
            let modifyInterface: any = this.researchConfiguration.interface;
            modifyInterface[key] = answer;
            this.researchConfiguration.interface = modifyInterface;
        },
        backStep() {
            if (this.historyStep.length === 0) {
                this.sendTopPostMessage('close', true)
                return;
            };

            this.researchStep = this.historyStep.pop();
        },
        // psoibility deprecated
        setDataResearch(actionDataOfResearch: ActionDataOfResearch, data: any) {
            
            const setInitialData = () => {
                this.setResearchConfiguration(data as any);
            };

            const setListOfComuna = () => {
                this.listOfComuna = data;
            };

            const setListOfCampus = () => {
                this.listOfCampus = data;
            };

            const actions = {
                [ActionDataOfResearch.setInitialData as string]: () => setInitialData(),
                [ActionDataOfResearch.getListOfCampus as string]: () => setListOfCampus(),
                [ActionDataOfResearch.getListOfComuna as string]: () => setListOfComuna(),
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
                const label = isFirstStep ? 'Preguntas' : 'Pregunta';

                return isFirstStep ? label : `${label} ${this.stepChild}`;
            }

            const breadcrumbOfStep = {
                [StepOFResearch.EnrollmentSection as number]: breadcrumEnrollmentSection(),
                [StepOFResearch.CampusAround as number]: breadcrumCampusAround(),
                [StepOFResearch.PerformanceAndPayment as number]: breadcrumPerformanceAndPayment(),
                [StepOFResearch.GoToExplorer as number]: breadcrumGoToExplorer(),

            }

            function breadcrumCampusAround() {
                const { t } = useI18n();
                return t('campus_around.title');
            }

            function breadcrumPerformanceAndPayment() {
                const { t } = useI18n();
                return t('performance_and_payment.title');
            }

            function breadcrumGoToExplorer() {
                const { t } = useI18n();
                return t('go_to_explorer.title');
            }


            return breadcrumbOfStep[this.step];
        },
        sendTopPostMessage(action: string, value: any, isDataOfResearch = false) {
            window.top!.postMessage(
                {
                    context: 'explorer',
                    action,
                    value: isDataOfResearch ? { ...this.getDataOfResearch } : value,
                }, '*');
        },
        nextStep() {
            this.sendMixpanel();
            if (this.step === 1 && this.stepChild === 1 || this.step === 2 && (this.stepChild === 1 || this.stepChild === 3)) {
                this.isValidStep = true;
            }

            if (this.step === 3) {
                this.sendTopPostMessage('setAnswer', '', true);
                this.sendTopPostMessage('close', true);
            }

            if (!this.isValidStep) return;

            const isNextStep = ((this.sizeOfSteps[this.step] / 2) - 1) === this.stepChild

            if (isNextStep) {
                const newStep = this.step + 1;
                this.router.push({ name: StepOFResearch[newStep] });
                this.stepChild = 0;
                this.step++;
                return;
            }

            if (this.stepChild === 1 && this.step === 0 && this.dataOfResearch?.plans_to_enroll === 3) {
                this.router.push({ name: StepOFResearch[1] });
                this.stepChild = 0;
                this.step = 1;
                this.isValidStep = false;
                return;
            }

            if (this.stepChild === 2 && this.step === 0 && this.dataOfResearch?.knows_school !== 1) {
                this.router.push({ name: StepOFResearch[1] });
                this.stepChild = 0;
                this.step = 1;
                return;
            }
            this.stepChild++;
            this.isValidStep = false;
        },
        sendMixpanel() {
            let mixpanel = {
                track: '',
                data: {}
            }

            if (this.currentStep === 0) {
                const enrollmentSectionMixpanel: any = {
                    0: {
                        track: 'click_LocationResearch_Question_0',
                        data: {}
                    },
                    1: {
                        track: 'click_LocationResearch_Question_1_continue',
                        data: {
                            plans_to_enroll: this.dataOfResearch.plans_to_enroll
                        }
                    },
                    2: {
                        track: 'click_LocationResearch_Question_2_continue',
                        data: {
                            knows_school: this.dataOfResearch.knows_school
                        }
                    },
                    3: {
                        track: 'click_LocationResearch_Question_3_continue',
                        data: {
                            school: this.dataOfResearch.school,
                            knows_school: this.dataOfResearch.knows_school,
                        }
                    },

                }
                mixpanel = { ...enrollmentSectionMixpanel[this.currentStepChild] };
            } else if (this.currentStep === 1) {
                const campusAroundMixpanel: any = {
                    0: {
                        track: 'click_LocationResearch_1_continue',
                        data: {
                            num_estab_correct1: this.dataOfResearch.num_estab_correct1,
                            num_estab_answer1: this.dataOfResearch.num_estab_answer1
                        }
                    },
                    1: {
                        track: 'click_LocationResearch_2_continue',
                        data: {
                            treatment: this.dataOfResearch.treatment
                        }
                    },
                }
                mixpanel = { ...campusAroundMixpanel[this.currentStepChild] };
            } else if (this.currentStep === 2) {
                const performanceAndPaymentMixpanel: any = {
                    0: {
                        track: 'click_LocationResearch_3_continue',
                        data: {
                            num_estab_correct2: this.dataOfResearch.num_estab_correct2,
                            num_estab_answer2: this.dataOfResearch.num_estab_answer2
                        }
                    },
                    1: {
                        track: 'click_LocationResearch_4_continue',
                        data: {}
                    },
                    2: {
                        track: 'click_LocationResearch_5_continue',
                        data: {
                            treatment: this.dataOfResearch.treatment
                        }
                    },
                }
                mixpanel = { ...performanceAndPaymentMixpanel[this.currentStepChild] };
            } else if (this.currentStep === 3) {
                const goToExplorerMixpanel: any = {
                    0: {
                        track: 'click_LocationResearch_6_continue',
                        data: {
                            treatment: this.dataOfResearch.treatment
                        }
                    },
                }
                mixpanel = { ...goToExplorerMixpanel[this.currentStepChild] };
            }



            this.sendTopPostMessage('setTrackMixPanel', { ...mixpanel });
        },
        previousStep() {
            if (this.step === 0 && this.stepChild === 0) {
                this.sendTopPostMessage('backStep', '')
                return;
            }

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
