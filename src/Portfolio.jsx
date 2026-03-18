import { useState, useEffect, useRef, useCallback } from "react";

/* ═══════════════════════════════════════════════
   SVG ICONS
   ═══════════════════════════════════════════════ */

const Icons = {
  search: (c = "currentColor", s = 20) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.35-4.35"/></svg>,
  pen: (c = "currentColor", s = 20) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>,
  bolt: (c = "currentColor", s = 20) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  rocket: (c = "currentColor", s = 20) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>,
  globe: (c = "currentColor", s = 20) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
  hexagon: (c = "currentColor", s = 20) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>,
  smartphone: (c = "currentColor", s = 20) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><path d="M12 18h.01"/></svg>,
  cog: (c = "currentColor", s = 20) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>,
  arrowRight: (c = "currentColor", s = 20) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>,
  close: (c = "currentColor", s = 20) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>,
  check: (c = "currentColor", s = 16) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  code: (c = "currentColor", s = 20) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
  layers: (c = "currentColor", s = 20) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>,
  shield: (c = "currentColor", s = 20) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  target: (c = "currentColor", s = 20) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>,
  star: (c = "currentColor", s = 16) => <svg width={s} height={s} viewBox="0 0 24 24" fill={c} stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  location: (c = "currentColor", s = 16) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
  calendar: (c = "currentColor", s = 16) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><path d="M16 2v4"/><path d="M8 2v4"/><path d="M3 10h18"/></svg>,
  user: (c = "currentColor", s = 20) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  home: (c = "currentColor", s = 20) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  grid: (c = "currentColor", s = 20) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>,
  mail: (c = "currentColor", s = 20) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>,
  clipboard: (c = "currentColor", s = 20) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round"><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M12 11h4"/><path d="M12 16h4"/><path d="M8 11h.01"/><path d="M8 16h.01"/></svg>,
  book: (c = "currentColor", s = 20) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>,
  video: (c = "currentColor", s = 20) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>,
  plus: (c = "currentColor", s = 20) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round"><path d="M12 5v14"/><path d="M5 12h14"/></svg>,
  settings: (c = "currentColor", s = 20) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>,
};

/* ═══════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════ */

const PROJECTS = [
  { id: 1, title: "Audit Hygiène", category: "Application Web", year: "2025", color: "#00E893",
    description: "Plateforme d'audits hygiène pour les professionnels — formulaires dynamiques, rapports automatisés et suivi de conformité.",
    longDesc: "Développement d'une application web complète dédiée aux audits d'hygiène. L'outil permet de créer et gérer des grilles d'audit personnalisables, de conduire des inspections sur le terrain avec formulaires dynamiques, et de générer automatiquement des rapports détaillés avec scoring de conformité et plans d'actions correctives.",
    tags: ["React", "Audit", "Reporting", "Conformité"],
    features: ["Grilles d'audit dynamiques", "Scoring automatique", "Rapports PDF", "Plans d'actions correctives", "Historique & traçabilité"],
    stack: ["React", "PDF Generation", "Cloud Storage"] },
  { id: 2, title: "Lab Learning", category: "Plateforme E-Learning", year: "2025", color: "#7B61FF",
    description: "Plateforme e-learning complète — parcours de formation, suivi de progression, quiz interactifs et certifications.",
    longDesc: "Conception et développement d'une plateforme d'apprentissage en ligne permettant de créer des parcours de formation structurés avec modules, vidéos, quiz interactifs et système de certification. Interface intuitive pour les formateurs et les apprenants, avec un dashboard de suivi de progression détaillé.",
    tags: ["React", "E-Learning", "LMS", "Education"],
    features: ["Parcours de formation", "Quiz interactifs", "Suivi de progression", "Système de certification", "Dashboard formateur"],
    stack: ["React", "Video Streaming", "Analytics"] },
  { id: 3, title: "Quitteo", category: "Web App SaaS", year: "2026", color: "#FF6B35",
    description: "Solution SaaS de gestion de quittances — génération automatique, suivi des paiements et relances intelligentes.",
    longDesc: "Outil SaaS permettant aux professionnels de l'immobilier et aux propriétaires de générer automatiquement des quittances de loyer, de suivre les paiements en temps réel, d'envoyer des relances automatiques et de gérer l'ensemble de leur parc locatif depuis une interface centralisée.",
    tags: ["React", "SaaS", "Immobilier", "Automation"],
    features: ["Génération de quittances", "Suivi des paiements", "Relances automatiques", "Multi-propriétés", "Export comptable"],
    stack: ["React", "PDF Generation", "Email API"] },
  { id: 4, title: "Service en +", category: "Plateforme de Services", year: "2026", color: "#FFD23F",
    description: "Marketplace de services à la personne — mise en relation, réservation en ligne et gestion des prestataires.",
    longDesc: "Développement d'une plateforme de mise en relation entre particuliers et prestataires de services. L'application intègre un système de recherche avancé, un module de réservation en temps réel, la gestion des profils prestataires avec avis vérifiés, et un tableau de bord pour le suivi des interventions.",
    tags: ["React", "Marketplace", "Booking", "Platform"],
    features: ["Matching intelligent", "Réservation en ligne", "Avis vérifiés", "Chat intégré", "Dashboard prestataire"],
    stack: ["React", "Real-time", "Geolocation"] },
];

const SERVICES_DATA = [
  { id: "web", icon: "globe", title: "Sites Web", shortDesc: "Sites vitrine et landing pages sur-mesure qui convertissent.",
    fullDesc: "Je conçois des sites web qui ne sont pas juste beaux — ils sont pensés pour convertir. Chaque page est optimisée pour guider vos visiteurs vers l'action que vous souhaitez.",
    deliverables: ["Site vitrine responsive", "Landing pages optimisées", "SEO technique", "Animations & micro-interactions", "Intégration CMS si besoin", "Performance optimale"] },
  { id: "app", icon: "hexagon", title: "Applications Web", shortDesc: "CRM, dashboards, outils métier — des apps complètes.",
    fullDesc: "Des applications web robustes qui résolvent de vrais problèmes métier. Je développe des interfaces complexes avec une UX simple et intuitive, pensées pour vos utilisateurs au quotidien.",
    deliverables: ["Architecture frontend scalable", "Dashboards interactifs", "Gestion de données temps réel", "Intégration API tierces", "Système d'authentification", "Reporting & analytics"] },
  { id: "pwa", icon: "smartphone", title: "Web Apps & PWA", shortDesc: "Applications progressives, mobile-first et installables.",
    fullDesc: "Des applications qui fonctionnent comme du natif, directement depuis le navigateur. Installables, rapides, et capables de fonctionner hors ligne — le meilleur des deux mondes.",
    deliverables: ["Progressive Web App", "Fonctionnement offline", "Notifications push", "Installation sur device", "Synchronisation cloud", "Performance mobile"] },
  { id: "tools", icon: "cog", title: "Outils Entreprise", shortDesc: "Automatisation, reporting — des outils qui font gagner du temps.",
    fullDesc: "Des outils sur-mesure qui automatisent vos processus et vous font gagner des heures chaque semaine. Email automation, reporting, pipelines de données — tout ce qui peut être automatisé devrait l'être.",
    deliverables: ["Automatisation de processus", "Reporting automatisé", "Intégrations email/API", "Tableaux de bord sur-mesure", "Export de données", "Workflows personnalisés"] },
];

const PROCESS_STEPS = [
  { num: "01", title: "Découverte", icon: "search", desc: "Analyse approfondie de vos besoins, objectifs et contraintes pour définir ensemble la vision du projet.", color: "#FF6B35" },
  { num: "02", title: "Conception", icon: "pen", desc: "Wireframes, maquettes et prototypes interactifs pour valider chaque détail avant d'écrire une ligne de code.", color: "#7B61FF" },
  { num: "03", title: "Développement", icon: "bolt", desc: "Code propre, performant et maintenable. Itérations rapides avec vos retours à chaque étape.", color: "#00E893" },
  { num: "04", title: "Livraison", icon: "rocket", desc: "Tests rigoureux, optimisation performance, déploiement et accompagnement post-lancement.", color: "#FFD23F" },
];

const TESTIMONIALS = [
  { name: "Sarah M.", role: "Directrice Qualité", text: "L'outil d'audit hygiène a transformé notre façon de travailler. Les rapports automatisés nous font gagner un temps précieux et la traçabilité est impeccable.", avatar: "S" },
  { name: "Youssef K.", role: "Fondateur, Lab Learning", text: "La plateforme e-learning est exactement ce qu'il nous fallait. L'interface est intuitive et nos apprenants progressent beaucoup plus vite.", avatar: "Y" },
  { name: "Amina B.", role: "Gérante immobilier", text: "Quitteo a simplifié toute ma gestion locative. Plus de retards, plus d'oublis — tout est automatisé et mes locataires sont ravis.", avatar: "A" },
];

const SKILLS = [
  { name: "React", level: 95 }, { name: "JavaScript", level: 92 }, { name: "TypeScript", level: 85 },
  { name: "Node.js", level: 80 }, { name: "CSS / Tailwind", level: 90 }, { name: "API Design", level: 88 },
  { name: "UI/UX Design", level: 88 }, { name: "Figma", level: 85 },
];

const MARQUEE_ITEMS = ["React", "JavaScript", "TypeScript", "Node.js", "PWA", "UI/UX Design", "Figma", "API REST", "CSS", "Tailwind", "Git", "Performance", "Mobile First", "Responsive", "Automation"];

const STATS = [
  { icon: "target", num: "10+", label: "Projets livrés" },
  { icon: "star", num: "100%", label: "Satisfaction" },
  { icon: "calendar", num: "2025", label: "Actif depuis" },
  { icon: "bolt", num: "<48h", label: "Temps de réponse" },
];

const NAV_LINKS = [
  { id: "hero", l: "Accueil", icon: "home", color: "#FF6B35" },
  { id: "projects", l: "Projets", icon: "grid", color: "#7B61FF" },
  { id: "about", l: "À propos", icon: "user", color: "#00E893" },
  { id: "services", l: "Services", icon: "layers", color: "#FFD23F" },
  { id: "process", l: "Process", icon: "settings", color: "#FF6B35" },
  { id: "contact", l: "Contact", icon: "mail", color: "#00E893" },
];

/* ═══════════════════════════════════════════════
   HOOKS
   ═══════════════════════════════════════════════ */

function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => { const el = ref.current; if (!el) return; const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); obs.unobserve(el); } }, { threshold }); obs.observe(el); return () => obs.disconnect(); }, [threshold]);
  return [ref, v];
}

function useMousePos() {
  const [p, setP] = useState({ x: 0, y: 0 });
  useEffect(() => { const h = e => setP({ x: e.clientX, y: e.clientY }); window.addEventListener("mousemove", h); return () => window.removeEventListener("mousemove", h); }, []);
  return p;
}

function useScrollY() {
  const [y, setY] = useState(0);
  useEffect(() => { const h = () => setY(window.scrollY); window.addEventListener("scroll", h, { passive: true }); return () => window.removeEventListener("scroll", h); }, []);
  return y;
}

/* ═══════════════════════════════════════════════
   LOADER
   ═══════════════════════════════════════════════ */

function Loader({ onComplete }) {
  const [phase, setPhase] = useState(0);
  const [count, setCount] = useState(0);
  useEffect(() => { setTimeout(() => setPhase(1), 500); setTimeout(() => setPhase(2), 1100); }, []);
  useEffect(() => {
    if (phase !== 2) return;
    const iv = setInterval(() => { setCount(p => { if (p >= 100) { clearInterval(iv); setTimeout(() => setPhase(3), 300); setTimeout(onComplete, 1000); return 100; } return p + 2; }); }, 22);
    return () => clearInterval(iv);
  }, [phase, onComplete]);

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 10000, background: "#08080C", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", opacity: phase === 3 ? 0 : 1, transition: "opacity 0.7s cubic-bezier(0.65,0,0.35,1)", pointerEvents: phase === 3 ? "none" : "all" }}>
      <svg width="76" height="76" viewBox="0 0 80 80" style={{ marginBottom: 28 }}>
        <circle cx="40" cy="40" r="36" fill="none" stroke="url(#lg)" strokeWidth="2" strokeDasharray="226" strokeDashoffset={phase >= 0 ? 0 : 226} style={{ transition: "stroke-dashoffset 0.7s cubic-bezier(0.65,0,0.35,1)" }} />
        <defs><linearGradient id="lg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#FF6B35"/><stop offset="100%" stopColor="#FFD23F"/></linearGradient></defs>
        <text x="40" y="47" textAnchor="middle" fill="#fff" style={{ fontFamily: "'Syne',sans-serif", fontSize: 28, fontWeight: 800, opacity: phase >= 1 ? 1 : 0, transition: "opacity 0.4s" }}>B</text>
      </svg>
      <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 16, fontWeight: 700, color: "#fff", letterSpacing: "0.2em", textTransform: "uppercase", opacity: phase >= 1 ? 1 : 0, transform: phase >= 1 ? "translateY(0)" : "translateY(16px)", transition: "all 0.5s cubic-bezier(0.16,1,0.3,1)", marginBottom: 36 }}>BRAHIM OUCHRIF</div>
      <div style={{ width: 180, height: 1, background: "rgba(255,255,255,0.06)", borderRadius: 1, overflow: "hidden" }}>
        <div style={{ height: "100%", background: "linear-gradient(90deg,#FF6B35,#FFD23F)", width: `${count}%`, transition: "width 0.04s linear" }} />
      </div>
      <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, color: "rgba(255,255,255,0.2)", marginTop: 10 }}>{count}%</div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   PARTICLES + GRAIN + CURSOR
   ═══════════════════════════════════════════════ */

function Particles() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  useEffect(() => { const h = e => { mouseRef.current = { x: e.clientX, y: e.clientY }; }; window.addEventListener("mousemove", h); return () => window.removeEventListener("mousemove", h); }, []);
  useEffect(() => {
    const c = canvasRef.current; if (!c) return; const ctx = c.getContext("2d"); let id;
    const resize = () => { c.width = window.innerWidth; c.height = window.innerHeight; }; resize(); window.addEventListener("resize", resize);
    const pts = Array.from({ length: 55 }, () => ({ x: Math.random() * c.width, y: Math.random() * c.height, vx: (Math.random() - 0.5) * 0.25, vy: (Math.random() - 0.5) * 0.25, r: Math.random() * 1.4 + 0.4, o: Math.random() * 0.25 + 0.04 }));
    const draw = () => {
      ctx.clearRect(0, 0, c.width, c.height); const { x: mx, y: my } = mouseRef.current;
      pts.forEach((p, i) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = c.width; if (p.x > c.width) p.x = 0; if (p.y < 0) p.y = c.height; if (p.y > c.height) p.y = 0;
        const dx = p.x - mx, dy = p.y - my, d = Math.sqrt(dx * dx + dy * dy);
        if (d < 140) { p.x += (dx / d) * 1.2; p.y += (dy / d) * 1.2; }
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fillStyle = `rgba(255,107,53,${p.o})`; ctx.fill();
        for (let j = i + 1; j < pts.length; j++) { const dx2 = pts[j].x - p.x, dy2 = pts[j].y - p.y, d2 = Math.sqrt(dx2 * dx2 + dy2 * dy2); if (d2 < 110) { ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(pts[j].x, pts[j].y); ctx.strokeStyle = `rgba(255,107,53,${0.035 * (1 - d2 / 110)})`; ctx.lineWidth = 0.5; ctx.stroke(); } }
      });
      id = requestAnimationFrame(draw);
    }; draw();
    return () => { cancelAnimationFrame(id); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={canvasRef} style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }} />;
}

function Grain() { return <div style={{ position: "fixed", inset: 0, zIndex: 1, pointerEvents: "none", opacity: 0.03, backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundSize: "256px", animation: "grainShift 0.5s steps(4) infinite" }} />; }

function Cursor() {
  const mouse = useMousePos();
  const [hov, setHov] = useState(false);
  useEffect(() => { const check = () => { const el = document.elementFromPoint(mouse.x, mouse.y); setHov(el?.closest("[data-hover]") !== null); }; const id = setInterval(check, 60); return () => clearInterval(id); }, [mouse.x, mouse.y]);
  return (<>
    <div style={{ position: "fixed", left: mouse.x, top: mouse.y, width: 360, height: 360, borderRadius: "50%", background: "radial-gradient(circle,rgba(255,107,53,0.04) 0%,transparent 70%)", transform: "translate(-50%,-50%)", pointerEvents: "none", zIndex: 2 }} />
    <div style={{ position: "fixed", left: mouse.x, top: mouse.y, width: hov ? 60 : 16, height: hov ? 60 : 16, borderRadius: "50%", border: "1.5px solid rgba(255,255,255,0.4)", transform: "translate(-50%,-50%)", transition: "width 0.35s cubic-bezier(0.16,1,0.3,1),height 0.35s cubic-bezier(0.16,1,0.3,1)", pointerEvents: "none", zIndex: 9999, mixBlendMode: "difference" }} />
    <div style={{ position: "fixed", left: mouse.x, top: mouse.y, width: 4, height: 4, borderRadius: "50%", background: "#fff", transform: "translate(-50%,-50%)", pointerEvents: "none", zIndex: 9999, opacity: hov ? 0 : 1, transition: "opacity 0.2s" }} />
  </>);
}

/* ═══════════════════════════════════════════════
   MAG WRAP + SECTION HEADING
   ═══════════════════════════════════════════════ */

function Mag({ children, s = 0.25, style = {} }) {
  const ref = useRef(null); const [off, setOff] = useState({ x: 0, y: 0 });
  return (<div ref={ref} data-magnetic onMouseMove={e => { const r = ref.current?.getBoundingClientRect(); if (!r) return; setOff({ x: (e.clientX - r.left - r.width / 2) * s, y: (e.clientY - r.top - r.height / 2) * s }); }} onMouseLeave={() => setOff({ x: 0, y: 0 })} style={{ display: "inline-block", transform: `translate(${off.x}px,${off.y}px)`, transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1)", ...style }}>{children}</div>);
}

function SH({ tag, title, vis }) {
  return (<div style={{ marginBottom: 56 }}>
    <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 12, color: "#FF6B35", letterSpacing: "0.15em", textTransform: "uppercase", opacity: vis ? 1 : 0, transition: "opacity 0.6s" }}>// {tag}</span>
    <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(34px,5.5vw,60px)", fontWeight: 800, color: "#fff", letterSpacing: "-0.04em", marginTop: 14, opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(36px)", transition: "all 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s" }}>{title}<span style={{ color: "#FF6B35" }}>.</span></h2>
  </div>);
}

/* ═══════════════════════════════════════════════
   MARQUEE
   ═══════════════════════════════════════════════ */

function Marquee() {
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  return (<div style={{ overflow: "hidden", padding: "36px 0", borderTop: "1px solid rgba(255,255,255,0.04)", borderBottom: "1px solid rgba(255,255,255,0.04)", position: "relative", zIndex: 2 }}>
    <div style={{ display: "flex", gap: 56, whiteSpace: "nowrap", animation: "marquee 28s linear infinite", width: "max-content" }}>
      {items.map((t, i) => (<span key={i} style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(18px,2.8vw,32px)", fontWeight: 700, color: i % 3 === 0 ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.05)", letterSpacing: "-0.02em", display: "flex", alignItems: "center", gap: 56 }}>{t}<span style={{ color: "#FF6B35", fontSize: 8, opacity: 0.35 }}>&#9670;</span></span>))}
    </div>
  </div>);
}

/* ═══════════════════════════════════════════════
   NAVBAR — IMMERSIVE MOBILE MENU
   ═══════════════════════════════════════════════ */

function Navbar({ active }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => { const h = () => setScrolled(window.scrollY > 50); window.addEventListener("scroll", h); return () => window.removeEventListener("scroll", h); }, []);
  useEffect(() => { document.body.style.overflow = open ? "hidden" : ""; return () => { document.body.style.overflow = ""; }; }, [open]);

  const go = id => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setOpen(false); };

  return (
    <>
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000, padding: scrolled ? "12px 40px" : "22px 40px", background: scrolled ? "rgba(8,8,12,0.88)" : "transparent", backdropFilter: scrolled ? "blur(24px) saturate(1.5)" : "none", borderBottom: scrolled ? "1px solid rgba(255,255,255,0.05)" : "none", transition: "all 0.5s cubic-bezier(0.16,1,0.3,1)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <Mag s={0.12}><div data-hover style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 10 }} onClick={() => go("hero")}>
        <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg,#FF6B35,#FFD23F)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 14, color: "#08080C" }}>B</div>
        <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 14.5, color: "#fff", letterSpacing: "-0.02em" }}>BRAHIM<span style={{ opacity: 0.3 }}> / OUCHRIF</span></span>
      </div></Mag>

      {/* Desktop nav */}
      <div className="nd" style={{ display: "flex", gap: 6, alignItems: "center" }}>
        {NAV_LINKS.map(l => {
          const [h, setH] = useState(false);
          const isAct = active === l.id;
          const iconFn = Icons[l.icon];
          return (
            <Mag key={l.id} s={0.15}>
              <div data-hover onClick={() => go(l.id)}
                onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
                style={{
                  cursor: "pointer", position: "relative",
                  padding: "8px 14px", borderRadius: 10,
                  background: isAct ? "rgba(255,107,53,0.08)" : h ? "rgba(255,255,255,0.04)" : "transparent",
                  border: `1px solid ${isAct ? "rgba(255,107,53,0.12)" : h ? "rgba(255,255,255,0.06)" : "transparent"}`,
                  transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
                  display: "flex", alignItems: "center", gap: 7,
                }}>
                {/* Icon — appears on hover or active */}
                <div style={{
                  width: h || isAct ? 16 : 0,
                  opacity: h || isAct ? 1 : 0,
                  overflow: "hidden",
                  transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0,
                }}>
                  {iconFn && iconFn(isAct ? "#FF6B35" : l.color, 13)}
                </div>
                {/* Label */}
                <span style={{
                  fontFamily: "'DM Sans',sans-serif", fontSize: 12, fontWeight: isAct ? 600 : 500,
                  color: isAct ? "#fff" : h ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.35)",
                  letterSpacing: "0.06em", textTransform: "uppercase",
                  transition: "all 0.3s",
                  whiteSpace: "nowrap",
                }}>{l.l}</span>
                {/* Active dot */}
                {isAct && <div style={{ width: 4, height: 4, borderRadius: "50%", background: "#FF6B35", flexShrink: 0, marginLeft: 2 }} />}
                {/* Bottom glow line on hover */}
                <div style={{
                  position: "absolute", bottom: 0, left: "50%",
                  transform: "translateX(-50%)",
                  width: h && !isAct ? "60%" : "0%",
                  height: 1,
                  background: `linear-gradient(90deg, transparent, ${l.color}60, transparent)`,
                  transition: "width 0.4s cubic-bezier(0.16,1,0.3,1)",
                  borderRadius: 1,
                }} />
              </div>
            </Mag>
          );
        })}
      </div>

      {/* Burger — custom animated */}
      <div className="nm" data-hover onClick={() => setOpen(!open)} style={{ cursor: "pointer", display: "none", width: 40, height: 40, borderRadius: 12, background: open ? "rgba(255,107,53,0.12)" : "rgba(255,255,255,0.04)", border: `1px solid ${open ? "rgba(255,107,53,0.2)" : "rgba(255,255,255,0.06)"}`, alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 4, zIndex: 1002, position: "relative", transition: "all 0.3s" }}>
        <div style={{ width: 16, height: 1.5, background: open ? "#FF6B35" : "#fff", transition: "all 0.35s cubic-bezier(0.16,1,0.3,1)", transform: open ? "rotate(45deg) translate(2px, 2px)" : "none", borderRadius: 1 }} />
        <div style={{ width: 16, height: 1.5, background: open ? "#FF6B35" : "#fff", transition: "all 0.35s cubic-bezier(0.16,1,0.3,1)", opacity: open ? 0 : 1, transform: open ? "scaleX(0)" : "scaleX(1)", borderRadius: 1 }} />
        <div style={{ width: 16, height: 1.5, background: open ? "#FF6B35" : "#fff", transition: "all 0.35s cubic-bezier(0.16,1,0.3,1)", transform: open ? "rotate(-45deg) translate(2px, -2px)" : "none", borderRadius: 1 }} />
      </div>

    </nav>

      {/* ════ IMMERSIVE MOBILE MENU — Outside nav to avoid backdrop-filter stacking context ════ */}
      <div style={{
        position: "fixed", inset: 0,
        background: "rgba(8,8,12,0.98)",
        backdropFilter: "blur(40px)",
        zIndex: 1001,
        opacity: open ? 1 : 0,
        pointerEvents: open ? "all" : "none",
        transition: "opacity 0.4s cubic-bezier(0.16,1,0.3,1)",
        display: "flex", flexDirection: "column",
        overflow: "hidden",
      }}>
        {/* Background decorative gradient */}
        <div style={{
          position: "absolute", top: "-20%", right: "-20%", width: "70vw", height: "70vw",
          borderRadius: "50%", background: "radial-gradient(circle, rgba(255,107,53,0.06) 0%, transparent 60%)",
          filter: "blur(40px)", pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", bottom: "-10%", left: "-15%", width: "50vw", height: "50vw",
          borderRadius: "50%", background: "radial-gradient(circle, rgba(123,97,255,0.04) 0%, transparent 60%)",
          filter: "blur(40px)", pointerEvents: "none",
        }} />

        {/* Menu content */}
        <div style={{
          flex: 1, display: "flex", flexDirection: "column", justifyContent: "center",
          padding: "100px 32px 40px",
        }}>
          {/* Menu items */}
          <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 40 }}>
            {NAV_LINKS.map((l, i) => {
              const iconFn = Icons[l.icon];
              const isActive = active === l.id;
              const [mh, setMh] = useState(false);
              const lit = isActive || mh;
              return (
                <div key={l.id} data-hover onClick={() => go(l.id)}
                  onMouseEnter={() => setMh(true)} onMouseLeave={() => setMh(false)}
                  onTouchStart={() => setMh(true)} onTouchEnd={() => setTimeout(() => setMh(false), 300)}
                  style={{
                    display: "flex", alignItems: "center", gap: 16,
                    padding: "16px 20px", borderRadius: 16, cursor: "pointer",
                    position: "relative", overflow: "hidden",
                    background: isActive ? "rgba(255,107,53,0.08)" : mh ? "rgba(255,255,255,0.035)" : "transparent",
                    border: `1px solid ${isActive ? "rgba(255,107,53,0.12)" : mh ? "rgba(255,255,255,0.06)" : "transparent"}`,
                    opacity: open ? 1 : 0,
                    transform: open ? "translateX(0)" : "translateX(-30px)",
                    transition: `all 0.5s cubic-bezier(0.16,1,0.3,1) ${open ? 0.1 + i * 0.06 : 0}s`,
                  }}>
                  {/* Left color bar — slides in on hover */}
                  <div style={{
                    position: "absolute", left: 0, top: "20%",
                    width: 3, height: lit ? "60%" : "0%",
                    borderRadius: "0 2px 2px 0",
                    background: l.color,
                    transition: "height 0.4s cubic-bezier(0.16,1,0.3,1)",
                    opacity: lit ? 0.8 : 0,
                  }} />
                  {/* Icon container */}
                  <div style={{
                    width: 44, height: 44, borderRadius: 12,
                    background: lit ? `${l.color}15` : "rgba(255,255,255,0.03)",
                    border: `1px solid ${lit ? `${l.color}25` : "rgba(255,255,255,0.04)"}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
                    transform: mh ? "scale(1.08) rotate(4deg)" : "scale(1)",
                    boxShadow: lit ? `0 0 20px ${l.color}15` : "none",
                  }}>
                    {iconFn && iconFn(lit ? l.color : "rgba(255,255,255,0.3)", 20)}
                  </div>
                  {/* Label + subtitle */}
                  <div style={{ flex: 1 }}>
                    <span style={{
                      fontFamily: "'Syne',sans-serif", fontSize: 20, fontWeight: 700,
                      color: isActive ? "#fff" : mh ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.55)",
                      letterSpacing: "-0.02em",
                      transition: "color 0.3s",
                    }}>{l.l}</span>
                    {/* Micro description that fades in on hover */}
                    <div style={{
                      fontFamily: "'DM Sans',sans-serif", fontSize: 11,
                      color: `${l.color}90`,
                      maxHeight: lit ? 18 : 0,
                      opacity: lit ? 1 : 0,
                      transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
                      overflow: "hidden",
                      marginTop: lit ? 3 : 0,
                    }}>
                      {l.id === "hero" && "Retour en haut"}
                      {l.id === "projects" && "Mes réalisations"}
                      {l.id === "about" && "Mon parcours"}
                      {l.id === "services" && "Ce que je propose"}
                      {l.id === "process" && "Ma méthode"}
                      {l.id === "contact" && "Démarrer un projet"}
                    </div>
                  </div>
                  {/* Arrow that slides in on hover */}
                  <div style={{
                    opacity: lit ? 1 : 0,
                    transform: lit ? "translateX(0)" : "translateX(-8px)",
                    transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
                    display: "flex", alignItems: "center",
                  }}>
                    {isActive
                      ? <div style={{ width: 6, height: 6, borderRadius: "50%", background: l.color, boxShadow: `0 0 10px ${l.color}40` }} />
                      : Icons.arrowRight(l.color, 16)
                    }
                  </div>
                  {/* Bottom glow line */}
                  <div style={{
                    position: "absolute", bottom: 0, left: "10%",
                    width: mh && !isActive ? "80%" : "0%",
                    height: 1,
                    background: `linear-gradient(90deg, transparent, ${l.color}40, transparent)`,
                    transition: "width 0.5s cubic-bezier(0.16,1,0.3,1)",
                  }} />
                </div>
              );
            })}
          </div>

          {/* Bottom section: status + socials */}
          <div style={{
            opacity: open ? 1 : 0,
            transform: open ? "translateY(0)" : "translateY(20px)",
            transition: `all 0.5s cubic-bezier(0.16,1,0.3,1) ${open ? 0.5 : 0}s`,
          }}>
            {/* Divider */}
            <div style={{ width: "100%", height: 1, background: "rgba(255,255,255,0.04)", marginBottom: 24 }} />

            {/* Status */}
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#00E893", animation: "pulse 2s infinite" }} />
              <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: "rgba(255,255,255,0.35)" }}>Disponible pour nouveaux projets</span>
            </div>

            {/* Social row */}
            <div style={{ display: "flex", gap: 10 }}>
              {["LinkedIn", "GitHub", "Twitter"].map((s, i) => (
                <div key={s} style={{
                  padding: "10px 18px", borderRadius: 10,
                  background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)",
                  fontFamily: "'DM Sans',sans-serif", fontSize: 12, fontWeight: 500,
                  color: "rgba(255,255,255,0.4)", cursor: "pointer",
                }}>{s}</div>
              ))}
            </div>

            {/* Email */}
            <div style={{
              marginTop: 16, padding: "14px 20px", borderRadius: 14,
              background: "linear-gradient(135deg, rgba(255,107,53,0.08), rgba(255,210,63,0.04))",
              border: "1px solid rgba(255,107,53,0.12)",
              display: "flex", alignItems: "center", gap: 12,
            }}>
              <div style={{ opacity: 0.6 }}>{Icons.mail("#FF6B35", 18)}</div>
              <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 13, color: "rgba(255,255,255,0.5)" }}>brahimouchrif@gmail.com</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

/* ═══════════════════════════════════════════════
   HERO
   ═══════════════════════════════════════════════ */

function Hero({ vis }) {
  const sy = useScrollY();
  const [time, setTime] = useState(new Date());
  useEffect(() => { const t = setInterval(() => setTime(new Date()), 1000); return () => clearInterval(t); }, []);

  return (
    <section id="hero" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "120px 40px 80px", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, opacity: 0.02, backgroundImage: "linear-gradient(rgba(255,255,255,.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.5) 1px,transparent 1px)", backgroundSize: "80px 80px", transform: `translateY(${sy * 0.12}px)` }} />
      <div style={{ position: "absolute", top: "5%", right: "-8%", width: "60vw", height: "60vw", maxWidth: 700, maxHeight: 700, borderRadius: "50%", background: "radial-gradient(circle,rgba(255,107,53,0.13) 0%,rgba(255,210,63,0.05) 40%,transparent 70%)", filter: "blur(60px)", animation: "float 14s ease-in-out infinite", transform: `translateY(${sy * -0.18}px)` }} />
      <div style={{ position: "relative", zIndex: 3, maxWidth: 1200, width: "100%", margin: "0 auto" }}>
        <div style={{ display: "flex", gap: 24, alignItems: "center", marginBottom: 52, flexWrap: "wrap", opacity: vis ? 1 : 0, transition: "opacity 0.8s 0.2s" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#00E893", animation: "pulse 2s infinite" }} />
            <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Disponible pour nouveaux projets</span>
          </div>
          <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 12, color: "rgba(255,255,255,0.2)" }}>{time.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit", second: "2-digit" })} — FRANCE</span>
        </div>
        <div style={{ transform: `translateY(${sy * 0.06}px)` }}>
          {[
            { text: "Je crée des", font: "'DM Sans',sans-serif", size: "clamp(14px,2vw,19px)", color: "rgba(255,255,255,0.38)", weight: 400, delay: 0.15, special: null },
            { text: "expériences", font: "'Syne',sans-serif", size: "clamp(46px,9vw,118px)", color: "#fff", weight: 800, delay: 0.25, special: null },
            { text: "digitales", font: "'Syne',sans-serif", size: "clamp(46px,9vw,118px)", color: null, weight: 800, delay: 0.35, special: "gradient" },
            { text: "sur mesure.", font: "'Syne',sans-serif", size: "clamp(46px,9vw,118px)", color: null, weight: 800, delay: 0.45, special: "outline" },
          ].map((l, i) => (
            <div key={i} style={{ overflow: "hidden", marginBottom: i === 0 ? 6 : 0 }}>
              <Mag s={0.04} style={{ display: "block" }}>
                <div style={{ fontFamily: l.font, fontSize: l.size, fontWeight: l.weight, letterSpacing: l.font.includes("Syne") ? "-0.04em" : "0", lineHeight: l.font.includes("Syne") ? 0.94 : 1.4, color: l.color || "#fff", ...(l.special === "gradient" ? { background: "linear-gradient(135deg,#FF6B35 0%,#FFD23F 50%,#FF6B35 100%)", backgroundSize: "200% auto", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", animation: "shimmer 4s linear infinite" } : {}), ...(l.special === "outline" ? { WebkitTextStroke: "1.5px rgba(255,255,255,0.18)", WebkitTextFillColor: "transparent" } : {}), transform: vis ? "translateY(0)" : "translateY(105%)", opacity: vis ? 1 : 0, transition: `all 0.9s cubic-bezier(0.16,1,0.3,1) ${l.delay}s` }}>{l.text}</div>
              </Mag>
            </div>
          ))}
        </div>
        <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "clamp(14px,1.7vw,18px)", color: "rgba(255,255,255,0.35)", maxWidth: 480, marginTop: 40, lineHeight: 1.65, opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(28px)", transition: "all 1s cubic-bezier(0.16,1,0.3,1) 0.6s" }}>
          Développeur web freelance basé en France — je conçois des sites, applications et outils qui transforment vos idées en produits digitaux performants.
        </p>
        <div style={{ display: "flex", gap: 16, marginTop: 40, flexWrap: "wrap", opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(28px)", transition: "all 1s cubic-bezier(0.16,1,0.3,1) 0.8s" }}>
          <Mag s={0.1}><button data-hover onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })} style={{ padding: "16px 36px", border: "none", borderRadius: 60, cursor: "pointer", background: "linear-gradient(135deg,#FF6B35,#FF8B5E)", fontFamily: "'DM Sans',sans-serif", fontSize: 14, fontWeight: 600, color: "#fff", boxShadow: "0 4px 28px rgba(255,107,53,0.3)", transition: "all 0.4s" }} onMouseEnter={e => e.target.style.boxShadow = "0 8px 40px rgba(255,107,53,0.5)"} onMouseLeave={e => e.target.style.boxShadow = "0 4px 28px rgba(255,107,53,0.3)"}>Démarrer un projet</button></Mag>
          <Mag s={0.1}><button data-hover onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })} style={{ padding: "16px 36px", background: "transparent", borderRadius: 60, cursor: "pointer", border: "1px solid rgba(255,255,255,0.1)", fontFamily: "'DM Sans',sans-serif", fontSize: 14, fontWeight: 500, color: "rgba(255,255,255,0.6)", transition: "all 0.4s" }} onMouseEnter={e => { e.target.style.borderColor = "rgba(255,255,255,0.3)"; e.target.style.color = "#fff"; }} onMouseLeave={e => { e.target.style.borderColor = "rgba(255,255,255,0.1)"; e.target.style.color = "rgba(255,255,255,0.6)"; }}>Voir les projets ↓</button></Mag>
        </div>
      </div>
      <div style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", opacity: vis ? 0.25 : 0, transition: "opacity 1s 1.2s" }}>
        <div style={{ width: 1, height: 40, background: "linear-gradient(to bottom,rgba(255,255,255,0.5),transparent)", animation: "scrollDown 2s ease-in-out infinite" }} />
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   MODAL
   ═══════════════════════════════════════════════ */

function Modal({ open, onClose, children }) {
  const [entering, setEntering] = useState(false);
  useEffect(() => { if (open) requestAnimationFrame(() => requestAnimationFrame(() => setEntering(true))); else setEntering(false); }, [open]);
  const handleClose = () => { setEntering(false); setTimeout(onClose, 350); };
  if (!open) return null;
  return (
    <div onClick={handleClose} style={{ position: "fixed", inset: 0, zIndex: 5000, background: entering ? "rgba(8,8,12,0.92)" : "rgba(8,8,12,0)", backdropFilter: entering ? "blur(20px)" : "blur(0px)", transition: "all 0.35s cubic-bezier(0.16,1,0.3,1)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20, cursor: "pointer", overflow: "auto" }}>
      <div onClick={e => e.stopPropagation()} style={{ background: "rgba(18,18,26,0.96)", borderRadius: 24, border: "1px solid rgba(255,255,255,0.06)", maxWidth: 680, width: "100%", padding: "clamp(26px,5vw,44px)", transform: entering ? "translateY(0) scale(1)" : "translateY(50px) scale(0.96)", opacity: entering ? 1 : 0, transition: "all 0.45s cubic-bezier(0.16,1,0.3,1)", cursor: "default", position: "relative", maxHeight: "90vh", overflowY: "auto" }}>
        <div data-hover onClick={handleClose} style={{ position: "absolute", top: 18, right: 18, width: 38, height: 38, borderRadius: "50%", background: "rgba(255,255,255,0.04)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "all 0.3s" }} onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.08)"} onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.04)"}>
          {Icons.close("rgba(255,255,255,0.5)", 18)}
        </div>
        {children}
      </div>
    </div>
  );
}

function ProjectModalContent({ p }) {
  return (<>
    <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 22 }}>
      <span style={{ padding: "5px 13px", borderRadius: 30, border: `1px solid ${p.color}28`, fontFamily: "'DM Sans',sans-serif", fontSize: 11, color: p.color, letterSpacing: "0.06em", textTransform: "uppercase", fontWeight: 500 }}>{p.category}</span>
      <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, color: "rgba(255,255,255,0.25)" }}>{p.year}</span>
    </div>
    <h3 style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(28px,5vw,40px)", fontWeight: 800, color: "#fff", letterSpacing: "-0.03em", marginBottom: 18 }}>{p.title}</h3>
    <div style={{ width: "100%", height: 200, borderRadius: 16, marginBottom: 24, background: `linear-gradient(135deg,${p.color}10,${p.color}05)`, border: `1px solid ${p.color}12`, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
      <div style={{ width: "85%", height: "75%", borderRadius: 10, background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 44, fontWeight: 800, color: p.color, opacity: 0.15 }}>{p.title.charAt(0)}</div>
      </div>
      <div style={{ position: "absolute", top: 12, left: 14, display: "flex", gap: 5 }}>{[0,1,2].map(i => <div key={i} style={{ width: 7, height: 7, borderRadius: "50%", background: "rgba(255,255,255,0.08)" }} />)}</div>
    </div>
    <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 14.5, lineHeight: 1.7, color: "rgba(255,255,255,0.5)", marginBottom: 26 }}>{p.longDesc}</p>
    <h4 style={{ fontFamily: "'Syne',sans-serif", fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.55)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 12 }}>Fonctionnalités clés</h4>
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 26 }}>{p.features.map(f => <span key={f} style={{ padding: "7px 15px", borderRadius: 10, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)", fontFamily: "'DM Sans',sans-serif", fontSize: 12.5, color: "rgba(255,255,255,0.45)" }}>{f}</span>)}</div>
    <h4 style={{ fontFamily: "'Syne',sans-serif", fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.55)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 12 }}>Stack technique</h4>
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>{p.stack.map(s => <span key={s} style={{ padding: "7px 15px", borderRadius: 10, background: `${p.color}0D`, border: `1px solid ${p.color}1A`, fontFamily: "'DM Mono',monospace", fontSize: 12, color: p.color }}>{s}</span>)}</div>
  </>);
}

function ServiceModalContent({ s }) {
  const iconFn = Icons[s.icon];
  return (<>
    <div style={{ width: 52, height: 52, borderRadius: 16, background: "rgba(255,107,53,0.08)", border: "1px solid rgba(255,107,53,0.15)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 22 }}>{iconFn && iconFn("#FF6B35", 24)}</div>
    <h3 style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(26px,4vw,36px)", fontWeight: 800, color: "#fff", letterSpacing: "-0.03em", marginBottom: 16 }}>{s.title}</h3>
    <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 15, lineHeight: 1.7, color: "rgba(255,255,255,0.48)", marginBottom: 32 }}>{s.fullDesc}</p>
    <h4 style={{ fontFamily: "'Syne',sans-serif", fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.55)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 16 }}>Ce que vous obtenez</h4>
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {s.deliverables.map((d, i) => (<div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", borderRadius: 12, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)" }}>
        <div style={{ width: 24, height: 24, borderRadius: 8, background: "rgba(0,232,147,0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{Icons.check("#00E893", 13)}</div>
        <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13.5, color: "rgba(255,255,255,0.55)" }}>{d}</span>
      </div>))}
    </div>
  </>);
}

/* ═══════════════════════════════════════════════
   PROJECT CARD + SECTION
   ═══════════════════════════════════════════════ */

function ProjCard({ p, i, vis, onClick }) {
  const [h, setH] = useState(false);
  return (
    <div data-hover onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} style={{ position: "relative", borderRadius: 20, overflow: "hidden", cursor: "pointer", opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(50px)", transition: `all 0.8s cubic-bezier(0.16,1,0.3,1) ${i * 0.1}s`, background: "rgba(255,255,255,0.02)", border: `1px solid ${h ? `${p.color}30` : "rgba(255,255,255,0.04)"}`, minHeight: 380, display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
      <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at ${h ? "30% 20%" : "75% 75%"},${p.color}10 0%,transparent 60%)`, transition: "all 0.8s cubic-bezier(0.16,1,0.3,1)" }} />
      <div style={{ position: "absolute", top: 20, left: 20, fontFamily: "'DM Mono',monospace", fontSize: 11, color: p.color, opacity: 0.65 }}>{p.year}</div>
      <div style={{ position: "absolute", top: 20, right: 20, padding: "5px 12px", borderRadius: 28, border: `1px solid ${p.color}22`, fontFamily: "'DM Sans',sans-serif", fontSize: 10, color: p.color, letterSpacing: "0.06em", textTransform: "uppercase", fontWeight: 500 }}>{p.category}</div>
      <div style={{ position: "absolute", top: "23%", left: "50%", transform: `translate(-50%,-50%) scale(${h ? 1.12 : 1}) rotate(${h ? 18 : 0}deg)`, width: 110, height: 110, borderRadius: i % 2 === 0 ? "30% 70% 70% 30%/30% 30% 70% 70%" : "50%", border: `1.5px solid ${p.color}18`, transition: "all 1s cubic-bezier(0.16,1,0.3,1)" }} />
      <div style={{ position: "relative", padding: "0 24px 24px", zIndex: 1 }}>
        <h3 style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(22px,2.5vw,30px)", fontWeight: 800, color: "#fff", letterSpacing: "-0.03em", marginBottom: 8, transform: h ? "translateY(-3px)" : "translateY(0)", transition: "transform 0.5s cubic-bezier(0.16,1,0.3,1)" }}>{p.title}</h3>
        <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, lineHeight: 1.6, color: "rgba(255,255,255,0.38)", maxHeight: h ? 70 : 0, opacity: h ? 1 : 0, transition: "all 0.5s cubic-bezier(0.16,1,0.3,1)", overflow: "hidden", marginBottom: h ? 14 : 0 }}>{p.description}</p>
        <div style={{ display: "flex", gap: 8 }}>{p.tags.slice(0, 3).map(t => <span key={t} style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, color: "rgba(255,255,255,0.25)" }}>#{t}</span>)}</div>
      </div>
      <div style={{ position: "absolute", bottom: 20, right: 20, width: 36, height: 36, borderRadius: "50%", background: h ? p.color : "rgba(255,255,255,0.04)", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)", transform: h ? "scale(1)" : "scale(0.8)" }}>
        <div style={{ transform: "rotate(-45deg)" }}>{Icons.arrowRight(h ? "#08080C" : "rgba(255,255,255,0.2)", 16)}</div>
      </div>
    </div>
  );
}

function Projects({ onOpen }) {
  const [ref, vis] = useInView(0.06);
  return (<section id="projects" ref={ref} style={{ padding: "110px 40px", maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 3 }}>
    <SH tag="Projets sélectionnés" title="Travaux récents" vis={vis} />
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,310px),1fr))", gap: 20 }}>
      {PROJECTS.map((p, i) => <ProjCard key={p.id} p={p} i={i} vis={vis} onClick={() => onOpen(p)} />)}
    </div>
  </section>);
}

/* ═══════════════════════════════════════════════
   ABOUT — GAMING BIO
   ═══════════════════════════════════════════════ */

function About() {
  const [ref, vis] = useInView(0.06);
  return (
    <section id="about" ref={ref} style={{ padding: "110px 40px", maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 3 }}>
      <SH tag="À propos" title="Qui suis-je" vis={vis} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,340px),1fr))", gap: 20, marginBottom: 20 }}>
        <div style={{ borderRadius: 22, overflow: "hidden", position: "relative", background: "linear-gradient(160deg,rgba(255,107,53,0.06) 0%,rgba(18,18,26,0.98) 40%)", border: "1px solid rgba(255,107,53,0.1)", opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(40px)", transition: "all 0.8s cubic-bezier(0.16,1,0.3,1)", padding: "36px 32px" }}>
          <div style={{ position: "absolute", top: 0, left: 0, width: 60, height: 60 }}><div style={{ position: "absolute", top: 12, left: 12, width: 28, height: 1, background: "rgba(255,107,53,0.3)" }} /><div style={{ position: "absolute", top: 12, left: 12, width: 1, height: 28, background: "rgba(255,107,53,0.3)" }} /></div>
          <div style={{ position: "absolute", bottom: 0, right: 0, width: 60, height: 60 }}><div style={{ position: "absolute", bottom: 12, right: 12, width: 28, height: 1, background: "rgba(255,107,53,0.15)" }} /><div style={{ position: "absolute", bottom: 12, right: 12, width: 1, height: 28, background: "rgba(255,107,53,0.15)" }} /></div>
          <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 28 }}>
            <div style={{ width: 88, height: 88, borderRadius: 20, position: "relative", background: "linear-gradient(135deg,#FF6B35,#FFD23F)", padding: 2 }}>
              <div style={{ width: "100%", height: "100%", borderRadius: 18, background: "#12121A", display: "flex", alignItems: "center", justifyContent: "center" }}>{Icons.user("#FF6B35", 36)}</div>
              <div style={{ position: "absolute", bottom: -2, right: -2, width: 18, height: 18, borderRadius: "50%", background: "#08080C", display: "flex", alignItems: "center", justifyContent: "center" }}><div style={{ width: 10, height: 10, borderRadius: "50%", background: "#00E893", animation: "pulse 2s infinite" }} /></div>
            </div>
            <div>
              <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, color: "#FF6B35", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 6 }}>LVL. PRO</div>
              <h3 style={{ fontFamily: "'Syne',sans-serif", fontSize: 24, fontWeight: 800, color: "#fff", letterSpacing: "-0.03em", marginBottom: 4 }}>Brahim Ouchrif</h3>
              <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: "rgba(255,255,255,0.4)" }}>Développeur Web Freelance</div>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 24 }}>
            {[{ icon: "location", label: "Localisation", value: "France" }, { icon: "calendar", label: "Expérience", value: "Depuis 2025" }].map((item, i) => (
              <div key={i} style={{ padding: "12px 14px", borderRadius: 12, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)", display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ opacity: 0.4 }}>{Icons[item.icon]("rgba(255,255,255,0.6)", 14)}</div>
                <div><div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 10, color: "rgba(255,255,255,0.25)", letterSpacing: "0.06em", textTransform: "uppercase" }}>{item.label}</div><div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: "rgba(255,255,255,0.65)", fontWeight: 500 }}>{item.value}</div></div>
              </div>
            ))}
          </div>
          <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 14, lineHeight: 1.7, color: "rgba(255,255,255,0.4)" }}>Passionné par la création d'expériences digitales uniques, je transforme les idées en produits web performants et esthétiques. Mon approche combine rigueur technique et sensibilité design pour livrer des solutions qui marquent les esprits et atteignent les objectifs business.</p>
        </div>
        <div style={{ borderRadius: 22, padding: "36px 32px", background: "rgba(255,255,255,0.015)", border: "1px solid rgba(255,255,255,0.04)", opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(40px)", transition: "all 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 28 }}><div style={{ opacity: 0.5 }}>{Icons.layers("#FF6B35", 18)}</div><h4 style={{ fontFamily: "'Syne',sans-serif", fontSize: 16, fontWeight: 700, color: "#fff" }}>Compétences</h4></div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {SKILLS.map((sk, i) => (<div key={sk.name}><div style={{ display: "flex", justifyContent: "space-between", marginBottom: 7 }}><span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: "rgba(255,255,255,0.55)", fontWeight: 500 }}>{sk.name}</span><span style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, color: "rgba(255,255,255,0.2)" }}>{sk.level}%</span></div><div style={{ width: "100%", height: 4, background: "rgba(255,255,255,0.04)", borderRadius: 2, overflow: "hidden" }}><div style={{ height: "100%", borderRadius: 2, background: sk.level > 90 ? "linear-gradient(90deg,#FF6B35,#FFD23F)" : sk.level > 85 ? "linear-gradient(90deg,#7B61FF,#FF6B35)" : "linear-gradient(90deg,#00E893,#7B61FF)", width: vis ? `${sk.level}%` : "0%", transition: `width 1.2s cubic-bezier(0.16,1,0.3,1) ${0.4 + i * 0.07}s` }} /></div></div>))}
          </div>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,150px),1fr))", gap: 14 }}>
        {STATS.map((s, i) => (<div key={i} style={{ padding: "24px 20px", borderRadius: 16, textAlign: "center", background: "rgba(255,255,255,0.015)", border: "1px solid rgba(255,255,255,0.04)", opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(30px)", transition: `all 0.8s cubic-bezier(0.16,1,0.3,1) ${0.2 + i * 0.08}s` }}>
          <div style={{ marginBottom: 10, opacity: 0.3 }}>{Icons[s.icon]("#FF6B35", 18)}</div>
          <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 28, fontWeight: 800, background: "linear-gradient(135deg,#FF6B35,#FFD23F)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", marginBottom: 4 }}>{s.num}</div>
          <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, color: "rgba(255,255,255,0.25)", letterSpacing: "0.06em", textTransform: "uppercase" }}>{s.label}</div>
        </div>))}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   SERVICES + PROCESS + TESTIMONIALS + CONTACT
   ═══════════════════════════════════════════════ */

function Services({ onOpen }) {
  const [ref, vis] = useInView(0.06);
  return (<section id="services" ref={ref} style={{ padding: "100px 40px", maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 3 }}>
    <SH tag="Ce que je fais" title="Services" vis={vis} />
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,240px),1fr))", gap: 16 }}>
      {SERVICES_DATA.map((s, i) => {
        const [h, setH] = useState(false); const iconFn = Icons[s.icon];
        return (<div key={s.id} data-hover onClick={() => onOpen(s)} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} style={{ padding: "30px 26px", borderRadius: 20, cursor: "pointer", background: h ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.012)", border: `1px solid ${h ? "rgba(255,107,53,0.15)" : "rgba(255,255,255,0.04)"}`, transition: "all 0.5s cubic-bezier(0.16,1,0.3,1)", opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(36px)", transitionDelay: `${i * 0.07}s` }}>
          <div style={{ width: 44, height: 44, borderRadius: 14, background: h ? "rgba(255,107,53,0.1)" : "rgba(255,255,255,0.03)", border: `1px solid ${h ? "rgba(255,107,53,0.2)" : "rgba(255,255,255,0.04)"}`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18, transition: "all 0.4s", transform: h ? "scale(1.08)" : "scale(1)" }}>{iconFn && iconFn(h ? "#FF6B35" : "rgba(255,255,255,0.35)", 20)}</div>
          <h3 style={{ fontFamily: "'Syne',sans-serif", fontSize: 18, fontWeight: 700, color: "#fff", marginBottom: 8 }}>{s.title}</h3>
          <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, lineHeight: 1.65, color: "rgba(255,255,255,0.35)", marginBottom: 16 }}>{s.shortDesc}</p>
          <div style={{ display: "flex", alignItems: "center", gap: 6, opacity: h ? 1 : 0.4, transition: "opacity 0.3s" }}><span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, fontWeight: 600, color: "#FF6B35" }}>En savoir plus</span><div style={{ transform: h ? "translateX(4px)" : "translateX(0)", transition: "transform 0.3s" }}>{Icons.arrowRight("#FF6B35", 14)}</div></div>
        </div>);
      })}
    </div>
  </section>);
}

function Process() {
  const [ref, vis] = useInView(0.06);
  return (<section id="process" ref={ref} style={{ padding: "100px 40px", maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 3 }}>
    <SH tag="Comment je travaille" title="Mon process" vis={vis} />
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,240px),1fr))", gap: 16 }}>
      {PROCESS_STEPS.map((s, i) => {
        const [h, setH] = useState(false); const iconFn = Icons[s.icon];
        return (<div key={i} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} style={{ padding: "32px 26px", borderRadius: 20, position: "relative", overflow: "hidden", background: h ? "rgba(255,255,255,0.025)" : "rgba(255,255,255,0.012)", border: `1px solid ${h ? `${s.color}20` : "rgba(255,255,255,0.04)"}`, opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(36px)", transition: `all 0.8s cubic-bezier(0.16,1,0.3,1) ${i * 0.1}s` }}>
          <div style={{ position: "absolute", top: -10, right: -5, fontFamily: "'Syne',sans-serif", fontSize: 100, fontWeight: 800, color: s.color, opacity: h ? 0.06 : 0.03, transition: "opacity 0.5s", lineHeight: 1, pointerEvents: "none" }}>{s.num}</div>
          <div style={{ width: 48, height: 48, borderRadius: 14, background: `${s.color}12`, border: `1px solid ${s.color}20`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20, transition: "all 0.5s cubic-bezier(0.16,1,0.3,1)", transform: h ? "scale(1.08) rotate(4deg)" : "scale(1)" }}>{iconFn && iconFn(s.color, 22)}</div>
          <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, color: s.color, opacity: 0.6, marginBottom: 8, letterSpacing: "0.08em" }}>ÉTAPE {s.num}</div>
          <h3 style={{ fontFamily: "'Syne',sans-serif", fontSize: 20, fontWeight: 700, color: "#fff", marginBottom: 10 }}>{s.title}</h3>
          <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, lineHeight: 1.65, color: "rgba(255,255,255,0.35)" }}>{s.desc}</p>
          <div style={{ marginTop: 20, width: "100%", height: 2, background: "rgba(255,255,255,0.03)", borderRadius: 1, overflow: "hidden" }}><div style={{ height: "100%", width: vis ? "100%" : "0%", background: `linear-gradient(90deg,${s.color}60,${s.color}20)`, transition: `width 1.5s cubic-bezier(0.16,1,0.3,1) ${0.5 + i * 0.15}s`, borderRadius: 1 }} /></div>
        </div>);
      })}
    </div>
  </section>);
}

function Testimonials() {
  const [ref, vis] = useInView(0.06);
  return (<section ref={ref} style={{ padding: "100px 40px", maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 3 }}>
    <SH tag="Ils m'ont fait confiance" title="Témoignages" vis={vis} />
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,290px),1fr))", gap: 16 }}>
      {TESTIMONIALS.map((t, i) => (<div key={i} style={{ padding: "30px 28px", borderRadius: 20, background: "rgba(255,255,255,0.015)", border: "1px solid rgba(255,255,255,0.04)", opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(36px)", transition: `all 0.8s cubic-bezier(0.16,1,0.3,1) ${i * 0.1}s` }}>
        <div style={{ display: "flex", gap: 4, marginBottom: 16 }}>{[0,1,2,3,4].map(j => <div key={j}>{Icons.star("#FFD23F", 13)}</div>)}</div>
        <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13.5, lineHeight: 1.7, color: "rgba(255,255,255,0.45)", marginBottom: 22, fontStyle: "italic" }}>"{t.text}"</p>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg,rgba(255,107,53,0.15),rgba(255,210,63,0.08))", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Syne',sans-serif", fontSize: 13, fontWeight: 700, color: "#FF6B35" }}>{t.avatar}</div>
          <div><div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.65)" }}>{t.name}</div><div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, color: "rgba(255,255,255,0.25)" }}>{t.role}</div></div>
        </div>
      </div>))}
    </div>
  </section>);
}

function FormInput({ label, icon, type = "text", value, onChange, placeholder, required = true, focused, onFocus, onBlur }) {
  const isActive = focused || value;
  const iconFn = Icons[icon];
  return (
    <div style={{ position: "relative" }}>
      {/* Floating label */}
      <label style={{
        position: "absolute", left: 48, top: isActive ? 8 : 20,
        fontFamily: "'DM Sans',sans-serif",
        fontSize: isActive ? 10 : 13,
        fontWeight: isActive ? 600 : 400,
        color: isActive ? "#FF6B35" : "rgba(255,255,255,0.25)",
        letterSpacing: isActive ? "0.06em" : "0",
        textTransform: isActive ? "uppercase" : "none",
        transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
        pointerEvents: "none", zIndex: 1,
      }}>{label}</label>
      <div style={{
        display: "flex", alignItems: "center", gap: 14,
        padding: isActive ? "22px 16px 10px" : "16px",
        borderRadius: 14,
        background: focused ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.02)",
        border: `1px solid ${focused ? "rgba(255,107,53,0.25)" : "rgba(255,255,255,0.06)"}`,
        transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
        boxShadow: focused ? "0 0 20px rgba(255,107,53,0.06)" : "none",
      }}>
        <div style={{
          width: 32, height: 32, borderRadius: 10, flexShrink: 0,
          background: focused ? "rgba(255,107,53,0.1)" : "rgba(255,255,255,0.03)",
          border: `1px solid ${focused ? "rgba(255,107,53,0.15)" : "rgba(255,255,255,0.04)"}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          transition: "all 0.3s",
        }}>
          {iconFn && iconFn(focused ? "#FF6B35" : "rgba(255,255,255,0.25)", 15)}
        </div>
        <input
          type={type} value={value} onChange={onChange} required={required}
          placeholder={isActive ? placeholder : ""}
          onFocus={onFocus} onBlur={onBlur}
          style={{
            flex: 1, background: "transparent", border: "none", outline: "none",
            fontFamily: "'DM Sans',sans-serif", fontSize: 14, color: "#fff",
            paddingTop: isActive ? 6 : 0,
            transition: "padding 0.3s",
          }}
        />
      </div>
    </div>
  );
}

function FormTextarea({ label, value, onChange, placeholder, focused, onFocus, onBlur }) {
  const isActive = focused || value;
  return (
    <div style={{ position: "relative" }}>
      <label style={{
        position: "absolute", left: 18, top: isActive ? 10 : 18,
        fontFamily: "'DM Sans',sans-serif",
        fontSize: isActive ? 10 : 13,
        fontWeight: isActive ? 600 : 400,
        color: isActive ? "#FF6B35" : "rgba(255,255,255,0.25)",
        letterSpacing: isActive ? "0.06em" : "0",
        textTransform: isActive ? "uppercase" : "none",
        transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
        pointerEvents: "none", zIndex: 1,
      }}>{label}</label>
      <textarea
        value={value} onChange={onChange}
        placeholder={isActive ? placeholder : ""}
        onFocus={onFocus} onBlur={onBlur}
        rows={4}
        style={{
          width: "100%", background: focused ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.02)",
          border: `1px solid ${focused ? "rgba(255,107,53,0.25)" : "rgba(255,255,255,0.06)"}`,
          borderRadius: 14, outline: "none", resize: "vertical",
          fontFamily: "'DM Sans',sans-serif", fontSize: 14, color: "#fff",
          padding: isActive ? "28px 16px 14px" : "18px 16px",
          transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
          boxShadow: focused ? "0 0 20px rgba(255,107,53,0.06)" : "none",
          minHeight: 120,
        }}
      />
    </div>
  );
}

function Contact({ onOpenMentions, onOpenPrivacy }) {
  const [ref, vis] = useInView(0.06);
  const [focusedField, setFocusedField] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "", projectType: "", budget: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState(null);
  const [consent, setConsent] = useState(false);

  const update = (field) => (e) => setForm(prev => ({ ...prev, [field]: e.target.value }));

  const PROJECT_TYPES = ["Site vitrine", "Application web", "Web App / PWA", "Outil entreprise", "Branding & Web", "Autre"];
  const BUDGETS = ["< 2 000 €", "2 000 – 5 000 €", "5 000 – 10 000 €", "10 000 – 20 000 €", "> 20 000 €", "À définir"];

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.projectType) return;
    setSending(true);
    setSendError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone || "",
          projectType: form.projectType,
          budget: form.budget || "",
          message: form.message || "",
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
      } else {
        throw new Error(data.error || "Erreur");
      }
    } catch (err) {
      console.error("Email send error:", err);
      setSendError("L'envoi a échoué. Veuillez réessayer.");
    } finally {
      setSending(false);
    }
  };

  const resetForm = () => {
    setForm({ name: "", email: "", phone: "", projectType: "", budget: "", message: "" });
    setSubmitted(false);
    setSendError(null);
    setConsent(false);
  };

  return (
    <section id="contact" ref={ref} style={{ padding: "120px 40px 80px", maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 3 }}>
      <SH tag="Parlons de votre projet" title="Contact" vis={vis} />

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 360px), 1fr))",
        gap: 24, alignItems: "start",
      }}>
        {/* Left: Info */}
        <div style={{
          opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(40px)",
          transition: "all 0.8s cubic-bezier(0.16,1,0.3,1)",
        }}>
          <h3 style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(26px,4vw,38px)", fontWeight: 800, color: "#fff", letterSpacing: "-0.03em", marginBottom: 16 }}>
            Une idée<span style={{ color: "#FF6B35" }}>?</span><br />
            Construisons-la<span style={{ color: "#FFD23F" }}>.</span>
          </h3>
          <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 15, lineHeight: 1.7, color: "rgba(255,255,255,0.38)", marginBottom: 36, maxWidth: 400 }}>
            Remplissez le formulaire et je vous recontacte sous 24h avec une première analyse de votre projet. Chaque demande reçoit une réponse personnalisée.
          </p>

          {/* Quick info cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              { icon: "mail", label: "Email", value: "brahimouchrif@gmail.com", color: "#FF6B35" },
              { icon: "location", label: "Localisation", value: "France", color: "#7B61FF" },
              { icon: "bolt", label: "Réponse", value: "Sous 24 heures", color: "#00E893" },
            ].map((item, i) => {
              const [ih, setIh] = useState(false);
              const iconFn = Icons[item.icon];
              return (
                <div key={i}
                  onMouseEnter={() => setIh(true)} onMouseLeave={() => setIh(false)}
                  style={{
                    display: "flex", alignItems: "center", gap: 14,
                    padding: "14px 18px", borderRadius: 14,
                    background: ih ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.015)",
                    border: `1px solid ${ih ? `${item.color}20` : "rgba(255,255,255,0.04)"}`,
                    transition: "all 0.4s",
                  }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: 10, flexShrink: 0,
                    background: `${item.color}12`, border: `1px solid ${item.color}20`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "all 0.3s", transform: ih ? "scale(1.06)" : "scale(1)",
                  }}>
                    {iconFn && iconFn(item.color, 16)}
                  </div>
                  <div>
                    <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, color: "rgba(255,255,255,0.3)", letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: 2 }}>{item.label}</div>
                    <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13.5, color: "rgba(255,255,255,0.65)", fontWeight: 500 }}>{item.value}</div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Social links */}
          <div style={{ display: "flex", gap: 10, marginTop: 24 }}>
            {["LinkedIn", "GitHub", "Twitter"].map(s => (
              <Mag key={s} s={0.2}>
                <div data-hover style={{
                  padding: "10px 18px", borderRadius: 10, cursor: "pointer",
                  background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.05)",
                  fontFamily: "'DM Sans',sans-serif", fontSize: 12, fontWeight: 500,
                  color: "rgba(255,255,255,0.35)", transition: "all 0.3s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(255,107,53,0.2)"; e.currentTarget.style.color = "#FF6B35"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)"; e.currentTarget.style.color = "rgba(255,255,255,0.35)"; }}
                >{s}</div>
              </Mag>
            ))}
          </div>
        </div>

        {/* Right: Form */}
        <div style={{
          borderRadius: 22, padding: "clamp(28px, 4vw, 40px)",
          background: "rgba(255,255,255,0.015)",
          border: "1px solid rgba(255,255,255,0.05)",
          position: "relative", overflow: "hidden",
          opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(40px)",
          transition: "all 0.8s cubic-bezier(0.16,1,0.3,1) 0.15s",
        }}>
          {/* Corner accents */}
          <div style={{ position: "absolute", top: 0, right: 0, width: 50, height: 50 }}>
            <div style={{ position: "absolute", top: 12, right: 12, width: 22, height: 1, background: "rgba(255,107,53,0.2)" }} />
            <div style={{ position: "absolute", top: 12, right: 12, width: 1, height: 22, background: "rgba(255,107,53,0.2)" }} />
          </div>

          {!submitted ? (
            <>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 28 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(255,107,53,0.08)", border: "1px solid rgba(255,107,53,0.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {Icons.mail("#FF6B35", 17)}
                </div>
                <div>
                  <h4 style={{ fontFamily: "'Syne',sans-serif", fontSize: 17, fontWeight: 700, color: "#fff" }}>Envoyer une demande</h4>
                  <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11.5, color: "rgba(255,255,255,0.3)" }}>Tous les champs marqués sont requis</span>
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 200px), 1fr))", gap: 14 }}>
                  <FormInput label="Nom complet" icon="user" value={form.name} onChange={update("name")} placeholder="Jean Dupont" focused={focusedField === "name"} onFocus={() => setFocusedField("name")} onBlur={() => setFocusedField(null)} />
                  <FormInput label="Email" icon="mail" type="email" value={form.email} onChange={update("email")} placeholder="jean@email.com" focused={focusedField === "email"} onFocus={() => setFocusedField("email")} onBlur={() => setFocusedField(null)} />
                </div>

                <FormInput label="Téléphone (optionnel)" icon="smartphone" type="tel" value={form.phone} onChange={update("phone")} placeholder="+33 6 00 00 00 00" required={false} focused={focusedField === "phone"} onFocus={() => setFocusedField("phone")} onBlur={() => setFocusedField(null)} />

                {/* Project type selector */}
                <div>
                  <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 10, fontWeight: 600, color: "#FF6B35", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 10 }}>Type de projet</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {PROJECT_TYPES.map(t => {
                      const sel = form.projectType === t;
                      return (
                        <div key={t} data-hover onClick={() => setForm(p => ({ ...p, projectType: t }))}
                          style={{
                            padding: "9px 16px", borderRadius: 10, cursor: "pointer",
                            background: sel ? "rgba(255,107,53,0.1)" : "rgba(255,255,255,0.02)",
                            border: `1px solid ${sel ? "rgba(255,107,53,0.25)" : "rgba(255,255,255,0.06)"}`,
                            fontFamily: "'DM Sans',sans-serif", fontSize: 12.5, fontWeight: sel ? 600 : 400,
                            color: sel ? "#FF6B35" : "rgba(255,255,255,0.4)",
                            transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
                          }}>{t}</div>
                      );
                    })}
                  </div>
                </div>

                {/* Budget selector */}
                <div>
                  <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 10, fontWeight: 600, color: "#FF6B35", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 10 }}>Budget estimé</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {BUDGETS.map(b => {
                      const sel = form.budget === b;
                      return (
                        <div key={b} data-hover onClick={() => setForm(p => ({ ...p, budget: b }))}
                          style={{
                            padding: "9px 16px", borderRadius: 10, cursor: "pointer",
                            background: sel ? "rgba(0,232,147,0.08)" : "rgba(255,255,255,0.02)",
                            border: `1px solid ${sel ? "rgba(0,232,147,0.2)" : "rgba(255,255,255,0.06)"}`,
                            fontFamily: "'DM Mono',monospace", fontSize: 12, fontWeight: sel ? 500 : 400,
                            color: sel ? "#00E893" : "rgba(255,255,255,0.35)",
                            transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
                          }}>{b}</div>
                      );
                    })}
                  </div>
                </div>

                <FormTextarea label="Décrivez votre projet" value={form.message} onChange={update("message")} placeholder="Parlez-moi de votre idée, vos objectifs, vos délais..." focused={focusedField === "message"} onFocus={() => setFocusedField("message")} onBlur={() => setFocusedField(null)} />

                {/* RGPD Consent */}
                <div
                  onClick={() => setConsent(!consent)}
                  style={{ display: "flex", alignItems: "flex-start", gap: 12, cursor: "pointer", padding: "4px 0" }}>
                  <div style={{
                    width: 20, height: 20, borderRadius: 6, flexShrink: 0, marginTop: 1,
                    background: consent ? "rgba(0,232,147,0.15)" : "rgba(255,255,255,0.03)",
                    border: `1.5px solid ${consent ? "rgba(0,232,147,0.4)" : "rgba(255,255,255,0.1)"}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
                  }}>
                    {consent && Icons.check("#00E893", 12)}
                  </div>
                  <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, lineHeight: 1.5, color: "rgba(255,255,255,0.35)" }}>
                    J'accepte que mes données soient traitées dans le cadre de ma demande conformément à la{" "}
                    <span onClick={e => { e.stopPropagation(); onOpenPrivacy(); }} style={{ color: "#FF6B35", textDecoration: "underline", cursor: "pointer" }}>
                      politique de confidentialité
                    </span>.
                  </span>
                </div>

                {/* Error message */}
                {sendError && (
                  <div style={{
                    padding: "12px 16px", borderRadius: 10,
                    background: "rgba(255,59,48,0.08)", border: "1px solid rgba(255,59,48,0.15)",
                    fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: "#FF3B30",
                    display: "flex", alignItems: "center", gap: 10,
                  }}>
                    {Icons.close("#FF3B30", 15)}
                    <span>{sendError}</span>
                  </div>
                )}

                {/* Submit */}
                <Mag s={0.06} style={{ marginTop: 6 }}>
                  <button data-hover onClick={handleSubmit}
                    disabled={sending}
                    style={{
                      width: "100%", padding: "18px 32px", border: "none", borderRadius: 14,
                      cursor: sending ? "wait" : (!form.name || !form.email || !form.projectType || !consent) ? "not-allowed" : "pointer",
                      background: sending ? "linear-gradient(135deg,#FF6B35,#FF8B5E)" : (!form.name || !form.email || !form.projectType || !consent) ? "rgba(255,255,255,0.04)" : "linear-gradient(135deg,#FF6B35,#FF8B5E)",
                      fontFamily: "'DM Sans',sans-serif", fontSize: 15, fontWeight: 600,
                      color: (!form.name || !form.email || !form.projectType || !consent) && !sending ? "rgba(255,255,255,0.2)" : "#fff",
                      transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
                      boxShadow: (!form.name || !form.email || !form.projectType || !consent) && !sending ? "none" : "0 4px 28px rgba(255,107,53,0.25)",
                      display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                      opacity: sending ? 0.85 : 1,
                    }}>
                    {sending ? (
                      <>
                        {/* Spinner */}
                        <div style={{
                          width: 18, height: 18, borderRadius: "50%",
                          border: "2px solid rgba(255,255,255,0.25)",
                          borderTopColor: "#fff",
                          animation: "spin 0.8s linear infinite",
                        }} />
                        <span>Envoi en cours...</span>
                      </>
                    ) : (
                      <>
                        <span>Envoyer la demande</span>
                        <div style={{ transform: "rotate(-45deg)" }}>{Icons.arrowRight((!form.name || !form.email || !form.projectType || !consent) ? "rgba(255,255,255,0.15)" : "#fff", 18)}</div>
                      </>
                    )}
                  </button>
                </Mag>
              </div>
            </>
          ) : (
            /* Success state */
            <div style={{ textAlign: "center", padding: "40px 10px" }}>
              <div style={{
                width: 64, height: 64, borderRadius: "50%", margin: "0 auto 24px",
                background: "rgba(0,232,147,0.1)", border: "1px solid rgba(0,232,147,0.2)",
                display: "flex", alignItems: "center", justifyContent: "center",
                animation: "fadeUp 0.6s cubic-bezier(0.16,1,0.3,1)",
              }}>
                {Icons.check("#00E893", 28)}
              </div>
              <h4 style={{ fontFamily: "'Syne',sans-serif", fontSize: 24, fontWeight: 800, color: "#fff", marginBottom: 12 }}>
                Demande envoyée !
              </h4>
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 14, color: "rgba(255,255,255,0.4)", lineHeight: 1.65, marginBottom: 28, maxWidth: 340, margin: "0 auto 28px" }}>
                Merci {form.name.split(" ")[0]} ! Je reviens vers vous dans les 24 prochaines heures.
              </p>
              <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                <div data-hover onClick={resetForm}
                  style={{
                    padding: "12px 22px", borderRadius: 10, cursor: "pointer",
                    background: "rgba(255,107,53,0.08)", border: "1px solid rgba(255,107,53,0.15)",
                    fontFamily: "'DM Sans',sans-serif", fontSize: 13, fontWeight: 600, color: "#FF6B35",
                    display: "flex", alignItems: "center", gap: 8, transition: "all 0.3s",
                  }}>
                  {Icons.mail("#FF6B35", 15)}
                  <span>Nouvelle demande</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div style={{ marginTop: 90, paddingTop: 32, borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <div style={{ display: "flex", justifyContent: "center", gap: 24, marginBottom: 20, flexWrap: "wrap" }}>
          {[
            { label: "Mentions légales", action: onOpenMentions },
            { label: "Politique de confidentialité", action: onOpenPrivacy },
          ].map((link, i) => (
            <span key={i} data-hover onClick={link.action} style={{
              fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: "rgba(255,255,255,0.25)",
              cursor: "pointer", transition: "color 0.3s", letterSpacing: "0.02em",
            }}
              onMouseEnter={e => e.target.style.color = "rgba(255,255,255,0.5)"}
              onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.25)"}
            >{link.label}</span>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 14 }}>
          <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11.5, color: "rgba(255,255,255,0.15)" }}>© 2026 Brahim Ouchrif — Tous droits réservés</span>
          <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 11.5, color: "rgba(255,255,255,0.1)" }}>Conçu & développé avec passion</span>
        </div>
      </div>

    </section>
  );
}

/* ═══════════════════════════════════════════════
   MENTIONS LÉGALES
   ═══════════════════════════════════════════════ */

function MentionsLegalesContent() {
  const h3Style = { fontFamily: "'Syne',sans-serif", fontSize: 18, fontWeight: 700, color: "#fff", marginTop: 28, marginBottom: 10 };
  const pStyle = { fontFamily: "'DM Sans',sans-serif", fontSize: 13.5, lineHeight: 1.75, color: "rgba(255,255,255,0.5)", marginBottom: 12 };
  const labelStyle = { fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: "rgba(255,255,255,0.3)", fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase" };
  const valueStyle = { fontFamily: "'DM Sans',sans-serif", fontSize: 14, color: "rgba(255,255,255,0.6)", marginBottom: 8 };

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
        <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(255,107,53,0.08)", border: "1px solid rgba(255,107,53,0.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          {Icons.shield("#FF6B35", 17)}
        </div>
        <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: 22, fontWeight: 800, color: "#fff" }}>Mentions légales</h2>
      </div>
      <p style={{ ...pStyle, fontSize: 12, color: "rgba(255,255,255,0.3)" }}>En vigueur au 18/03/2026 — Conformément à la loi n°2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique (LCEN).</p>

      <h3 style={h3Style}>1. Éditeur du site</h3>
      <div style={{ padding: "16px 20px", borderRadius: 12, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)", marginBottom: 16 }}>
        <div style={{ marginBottom: 6 }}><span style={labelStyle}>Nom</span></div>
        <div style={valueStyle}>Brahim Ouchrif</div>
        <div style={{ marginBottom: 6 }}><span style={labelStyle}>Statut</span></div>
        <div style={valueStyle}>Entrepreneur individuel (Auto-entrepreneur)</div>
        <div style={{ marginBottom: 6 }}><span style={labelStyle}>SIRET</span></div>
        <div style={valueStyle}>819 259 094 00020</div>
        <div style={{ marginBottom: 6 }}><span style={labelStyle}>Siège social</span></div>
        <div style={valueStyle}>Agde, France</div>
        <div style={{ marginBottom: 6 }}><span style={labelStyle}>Email</span></div>
        <div style={valueStyle}>brahimouchrif@gmail.com</div>
        <div style={{ marginBottom: 6 }}><span style={labelStyle}>Directeur de la publication</span></div>
        <div style={{ ...valueStyle, marginBottom: 0 }}>Brahim Ouchrif</div>
      </div>

      <h3 style={h3Style}>2. Hébergeur</h3>
      <div style={{ padding: "16px 20px", borderRadius: 12, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)", marginBottom: 16 }}>
        <div style={{ marginBottom: 6 }}><span style={labelStyle}>Raison sociale</span></div>
        <div style={valueStyle}>Vercel Inc.</div>
        <div style={{ marginBottom: 6 }}><span style={labelStyle}>Adresse</span></div>
        <div style={valueStyle}>340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis</div>
        <div style={{ marginBottom: 6 }}><span style={labelStyle}>Site web</span></div>
        <div style={{ ...valueStyle, marginBottom: 0 }}>https://vercel.com</div>
      </div>

      <h3 style={h3Style}>3. Propriété intellectuelle</h3>
      <p style={pStyle}>L'ensemble du contenu de ce site (textes, images, graphismes, logo, icônes, code source) est la propriété exclusive de Brahim Ouchrif, sauf mention contraire. Toute reproduction, représentation, modification, publication, transmission ou dénaturation, totale ou partielle, du site ou de son contenu, par quelque procédé que ce soit, et sur quelque support que ce soit, est interdite sans l'autorisation écrite préalable de Brahim Ouchrif.</p>

      <h3 style={h3Style}>4. Limitation de responsabilité</h3>
      <p style={pStyle}>Brahim Ouchrif s'efforce de fournir sur le site des informations aussi précises que possible. Toutefois, il ne pourra être tenu responsable des omissions, inexactitudes et carences dans la mise à jour, qu'elles soient de son fait ou du fait de tiers partenaires qui lui fournissent ces informations. Les informations indiquées sur le site sont données à titre indicatif et sont susceptibles d'évoluer.</p>

      <h3 style={h3Style}>5. Liens hypertextes</h3>
      <p style={pStyle}>Le site brahimouchrif.com peut contenir des liens hypertextes vers d'autres sites. Cependant, Brahim Ouchrif n'a pas la possibilité de vérifier le contenu de ces sites et n'assumera en conséquence aucune responsabilité de ce fait.</p>

      <h3 style={h3Style}>6. Droit applicable</h3>
      <p style={pStyle}>Tout litige en relation avec l'utilisation du site brahimouchrif.com est soumis au droit français. L'utilisateur reconnaît la compétence exclusive des tribunaux compétents d'Agde ou de Montpellier.</p>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   POLITIQUE DE CONFIDENTIALITÉ
   ═══════════════════════════════════════════════ */

function PolitiqueConfidentialiteContent() {
  const h3Style = { fontFamily: "'Syne',sans-serif", fontSize: 18, fontWeight: 700, color: "#fff", marginTop: 28, marginBottom: 10 };
  const pStyle = { fontFamily: "'DM Sans',sans-serif", fontSize: 13.5, lineHeight: 1.75, color: "rgba(255,255,255,0.5)", marginBottom: 12 };

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
        <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(0,232,147,0.08)", border: "1px solid rgba(0,232,147,0.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          {Icons.shield("#00E893", 17)}
        </div>
        <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: 22, fontWeight: 800, color: "#fff" }}>Politique de confidentialité</h2>
      </div>
      <p style={{ ...pStyle, fontSize: 12, color: "rgba(255,255,255,0.3)" }}>En vigueur au 18/03/2026 — Conformément au Règlement Général sur la Protection des Données (RGPD - UE 2016/679).</p>

      <h3 style={h3Style}>1. Responsable du traitement</h3>
      <p style={pStyle}>Le responsable du traitement des données personnelles collectées sur ce site est Brahim Ouchrif, entrepreneur individuel, domicilié à Agde, France. Contact : brahimouchrif@gmail.com.</p>

      <h3 style={h3Style}>2. Données collectées</h3>
      <p style={pStyle}>Lors de l'utilisation du formulaire de contact, les données suivantes peuvent être collectées :</p>
      <div style={{ padding: "14px 18px", borderRadius: 12, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)", marginBottom: 16 }}>
        {["Nom et prénom", "Adresse email", "Numéro de téléphone (optionnel)", "Type de projet et budget estimé", "Message / description du projet"].map((item, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "6px 0", borderBottom: i < 4 ? "1px solid rgba(255,255,255,0.03)" : "none" }}>
            <div style={{ width: 20, height: 20, borderRadius: 6, background: "rgba(0,232,147,0.08)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              {Icons.check("#00E893", 11)}
            </div>
            <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: "rgba(255,255,255,0.5)" }}>{item}</span>
          </div>
        ))}
      </div>

      <h3 style={h3Style}>3. Finalité du traitement</h3>
      <p style={pStyle}>Les données personnelles collectées via le formulaire de contact sont utilisées exclusivement pour répondre à votre demande de projet, vous envoyer un email de confirmation, et vous recontacter dans le cadre de votre demande. Aucune donnée n'est utilisée à des fins de prospection commerciale non sollicitée.</p>

      <h3 style={h3Style}>4. Base légale</h3>
      <p style={pStyle}>Le traitement de vos données personnelles est fondé sur votre consentement (article 6.1.a du RGPD), que vous exprimez en soumettant volontairement le formulaire de contact.</p>

      <h3 style={h3Style}>5. Durée de conservation</h3>
      <p style={pStyle}>Les données collectées via le formulaire de contact sont conservées pendant une durée maximale de 3 ans à compter du dernier contact, conformément aux recommandations de la CNIL. Passé ce délai, elles sont supprimées.</p>

      <h3 style={h3Style}>6. Destinataires des données</h3>
      <p style={pStyle}>Les données personnelles collectées sont destinées uniquement à Brahim Ouchrif. Elles ne sont en aucun cas cédées, vendues ou transmises à des tiers, sauf obligation légale. Les services techniques utilisés (hébergement Vercel, envoi d'email via Gmail/Google) peuvent avoir accès aux données dans le cadre de leur prestation, conformément à leurs propres politiques de confidentialité.</p>

      <h3 style={h3Style}>7. Vos droits</h3>
      <p style={pStyle}>Conformément au RGPD, vous disposez des droits suivants concernant vos données personnelles :</p>
      <div style={{ padding: "14px 18px", borderRadius: 12, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)", marginBottom: 16 }}>
        {[
          { label: "Droit d'accès", desc: "Obtenir la confirmation que vos données sont traitées et en obtenir une copie" },
          { label: "Droit de rectification", desc: "Faire corriger des données inexactes ou incomplètes" },
          { label: "Droit à l'effacement", desc: "Demander la suppression de vos données personnelles" },
          { label: "Droit à la limitation", desc: "Demander la limitation du traitement de vos données" },
          { label: "Droit à la portabilité", desc: "Recevoir vos données dans un format structuré et lisible" },
          { label: "Droit d'opposition", desc: "Vous opposer au traitement de vos données à tout moment" },
        ].map((r, i) => (
          <div key={i} style={{ padding: "8px 0", borderBottom: i < 5 ? "1px solid rgba(255,255,255,0.03)" : "none" }}>
            <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.6)", marginBottom: 2 }}>{r.label}</div>
            <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: "rgba(255,255,255,0.35)" }}>{r.desc}</div>
          </div>
        ))}
      </div>
      <p style={pStyle}>Pour exercer ces droits, contactez-nous à : brahimouchrif@gmail.com. Nous nous engageons à y répondre dans un délai de 30 jours.</p>

      <h3 style={h3Style}>8. Cookies</h3>
      <p style={pStyle}>Ce site n'utilise pas de cookies de tracking, de publicité ou d'analyse. Aucun cookie tiers n'est déposé sur votre navigateur. Seuls des cookies strictement nécessaires au fonctionnement technique du site peuvent être utilisés par l'hébergeur (Vercel).</p>

      <h3 style={h3Style}>9. Sécurité</h3>
      <p style={pStyle}>Le site brahimouchrif.com utilise le protocole HTTPS pour chiffrer les communications entre votre navigateur et le serveur. Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données personnelles contre tout accès non autorisé, modification, divulgation ou destruction.</p>

      <h3 style={h3Style}>10. Réclamation</h3>
      <p style={pStyle}>Si vous estimez que le traitement de vos données personnelles constitue une violation du RGPD, vous avez le droit d'introduire une réclamation auprès de la CNIL (Commission Nationale de l'Informatique et des Libertés) : www.cnil.fr.</p>

      <h3 style={h3Style}>11. Modification de la politique</h3>
      <p style={pStyle}>Cette politique de confidentialité peut être mise à jour à tout moment. La date de dernière mise à jour est indiquée en haut de cette page. Nous vous invitons à la consulter régulièrement.</p>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   COOKIE BANNER
   ═══════════════════════════════════════════════ */

function CookieBanner({ onAccept, onRefuse, onOpenPrivacy }) {
  const [entering, setEntering] = useState(false);
  useEffect(() => { setTimeout(() => setEntering(true), 800); }, []);

  return (
    <div style={{
      position: "fixed", bottom: entering ? 0 : -300, left: 0, right: 0,
      zIndex: 6000, padding: "0 20px 20px",
      transition: "bottom 0.6s cubic-bezier(0.16,1,0.3,1)",
      pointerEvents: entering ? "all" : "none",
    }}>
      <div style={{
        maxWidth: 520, margin: "0 auto",
        background: "rgba(18,18,26,0.97)",
        backdropFilter: "blur(24px) saturate(1.5)",
        borderRadius: 20,
        border: "1px solid rgba(255,255,255,0.06)",
        padding: "24px 28px",
        boxShadow: "0 8px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.03)",
      }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 10,
            background: "rgba(255,210,63,0.1)", border: "1px solid rgba(255,210,63,0.15)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 16,
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FFD23F" strokeWidth="1.8" strokeLinecap="round">
              <circle cx="12" cy="12" r="10"/>
              <circle cx="8" cy="9" r="1" fill="#FFD23F"/>
              <circle cx="15" cy="11" r="1" fill="#FFD23F"/>
              <circle cx="10" cy="15" r="1" fill="#FFD23F"/>
              <circle cx="16" cy="7" r="0.5" fill="#FFD23F"/>
              <circle cx="6" cy="13" r="0.5" fill="#FFD23F"/>
            </svg>
          </div>
          <h3 style={{ fontFamily: "'Syne',sans-serif", fontSize: 16, fontWeight: 700, color: "#fff" }}>
            Cookies & Confidentialité
          </h3>
        </div>

        {/* Text */}
        <p style={{
          fontFamily: "'DM Sans',sans-serif", fontSize: 13, lineHeight: 1.65,
          color: "rgba(255,255,255,0.45)", marginBottom: 20,
        }}>
          Ce site utilise uniquement des <strong style={{ color: "rgba(255,255,255,0.65)" }}>cookies strictement nécessaires</strong> au
          fonctionnement technique (hébergement Vercel). Aucun cookie de tracking, de publicité ou d'analyse n'est utilisé.
          En continuant votre navigation, vous acceptez leur utilisation.{" "}
          <span data-hover onClick={onOpenPrivacy} style={{ color: "#FF6B35", cursor: "pointer", textDecoration: "underline", textUnderlineOffset: 3 }}>
            En savoir plus
          </span>
        </p>

        {/* Buttons */}
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <button data-hover onClick={onAccept}
            style={{
              flex: 1, minWidth: 140, padding: "13px 20px", border: "none", borderRadius: 12,
              cursor: "pointer", background: "linear-gradient(135deg, #FF6B35, #FF8B5E)",
              fontFamily: "'DM Sans',sans-serif", fontSize: 13.5, fontWeight: 600, color: "#fff",
              transition: "all 0.3s", boxShadow: "0 2px 16px rgba(255,107,53,0.2)",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            }}
            onMouseEnter={e => e.currentTarget.style.boxShadow = "0 4px 24px rgba(255,107,53,0.35)"}
            onMouseLeave={e => e.currentTarget.style.boxShadow = "0 2px 16px rgba(255,107,53,0.2)"}
          >
            {Icons.check("#fff", 14)}
            Accepter
          </button>
          <button data-hover onClick={onRefuse}
            style={{
              flex: 1, minWidth: 140, padding: "13px 20px", borderRadius: 12,
              cursor: "pointer", background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              fontFamily: "'DM Sans',sans-serif", fontSize: 13.5, fontWeight: 500,
              color: "rgba(255,255,255,0.5)", transition: "all 0.3s",
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; e.currentTarget.style.color = "rgba(255,255,255,0.7)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.color = "rgba(255,255,255,0.5)"; }}
          >
            Refuser
          </button>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   APP
   ═══════════════════════════════════════════════ */

export default function Portfolio() {
  const [loaded, setLoaded] = useState(false);
  const [heroVis, setHeroVis] = useState(false);
  const [active, setActive] = useState("hero");
  const [modalProj, setModalProj] = useState(null);
  const [modalServ, setModalServ] = useState(null);
  const [showMentions, setShowMentions] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [cookieConsent, setCookieConsent] = useState(() => {
    try { return window.__cookieConsent || null; } catch { return null; }
  });
  const onLoaded = useCallback(() => { setLoaded(true); setTimeout(() => setHeroVis(true), 250); }, []);
  useEffect(() => { if (!loaded) return; const ids = ["hero","projects","about","services","process","contact"]; const obs = new IntersectionObserver(ents => ents.forEach(e => { if (e.isIntersecting) setActive(e.target.id); }), { threshold: 0.2 }); ids.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el); }); return () => obs.disconnect(); }, [loaded]);

  const handleCookieAccept = () => { setCookieConsent("accepted"); window.__cookieConsent = "accepted"; };
  const handleCookieRefuse = () => { setCookieConsent("refused"); window.__cookieConsent = "refused"; };

  return (
    <div style={{ background: "#08080C", color: "#fff", minHeight: "100vh", overflowX: "hidden", cursor: "none" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700&family=DM+Mono:wght@300;400;500&display=swap');
        *{margin:0;padding:0;box-sizing:border-box}html{scroll-behavior:smooth}body{overflow-x:hidden}
        ::selection{background:rgba(255,107,53,0.3);color:#fff}
        ::-webkit-scrollbar{width:5px}::-webkit-scrollbar-track{background:#08080C}::-webkit-scrollbar-thumb{background:rgba(255,255,255,0.07);border-radius:3px}
        @keyframes float{0%,100%{transform:translate(0,0) scale(1)}33%{transform:translate(30px,-30px) scale(1.04)}66%{transform:translate(-20px,20px) scale(0.96)}}
        @keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:0.5;transform:scale(0.8)}}
        @keyframes shimmer{0%{background-position:200% center}100%{background-position:-200% center}}
        @keyframes scrollDown{0%,100%{opacity:0;transform:translateY(-10px)}50%{opacity:1;transform:translateY(10px)}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)}}
        @keyframes marquee{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
        @keyframes grainShift{0%{transform:translate(0,0)}25%{transform:translate(-2px,2px)}50%{transform:translate(2px,-2px)}75%{transform:translate(-1px,-1px)}100%{transform:translate(0,0)}}
        @keyframes spin{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}
        .nd{display:flex!important}.nm{display:none!important}
        @media(max-width:768px){.nd{display:none!important}.nm{display:flex!important}section{padding-left:20px!important;padding-right:20px!important}nav{padding-left:20px!important;padding-right:20px!important}div[style*="cursor: none"]{cursor:auto!important}}
      `}</style>
      {!loaded && <Loader onComplete={onLoaded} />}
      <Particles /><Grain /><Cursor />
      {loaded && <>
        <Navbar active={active} />
        <Hero vis={heroVis} />
        <Marquee />
        <Projects onOpen={setModalProj} />
        <About />
        <Services onOpen={setModalServ} />
        <Process />
        <Marquee />
        <Testimonials />
        <Contact onOpenMentions={() => setShowMentions(true)} onOpenPrivacy={() => setShowPrivacy(true)} />
        <Modal open={!!modalProj} onClose={() => setModalProj(null)}>{modalProj && <ProjectModalContent p={modalProj} />}</Modal>
        <Modal open={!!modalServ} onClose={() => setModalServ(null)}>{modalServ && <ServiceModalContent s={modalServ} />}</Modal>
        <Modal open={showMentions} onClose={() => setShowMentions(false)}><MentionsLegalesContent /></Modal>
        <Modal open={showPrivacy} onClose={() => setShowPrivacy(false)}><PolitiqueConfidentialiteContent /></Modal>
        {cookieConsent === null && <CookieBanner onAccept={handleCookieAccept} onRefuse={handleCookieRefuse} onOpenPrivacy={() => setShowPrivacy(true)} />}
      </>}
    </div>
  );
}
