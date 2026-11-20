import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  addPatient,
  deletePatient,
  dischargePatient,
  selectAllPatients,
  selectPatientsCount,
} from '../Store/slices/patientsSlice'
import { selectUser, logout } from '../Store/slices/authSlice'

function SecondPage() {
  const patients = useSelector(selectAllPatients)
  const count = useSelector(selectPatientsCount)
  const user = useSelector(selectUser)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [diagnosis, setDiagnosis] = useState('')
  const [ward, setWard] = useState('')

  const handleAdd = () => {
    if (!name || !diagnosis || !ward) return
    dispatch(addPatient({ name, diagnosis, ward, status: 'Лечится' }))
    setName('')
    setDiagnosis('')
    setWard('')
  }

  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
  }

  return (
    <div>
      <h1>Список больных </h1>
      {user && <p>Врач: {user.username}</p>}

      <div>
        <label>
          ФИО:
          <input value={name} onChange={e => setName(e.target.value)} />
        </label>
        <label>
          Диагноз:
          <input value={diagnosis} onChange={e => setDiagnosis(e.target.value)} />
        </label>
        <label>
          Палата:
          <input type="number" value={ward} onChange={e => setWard(e.target.value)} />
        </label>
        <button onClick={handleAdd}>Добавить больного</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>ФИО</th>
            <th>Диагноз</th>
            <th>Палата</th>
            <th>Статус</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {patients.map(p => (
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>{p.diagnosis}</td>
              <td>{p.ward}</td>
              <td>{p.status}</td>
              <td>
                {p.status !== 'Выписан' && (
                  <button onClick={() => dispatch(dischargePatient(p.id))}>Выписать</button>
                )}
                <button onClick={() => dispatch(deletePatient(p.id))}>Удалить</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={() => navigate('/')}>На главную</button>
      <button onClick={handleLogout}>Выйти</button>
    </div>
  )
}

export default SecondPage