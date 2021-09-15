import { useCallback, useContext } from 'react';
import { AuthContext } from '../AuthContext'

const useUpdataItem = () => {
  const { token } = useContext(AuthContext)

  const updataItem = useCallback(async (id, data) => {
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

    return response.json()
  }, [token]);

  return { updataItem }
};

export default useUpdataItem;
