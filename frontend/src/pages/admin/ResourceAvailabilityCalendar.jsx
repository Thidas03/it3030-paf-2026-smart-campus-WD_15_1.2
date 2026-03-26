import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import resourceService from '../../services/resourceService';
import { toast } from 'react-hot-toast';
import { Calendar as CalendarIcon, MapPin, Users, Settings } from 'lucide-react';

const ResourceAvailabilityCalendar = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hoveredEvent, setHoveredEvent] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    try {
      setIsLoading(true);
      // Use configured service to fetch resources properly
      const response = await resourceService.getAllResources();
      const resources = response.data;

      const calendarEvents = resources
        .filter(r => r.availabilityStartTime && r.availabilityEndTime)
        .map(resource => {
          let backgroundColor = '#22c55e'; // ACTIVE
          if (resource.status === 'MAINTENANCE') backgroundColor = '#facc15';
          else if (resource.status === 'OUT_OF_SERVICE') backgroundColor = '#ef4444';

          return {
            id: resource.id,
            title: `${resource.name} (${resource.status})`,
            start: new Date(resource.availabilityStartTime),
            end: new Date(resource.availabilityEndTime),
            backgroundColor,
            borderColor: 'transparent',
            extendedProps: {
              name: resource.name,
              location: resource.location,
              capacity: resource.capacity,
              status: resource.status,
            }
          };
        });

      setEvents(calendarEvents);
    } catch (error) {
      console.error('Error fetching resources:', error);
      toast.error('Failed to load resource availability');
    } finally {
      setIsLoading(false);
    }
  };

  const handleMouseEnter = (info) => {
    const { extendedProps } = info.event;
    setHoveredEvent(extendedProps);
    // Position tooltip near the mouse
    setTooltipPos({
      x: info.jsEvent.clientX,
      y: info.jsEvent.clientY
    });
  };

  const handleMouseLeave = () => {
    setHoveredEvent(null);
  };

  const handleMouseMove = (e) => {
    if (hoveredEvent) {
      setTooltipPos({
        x: e.clientX,
        y: e.clientY
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-900" onMouseMove={handleMouseMove}>
      <div className="p-6 space-y-6 max-w-7xl mx-auto">
        
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-xl font-semibold text-white flex items-center gap-3">
              <CalendarIcon className="text-blue-500" />
              Resource Availability
            </h1>
            <p className="text-slate-400 mt-2">View and manage facility and asset availability</p>
          </div>
          <div className="flex gap-4 p-4 bg-slate-800 rounded-xl border border-slate-700/50">
             <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#22c55e]"></div>
                <span className="text-sm">Active</span>
             </div>
             <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#facc15]"></div>
                <span className="text-sm">Maintenance</span>
             </div>
             <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#ef4444]"></div>
                <span className="text-sm">Out of Service</span>
             </div>
          </div>
        </div>

        <div className="bg-slate-800 rounded-2xl border border-slate-700 p-4 shadow-sm hover:shadow-md transition duration-200 relative text-slate-200">
          {isLoading ? (
            <div className="flex items-center justify-center h-[600px]">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
          ) : (
             <div className="calendar-container bg-slate-800 rounded-xl overflow-hidden p-2">
              <style jsx global>{`
                .calendar-container .fc-theme-standard td, 
                .calendar-container .fc-theme-standard th {
                  border-color: #334155;
                }
                .calendar-container .fc-col-header-cell {
                  background-color: #1e293b;
                  padding: 10px 0;
                }
                .calendar-container .fc-timegrid-slot {
                  height: 36px;
                }
                .calendar-container .fc-event {
                  cursor: pointer;
                  transition: transform 0.2s;
                }
                .calendar-container .fc-event:hover {
                  transform: scale(1.02);
                  z-index: 50 !important;
                }
                .calendar-container .fc-button-primary {
                  background-color: #3b82f6 !important;
                  border-color: #3b82f6 !important;
                }
                .calendar-container .fc-button-active {
                  background-color: #2563eb !important;
                  border-color: #2563eb !important;
                }
              `}</style>
              <FullCalendar
                plugins={[timeGridPlugin, interactionPlugin]}
                initialView="timeGridWeek"
                headerToolbar={{
                  left: 'prev,next today',
                  center: 'title',
                  right: 'timeGridWeek,timeGridDay'
                }}
                events={events}
                height={600}
                slotMinTime="08:00:00"
                slotMaxTime="20:00:00"
                allDaySlot={false}
                eventMouseEnter={handleMouseEnter}
                eventMouseLeave={handleMouseLeave}
              />
            </div>
          )}

          {/* Tooltip */}
          {hoveredEvent && (
            <div 
              className="fixed bg-slate-900 border border-slate-700 p-4 rounded-xl shadow-2xl z-[100] w-64 pointer-events-none"
              style={{
                left: `${tooltipPos.x + 15}px`,
                top: `${tooltipPos.y + 15}px`,
              }}
            >
              <h3 className="font-bold text-lg text-white mb-3 line-clamp-1">{hoveredEvent.name}</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-slate-300">
                  <MapPin size={16} className="text-slate-500" />
                  <span>{hoveredEvent.location || 'N/A'}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <Users size={16} className="text-slate-500" />
                  <span>Cap: {hoveredEvent.capacity || 'N/A'}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300 pt-2 border-t border-slate-800">
                  <Settings size={16} className="text-slate-500" />
                  <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
                    hoveredEvent.status === 'ACTIVE' ? 'bg-green-500/20 text-green-400' :
                    hoveredEvent.status === 'MAINTENANCE' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-red-500/20 text-red-400'
                  }`}>
                    {hoveredEvent.status}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResourceAvailabilityCalendar;
