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
    <div className="min-h-screen bg-dark-bg" onMouseMove={handleMouseMove}>
      <div className="p-6 space-y-6 max-w-7xl mx-auto animate-in fade-in zoom-in-95 duration-500">
        
        <div className="flex justify-between items-center bg-dark-bg p-6 rounded-2xl border border-white/5 shadow-2xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="relative z-10">
            <h1 className="text-2xl font-bold text-white flex items-center gap-3">
              <div className="p-2.5 bg-primary-500/20 rounded-xl border border-primary-500/30">
                <CalendarIcon className="text-primary-400 w-6 h-6" />
              </div>
              Resource Availability
            </h1>
            <p className="text-gray-400 mt-2 text-sm">View and manage facility and asset availability</p>
          </div>
          <div className="flex gap-4 p-4 glass-card rounded-xl border border-white/10 shadow-lg relative z-10">
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

        <div className="glass rounded-2xl p-6 shadow-2xl relative text-gray-200">
          {isLoading ? (
            <div className="flex items-center justify-center h-[600px]">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
            </div>
          ) : (
             <div className="calendar-container rounded-xl overflow-hidden p-2">
              <style jsx global>{`
                .calendar-container .fc-theme-standard td, 
                .calendar-container .fc-theme-standard th {
                  border-color: rgba(255, 255, 255, 0.05);
                }
                .calendar-container .fc-col-header-cell {
                  background-color: rgba(255, 255, 255, 0.02);
                  padding: 12px 0;
                }
                .calendar-container .fc-timegrid-slot {
                  height: 36px;
                }
                .calendar-container .fc-event {
                  cursor: pointer;
                  transition: all 0.3s ease;
                  border: 1px solid rgba(255, 255, 255, 0.1) !important;
                }
                .calendar-container .fc-event:hover {
                  transform: scale(1.02) translateY(-2px);
                  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.5);
                  z-index: 50 !important;
                }
                .calendar-container .fc-button-primary {
                  background-color: transparent !important;
                  border-color: rgba(255, 255, 255, 0.1) !important;
                  color: #9ca3af !important;
                  transition: all 0.3s ease;
                }
                .calendar-container .fc-button-primary:hover {
                  background-color: rgba(255, 255, 255, 0.05) !important;
                  color: #fff !important;
                }
                .calendar-container .fc-button-active {
                  background-color: rgba(139, 92, 246, 0.2) !important;
                  border-color: rgba(139, 92, 246, 0.5) !important;
                  color: #c4b5fd !important;
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
              className="fixed glass border border-white/10 p-5 rounded-xl shadow-2xl z-[100] w-64 pointer-events-none animate-in fade-in zoom-in duration-200"
              style={{
                left: `${tooltipPos.x + 15}px`,
                top: `${tooltipPos.y + 15}px`,
              }}
            >
              <h3 className="font-bold text-lg text-white mb-3 line-clamp-1">{hoveredEvent.name}</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3 text-gray-300">
                  <div className="p-1.5 bg-white/5 rounded-lg">
                    <MapPin size={14} className="text-primary-400" />
                  </div>
                  <span>{hoveredEvent.location || 'N/A'}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <div className="p-1.5 bg-white/5 rounded-lg">
                    <Users size={14} className="text-primary-400" />
                  </div>
                  <span>Cap: {hoveredEvent.capacity || 'N/A'}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300 pt-3 border-t border-white/10 mt-1">
                  <div className="p-1.5 bg-white/5 rounded-lg">
                    <Settings size={14} className="text-primary-400" />
                  </div>
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
