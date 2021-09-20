import { useCallback, useContext, useState } from 'react';
import { AuthContext } from '../components/contexts/AuthContext'

const useUpdateItem = () => {
  const { token } = useContext(AuthContext)
  const [loadingUpdate, setLoadingUpdate] = useState(false)
  const updateItem = useCallback(async (id, data) => {
    setLoadingUpdate(true)
    let item = {
      content: data
    }
    const response = await fetch(`https://todo-mvc-api-typeorm.herokuapp.com/api/todos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(item)
    })
    setLoadingUpdate(false)
    return response.json()
  }, [token]);

  return { updateItem, loadingUpdate }
};

export default useUpdateItem;
