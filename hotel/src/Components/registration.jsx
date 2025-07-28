export default function Registration() {
    return (
        <div>
            <div className="container d-flex justify-content-center align-items-center vh-100 bg-light">
                <div className="card shadow-lg p-4" style={{ width: '100%', maxWidth: '420px' }}>
                    <h2 className="text-center mb-4 text-primary">Sign Up <i class="fa-solid fa-user"></i></h2>
                    <form >
                        <div className="mb-3">
                            <label className="form-label">Full Name</label>
                            <input
                                type="text"
                                name="fullName"
                                className="form-control"

                                required
                            />
                        </div>

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

                        <div className="mb-3">
                            <label className="form-label">Confirm Password</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                className="form-control"

                                required
                            />
                        </div>

                        <button type="submit" className="btn btn-primary w-100 border-0">
                            Register
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}