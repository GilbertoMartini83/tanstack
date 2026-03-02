import axios from "axios";
import type Todo from "../types/todo";

// the json‑server in `project/server.js` is plain HTTP, not HTTPS.
// using `https://` results in a connection refusal and Axios throws
// "Network Error" because it can't open a socket to the host.
const BASE_URL = 'http://localhost:8080';
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  // bump timeout a bit so our artificial 1‑second delay doesn't trigger
  timeout: 2000,
});


const getTodosIds = async () : Promise<number[]>  => {    
    return (await axiosInstance.get<Todo[]>('todos'))
    .data.map(todo => todo.id);

    // axios throws errors automatically for failing request, 
    // whereas fetch don`t
};

const getTodo = async(id: number ) : Promise<Todo> => {
    return (await axiosInstance.get<Todo>(`todos/${id}`)).data;
}

const createTodo = async (newTodo: Todo) => {
   return (await axiosInstance.post<Todo>('todos', newTodo));
};

const updateTodo = async (updatedTodo: Todo) => {
    return (await axiosInstance.put<Todo>(`todos/${updatedTodo.id}`, updatedTodo));
}

const deleteTodo = async( id: number) => {
    return (await axiosInstance.delete<Todo>(`todos/${id}`));
}

export { getTodo, getTodosIds , createTodo , updateTodo, deleteTodo};