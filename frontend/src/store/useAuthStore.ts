import {create} from "zustand";
import {persist} from "zustand/middleware";

import api from "../services/api.ts";

interface AuthStore{
    user: any;
    token: string | null';

    register:(
        name: string,
        email: string,
        password: string
    )=> Promise<any>

    login:(
        email: string,
        password: string,
    )=> Promise<any>

    logout: () => void;
}

export const useAuthStore = create<AuthStore>()(
    persist(
        (set) => ({
                user: null,
                token: null,

                register: async (name, email, password) => {
                    const response = await api.post(
                        "/users/register", {
                        name,
                        email,
                        password
                    }
                    );

                    set({
                        user: response.data.user,
                        token:response.data.token
                    });
                    return response.data;
                },

                login: async(email, password) => {
                    const response = await api.post("/users/login",
                        {
                            email,
                            password,
                        }
                    );

                    set({
                        user: response.data.user,
                        token: response.data.token
                    });
                    return response.data;
                },

            }),
            {
                name:"auth-storage",
            }
    )
);
