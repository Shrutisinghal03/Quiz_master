import React from 'react';
import '../../App.css'; 
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Company Name</h3>
          <p>About Us</p>
          <p>Contact Us</p>
          <p>Careers</p>
        </div>
        <div className="footer-section">
          <h3>Products</h3>
          <p>Product 1</p>
          <p>Product 2</p>
          <p>Product 3</p>
        </div>
        <div className="footer-section">
          <h3>Follow Us</h3>
          <p>Facebook</p>
          <p>Twitter</p>
          <p>LinkedIn</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Beautiful Landing Page. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
