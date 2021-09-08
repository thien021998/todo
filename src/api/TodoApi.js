class TodoApi {
  url = 'https://todo-mvc-api-typeorm.herokuapp.com/api/todos'
  authorization = `Bearer ${localStorage.getItem("token")}`

  getAll = async (authorization) => {
    const response = await fetch (this.url,{
      method: 'GET',
        headers: {
          Authorization: this.authorization
        },
    })

    return response.json()
  }

  update = async (id,data) => {
    let item = {
      content : data
    }
    const response = await fetch(`${this.url}/${id}`,{
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.authorization
      },
      body: JSON.stringify(item)
    })

    return response.json()
  }

  create = async (data) => {
    const response = await fetch(this.url,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.authorization
      },
      body: JSON.stringify(data)
    })

    return response.json()
  }

  delete = async (id) => {
    const response = await fetch (`${this.url}/${id}`,{
      method: 'DELETE',
      headers: {
        Authorization: this.authorization
      },
    })

    return response.json()
  }

  login = async (data) => {
    const response = await fetch('https://todo-mvc-api-typeorm.herokuapp.com/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })

    return response.json()
  }

  signUp = async (data) => {
    const response = await fetch('https://todo-mvc-api-typeorm.herokuapp.com/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })

    return response.json()
  }
}

export default new TodoApi()
