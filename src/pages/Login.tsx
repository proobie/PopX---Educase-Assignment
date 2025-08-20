import { FormEvent, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { getUser, setSession } from '../auth/storage'
import Loader from '../components/Loader'
import BackButton from '../components/BackButton'
import { motion } from 'framer-motion'

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()
    const location = useLocation() as { state?: { from?: string } }

    async function onSubmit(e: FormEvent) {
        e.preventDefault()
        setError('')
        setLoading(true)
        await new Promise(r => setTimeout(r, 700))
        const user = getUser()
        if (!user) {
            setError('No account found. Please create an account first.')
            setLoading(false)
            return
        }
        if (user.email === email.trim().toLowerCase() && user.password === password) {
            setSession(user.email)
            navigate(location.state?.from || '/settings')
        } else {
            setError('Invalid credentials')
            setLoading(false)
        }
    }

    return (
        <div className="phone-frame with-back">
            <BackButton />
            <motion.div className="h1" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>Signin to your PopX account</motion.div>
            <motion.div className="muted" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit,</motion.div>

            <form onSubmit={onSubmit}>
                <div className="spacer-lg" />
                <motion.div className="field" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }}>
                    <label className="label">Email Address</label>
                    <input type="email" className="input" placeholder="Enter email address" value={email} onChange={e => setEmail(e.target.value)} />
                </motion.div>
                <div className="spacer-md" />
                <motion.div className="field" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 }}>
                    <label className="label">Password</label>
                    <input type="password" className="input" placeholder="Enter password" value={password} onChange={e => setPassword(e.target.value)} />
                </motion.div>

                <div className="spacer-lg" />
                {error && <div className="muted" style={{ color: '#d33' }}>{error}</div>}
                <div className="spacer-md" />
                {loading ? <Loader /> : (
                    <motion.button whileTap={{ scale: 0.98 }} whileHover={{ y: -1 }} className="btn" style={{ background:'#d6d6d6', color:'#555', cursor:'pointer' }} type="submit">Login</motion.button>
                )}
            </form>
        </div>
    )
}


