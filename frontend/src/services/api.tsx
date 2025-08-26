import axios from "axios";
import type { ILogin } from "../interfaces/IAuth";
// Removed useEndpoint hook usage since hooks cannot be used at the top level

const api = axios.create({
  baseURL: "http://localhost:3001",
    headers: {
      "Content-Type": "application/json",
    },
});


// VIEWS
export const getFeedbacks = () => api.get("/feedbacks");
export const getUsers = (endpoint: string) => api.get(`${endpoint}`);
export const getFeedbackDetails = (id: string) => api.get(`feedbacks/${id}`);
export const getUserById = (endpoint: string, id: string) => api.get(`${endpoint}/${id}`);
export const getFeedbackByIdS = (id: string) => api.get(`/feedbacks/${id}`);
export const getRevieweeFeedbacks = (id: string) => api.get(`/feedbacks?revieweeId=${id}`)
export const getReviewerFeedbacks = (id: string) => api.get(`/feedbacks?revieweeId=${id}`)

// AUTH
export const login = (endpoint: string, { email, password }: ILogin) => api.post(endpoint, { email, password });

