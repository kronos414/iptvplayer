# IPTV App — React + PWA → APK

App IPTV React simple. Fetch les listes M3U depuis iptv-org et les joue.

## 1. Tester en local

```bash
npm install
npm run dev
```

Ouvre http://localhost:5173

## 2. Déployer sur Vercel (gratuit)

1. Va sur https://vercel.com et connecte-toi avec GitHub
2. Push ce dossier sur un repo GitHub
3. Sur Vercel : **New Project** → sélectionne ton repo → **Deploy**
4. En 2 minutes tu as une URL : `https://iptv-app-xxx.vercel.app`

## 3. Générer l'APK avec PWABuilder

1. Va sur **https://www.pwabuilder.com**
2. Colle ton URL Vercel
3. Clique **Start** → PWABuilder analyse ton site
4. Clique **Package For Stores** → **Android** → **Generate Package**
5. Télécharge le ZIP → dedans il y a l'APK (signé et prêt à installer)

C'est tout. Pas de Gradle, pas d'Android Studio, pas de GitHub Actions.

## Icônes

Avant de builder, remplace `public/icon-192.png` et `public/icon-512.png` par tes propres logos (même tailles). Tu peux générer ces deux fichiers gratuitement sur https://realfavicongenerator.net.
