import axios from "axios";
import type { ILogin } from "../interfaces/IAuth";
import type { IFeedback } from "../interfaces/IFeedback";
import type { IUsers } from "../interfaces/IUsers";

const api = axios.create({
  baseURL: "http://localhost:3001",
    headers: {
      "Content-Type": "application/json",
    },
});


// VIEWS
export const getFeedbacks = () => api.get("/feedbacks");
export const getUsers = (endpoint: string) => api.get(`${endpoint}`);
export const getFeedbackDetails = (id: string) => api.get(`feedbacks?id=${id}`);
export const getUserById = (endpoint: string, id: string) => api.get(`${endpoint}?id=${id}`);
export const getFeedbackById = (id: string) => api.get(`/feedbacks?id=${id}`);
export const getRevieweeFeedbacks = (id: string) => api.get(`/feedbacks?revieweeId=${id}`)
export const getReviewerFeedbacks = (id: string) => api.get(`/feedbacks?reviewerId=${id}`)

// AUTH
export const login = (endpoint: string, { email, password }: ILogin) => api.get(endpoint, { params: { email, password }});

// ACTIONS
export const postFeedback = (data: IFeedback) => api.post("/feedbacks", data);
export const putFeedback = (id: string, data: IFeedback) => api.put(`/feedbacks/${id}`, data);
export const putUser = (endpoint: string, id: string, data: IUsers) => api.put(`${endpoint}/${id}`, data);
export const deleteFeedback = (id: string) => api.delete(`/feedbacks/${id}`);

