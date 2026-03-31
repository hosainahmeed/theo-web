"use client"

import { Avatar, AvatarFallback, AvatarGroup, AvatarGroupCount, AvatarImage } from '@/components/ui/avatar'
import "@/styles/testimonial.css"
import { Quote, Star } from 'lucide-react'
import Image from 'next/image'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useTranslations } from 'next-intl'

interface Testimonial {
  id: number
  profile_image: string
  name: string
  rating: number
  fan_type: string
  description: string
}

interface MarqueeColumnProps {
  testimonials: Testimonial[]
  direction: 'up' | 'down'
  speed?: number
  fanText: string
}

// ─── Single Card ──────────────────────────────────────────────────────────────
const TestimonialCard: React.FC<{ testimonial: Testimonial; fanText: string }> = ({ testimonial, fanText }) => (
  <div className="testimonial-card bg-[#0088FF]/10!">
    <div className="card-glow" />

    {/* Top row: quote icon + stars */}
    <div className="card-header">
      <div className="quote-badge">
        <Quote color='#0088FF' size={14} />
      </div>
      <div className="stars">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={13}
            className={i < testimonial.rating ? 'star-filled' : 'star-empty'}
          />
        ))}
      </div>
    </div>

    {/* Description */}
    <p className="card-description">{testimonial.description}</p>

    {/* Profile */}
    <div className="card-profile">
      <div className="avatar-wrap">
        <Image
          src={testimonial.profile_image}
          alt={testimonial.name}
          width={40}
          height={40}
          className="avatar-img"
          unoptimized
        />
        <span className="online-dot" />
      </div>
      <div>
        <p className="profile-name">{testimonial.name}</p>
        <p className="profile-type">{testimonial.fan_type} {fanText}</p>
      </div>
    </div>
  </div>
)

// ─── Infinite Marquee Column ──────────────────────────────────────────────────
const MarqueeColumn: React.FC<MarqueeColumnProps> = ({
  testimonials,
  direction,
  speed = 40,
  fanText
}) => {
  const trackRef = useRef<HTMLDivElement>(null)
  const posRef = useRef(0)
  const rafRef = useRef<number>(0)
  const pauseRef = useRef(false)
  const animateRef = useRef<(() => void) | null>(null)

  // We render two identical sets so the loop is seamless
  const doubled = [...testimonials, ...testimonials]

  const animate = useCallback(() => {
    const track = trackRef.current
    if (!track || pauseRef.current) {
      rafRef.current = requestAnimationFrame(animateRef.current!)
      return
    }

    const halfH = track.scrollHeight / 2
    const step = speed / 60 // px per frame at 60 fps

    if (direction === 'up') {
      posRef.current -= step
      if (posRef.current <= -halfH) posRef.current += halfH
    } else {
      posRef.current += step
      if (posRef.current >= 0) posRef.current -= halfH
    }

    track.style.transform = `translateY(${posRef.current}px)`
    rafRef.current = requestAnimationFrame(animateRef.current!)
  }, [direction, speed])

  useEffect(() => {
    animateRef.current = animate
  }, [animate])

  useEffect(() => {
    // seed initial offset for 'down' direction so it starts mid-set
    if (direction === 'down' && trackRef.current) {
      const halfH = trackRef.current.scrollHeight / 2
      posRef.current = -halfH
    }
    rafRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafRef.current)
  }, [animate, direction])

  return (
    <div
      className="marquee-column"
    >
      <div ref={trackRef} className="marquee-track">
        {doubled.map((testimonial, i) => (
          <TestimonialCard key={`${testimonial.id}-${i}`} testimonial={testimonial} fanText={fanText} />
        ))}
      </div>
    </div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────
const TestimonialsForHost: React.FC = () => {
  const t = useTranslations('testimonialsForHost');
  const [columns, setColumns] = useState(3)

  useEffect(() => {
    const update = () => {
      setColumns(
        window.innerWidth < 768 ? 1 :
          window.innerWidth < 1024 ? 2 : 3
      )
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  const testimonialData: Testimonial[] = [
    {
      id: 1,
      profile_image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      name: "Marie Dubois",
      rating: 5,
      fan_type: "Nettoyage",
      description: "Gestlio a transformé ma façon de travailler. Je peux maintenant gérer plusieurs propriétés en même temps et les propriétaires sont très satisfaits de mon travail."
    },
    {
      id: 2,
      profile_image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      name: "Pierre Martin",
      rating: 5,
      fan_type: "Ménage",
      description: "La plateforme m'a permis de trouver des clients réguliers. Je suis maintenant autonome et mes revenus ont considérablement augmenté."
    },
    {
      id: 3,
      profile_image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      name: "Sophie Bernard",
      rating: 5,
      fan_type: "Entretien",
      description: "Les instructions détaillées pour chaque propriété sont très claires. Je sais exactement ce que les clients attendent et je reçois toujours d'excellentes évaluations."
    },
    {
      id: 4,
      profile_image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      name: "Jean Petit",
      rating: 5,
      fan_type: "Service",
      description: "Le système de paiement est fiable et rapide. Je reçois mon argent dans les 24 heures après chaque nettoyage, ce qui est parfait pour gérer mes finances."
    },
    {
      id: 5,
      profile_image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      name: "Isabelle Laurent",
      rating: 5,
      fan_type: "Propreté",
      description: "J'apprécie la flexibilité des horaires. Je peux choisir les missions qui me conviennent et organiser mon emploi du temps comme je le souhaite."
    },
    {
      id: 6,
      profile_image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      name: "Thomas Rousseau",
      rating: 5,
      fan_type: "Qualité",
      description: "Les outils et produits fournis par Gestlio sont excellents. Je peux fournir un service de haute qualité grâce à leur support."
    },
    {
      id: 7,
      profile_image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      name: "Camille Moreau",
      rating: 5,
      fan_type: "Communication",
      description: "La communication avec les propriétaires est simple et efficace. Je peux facilement coordonner les disponibilités et signaler tout problème."
    },
    {
      id: 8,
      profile_image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      name: "Lucas Girard",
      rating: 5,
      fan_type: "Confiance",
      description: "Les propriétaires me font confiance et me recommandent à d'autres. Je construis ma réputation grâce à la fiabilité de la plateforme."
    },
    {
      id: 9,
      profile_image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      name: "Emma Lemoine",
      rating: 5,
      fan_type: "Efficacité",
      description: "Le temps de nettoyage est optimisé grâce aux bonnes pratiques enseignées par Gestlio. Je peux gérer plus de propriétés en moins de temps."
    },
    {
      id: 10,
      profile_image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      name: "Nicolas Blanc",
      rating: 5,
      fan_type: "Professionnalisme",
      description: "Gestlio m'a permis de développer mes compétences professionnelles. Je suis maintenant un nettoyeur reconnu pour la qualité et la fiabilité de mon travail."
    },
    {
      id: 11,
      profile_image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      name: "Julie Robert",
      rating: 5,
      fan_type: "Opportunités",
      description: "J'accède à des opportunités que je n'aurais jamais trouvées ailleurs. La plateforme m'ouvre à de nouveaux marchés et types de propriétés."
    },
    {
      id: 12,
      profile_image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      name: "Antoine Dupont",
      rating: 5,
      fan_type: "Sécurité",
      description: "Je me sens en sécurité avec Gestlio. Le système protège mes informations et garantit les paiements. C'est essentiel pour travailler en toute tranquillité."
    }
  ];

  // Distribute cards round-robin into columns
  const colData: Testimonial[][] = Array.from({ length: columns }, (_, ci) =>
    testimonialData.filter((_, i) => i % columns === ci)
  )

  // Snake direction: even cols go up, odd cols go down
  const directionFor = (ci: number): 'up' | 'down' => ci % 2 === 0 ? 'up' : 'down'

  return (
    <>
      <section className="testimonials-root w-full! px-2">
        {/* Header */}
        <div className="text-center mb-12">
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6 border"
            style={{
              background: 'rgba(0,136,255,0.06)',
              borderColor: 'rgba(0,136,255,0.22)',
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full bg-[#0088FF] animate-pulse"
              aria-hidden="true"
            />
            <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#0088FF]">
              {t('trustedByCleaners')}
            </span>
          </div>
          <h1 className="text-2xl font-e sm:text-4xl md:text-5xl font-bold text-[#154098] mb-4">
            {t('title')}{" "}
            <span className="text-[#0088FF]">
              {t('titleHighlight')}
            </span>
          </h1>

          <p className="text-black/40 max-w-2xl text-sm md:text-base mx-auto">
            {t('subtitle')}
          </p>
        </div>


        {/* Marquee scene */}
        <div className="marquee-scene">
          <div className={`marquee-grid pointer-events-none cols-${columns}`}>
            {colData.map((col, ci) => (
              <MarqueeColumn
                key={ci}
                testimonials={col}
                direction={directionFor(ci)}
                speed={columns === 1 ? 32 : 36 + ci * 4}
                fanText={t('fan')}
              />
            ))}
          </div>
        </div>

        <div className="w-full flex items-center justify-center pt-8">
          <AvatarGroup className="**:grayscale **:hover:grayscale-0 transition-all">
            <Avatar className="w-9 h-9 border-2 border-white ring-1 ring-[#228c6b]/30">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback className="text-xs bg-[#228c6b]/20 text-[#1a8a66]">CN</AvatarFallback>
            </Avatar>
            <Avatar className="w-9 h-9 border-2 border-white ring-1 ring-[#228c6b]/30">
              <AvatarImage src="https://github.com/maxleiter.png" alt="@maxleiter" />
              <AvatarFallback className="text-xs bg-[#228c6b]/20 text-[#1a8a66]">ML</AvatarFallback>
            </Avatar>
            <Avatar className="w-9 h-9 border-2 border-white ring-1 ring-[#228c6b]/30">
              <AvatarImage src="https://github.com/evilrabbit.png" alt="@evilrabbit" />
              <AvatarFallback className="text-xs bg-[#228c6b]/20 text-[#1a8a66]">ER</AvatarFallback>
            </Avatar>
            <AvatarGroupCount className="w-9 h-9 text-xs border-2 border-white bg-[#228c6b]/20 text-[#1a8a66] font-semibold">
              +3
            </AvatarGroupCount>
          </AvatarGroup>
        </div>
      </section>
    </>
  )
}

export default TestimonialsForHost