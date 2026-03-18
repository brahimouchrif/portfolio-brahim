# Déploiement Portfolio — brahimouchrif.dev

## Tout est prêt, voici les étapes dans l'ordre :

---

## ÉTAPE 1 : Installer les outils (une seule fois)

### 1.1 — Installer Node.js
Va sur https://nodejs.org et télécharge la version LTS.
Vérifie l'installation :
```bash
node --version    # doit afficher v18+ ou v20+
npm --version     # doit afficher 9+
```

### 1.2 — Installer Git
Va sur https://git-scm.com et installe Git.
```bash
git --version     # doit afficher 2.x+
```

### 1.3 — Créer un compte Vercel
Va sur https://vercel.com et inscris-toi avec ton compte GitHub (gratuit).

### 1.4 — Créer un compte GitHub
Si pas déjà fait : https://github.com (gratuit).

---

## ÉTAPE 2 : Préparer le projet

### 2.1 — Décompresser le ZIP
Décompresse `portfolio-brahim.zip` où tu veux sur ton ordi.

### 2.2 — Ouvrir le terminal dans le dossier
```bash
cd portfolio-brahim
```

### 2.3 — Installer les dépendances
```bash
npm install
```

### 2.4 — Tester en local
```bash
npm run dev
```
Ouvre http://localhost:5173 — tu devrais voir ton site.
Ctrl+C pour arrêter.

---

## ÉTAPE 3 : Créer le repo GitHub

### 3.1 — Initialiser Git
```bash
git init
git add .
git commit -m "Portfolio Brahim Ouchrif — v1"
```

### 3.2 — Créer un repo sur GitHub
- Va sur https://github.com/new
- Nom : `portfolio-brahim`
- Visibilité : Public ou Private (au choix)
- Ne coche RIEN d'autre
- Clique "Create repository"

### 3.3 — Pusher le code
GitHub te donne les commandes, ça ressemble à :
```bash
git remote add origin https://github.com/TON-USERNAME/portfolio-brahim.git
git branch -M main
git push -u origin main
```

---

## ÉTAPE 4 : Déployer sur Vercel

### 4.1 — Connecter le projet
- Va sur https://vercel.com/dashboard
- Clique **"Add New..."** → **"Project"**
- Clique **"Import Git Repository"**
- Sélectionne `portfolio-brahim`
- Vercel détecte automatiquement Vite

### 4.2 — Configuration (vérifier)
- **Framework Preset** : Vite
- **Build Command** : `npm run build`
- **Output Directory** : `dist`
- Clique **"Deploy"**

### 4.3 — Attendre 30 secondes
Vercel build et déploie ton site. Tu obtiens une URL temporaire genre :
`portfolio-brahim-xxx.vercel.app`

Vérifie que tout marche !

---

## ÉTAPE 5 : Acheter et connecter le domaine

### Option A : Acheter sur Vercel (le plus simple)
- Dans ton projet Vercel → **Settings** → **Domains**
- Tape `brahimouchrif.dev`
- Vercel te propose de l'acheter directement (~16-18€/an)
- Paye → c'est automatiquement configuré → terminé !

### Option B : Acheter sur Cloudflare (moins cher)
1. Va sur https://dash.cloudflare.com → **Registrar** → **Register Domain**
2. Cherche `brahimouchrif.dev` → achète (~12€/an)
3. Dans Vercel → **Settings** → **Domains** → ajoute `brahimouchrif.dev`
4. Vercel te donne des records DNS à configurer :
   - Un record **A** : `76.76.21.21`
   - Un record **CNAME** pour www : `cname.vercel-dns.com`
5. Va dans Cloudflare → **DNS** → ajoute ces records
6. Attends 5-30 minutes pour la propagation DNS

### Pour les deux options, ajoute aussi :
- `brahimouchrif.dev` (sans www)
- `www.brahimouchrif.dev` (avec www, redirige vers sans www)

---

## ÉTAPE 6 : Vérifications post-déploiement

### 6.1 — Tester le site
- [ ] Le site charge sur https://brahimouchrif.dev
- [ ] Le HTTPS fonctionne (cadenas vert)
- [ ] Le loader cinématique apparaît
- [ ] Toutes les sections fonctionnent
- [ ] Le menu mobile marche
- [ ] Le formulaire de contact envoie les emails
- [ ] Le site est responsive (teste sur ton téléphone)

### 6.2 — Google Search Console
- Va sur https://search.google.com/search-console
- Ajoute `brahimouchrif.dev`
- Vérifie la propriété (Vercel ou Cloudflare facilitent ça)
- Soumets le sitemap : `https://brahimouchrif.dev/sitemap.xml`

### 6.3 — Tester le SEO
- https://pagespeed.web.dev — teste la performance
- https://search.google.com/test/rich-results — teste les données structurées
- https://cards-dev.twitter.com/validator — teste la Twitter Card
- https://developers.facebook.com/tools/debug/ — teste l'Open Graph

---

## ÉTAPE 7 : Mises à jour futures

À chaque modification du site :
```bash
# Modifie tes fichiers dans src/Portfolio.jsx
git add .
git commit -m "description de la modif"
git push
```
Vercel redéploie automatiquement en ~30 secondes !

---

## Résumé des coûts

| Quoi                     | Prix         |
|--------------------------|-------------|
| Domaine brahimouchrif.dev | ~12-18€/an  |
| Hébergement Vercel       | Gratuit      |
| SSL / HTTPS              | Gratuit      |
| CDN mondial              | Gratuit      |
| Déploiement auto         | Gratuit      |
| **Total**                | **~12-18€/an** |

---

## Structure du projet

```
portfolio-brahim/
├── index.html              ← Page HTML avec tout le SEO
├── package.json            ← Dépendances npm
├── vite.config.js          ← Configuration Vite
├── vercel.json             ← Config Vercel (headers, cache, rewrites)
├── .gitignore              ← Fichiers à ignorer par Git
├── public/
│   ├── favicon.svg         ← Favicon logo B gradient
│   ├── robots.txt          ← Instructions crawlers
│   ├── sitemap.xml         ← Plan du site pour Google
│   └── site.webmanifest    ← Manifest PWA
└── src/
    ├── main.jsx            ← Point d'entrée React
    └── Portfolio.jsx       ← Ton portfolio complet
```

---

## En cas de problème

- **Build fail** : vérifie que `npm install` a marché
- **Page blanche** : ouvre la console navigateur (F12) pour voir l'erreur
- **DNS pas encore propagé** : attends jusqu'à 48h (rare, souvent 5-30 min)
- **Emails ne s'envoient pas** : vérifie que ton Gmail est bien connecté dans Claude.ai

Bon déploiement ! 🚀
