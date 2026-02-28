import { useForm, type SubmitHandler } from "react-hook-form";
import { useCreateTodo } from "../services/mutations";
import { useTodos, useTodosIds } from "../services/queries";

const Todos = () => {

  const todosIdsQuery = useTodosIds();
  const todosQueries = useTodos(todosIdsQuery.data);
  const createTodoMutation = useCreateTodo();

  const { register , handleSubmit } = useForm();

  const handleCreateTodoSubmit: SubmitHandler<any> = (data) => {
    debugger;
    createTodoMutation.mutate(data);

  }

  
 
  return (

    <>        
    <form onSubmit={handleSubmit(handleCreateTodoSubmit)}>
      <h4>New Todo</h4>
      <input placeholder="Title" {...register("title")} />
      <br/>
      <input placeholder="Description" {...register("description")} />
      <br/>
      <input type="submit" value={createTodoMutation.isPending ? 'Creating new, please Wait': 'Submit'} disabled={createTodoMutation.isPending}/>
    </form>

        <ul>
          {todosQueries.map( ({data}) => (
              <li key={data?.id}>
                  <div>id: {data?.id}</div>
                  <span>
                      <strong>Title</strong> {data?.title}, { " "}
                      <strong>Description</strong> { data?.description}
                  </span>
              </li>
          ))}
        </ul>
   </>

  )
}

export default Todos