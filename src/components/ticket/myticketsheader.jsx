import React from 'react'
import '../../css/mytickets_comps.css'

function MyTicketsHeader({ keyword, setKeyword, numTickets, numCheckedTickets, handelSelectUnSelectAll, deleteFromTickets }) {
    return (
        <div className='mytickets-header'>
            <div className="mytickets-header-container">
                <div className="mytickets-header-left">
                    <div className='cart-search'><input type="text" value={keyword} onChange={(e) => setKeyword(e.target.value)} placeholder='Search in my tickets' /><span className="material-symbols-outlined btn" title='Search'>search</span></div>
                    <div className="btn" title='Filter List'><span className="material-symbols-outlined">filter_list</span></div>
                    <div className="btn" title='Select All' onClick={handelSelectUnSelectAll}><span className="material-symbols-outlined">select_all</span></div>
                    <div className="btn" title='Delete' onClick={deleteFromTickets}><span className="material-symbols-outlined">delete</span></div>
                </div>
                <div className='mytickets-header-right'>
                    {<div className="much-selected">
                        <span>{numCheckedTickets}/{numTickets} Items</span> selected
                    </div>}
                </div>
            </div>
        </div>
    );
}

export default MyTicketsHeader;