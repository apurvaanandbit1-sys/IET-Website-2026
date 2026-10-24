import '../styles/achievements.css';

function AchievementsSection() {
  const achievements = [
    {
      circle: "200+",
      kicker: "STRONG NETWORK",
      title: "Growing Together",
      image: '/assets/about/growing-together.jpg',
      position: "center 20%",
      quote: "Over 200 active developers and engineers across campus",
      desc: "Peer-to-peer learning culture",
    },
    {
      circle: "#55",
      kicker: "ICPC REGIONALS",
      title: "ICPC",
      image: '/assets/gallery/icpc-amritapuri.jpg',
      position: "center 15%",
      quote: "Rank 55 out of ~310 teams at the ICPC Amritapuri Multisite Regionals as a 2nd-year team from BIT Mesra.",
      desc: "Team Trie Again · 2nd-Year",
    },
    {
      circle: "C++",
      kicker: "ANNUAL WORKSHOP",
      title: "C++ Workshop",
      image: '/assets/about/cpp-workshop-highlights.jpg',
      position: "center 20%",
      quote: "A three-day flagship workshop introducing programming fundamentals, STL, and hands-on problem-solving to hundreds of students.",
      desc: "3-Day Hands-on Bootcamp",
    }
  ];

  return (
    <section className="achievements-section container section-reveal">
      <div className="achievements-header">
        <h2>Our <em>Highlights</em></h2>
        <p className="achievements-subtitle">Building a legacy through code and community.</p>
      </div>

      <div className="achievements-grid">
        <div className="achievements-line"></div>
        {achievements.map((item, i) => (
          <div className="achievement-card" key={i}>
            <div className="achievement-circle">
              <span>{item.circle}</span>
            </div>
            <div className="achievement-content">
              <span className="kicker">{item.kicker}</span>
              <h3>{item.title}</h3>
              <div className="achievement-box">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="achievement-img"
                  style={item.position ? { objectPosition: item.position } : undefined}
                />
                <div className="achievement-glass">
                  <p className="achievement-quote">"{item.quote}"</p>
                  <div className="achievement-footer">
                    <div>
                      <p className="achievement-author">{item.title}</p>
                      <p className="achievement-desc">{item.desc}</p>
                    </div>
                    <div className="achievement-logo">
                      <span>IET</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default AchievementsSection;
