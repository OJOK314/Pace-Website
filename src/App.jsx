
import { useState, useEffect, useRef } from "react";

// ─── STYLES ─────────────────────────────────────────────────────────────────
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Sans:wght@300;400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --navy: #0a1628;
    --navy-mid: #112244;
    --gold: #c9a84c;
    --gold-light: #e8c97a;
    --cream: #f5f0e8;
    --white: #ffffff;
    --gray: #6b7280;
    --light: #f9f8f5;
    --accent: #1e4d8c;
  }

  body {
    font-family: 'DM Sans', sans-serif;
    background: var(--light);
    color: var(--navy);
    overflow-x: hidden;
  }

  /* NAV */
  nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
    background: rgba(10,22,40,0.96);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid rgba(201,168,76,0.2);
    padding: 0 2rem;
    display: flex; align-items: center; justify-content: space-between;
    height: 70px;
  }

  .nav-logo {
    font-family: 'Playfair Display', serif;
    font-weight: 900;
    font-size: 1.4rem;
    color: var(--gold);
    letter-spacing: 0.5px;
    cursor: pointer;
    display: flex; align-items: center; gap: 10px;
  }

  .nav-logo-icon {
    width: 36px; height: 36px;
    background: linear-gradient(135deg, var(--gold), var(--gold-light));
    border-radius: 8px;
    display: flex; align-items: center; justify-content: center;
    font-size: 1.1rem; font-weight: 900; color: var(--navy);
  }

  .nav-links {
    display: flex; align-items: center; gap: 0.2rem;
    list-style: none;
  }

  .nav-links li button {
    background: none; border: none;
    color: rgba(255,255,255,0.8);
    font-family: 'DM Sans', sans-serif;
    font-size: 0.88rem; font-weight: 500;
    padding: 0.5rem 0.85rem;
    cursor: pointer; border-radius: 6px;
    transition: all 0.2s;
    letter-spacing: 0.3px;
  }

  .nav-links li button:hover, .nav-links li button.active {
    color: var(--gold);
    background: rgba(201,168,76,0.1);
  }

  .nav-cta {
    background: linear-gradient(135deg, var(--gold), var(--gold-light)) !important;
    color: var(--navy) !important;
    font-weight: 700 !important;
    padding: 0.5rem 1.2rem !important;
  }

  .nav-cta:hover { opacity: 0.9; transform: translateY(-1px); }

  .hamburger {
    display: none; flex-direction: column; gap: 5px;
    background: none; border: none; cursor: pointer; padding: 8px;
  }

  .hamburger span {
    display: block; width: 22px; height: 2px;
    background: var(--gold); border-radius: 2px;
    transition: all 0.3s;
  }

  /* MOBILE NAV */
  .mobile-menu {
    position: fixed; top: 70px; left: 0; right: 0; z-index: 999;
    background: rgba(10,22,40,0.98);
    padding: 1rem;
    display: flex; flex-direction: column; gap: 0.3rem;
    border-bottom: 1px solid rgba(201,168,76,0.2);
    transform: translateY(-110%);
    transition: transform 0.3s ease;
  }

  .mobile-menu.open { transform: translateY(0); }

  .mobile-menu button {
    background: none; border: none;
    color: rgba(255,255,255,0.85);
    font-family: 'DM Sans', sans-serif;
    font-size: 1rem; font-weight: 500;
    padding: 0.85rem 1rem;
    text-align: left; cursor: pointer; border-radius: 8px;
    transition: all 0.2s;
  }

  .mobile-menu button:hover { color: var(--gold); background: rgba(201,168,76,0.1); }

  /* PAGES */
  .page { padding-top: 70px; min-height: 100vh; }

  /* HERO */
  .hero {
    min-height: calc(100vh - 70px);
    background: var(--navy);
    position: relative; overflow: hidden;
    display: flex; align-items: center;
  }

  .hero-bg {
    position: absolute; inset: 0;
    background: 
      radial-gradient(ellipse 70% 50% at 80% 50%, rgba(30,77,140,0.5) 0%, transparent 60%),
      radial-gradient(ellipse 40% 40% at 20% 80%, rgba(201,168,76,0.1) 0%, transparent 50%);
  }

  .hero-grid {
    position: absolute; inset: 0; opacity: 0.04;
    background-image: linear-gradient(var(--gold) 1px, transparent 1px),
      linear-gradient(90deg, var(--gold) 1px, transparent 1px);
    background-size: 60px 60px;
  }

  .hero-content {
    position: relative; z-index: 2;
    max-width: 1200px; margin: 0 auto; padding: 4rem 2rem;
    display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center;
  }

  .hero-badge {
    display: inline-flex; align-items: center; gap: 8px;
    background: rgba(201,168,76,0.15);
    border: 1px solid rgba(201,168,76,0.3);
    color: var(--gold-light);
    padding: 0.4rem 1rem; border-radius: 100px;
    font-size: 0.8rem; font-weight: 600; letter-spacing: 1px; text-transform: uppercase;
    margin-bottom: 1.5rem;
  }

  .hero-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(2.5rem, 5vw, 4rem);
    font-weight: 900; color: var(--white);
    line-height: 1.1; margin-bottom: 1.5rem;
  }

  .hero-title span { color: var(--gold); }

  .hero-desc {
    color: rgba(255,255,255,0.65);
    font-size: 1.05rem; line-height: 1.8;
    margin-bottom: 2.5rem;
  }

  .hero-btns { display: flex; gap: 1rem; flex-wrap: wrap; }

  .btn-primary {
    background: linear-gradient(135deg, var(--gold), var(--gold-light));
    color: var(--navy); border: none;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.95rem; font-weight: 700;
    padding: 0.85rem 2rem; border-radius: 8px;
    cursor: pointer; transition: all 0.25s;
    letter-spacing: 0.3px;
  }

  .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(201,168,76,0.35); }

  .btn-outline {
    background: transparent;
    color: rgba(255,255,255,0.85);
    border: 1px solid rgba(255,255,255,0.25);
    font-family: 'DM Sans', sans-serif;
    font-size: 0.95rem; font-weight: 500;
    padding: 0.85rem 2rem; border-radius: 8px;
    cursor: pointer; transition: all 0.25s;
  }

  .btn-outline:hover { border-color: var(--gold); color: var(--gold); }

  .hero-stats {
    display: grid; grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem; margin-top: 3rem;
    padding-top: 2.5rem;
    border-top: 1px solid rgba(255,255,255,0.1);
  }

  .stat-num {
    font-family: 'Playfair Display', serif;
    font-size: 2.2rem; font-weight: 900; color: var(--gold);
  }

  .stat-label { color: rgba(255,255,255,0.5); font-size: 0.8rem; margin-top: 4px; }

  .hero-card {
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 20px; padding: 2.5rem;
    backdrop-filter: blur(10px);
  }

  .hero-card h3 {
    font-family: 'Playfair Display', serif;
    color: var(--white); font-size: 1.4rem; margin-bottom: 1.5rem;
  }

  .program-tag {
    display: inline-block;
    background: rgba(201,168,76,0.1);
    border: 1px solid rgba(201,168,76,0.2);
    color: var(--gold-light);
    padding: 0.5rem 1rem; border-radius: 6px;
    font-size: 0.82rem; margin: 0.3rem;
    font-weight: 500;
  }

  /* SECTIONS */
  section { padding: 5rem 2rem; }
  .container { max-width: 1200px; margin: 0 auto; }

  .section-label {
    font-size: 0.78rem; font-weight: 700; letter-spacing: 2px;
    text-transform: uppercase; color: var(--gold);
    margin-bottom: 0.75rem;
  }

  .section-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(1.8rem, 3.5vw, 2.8rem);
    font-weight: 900; color: var(--navy);
    line-height: 1.2; margin-bottom: 1.2rem;
  }

  .section-desc { color: var(--gray); font-size: 1rem; line-height: 1.8; max-width: 520px; }

  /* ABOUT */
  .about-grid {
    display: grid; grid-template-columns: 1fr 1fr; gap: 5rem; align-items: center;
  }

  .about-visual {
    background: var(--navy);
    border-radius: 20px; padding: 3rem;
    position: relative; overflow: hidden;
  }

  .about-visual::before {
    content: '';
    position: absolute; top: -50%; right: -50%;
    width: 100%; height: 100%;
    background: radial-gradient(circle, rgba(201,168,76,0.15) 0%, transparent 60%);
  }

  .about-visual-title {
    font-family: 'Playfair Display', serif;
    font-size: 1.5rem; color: var(--white); margin-bottom: 2rem; position: relative;
  }

  .value-item {
    display: flex; align-items: flex-start; gap: 1rem;
    padding: 1rem 0; border-bottom: 1px solid rgba(255,255,255,0.06);
    position: relative;
  }

  .value-item:last-child { border-bottom: none; }

  .value-icon {
    width: 40px; height: 40px; min-width: 40px;
    background: rgba(201,168,76,0.15);
    border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    font-size: 1.1rem;
  }

  .value-title { color: var(--white); font-weight: 600; margin-bottom: 2px; font-size: 0.95rem; }
  .value-desc { color: rgba(255,255,255,0.5); font-size: 0.82rem; line-height: 1.6; }

  /* PROGRAMS */
  .programs-section { background: var(--cream); }

  .programs-grid {
    display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; margin-top: 3rem;
  }

  .program-card {
    background: var(--white);
    border-radius: 16px; padding: 2rem;
    border: 1px solid rgba(10,22,40,0.06);
    transition: all 0.3s;
    cursor: default;
  }

  .program-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 16px 48px rgba(10,22,40,0.1);
    border-color: var(--gold);
  }

  .program-icon {
    width: 52px; height: 52px;
    background: linear-gradient(135deg, var(--navy), var(--accent));
    border-radius: 14px;
    display: flex; align-items: center; justify-content: center;
    font-size: 1.4rem; margin-bottom: 1.2rem;
  }

  .program-card h3 {
    font-family: 'Playfair Display', serif;
    font-size: 1.15rem; font-weight: 700; color: var(--navy);
    margin-bottom: 0.6rem;
  }

  .program-card p { color: var(--gray); font-size: 0.88rem; line-height: 1.7; }

  .program-dur {
    margin-top: 1.2rem; padding-top: 1.2rem;
    border-top: 1px solid var(--cream);
    font-size: 0.8rem; font-weight: 600; color: var(--gold);
    display: flex; align-items: center; gap: 6px;
  }

  /* TEAM */
  .team-grid {
    display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem; margin-top: 3rem;
  }

  .team-card {
    background: var(--white);
    border-radius: 16px; overflow: hidden;
    border: 1px solid rgba(10,22,40,0.06);
    transition: all 0.3s;
  }

  .team-card:hover { transform: translateY(-4px); box-shadow: 0 16px 48px rgba(10,22,40,0.1); }

  .team-avatar {
    width: 100%; aspect-ratio: 1;
    background: linear-gradient(135deg, var(--navy-mid), var(--accent));
    display: flex; align-items: center; justify-content: center;
    font-size: 3rem; color: rgba(255,255,255,0.3);
    position: relative;
  }

  .team-avatar .initials {
    font-family: 'Playfair Display', serif;
    font-size: 2.5rem; font-weight: 700;
    color: var(--gold); position: absolute;
  }

  .team-info { padding: 1.2rem; }

  .team-name {
    font-family: 'Playfair Display', serif;
    font-size: 1rem; font-weight: 700; color: var(--navy); margin-bottom: 3px;
  }

  .team-role { color: var(--gold); font-size: 0.78rem; font-weight: 600; margin-bottom: 0.6rem; }
  .team-bio { color: var(--gray); font-size: 0.8rem; line-height: 1.6; }

  /* SOCIAL */
  .social-section { background: var(--navy); }

  .social-grid {
    display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem; margin-top: 3rem;
  }

  .social-card {
    border-radius: 16px; padding: 2rem; text-align: center;
    border: 1px solid rgba(255,255,255,0.08);
    background: rgba(255,255,255,0.03);
    cursor: pointer; transition: all 0.3s;
  }

  .social-card:hover {
    background: rgba(255,255,255,0.07);
    border-color: rgba(201,168,76,0.3);
    transform: translateY(-3px);
  }

  .social-logo {
    width: 56px; height: 56px;
    border-radius: 14px;
    display: flex; align-items: center; justify-content: center;
    font-size: 1.6rem; margin: 0 auto 1rem;
  }

  .social-name { color: var(--white); font-weight: 700; margin-bottom: 4px; }
  .social-handle { color: var(--gold); font-size: 0.82rem; margin-bottom: 0.8rem; }
  .social-followers { color: rgba(255,255,255,0.4); font-size: 0.78rem; }

  .social-feed {
    margin-top: 4rem;
    display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem;
  }

  .post-card {
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: 16px; padding: 1.5rem;
    transition: all 0.3s;
  }

  .post-card:hover { background: rgba(255,255,255,0.06); }

  .post-header { display: flex; align-items: center; gap: 10px; margin-bottom: 1rem; }

  .post-avatar {
    width: 38px; height: 38px; border-radius: 50%;
    background: linear-gradient(135deg, var(--gold), var(--gold-light));
    display: flex; align-items: center; justify-content: center;
    font-weight: 700; color: var(--navy); font-size: 0.85rem;
  }

  .post-author { color: var(--white); font-weight: 600; font-size: 0.88rem; }
  .post-platform { color: var(--gold); font-size: 0.72rem; }
  .post-text { color: rgba(255,255,255,0.7); font-size: 0.85rem; line-height: 1.7; margin-bottom: 1rem; }
  .post-time { color: rgba(255,255,255,0.3); font-size: 0.75rem; }
  .post-tag { color: var(--gold-light); }

  /* APPLICATION FORM */
  .form-section { background: var(--cream); }

  .form-wrap {
    max-width: 780px; margin: 3rem auto 0;
    background: var(--white);
    border-radius: 24px; padding: 3rem;
    border: 1px solid rgba(10,22,40,0.06);
    box-shadow: 0 20px 60px rgba(10,22,40,0.08);
  }

  .form-steps {
    display: flex; align-items: center; gap: 0; margin-bottom: 3rem;
  }

  .form-step {
    flex: 1; display: flex; flex-direction: column; align-items: center;
    position: relative;
  }

  .form-step::after {
    content: '';
    position: absolute; top: 18px; left: 50%;
    width: 100%; height: 2px;
    background: var(--cream);
    z-index: 0;
  }

  .form-step:last-child::after { display: none; }

  .step-circle {
    width: 36px; height: 36px; border-radius: 50%;
    background: var(--cream); border: 2px solid rgba(10,22,40,0.12);
    display: flex; align-items: center; justify-content: center;
    font-size: 0.8rem; font-weight: 700; color: var(--gray);
    position: relative; z-index: 1; transition: all 0.3s;
  }

  .step-circle.active {
    background: var(--gold); border-color: var(--gold); color: var(--navy);
  }

  .step-circle.done {
    background: var(--navy); border-color: var(--navy); color: var(--white);
  }

  .step-label { font-size: 0.72rem; color: var(--gray); margin-top: 6px; font-weight: 500; }
  .step-label.active { color: var(--gold); font-weight: 700; }

  .form-group { margin-bottom: 1.5rem; }

  .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }

  label {
    display: block; font-size: 0.82rem; font-weight: 600;
    color: var(--navy); margin-bottom: 0.4rem; letter-spacing: 0.3px;
  }

  input, select, textarea {
    width: 100%;
    padding: 0.75rem 1rem;
    border: 1.5px solid rgba(10,22,40,0.12);
    border-radius: 8px;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.9rem; color: var(--navy);
    background: var(--white);
    transition: border-color 0.2s;
    outline: none;
  }

  input:focus, select:focus, textarea:focus {
    border-color: var(--gold);
    box-shadow: 0 0 0 3px rgba(201,168,76,0.1);
  }

  textarea { resize: vertical; min-height: 110px; }

  .form-nav { display: flex; justify-content: space-between; align-items: center; margin-top: 2rem; }

  .btn-next {
    background: linear-gradient(135deg, var(--navy), var(--accent));
    color: var(--white); border: none;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.92rem; font-weight: 700;
    padding: 0.85rem 2rem; border-radius: 8px;
    cursor: pointer; transition: all 0.25s;
  }

  .btn-next:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(10,22,40,0.2); }

  .btn-back {
    background: transparent; color: var(--gray);
    border: 1.5px solid rgba(10,22,40,0.12);
    font-family: 'DM Sans', sans-serif;
    font-size: 0.92rem; font-weight: 500;
    padding: 0.85rem 2rem; border-radius: 8px;
    cursor: pointer; transition: all 0.2s;
  }

  .btn-back:hover { border-color: var(--navy); color: var(--navy); }

  .success-state { text-align: center; padding: 3rem 0; }
  .success-icon { font-size: 4rem; margin-bottom: 1.5rem; }
  .success-title {
    font-family: 'Playfair Display', serif;
    font-size: 1.8rem; color: var(--navy); margin-bottom: 1rem;
  }
  .success-text { color: var(--gray); line-height: 1.7; }

  /* CONTACT */
  .contact-section { background: var(--white); }

  .contact-grid { display: grid; grid-template-columns: 1fr 2fr; gap: 4rem; margin-top: 3rem; }

  .contact-info h3 {
    font-family: 'Playfair Display', serif;
    font-size: 1.4rem; color: var(--navy); margin-bottom: 2rem;
  }

  .contact-item {
    display: flex; align-items: flex-start; gap: 1rem;
    margin-bottom: 1.5rem;
  }

  .contact-ic {
    width: 42px; height: 42px; min-width: 42px;
    background: var(--cream);
    border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    font-size: 1.1rem;
  }

  .contact-label { font-size: 0.75rem; color: var(--gray); margin-bottom: 2px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; }
  .contact-val { font-size: 0.9rem; color: var(--navy); font-weight: 500; }

  /* FOOTER */
  footer {
    background: var(--navy);
    padding: 3rem 2rem 1.5rem;
  }

  .footer-grid {
    max-width: 1200px; margin: 0 auto;
    display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 3rem;
    padding-bottom: 2.5rem;
    border-bottom: 1px solid rgba(255,255,255,0.06);
  }

  .footer-brand p { color: rgba(255,255,255,0.45); font-size: 0.85rem; line-height: 1.8; margin-top: 1rem; }

  .footer-heading { color: var(--gold); font-size: 0.75rem; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; margin-bottom: 1rem; }

  .footer-links { list-style: none; }
  .footer-links li { margin-bottom: 0.5rem; }
  .footer-links li button {
    background: none; border: none;
    color: rgba(255,255,255,0.5);
    font-family: 'DM Sans', sans-serif;
    font-size: 0.85rem; cursor: pointer;
    padding: 0; transition: color 0.2s;
    text-align: left;
  }

  .footer-links li button:hover { color: var(--gold); }

  .footer-social { display: flex; gap: 0.6rem; margin-top: 1rem; }

  .social-btn {
    width: 36px; height: 36px; border-radius: 8px;
    border: 1px solid rgba(255,255,255,0.1);
    background: rgba(255,255,255,0.04);
    color: rgba(255,255,255,0.6);
    font-size: 0.9rem;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; transition: all 0.2s; text-decoration: none;
  }

  .social-btn:hover { border-color: var(--gold); color: var(--gold); background: rgba(201,168,76,0.1); }

  .footer-bottom {
    max-width: 1200px; margin: 1.5rem auto 0;
    display: flex; align-items: center; justify-content: space-between;
    color: rgba(255,255,255,0.3); font-size: 0.8rem;
  }

  /* RESPONSIVE */
  @media (max-width: 1024px) {
    .hero-content { grid-template-columns: 1fr; }
    .hero-card { display: none; }
    .about-grid { grid-template-columns: 1fr; gap: 2.5rem; }
    .programs-grid { grid-template-columns: repeat(2, 1fr); }
    .team-grid { grid-template-columns: repeat(2, 1fr); }
    .social-grid { grid-template-columns: repeat(2, 1fr); }
    .social-feed { grid-template-columns: 1fr 1fr; }
    .footer-grid { grid-template-columns: 1fr 1fr; }
  }

  @media (max-width: 768px) {
    .nav-links { display: none; }
    .hamburger { display: flex; }
    .programs-grid { grid-template-columns: 1fr; }
    .team-grid { grid-template-columns: repeat(2, 1fr); }
    .social-grid { grid-template-columns: 1fr 1fr; }
    .social-feed { grid-template-columns: 1fr; }
    .contact-grid { grid-template-columns: 1fr; }
    .form-row { grid-template-columns: 1fr; }
    .footer-grid { grid-template-columns: 1fr 1fr; }
    .hero-stats { grid-template-columns: repeat(3, 1fr); }
    section { padding: 3.5rem 1.5rem; }
  }

  @media (max-width: 480px) {
    .team-grid { grid-template-columns: 1fr; }
    .social-grid { grid-template-columns: 1fr; }
    .footer-grid { grid-template-columns: 1fr; }
    .hero-btns { flex-direction: column; }
    .btn-primary, .btn-outline { text-align: center; }
    .form-wrap { padding: 2rem 1.5rem; }
    .form-steps { gap: 0; }
    .step-label { font-size: 0.62rem; }
  }

  /* Animations */
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .fade-up { animation: fadeUp 0.5s ease both; }
  .delay-1 { animation-delay: 0.1s; }
  .delay-2 { animation-delay: 0.2s; }
  .delay-3 { animation-delay: 0.3s; }
  .delay-4 { animation-delay: 0.4s; }

  .checkbox-group { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: 0.5rem; }
  .checkbox-item { display: flex; align-items: center; gap: 0.4rem; font-size: 0.85rem; color: var(--navy); cursor: pointer; }
  .checkbox-item input[type=checkbox] { width: auto; }

  select option { padding: 0.5rem; }

  .required { color: #e53e3e; margin-left: 2px; }
`;

// ─── DATA ────────────────────────────────────────────────────────────────────

const programs = [
  { icon: "📊", title: "Business Management", desc: "Comprehensive training in strategic planning, finance, and organizational leadership for modern business environments.", duration: "12 Months" },
  { icon: "🏛️", title: "Public Administration", desc: "Develop skills for governance, policy analysis, and effective management of public sector institutions.", duration: "18 Months" },
  { icon: "📈", title: "Project Management", desc: "Master the methodologies and tools needed to lead projects from inception to successful completion.", duration: "9 Months" },
  { icon: "🤝", title: "Human Resources", desc: "Learn to attract, retain, and develop talent while building a healthy organizational culture.", duration: "12 Months" },
  { icon: "💻", title: "Digital Transformation", desc: "Navigate the intersection of technology and business strategy to drive innovation and growth.", duration: "6 Months" },
  { icon: "🌍", title: "International Affairs", desc: "Gain perspective on global systems, diplomacy, and cross-cultural management practices.", duration: "24 Months" },
];

const team = [
  { initials: "JM", name: "Dr. James Mubiru", role: "Director General", bio: "20+ years leading management education across East Africa." },
  { initials: "AL", name: "Prof. Amara Lule", role: "Dean of Studies", bio: "Expert in public policy and institutional development." },
  { initials: "RK", name: "Dr. Ruth Kasozi", role: "Head of Research", bio: "Pioneering researcher in organizational behavior and innovation." },
  { initials: "TN", name: "Mr. Thomas Nkutu", role: "Industry Relations", bio: "Connecting students with opportunities across the corporate sector." },
];

const socialPlatforms = [
  { bg: "#1DA1F2", icon: "𝕏", name: "Twitter / X", handle: "@PaceMgmtUG", followers: "8.4K Followers" },
  { bg: "#1877F2", icon: "f", name: "Facebook", handle: "Pace Management", followers: "21.3K Followers" },
  { bg: "linear-gradient(135deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)", icon: "◉", name: "Instagram", handle: "@pacemanagement", followers: "12.7K Followers" },
  { bg: "#0A66C2", icon: "in", name: "LinkedIn", handle: "Pace Management", followers: "5.8K Followers" },
];

const posts = [
  { platform: "Twitter / X", author: "Pace Management", initials: "PM", text: "Exciting news! 🎓 Our new Digital Transformation cohort kicks off next month. Limited spots available. Apply today and future-proof your career! #PaceManagement #DigitalUganda", time: "2 hours ago" },
  { platform: "LinkedIn", author: "Pace Management", initials: "PM", text: "We're proud to announce our partnership with Uganda Investment Authority. This collaboration will open new internship pathways for our students in finance and governance. #Leadership #Kampala", time: "Yesterday" },
  { platform: "Facebook", author: "Pace Management", initials: "PM", text: "Our graduates are making waves! Congratulations to the Class of 2025 — 94% employment rate within 6 months of completing their programs. Your success is our purpose. 🌟", time: "3 days ago" },
];

// ─── COMPONENTS ─────────────────────────────────────────────────────────────

function Navbar({ activePage, setActivePage }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navItems = ["Home", "About", "Programs", "Team", "Social", "Apply", "Contact"];

  const handleNav = (item) => {
    setActivePage(item);
    setMenuOpen(false);
  };

  return (
    <>
      <nav>
        <div className="nav-logo" onClick={() => setActivePage("Home")}>
          <div className="nav-logo-icon">P</div>
          Pace Management
        </div>
        <ul className="nav-links">
          {navItems.map(item => (
            <li key={item}>
              <button
                className={`${activePage === item ? "active" : ""} ${item === "Apply" ? "nav-cta" : ""}`}
                onClick={() => handleNav(item)}
              >
                {item}
              </button>
            </li>
          ))}
        </ul>
        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          <span style={{ transform: menuOpen ? "rotate(45deg) translate(5px, 5px)" : "" }} />
          <span style={{ opacity: menuOpen ? 0 : 1 }} />
          <span style={{ transform: menuOpen ? "rotate(-45deg) translate(5px, -5px)" : "" }} />
        </button>
      </nav>
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        {navItems.map(item => (
          <button key={item} onClick={() => handleNav(item)}
            style={{ color: activePage === item ? "var(--gold)" : "", fontWeight: item === "Apply" ? 700 : 500 }}>
            {item}
          </button>
        ))}
      </div>
    </>
  );
}

function Footer({ setActivePage }) {
  const links = {
    Programs: ["Business Management", "Public Administration", "Project Management", "HR Management"],
    "Quick Links": ["About Us", "Our Team", "Apply Now", "Contact"],
  };

  return (
    <footer>
      <div className="footer-grid">
        <div className="footer-brand">
          <div className="nav-logo" style={{ marginBottom: "0" }}>
            <div className="nav-logo-icon">P</div>
            <span style={{ color: "var(--gold)" }}>Pace Management</span>
          </div>
          <p>Empowering Africa's next generation of leaders through world-class management education and professional development programs.</p>
          <div className="footer-social">
            {["𝕏", "f", "in", "◉"].map((icon, i) => (
              <span key={i} className="social-btn">{icon}</span>
            ))}
          </div>
        </div>
        {Object.entries(links).map(([heading, items]) => (
          <div key={heading}>
            <div className="footer-heading">{heading}</div>
            <ul className="footer-links">
              {items.map(item => (
                <li key={item}><button onClick={() => setActivePage(item === "Apply Now" ? "Apply" : item === "About Us" ? "About" : item === "Our Team" ? "Team" : item)}>{item}</button></li>
              ))}
            </ul>
          </div>
        ))}
        <div>
          <div className="footer-heading">Contact</div>
          <ul className="footer-links">
            <li><button>Plot 14, Kampala Rd</button></li>
            <li><button>Kampala, Uganda</button></li>
            <li><button>+256 700 123 456</button></li>
            <li><button>info@pacemanagement.ug</button></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 Pace Management Institution. All rights reserved.</span>
        <span>Accredited by the Uganda National Council for Higher Education</span>
      </div>
    </footer>
  );
}

// ─── PAGES ──────────────────────────────────────────────────────────────────

function HomePage({ setActivePage }) {
  return (
    <div className="page">
      {/* HERO */}
      <div className="hero">
        <div className="hero-bg" />
        <div className="hero-grid" />
        <div className="hero-content">
          <div>
            <div className="hero-badge fade-up">✦ Accredited Excellence in Management</div>
            <h1 className="hero-title fade-up delay-1">
              Shape the Future of <span>African Business</span> Leadership
            </h1>
            <p className="hero-desc fade-up delay-2">
              Pace Management Institution equips professionals with the strategic skills, networks, and credentials to lead organizations across Uganda and beyond.
            </p>
            <div className="hero-btns fade-up delay-3">
              <button className="btn-primary" onClick={() => setActivePage("Apply")}>Apply Now →</button>
              <button className="btn-outline" onClick={() => setActivePage("Programs")}>Explore Programs</button>
            </div>
            <div className="hero-stats fade-up delay-4">
              <div><div className="stat-num">1,200+</div><div className="stat-label">Graduates</div></div>
              <div><div className="stat-num">94%</div><div className="stat-label">Employment Rate</div></div>
              <div><div className="stat-num">15+</div><div className="stat-label">Years Excellence</div></div>
            </div>
          </div>
          <div className="hero-card fade-up delay-2">
            <h3>Our Programs at a Glance</h3>
            {programs.map(p => (
              <span key={p.title} className="program-tag">{p.icon} {p.title}</span>
            ))}
            <div style={{ marginTop: "1.5rem", padding: "1rem", background: "rgba(201,168,76,0.08)", borderRadius: "10px", border: "1px solid rgba(201,168,76,0.15)" }}>
              <div style={{ color: "var(--gold-light)", fontSize: "0.82rem", fontWeight: 600 }}>🗓 Next Intake</div>
              <div style={{ color: "rgba(255,255,255,0.8)", fontSize: "0.9rem", marginTop: "4px" }}>March 2026 • Applications close Feb 28</div>
            </div>
          </div>
        </div>
      </div>

      {/* QUICK ABOUT */}
      <section style={{ background: "var(--white)" }}>
        <div className="container">
          <div className="about-grid">
            <div>
              <div className="section-label">Who We Are</div>
              <h2 className="section-title">A Legacy of Leadership Development</h2>
              <p className="section-desc">Founded in 2009, Pace Management Institution has grown into East Africa's most trusted center for professional management education. We blend academic rigor with practical application.</p>
              <button className="btn-primary" style={{ marginTop: "2rem" }} onClick={() => setActivePage("About")}>Learn More →</button>
            </div>
            <div className="about-visual">
              <div className="about-visual-title">Our Core Values</div>
              {[
                { icon: "⚡", title: "Excellence", desc: "We maintain the highest standards in teaching, research, and student outcomes." },
                { icon: "🌍", title: "Impact", desc: "Every program is designed to create measurable change in organizations and communities." },
                { icon: "🤝", title: "Integrity", desc: "We build trust through transparency, accountability, and ethical practice." },
              ].map(v => (
                <div key={v.title} className="value-item">
                  <div className="value-icon">{v.icon}</div>
                  <div>
                    <div className="value-title">{v.title}</div>
                    <div className="value-desc">{v.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PROGRAMS PREVIEW */}
      <section className="programs-section">
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "1rem" }}>
            <div className="section-label">What We Offer</div>
            <h2 className="section-title">Academic Programs</h2>
            <p className="section-desc" style={{ margin: "0 auto" }}>Industry-aligned curricula designed with input from leading employers across East Africa.</p>
          </div>
          <div className="programs-grid">
            {programs.slice(0, 3).map(p => (
              <div key={p.title} className="program-card">
                <div className="program-icon">{p.icon}</div>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
                <div className="program-dur">📅 {p.duration}</div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
            <button className="btn-primary" onClick={() => setActivePage("Programs")}>View All Programs</button>
          </div>
        </div>
      </section>
    </div>
  );
}

function AboutPage() {
  return (
    <div className="page">
      <section style={{ background: "var(--navy)", paddingTop: "5rem" }}>
        <div className="container">
          <div className="section-label" style={{ color: "var(--gold)" }}>Our Story</div>
          <h1 className="section-title" style={{ color: "var(--white)", maxWidth: "600px" }}>Building Africa's Management Talent Since 2009</h1>
          <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "1.05rem", lineHeight: 1.8, maxWidth: "640px" }}>
            Pace Management Institution was established with a single mission: to develop practical, ethical, and visionary leaders who can transform Ugandan and African institutions. Over 15 years, we've trained over 1,200 graduates who now serve in government, NGOs, and the private sector.
          </p>
        </div>
      </section>
      <section style={{ background: "var(--white)" }}>
        <div className="container">
          <div className="about-grid">
            <div>
              <div className="section-label">Mission & Vision</div>
              <h2 className="section-title">Why Pace Exists</h2>
              <p className="section-desc" style={{ marginBottom: "1.5rem" }}>
                <strong>Mission:</strong> To deliver transformative management education that builds skilled, ethical, and effective leaders for Africa's public and private sectors.
              </p>
              <p className="section-desc">
                <strong>Vision:</strong> To be East Africa's premier institution for management excellence — recognized for the impact our graduates have on society.
              </p>
            </div>
            <div className="about-visual">
              <div className="about-visual-title">By the Numbers</div>
              {[
                { icon: "🎓", title: "1,200+ Graduates", desc: "Alumni in leadership roles across 15+ countries." },
                { icon: "👩‍🏫", title: "45+ Faculty Members", desc: "Expert practitioners and academic researchers." },
                { icon: "🏆", title: "6 National Awards", desc: "Recognized for excellence in education and impact." },
                { icon: "🤝", title: "80+ Industry Partners", desc: "Connecting students to real-world opportunities." },
              ].map(v => (
                <div key={v.title} className="value-item">
                  <div className="value-icon">{v.icon}</div>
                  <div>
                    <div className="value-title">{v.title}</div>
                    <div className="value-desc">{v.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function ProgramsPage({ setActivePage }) {
  return (
    <div className="page">
      <section style={{ background: "var(--navy)", paddingTop: "5rem" }}>
        <div className="container">
          <div className="section-label" style={{ color: "var(--gold)" }}>Academic Programs</div>
          <h1 className="section-title" style={{ color: "var(--white)" }}>Find Your Path to Leadership</h1>
          <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "1rem", lineHeight: 1.8, maxWidth: "580px" }}>
            All programs are delivered by experienced practitioners, accredited by UNCHE, and designed for working professionals.
          </p>
        </div>
      </section>
      <section className="programs-section">
        <div className="container">
          <div className="programs-grid">
            {programs.map(p => (
              <div key={p.title} className="program-card">
                <div className="program-icon">{p.icon}</div>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
                <div className="program-dur">📅 {p.duration}</div>
                <button className="btn-primary" style={{ marginTop: "1.2rem", width: "100%", fontSize: "0.82rem", padding: "0.65rem 1rem" }} onClick={() => setActivePage("Apply")}>Apply for This Program</button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function TeamPage() {
  return (
    <div className="page">
      <section style={{ background: "var(--navy)", paddingTop: "5rem" }}>
        <div className="container">
          <div className="section-label" style={{ color: "var(--gold)" }}>Leadership</div>
          <h1 className="section-title" style={{ color: "var(--white)" }}>Meet Our Team</h1>
          <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "1rem", lineHeight: 1.8, maxWidth: "540px" }}>
            Our faculty and leadership bring decades of experience from academia, government, and the private sector.
          </p>
        </div>
      </section>
      <section>
        <div className="container">
          <div className="team-grid">
            {team.map(m => (
              <div key={m.name} className="team-card">
                <div className="team-avatar">
                  <span className="initials">{m.initials}</span>
                </div>
                <div className="team-info">
                  <div className="team-name">{m.name}</div>
                  <div className="team-role">{m.role}</div>
                  <div className="team-bio">{m.bio}</div>
                </div>
              </div>
            ))}
            {[
              { initials: "SE", name: "Ms. Sarah Ejoku", role: "Finance Director", bio: "CPA with expertise in institutional financial management and audit." },
              { initials: "PO", name: "Dr. Peter Okello", role: "IT & Innovation Lead", bio: "Driving digital transformation of learning delivery and administration." },
              { initials: "GM", name: "Ms. Grace Mwesigye", role: "Student Affairs", bio: "Dedicated to student wellbeing, career guidance, and alumni engagement." },
              { initials: "BK", name: "Mr. Brian Kasule", role: "Admissions Officer", bio: "Guiding prospective students through the application and enrollment process." },
            ].map(m => (
              <div key={m.name} className="team-card">
                <div className="team-avatar" style={{ background: "linear-gradient(135deg, #1e4d8c, #0a1628)" }}>
                  <span className="initials">{m.initials}</span>
                </div>
                <div className="team-info">
                  <div className="team-name">{m.name}</div>
                  <div className="team-role">{m.role}</div>
                  <div className="team-bio">{m.bio}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function SocialPage() {
  return (
    <div className="page">
      <section className="social-section" style={{ paddingTop: "6rem" }}>
        <div className="container">
          <div className="section-label" style={{ color: "var(--gold)" }}>Stay Connected</div>
          <h1 className="section-title" style={{ color: "var(--white)" }}>Follow Pace Management</h1>
          <p style={{ color: "rgba(255,255,255,0.5)", lineHeight: 1.8 }}>
            Join our growing community and stay updated on news, events, and opportunities.
          </p>
          <div className="social-grid">
            {socialPlatforms.map(s => (
              <div key={s.name} className="social-card">
                <div className="social-logo" style={{ background: s.bg }}>
                  <span style={{ fontWeight: 900, color: "#fff", fontFamily: "serif" }}>{s.icon}</span>
                </div>
                <div className="social-name">{s.name}</div>
                <div className="social-handle">{s.handle}</div>
                <div className="social-followers">{s.followers}</div>
                <button className="btn-primary" style={{ marginTop: "1rem", fontSize: "0.8rem", padding: "0.5rem 1.2rem" }}>Follow</button>
              </div>
            ))}
          </div>

          <div style={{ marginTop: "4rem" }}>
            <div className="section-label" style={{ color: "var(--gold)" }}>Recent Posts</div>
            <h2 className="section-title" style={{ color: "var(--white)", marginBottom: "2rem" }}>Latest Updates</h2>
            <div className="social-feed">
              {posts.map((p, i) => (
                <div key={i} className="post-card">
                  <div className="post-header">
                    <div className="post-avatar">{p.initials}</div>
                    <div>
                      <div className="post-author">{p.author}</div>
                      <div className="post-platform">{p.platform}</div>
                    </div>
                  </div>
                  <div className="post-text">{p.text}</div>
                  <div className="post-time">{p.time}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function ApplyPage() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "", dob: "", gender: "",
    program: "", intake: "", mode: "",
    education: "", institution: "", gradYear: "", employer: "", position: "",
    motivation: "", hear: "", terms: false,
  });

  const update = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const steps = ["Personal Info", "Program Choice", "Background", "Submit"];

  const stepContent = [
    // Step 0
    <div key="0">
      <h3 style={{ fontFamily: "Playfair Display, serif", fontSize: "1.3rem", marginBottom: "1.5rem" }}>Personal Information</h3>
      <div className="form-row">
        <div className="form-group"><label>First Name <span className="required">*</span></label><input value={form.firstName} onChange={e => update("firstName", e.target.value)} placeholder="John" /></div>
        <div className="form-group"><label>Last Name <span className="required">*</span></label><input value={form.lastName} onChange={e => update("lastName", e.target.value)} placeholder="Doe" /></div>
      </div>
      <div className="form-row">
        <div className="form-group"><label>Email Address <span className="required">*</span></label><input type="email" value={form.email} onChange={e => update("email", e.target.value)} placeholder="john@example.com" /></div>
        <div className="form-group"><label>Phone Number <span className="required">*</span></label><input type="tel" value={form.phone} onChange={e => update("phone", e.target.value)} placeholder="+256 700 000 000" /></div>
      </div>
      <div className="form-row">
        <div className="form-group"><label>Date of Birth</label><input type="date" value={form.dob} onChange={e => update("dob", e.target.value)} /></div>
        <div className="form-group">
          <label>Gender</label>
          <select value={form.gender} onChange={e => update("gender", e.target.value)}>
            <option value="">Select gender</option>
            <option>Male</option><option>Female</option><option>Prefer not to say</option>
          </select>
        </div>
      </div>
    </div>,

    // Step 1
    <div key="1">
      <h3 style={{ fontFamily: "Playfair Display, serif", fontSize: "1.3rem", marginBottom: "1.5rem" }}>Program Selection</h3>
      <div className="form-group">
        <label>Program of Interest <span className="required">*</span></label>
        <select value={form.program} onChange={e => update("program", e.target.value)}>
          <option value="">Choose a program</option>
          {programs.map(p => <option key={p.title}>{p.title}</option>)}
        </select>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label>Preferred Intake</label>
          <select value={form.intake} onChange={e => update("intake", e.target.value)}>
            <option value="">Select intake</option>
            <option>March 2026</option><option>September 2026</option><option>January 2027</option>
          </select>
        </div>
        <div className="form-group">
          <label>Study Mode</label>
          <select value={form.mode} onChange={e => update("mode", e.target.value)}>
            <option value="">Select mode</option>
            <option>Full-time</option><option>Part-time (evenings)</option><option>Weekend</option><option>Online</option>
          </select>
        </div>
      </div>
      <div className="form-group">
        <label>How did you hear about us?</label>
        <select value={form.hear} onChange={e => update("hear", e.target.value)}>
          <option value="">Select one</option>
          <option>Social Media</option><option>Friend / Colleague</option><option>Website</option><option>Radio / TV</option><option>Alumni</option><option>Other</option>
        </select>
      </div>
    </div>,

    // Step 2
    <div key="2">
      <h3 style={{ fontFamily: "Playfair Display, serif", fontSize: "1.3rem", marginBottom: "1.5rem" }}>Academic & Professional Background</h3>
      <div className="form-row">
        <div className="form-group">
          <label>Highest Education Level <span className="required">*</span></label>
          <select value={form.education} onChange={e => update("education", e.target.value)}>
            <option value="">Select level</option>
            <option>Certificate</option><option>Diploma</option><option>Bachelor's Degree</option><option>Master's Degree</option><option>PhD</option>
          </select>
        </div>
        <div className="form-group"><label>Graduation Year</label><input type="number" value={form.gradYear} onChange={e => update("gradYear", e.target.value)} placeholder="e.g. 2018" min="1990" max="2025" /></div>
      </div>
      <div className="form-group"><label>Institution Attended</label><input value={form.institution} onChange={e => update("institution", e.target.value)} placeholder="University / College name" /></div>
      <div className="form-row">
        <div className="form-group"><label>Current Employer</label><input value={form.employer} onChange={e => update("employer", e.target.value)} placeholder="Company / Organization" /></div>
        <div className="form-group"><label>Current Position</label><input value={form.position} onChange={e => update("position", e.target.value)} placeholder="Your job title" /></div>
      </div>
      <div className="form-group">
        <label>Statement of Motivation <span className="required">*</span></label>
        <textarea value={form.motivation} onChange={e => update("motivation", e.target.value)} placeholder="Why do you want to join Pace Management Institution? What are your career goals? (min. 100 words)" />
      </div>
    </div>,

    // Step 3
    <div key="3">
      <h3 style={{ fontFamily: "Playfair Display, serif", fontSize: "1.3rem", marginBottom: "1.5rem" }}>Review & Submit</h3>
      <div style={{ background: "var(--cream)", borderRadius: "12px", padding: "1.5rem", marginBottom: "1.5rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
          {[
            ["Name", `${form.firstName} ${form.lastName}`],
            ["Email", form.email],
            ["Phone", form.phone],
            ["Program", form.program],
            ["Intake", form.intake],
            ["Mode", form.mode],
          ].map(([k, v]) => (
            <div key={k}>
              <div style={{ fontSize: "0.72rem", color: "var(--gray)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px" }}>{k}</div>
              <div style={{ fontSize: "0.88rem", color: "var(--navy)", marginTop: "2px", fontWeight: 500 }}>{v || "—"}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="form-group">
        <label style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem", cursor: "pointer", fontWeight: 400, fontSize: "0.85rem", color: "var(--gray)" }}>
          <input type="checkbox" checked={form.terms} onChange={e => update("terms", e.target.checked)} style={{ width: "auto", marginTop: "2px" }} />
          I confirm that all information provided is accurate and I agree to the Pace Management Institution Terms and Privacy Policy.
        </label>
      </div>
    </div>,
  ];

  if (submitted) {
    return (
      <div className="page">
        <section className="form-section">
          <div className="container">
            <div className="form-wrap">
              <div className="success-state">
                <div className="success-icon">🎉</div>
                <div className="success-title">Application Submitted!</div>
                <p className="success-text">
                  Thank you for applying to Pace Management Institution. We've received your application and will review it within <strong>5–7 business days</strong>. A confirmation email has been sent to <strong>{form.email}</strong>.<br /><br />
                  Our admissions team will contact you to schedule an interview. If you have any questions, please contact us at <strong>admissions@pacemanagement.ug</strong>.
                </p>
                <button className="btn-primary" style={{ marginTop: "2rem" }} onClick={() => { setSubmitted(false); setStep(0); setForm({ firstName: "", lastName: "", email: "", phone: "", dob: "", gender: "", program: "", intake: "", mode: "", education: "", institution: "", gradYear: "", employer: "", position: "", motivation: "", hear: "", terms: false }); }}>
                  Start New Application
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="page">
      <section style={{ background: "var(--navy)", paddingTop: "5rem" }}>
        <div className="container">
          <div className="section-label" style={{ color: "var(--gold)" }}>Join Us</div>
          <h1 className="section-title" style={{ color: "var(--white)" }}>Apply for Admission</h1>
          <p style={{ color: "rgba(255,255,255,0.5)", lineHeight: 1.8 }}>Start your journey toward management excellence. Applications for March 2026 intake are now open.</p>
        </div>
      </section>
      <section className="form-section">
        <div className="container">
          <div className="form-wrap">
            {/* Steps */}
            <div className="form-steps">
              {steps.map((s, i) => (
                <div key={s} className="form-step">
                  <div className={`step-circle ${i === step ? "active" : i < step ? "done" : ""}`}>
                    {i < step ? "✓" : i + 1}
                  </div>
                  <div className={`step-label ${i === step ? "active" : ""}`}>{s}</div>
                </div>
              ))}
            </div>

            {stepContent[step]}

            <div className="form-nav">
              {step > 0 ? (
                <button className="btn-back" onClick={() => setStep(step - 1)}>← Back</button>
              ) : <div />}
              {step < 3 ? (
                <button className="btn-next" onClick={() => setStep(step + 1)}>Continue →</button>
              ) : (
                <button className="btn-next" onClick={() => setSubmitted(true)} disabled={!form.terms} style={{ opacity: form.terms ? 1 : 0.5, cursor: form.terms ? "pointer" : "not-allowed" }}>
                  Submit Application ✓
                </button>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function ContactPage() {
  const [sent, setSent] = useState(false);
  const [msg, setMsg] = useState({ name: "", email: "", subject: "", message: "" });
  const upd = (k, v) => setMsg(m => ({ ...m, [k]: v }));

  return (
    <div className="page">
      <section style={{ background: "var(--navy)", paddingTop: "5rem" }}>
        <div className="container">
          <div className="section-label" style={{ color: "var(--gold)" }}>Get in Touch</div>
          <h1 className="section-title" style={{ color: "var(--white)" }}>Contact Us</h1>
          <p style={{ color: "rgba(255,255,255,0.5)", lineHeight: 1.8 }}>We'd love to hear from you. Reach out to our team for admissions, general inquiries, or partnerships.</p>
        </div>
      </section>
      <section className="contact-section">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-info">
              <h3>Contact Information</h3>
              {[
                { ic: "📍", label: "Address", val: "Plot 14, Kampala Road, Kampala, Uganda" },
                { ic: "📞", label: "Phone", val: "+256 700 123 456" },
                { ic: "📧", label: "Email", val: "info@pacemanagement.ug" },
                { ic: "🕐", label: "Office Hours", val: "Mon–Fri: 8:00 AM – 6:00 PM" },
              ].map(c => (
                <div key={c.label} className="contact-item">
                  <div className="contact-ic">{c.ic}</div>
                  <div>
                    <div className="contact-label">{c.label}</div>
                    <div className="contact-val">{c.val}</div>
                  </div>
                </div>
              ))}
            </div>
            <div>
              {sent ? (
                <div style={{ textAlign: "center", padding: "3rem 0" }}>
                  <div style={{ fontSize: "3rem" }}>✅</div>
                  <h3 style={{ fontFamily: "Playfair Display, serif", fontSize: "1.5rem", margin: "1rem 0 0.5rem" }}>Message Sent!</h3>
                  <p style={{ color: "var(--gray)" }}>We'll respond to {msg.email} within 24 hours.</p>
                  <button className="btn-primary" style={{ marginTop: "1.5rem" }} onClick={() => { setSent(false); setMsg({ name: "", email: "", subject: "", message: "" }); }}>Send Another</button>
                </div>
              ) : (
                <div>
                  <h3 style={{ fontFamily: "Playfair Display, serif", fontSize: "1.3rem", marginBottom: "1.5rem" }}>Send a Message</h3>
                  <div className="form-row">
                    <div className="form-group"><label>Full Name</label><input value={msg.name} onChange={e => upd("name", e.target.value)} placeholder="Your name" /></div>
                    <div className="form-group"><label>Email</label><input type="email" value={msg.email} onChange={e => upd("email", e.target.value)} placeholder="your@email.com" /></div>
                  </div>
                  <div className="form-group"><label>Subject</label><input value={msg.subject} onChange={e => upd("subject", e.target.value)} placeholder="What is your inquiry about?" /></div>
                  <div className="form-group"><label>Message</label><textarea value={msg.message} onChange={e => upd("message", e.target.value)} placeholder="Tell us how we can help..." style={{ minHeight: "140px" }} /></div>
                  <button className="btn-primary" onClick={() => msg.name && msg.email && setSent(true)}>Send Message →</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── APP ─────────────────────────────────────────────────────────────────────

export default function App() {
  const [activePage, setActivePage] = useState("Home");

  const pages = {
    Home: <HomePage setActivePage={setActivePage} />,
    About: <AboutPage />,
    Programs: <ProgramsPage setActivePage={setActivePage} />,
    Team: <TeamPage />,
    Social: <SocialPage />,
    Apply: <ApplyPage />,
    Contact: <ContactPage />,
  };

  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, [activePage]);

  return (
    <>
      <style>{styles}</style>
      <Navbar activePage={activePage} setActivePage={setActivePage} />
      {pages[activePage] || pages.Home}
      <Footer setActivePage={setActivePage} />
    </>
  );
}