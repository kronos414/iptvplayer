import { useEffect, useMemo, useState } from 'react'

// Liste de langues/pays depuis iptv-org
const LANGUAGES = [
  { code: 'fra', label: 'Français' },
  { code: 'eng', label: 'English' },
  { code: 'spa', label: 'Español' },
  { code: 'por', label: 'Português' },
  { code: 'ara', label: 'العربية' },
  { code: 'ita', label: 'Italiano' },
  { code: 'deu', label: 'Deutsch' },
  { code: 'rus', label: 'Русский' },
  { code: 'pol', label: 'Polski' },
  { code: 'tur', label: 'Türkçe' },
  { code: 'jpn', label: '日本語' },
  { code: 'kor', label: '한국어' },
  { code: 'zho', label: '中文' },
  { code: 'hin', label: 'हिन्दी' },
]

function parseM3U(text) {
  const lines = text.split('\n')
  const channels = []
  let current = null
  for (const raw of lines) {
    const line = raw.trim()
    if (line.startsWith('#EXTINF')) {
      const nameMatch = line.match(/,(.+)$/)
      const logoMatch = line.match(/tvg-logo="([^"]*)"/)
      current = {
        name: nameMatch ? nameMatch[1].trim() : 'Sans nom',
        logo: logoMatch ? logoMatch[1] : null,
      }
    } else if (line && !line.startsWith('#') && current) {
      current.url = line
      channels.push(current)
      current = null
    }
  }
  return channels
}

export default function App() {
  const [lang, setLang] = useState('fra')
  const [channels, setChannels] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [current, setCurrent] = useState(null)
  const [search, setSearch] = useState('')

  useEffect(() => {
    setLoading(true)
    setError(null)
    setCurrent(null)
    fetch(`https://iptv-org.github.io/iptv/languages/${lang}.m3u`)
      .then(r => {
        if (!r.ok) throw new Error('Liste introuvable')
        return r.text()
      })
      .then(t => setChannels(parseM3U(t)))
      .catch(e => setError(e.message))
      .finally(() => setLoading(false))
  }, [lang])

  const filtered = useMemo(() => {
    if (!search) return channels
    const q = search.toLowerCase()
    return channels.filter(c => c.name.toLowerCase().includes(q))
  }, [channels, search])

  return (
    <div className="app">
      <header className="header">
        <h1>IPTV</h1>
        <select value={lang} onChange={e => setLang(e.target.value)}>
          {LANGUAGES.map(l => (
            <option key={l.code} value={l.code}>{l.label}</option>
          ))}
        </select>
      </header>

      {current && (
        <div className="player">
          <video
            key={current.url}
            src={current.url}
            controls
            autoPlay
            playsInline
            style={{ width: '100%', maxHeight: '50vh', background: '#000' }}
          />
          <div className="now-playing">
            <span>▶ {current.name}</span>
            <button onClick={() => setCurrent(null)}>Fermer</button>
          </div>
        </div>
      )}

      <div className="controls">
        <input
          type="text"
          placeholder="Rechercher une chaîne..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <span className="count">{filtered.length} chaînes</span>
      </div>

      {loading && <div className="status">Chargement...</div>}
      {error && <div className="status error">{error}</div>}

      <div className="grid">
        {filtered.map((ch, i) => (
          <button
            key={`${ch.url}-${i}`}
            className="card"
            onClick={() => setCurrent(ch)}
          >
            {ch.logo ? (
              <img src={ch.logo} alt="" onError={e => e.target.style.display = 'none'} />
            ) : (
              <div className="placeholder">TV</div>
            )}
            <span>{ch.name}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
