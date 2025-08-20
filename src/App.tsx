import { Route, Routes } from 'react-router-dom'
import { motion } from 'framer-motion'
import Landing from './pages/Landing'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Settings from './pages/Settings'
import Guard from './auth/Guard'
import RouteTransition from './components/RouteTransition'

const pageVariants = {
    initial: { opacity: 0, y: 12 },
    in: { opacity: 1, y: 0 }
}

const Page = ({ children }: { children: React.ReactNode }) => (
    <motion.main
        className="app-shell"
        initial="initial"
        animate="in"
        variants={pageVariants}
        transition={{ type: 'spring', stiffness: 120, damping: 16, duration: 0.25 }}
    >
        {children}
    </motion.main>
)

export default function App() {
    return (
        <>
            <RouteTransition />
            <Routes>
                <Route path="/" element={<Page><Landing /></Page>} />
                <Route path="/signup" element={<Page><Signup /></Page>} />
                <Route path="/login" element={<Page><Login /></Page>} />
                <Route path="/settings" element={<Guard><Page><Settings /></Page></Guard>} />
                <Route path="*" element={<Page><Landing /></Page>} />
            </Routes>
        </>
    )
}


