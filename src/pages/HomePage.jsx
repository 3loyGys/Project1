import { useNavigate } from "react-router-dom"

function HomePage() {
    const navigate = useNavigate()
    return (
        <div>
            <h1>Добро пожаловать</h1>
            <p>Здесь позже появится форма входа.</p>


            <button onClick={() => navigate('/users')}>
                Перейти к списку
            </button>
        </div>
    )
}

export default HomePage