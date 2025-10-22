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
        maxWidth: '280px'
      }}
    >
      <div style={{
        color: 'var(--color-3)',
        fontWeight: 'bold',
        fontSize: '0.9rem',
        marginBottom: '0.5rem'
      }}>
        {startYear}
        {endYear && ` - ${endYear}`}
        {isOngoing && ' - Present'}
      </div>
      <h3 style={{ 
        margin: '0 0 0.5rem 0', 
        color: 'var(--color-2)',
        fontSize: '1.2rem'
      }}>
        {title}
      </h3>
      <p style={{ 
        margin: '0 0 0.5rem 0',
        lineHeight: '1.4',
        color: 'black'
      }}>
        {description}
      </p>
      {location && (
        <small style={{ 
          color: 'var(--color-3)',
          fontSize: '0.85rem'
        }}>
          📍 {location}
        </small>
      )}
    </div>
  )
}