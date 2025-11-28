interface TimelineEventProps {
  startYear: number;
  endYear?: number;
  title: string;
  description: string;
  location?: string;
  isOngoing?: boolean;
}

export default function TimelineEvent({
  startYear,
  endYear,
  title,
  description,
  location,
  isOngoing,
}: TimelineEventProps) {
  
  return (
    <div className='timeline-item' style={{
        maxHeight: '120px',
        maxWidth: '320px',
        padding: '1rem'
      }}
    >
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '0.25rem'
      }}>
        <div style={{
          color: 'var(--color-3)',
          fontWeight: 'bold',
          fontSize: '0.8rem'
        }}>
          {startYear}
          {endYear && ` - ${endYear}`}
          {isOngoing && ' - Present'}
        </div>
        {location && (
          <small style={{ 
            color: 'var(--color-3)',
            fontSize: '0.8rem',
            margin: '0'
          }}>
            📍 {location}
          </small>
        )}
      </div>
      <h3 style={{ 
        margin: '0 0 0.25rem 0', 
        color: 'var(--color-2)',
        fontSize: '1rem',
        lineHeight: '1.2'
      }}>
        {title}
      </h3>
      <p style={{ 
        margin: '0 0 0.25rem 0',
        lineHeight: '1.3',
        color: 'black',
        fontSize: '0.9rem'
      }}>
        {description}
      </p>
    </div>
  )
}