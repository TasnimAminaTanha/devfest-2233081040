import React from 'react'

/**
 * Generic placeholder card used for not-yet-implemented sections.
 */
export default function PlaceholderCard({ title, description }) {
  return (
    <section className="placeholder-card" aria-label={title}>
      <h2 className="card-title">{title}</h2>
      <p className="card-placeholder">{description}</p>
    </section>
  )
}
