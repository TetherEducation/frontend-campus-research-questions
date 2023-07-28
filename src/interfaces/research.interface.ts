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

export interface ResearchAnswerDominicana {
    num_estab_answer1: number,
    num_estab_correct1: number,
    num_estab_answer2: number,
    num_estab_correct2: number,
    plans_to_enroll: boolean,
    knows_school: boolean,
    school: string,
    knows_school_not_sure: boolean,
}

export interface ResearchAnswerChile {
    num_estab_answer1: number,
    num_estab_correct1: number,
    num_estab_answer2: number,
    num_estab_correct2: number,
    plans_to_enroll: boolean,
    knows_school: boolean,
    school: string,
    knows_school_not_sure: boolean,
}

export interface ResearchConfiguration {
    tenant: Tenant,
    totalCampusesAround: number,
    totalCampusesAroundPaymentAndPerformance: number,
}