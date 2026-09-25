import { useState } from 'react'
import EmployeeAPI from './service.js'

function App() {
  const [employees, setEmployees] = useState(EmployeeAPI.all())

  const handleDelete = (id) => {
    EmployeeAPI.delete(id)
    setEmployees(EmployeeAPI.all())
  }

  return (
    <div>
      <h1>Заменить тему</h1>

            <div>
        <label>
          Name:
          <input type="text" />
        </label>
        <label>
          Job:
          <input type="text" />
        </label>
        <button>Add User</button>
      </div>
      
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Job</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id}>
              <td>{emp.id}</td>
              <td>{emp.name}</td>
              <td>{emp.job}</td>
              <td>
                <button onClick={() => handleDelete(emp.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default App