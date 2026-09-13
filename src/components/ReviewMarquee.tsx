"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Star, Pause, Play } from "@phosphor-icons/react";
import type { Review } from "@/lib/reviews";
import styles from "./ReviewMarquee.module.css";

function ReviewCard({ review }: { review: Review }) {
  return (
    <figure className={styles.card}>
      <figcaption className={styles.identity}>
        {review.avatarUrl ? (
          <Image className={styles.avatar} src={review.avatarUrl} alt="" width={32} height={32} loading="eager" />
        ) : (
          <span className={styles.avatar} aria-hidden="true">{review.name.charAt(0).toUpperCase()}</span>
        )}
        <div><strong>{review.name}</strong><span>Rezension aus Google</span></div>
      </figcaption>
      <div className={styles.meta}>
        <span className={styles.stars} role="img" aria-label={`${review.rating} von 5 Sternen`}>
          {Array.from({ length: 5 }, (_, i) => <Star key={i} weight={i < review.rating ? "fill" : "regular"} aria-hidden="true" />)}
        </span>
      </div>
      {review.text ? <blockquote>{review.text}</blockquote> : <p className={styles.excerpt}>Sternebewertung ohne Text</p>}
      {review.isExcerpt && <p className={styles.excerpt}>Auszug aus der Rezension</p>}
    </figure>
  );
}

export function ReviewMarquee({ reviews }: { reviews: readonly Review[] }) {
  const root = useRef<HTMLElement>(null);
  const [paused, setPaused] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const element = root.current;
    if (!element || typeof IntersectionObserver === "undefined") return;
    let inView = false;
    const sync = () => setActive(inView && !document.hidden);
    const observer = new IntersectionObserver(([entry]) => { inView = entry.isIntersecting; sync(); });
    observer.observe(element);
    document.addEventListener("visibilitychange", sync);
    return () => { observer.disconnect(); document.removeEventListener("visibilitychange", sync); };
  }, []);

  return (
    <section ref={root} className={styles.reviews} aria-label="Google-Bewertungen" data-running={active && !paused} data-expanded={expanded}>
      <div className={styles.toolbar}>
        <p>Stimmen aus Google-Bewertungen · von uns zusammengestellt.</p>
        <div className={styles.controls}>
          {!expanded && <button className={styles.motionButton} type="button" onClick={() => setPaused(!paused)}>
            {paused ? <Play aria-hidden="true" /> : <Pause aria-hidden="true" />}
            {paused ? "Bewegung fortsetzen" : "Bewegung pausieren"}
          </button>}
          <button type="button" aria-expanded={expanded} onClick={() => setExpanded(!expanded)}>
            {expanded ? "Als Laufband anzeigen" : "Alle Bewertungen lesen"}
          </button>
        </div>
      </div>
      <div className={styles.viewport} tabIndex={0} role="group" aria-label="Bewertungen durchsehen">
        <div className={styles.track}>
          <div className={styles.set}>
            {reviews.map(review => <ReviewCard key={review.id} review={review} />)}
          </div>
          <div className={`${styles.set} ${styles.copy}`} aria-hidden="true">
            {reviews.map(review => <ReviewCard key={review.id} review={review} />)}
          </div>
        </div>
      </div>
    </section>
  );
}
