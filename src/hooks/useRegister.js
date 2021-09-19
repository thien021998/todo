import { useCallback, useState } from 'react';

const useRegister = () => {
  const [LoadingRegis, setLoadingRegis] = useState(null)
  const register = useCallback(async (data) => {
    setLoadingRegis('Loading...')
    const response = await fetch('https://todo-mvc-api-typeorm.herokuapp.com/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
    setLoadingRegis(false)
    return response.json()
  }, []);

  return { register, LoadingRegis }
};

export default useRegister;
