// ============================================
// 1. Animation au scroll : les cartes apparaissent
// ============================================
const elements = document.querySelectorAll('.reveal');

const observateur = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // On arrête d'observer une fois affiché (animation une seule fois)
      observateur.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });  // déclenche quand 20% visible

elements.forEach((el) => observateur.observe(el));


// ============================================
// 2. Effet sur la navbar quand on scrolle
// ============================================
const nav = document.querySelector('nav');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    nav.style.boxShadow = '0 4px 12px rgba(0,0,0,0.12)';
  } else {
    nav.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)';
  }
});


// ============================================
// 3. Animation d'apparition des cartes en délai
// ============================================
// Chaque carte apparaît un peu après la précédente
document.querySelectorAll('.carte').forEach((carte, index) => {
  carte.style.transitionDelay = `${index * 0.15}s`;
});


// ============================================
// 4. Galeries d'images par projet
//    Pour ajouter un projet : ajouter une entrée ici
//    puis data-galerie="cle" sur sa carte dans index.html
// ============================================
const GALERIES = {
  robot: {
    titre: 'Robot Mobile — STM32, Bluetooth et supervision IoT',
    intro: 'Robot mobile à 4 roues piloté par une carte STM32F407 Discovery, avec commande sans fil et remontée des mesures vers le cloud.',
    images: [
      {
        src: 'robot.jpg',
        titre: '1. Carte de commande STM32F407 Discovery',
        desc: 'Vue de dessus du robot : la carte STM32F407 Discovery, au centre, pilote l\'ensemble du châssis. Elle génère les signaux PWM des moteurs, communique avec le module Bluetooth (USART) et lit les capteurs en temps réel. Tout le câblage a été réalisé à la main.',
        cover: true
      },
      {
        src: 'robott.jpg',
        titre: '2. Châssis, pilote moteur et capteurs',
        desc: 'Autre vue du robot : le châssis 4 roues avec ses emplacements pour les capteurs (détection d\'obstacles, signaux gauche et droite), le pilote de moteurs (carte rouge) et le module Bluetooth en haut. Les fils relient chaque module aux broches de la STM32.',
        cover: true
      },
      {
        src: 'thingspeak.jpg',
        titre: '3. Supervision sur ThingSpeak',
        desc: 'Tableau de bord ThingSpeak alimenté en WiFi par le robot. Les trois premiers graphiques affichent les canaux ADC (CH10, CH11, CH12) acquis en temps réel, et un quatrième champ est dédié à la température.'
      }
    ]
  },
  tri: {
    titre: 'Tri de Pièces par Couleur — Simulation Factory I/O',
    intro: 'Cellule industrielle simulée sous Factory I/O et pilotée par un automate Siemens S7-PLCSIM programmé sur TIA Portal.',
    images: [
      {
        src: 'rotation.png',
        titre: '1. Bras Pick & Place à 2 axes',
        desc: 'Le bras à deux axes se déplace en X et Z, saisit la pièce sur le convoyeur et la fait pivoter dans le sens horaire ou antihoraire pour la positionner correctement. Les capteurs et les signaux d\'encodeur du convoyeur informent l\'automate de la position des pièces.'
      },
      {
        src: 'marquage.png',
        titre: '2. Saisie et marquage des pièces',
        desc: 'Le bras descend (MOVE Z) et saisit la pièce (GRAB) sur le convoyeur. Les pièces passent ensuite par le poste de marquage, à droite de l\'image, avant d\'être déposées.'
      },
      {
        src: 'final.png',
        titre: '3. Dépose en caisses et évacuation',
        desc: 'Les pièces triées par couleur sont déposées dans les caisses correspondantes. Les convoyeurs à rouleaux évacuent ensuite les caisses vers la zone de stockage : le processus est complet, de la détection à l\'emballage.'
      }
    ]
  },
  garment: {
    titre: 'Garment Measurement — Comparaison Standard vs Production',
    intro: 'Interface de contrôle : le vêtement de référence (Display 1) est comparé au vêtement contrôlé (Display 2) avec une tolérance réglable.',
    images: [
      {
        src: 'garment-measurement.png',
        titre: 'Comparaison Standard (référence) vs Production (contrôle)',
        desc: 'Display 1 : le pantalon de référence est mesuré avec une caméra calibrée, et les mesures sont exactes (ceinture 24,1 cm, longueur 65,8 cm, entrejambe 48,5 cm). Display 2 : le pantalon contrôlé est filmé avec une caméra de téléphone. Le panneau de droite compare chaque mesure à la référence avec une tolérance de ±0,2 cm et affiche NC (non conforme) quand l\'écart la dépasse.',
        note: 'Cette capture vient d\'un test en conditions réelles, pas de la production. La caméra du téléphone n\'était pas calibrée : les mesures du Display 2 sont donc démesurées (longueur 829 cm) et marquées NC. Une fois la caméra calibrée (conversion pixel/cm), les mesures deviennent correctes, avec une précision de ±0,3 cm.'
      }
    ]
  },
  ticket: {
    titre: 'Ticket Detection — Scanner Fiche Production',
    intro: 'Parcours complet de l\'application : de l\'identification de l\'opérateur jusqu\'aux résultats extraits.',
    images: [
      {
        src: 'authentification.png',
        titre: '1. Identification de l\'opérateur',
        desc: 'Écran d\'accueil : l\'opérateur renseigne son nom, son matricule et, en option, son téléphone avant de scanner. Chaque scan est ainsi associé à son auteur pour la traçabilité. Le badge « Base connectée » confirme la liaison avec SQL Server.'
      },
      {
        src: 'camerasplit.png',
        titre: '2. Import ou capture caméra',
        desc: 'Deux modes d\'acquisition : déposer une image (JPEG, PNG, BMP) par glisser-déposer, ou capturer la fiche en direct avec la caméra. Le bandeau utilisateur, l\'historique des scans et le changement d\'utilisateur sont accessibles depuis cet écran.'
      },
      {
        src: 'yolo.png',
        titre: '3. Détection YOLO11 sur la fiche',
        desc: 'Le modèle YOLO11 localise les zones utiles du bon de préparation : numéro de préparation (rouge), codes-barres articles et cases cochées (vert), quantités (bleu). Les valeurs lues par l\'OCR DocTR s\'affichent à droite, regroupées par champ.'
      },
      {
        src: 'detection.png',
        titre: '4. Vue comparée des colonnes',
        desc: 'Résultats structurés en quatre colonnes : Préparation, Article, Quantité et Case. Des compteurs résument le scan (lignes totales, champs actifs, cases cochées) ainsi que le temps de traitement, avant l\'enregistrement dans SQL Server.'
      }
    ]
  }
};

const galerie = document.getElementById('galerie');
const galerieTitre = galerie.querySelector('.galerie-titre');
const galerieIntro = galerie.querySelector('.galerie-intro');
const galerieListe = galerie.querySelector('.galerie-liste');
let derniereCarte = null;

function ouvrirGalerie(cle, carte) {
  const g = GALERIES[cle];
  if (!g) return;
  derniereCarte = carte;
  galerieTitre.textContent = g.titre;
  galerieIntro.textContent = g.intro || '';
  galerieListe.innerHTML = '';
  galerieListe.classList.toggle('unique', g.images.length === 1);

  g.images.forEach((img) => {
    const fig = document.createElement('figure');
    fig.className = 'galerie-item';

    const lien = document.createElement('a');
    lien.href = img.src;
    lien.target = '_blank';
    lien.rel = 'noopener';
    lien.title = 'Ouvrir en grand';

    const image = document.createElement('img');
    image.src = img.src;
    image.alt = img.titre;
    image.loading = 'lazy';
    if (img.cover) image.classList.add('cover');
    lien.appendChild(image);

    const legende = document.createElement('figcaption');
    const t = document.createElement('h4');
    t.textContent = img.titre;
    const d = document.createElement('p');
    d.textContent = img.desc;
    legende.append(t, d);
    if (img.note) {
      const n = document.createElement('p');
      n.className = 'galerie-note';
      n.textContent = img.note;
      legende.appendChild(n);
    }

    fig.append(lien, legende);
    galerieListe.appendChild(fig);
  });

  galerie.hidden = false;
  document.body.classList.add('galerie-ouverte');
  galerie.querySelector('.galerie-boite').scrollTop = 0;
  galerie.querySelector('.galerie-fermer').focus();
}

function fermerGalerie() {
  galerie.hidden = true;
  document.body.classList.remove('galerie-ouverte');
  if (derniereCarte) derniereCarte.focus();
}

galerie.querySelectorAll('[data-fermer]').forEach((el) => el.addEventListener('click', fermerGalerie));
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !galerie.hidden) fermerGalerie();
});

// ============================================
// 5. Clic sur une carte projet :
//    - avec galerie -> ouvre les images
//    - sans galerie -> ouvre/ferme les détails (tactile)
// ============================================
document.querySelectorAll('.carte-projet').forEach((carte) => {
  const action = () => {
    if (carte.dataset.galerie) {
      ouvrirGalerie(carte.dataset.galerie, carte);
      return;
    }
    const dejaOuverte = carte.classList.contains('open');
    document.querySelectorAll('.carte-projet.open').forEach((c) => {
      if (c !== carte) c.classList.remove('open');
    });
    carte.classList.toggle('open', !dejaOuverte);
  };
  carte.addEventListener('click', action);
  carte.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      action();
    }
  });
});