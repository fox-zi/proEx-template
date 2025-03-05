import { useEffect, useState } from "react"
import CalendarView from '../../components/CalendarView'
import moment from 'moment'
import { CALENDAR_INITIAL_EVENTS } from '../../utils/dummyData'
import { useDispatch, useSelector } from 'react-redux'
import { openRightDrawer } from '../common/rightDrawerSlice'
import { RIGHT_DRAWER_TYPES } from '../../utils/globalConstantUtil'


function Calendar() {

    const dispatch = useDispatch()

    // Add your own Add Event handler, like opening modal or random event addition
    // Format - {title :"", theme: "", startTime : "", endTime : ""}, typescript version comming soon :)

    // Open all events of current day in sidebar
    const openDayDetail = ({ filteredEvents, title }) => {
        dispatch(openRightDrawer({ header: title, bodyType: RIGHT_DRAWER_TYPES.CALENDAR_EVENTS, extraObject: { filteredEvents } }))
    }

    return (
        <>
            <CalendarView
                openDayDetail={openDayDetail}
            />
        </>
    )
}

export default Calendar
