import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTodo } from "./api";

export function useCreateTodo() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createTodo,    
        onMutate: () => {
            console.log("mutate");
        },
        onError: () => {
            console.error("Something terrible just happened");
        },
        onSuccess: () => {
            console.info("Success");

        },onSettled: async (data, error) => {
            
            if(error){
                console.info("Settled", error);
            }else{
                await queryClient.invalidateQueries({queryKey: ['todos']})
            }

        },
    });
}
