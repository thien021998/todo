import { useCallback } from 'react';

const useLogin = () => {

  const login = useCallback(async (data) => {
    const response = await fetch('https://todo-mvc-api-typeorm.herokuapp.com/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })

    return response.json()
  }, []);

  return { login }
};

export default useLogin;
