import React from 'react'
import ShowForm from './ShowForm'
import { Redirect } from 'react-router-dom'
class list extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      arr: [],
      item: undefined,
      showForm: false
    }
  }

  componentDidMount() {
    fetch('https://todo-mvc-api-typeorm.herokuapp.com/api/todos', {
      method: 'GET', // or 'PUT'
      headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijk3OTdhYTI4LTBkNjQtNGE2MS05OTllLTkxZDBhN2ZkMTc1MCIsImlhdCI6MTYyNDMzNzcyNSwiZXhwIjoxNjI0OTQyNTI1fQ.NBmCaV75x9eLwPQdQj9vZIb4V12tJH6w3_TFSbUZBrA'
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({ arr: data.items })
      })
      .catch((error) => {
        console.error('Error:', error);
      })
  }

  deleteItems = (id) => {
    fetch('https://todo-mvc-api-typeorm.herokuapp.com/api/todos/' + id, {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijk3OTdhYTI4LTBkNjQtNGE2MS05OTllLTkxZDBhN2ZkMTc1MCIsImlhdCI6MTYyNDU2NTM1OCwiZXhwIjoxNjI1MTcwMTU4fQ.DuArtUo-2Ja5JOJjlwVbiIlvGv9pSCuKeYp-F4XioJ8'
      }
    })
      .then(res => {
        res.text();
        let index = this.state.arr.findIndex(i => i.id === id)
        this.state.arr.splice(index, 1)
        this.setState({ arr: this.state.arr })
      }) // or res.json()
      .then(res => console.log(res))
      .catch((error) => {
        console.error('Error:', error);
      })
  }

  handleSave = (data) => {
    if (this.state.item.id) {
      fetch('https://todo-mvc-api-typeorm.herokuapp.com/api/todos/' + this.state.item.id, {
        method: 'PUT', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijk3OTdhYTI4LTBkNjQtNGE2MS05OTllLTkxZDBhN2ZkMTc1MCIsImlhdCI6MTYyNDU2NTM1OCwiZXhwIjoxNjI1MTcwMTU4fQ.DuArtUo-2Ja5JOJjlwVbiIlvGv9pSCuKeYp-F4XioJ8'
        },
        body: JSON.stringify(data)
      })
        .then(response => response.json())
        .then(data => {
          const newRecords = this.state.arr.map((record) => {
            if (record.id === data.id) {
              record = { ...record, ...data }
            }
            return record
          })
          this.setState({ arr: newRecords })
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    } else {
      fetch('https://todo-mvc-api-typeorm.herokuapp.com/api/todos', {
        method: 'POST', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijk3OTdhYTI4LTBkNjQtNGE2MS05OTllLTkxZDBhN2ZkMTc1MCIsImlhdCI6MTYyNDU2NTM1OCwiZXhwIjoxNjI1MTcwMTU4fQ.DuArtUo-2Ja5JOJjlwVbiIlvGv9pSCuKeYp-F4XioJ8'
        },
        body: JSON.stringify(data)
      })
        .then(response => response.json())
        .then(data => {
          this.setState({
            arr: [data, ...this.state.arr]
          })
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }

    this.handleCancel()
  }

  handleCancel = () => {
    this.setState({
      item: undefined
    })
  }

  handleEdit = (item) => {
    this.setState({ item: item })
    console.log(this.state.item)
  }

  handleLogOut = () =>{
    localStorage.removeItem("username")
    this.props.history.push("/login")
  }
  render() {
    if (!localStorage.getItem("username")) {
      return (
        <Redirect to="/login" />
      )
    } else {
      return (
        <div className="row">
          <button className="btn btn-warning btn-login" onClick={this.handleLogOut}>logout</button>
          <h2 className="title">Render Form Todo-List with Reactjs</h2>
          <button className="btn btn-primary btn-create" onClick={() => this.handleEdit({})}>Create</button>
          {!!this.state.item && <ShowForm item={this.state.item} handleCancel={this.handleCancel} handleSave={this.handleSave} />}
          <div className="table-wrapper">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Index</th>
                  <th>Content</th>
                  <th>Status</th>
                  <th>Create-date</th>
                  <th>Update-date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {this.state.arr.map((item) => {
                  return (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.content}</td>
                      <td>{item.status}</td>
                      <td>{item.created_at.split("T", 1)}</td>
                      <td>{item.updated_at.split("T", 1)}</td>
                      <td>
                        <button className="btn btn-warning" onClick={() => this.handleEdit(item)}>
                          Edit
                        </button>
                        <button className="btn btn-primary" onClick={() => (this.deleteItems(item.id))}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )
    }
  }
}

export default list
