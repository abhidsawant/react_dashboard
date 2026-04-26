import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Search, Bell, ChevronDown, Sun, Moon  } from 'lucide-react';
import './Header.css';

const Header = () => {
  const location = useLocation();
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [selectedLanguage, setSelectedLanguage] = useState({
    code: 'EN',
    name: 'English',
    flag: 'https://flagcdn.com/w40/us.png',
    fullName: 'Eng (US)'
  });
  const [isDarkMode, setIsDarkMode] = useState(false);


  const languages = [
    { code: 'EN', name: 'English', flag: 'https://flagcdn.com/w40/us.png', fullName: 'Eng (US)' },
    { code: 'ES', name: 'Spanish', flag: 'https://flagcdn.com/w40/es.png', fullName: 'Esp (ES)' },
    { code: 'FR', name: 'French', flag: 'https://flagcdn.com/w40/fr.png', fullName: 'Fra (FR)' },
    { code: 'DE', name: 'German', flag: 'https://flagcdn.com/w40/de.png', fullName: 'Deu (DE)' },
    { code: 'ZH', name: 'Chinese', flag: 'https://flagcdn.com/w40/cn.png', fullName: 'Chi (CN)' },
    { code: 'JA', name: 'Japanese', flag: 'https://flagcdn.com/w40/jp.png', fullName: 'Jpn (JP)' },
    { code: 'PT', name: 'Portuguese', flag: 'https://flagcdn.com/w40/br.png', fullName: 'Por (BR)' },
    { code: 'IT', name: 'Italian', flag: 'https://flagcdn.com/w40/it.png', fullName: 'Ita (IT)' },
    { code: 'RU', name: 'Russian', flag: 'https://flagcdn.com/w40/ru.png', fullName: 'Rus (RU)' },
    { code: 'AR', name: 'Arabic', flag: 'https://flagcdn.com/w40/sa.png', fullName: 'Ara (SA)' },
  ];

  const getPageTitle = () => {
    const path = location.pathname;
    switch (path) {
      case '/dashboard':
        return 'Dashboard';
      case '/leaderboard':
        return 'Leaderboard';
      case '/orders':
        return 'Orders';
      case '/products':
        return 'Products';
      case '/sales-report':
        return 'Sales Report';
      case '/messages':
        return 'Messages';
      case '/settings':
        return 'Settings';
      default:
        return 'Dashboard';
    }
  };

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language);
    setIsLanguageOpen(false);
  };

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    document.documentElement.setAttribute('data-theme', newMode ? 'dark' : 'light');
    localStorage.setItem('theme', newMode ? 'dark' : 'light');
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsLanguageOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="header">
      <h1 className="header-title">{getPageTitle()}</h1>
      <div className="header-actions">
        <div className="search-container">
          <Search className="search-icon" size={18} />
          <input 
            type="text" 
            placeholder="Search here..." 
            className="search-input"
          />
        </div>
        
        <button className="theme-toggle" onClick={toggleDarkMode}>
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        {/* Language Selector */}
        <div className="language-selector" ref={dropdownRef}>
          <button 
            className="language-trigger"
            onClick={() => setIsLanguageOpen(!isLanguageOpen)}
          >
            <div className="language-flag-container">
              <img 
                src={selectedLanguage.flag} 
                alt={selectedLanguage.name}
                className="language-flag-img"
              />
            </div>
            <span className="language-label">{selectedLanguage.fullName}</span>
            <ChevronDown 
              size={16} 
              className={`language-chevron ${isLanguageOpen ? 'open' : ''}`}
            />
          </button>
          
          {isLanguageOpen && (
            <div className="language-dropdown">
              {languages.map((language) => (
                <button
                  key={language.code}
                  className={`language-option ${selectedLanguage.code === language.code ? 'active' : ''}`}
                  onClick={() => handleLanguageSelect(language)}
                >
                  <div className="language-flag-container">
                    <img 
                      src={language.flag} 
                      alt={language.name}
                      className="language-flag-img"
                    />
                  </div>
                  <span className="language-name">{language.name}</span>
                  {selectedLanguage.code === language.code && (
                    <span className="language-check">✓</span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="header-right">
          <button className="notification-button">
            <Bell size={20} className="bell-icon" />
            <span className="notification-badge"></span>
          </button>
          <div className="user-profile">
            <img src="/src/assets/images/Abhi_IMG.jpg" alt="User" className="user-avatar" />
            <div className="user-info">
              <p className="user-name">Abhishek</p>
              <p className="user-role">Admin</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
