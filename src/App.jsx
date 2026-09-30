import { useEffect, useState } from 'react'
import './App.css'

const socialLinks = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/atharabhista/' },
  { label: 'GitHub', href: 'https://github.com/kodoksombong' },
  { label: 'Instagram', href: 'https://www.instagram.com/atharabhista/' },
  { label: 'Spotify', href: 'https://open.spotify.com/user/stephanorath?si=65acfdaa241e4aa1' },
  { label: 'Email', href: 'mailto:atharabhista@gmail.com' },
  { label: 'Letterboxd', href: 'https://letterboxd.com/atharabhista/' },
]

const stats = [
  { value: '5+', label: 'Projects' },
  { value: '9', label: 'Core Skills' },
  { value: 'B2', label: 'English Proficiency' },
  { value: '0', label: 'Red Flags' },
  { value: 'Ongoing', label: 'Character Development' },
  { value: '∞', label: 'Curiosities' },
]

const interests = [
  'Water Resources',
  'Construction Sites',
  'Treatment Plants',
  'Environmental Consulting',
  'Problem Solving',
  'Business Development',
]

const skills = [
  'AutoCAD',
  'ArcGIS',
  'HEC-RAS',
  'Global Mapper',
  'Microsoft Office Suite',
  'Project Management',
  'Python',
  'Web Development',
  'Water Resources Engineering',
]

const education = [
  {
    name: 'Universitas Brawijaya',
    role: 'Water Resources Engineering (B.Eng.)',
    date: '2021 – 2026',
    gpa: 'GPA: 3.29 / 4.00',
    image: '/docsandpics/ub.png',
    details: [
      'GPA: 3.29 / 4.00',
      'Relevant Courses: Water Resource Management, Wastewater Management, Water and Land Resource Conservation, Green Building Planning, Engineering Statistics, Construction Management, Occupational Health and Safety.',
    ],
  },
  {
    name: 'SMA Negeri 3 Malang',
    role: 'Natural Sciences Major',
    date: '2018 – 2021',
    gpa: 'Final Grade: 87.07 / 100',
    image: '/docsandpics/sma3.png',
    details: ['Final Grade: 87.07 / 100'],
  },
]

const projects = [
  {
    type: "Bachelor's Thesis",
    year: '2026',
    title: 'Supply vs Demand: Lowokwaru',
    image: '/docsandpics/thesis.jpeg',
    description:
      'Measures how population growth pressures domestic blue water supply in Lowokwaru, Malang, using the Hoekstra & Mekonnen blue water footprint framework, a 100-household survey, and Perumda Tugu Tirta data.',
    figures: [
      '172.6L/person/day = average use of water in Lowokwaru, Malang based on survey.',
      '±3.96% = deviation from Perumda\'s independent billing figure.',
      '110–112% = projected Blue Water Scarcity in 2029–2030, even after planned supply extension.',
    ],
    tags: ['Blue Water Footprint', 'Research', 'Water Scarcity', 'Water Resources Engineering', 'Hydrology'],
  },
  {
    type: 'Research',
    year: '2024',
    title: 'Water Quality Assessment',
    image: '/docsandpics/pkl.jpg',
    description: 'A field study tracking water quality and non-revenue water across the Jatimulyo DMA.',
    tags: ['Water Quality', 'Internship', 'Water Loss', 'Water Resources Engineering', 'Research'],
  },
  {
    type: 'Web Development',
    year: 'Live',
    title: 'Portfolio Website',
    image: '/docsandpics/web.jpeg',
    description: 'A personal portfolio bringing together engineering work, experience, and digital projects.',
    tags: ['HTML', 'CSS', 'JavaScript', 'Python', 'React'],
  },
]

const workExperience = [
  {
    company: 'CV. Rizki Giat Perkasa',
    role: 'Operations Staff',
    date: 'Aug 2024 – Feb 2025',
    logo: '/docsandpics/rgp.png',
    details: [
      'Managed client and government stakeholder relationships throughout project acquisition and tender processes, occasionally leading discussions to secure public works contracts.',
      'Coordinated quality control, documentation, and closeout across concurrent public works across Kota Malang, including the rehabilitation of 8 city parks and heritage road rehabilitation covering Jl. Ijen, Jl. Semeru, Jl. Bromo, and Jl. Soekarno - Hatta with combined value of +1 billion Rupiah.',
      'Represented client and government interests during site visits and inspections, resolving on-site issues and keeping cross-functional teams aligned.',
    ],
  },
  {
    company: 'Perumda Tugu Tirta Kota Malang',
    role: 'Production Management Intern',
    date: 'Feb 2024 – Apr 2024',
    logo: '/docsandpics/pdam.png',
    details: [
      'Conducted water quality testing across the full distribution chain all across Malang and verified compliance with Permenkes No. 2/2023 Drinking Water Standards.',
      'Independently produced conservation maps covering the Wendit and Binangun source catchment areas.',
      'Performed daily inspections on Reverse Osmosis (RO) treatment units, monitoring performance and water quality output.',
      'Authored a technical report analyzing the source-to-tap quality assurance workflow of a utility serving 844,000 residents.',
    ],
  },
  {
    company: 'PT. Dharmawangsa Persada',
    role: 'Construction Supervisor',
    date: 'May 2024 – Aug 2024',
    logo: '/docsandpics/dp.png',
    details: [
      'Led end-to-end delivery of a Rp. 2.49 billion structural strengthening construction project for PT. Indonesia Tri Sembilan, owning scope, budget, quality, and safety across 3,700 m² of works while maintaining zero workplace accidents.',
      'Authored milestone-based progress reports for client stakeholders, tracking project KPIs, flagging risks early, and keeping delivery on specification and on schedule.',
      'Applied structured safety and risk management practices on-site as a PUPR-certified Construction Safety Officer, embedding proactive risk monitoring into daily project operations.',
    ],
  },
]

const orgExperience = [
  {
    company: 'Kompetisi Bangunan Air Indonesia',
    role: 'Head of Entertainment and Education',
    date: 'Oct 2023 – Feb 2024',
    logo: '/docsandpics/kbai.png',
    details: [
      'Led an 11-member entertainment and education team responsible for two flagship events appreciating 15 full paper finalists from 4 universities and 10 infographics winners from 5 high schools nationwide.',
      'Coordinated an educational tour across Malang promoting the city\'s heritage and culture in collaboration with the Malang City Government, a water infrastructure educational tour with Perum Jasa Tirta I, plus a recreational tour to a theme park with Batu Night Spectacular (BNS).',
      'Designed and organized an international seminar on modernizing water infrastructure to address clean water crisis in support of Indonesia\'s Ecological City vision, convening 20+ panelists consisting of speakers from IHE Delft Netherlands, academists, professionals, NGOs, and policy makers, with an audience of 200+ people.',
    ],
  },
  {
    company: 'Program Pembinaan Mahasiswa Baru Teknik Pengairan',
    role: 'General Secretary of Pengabdian Kepada Masyarakat',
    date: 'Dec 2022 – Mar 2023',
    logo: '/docsandpics/irigasi.png',
    details: [
      'Oversaw community service program comprising tree planting and water infrastructure maintenance alongside an inauguration festival, coordinating a 65-member organizing committee and 150+ freshmen supporting goals of water sustainability and celebrating World Water Day.',
      'Jointly drafted and managed event budget with the General Treasurer, managing funds across Rp. 15 million in inflows from multiple sources and itemized expenditures across all divisions.',
      'Stepped in to cover the absent Logistics Division head on event day, coordinating tools and materials procurement and reassigning tasks among present members to prevent miscommunication on D-day.',
      'Oversaw and jointly produced accountability report (LPJ) documenting activities, budget, committee structure, members, and event proceedings.',
    ],
  },
  {
    company: 'Himpunan Mahasiswa Pengairan (HMP FT-UB)',
    role: 'Staff of Student Interests and Activities, Staff of Entrepreneurship',
    date: '2022 – 2024',
    logo: '/docsandpics/hmp.png',
    details: [
      'Actively participated in departmental student association activities, technical workshops, and student community initiatives within Universitas Brawijaya Water Resources Engineering department.',
    ],
  },
]

const certifications = [
  {
    title: 'TOEFL ITP',
    provider: 'Brawijaya Language Center',
    id: '10.02188/SRT/B/BMU/BLC/III/2026',
    scores: ['Reading: 60', 'Listening: 64', 'Structure and Writing: 56'],
  },
  {
    title: 'Python 3 Course',
    provider: 'Codecademy',
    id: 'PY-3-2024-06-001',
    scores: [
      'Python 3 programming language',
      'Data types, operators, and expressions',
      'Control flow and functions',
      'Object-oriented programming (OOP)',
      'File handling and exceptions',
      'Modules and packages',
      'Working with libraries and APIs',
    ],
  },
  {
    title: 'Microsoft Office Specialist',
    provider: 'Trust Training Partners',
    id: 'MOS-2024-06-001',
    scores: ['Microsoft Word', 'Microsoft Excel', 'Microsoft PowerPoint'],
  },
  {
    title: 'Sertifikasi Bimbingan Teknis Sistem Manajemen Keselamatan Konstruksi',
    provider: 'Kementerian Pekerjaan Umum dan Perumahan Rakyat',
    id: '2461/PY/BIMTEK-SMKK/JAKARTA/2021',
    scores: ['Safety management systems', 'Construction safety practices', 'Risk assessment and mitigation'],
  },
]

function SocialIcon({ label }) {
  const commonProps = {
    viewBox: '0 0 24 24',
    width: 20,
    height: 20,
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': 'true',
  }

  switch (label) {
    case 'LinkedIn':
      return (
        <svg {...commonProps} fill="currentColor" stroke="none">
          <rect x="2" y="2" width="20" height="20" rx="4" fill="currentColor" />
          <circle cx="6.5" cy="6.5" r="1.5" fill="#fff" />
          <rect x="5" y="9.5" width="3" height="8.5" fill="#fff" />
          <path d="M10 9.5H13V10.8C13.6 9.8 14.8 9.3 16.2 9.3C18.8 9.3 20 10.8 20 13.8V18H17V14.2C17 12.6 16.3 11.8 15.1 11.8C13.8 11.8 13 12.7 13 14.2V18H10V9.5Z" fill="#fff" />
        </svg>
      )
    case 'GitHub':
      return (
        <svg {...commonProps} viewBox="0 0 128 128" fill="currentColor" stroke="none">
          <path d="M56.7937 84.9688C44.4187 83.4688 35.7 74.5625 35.7 63.0313C35.7 58.3438 37.3875 53.2813 40.2 49.9063C38.9812 46.8125 39.1687 40.25 40.575 37.5313C44.325 37.0625 49.3875 39.0313 52.3875 41.75C55.95 40.625 59.7 40.0625 64.2937 40.0625C68.8875 40.0625 72.6375 40.625 76.0125 41.6563C78.9187 39.0313 84.075 37.0625 87.825 37.5313C89.1375 40.0625 89.325 46.625 88.1062 49.8125C91.1062 53.375 92.7 58.1563 92.7 63.0313C92.7 74.5625 83.9812 83.2813 71.4187 84.875C74.6062 86.9375 76.7625 91.4375 76.7625 96.5938L76.7625 106.344C76.7625 109.156 79.1062 110.75 81.9187 109.625C98.8875 103.156 112.2 86.1875 112.2 65.1875C112.2 38.6563 90.6375 17 64.1062 17C37.575 17 16.2 38.6562 16.2 65.1875C16.2 86 29.4187 103.25 47.2312 109.719C49.7625 110.656 52.2 108.969 52.2 106.438L52.2 98.9375C50.8875 99.5 49.2 99.875 47.7 99.875C41.5125 99.875 37.8562 96.5 35.2312 90.2188C34.2 87.6875 33.075 86.1875 30.9187 85.9063C29.7937 85.8125 29.4187 85.3438 29.4187 84.7813C29.4187 83.6563 31.2937 82.8125 33.1687 82.8125C35.8875 82.8125 38.2312 84.5 40.6687 87.9688C42.5437 90.6875 44.5125 91.9063 46.8562 91.9063C49.2 91.9063 50.7 91.0625 52.8562 88.9063C54.45 87.3125 55.6687 85.9063 56.7937 84.9688Z" fill="currentColor"/>
        </svg>
      )
    case 'Instagram':
      return (
        <svg {...commonProps} fill="none" stroke="currentColor">
          <rect x="2" y="2" width="20" height="20" rx="5" fill="none" stroke="currentColor" strokeWidth="2" />
          <circle cx="12" cy="12" r="4.5" fill="none" stroke="currentColor" strokeWidth="2" />
          <circle cx="17.5" cy="6.5" r="1.25" fill="currentColor" stroke="none" />
        </svg>
      )
    case 'Spotify':
      return (
        <svg {...commonProps} viewBox="0 0 236.05 225.25" fill="currentColor" stroke="none">
          <path d="m122.37,3.31C61.99.91,11.1,47.91,8.71,108.29c-2.4,60.38,44.61,111.26,104.98,113.66,60.38,2.4,111.26-44.6,113.66-104.98C229.74,56.59,182.74,5.7,122.37,3.31Zm46.18,160.28c-1.36,2.4-4.01,3.6-6.59,3.24-.79-.11-1.58-.37-2.32-.79-14.46-8.23-30.22-13.59-46.84-15.93-16.62-2.34-33.25-1.53-49.42,2.4-3.51.85-7.04-1.3-7.89-4.81-.85-3.51,1.3-7.04,4.81-7.89,17.78-4.32,36.06-5.21,54.32-2.64,18.26,2.57,35.58,8.46,51.49,17.51,3.13,1.79,4.23,5.77,2.45,8.91Zm14.38-28.72c-2.23,4.12-7.39,5.66-11.51,3.43-16.92-9.15-35.24-15.16-54.45-17.86-19.21-2.7-38.47-1.97-57.26,2.16-1.02.22-2.03.26-3.01.12-3.41-.48-6.33-3.02-7.11-6.59-1.01-4.58,1.89-9.11,6.47-10.12,20.77-4.57,42.06-5.38,63.28-2.4,21.21,2.98,41.46,9.62,60.16,19.74,4.13,2.23,5.66,7.38,3.43,11.51Zm15.94-32.38c-2.1,4.04-6.47,6.13-10.73,5.53-1.15-.16-2.28-.52-3.37-1.08-19.7-10.25-40.92-17.02-63.07-20.13-22.15-3.11-44.42-2.45-66.18,1.97-5.66,1.15-11.17-2.51-12.32-8.16-1.15-5.66,2.51-11.17,8.16-12.32,24.1-4.89,48.74-5.62,73.25-2.18,24.51,3.44,47.99,10.94,69.81,22.29,5.12,2.66,7.11,8.97,4.45,14.09Z" fill="currentColor"/> 
        </svg>
      )
    case 'Email':
      return (
        <svg {...commonProps} fill="currentColor" stroke="none">
          <rect x="2" y="4" width="20" height="16" rx="4" fill="currentColor" />
          <path d="M4 8.5h16v8.5H4z" fill="none" />
          <path d="M4 9l8 6 8-6" fill="none" stroke="#fff" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    case 'Letterboxd':
      return (
        <svg {...commonProps} fill="currentColor" stroke="none">
          <circle cx="7" cy="12" r="4.5" fill="currentColor" opacity="0.9" />
          <circle cx="12" cy="12" r="4.5" fill="currentColor" opacity="0.6" />
          <circle cx="17" cy="12" r="4.5" fill="currentColor" opacity="0.4" />
        </svg>
      )
    default:
      return null
  }
}

function App() {
  const [serverStatus, setServerStatus] = useState('offline')
  const [serverStatusText, setServerStatusText] = useState('')
  const [spotifyData, setSpotifyData] = useState({
    title: 'Loading Spotify...',
    artist: '',
    albumImageUrl: '',
    isPlaying: false,
    songUrl: '',
    status: 'loading',
  })

  useEffect(() => {
    const checkWebsiteStatus = async () => {
      if (!navigator.onLine) {
        setServerStatus('offline')
        setServerStatusText('Website offline')
        return
      }

      try {
        const response = await fetch(window.location.href, { method: 'HEAD', cache: 'no-store' })
        if (response.ok || response.type === 'opaqueredirect') {
          setServerStatus('online')
          setServerStatusText('')
        } else {
          setServerStatus('offline')
          setServerStatusText('')
        }
      } catch {
        setServerStatus('offline')
        setServerStatusText('')
      }
    }

    const fetchSpotifyActivity = async () => {
      try {
        const response = await fetch('/api/spotify')
        if (!response.ok) {
          setSpotifyData({
            title: 'Spotify activity unavailable',
            artist: '',
            albumImageUrl: '',
            isPlaying: false,
            songUrl: '',
            status: 'unavailable',
          })
          return
        }

        const data = await response.json()
        if (!data || !data.title) {
          setSpotifyData({
            title: 'No recent tracks',
            artist: '',
            albumImageUrl: '',
            isPlaying: false,
            songUrl: '',
            status: 'idle',
          })
          return
        }

        setSpotifyData({
          title: data.title,
          artist: data.artist || '',
          albumImageUrl: data.albumImageUrl || '',
          isPlaying: Boolean(data.isPlaying),
          songUrl: data.songUrl || '',
          status: data.isPlaying ? 'playing' : 'recent',
        })
      } catch {
        setSpotifyData({
          title: 'Spotify activity unavailable',
          artist: '',
          albumImageUrl: '',
          isPlaying: false,
          songUrl: '',
          status: 'unavailable',
        })
      }
    }

    checkWebsiteStatus()
    fetchSpotifyActivity()
    const statusTimer = window.setInterval(checkWebsiteStatus, 60000)
    const spotifyTimer = window.setInterval(fetchSpotifyActivity, 30000)

    return () => {
      window.clearInterval(statusTimer)
      window.clearInterval(spotifyTimer)
    }
  }, [])

  return (
    <div className="page-shell">
      <header className="profile-hero">
        <div className="profile-container">
          <div className="profile-background">
            <p className="eyebrow">Hello,</p>
            <h1 className="welcome-message">I'm Athar!</h1>
            <h2 className="profile-title">Water Resources Engineering Fresh Graduate</h2>

            <nav className="social-links" aria-label="Social media links">
              <ul>
                {socialLinks.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      className="social-link"
                      aria-label={item.label}
                    >
                      <SocialIcon label={item.label} />
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <a
              href={spotifyData.songUrl || 'https://open.spotify.com/user/stephanorath?si=65acfdaa241e4aa1'}
              className="spotify-card"
              target="_blank"
              rel="noreferrer"
              aria-label="Spotify listening activity"
            >
              <div className="spotify-album-wrap">
                {spotifyData.albumImageUrl && (
                  <img src={spotifyData.albumImageUrl} alt="Album art" className="spotify-album-art" />
                )}
                <div className={`spotify-equalizer ${spotifyData.isPlaying ? 'playing' : ''}`}>
                  <span className="bar bar-1" />
                  <span className="bar bar-2" />
                  <span className="bar bar-3" />
                </div>
              </div>

              <div className="spotify-info">
                <div className="spotify-status">
                  <span className={`spotify-dot ${spotifyData.isPlaying ? 'playing' : ''}`} />
                  <span>
                    {spotifyData.status === 'loading'
                      ? 'CONNECTING TO SPOTIFY'
                      : spotifyData.status === 'unavailable'
                        ? 'SPOTIFY UNAVAILABLE'
                        : spotifyData.status === 'idle'
                          ? 'NO RECENT TRACKS'
                          : spotifyData.isPlaying
                            ? 'LISTENING ON SPOTIFY'
                            : 'RECENTLY PLAYED'}
                  </span>
                </div>
                <div className="spotify-title">{spotifyData.title}</div>
                <div className="spotify-artist">{spotifyData.artist}</div>
              </div>
            </a>
          </div>

          <div className="profile-image">
            <img
              src="/docsandpics/athar.png"
              alt="Athar Abhista Shaquille"
              className="profile-pic"
            />
          </div>
        </div>

      </header>

      <main className="main-content">
        <section id="about">
          <div className="section-heading-row">
            <h2 className="section-title">Get to know me</h2>
            <p className="section-description">
              A closer look at the engineer behind the work.
            </p>
          </div>

          <div className="about-content">
            <div className="about-copy">
              <p>
                I'm Athar, a Water Resources Engineering graduate from Universitas
                Brawijaya who likes to spend more time on construction sites and
                treatment plants than in lecture halls and wouldn't have it any other way.
              </p>
              <p>
                From keeping a structural strengthening project accident-free to water
                quality testing at Malang's municipal utility, I've learned that good
                engineering is mostly good problem-solving with better boots. Now I'm
                looking for where that mix of technical grounding and on-the-ground grit
                fits next whether it's engineering, environmental consulting, sales and
                business development, IT, or wherever the next interesting problem is.
              </p>
            </div>

            <div className="about-highlights" aria-label="Portfolio highlights">
              {stats.map((stat) => (
                <div key={stat.label} className="about-stat">
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="about-topics">
            <div className="about-topic">
              <h3>Things that interests me</h3>
              <ul className="topic-list">
                {interests.map((item) => (
                  <li key={item} className="topic-bubble">
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="about-topic">
              <h3>Skills</h3>
              <ul className="topic-list">
                {skills.map((item) => (
                  <li key={item} className="topic-bubble">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section id="education" className="experience-section">
          <div className="section-heading-row">
            <h2 className="section-title">Education</h2>
            <p className="section-description">
              The academic foundation behind my work in water resources and construction.
            </p>
          </div>

          <div className="experience-accordion-group">
            {education.map((item) => (
              <details key={item.name} className="experience-item">
                <summary className="experience-header">
                  <div className="experience-main">
                    <div className="experience-logo-badge school-badge">
                      <img src={item.image} alt={`${item.name} Logo`} className="experience-logo-img" />
                    </div>
                    <div className="experience-titles">
                      <h3 className="experience-company">{item.name}</h3>
                      <span className="experience-role">{item.role}</span>
                    </div>
                  </div>
                  <div className="experience-aside">
                    <span className="experience-date">{item.date}</span>
                    <svg className="experience-chevron" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </div>
                </summary>
                <div className="experience-body">
                  <ul className="experience-details-list">
                    {item.details.map((detail) => (
                      <li key={detail}>{detail}</li>
                    ))}
                  </ul>
                </div>
              </details>
            ))}
          </div>
        </section>

        <section id="projects" className="projects-section" aria-label="Selected projects">
          <div className="projects-header">
            <h2 className="projects-heading">Things I made with care</h2>
            <p className="projects-intro">
              Water resources, research, and digital work shaped from analysis through delivery.
            </p>
          </div>

          <div className="projects-showcase">
            {projects.map((project, index) => (
              <article
                key={project.title}
                className={`project-card ${index === 0 ? 'project-feature' : 'project-standalone'}`}
              >
                {index === 0 ? (
                  <>
                    <div className="project-feature-visual">
                      <img
                        src={project.image}
                        alt="Water resources study site in Lowokwaru"
                        className="project-feature-image"
                      />
                    </div>
                    <div className="project-feature-copy">
                      <div className="project-feature-meta">
                        <div className="project-kicker">{project.type}</div>
                        <span className="project-year">{project.year}</span>
                      </div>
                      <h3>{project.title}</h3>
                      <p>
                        {project.description}
                        <strong className="project-key-label">Key Figures</strong>
                        {project.figures.map((figure) => (
                          <span key={figure} className="project-figure">
                            {figure}
                          </span>
                        ))}
                      </p>
                      <div className="project-tags">
                        {project.tags.slice(0, 3).map((tag) => (
                          <span key={tag}>{tag}</span>
                        ))}
                        {project.tags.length > 3 && (
                          <span className="project-skill-more">+{project.tags.length - 3}</span>
                        )}
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div
                      className="project-image"
                      style={{
                        backgroundImage: `linear-gradient(180deg, rgba(12, 17, 26, 0.1), rgba(12, 17, 26, 0.18)), url("${project.image}")`,
                      }}
                      aria-hidden="true"
                    />
                    <div className="project-card-footer">
                      <div className="project-title-row">
                        <span className="project-kicker">{project.type}</span>
                        <span className="project-year">{project.year}</span>
                      </div>
                      <h3>{project.title}</h3>
                      <p className="project-card-description">{project.description}</p>
                      <div className="project-skill-bubbles" aria-label="Project skills">
                        {project.tags.slice(0, 3).map((tag) => (
                          <span key={tag}>{tag}</span>
                        ))}
                        {project.tags.length > 3 && (
                          <span className="project-skill-more">+{project.tags.length - 3}</span>
                        )}
                      </div>
                    </div>
                    <button type="button" className="project-arrow" aria-label="View project">
                      →
                    </button>
                  </>
                )}
              </article>
            ))}
          </div>
          <div className="section-more-row">
            <a href="https://github.com/kodoksombong" target="_blank" rel="noreferrer" className="section-more-link">
              See more
            </a>
          </div>
        </section>

        <section id="work-experiences" className="experience-section">
          <div className="section-heading-row">
            <h2 className="section-title">Work Experiences</h2>
            <p className="section-description">
              Hands-on roles across construction, water quality, and project operations.
            </p>
          </div>

          <div className="experience-accordion-group">
            {workExperience.map((item) => (
              <details key={item.company} className="experience-item">
                <summary className="experience-header">
                  <div className="experience-main">
                    <div className="experience-logo-badge work-badge">
                      <img src={item.logo} alt={`${item.company} Logo`} className="experience-logo-img" />
                    </div>
                    <div className="experience-titles">
                      <h3 className="experience-company">{item.company}</h3>
                      <span className="experience-role">{item.role}</span>
                    </div>
                  </div>
                  <div className="experience-aside">
                    <span className="experience-date">{item.date}</span>
                    <svg className="experience-chevron" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </div>
                </summary>
                <div className="experience-body">
                  <ul className="experience-details-list">
                    {item.details.map((detail) => (
                      <li key={detail}>{detail}</li>
                    ))}
                  </ul>
                </div>
              </details>
            ))}
          </div>
        </section>

        <section id="organization-experiences" className="experience-section">
          <div className="section-heading-row">
            <h2 className="section-title">Organization Experiences</h2>
            <p className="section-description">
              Collaborative experiences shaped by student leadership and community.
            </p>
          </div>

          <div className="experience-accordion-group">
            {orgExperience.map((item) => (
              <details key={item.company} className="experience-item">
                <summary className="experience-header">
                  <div className="experience-main">
                    <div className="experience-logo-badge">
                      <img src={item.logo} alt={`${item.company} Logo`} className="experience-logo-img" />
                    </div>
                    <div className="experience-titles">
                      <h3 className="experience-company">{item.company}</h3>
                      <span className="experience-role">{item.role}</span>
                    </div>
                  </div>
                  <div className="experience-aside">
                    <span className="experience-date">{item.date}</span>
                    <svg className="experience-chevron" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </div>
                </summary>
                <div className="experience-body">
                  <ul className="experience-details-list">
                    {item.details.map((detail) => (
                      <li key={detail}>{detail}</li>
                    ))}
                  </ul>
                </div>
              </details>
            ))}
          </div>
        </section>

        <section id="certifications" className="certifications-section">
          <div className="section-heading-row">
            <h2 className="section-title">Certifications</h2>
            <p className="section-description">
              Credentials and continuing learning that support my technical practice.
            </p>
          </div>

          <div className="certification-accordion-group">
            {certifications.map((item) => (
              <details key={item.title} className="certification-item">
                <summary className="certification-header">
                  <span className="certification-title">{item.title}</span>
                  <span className="certification-provider">{item.provider}</span>
                  <span className="certification-controls">
                    <span className="certification-action certification-action-open">See more</span>
                    <span className="certification-action certification-action-close">See less</span>
                    <span className="certification-chevron" aria-hidden="true" />
                  </span>
                </summary>
                <div className="certification-body">
                  <p>Credential ID: {item.id}</p>
                  <p className="certification-detail-label">Topics / Scores</p>
                  <ul className="certification-detail-list">
                    {item.scores.map((score) => (
                      <li key={score}>{score}</li>
                    ))}
                  </ul>
                </div>
              </details>
            ))}
          </div>
          <div className="section-more-row">
            <a href="mailto:atharabhista@gmail.com?subject=Request%20for%20more%20certification%20details" className="section-more-link">
              See more
            </a>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
