import React, {useEffect, useState} from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import enUS from 'date-fns/locale/en-US'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { auth, provider, subscribeAuth } from './firebaseConfig';
import { signInWithPopup } from 'firebase/auth';

const locales = {'en-US': enUS}
const localizer = dateFnsLocalizer({ format, parse, startOfWeek: () => startOfWeek(new Date()), getDay, locales });

export default function Scheduler() {
  const [events, setEvents] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(()=> {
    const unsub = subscribeAuth((u)=> setUser(u));
    return ()=> unsub && unsub();
  },[]);

  useEffect(()=> {
    const ev = [];
    const today = new Date();
    for(let d=1; d<=5; d++){
      for(let h=16; h<=18; h++){
        const next = nextWeekday(d, h);
        ev.push({ id: `${d}-${h}`, title: 'Available', start: next, end: new Date(next.getTime()+60*60*1000), available: true });
      }
    }
    for(let h=10; h<=17; h++){
      const next = nextWeekday(6,h);
      ev.push({ id:`6-${h}`, title: 'Available', start: next, end: new Date(next.getTime()+60*60*1000), available:true });
    }
    setEvents(ev);
  },[]);

  function nextWeekday(weekday, hour){
    const today = new Date();
    const result = new Date(today);
    result.setDate(today.getDate() + ((7 + weekday - today.getDay()) % 7));
    result.setHours(hour,0,0,0);
    return result;
  }

  const handleSelect = (slot) => {
    if(!user){
      if(window.confirm('You need to sign in with Google to request a booking. Sign in now?')){
        signInWithPopup(auth, provider).then(()=> alert('Signed in. Fill the booking form on the event details (coming soon).'));
      }
      return;
    }
    alert('To request this slot, fill the booking form that will appear. (This demo shows availability; actual booking form will be in the next step.)');
  };

  const eventStyleGetter = (event) => {
    return { style: { backgroundColor: event.available ? '#10B981' : '#f59e0b', color:'#fff', borderRadius:6} }
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Request a Training Session</h2>
      <div className="mb-4 text-sm text-gray-600">Sign in with Google to request a slot. Coaches will confirm bookings.</div>
      <Calendar
        localizer={localizer}
        events={events}
        defaultView="week"
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600 }}
        onSelectEvent={(e)=> handleSelect(e)}
        eventPropGetter={eventStyleGetter}
      />
    </div>
  );
}