import { useNavigate } from 'react-router-dom';
import { projects } from '../data/projects';

interface SimpleTimelineProps {
  showProjects?: boolean;
  showCoops?: boolean;
  showEducation?: boolean;
}

export default function SimpleTimeline({ 
  showProjects = true, 
  showCoops = true,
  showEducation = false 
}: SimpleTimelineProps) {
  const navigate = useNavigate();

  // Filter projects based on what to show
  const filteredProjects = projects.filter(project => {
    if (!project.timelineData) return false;
    
    if (project.category === 'Co-op' && !showCoops) return false;
    if (project.category !== 'Co-op' && !showProjects) return false;
    
    return true;
  });

  // Add education entries if needed
  const educationEntries = showEducation ? [
    {
      name: 'Northeastern University',
      category: 'Education',
      route: null,
      timelineData: {
        startYear: 2022,
        isOngoing: true,
        location: 'Boston, MA'
      },
      description: 'Fifth year student studying electrical engineering and music technology.'
    },
    {
      name: 'Boston University',
      category: 'Education',
      route: null,
      timelineData: {
        startYear: 2021,
        endYear: 2022,
        location: 'Boston, MA'
      },
      description: 'Started college journey with computer engineering classes.'
    }
  ] : [];

  // Combine and sort by year
  const allEntries = [...filteredProjects, ...educationEntries].sort((a, b) => {
    const yearA = a.timelineData?.startYear || 0;
    const yearB = b.timelineData?.startYear || 0;
    return yearB - yearA; // Newest first
  });

  return (
    <div style={{ 
      margin: '2rem 2rem',
      maxWidth: '800px'
    }}>
      {allEntries.map((entry, index) => {
        const timelineData = entry.timelineData;
        if (!timelineData) return null;

        const currentYear = new Date().getFullYear();
        const endYear = timelineData.isOngoing ? currentYear : timelineData.endYear;
        const yearRange = endYear 
          ? `${timelineData.startYear} - ${endYear}`
          : `${timelineData.startYear}${timelineData.isOngoing ? ' - Present' : ''}`;

        return (
          <div
            key={`${entry.name}-${index}`}
            style={{
              marginBottom: '2rem',
              padding: '1.5rem',
              background: 'var(--color-6)',
              borderRadius: '8px',
              borderLeft: '4px solid var(--color-3)',
              cursor: entry.route ? 'pointer' : 'default',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            }}
            onClick={() => entry.route && navigate(entry.route)}
            onMouseEnter={(e) => {
              if (entry.route) {
                e.currentTarget.style.transform = 'translateX(4px)';
                e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
              }
            }}
            onMouseLeave={(e) => {
              if (entry.route) {
                e.currentTarget.style.transform = 'translateX(0)';
                e.currentTarget.style.boxShadow = 'none';
              }
            }}
          >
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              marginBottom: '0.5rem'
            }}>
              <h3 style={{
                margin: 0,
                color: 'var(--color-2)',
                fontSize: '1.2rem',
                fontWeight: '600'
              }}>
                {entry.name}
              </h3>
              <span style={{
                color: 'var(--color-3)',
                fontSize: '0.9rem',
                fontWeight: '500',
                whiteSpace: 'nowrap',
                marginLeft: '1rem'
              }}>
                {yearRange}
              </span>
            </div>
            {timelineData.location && (
              <div style={{
                color: 'var(--color-3)',
                fontSize: '0.85rem',
                marginBottom: '0.5rem'
              }}>
                📍 {timelineData.location}
              </div>
            )}
            {'description' in entry && entry.description && (
              <p style={{
                margin: 0,
                color: 'var(--color-1)',
                lineHeight: '1.6',
                fontSize: '0.95rem'
              }}>
                {entry.description}
              </p>
            )}
            {entry.route && (
              <div style={{
                marginTop: '0.5rem',
                fontSize: '0.85rem',
                color: 'var(--color-3)',
                fontStyle: 'italic'
              }}>
                Click to view details →
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

