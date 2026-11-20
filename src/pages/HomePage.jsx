import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { login } from '../Store/slices/authSlice'

function HomePage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogin = (e) => {
    e.preventDefault()
    if (!username || !password) return
    dispatch(login({ username, role: 'doctor' }))
    navigate('/users')
  }

  return (
    <div>
      <h1>Учёт больных в больнице</h1>
      <form onSubmit={handleLogin}>
        <label>
          Логин:
          <input value={username} onChange={e => setUsername(e.target.value)} />
        </label>
        <label>
          Пароль:
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </label>
        <button type="submit">Войти</button>
      </form>
    </div>
  )
}

export default HomePage