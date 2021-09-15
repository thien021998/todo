/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useContext } from 'react';
import { AuthContext } from '../AuthContext'

const useCreateItem = () => {
  const { token } = useContext(AuthContext)

  const createItem = useCallback(async ({ data }) => {
    const response = await fetch('https://todo-mvc-api-typeorm.herokuapp.com/api/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(data)
    })

    return response.json()
  }, [token])

  return { createItem }
};

export default useCreateItem;
