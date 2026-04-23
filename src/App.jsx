import React, { useState, useEffect } from 'react';
import { FiGlobe, FiMail, FiLinkedin, FiGithub } from 'react-icons/fi';
import profileImg from './assets/profile.png';

const ROWS = [
  { char: 'H', target: 72 },
  { char: 'E', target: 69 },
  { char: 'R', target: 82 },
  { char: 'D', target: 68 },
  { char: 'E', target: 69 },
  { char: 'M', target: 77 }
];

function LoadingScreen({ onFinished }) {
  const [counts, setCounts] = useState(ROWS.map(() => 0));
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 5000; // 5 saniye
    const intervalTime = 30; // Daha akıcı sayım için
    const startTime = Date.now();

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const currentProgress = Math.min(elapsed / duration, 1);
      setProgress(currentProgress);

      const newCounts = ROWS.map((row) => {
        // Her satırın hedef değerine progress oranında yaklaş
        return Math.floor(row.target * currentProgress);
      });

      setCounts(newCounts);

      if (currentProgress >= 1) {
        clearInterval(interval);
        setTimeout(onFinished, 800); // Son harfi görmesi için kısa bir bekleme
      }
    }, intervalTime);

    return () => clearInterval(interval);
  }, [onFinished]);

  // Sayıyı 8 bitlik binary string'e çevirip 1'leri harfle değiştirir
  const formatBinary = (num, char) => {
    return num.toString(2).padStart(8, '0').split('').map(bit => bit === '1' ? char : '0').join('');
  };

  return (
    <div className="loader-wrapper">
      <div className="matrix-container">
        {counts.map((count, i) => (
          <div key={i} className="matrix-row">
            {formatBinary(count, ROWS[i].char).split('').map((bit, j) => {
              const isZero = bit === '0';
              // İlk harf sütunu (index 1) en parlak olan
              const isMainColumn = j === 1 && bit !== '0';
              
              let className = 'binary';
              if (isMainColumn) className = 'letter glow-bright';
              else if (!isZero) className = 'letter glow-dim';

              return (
                <span key={j} className={className}>
                  {bit}
                </span>
              );
            })}
          </div>
        ))}
      </div>
      <div className="progress-bar-container">
        <div className="progress-bar" style={{ width: `${progress * 100}%` }}></div>
      </div>
    </div>
  );
}

function App() {
  const [loading, setLoading] = useState(true);

  const links = [
    { 
      name: 'Portfolio on herdem.net.tr', 
      url: 'https://herdem.net.tr',
      icon: <FiGlobe className="link-icon" />
    },
    { 
      name: 'Contact me via Email', 
      url: 'mailto:herdem@herdem.net.tr',
      icon: <FiMail className="link-icon" />
    },
    { 
      name: 'LinkedIn Profile', 
      url: 'https://linkedin.com/in/spaghetti-coder',
      icon: <FiLinkedin className="link-icon" />
    },
    { 
      name: 'GitHub Profile', 
      url: 'https://github.com/the-herdem',
      icon: <FiGithub className="link-icon" />
    }
  ];

  if (loading) {
    return <LoadingScreen onFinished={() => setLoading(false)} />;
  }

  return (
    <div className="container fade-in-site">
      <header className="profile-section">
        <img 
          src={profileImg} 
          alt="Profile" 
          className="profile-img" 
        />
        <div className="profile-text">
          <h1 className="name">Hidayet Erdem</h1>
          <p className="title">Developer</p>
        </div>
      </header>

      <main className="links-section">
        {links.map((link, index) => (
          <a
            key={index}
            href={link.url}
            className={`link-button animate-fade-in stagger-${index + 1}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {link.icon}
            <span className="link-text">{link.name}</span>
          </a>
        ))}
      </main>
    </div>
  );
}

export default App;
