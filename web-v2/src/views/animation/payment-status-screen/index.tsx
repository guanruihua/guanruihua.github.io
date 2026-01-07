import React from 'react'
import './index.less'
import { usePageState } from './state'

export default function () {
  usePageState()
  return (
    <div className="animation__payment-status-screen">
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/css/all.min.css"
        integrity="sha512-2SwdPD6INVrV/lHTZbO2nodKhrnDdJK9/kg2XD1r9uGqPo1cUbujc+IYdlYdEErWNu69gVcYgdxlmVmzTWnetw=="
        crossOrigin="anonymous"
        referrerPolicy="no-referrer"
      />

      <section className="container">
        <section className="invoice-container">
          <div className="invoice-slot">
            <div className="slot-hole"></div>
          </div>
          <div className="invoice">
            <h2 className="title">Trip Invoice &mdash; Japan Summer 2025</h2>
            <p className="amount">
              Total <span className="value">$30,000</span>
            </p>
            <p className="amount">
              Per Person <span className="value">$6,000</span>
            </p>

            <hr />

            <ul className="payers-list">
              <li>
                <div className="payer-image-container">
                  <img src="https://res.cloudinary.com/dmuyehme1/image/upload/v1761081494/user1_okmfkd.png" />
                </div>
                <p>
                  You
                  <span className="pay-tag">
                    <i className="fa-solid fa-circle-check"></i> Paid
                  </span>
                </p>
              </li>
              <li>
                <div className="payer-image-container">
                  <img src="https://res.cloudinary.com/dmuyehme1/image/upload/v1761082627/user4_dujvoe.svg" />
                </div>
                <p>
                  Olabode
                  <span className="pay-tag">
                    <i className="fa-solid fa-circle-check"></i> Paid
                  </span>
                </p>
              </li>
              <li>
                <div className="payer-image-container">
                  <img src="https://res.cloudinary.com/dmuyehme1/image/upload/v1761082286/user3_ue0zzq.avif" />
                </div>
                <p>
                  Lukmon
                  <span className="pay-tag">
                    <i className="fa-solid fa-circle-check"></i> Paid
                  </span>
                </p>
              </li>
              <li>
                <div className="payer-image-container">
                  <img src="https://res.cloudinary.com/dmuyehme1/image/upload/v1761081494/user1_okmfkd.png" />
                </div>
                <p>
                  Hope
                  <span className="pay-tag">
                    <i className="fa-solid fa-clock"></i> Unpaid
                  </span>
                </p>
              </li>
              <li>
                <div className="payer-image-container">
                  <img src="https://res.cloudinary.com/dmuyehme1/image/upload/v1761082184/user2_b821x7.avif" />
                </div>
                <p>
                  Dara
                  <span className="pay-tag">
                    <i className="fa-solid fa-clock"></i> Unpaid
                  </span>
                </p>
              </li>
            </ul>

            <div className="payment-status">
              <p className="heading">
                Payment Status
                <span>Unpaid</span>
              </p>
              <div className="status-progress">
                <div className="checkpoint">
                  <i className="fa-solid fa-circle-check"></i>
                </div>
                <div className="checkpoint">
                  <i className="fa-solid fa-circle-check"></i>
                </div>
                <div className="checkpoint">
                  <i className="fa-solid fa-circle-check"></i>
                </div>
                <div className="checkpoint">
                  <span className="circle"></span>
                </div>
                <div className="checkpoint">
                  <i className="fa-solid fa-stamp"></i>
                </div>
              </div>
            </div>
            <div className="btn-group">
              <button className="btn reminder-btn">Send Reminder</button>
              <button className="btn download-btn">Download Invoice</button>
            </div>
          </div>
        </section>
        <hr />
        <div className="payment-info">
          <p>Payment Method</p>
          <div className="card-info">
            <p>Visa Ending 2986</p>
            <span className="card-icon"></span>
          </div>
        </div>
        <button className="pay-now-btn">Pay Now</button>
      </section>
    </div>
  )
}
