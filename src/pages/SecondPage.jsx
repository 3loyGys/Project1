import { useState } from 'react'
import EmployeeAPI from '../service.js'
import { useNavigate } from 'react-router-dom'

function SecondPage() {
  const [employees, setEmployees] = useState(EmployeeAPI.all())
  const [name, setName] = useState('')
  const [job, setJob] = useState('')
  const navigate = useNavigate()


  const handleDelete = (id) => {
    EmployeeAPI.delete(id)
    setEmployees(EmployeeAPI.all())
  }

  const handleAdd = () => {
    if (!name || !job) return

    EmployeeAPI.add({ name: name, job: job })
    setEmployees(EmployeeAPI.all())

    setName('')
    setJob('')
  }

  return (
    <div>
      <h1>Заменить тему</h1>

      <div>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          Job:
          <input
            type="text"
            value={job}
            onChange={(e) => setJob(e.target.value)}
          />
        </label>
        <button onClick={handleAdd}>Add User</button>
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
       <button onClick={() => navigate('/')}>
                Перейти на главную
            </button>
    </div>
  )
}

export default SecondPage