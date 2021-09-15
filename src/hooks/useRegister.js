import { useCallback } from 'react';

const useRegister = () => {

  const register = useCallback(async (data) => {

    const response = await fetch('https://todo-mvc-api-typeorm.herokuapp.com/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })

    return response.json()
  }, []);

  return { register }
};

export default useRegister;
