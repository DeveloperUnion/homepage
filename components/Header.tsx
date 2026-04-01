'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

export default function Header() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const isActive = (path: string) => {
    if (path === '/') {
      return router.pathname === '/';
    }
    return router.pathname.startsWith(path);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  return (
    <header className={`tech-header ${isScrolled ? 'scrolled' : ''}`}>
      <nav className="tech-nav">
        <Link href="/" className="tech-logo">
          <Image src="/images/logo.jpg" alt="建設テックパートナーズ" className="logo-image" width={40} height={40} />
          <span>建設テックパートナーズ</span>
        </Link>

        <button
          className="mobile-menu-button"
          onClick={toggleMenu}
          aria-label="メニューを開く"
        >
          <i className={isMenuOpen ? "fas fa-times" : "fas fa-bars"}></i>
        </button>

        <ul className={`tech-nav-links ${isMenuOpen ? 'mobile-menu-open' : ''}`}>
          <li><Link href="/" onClick={closeMenu} className={isActive('/') ? 'active' : ''}>ホーム</Link></li>
          <li><Link href="/services/dx-consulting" onClick={closeMenu} className={isActive('/services/dx-consulting') ? 'active' : ''}>DXコンサル</Link></li>
          <li><Link href="/services/product-development" onClick={closeMenu} className={isActive('/services/product-development') ? 'active' : ''}>プロダクト開発</Link></li>
          <li><Link href="/company" onClick={closeMenu} className={isActive('/company') ? 'active' : ''}>会社概要</Link></li>
          <li><Link href="/blog" onClick={closeMenu} className={isActive('/blog') ? 'active' : ''}>ブログ</Link></li>
          <li><Link href="/contact" onClick={closeMenu} className={isActive('/contact') ? 'active' : ''}>お問い合わせ</Link></li>
        </ul>
      </nav>

      {isMenuOpen && (
        <div
          className="mobile-menu-overlay"
          onClick={closeMenu}
        ></div>
      )}
    </header>
  );
}
