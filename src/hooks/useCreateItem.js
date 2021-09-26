/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useContext, useState } from 'react';
import { AuthContext } from '../components/contexts/AuthContext'

const useCreateItem = () => {
  const { token } = useContext(AuthContext)
  const [loading, setLoadingCreate] = useState(false)
  const createItem = useCallback(async ({ data }) => {
    setLoadingCreate(true)
    const response = await fetch('https://todo-mvc-api-typeorm.herokuapp.com/api/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(data)
    })
    setLoadingCreate(false)
    return response.json()
  }, [token])

  return { createItem, loading }
};

export default useCreateItem;
