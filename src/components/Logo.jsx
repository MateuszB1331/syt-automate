import { Link } from 'react-router-dom'

export default function Logo({ dark = false }) {
  const textColor = dark ? '#f5f0e8' : '#1e1432'
  return (
    <Link to="/" className="flex items-baseline gap-0.5 select-none shrink-0" aria-label="SYT&Automate home">
      <span className="font-serif text-[22px] leading-none tracking-tight" style={{ color: textColor }}>SYT</span>
      <span className="font-serif text-[22px] italic leading-none" style={{ color: '#6d3fd1' }}>&amp;</span>
      <span className="font-serif text-[22px] leading-none tracking-tight" style={{ color: textColor }}>Automate</span>
    </Link>
  )
}
