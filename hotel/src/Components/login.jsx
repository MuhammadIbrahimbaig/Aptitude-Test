export default function Loginform() {
    return (
        <div className="container d-flex align-items-center justify-content-center vh-100 bg-light">
            <div className="card shadow p-4" style={{ width: '100%', maxWidth: '400px' }}>
                <h2 className="text-center text-primary mb-4">Login</h2>
                <form >
                    <div className="mb-3">
                        <label className="form-label">Email address</label>
                        <input
                            type="email"
                            name="email"
                            className="form-control"
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input
                            type="password"
                            name="password"
                            className="form-control"
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-primary w-100">Login</button>

                    <div className="mt-3 text-center">
                        <small>
                            Don't have an account? <a className="text-decoration-none" href="/register">Register</a>
                        </small>
                    </div>
                </form>
            </div>
        </div>
    );
}
