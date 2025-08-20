import { useNavigate } from 'react-router-dom'

export default function BackButton() {
    const navigate = useNavigate()
    return (
        <button
            type="button"
            aria-label="Go back"
            className="back-btn"
            onClick={() => navigate(-1)}
        >
            ←
        </button>
    )
}


