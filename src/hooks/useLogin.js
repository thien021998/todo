import { useCallback, useState } from 'react';

const useLogin = () => {
  const [loading, setLoadingLogin] = useState(false)
  const login = useCallback(async (data) => {
    setLoadingLogin(true)
    const response = await fetch('https://todo-mvc-api-typeorm.herokuapp.com/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
    setLoadingLogin(false)
    return response.json()
  }, []);

  return { login, loading }
};

export default useLogin;
