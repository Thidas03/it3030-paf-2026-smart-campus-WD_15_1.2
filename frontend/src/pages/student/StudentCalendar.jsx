import React, { useState, useEffect, useCallback } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { ArrowLeft, Calendar as CalendarIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import resourceService from "../../services/resourceService";
import LoadingSpinner from "../../components/LoadingSpinner";

const StudentCalendar = () => {
  const navigate = useNavigate();
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchResources = useCallback(async () => {
    try {
      setLoading(true);
      const response = await resourceService.getAllResources();
      setResources(response.data || []);
    } catch (error) {
      console.error("API Error:", error);
      toast.error("Failed to load resource availability.", {
        style: { background: "#1e293b", color: "#f1f5f9", border: "1px solid #334155" },
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchResources();
  }, [fetchResources]);

  const handleEventClick = (info) => {
    toast.success(`Resource: ${info.event.title}\nStatus: ${info.event.extendedProps.status}`, {
      style: { background: "#1e293b", color: "#f1f5f9", border: "1px solid #334155" },
    });
  };

  const events = resources
    .filter((r) => r.availabilityStartTime && r.availabilityEndTime)
    .map((resource) => ({
      title: resource.name,
      start: new Date(resource.availabilityStartTime),
      end: new Date(resource.availabilityEndTime),
      extendedProps: {
        status: resource.status,
      },
      backgroundColor:
        resource.status === "ACTIVE"
          ? "#22c55e"
          : resource.status === "MAINTENANCE"
          ? "#facc15"
          : "#ef4444",
      borderColor: "transparent",
    }));

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 pt-20">
        <LoadingSpinner message="Loading availability calendar..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900">
      <div className="p-6 space-y-6 max-w-7xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors group mb-2"
        >
          <ArrowLeft className="h-4 w-4 transform group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">Back to Catalogue</span>
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="bg-blue-600/10 p-2.5 rounded-lg border border-blue-500/20">
            <CalendarIcon className="h-6 w-6 text-blue-500" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-white">Resource Availability Calendar</h1>
            <p className="text-sm text-slate-400">View real-time availability of campus facilities</p>
          </div>
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-4 shadow-sm hover:shadow-md transition duration-200 text-slate-200">
          <FullCalendar
            plugins={[timeGridPlugin, interactionPlugin]}
            initialView="timeGridWeek"
            events={events}
            height="auto"
            eventClick={handleEventClick}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "timeGridWeek,timeGridDay",
            }}
            slotMinTime="06:00:00"
            slotMaxTime="22:00:00"
            allDaySlot={false}
          />
        </div>
      </div>
    </div>
  );
};

export default StudentCalendar;
