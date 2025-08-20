import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'

export default function RouteTransition() {
    const location = useLocation()
    const [active, setActive] = useState(false)
    const keyRef = useRef(0)

    useEffect(() => {
        // trigger short progress animation on every location change
        setActive(false)
        // next tick to restart animation cleanly
        const id = setTimeout(() => {
            keyRef.current += 1
            setActive(true)
            // auto hide after complete
            setTimeout(() => setActive(false), 520)
        }, 10)
        return () => clearTimeout(id)
    }, [location.pathname])

    return (
        <div className="route-progress" aria-hidden>
            {active && <div key={keyRef.current} className="route-progress-bar" />}
        </div>
    )
}


