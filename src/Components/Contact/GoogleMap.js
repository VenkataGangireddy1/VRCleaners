import React, { useEffect, useRef, useState } from 'react'

export default function GoogleMap({ lat = 40.0081139, lng = -75.6830919, zoom = 15, height = 220, placeQuery = '', label = '' }) {
  const mapRef = useRef(null)
  const [loaded, setLoaded] = useState(false)
  const key = (process.env.REACT_APP_GOOGLE_MAPS_API_KEY || '').trim()

  useEffect(() => {
    if (!key) return

    // if google is already loaded, just initialize
    if (window.google && window.google.maps) {
      initMap()
      return
    }

    const script = document.createElement('script')
    script.src = `https://maps.googleapis.com/maps/api/js?key=${key}`
    script.async = true
    script.defer = true
    script.onload = () => {
      initMap()
    }
    script.onerror = () => {
      console.error('Google Maps script failed to load')
      setLoaded(false)
    }
    document.head.appendChild(script)

    function initMap() {
      try {
        const map = new window.google.maps.Map(mapRef.current, {
          center: { lat, lng },
          zoom,
          disableDefaultUI: false,
        })
        const marker = new window.google.maps.Marker({ position: { lat, lng }, map })
        // show a label / info window with location name if provided
        const infoContent = label || placeQuery || ''
        if (infoContent) {
          const info = new window.google.maps.InfoWindow({ content: `<div style="font-weight:600">${infoContent}</div>` })
          info.open(map, marker)
        }
        setLoaded(true)
      } catch (err) {
        console.error('Failed to initialize Google Map', err)
        setLoaded(false)
      }
    }

    return () => {
      // remove script? keep it for subsequent mounts
    }
  }, [key, lat, lng, zoom, placeQuery, label])

  // If no API key, render an iframe embed as a fallback
  if (!key) {
    // prefer a human-friendly place query (address or place name) if supplied, fallback to lat,lng
    const q = placeQuery ? encodeURIComponent(placeQuery) : encodeURIComponent(lat + ',' + lng)
    const src = `https://www.google.com/maps?q=${q}&hl=en&z=${zoom}&output=embed`
    return (
      <div style={{ width: '100%', height }}>
        <iframe
          title="Map"
          src={src}
          style={{ border: 0, width: '100%', height: '100%' }}
          loading="lazy"
        />
      </div>
    )
  }

  return (
    <div style={{ width: '100%', height }}>
      <div ref={mapRef} style={{ width: '100%', height: '100%' }} />
      {!loaded && <div style={{ position: 'absolute', inset: 0 }} aria-hidden>Loading map…</div>}
    </div>
  )
}
