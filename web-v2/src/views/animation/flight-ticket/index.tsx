import './index.less'

export default function () {
  return (
    <div className="animation__flight-ticket">
      <div className="ticket">
        <div className="ticket__body">
          <h2 className="ticket__fly">
            ZRH <span>✈</span> OSL
          </h2>
          <p>
            <span className="ticket__label">Passenger</span>
            <br />
            <span className="ticket__value">MEGAFRY MR</span>
          </p>
          <dl className="ticket__infos">
            <dt className="ticket__label">Gate</dt>
            <dd className="ticket__value">B24</dd>

            <dt className="ticket__label">Departure</dt>
            <dd className="ticket__value">14:35</dd>

            <dt className="ticket__label">Speedy</dt>
            <dd className="ticket__value">Yes</dd>

            <dt className="ticket__label">Boarding</dt>
            <dd className="ticket__value">14:05</dd>
          </dl>
        </div>
        <div className="ticket__tear-off">
          <div className="barcode"></div>
          43596885365490358
        </div>
      </div>
    </div>
  )
}
