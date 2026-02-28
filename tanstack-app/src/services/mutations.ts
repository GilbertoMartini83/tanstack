import { useMutation } from "@tanstack/react-query";
import { createTodo } from "./api";

export function useCreateTodo() {
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

        },onSettled: (data, error) => {
            console.info('Data submitted: ', data);
            console.info("Settled", error);
        },
    });
}
