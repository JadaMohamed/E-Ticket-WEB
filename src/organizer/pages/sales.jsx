import react, { useContext, useEffect, useState } from "react";
import OrNavigationBar from "../components/navigation_bar";
import SearchOrganizer from "../components/searchorganizer";
import SideBar from "../components/side_bar";
import "../css/sales.css";
import Graph1 from "../../img/biggraph.svg";
import Graph2 from "../../img/smallgraph.svg";
import Cercle from "../../img/cercle.svg";
import Selected from "../../img/selectedevent.svg";
import SalesTable from "../components/salestable";
import Navbar from "../../components/common/navbar";
import SubNavbar from "../../components/common/subnavbar";
import OrganizerSummary from "../components/organizer_summary";
import EventsDropDown from "../components/eventsdropdown";
import AuthContext from "../../Auth/AuthContext";
import Axios from "axios";
import EventSummaryGraph from "../components/eventsummarygraph";
import SpecifiedEventSeatSales from "../components/specified_event_seats_sales";
import EarningRow from "../components/earning_row";
import WithrawForm from "../components/withraw_form";

function Sales() {
  const { profile } = useContext(AuthContext);
  const [orgEvents, setOrgEvents] = useState(null);
  const [withdraw, setWithdraw] = useState(false);
  const apiUrl = process.env.REACT_APP_API_URL;
  const [eventId, setEventId] = useState();
  return (
    <div>
      <Navbar />
      <SideBar activeBtn="sales" />
      <div className="container">
        <div className="earning-cards">
          <div className="earning-cards-container">
            <div
              className="stats-card"
              style={{ borderRight: "1px solid var(--LightPurple)" }}
            >
              <div className="stats-card-container">
                <div className="card-header">
                  Available earning balance
                  <div className="sub-header">Balance available for use</div>
                </div>

                <div className="amount">
                  3023 <span>MAD</span>
                </div>
              </div>
            </div>
            <div
              className="stats-card"
              style={{ borderRight: "1px solid var(--LightPurple)" }}
            >
              <div className="stats-card-container">
                <div className="card-header">
                  Earnings to date{" "}
                  <div className="sub-header">Your earnings since joining.</div>
                </div>
                <div className="amount">
                  4050 <span>MAD</span>
                </div>
              </div>
            </div>
            <div className="stats-card">
              <div className="stats-card-container">
                <div className="card-header">
                  Withdrawn to date{" "}
                  <div className="sub-header">Withdrawn since joining.</div>
                </div>
                <div className="amount">
                  1027<span>MAD</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="earning-per-event">
          <div className="earning-per-event-container">
            <table>
              <tr>
                <th>Event</th>
                <th>Description</th>
                <th>Earned</th>
                <th>Withdrawn</th>
                <th>Date</th>
                <th></th>
              </tr>
              <EarningRow
                id={"100"}
                title={"CONCERT SMALL X & TAGNE RABAT"}
                profit={"1927"}
                withdrawn={"0"}
                withdrawn_date={""}
                setEventId={setEventId}
                setWithdraw={setWithdraw}
              />
              <EarningRow
                id={"106"}
                title={"LIMAF FESTIVAL RABAT"}
                profit={"107"}
                withdrawn={"1027"}
                withdrawn_date={"Mars 16 2023"}
                setEventId={setEventId}
                setWithdraw={setWithdraw}
              />
              <EarningRow
                id={"102"}
                title={"GIMS & FRIENDS STARS IN THE PLACE"}
                profit={"0"}
                withdrawn={"0"}
                withdrawn_date={""}
                setEventId={setEventId}
                setWithdraw={setWithdraw}
              />
              <EarningRow
                id={"102"}
                title={"سوق الاسطوانات | Souk l'Oustouwanat"}
                profit={"477"}
                withdrawn={"0"}
                withdrawn_date={""}
                setEventId={setEventId}
                setWithdraw={setWithdraw}
              />
            </table>
          </div>
        </div>
        {withdraw && <WithrawForm setWithdraw={setWithdraw} />}
      </div>
    </div>
  );
}

export default Sales;

// const getOrganizerEvents = async () => {
//   try {
//     const response = await Axios.get(
//       `${apiUrl}/api/events/organizer/${profile.user.org_id}/all-events`
//     );
//     console.warn("events : ", response.data);
//     setOrgEvents(response.data);
//     setEventId(response.data[4].event_id);
//   } catch (error) {
//     console.error("OrganizerSummary: Organizer don't have any events yet");
//   }
// };

// useEffect(() => {
//   getOrganizerEvents();
// }, [profile]);
{
  /* <div className="container">
<SearchOrganizer ph="sales" />
        <div className="orga-page-content">
          <div className="content-section-title">Sales statistics</div>
          <div className="graph">
            <OrganizerSummary
              title={"Overview"}
              width={"100%"}
              height={"30%"}
              summaryChartStyle={{
                width: "100%",
                display: "flex",
                height: 478,
                alignItems: "center",
                justifyContent: "center",
              }}
            />
          </div>
          <div className="content-section-title">
            Select event to view statistics
          </div>
          <div className="events-drop-down">
            <EventsDropDown orgEvents={orgEvents?.[0]} eventId={eventId} />
          </div>
          <div className="selected-event-stats">
            <div className="graph">
              <EventSummaryGraph eventId={eventId} />
            </div>
            <div className="cercle">
              <SpecifiedEventSeatSales eventId={eventId} />
            </div>
          </div>
          <div className="title-actions">
            <div className="content-section-title">Sales</div>
            <div className="filter-buttons">
              <div className="overview btn active">
                <span>Overview</span>
              </div>
              <div className="as-selected btn">
                <span>As Selected</span>
              </div>
            </div>
          </div>
          <SalesTable />
        </div>
      </div> */
}
