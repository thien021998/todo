import { useCallback, useState } from 'react';

const useLogin = () => {
  const [loadingLogin, setLoadingLogin] = useState(null)
  const login = useCallback(async (data) => {
    setLoadingLogin('Loading...')
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

  return { login, loadingLogin }
};

export default useLogin;
