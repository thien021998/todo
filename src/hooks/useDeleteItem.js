/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useContext, useState } from 'react';
import { AuthContext } from '../components/contexts/AuthContext'
const useDeleteItem = () => {
  const { token } = useContext(AuthContext)
  const [loadingDelete, setLoadingDelete] = useState(null)
  const deleteItem = useCallback(async (id) => {
    setLoadingDelete('loading...')
    const response = await fetch(`https://todo-mvc-api-typeorm.herokuapp.com/api/todos/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      },
    })
    setLoadingDelete(false)
    return response.json()
  }, [token]);

  return { deleteItem, loadingDelete }
};

export default useDeleteItem;
