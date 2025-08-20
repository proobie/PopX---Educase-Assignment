import { useEffect, useState } from 'react'
import { clearSession, getUser, User } from '../auth/storage'
import { useNavigate } from 'react-router-dom'

export default function Settings() {
    const [user, setUser] = useState<User | null>(null)
    const navigate = useNavigate()

    useEffect(() => { setUser(getUser()) }, [])

    if (!user) return null

    return (
        <div className="phone-frame">
            <div className="card-title">Account Settings</div>
            <div className="spacer-lg" />
            <div className="user-row">
                <div className="avatar">
                    <img src={user.avatarUrl || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=300&auto=format&fit=crop'} alt="avatar" />
                    <span className="camera-badge">📷</span>
                </div>
                <div>
                    <div style={{ fontWeight: 700 }}>{user.fullName}</div>
                    <div style={{ color: '#6d6d6d' }}>{user.email}</div>
                </div>
            </div>

            <div className="spacer-lg" />
            <div className="divider" />
            <div className="spacer-lg" />
            <div className="muted" style={{ color: '#424242' }}>{user.bio}</div>

            <div style={{ position: 'absolute', bottom: 24, left: 24, right: 24 }}>
                <button className="btn btn-secondary" onClick={() => { clearSession(); setTimeout(() => navigate('/', { replace: true }), 50) }}>Log out</button>
            </div>
        </div>
    )
}


