import promoPoster from '../assets/passions/promo_poster.png'

function Passions() {
  return <div>
    <h1 className='page-title'>Passions</h1>
    {/* TODO: embed soundcloud playlist */}
    <div style={{ margin: '2rem 2rem' }}>
          <iframe
            title='SoundCloud Playlist'
            width='100%'
            height='300'
            scrolling='no'
            frameBorder='no'
            allow='autoplay'
            src='https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/soundcloud%3Aplaylists%3A1986892924%3Fsecret_token%3Ds-kbe8bcKnaxd&color=%23bbb7b1&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true'
          />
          <div
            style={{
              fontSize: 10,
              color: '#cccccc',
              lineBreak: 'anywhere',
              wordBreak: 'normal',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
              fontFamily:
                'Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif',
              fontWeight: 100,
            }}
          >
            <a
              href="https://soundcloud.com/nik_mmusic"
              title="nik_"
              target="_blank"
              rel="noreferrer"
              style={{ color: '#cccccc', textDecoration: 'none' }}
            >
              nik_
            </a>{' '}
            ·{' '}
            <a
              href="https://soundcloud.com/nik_mmusic/sets/case-study-hyperfreak/s-kbe8bcKnaxd"
              title="case study hyperfreak"
              target="_blank"
              rel="noreferrer"
              style={{ color: '#cccccc', textDecoration: 'none' }}
            >
              case study hyperfreak
            </a>
          </div>
        </div>
    <p>My essay <a href='https://nikolasvarga.com/portfolio/musicontheperiphery.pdf'><em>Music on the Periphery</em></a>
      has been featured in the latest edition of I Love Life Magazine! </p>
    <h2 className='full-width-text'>I made a poster</h2>
    <img src={promoPoster} alt='Promo poster for Embedded Audio Hackathon' style={{ width: '50%', height: 'auto' }} />
    </div>
}

export default Passions;



