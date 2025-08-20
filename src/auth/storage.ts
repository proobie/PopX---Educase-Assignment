export type User = {
    fullName: string
    phone: string
    email: string
    password: string
    company?: string
    isAgency: boolean
    bio?: string
    avatarUrl?: string
}

const USER_KEY = 'popx:user'
const SESSION_KEY = 'popx:session'

export function saveUser(user: User) {
    const normalized: User = { ...user, email: user.email.trim().toLowerCase() }
    localStorage.setItem(USER_KEY, JSON.stringify(normalized))
}

export function getUser(): User | null {
    const raw = localStorage.getItem(USER_KEY)
    return raw ? (JSON.parse(raw) as User) : null
}

export function setSession(email: string) {
    localStorage.setItem(SESSION_KEY, JSON.stringify({ email: email.trim().toLowerCase() }))
}

export function getSession(): { email: string } | null {
    const raw = localStorage.getItem(SESSION_KEY)
    return raw ? (JSON.parse(raw) as { email: string }) : null
}

export function clearSession() {
    localStorage.removeItem(SESSION_KEY)
}

export function isAuthenticated() {
    return Boolean(getSession())
}


