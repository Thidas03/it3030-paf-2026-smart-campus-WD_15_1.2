import { useAuth } from '../context/AuthContext.jsx';

const Dashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center text-white"
      style={{
        background:
          'linear-gradient(135deg, #1e3a8a 0%, #0ea5e9 40%, #22c55e 100%)',
      }}
    >
      <div className="container px-4 px-md-0">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6">
            <div
              className="rounded-4 shadow-lg p-4 p-md-5 text-center"
              style={{
                background:
                  'linear-gradient(135deg, rgba(15,23,42,0.9), rgba(15,23,42,0.75))',
                backdropFilter: 'blur(10px)',
              }}
            >
              <p className="text-uppercase small text-info mb-2 fw-semibold">
                Welcome to
              </p>
              <h1 className="fw-bold mb-3">
                Smart Campus <span className="text-info">Operations Hub</span>
              </h1>
              <p className="mb-4 text-white-50">
                A beautiful centralized portal to manage campus facilities,
                bookings, maintenance tickets, and notifications with a modern
                smart-campus experience.
              </p>

              <div className="d-flex flex-column flex-md-row justify-content-center gap-3 mb-4">
                <button className="btn btn-info text-dark fw-semibold px-4">
                  Explore Campus Services
                </button>
                <button className="btn btn-outline-light fw-semibold px-4">
                  View Demo Dashboard
                </button>
              </div>

              {user && (
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-center border-top border-secondary pt-3 mt-2 small text-white-50 gap-2">
                  <span>Signed in as {user.email}</span>
                  <button
                    onClick={logout}
                    className="btn btn-sm btn-outline-light"
                  >
                    Logout
                  </button>
                </div>
              )}

              <div className="mt-3 small text-white-50">
                Facilities • Bookings • Maintenance • Notifications
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

