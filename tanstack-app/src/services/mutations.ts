import { QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createTodo, deleteTodo, updateTodo } from "./api";

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

        },onSettled: async (_, error) => {
            
            if(error){
                console.info("Settled", error);
            }else{
                await queryClient.invalidateQueries({queryKey: ['todos']})
            }

        },
    });
}

export function useUpdateTodo() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateTodo,
        onSettled: async (_, error, data) => {
            if(error) console.log(error);
            await queryClient.invalidateQueries({queryKey: ['todos']});
            await queryClient.invalidateQueries({queryKey: ['todo', {id: data.id}]});
        }

    })
}


export function useDeleteTodo() {

    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: number) => deleteTodo(id),
        onSettled: async (_, error, id) => {
            if (error) {
                console.error(error);
            } else {                
                await queryClient.invalidateQueries({queryKey: ["todos"]})
                await queryClient.invalidateQueries({queryKey: ["todo", {id: id}]})
            }

        },
        
    });

} 