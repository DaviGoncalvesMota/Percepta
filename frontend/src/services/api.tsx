import axios from "axios";
import type { ILogin } from "../interfaces/IAuth";
import { Endpoint } from "../utils/endpoint"

const api = axios.create({
  baseURL: "http://localhost:3001/",
});


// VIEWS
export const getFeedbacksService = () => api.get("feedbacks");
export const getUsersService = () => api.get(`${Endpoint}`);
export const getFeedbackDetailsService = (id: string) => api.get(`feedbacks/${id}`);
export const getUserByIdService = (id: string) => api.get(`${Endpoint}/${id}`);
export const getFeedbackByIdService = (id: string) => api.get(`feedbacks/${id}`);
export const getRevieweeFeedbacksService = (id: string) => api.get(`feedbacks?revieweeId=${id}`)
export const getReviewerFeedbacksService = (id: string) => api.get(`feedbacks?revieweeId=${id}`)


// AUTH
export const loginService = ({ email, password }: ILogin) => api.get(`${Endpoint}?email=${email}&password=${password}`);
