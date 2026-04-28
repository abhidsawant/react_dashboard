import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Search, Bell, ChevronDown, Sun, Moon, Menu, MoreVertical } from 'lucide-react';
import profileImage from '../../../assets/images/Abhi_IMG.jpg';
import './Header.css';

const Header = ({ onMenuClick }) => {
  const location = useLocation();
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const searchRef = useRef(null);
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
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="header">
      <div className="header-left">
        <button className="hamburger-menu" onClick={onMenuClick}>
          <Menu size={24} />
        </button>
        <h1 className="header-title">{getPageTitle()}</h1>
      </div>
      <div className="header-actions">
        {/* Desktop Search */}
        <div className="search-container desktop-search">
          <Search className="search-icon" size={18} />
          <input 
            type="text" 
            placeholder="Search here..." 
            className="search-input"
          />
        </div>

        {/* Mobile Search */}
        <div className="mobile-search-wrapper" ref={searchRef}>
          <button 
            className="mobile-search-btn"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
          >
            <Search size={20} />
          </button>
          {isSearchOpen && (
            <div className="mobile-search-dropdown">
              <input 
                type="text" 
                placeholder="Search here..." 
                className="mobile-search-input"
                autoFocus
              />
            </div>
          )}
        </div>
        
        {/* Desktop Language & Theme */}
        <button className="theme-toggle desktop-only" onClick={toggleDarkMode}>
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        {/* Language Selector */}
        <div className="language-selector desktop-only" ref={dropdownRef}>
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
          {/* Mobile More Menu */}
          <div className="mobile-more-menu">
            <button 
              className="mobile-more-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <MoreVertical size={20} />
            </button>
            {isMobileMenuOpen && (
              <div className="mobile-more-dropdown">
                <button className="mobile-menu-item" onClick={toggleDarkMode}>
                  {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
                  <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
                </button>
                <div className="mobile-menu-divider"></div>
                {languages.map((language) => (
                  <button
                    key={language.code}
                    className={`mobile-menu-item ${selectedLanguage.code === language.code ? 'active' : ''}`}
                    onClick={() => {
                      handleLanguageSelect(language);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    <img 
                      src={language.flag} 
                      alt={language.name}
                      className="mobile-flag-img"
                    />
                    <span>{language.name}</span>
                    {selectedLanguage.code === language.code && (
                      <span className="mobile-check">✓</span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button className="notification-button">
            <Bell size={20} className="bell-icon" />
            <span className="notification-badge"></span>
          </button>
          <div className="user-profile">
            <img src={profileImage} alt="User" className="user-avatar" />
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
