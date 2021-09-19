import { useCallback, useContext, useState } from 'react';
import { AuthContext } from '../components/contexts/AuthContext'

const useGetTodoList = () => {
  const { token } = useContext(AuthContext)
  const [loading, setLoading] = useState(null)
  const getTodoList = useCallback(async () => {
    setLoading('Loading list items ...')
    const response = await fetch('https://todo-mvc-api-typeorm.herokuapp.com/api/todos', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      },
    })
    setLoading(false)
    return response.json()
  }, [token]);

  return { getTodoList, loading }
};

export default useGetTodoList;
