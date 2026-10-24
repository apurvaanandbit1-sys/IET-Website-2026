import { useState } from 'react';
import EventModal from './components/EventModal';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';
import PastEvents from '../../components/PastEvents';
import TechLinesHud from '../about/components/TechLinesHud';

const eventsHeroArt = '/assets/events/events-hero-art.png';

function EventsPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleSpotlight = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
  };

  return (
    <>
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} currentPath="/events" />
      <section className="page-hero container page-hero-about events-hero">
        <div className="page-hero-content events-hero-content">
          <span className="kicker">IET / ACTIVITY LOG / 2026</span>
          <h1>
            Show up.
            <br />
            Learn. <em>Ship.</em>
          </h1>
          <p>
            From high-pressure coding challenges like SWE Quest, Blind Coding, and Split Solve to in-depth C++ workshops, our events push students to think critically, solve problems creatively, and strengthen their programming fundamentals. We create spaces where students challenge each other, learn from one another, and grow together as a developer community.
          </p>
        </div>
        <div
          className="page-hero-art interactive-art events-hero-art"
          onMouseMove={handleSpotlight}
          aria-label="IET Events Cybernetic Sphere"
        >
          <img src={eventsHeroArt} alt="IET Events Visual Graphic" />
        </div>
      </section>
      <TechLinesHud />
      <main className="events-page container">
        <PastEvents splitWorkshops onLearnMore={setSelectedEvent} />
      </main>
      <EventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
      <Footer />
    </>
  );
}

export default EventsPage;
