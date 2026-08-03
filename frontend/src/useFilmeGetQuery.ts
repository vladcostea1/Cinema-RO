import { useQuery } from "@tanstack/react-query";
export const useFilmeGetQuery = async () => {
    
    return useQuery({
        queryKey: ['filme'],
        queryFn: async () => {
            const response = await fetch( "http://localhost:3000/filme");
            return response.json();
        }
    });
};