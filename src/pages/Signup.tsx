import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { saveUser, setSession, User } from '../auth/storage'
import Loader from '../components/Loader'
import BackButton from '../components/BackButton'
import { motion } from 'framer-motion'

export default function Signup() {
    const navigate = useNavigate()
    const [isSubmitting, setIsSubmitting] = useState(false)

    const [form, setForm] = useState<User>({
        fullName: '',
        phone: '',
        email: '',
        password: '',
        company: '',
        isAgency: true,
        bio: 'Lorem Ipsum Dolor Sit Amet, Consetetur Sadipscing Elitr, Sed Diam Nonumy Eirmod Tempor Invidunt Ut Labore Et Dolore Magna Aliquam Erat, Sed Diam'
    })

    function update<K extends keyof User>(key: K, value: User[K]) {
        setForm(prev => ({ ...prev, [key]: value }))
    }

    async function onSubmit(e: FormEvent) {
        e.preventDefault()
        setIsSubmitting(true)
        await new Promise(r => setTimeout(r, 900))
        saveUser(form)
        setSession(form.email)
        navigate('/settings')
    }

    return (
        <div className="phone-frame with-back">
            <BackButton />
            <motion.div
                className="h1"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
            >
                Create your PopX account
            </motion.div>

            <form onSubmit={onSubmit}>
                <div className="spacer-lg" />

                <motion.div className="field" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
                    <label className="label">Full Name*</label>
                    <input className="input" value={form.fullName} onChange={e => update('fullName', e.target.value)} />
                </motion.div>

                <div className="spacer-md" />

                <motion.div className="field" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                    <label className="label">Phone number*</label>
                    <input className="input" inputMode="numeric" pattern="[0-9]*" maxLength={15} value={form.phone} onChange={e => {
                        const onlyDigits = e.target.value.replace(/\D+/g, '')
                        update('phone', onlyDigits)
                    }} />
                </motion.div>

                <div className="spacer-md" />

                <motion.div className="field" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
                    <label className="label">Email address*</label>
                    <input type="email" className="input" value={form.email} onChange={e => update('email', e.target.value)} />
                </motion.div>

                <div className="spacer-md" />

                <motion.div className="field" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                    <label className="label">Password *</label>
                    <input type="password" className="input" value={form.password} onChange={e => update('password', e.target.value)} />
                </motion.div>

                <div className="spacer-md" />

                <motion.div className="field" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
                    <label className="label">Company name</label>
                    <input className="input" value={form.company} onChange={e => update('company', e.target.value)} />
                </motion.div>

                <div className="spacer-lg" />
                <motion.div className="label" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>Are you an Agency?*</motion.div>
                <motion.div className="radio-row" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.32 }}>
                    <label>
                        <input type="radio" name="isAgency" checked={form.isAgency} onChange={() => update('isAgency', true)} />
                        Yes
                    </label>
                    <label>
                        <input type="radio" name="isAgency" checked={!form.isAgency} onChange={() => update('isAgency', false)} />
                        No
                    </label>
                </motion.div>

                <div className="spacer-xxl" />
                {isSubmitting ? <Loader /> : (
                    <motion.button whileTap={{ scale: 0.98 }} whileHover={{ y: -1 }} className="btn btn-primary" type="submit">Create Account</motion.button>
                )}
            </form>
        </div>
    )
}


