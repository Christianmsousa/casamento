import { SVGProps } from 'react'

export function ErrorIllustration(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 500 500"
      fill="none"
      {...props}
    >
      {/* Gradientes */}
      <defs>
        <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#EDF8FF" /> {/* brand-blue-50 */}
          <stop offset="100%" stopColor="#D6EDFF" /> {/* brand-blue-100 */}
        </linearGradient>
      </defs>

      {/* Fundo circular */}
      <circle cx="250" cy="250" r="200" fill="url(#bgGradient)" />

      {/* Personagem */}
      <g transform="translate(200, 180)">
        {/* Corpo principal */}
        <rect x="0" y="0" width="80" height="120" fill="#1E93FF" rx="8" />

        {/* Expressão triste */}
        <circle cx="30" cy="40" r="6" fill="#0E285D" />
        <circle cx="50" cy="40" r="6" fill="#0E285D" />
        <path
          d="M30 70c5-8 15-8 20 0"
          stroke="#0E285D"
          strokeWidth="4"
          strokeLinecap="round"
        />

        {/* Braços flutuantes */}
        <g transform="translate(-20, 30)">
          <rect
            width="15"
            height="40"
            fill="#1E93FF"
            rx="6"
            transform="rotate(-15)"
          />
        </g>
        <g transform="translate(85, 30)">
          <rect
            width="15"
            height="40"
            fill="#1E93FF"
            rx="6"
            transform="rotate(15)"
          />
        </g>

        {/* Pernas flutuantes */}
        <g transform="translate(15, 120)">
          <rect
            width="15"
            height="40"
            fill="#1E93FF"
            rx="6"
            transform="rotate(10)"
          />
        </g>
        <g transform="translate(50, 120)">
          <rect
            width="15"
            height="40"
            fill="#1E93FF"
            rx="6"
            transform="rotate(-10)"
          />
        </g>
      </g>

      {/* Elementos de movimento */}
      <g>
        <circle cx="350" cy="150" r="4" fill="#1E93FF" />
        <circle cx="370" cy="130" r="4" fill="#1E93FF" />
        <circle cx="390" cy="160" r="4" fill="#1E93FF" />
      </g>

      {/* X's decorativos */}
      <g stroke="#1E93FF" strokeWidth="3" strokeLinecap="round">
        <path d="M350 180l10 10m0-10l-10 10" />
        <path d="M380 150l8 8m0-8l-8 8" />
        <path d="M360 120l6 6m0-6l-6 6" />
      </g>

      {/* Pontos de movimento */}
      <g fill="#1E93FF" opacity="0.5">
        <circle cx="160" cy="200" r="3" />
        <circle cx="170" cy="220" r="3" />
        <circle cx="150" cy="240" r="3" />
      </g>
    </svg>
  )
}
