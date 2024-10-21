import axios from "@/api/axios";
import { UserResponse } from "@/types/users";

export const addPoints = async (rut: string, puntos: number): Promise<UserResponse> => {
        const response = await axios.post("/puntos", {
            rut,
            puntos,
        });
        return response.data; 
};

export const updateUserPoints = async (rut: string, puntos: number): Promise<UserResponse> => {
        const response = await axios.put(`/users/${rut}/puntos`, {
            puntos,
        });
        return response.data;

};
