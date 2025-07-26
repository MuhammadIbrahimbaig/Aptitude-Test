import { Splide, SplideSlide } from '@splidejs/react-splide';
import testimonial from '../assets/images/testimonial-3.jpg'

export default function Testimonial(){
    return(
        <div>
             {/* <!-- Testimonial Start --> */}
            <div className="container testimonial my-5 py-5 bg-dark">
                <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
                        <h6 className="section-title text-center text-primary text-uppercase">Our Services</h6>
                        <h1 className="mb-5 text-white">Explore Our <span className="text-primary text-uppercase">Services</span></h1>
                    </div>
                <div className="container">
                    <Splide
                        options={{
                            type: 'loop',
                            padding: '5rem',
                            gap: '2rem',
                            autoplay: true,
                            pauseOnHover: true,
                            perPage: 2,
                        }}
                        aria-label="Testimonial Carousel"
                    >
                        <SplideSlide>
                            <div className="testimonial-item position-relative bg-white  overflow-hidden p-4">
                                <p>Tempor stet labore dolor clita stet diam amet...</p>
                                <div className="d-flex align-items-center mt-3">
                                    <img src={testimonial} alt="Client" className="img-fluid rounded" style={{ width: 45, height: 45 }} />
                                    <div className="ps-3">
                                        <h6 className="fw-bold mb-1">Client Name</h6>
                                        <small>Profession</small>
                                    </div>
                                </div>
                                <i className="fa fa-quote-right fa-3x text-primary position-absolute end-0 bottom-0 me-4 mb-n1"></i>
                            </div>
                            
                        </SplideSlide>
  
                    </Splide>
                </div>
            </div>
            {/* <!-- Testimonial End / */}
        </div>
    )
}