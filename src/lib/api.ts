import axiosInstance from './axios';
import { Project, ContactFormData, ApiResponse } from '@/types';

export const api = {
  getProjects: async (): Promise<Project[]> => {
    const response = await axiosInstance.get('/projects');
    return response.data;
  },
  
  submitContact: async (data: ContactFormData): Promise<ApiResponse> => {
    const response = await axiosInstance.post('/contact', data);
    return response.data;
  },
};
