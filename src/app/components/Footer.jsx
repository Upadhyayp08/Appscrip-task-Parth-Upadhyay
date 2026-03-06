// export default function Footer() {
//   return (
//     <footer className="footer" itemScope itemType="https://schema.org/WPFooter">
//       <div className="footer-top">
//         <div className="footer-newsletter">
//           <h3>Be the first to know</h3>
//           <p>Sign up for updates from mettā muse.</p>
//           <div
//             className="newsletter-form"
//             role="form"
//             aria-label="Newsletter subscription"
//           >
//             <label htmlFor="newsletter-email" className="sr-only">
//               Enter your email
//             </label>
//             <input
//               id="newsletter-email"
//               type="email"
//               className="newsletter-input"
//               placeholder="Enter your e-mail..."
//               aria-label="Email address"
//             />
//             <button
//               className="newsletter-btn"
//               type="button"
//               aria-label="Subscribe to newsletter"
//             >
//               SUBSCRIBE
//             </button>
//           </div>
//         </div>

//         <div className="footer-contact">
//           <h3>CONTACT US</h3>
//           <p>+44 221 133 5360</p>
//           <p>customercare@mettamuse.com</p>
//           <div className="footer-contact-label">CURRENCY</div>
//           <div className="currency-select">
//             <span>🇺🇸 USD</span>
//           </div>
//           <p
//             style={{
//               fontSize: 11,
//               color: "rgba(255,255,255,0.4)",
//               marginTop: 8,
//               lineHeight: 1.6,
//             }}
//           >
//             Transactions will be completed in Euros and a currency
//             <br />
//             reference is available on hover.
//           </p>
//         </div>
//       </div>

//       <div className="footer-bottom">
//         <div className="footer-col">
//           <h4>mettā muse</h4>
//           <ul>
//             {[
//               "About Us",
//               "Stories",
//               "Artisans",
//               "Boutiques",
//               "Contact Us",
//               "EU Compliances Docs",
//             ].map((item) => (
//               <li key={item}>
//                 <a href="#">{item}</a>
//               </li>
//             ))}
//           </ul>
//         </div>

//         <div className="footer-col">
//           <h4>QUICK LINKS</h4>
//           <ul>
//             {[
//               "Orders & Shipping",
//               "Join/Log in as a Seller",
//               "Payment & Policy",
//               "Return & Refunds",
//               "FAQs",
//               "Privacy Policy",
//               "Terms & Conditions",
//             ].map((item) => (
//               <li key={item}>
//                 <a href="#">{item}</a>
//               </li>
//             ))}
//           </ul>
//         </div>

//         <div className="footer-col">
//           <h4>FOLLOW US</h4>
//           <p
//             style={{
//               fontSize: 12,
//               color: "rgba(255,255,255,0.6)",
//               fontWeight: 300,
//             }}
//           >
//             Instagram · Facebook
//           </p>
//           <div className="social-links">
//             <a href="#" className="social-link" aria-label="Instagram">
//               <svg
//                 width="14"
//                 height="14"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="1.5"
//                 aria-hidden="true"
//               >
//                 <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
//                 <circle cx="12" cy="12" r="5" />
//                 <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
//               </svg>
//             </a>
//             <a href="#" className="social-link" aria-label="Facebook">
//               <svg
//                 width="14"
//                 height="14"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="1.5"
//                 aria-hidden="true"
//               >
//                 <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
//               </svg>
//             </a>
//           </div>

//           <div style={{ marginTop: 24 }}>
//             <h4 style={{ marginBottom: 12 }}>mettā muse ACCEPTS</h4>
//             <div
//               className="payment-methods"
//               role="list"
//               aria-label="Accepted payment methods"
//             >
//               {["VISA", "MC", "AMEX", "PAYPAL", "GPay", "Klarna"].map((p) => (
//                 <div
//                   key={p}
//                   className="payment-icon"
//                   role="listitem"
//                   aria-label={p}
//                 >
//                   {p}
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="footer-copyright">
//         <p>Copyright © 2023 mettamuse. All rights reserved.</p>
//       </div>

//       {/* Screen-reader only style */}
//       <style>{`.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border-width:0}`}</style>
//     </footer>
//   );
// }

export default function Footer() {
  return (
    <footer className="footer" itemScope itemType="https://schema.org/WPFooter">
      <div className="footer-top">
        <div className="footer-newsletter">
          <h3>BE THE FIRST TO KNOW</h3>
          <p>Sign up for updates from mettā muse.</p>
          <div
            className="newsletter-form"
            role="form"
            aria-label="Newsletter subscription"
          >
            <label htmlFor="newsletter-email" className="sr-only">
              Enter your email
            </label>
            <input
              id="newsletter-email"
              type="email"
              className="newsletter-input"
              placeholder="Enter your e-mail..."
              aria-label="Email address"
            />
            <button
              className="newsletter-btn"
              type="button"
              aria-label="Subscribe to newsletter"
            >
              SUBSCRIBE
            </button>
          </div>
        </div>

        <div className="footer-contact">
          <h3>CONTACT US</h3>
          <p>+44 221 133 5360</p>
          <p>customercare@mettamuse.com</p>
          <div className="footer-contact-label">CURRENCY</div>
          <div className="currency-select">
            <span>🇺🇸 &nbsp;USD</span>
          </div>
          <p className="footer-currency-note">
            Transactions will be completed in Euros and a currency reference is
            available on hover.
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-col">
          <h4>mettā muse</h4>
          <ul>
            {[
              "About Us",
              "Stories",
              "Artisans",
              "Boutiques",
              "Contact Us",
              "EU Compliances Docs",
            ].map((item) => (
              <li key={item}>
                <a href="#">{item}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-col">
          <h4>QUICK LINKS</h4>
          <ul>
            {[
              "Orders & Shipping",
              "Join/Login as a Seller",
              "Payment & Pricing",
              "Return & Refunds",
              "FAQs",
              "Privacy Policy",
              "Terms & Conditions",
            ].map((item) => (
              <li key={item}>
                <a href="#">{item}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-col">
          <h4>FOLLOW US</h4>
          <div className="social-links">
            <a href="#" className="social-link" aria-label="Instagram">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden="true"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <circle cx="12" cy="12" r="5" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
              </svg>
            </a>
            <a href="#" className="social-link" aria-label="LinkedIn">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
          </div>

          <div style={{ marginTop: 32 }}>
            <h4 style={{ marginBottom: 16 }}>mettā muse ACCEPTS</h4>
            <div
              className="payment-methods"
              role="list"
              aria-label="Accepted payment methods"
            >
              {[
                { name: "Google Pay", short: "G Pay" },
                { name: "Mastercard", short: "MC" },
                { name: "PayPal", short: "PP" },
                { name: "American Express", short: "AMEX" },
                { name: "Apple Pay", short: "⌘Pay" },
                { name: "Shop Pay", short: "Shop" },
              ].map((p) => (
                <div
                  key={p.name}
                  className="payment-icon"
                  role="listitem"
                  aria-label={p.name}
                >
                  {p.short}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="footer-copyright">
        <p>Copyright © 2023 mettamuse. All rights reserved.</p>
      </div>

      <style>{`.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border-width:0}`}</style>
    </footer>
  );
}
