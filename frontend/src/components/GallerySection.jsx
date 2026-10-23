import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Arrow from './Arrow';
import { galleryArchiveItems } from '../pages/gallery/data/gallery';

const PAGE_SIZE = 25;
const HOME_ROW_SIZE = 8;
const HOME_INITIAL_COUNT = HOME_ROW_SIZE * 2;
const HOME_MORE_COUNT = HOME_ROW_SIZE * 3;

function GallerySection({ standalone = false }) {
  const [activeIndex, setActiveIndex] = useState(null);
  const [visibleCount, setVisibleCount] = useState(standalone ? PAGE_SIZE : HOME_INITIAL_COUNT);
  const closeButtonRef = useRef(null);
  const dialogRef = useRef(null);
  const items = galleryArchiveItems;
  const isOpen = activeIndex !== null;

  useEffect(() => {
    if (!isOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    const previouslyFocusedElement = document.activeElement;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setActiveIndex(null);
      } else if (event.key === 'ArrowRight') {
        setActiveIndex((index) => (index + 1) % items.length);
      } else if (event.key === 'ArrowLeft') {
        setActiveIndex((index) => (index - 1 + items.length) % items.length);
      } else if (event.key === 'Tab') {
        const controls = Array.from(dialogRef.current?.querySelectorAll('button') ?? []);
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
      if (previouslyFocusedElement instanceof HTMLElement) {
        previouslyFocusedElement.focus();
      }
    };
  }, [isOpen, items]);

  const sectionClass = standalone
    ? 'gallery-section gallery-page-body page-body container'
    : 'gallery-section section container section-reveal';

  return (
    <>
      <section className={sectionClass} id={standalone ? undefined : 'gallery'}>
        {!standalone && (
          <div className="section-head">
            <div>
              <span className="kicker">04 / GALLERY</span>
              <h2 className="reveal-title">GALLERY<span className="gallery-hero-period">.</span></h2>
              <p className="gallery-home-tagline">Moments that <em>bring us together.</em></p>
            </div>
            <a className="text-link" href="/gallery">
              View the gallery <Arrow />
            </a>
          </div>
        )}
        {standalone && (
          <div className="gallery-archive-head">
            <div>
              <span className="kicker">THE ARCHIVE / {items.length} FRAMES</span>
              <h2>Inside the chapter.</h2>
            </div>
            <p>Preview images repeat while we build the archive. New photos will take their place as they arrive.</p>
          </div>
        )}
        <div className="chapter-gallery-grid">
          {items.slice(0, visibleCount).map((item, index) => (
            <button
              className="chapter-gallery-card"
              key={item.id ?? item.image}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`View ${item.title} image`}
            >
              <span className="chapter-gallery-image">
                <img src={item.image} alt={item.alt} loading={index < 3 ? 'eager' : 'lazy'} />
                <span className="chapter-gallery-zoom" aria-hidden="true">
                  +
                </span>
              </span>
              <span className="chapter-gallery-caption">
                <span className="chapter-gallery-category">{item.category}</span>
                <span className="chapter-gallery-title">{item.title}</span>
              </span>
            </button>
          ))}
        </div>
        {visibleCount < items.length && (
          <div className="gallery-load-more">
            <span>Showing {visibleCount} of {items.length} frames</span>
            <button type="button" onClick={() => setVisibleCount((count) => Math.min(count + (standalone ? PAGE_SIZE : HOME_MORE_COUNT), items.length))}>
              {standalone ? 'Load more photos' : 'View more'} <Arrow />
            </button>
          </div>
        )}
      </section>

      {activeIndex !== null && createPortal(
        <div className="gallery-lightbox" role="presentation" onClick={() => setActiveIndex(null)}>
          <div
            ref={dialogRef}
            className="gallery-lightbox-dialog"
            role="dialog"
            aria-modal="true"
            aria-label={`Image viewer: ${items[activeIndex].title}`}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              ref={closeButtonRef}
              className="gallery-lightbox-close"
              type="button"
              onClick={() => setActiveIndex(null)}
              aria-label="Close image viewer"
            >
              ×
            </button>
            <button
              className="gallery-lightbox-nav gallery-lightbox-previous"
              type="button"
              onClick={() =>
                setActiveIndex((index) => (index - 1 + items.length) % items.length)
              }
              aria-label="Previous image"
            >
              ‹
            </button>
            <div className="gallery-lightbox-stage">
              <img
                className="gallery-lightbox-image"
                src={items[activeIndex].image}
                alt={items[activeIndex].alt}
              />
            </div>
            <button
              className="gallery-lightbox-nav gallery-lightbox-next"
              type="button"
              onClick={() => setActiveIndex((index) => (index + 1) % items.length)}
              aria-label="Next image"
            >
              ›
            </button>
            <div className="gallery-lightbox-caption">
              <span>{items[activeIndex].category}</span>
              <strong>{items[activeIndex].title}</strong>
              <small>
                {activeIndex + 1} / {items.length}
              </small>
            </div>
          </div>
        </div>,
        document.body,
      )}
    </>
  );
}

export default GallerySection;
