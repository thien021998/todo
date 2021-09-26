import { useCallback, useState } from 'react';

const useSignup = () => {
  const [Loading, setLoadingRegis] = useState(false)
  const signup = useCallback(async (data) => {
    setLoadingRegis(true)
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

  return { signup, Loading }
};

export default useSignup;
