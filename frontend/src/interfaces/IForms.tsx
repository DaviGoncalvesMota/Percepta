import type { IEmployers } from "./IEmployers";
import type { IEnterprises } from "./IEnterprises";


export interface IForms {
    enterprises?: IEnterprises[];
    employees?: IEmployers[];
    categories: string[];
}