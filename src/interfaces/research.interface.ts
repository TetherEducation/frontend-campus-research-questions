import { Tenant } from "@/enums/tenant.enum";

export interface ResearchLocation {
    lat: number,
    lng: number,
}

export interface ResearchTenant {
    tenant: Tenant,
    locale: string,
    location: ResearchLocation,
}

export interface ResearchAnswerDO {
    num_estab_answer1: number | null,
    num_estab_correct1: number | null,
    num_estab_answer2: number | null,
    num_estab_correct2: number | null,
    plans_to_enroll: boolean | null,
    knows_school: boolean | null,
    school: string | null,
    knows_school_not_sure: boolean | null,
}

export interface ResearchAnswerCL {
    num_estab_answer1: number | null,
    num_estab_correct1: number | null,
    num_estab_answer2: number | null,
    num_estab_correct2: number | null,
    comuna: string | null,
    school: string | null,
    question_1: number | null,
    question_2: number | null,
    question_3: number | null,
    question_4: number | null,
    question_cost: number | null,
    question_performance: number | null,
    num_estab_post: number | null,
}

export interface ResearchConfiguration {
    tenant: Tenant,
    treatment: number,
    totalCampusesAround: number,
    location: ResearchLocation,
    grades: number[] | null,
    hasPriority: boolean | null,
    totalCampusesAroundPaymentAndPerformance: number,
    interface?: ResearchAnswerCL | ResearchAnswerDO,
    researchId?: number,
    researchType?: string | null,
}
