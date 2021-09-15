import { useCallback, useContext } from 'react';
import { AuthContext } from '../AuthContext'

const useGetTodoList = () => {
  const { token } = useContext(AuthContext)

  const getTodoList = useCallback(async () => {
    const response = await fetch('https://todo-mvc-api-typeorm.herokuapp.com/api/todos', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      },
    })

    return response.json()
  }, [token]);

  return { getTodoList }
};

export default useGetTodoList;
