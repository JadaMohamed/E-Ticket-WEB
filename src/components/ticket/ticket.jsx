import React, { useEffect, useRef, useState } from "react";
import "../../css/ticket.css";
import TicketComponent from "../../organizer/components/create post form/ticket_comp";
import { printComponent, printDiv } from "../../Utils/divToImage";
import CountdownDate from "../common/countdown";

import "../../organizer/css/create post form/ticket_form.css";
import Axios from "axios";
import { Image } from "cloudinary-react";

function Ticket({ ticket, onClick, checkedTickets, setCheckedTickets }) {
  const apiUrl = process.env.REACT_APP_API_URL;
  const ticketRef = useRef(null);
  const [seatCategory, setSeatCategory] = useState();
  const downloadTicket = () => {
    printDiv(ticketRef.current);
  };
  useEffect(() => {
    const getTicketSeatCategory = async () => {
      try {
        const response = await Axios.get(
          `${apiUrl}/api/seat-categories/${ticket.seat_categ_id}`,
          { withCredentials: true }
        );
        setSeatCategory(response.data.type_name);
      } catch (error) {
        console.error(error);
      }
    };

    getTicketSeatCategory();
  }, []);

  //when the ticket is checked it will be added to checkedTickets
  //if clicked for unchecked it will be removed from ckeckedTickets
  function handleCheckboxChange(event) {
    const ticketId = ticket.ticket_id;
    const isChecked = event.target.checked;

    if (isChecked) {
      setCheckedTickets([...checkedTickets, ticketId]);
    } else {
      setCheckedTickets(checkedTickets.filter((id) => id !== ticketId));
    }
  }
  return (
    <>
      <div className={`ticket-card-table selected`}>
        <div className="ticket-card">
          <div className="ticket-card-container">
            <div className="ticket-infos">
              <input
                type="checkbox"
                name="selected-product"
                className="disable-on-mobile"
                title="Select"
                checked={checkedTickets.includes(ticket.ticket_id)}
                onChange={handleCheckboxChange}
              />
              <div className="preview-image">
                <Image
                  cloudName="djjwswdo4"
                  publicId={ticket.Event.brand_url}
                  alt=""
                />
              </div>
              <div className="event-inf">
                <div className="event-title">{ticket.Event.title}</div>

                <div className="local inf">
                  <span className="material-symbols-outlined">location_on</span>
                  {ticket.Event.location}
                </div>
                <div className="date inf">
                  <span className="material-symbols-outlined">
                    hourglass_top
                  </span>
                  <CountdownDate date={ticket.Event.start_time} />
                </div>
                <div className="event-category">{ticket.Event.event_type}</div>
              </div>
            </div>
            <div className="ticket-consult">
              <div className="btns">
                <div
                  className="download-ticket btn"
                  onClick={() => downloadTicket()}
                >
                  <span className="material-symbols-outlined">download</span>
                  Download
                </div>
                <div
                  className="XXXXXX btn"
                  onClick={() => onClick(ticket)}
                  style={{ marginTop: 0 }}
                >
                  <span className="material-symbols-outlined">
                    qr_code_scanner
                  </span>
                  View
                </div>
              </div>
              <input
                type="checkbox"
                name="selected-product"
                className="select-ticket-mobile"
              />
            </div>
          </div>
        </div>
        <TicketComponent
          eventData={ticket.Event}
          ref={ticketRef}
          ticketCategory={seatCategory}
          qrCode={ticket.qrcode}
          width={"800px"}
          visible={false}
          // image={
          //   "https://res.cloudinary.com/djjwswdo4/image/upload/v1/" +
          //   ticket.Event.brand_url
          // }
        />
      </div>
    </>
  );
}

export default Ticket;
