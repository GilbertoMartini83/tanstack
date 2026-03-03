import { useForm, type SubmitHandler } from "react-hook-form";
import { useCreateTodo, useDeleteTodo, useUpdateTodo } from "../services/mutations";
import { useTodos, useTodosIds } from "../services/queries";

const Todos = () => {

  const todosIdsQuery = useTodosIds();
  const todosQueries = useTodos(todosIdsQuery.data);

  const createTodoMutation = useCreateTodo();
  const updateTodoMutation = useUpdateTodo();
  const deleteTodoMutation = useDeleteTodo();
  

  const { register , handleSubmit } = useForm();

  const handleCreateTodoSubmit: SubmitHandler<any> = (data) => {    
    createTodoMutation.mutate(data);

  }

  const handleMarkTodoAsDoneClick : SubmitHandler<any> = (data) => {
    if(data) {      
      updateTodoMutation.mutate({...data, checked: true});
    }  
  }

  const handleDeleteTodoClick : SubmitHandler<any> = async (id) => {
    if( id > 0 ){
      await deleteTodoMutation.mutateAsync(id);
      console.log("success");
    }
    
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
                  <div>
                    <button onClick={() => handleMarkTodoAsDoneClick(data)}>{data?.checked ? 'Done': 'Mark as Done'}</button>
                    <button onClick={() => handleDeleteTodoClick(data?.id)}>Delete Todo</button>
                  </div>
              </li>
          ))}
        </ul>
   </>
  )
}

export default Todos