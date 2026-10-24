import { useEffect, useRef, useState } from 'react';
import Arrow from './Arrow';
import { galleryItems } from '../pages/gallery/data/gallery';

function GallerySection({ standalone = false }) {
  const [activeIndex, setActiveIndex] = useState(null);
  const closeButtonRef = useRef(null);

  useEffect(() => {
    if (activeIndex === null) return undefined;

    const previousOverflow = document.body.style.overflow;
    const previouslyFocusedElement = document.activeElement;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setActiveIndex(null);
      } else if (event.key === 'ArrowRight') {
        setActiveIndex((index) => (index + 1) % galleryItems.length);
      } else if (event.key === 'ArrowLeft') {
        setActiveIndex((index) => (index - 1 + galleryItems.length) % galleryItems.length);
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
  }, [activeIndex]);

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
              <h2 className="reveal-title">
                A closer look.
                <br />
                <em>Built together.</em>
              </h2>
            </div>
            <a className="text-link" href="/gallery">
              View the gallery <Arrow />
            </a>
          </div>
        )}
        <div className="chapter-gallery-grid">
          {galleryItems.map((item, index) => (
            <button
              className="chapter-gallery-card"
              key={item.image}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`View ${item.title} image`}
            >
              <span className="chapter-gallery-image">
                <img src={item.image} alt={item.alt} loading="lazy" />
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
      </section>

      {activeIndex !== null && (
        <div className="gallery-lightbox" role="presentation" onClick={() => setActiveIndex(null)}>
          <div
            className="gallery-lightbox-dialog"
            role="dialog"
            aria-modal="true"
            aria-label={`Image viewer: ${galleryItems[activeIndex].title}`}
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
                setActiveIndex((index) => (index - 1 + galleryItems.length) % galleryItems.length)
              }
              aria-label="Previous image"
            >
              ‹
            </button>
            <img
              className="gallery-lightbox-image"
              src={galleryItems[activeIndex].image}
              alt={galleryItems[activeIndex].alt}
            />
            <button
              className="gallery-lightbox-nav gallery-lightbox-next"
              type="button"
              onClick={() => setActiveIndex((index) => (index + 1) % galleryItems.length)}
              aria-label="Next image"
            >
              ›
            </button>
            <div className="gallery-lightbox-caption">
              <span>{galleryItems[activeIndex].category}</span>
              <strong>{galleryItems[activeIndex].title}</strong>
              <small>
                {activeIndex + 1} / {galleryItems.length}
              </small>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default GallerySection;
