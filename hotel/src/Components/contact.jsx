import { useState } from "react";

export default function Contact() {
    const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(null);

    const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
    const validate = () => {
        const e = {};
        if (!form.name.trim()) e.name = "Required";
        if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Valid email required";
        if (!form.subject.trim()) e.subject = "Required";
        if (form.message.trim().length < 10) e.message = "Min 10 characters";
        setErrors(e);
        return Object.keys(e).length === 0;
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;
        setLoading(true); setStatus(null);
        try {
            const res = await fetch("/Mywork/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            if (!res.ok) throw new Error("Failed to send");
            setStatus({ type: "success", msg: "Message sent!" });
            setForm({ name: "", email: "", subject: "", message: "" });
        } catch (err) {
            setStatus({ type: "error", msg: err.message });
        } finally { setLoading(false); }
    };

    return (
        <div>
            <div class="container page-header mb-5 p-0 testimonial">
                <div class="container-fluid  py-5">
                    <div class="container text-center pb-5">
                        <h1 class="display-3 text-white mb-3 fw-bold">Contact</h1>
                        <nav aria-label="breadcrumb">
                            <ol class="breadcrumb justify-content-center text-uppercase">
                                <li class="breadcrumb-item"><a className="text-decoration-none text-white" href="#">Home</a></li>
                                <li class="breadcrumb-item"><a className="text-decoration-none text-white" href="#">Pages</a></li>
                                <li class="breadcrumb-item text-white active" aria-current="page">Booking</li>
                            </ol>
                        </nav>
                    </div>
                </div>
            </div>

            {/* <!-- Booking End --> */}
            <div className="container-xxl py-5">
                <div className="container">
                    <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
                        <h6 className="section-title text-center text-primary text-uppercase">Contact Us</h6>
                        <h1 className="mb-5">
                            <span className="text-primary text-uppercase">Contact</span> For Any Query
                        </h1>
                    </div>
                    <div className="row g-4">
                        <div className="col-12">
                            <div className="row gy-4">
                                <div className="col-md-4">
                                    <h6 className="section-title text-start text-primary text-uppercase">Booking</h6>
                                    <p><i className="fa fa-envelope-open text-primary me-2"></i>book@example.com</p>
                                </div>
                                <div className="col-md-4">
                                    <h6 className="section-title text-start text-primary text-uppercase">General</h6>
                                    <p><i className="fa fa-envelope-open text-primary me-2"></i>info@example.com</p>
                                </div>
                                <div className="col-md-4">
                                    <h6 className="section-title text-start text-primary text-uppercase">Technical</h6>
                                    <p><i className="fa fa-envelope-open text-primary me-2"></i>tech@example.com</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6 wow fadeIn" data-wow-delay="0.1s">
                            <iframe
                                className="position-relative rounded w-100 h-100"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3001156.4288297426!2d-78.01371936852176!3d42.72876761954724!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4ccc4bf0f123a5a9%3A0xddcfc6c1de189567!2sNew%20York%2C%20USA!5e0!3m2!1sen!2sbd!4v1603794290143!5m2!1sen!2sbd"
                                style={{ minHeight: '350px', border: 0 }}
                                allowFullScreen=""
                                aria-hidden="false"
                                tabIndex="0"
                                title="Google Map"
                            ></iframe>
                        </div>

                        <div className="col-md-6">
                            <div className="wow fadeInUp" data-wow-delay="0.2s">
                                <form onSubmit={handleSubmit} noValidate>
                                    <div className="row g-3">
                                        <div className="col-md-6">
                                            <div className="form-floating">
                                                <input
                                                    type="text"
                                                    className={`form-control ${errors.name ? "is-invalid" : ""}`}
                                                    id="name"
                                                    name="name"
                                                    placeholder="Your Name"
                                                    value={form.name}
                                                    onChange={onChange}
                                                />
                                                <label htmlFor="name">Your Name</label>
                                                {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="form-floating">
                                                <input
                                                    type="email"
                                                    className={`form-control ${errors.email ? "is-invalid" : ""}`}
                                                    id="email"
                                                    name="email"
                                                    placeholder="Your Email"
                                                    value={form.email}
                                                    onChange={onChange}
                                                />
                                                <label htmlFor="email">Your Email</label>
                                                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                                            </div>
                                        </div>

                                        <div className="col-12">
                                            <div className="form-floating">
                                                <input
                                                    type="text"
                                                    className={`form-control ${errors.subject ? "is-invalid" : ""}`}
                                                    id="subject"
                                                    name="subject"
                                                    placeholder="Subject"
                                                    value={form.subject}
                                                    onChange={onChange}
                                                />
                                                <label htmlFor="subject">Subject</label>
                                                {errors.subject && <div className="invalid-feedback">{errors.subject}</div>}
                                            </div>
                                        </div>

                                        <div className="col-12">
                                            <div className="form-floating">
                                                <textarea
                                                    className={`form-control ${errors.message ? "is-invalid" : ""}`}
                                                    placeholder="Leave a message here"
                                                    id="message"
                                                    name="message"
                                                    style={{ height: "150px" }}
                                                    value={form.message}
                                                    onChange={onChange}
                                                />
                                                <label htmlFor="message">Message</label>
                                                {errors.message && <div className="invalid-feedback">{errors.message}</div>}
                                            </div>
                                        </div>

                                        <div className="col-12">
                                            <button
                                                className="btn btn-primary w-100 py-3 px-3"
                                                type="submit"
                                                disabled={loading}
                                            >
                                                {loading && (
                                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                )}
                                                {loading ? "Sending..." : "Send Message"}
                                            </button>
                                        </div>

                                        {status && (
                                            <div className="col-12">
                                                <div className={`alert ${status.type === "success" ? "alert-success" : "alert-danger"} mb-0`}>
                                                    {status.msg}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </form>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}