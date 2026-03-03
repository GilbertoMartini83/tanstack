import { keepPreviousData, useQueries, useQuery } from "@tanstack/react-query";
import  { getTodosIds , getTodo, getProjects } from "./api";

function useTodosIds() {
    return useQuery({
        queryKey: ['todos'],
        queryFn: getTodosIds, // query functions must return a Promise
        refetchOnWindowFocus: false
    });
};

function useTodos(ids: number[] | undefined) {
    
    return useQueries({
        queries: (ids || []).map(id => {
            return {
                queryKey:['todo', { id }],
                queryFn: () => getTodo(id)
            }
        })
    });       
}

function useProjects (page: number) {
    return useQuery({
        queryKey: ["projects", {page}],
        queryFn: () => getProjects(page),
        placeholderData: keepPreviousData

    });
}

export { useTodosIds, useTodos, useProjects };