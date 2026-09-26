// 1. Scroll Reveal Animation
const elements = document.querySelectorAll('.reveal');
const observateur = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observateur.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 }); 
elements.forEach((el) => observateur.observe(el));

// 2. Navbar Shadow on Scroll
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    nav.style.boxShadow = '0 4px 12px rgba(0,0,0,0.12)';
  } else {
    nav.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)';
  }
});

// 3. Staggered Card Animation
document.querySelectorAll('.carte').forEach((carte, index) => {
  carte.style.transitionDelay = `${index * 0.15}s`;
});

// 3b. Mouse-tracked spotlight highlight on cards
document.querySelectorAll('.carte').forEach((carte) => {
  carte.addEventListener('mousemove', (e) => {
    const rect = carte.getBoundingClientRect();
    carte.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    carte.style.setProperty('--my', `${e.clientY - rect.top}px`);
  });
});
// 4. Project Image Galleries
const GALERIES = {
  cnc: {
    titre: 'Industrial CNC Plasma Cutter Retrofit',
    intro: 'Complete electromechanical retrofit converting a manual metalworking gantry into a multi-axis CNC machine.',
    images: [
      {
        src: 'cnc-machine.png', /* REPLACE WITH ACTUAL FILE NAME */
        titre: '1. Heavy-Duty Steel Gantry',
        desc: 'The physical machine featuring timing belts, guide rails, and cable drag chains integrated for multi-axis plasma cutting.',
        cover: true
      },
      {
        src: 'mach3.png', /* REPLACE WITH ACTUAL FILE NAME */
        titre: '2. Mach3 Control Interface',
        desc: 'Configured Mach3 software executing custom G-code with Torch Height Control (THC) for precision metal fabrication.'
      }
    ]
  },
  cmr: {
    titre: 'Marine Basin Automation — Siemens HMI',
    intro: 'Modernized a legacy ship repair basin by replacing manual valves with an automated PLC and HMI architecture.',
    images: [
      {
        src: 'old-board.png', /* REPLACE WITH ACTUAL FILE NAME */
        titre: '1. Legacy Manual Control Board',
        desc: 'The original analog system using physical gauges, hand-painted valve diagrams, and marker notes to control water levels.'
      },
      {
        src: 'tia-portal.png', /* REPLACE WITH ACTUAL FILE NAME */
        titre: '2. Modern SIMATIC TP700 HMI',
        desc: 'The digitized SCADA interface built in TIA Portal, allowing real-time, precise orchestration of pumps and valves based on automated PLC logic.',
        cover: true
      }
    ]
  },
  robot: {
    titre: 'Intelligent Mobile Robot — STM32 & IoT Telemetry',
    intro: '4-wheel mobile robotics platform controlled by an STM32F407 Discovery board, featuring wireless communication and real-time cloud data logging.',
    images: [
      {
        src: 'robot.jpg',
        titre: '1. STM32F407 Discovery Control Board',
        desc: 'Top view of the robot chassis. The STM32F407 board acts as the central controller, generating PWM signals for motor drivers, communicating via USART for Bluetooth, and acquiring real-time sensor data.',
        cover: true
      },
      {
        src: 'robott.jpg',
        titre: '2. Chassis, Motor Drivers, and Sensors',
        desc: 'Detailed view showing the custom hand-wired integration of obstacle detection sensors, the L298N motor driver module (red board), and the Bluetooth communication module.',
        cover: true
      },
      {
        src: 'thingspeak.jpg',
        titre: '3. IoT Cloud Monitoring via ThingSpeak',
        desc: 'Real-time dashboard displaying telemetry data sent from the robot via WiFi. The charts track live ADC channels (CH10, CH11, CH12) and ambient temperature metrics.'
      }
    ]
  },
  tri: {
    titre: 'Color Sorting Pick & Place — Factory I/O Simulation',
    intro: 'Industrial workcell simulated in Factory I/O and controlled by a Siemens S7-PLCSIM programmed via TIA Portal.',
    images: [
      {
        src: 'rotation.png',
        titre: '1. 2-Axis Pick & Place Arm',
        desc: 'The robotic arm navigates the X and Z axes, grabs items from the conveyor, and rotates them based on spatial orientation requirements. Encoders provide precise positioning data to the PLC.'
      },
      {
        src: 'marquage.png',
        titre: '2. Part Stamping & Manipulation',
        desc: 'The arm executes a Z-axis drop to secure the part. Items are then routed through a pneumatic stamping station (visible on the right) before final sorting.'
      },
      {
        src: 'final.png',
        titre: '3. Automated Sorting & Packaging',
        desc: 'Parts are sorted strictly by color profile and deposited into designated shipping boxes. Roller conveyors automatically evacuate full boxes, completing the automated production cycle.'
      }
    ]
  },
  garment: {
    titre: 'Industrial Garment Measurement System',
    intro: 'Quality control interface comparing reference garments to production items utilizing real-time AI spatial measurement.',
    images: [
      {
        src: 'garment-measurement.png',
        titre: 'Real-time Tolerance Checking',
        desc: 'The system uses YOLO11-Pose and OpenCV multi-camera calibration to measure key garment dimensions (waist, length, inseam) and instantly flags deviations beyond a ±0.3 cm threshold. (Note: You can replace this image with a GIF of the AI working!)'
      }
    ]
  },
  ticket: {
    titre: 'Production Ticket Scanner — Automated Data Extraction',
    intro: 'Complete end-to-end application workflow: from operator authentication to extracted SQL data.',
    images: [
      {
        src: 'authentification.png',
        titre: '1. Operator Authentication',
        desc: 'Login interface requiring operator ID and credentials to ensure full production traceability. The system verifies SQL Server database connectivity before granting access.'
      },
      {
        src: 'camerasplit.png',
        titre: '2. Image Acquisition',
        desc: 'Dual-mode input system allowing operators to upload existing scans (JPEG, PNG) via drag-and-drop or capture live production sheets using an integrated camera feed.'
      },
      {
        src: 'yolo.png',
        titre: '3. YOLO11 Bounding Box Detection',
        desc: 'YOLO11 inference identifies critical data zones on the sheet: prep numbers (red), barcodes (green), and quantities (blue). DocTR OCR then extracts the exact text from these bounding boxes.'
      },
      {
        src: 'detection.png',
        titre: '4. Structured Data Output',
        desc: 'Processed data is cleaned and displayed in a structured table containing Prep Code, Item ID, and Quantity. Real-time metrics show processing latency before the data is committed to the SQL database.'
      }
    ]
  },
  leoni: {
    titre: 'LEONI Factory Visit',
    intro: 'Industrial visit exploring automated wiring harness production lines and lean manufacturing processes.',
    images: [
      {
        src: 'leoni.jpg',
        titre: 'LEONI Factory Floor',
        desc: 'Group visit at LEONI exploring advanced industrial quality control and manufacturing workflows.'
      }
    ]
  },
  nexans: {
    titre: 'Nexans Industrial Visit',
    intro: 'Exploring heavy machinery automation and cable manufacturing pipelines.',
    images: [
      {
        src: 'nexan.jpg',
        titre: 'Nexans Production Site',
        desc: 'Observing strict industrial safety standards and automated machinery on the factory floor.'
      }
    ]
  },
  st: {
    titre: 'STMicroelectronics Visit',
    intro: 'Gaining firsthand exposure to semiconductor manufacturing and edge computing hardware.',
    images: [
      {
        src: 'st.jpg',
        titre: 'STMicroelectronics Cleanrooms',
        desc: 'Exploring microelectronics production environments and advanced semiconductor workflows.'
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
    lien.title = 'Open full size';

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

// 5. Gallery Card Click Handlers (Projects & Events)
document.querySelectorAll('.carte-projet, .carte-event[data-galerie]').forEach((carte) => {
  const action = (e) => {
    // If user clicks the github link, let them go to github, don't open the modal
    if (e && e.target.classList.contains('repo-link')) return; 

    if (carte.dataset.galerie) {
      ouvrirGalerie(carte.dataset.galerie, carte);
      return;
    }
    
    // Only apply accordion logic to project cards that don't have a gallery
    if (carte.classList.contains('carte-projet')) {
      const dejaOuverte = carte.classList.contains('open');
      document.querySelectorAll('.carte-projet.open').forEach((c) => {
        if (c !== carte) c.classList.remove('open');
      });
      carte.classList.toggle('open', !dejaOuverte);
    }
  };
  
  carte.addEventListener('click', action);
  carte.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      if (e.target.classList.contains('repo-link')) return; 
      e.preventDefault();
      action();
    }
  });
});