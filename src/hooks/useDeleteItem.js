/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useContext } from 'react';
import { AuthContext } from '../AuthContext'
const useDeleteItem = () => {
  const { token } = useContext(AuthContext)

  const deleteItem = useCallback(async (id) => {
    const response = await fetch(`https://todo-mvc-api-typeorm.herokuapp.com/api/todos/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      },
    })

    return response.json()
  }, [token]);

  return { deleteItem }
};

export default useDeleteItem;
