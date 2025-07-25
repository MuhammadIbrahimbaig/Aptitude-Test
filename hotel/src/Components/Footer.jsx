export default function Footer() {
    return (
        <div>

            <footer class="footer">
                <div class="footer_content">
                    <div class="container">
                        <div class="row">
                            <div class="col">
                                <div class="footer_logo_container text-center">
                                    <div class="footer_logo">
                                        <a href="#"></a>
                                        <div>The River</div>
                                        <div>since 1945</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row footer_row">

                            <div class="col-lg-3">
                                <div class="footer_title">Our Address</div>
                                <div class="footer_list">
                                    <ul>
                                        <li>Beach Str. 345</li>
                                        <li>67559 Miami</li>
                                        <li>USA</li>
                                    </ul>
                                </div>
                            </div>

                            <div class="col-lg-3">
                                <div class="footer_title">Reservations</div>
                                <div class="footer_list">
                                    <ul>
                                        <li>Tel: 345 5667 889</li>
                                        <li>Fax; 6783 4567 889</li>
                                        <li>reservations@hotelriver.com</li>
                                    </ul>
                                </div>
                            </div>

                            <div class="col-lg-3">
                                <div class="footer_title">Newsletter</div>
                                <div class="newsletter_container">
                                    <form action="#" class="newsletter_form" id="newsletter_form">
                                        <input type="email" class="newsletter_input" placeholder="Your email address" required="required"/>
                                            <button class="newsletter_button">Subscribe</button>
                                    </form>
                                </div>
                            </div>

                            <div class="col-lg-3">
                                <div class="certificates d-flex flex-row align-items-start justify-content-lg-between justify-content-start flex-lg-nowrap flex-wrap">
                                    <div class="cert"><img src="images/cert_1.png" alt=""/></div>
                                    <div class="cert"><img src="images/cert_2.png" alt=""/></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
              
            </footer>
        </div>
    )
}