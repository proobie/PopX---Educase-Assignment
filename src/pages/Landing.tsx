import { Link } from 'react-router-dom'

export default function Landing() {
    return (
        <div className="phone-frame" key="landing">
            <div className="hero-circle">1</div>

            <div style={{ marginTop: 360 }} />

            <div className="h1">Welcome to PopX</div>
            <div className="muted">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            </div>

            <div className="spacer-xl" />
            <Link className="btn btn-primary btn-link" to="/signup" replace={false}>Create Account</Link>
            <div className="spacer-md" />
            <Link className="btn btn-secondary btn-link" to="/login" replace={false}>Already Registered? Login</Link>
        </div>
    )
}


