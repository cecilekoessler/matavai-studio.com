
import { FormEvent, PointerEvent, useEffect, useRef, useState, useCallback } from "react";
import { createPortal } from "react-dom";

type Filter = "Tout" | "Identités" | "Affiches" | "Édition & print" | "Sites web" | "Audit de communication" | "Signalétique & packaging";

type WebsiteCase = {
  name: string;
  discipline: string;
  description: string;
  images: string[];
  url: string;
  urlLabel: string;
  secondaryUrl?: string;
  secondaryLabel?: string;
};

type Project = {
  id: string;
  name: string;
  discipline: string;
  filter: Exclude<Filter, "Tout">;
  categoryLabel?: string;
  deliverables?: string;
  request?: string;
  response?: string;
  images?: string[];
  previewImage?: string;
  previewDevice?: boolean;
  logoGroups?: { name: string; images: string[] }[];
  editionGroups?: { name: string; category: string; meta: string; images: string[] }[];
  visualGroups?: { name: string; description: string; images: string[] }[];
  galleryFocus?: boolean;
  cropCover?: boolean;
  publications?: { src: string; title: string; cover: string; alt: string; note?: string }[];
  websiteCases?: WebsiteCase[];
  website?: { rebuild: string; current: string };
  documents?: { label: string; href: string }[];
  url?: string;
  urlLabel?: string;
  secondaryUrl?: string;
  secondaryLabel?: string;
  tone: string;
};

const projects: Project[] = [
  {
    id: "01",
    name: "Sites web",
    discipline: "Identité, conception & réalisation web",
    filter: "Sites web",
    categoryLabel: "Design numérique",
    request: "Créer des expériences numériques claires, sensibles et adaptées à l’identité comme aux usages de chaque activité.",
    response: "Trois univers sur mesure, conçus pour être fluides sur ordinateur comme sur mobile, faciliter la découverte des services et conduire naturellement vers la prise de contact.",
    previewImage: "/projects/site-web-preview.png",
    websiteCases: [
      { name: "Aura Estate & Care", discipline: "Identité, conception & réalisation web", description: "Une présence numérique sobre et lumineuse qui hiérarchise les services immobiliers et facilite la prise de contact.", images: ["/projects/01-aura-estate-home.png", "/projects/01-aura-estate-mobile.png", "/projects/01-aura-estate-hero.webp", "/projects/01-aura-estate-detail.webp"], url: "https://aura-estate.net/", urlLabel: "Visiter le site" },
      { name: "Alma Kinesio", discipline: "Identité & site trilingue", description: "Un site apaisant en français, espagnol et anglais, structuré autour de la pratique, des motifs de consultation et du parcours de la praticienne.", images: ["/projects/25-alma-home.png", "/projects/25-alma-mobile.png", "/projects/25-alma-approach.png", "/projects/25-alma-services.png"], url: "https://almakinesio.com/", urlLabel: "Visiter le site", secondaryUrl: "https://calendly.com/laetitia-almakinesio/30min", secondaryLabel: "Prendre rendez-vous" },
      { name: "Seto Yacht Charter", discipline: "Refonte & prototype trilingue · En cours", description: "Une reconstruction maritime immersive qui simplifie les parcours et donne une place centrale aux bateaux, aux îles et aux photographies.", images: ["/projects/24-seto-home.png", "/projects/24-seto-mobile.png", "/projects/24-seto-cruises.png", "/projects/24-seto-islands.png"], url: "https://seto-yacht-charter.netlify.app/", urlLabel: "Voir la reconstruction", secondaryUrl: "https://www.seto-yacht-charter.jp/en/", secondaryLabel: "Voir le site actuel" },
    ],
    tone: "#dcebe7",
  },
  {
    id: "26",
    name: "Audit de votre communication",
    discipline: "Diagnostic, analyse & recommandations",
    filter: "Audit de communication",
    request: "Prendre du recul sur les supports existants, identifier ce qui fonctionne et repérer les points qui freinent la clarté, la cohérence ou l’engagement.",
    response: "Un audit illustré et directement exploitable, qui met en évidence les forces, les axes d’amélioration et des propositions concrètes pour faire évoluer la communication.",
    publications: [
      { src: "/flipbooks/audit/index.html?v=2", title: "Diagnostic Facebook · Matavai Studio", cover: "/projects/26-audit-facebook-preview.webp?v=2", alt: "Couverture du diagnostic Facebook réalisé par Matavai Studio" },
    ],
    previewImage: "/projects/audit-preview.png",
    tone: "#f0eadf",
  },
  {
    id: "27",
    name: "Livres & éditions",
    discipline: "Direction artistique, conception éditoriale & mise en page",
    filter: "Édition & print",
    request: "Donner à chaque ouvrage une identité éditoriale singulière, adaptée à son lectorat, à son format et à son univers littéraire.",
    response: "Un travail complet sur les couvertures, les rythmes de lecture, les doubles pages et les détails graphiques, de la poésie aux livres jeunesse et au roman illustré.",
    previewImage: "/projects/27-abc-tahiti-madame-k.jpg",
    images: ["/projects/27-alentours-lointains-madame-k.jpg", "/projects/27-abc-tahiti-madame-k.jpg", "/projects/27-compter-tahiti-couverture-madame-k.jpg", "/projects/27-compter-tahiti-nombres-madame-k.jpg", "/projects/27-compter-tahiti-doubles-pages-madame-k.jpg", "/projects/27-revoltes-bounty-couverture-madame-k.jpg", "/projects/27-revoltes-bounty-carte.png", "/projects/27-revoltes-bounty-lexique-madame-k.jpg", "/projects/27-revoltes-bounty-interieur-madame-k.jpg", "/projects/27-revoltes-bounty-encres-madame-k.jpg", "/projects/27-marama-iterai-madame-k.jpg"],
    editionGroups: [
      { name: "Alentours lointains", category: "Poésie", meta: "Marie Noëlle Frémy · Éditions d’Encre & d’Écume · 2014 · 124 pages", images: ["/projects/27-alentours-lointains-madame-k.jpg"] },
      { name: "L’ABC de Tahiti et des îles du Pacifique", category: "Jeunesse", meta: "Abécédaire · Les Éditions Présumées", images: ["/projects/27-abc-tahiti-madame-k.jpg"] },
      { name: "Compter à Tahiti", category: "Jeunesse", meta: "Et dans les îles du Pacifique · Les Éditions Présumées · 2013", images: ["/projects/27-compter-tahiti-couverture-madame-k.jpg", "/projects/27-compter-tahiti-nombres-madame-k.jpg", "/projects/27-compter-tahiti-doubles-pages-madame-k.jpg"] },
      { name: "Les Révoltés de la Bounty", category: "Roman illustré", meta: "Jules Verne · Encres de Jonathan Mencarelli · Les Éditions Présumées · 2013", images: ["/projects/27-revoltes-bounty-couverture-madame-k.jpg", "/projects/27-revoltes-bounty-carte.png", "/projects/27-revoltes-bounty-lexique-madame-k.jpg", "/projects/27-revoltes-bounty-interieur-madame-k.jpg", "/projects/27-revoltes-bounty-encres-madame-k.jpg"] },
      { name: "Marama Iterai", category: "Roman", meta: "Marie Geoffroy · Éditions d’Encre & d’Écume · 2015", images: ["/projects/27-marama-iterai-madame-k.jpg"] },
    ],
    tone: "#eee8dd",
  },
  {
    id: "03",
    name: "Holopuni Va’a",
    discipline: "Identité & campagnes événementielles · 2017–2019",
    filter: "Affiches",
    categoryLabel: "Communication événementielle",
    request: "Donner une identité forte à plusieurs rendez-vous nautiques en traduisant leur énergie sportive, leurs itinéraires et leur ancrage polynésien.",
    response: "Un univers illustré décliné de la recherche graphique aux campagnes finales, avec des formats adaptés à l’affichage, aux réseaux sociaux et aux partenaires.",
    previewImage: "/projects/03-holopuni-affiche-2019.jpg",
    images: ["/projects/03-holopuni-affiche-2017.jpg", "/projects/03-holopuni-affiche-2018.jpg", "/projects/03-holopuni-affiche-2018-tane.png", "/projects/03-holopuni-affiche-2018-vahine.png", "/projects/03-holopuni-affiche-2019.jpg", "/projects/03-holopuni-ocean-day.jpg", "/projects/03-holopuni-reseaux-2018-banniere.png", "/projects/03-holopuni-reseaux-2019-banniere.png", "/projects/03-holopuni-croquis-illustration.jpg", "/projects/03-holopuni-rose-vents-epuree-brun.png", "/projects/03-holopuni-element-identite-2019.jpg", "/projects/03-holopuni-carte-2018.jpg", "/projects/03-holopuni-partenaires-2018.jpg", "/projects/03-holopuni-partenaires-2019.png"],
    visualGroups: [
      { name: "Affiches finales", description: "Les visuels principaux des éditions 2017, 2018 et 2019, dont les deux affiches individuelles issues du duo 2018, complétés par l’affiche créée pour la Journée mondiale de l’océan.", images: ["/projects/03-holopuni-affiche-2017.jpg", "/projects/03-holopuni-affiche-2018.jpg", "/projects/03-holopuni-affiche-2018-tane.png", "/projects/03-holopuni-affiche-2018-vahine.png", "/projects/03-holopuni-affiche-2019.jpg", "/projects/03-holopuni-ocean-day.jpg"] },
      { name: "Visuels pour les réseaux sociaux", description: "Deux formats horizontaux conçus pour annoncer les éditions 2018 et 2019 sur les supports numériques.", images: ["/projects/03-holopuni-reseaux-2018-banniere.png", "/projects/03-holopuni-reseaux-2019-banniere.png"] },
      { name: "Croquis préparatoires", description: "La première recherche d’illustration et une rose des vents tahitienne épurée.", images: ["/projects/03-holopuni-croquis-illustration.jpg", "/projects/03-holopuni-rose-vents-epuree-brun.png"] },
      { name: "Éléments séparés & déclinaisons", description: "L’identité isolée, la carte de parcours et les panneaux partenaires utilisés pour adapter la campagne à chaque support.", images: ["/projects/03-holopuni-element-identite-2019.jpg", "/projects/03-holopuni-carte-2018.jpg", "/projects/03-holopuni-partenaires-2018.jpg", "/projects/03-holopuni-partenaires-2019.png"] },
    ],
    tone: "#d8f3f5",
  },
  { id: "04", name: "Foodeez × Milka", discipline: "Affiches de concours", filter: "Affiches", request: "Annoncer un concours gourmand en respectant l’univers joyeux et immédiatement identifiable de Milka.", response: "Deux visuels promotionnels généreux, pensés pour capter rapidement l’attention et rendre la mécanique du concours accessible.", images: ["/projects/03-milka-1.jpg", "/projects/03-milka-2.jpg"], tone: "#e9e1f5" },
  { id: "05", name: "Flyers & autres supports promotionnels", discipline: "Flyers, presse & campagnes", filter: "Édition & print", deliverables: "Supports promotionnels", request: "Concevoir des supports promotionnels adaptés à différents formats, avec un message immédiatement lisible et une identité propre à chaque annonceur.", response: "Une sélection de flyers, cartes de visite, encarts et catalogues présentés individuellement pour mieux apprécier leur composition, leur hiérarchie et leur adaptation au contexte de diffusion.", previewImage: "/projects/05-cartes-visite-kinesiologie.png", galleryFocus: true, images: ["/projects/05-cartes-visite-kinesiologie.png", "/projects/05-flyer-kinesiologie-francais.png", "/projects/05-flyer-kinesiologie-espagnol.png", "/projects/05-promotion-lessive-super-croix-2021-2022.png", "/projects/05-promotion-lessive-hyper-u-urne-2020.png", "/projects/05-promotion-lessive-super-u-2020.png", "/projects/22-encart-01.jpg", "/projects/22-encart-02.jpg", "/projects/22-encart-03.jpg", "/projects/22-encart-04.jpg", "/projects/22-encart-05.jpg", "/projects/22-encart-06.jpg", "/projects/22-encart-07.jpg", "/projects/22-encart-08.jpg", "/projects/22-encart-09.jpg"], publications: [{ src: "/flipbooks/hyper-u-halloween/index.html", title: "Catalogue Hyper U Tahiti · Spécial Halloween", cover: "/projects/05-hyper-u-halloween.png", alt: "Couverture orange du catalogue promotionnel Hyper U Tahiti spécial Halloween", note: "Catalogue promotionnel · 21 pages" }], tone: "#e7d7e0" },
  { id: "08", name: "Tahiti Sails", discipline: "Dossier de présentation", filter: "Édition & print", request: "Présenter l’activité et les savoir-faire de Tahiti Sails dans un document professionnel facile à parcourir.", response: "Un dossier éditorial structuré, porté par de grandes images et une mise en page qui accompagne naturellement la lecture.", images: ["/projects/08-tahiti-sails-couverture.jpg", "/projects/08-tahiti-sails-page.jpg"], tone: "#dcebf2" },
  { id: "09", name: "Villa Terupe", discipline: "Annonce presse immobilière", filter: "Affiches", request: "Valoriser une propriété dans un format presse contraint, tout en rendant les informations essentielles immédiatement accessibles.", response: "Une annonce élégante qui donne la priorité à la photographie et organise les arguments de vente dans une lecture simple.", images: ["/projects/09-villa-terupe.jpg"], tone: "#f1e6d8" },
  { id: "10", name: "Tahiti Box", discipline: "Packaging", filter: "Signalétique & packaging", request: "Créer un emballage attractif capable d’exprimer l’univers de Tahiti Box dès le premier regard.", response: "Un packaging identifiable, conçu comme un véritable support de marque et pensé pour rester lisible sur toutes ses faces.", images: ["/projects/10-tahiti-box.jpg"], tone: "#f0d6c7" },
  { id: "11", name: "Yacht Club de Tahiti", discipline: "Signalétique", filter: "Signalétique & packaging", request: "Rendre les espaces et les informations du Yacht Club plus faciles à identifier sans rompre avec son environnement nautique.", response: "Une signalétique fonctionnelle et cohérente, qui conjugue visibilité, simplicité d’usage et identité du lieu.", images: ["/projects/11-yacht-club.jpg"], tone: "#d6e8e8" },
  {
    id: "12",
    name: "Logotypes & identités",
    discipline: "Artisanat, mode, sport, immobilier & institution",
    filter: "Identités",
    request: "Donner à des structures aux activités très différentes un signe distinctif, utilisable sur leurs supports quotidiens.",
    response: "Des identités conçues au cas par cas, puis présentées selon une même lecture : le signe d’abord, ses usages et mises en situation ensuite.",
    previewImage: "/projects/12-air-water-logo.png",
    images: ["/projects/12-air-water-logo-raw.jpg", "/projects/12-air-water-logo.png", "/projects/05-bottle-shop-logo.png", "/projects/05-cave-logo.jpg", "/projects/12-bottleshop-identity.jpg", "/projects/05-cave-tamanu-identity.jpg", "/projects/12-natura-logo.png", "/projects/12-natura-application.png", "/projects/12-com-shop-logo.png", "/projects/12-com-shop-application.png", "/projects/12-exetec-logo.png", "/projects/12-exetec-application.png", "/projects/12-builtec-logo.png", "/projects/12-builtec-application.png", "/projects/12-una-logo.png", "/projects/12-una-application.png", "/projects/12-isabelle-balland-logo.png", "/projects/12-isabelle-balland-application.png", "/projects/12-heiva-mag-logo.png", "/projects/12-heiva-mag-application.png", "/projects/12-manaart-logo.png", "/projects/12-manaart-application.png", "/projects/12-matavai-studio-logo.png", "/projects/12-matavai-studio-application.png", "/projects/12-mavemai-sailing-logo.png", "/projects/12-mavemai-sailing-application.png", "/projects/12-saga-logo.png", "/projects/12-saga-application.png", "/projects/12-monogramme-geometrique-logo.png", "/projects/12-monogramme-geometrique-application.png", "/projects/12-temaaroa-logo.png", "/projects/12-temaaroa-application.png", "/projects/12-hani-kini-logo.png", "/projects/12-hani-kini-application.png", "/projects/12-keanui-logo.png", "/projects/12-keanui-application.png", "/projects/07-mata-ora-logo-new.png", "/projects/07-mata-ora-application-new.png", "/projects/12-tour-du-loup.jpg", "/projects/12-tour-du-loup-identity.jpg", "/projects/12-reva-immo-charte.jpg", "/projects/12-reva-immo-enseigne.jpg", "/projects/12-daf-logo.png", "/projects/12-daf-application.png"],
    logoGroups: [
      { name: "Air & Water", images: ["/projects/12-air-water-logo-raw.jpg", "/projects/12-air-water-logo.png"] },
      { name: "La Cave Tamanu / Bottle Shop", images: ["/projects/05-bottle-shop-logo.png", "/projects/05-cave-logo.jpg", "/projects/12-bottleshop-identity.jpg", "/projects/05-cave-tamanu-identity.jpg"] },
      { name: "Natura", images: ["/projects/12-natura-logo.png", "/projects/12-natura-application.png"] },
      { name: "Com & Shop", images: ["/projects/12-com-shop-logo.png", "/projects/12-com-shop-application.png"] },
      { name: "Exetec Ingénierie", images: ["/projects/12-exetec-logo.png", "/projects/12-exetec-application.png"] },
      { name: "Builtec Construction", images: ["/projects/12-builtec-logo.png", "/projects/12-builtec-application.png"] },
      { name: "UNA · Libres ensemble", images: ["/projects/12-una-logo.png", "/projects/12-una-application.png"] },
      { name: "Isabelle Balland", images: ["/projects/12-isabelle-balland-logo.png", "/projects/12-isabelle-balland-application.png"] },
      { name: "Heiva Mag", images: ["/projects/12-heiva-mag-logo.png", "/projects/12-heiva-mag-application.png"] },
      { name: "Mana’Art", images: ["/projects/12-manaart-logo.png", "/projects/12-manaart-application.png"] },
      { name: "Matavai Studio", images: ["/projects/12-matavai-studio-logo.png", "/projects/12-matavai-studio-application.png"] },
      { name: "Mavemai Sailing", images: ["/projects/12-mavemai-sailing-logo.png", "/projects/12-mavemai-sailing-application.png"] },
      { name: "100 % la Saga", images: ["/projects/12-saga-logo.png", "/projects/12-saga-application.png"] },
      { name: "Monogramme géométrique", images: ["/projects/12-monogramme-geometrique-logo.png", "/projects/12-monogramme-geometrique-application.png"] },
      { name: "Domaine de Tema’aroa", images: ["/projects/12-temaaroa-logo.png", "/projects/12-temaaroa-application.png"] },
      { name: "Hani Kini Swimwear", images: ["/projects/12-hani-kini-logo.png", "/projects/12-hani-kini-application.png"] },
      { name: "Keanui Créations", images: ["/projects/12-keanui-logo.png", "/projects/12-keanui-application.png"] },
      { name: "Mata Ora · L’opticien Raromatai", images: ["/projects/07-mata-ora-logo-new.png", "/projects/07-mata-ora-application-new.png"] },
      { name: "Tour du Loup", images: ["/projects/12-tour-du-loup.jpg", "/projects/12-tour-du-loup-identity.jpg"] },
      { name: "Reva Immo", images: ["/projects/12-reva-immo-charte.jpg", "/projects/12-reva-immo-enseigne.jpg"] },
      { name: "Direction des Affaires Foncières", images: ["/projects/12-daf-logo.png", "/projects/12-daf-application.png"] },
    ],
    tone: "#e3e0d6",
  },
  { id: "13", name: "Aviation civile", discipline: "Carte de vœux institutionnelle", filter: "Édition & print", request: "Imaginer une carte de vœux institutionnelle singulière, en lien avec l’univers de l’aviation civile.", response: "Une composition graphique précise et évocatrice, adaptée à une communication officielle tout en conservant une tonalité chaleureuse.", images: ["/projects/13-aviation-civile.jpg"], tone: "#e4edf4" },
  { id: "14", name: "Pāreu Pilates", discipline: "Affiche d’événement", filter: "Affiches", request: "Annoncer un événement bien-être avec une affiche douce, contemporaine et lisible au premier coup d’œil.", response: "Un visuel équilibré où la typographie, les couleurs et le rythme de la composition traduisent une pratique accessible et apaisante.", images: ["/projects/14-pareu-pilates.jpg"], tone: "#f2dedc" },
  { id: "16", name: "Lycée Don Bosco", discipline: "Communication d’établissement", filter: "Édition & print", request: "Clarifier et valoriser la communication de l’établissement auprès de ses différents publics.", response: "Des supports structurés autour d’une hiérarchie simple, afin de rendre les informations pédagogiques plus accessibles.", tone: "#eee5d4" },
  { id: "17", name: "Groupe Aline", discipline: "Service marketing", filter: "Édition & print", request: "Accompagner les besoins réguliers du service marketing avec des supports cohérents et rapidement déclinables.", response: "Une production graphique suivie, attentive à la continuité de la marque et adaptée aux différents formats de communication.", tone: "#eadde6" },
  {
    id: "18",
    name: "Magazines & publications longues",
    discipline: "Direction artistique, édition & mise en page",
    filter: "Édition & print",
    request: "Transformer une matière éditoriale dense en une publication fluide, structurée et agréable à parcourir.",
    response: "Un travail de direction artistique, de composition et de rythme typographique, pensé à l’échelle de la couverture comme de la double page.",
    publications: [
      { src: "https://cecilekoessler.github.io/magazine-polynesie/", title: "Polynésie outre-mers N° 0", cover: "/projects/18-magazine-polynesie-preview.jpg", alt: "Magazine Polynésie outre-mers présenté sur une chaise rouge" },
      { src: "https://cecilekoessler.github.io/carnet-escale/", title: "Carnet d'escale en Polynésie française 2019/2020", cover: "/projects/18-carnet-escale-preview.jpg", alt: "Carnet d’escale en Polynésie française présenté sur une chaise longue bleue" },
      { src: "https://cecilekoessler.github.io/pew-ocean/", title: "Pew Bertarelli Héritage des océans", cover: "/projects/18-pew-ocean-preview.jpg", alt: "Publication Pew Bertarelli Héritage des océans présentée sur une chaise blanche", note: "Également mis en page en anglais" },
      { src: "https://cecilekoessler.github.io/rahui-tahiti/", title: "État des lieux des rāhui et ZPR sur l'île de Tahiti", cover: "/projects/18-rahui-tahiti-preview.jpg", alt: "Publication sur les rāhui et ZPR de Tahiti présentée sur un fauteuil vert" },
      { src: "https://cecilekoessler.github.io/cinquante-projets/", title: "50 projets pour préserver nos lagons", cover: "/projects/18-cinquante-projets-preview.jpg", alt: "Publication 50 projets pour préserver nos lagons présentée sur une chaise transparente" },
      { src: "https://cecilekoessler.github.io/apport-copro/", title: "Rapport d'activité du Conseil syndical 2022-2023", cover: "/projects/18-rapport-copropriete-preview.jpg", alt: "Rapport d’activité d’un conseil syndical présenté sur une chaise de bureau noire" },
      { src: "/flipbooks/vaa/index.html", title: "Va’a, la pirogue polynésienne", cover: "/projects/18-vaa-pirogue-preview.jpg?v=2", alt: "Dossier pédagogique Va’a, la pirogue polynésienne présenté sur un banc en bois sculpté" },
      { src: "https://cecilekoessler.github.io/droits-patient-pf/", title: "Droits du patient en Polynésie française", cover: "/projects/18-droits-patient-preview.png", alt: "Guide Droits du patient en Polynésie française présenté sur une chaise en bois", note: "Direction de la santé · Édition 2026" },
    ],
    tone: "#e5e0d9",
  },
  { id: "19", name: "Mana’Art · Fragments Mêlés", discipline: "Visuels print & réseaux sociaux", filter: "Affiches", categoryLabel: "Communication culturelle", request: "Construire une identité de communication reconnaissable pour plusieurs éditions et rendez-vous artistiques.", response: "Une série de visuels qui évolue d’une édition à l’autre tout en conservant un fil graphique commun et une forte présence culturelle.", images: ["/projects/19-manaart-publication-01.jpg", "/projects/19-manaart-publication-02.jpg", "/projects/19-manaart-publication-03.jpg", "/projects/19-manaart-publication-04.jpg", "/projects/19-manaart-publication-05.jpg", "/projects/19-manaart-publication-06.jpg", "/projects/19-manaart-publication-07.jpg", "/projects/19-manaart-publication-08.jpg", "/projects/19-manaart-opus-4-interieur.jpg", "/projects/19-manaart-dans-les-iles-interieur.jpg"], tone: "#e9dce8" },
  {
    id: "20",
    name: "PEW",
    discipline: "Édition & campagne digitale",
    filter: "Édition & print",
    request: "Rendre accessibles des contenus environnementaux documentés dans des publications bilingues et une campagne numérique cohérente.",
    response: "Un système éditorial modulable, décliné en français et en anglais, avec une hiérarchie rigoureuse et des visuels adaptés aux réseaux sociaux.",
    images: ["/projects/20-pew-design-eng-cover.jpg", "/projects/20-pew-design-fr-interior.jpg", "/projects/20-pew-maquette-cover.jpg", "/projects/20-pew-couverture.jpg", "/projects/20-pew-facebook-appel.jpg", "/projects/20-pew-rahu-i-appel-projets.png"],
    visualGroups: [
      { name: "Publications éditoriales", description: "Les couvertures, maquettes et pages intérieures conçues pour les publications bilingues.", images: ["/projects/20-pew-design-eng-cover.jpg", "/projects/20-pew-design-fr-interior.jpg", "/projects/20-pew-maquette-cover.jpg", "/projects/20-pew-couverture.jpg"] },
      { name: "Publications pour les réseaux sociaux", description: "Des visuels numériques destinés à relayer les appels à projets et les campagnes environnementales.", images: ["/projects/20-pew-facebook-appel.jpg", "/projects/20-pew-rahu-i-appel-projets.png"] },
    ],
    documents: [{ label: "Présentation PEW · anglais", href: "/docs/20-pew-design-eng.pdf" }, { label: "Présentation PEW · français", href: "/docs/20-pew-design-fr.pdf" }, { label: "Maquette PEW", href: "/docs/20-pew-maquette-2023.pdf" }, { label: "Couverture PEW", href: "/docs/20-pew-maquette-couverture.pdf" }],
    tone: "#dce6e1",
  },
  {
    id: "21",
    name: "Festival Bounty · Te’ Uru",
    discipline: "Campagne globale, textile & jeu pédagogique",
    filter: "Affiches",
    categoryLabel: "Création de campagne",
    deliverables: "Jeu de société, textile & communication",
    request: "Imaginer de bout en bout une campagne capable de réunir le festival, ses supports textiles et un jeu de société pédagogique autour d’un même récit.",
    response: "Un univers narratif complet, conçu du concept aux objets finaux : mécanique du jeu, plateau, boîte, cartes, composants, textile et communication événementielle.",
    previewImage: "/projects/21-bounty-game-board.jpg",
    images: ["/projects/21-bounty-game-board.jpg", "/projects/21-bounty-game-box.jpg", "/projects/21-bounty-game-components.jpg", "/projects/21-bounty-game-cards.jpg", "/projects/21-bounty-game-overview.jpg", "/projects/21-bounty-sails-of-freedom.jpg", "/projects/21-bounty-festival-2013.jpg", "/projects/21-bounty-campaign-digital.jpg"],
    tone: "#d8ece8",
  },
  { id: "23", name: "Habillage de véhicules", discipline: "Identité mobile & signalétique", filter: "Signalétique & packaging", request: "Transformer plusieurs véhicules en supports de communication visibles, lisibles et cohérents avec l’identité de chaque entreprise.", response: "Des habillages composés à l’échelle de chaque carrosserie, avec une hiérarchie pensée pour être comprise rapidement en mouvement.", previewImage: "/projects/23-vehicule-moorea-gabarit.png", images: ["/projects/23-vehicule-moorea-experience.jpg", "/projects/23-vehicule-bio3d.jpg", "/projects/23-vehicule-reva-immo.jpg"], tone: "#dbe7de" },
];

const services = [
  ["Identité visuelle", "Logo, couleurs, typographies et règles d’usage. Un système qui tient sur tous vos supports.", "Identité", "identity", "Construire votre identité"],
  ["Édition & print", "Livres, magazines, rapports, dépliants, affiches. Je suis chaque projet du manuscrit jusqu’à l’impression.", "Édition & print", "book", "Imaginer votre publication"],
  ["Sites web", "Sites internet avec un système de gestion de contenu existant ou développé sur mesure. Je vous forme pour que vous puissiez mettre vos contenus à jour en toute autonomie.", "Site web", "web", "Parler de votre site"],
  ["Communication digitale", "Réseaux sociaux, campagnes sponsorisées et newsletters. Des actions suivies par des statistiques claires et compréhensibles.", "Communication", "digital", "Développer votre présence"],
  ["Audit de votre communication", "Analyse de vos supports, de leur cohérence et de leur efficacité, suivie de recommandations visuelles et éditoriales concrètes.", "Audit", "audit", "Faire le point"],
  ["Presse & relations médias", "Communiqués, dossiers et relations presse, relances journalistes et revues de presse. De l’angle éditorial au suivi des retombées.", "Communication", "press", "Préparer votre prise de parole"],
  ["Événements culturels & sociétaux", "Conception, coordination, scénographie et supports de communication pour donner une forme cohérente aux rencontres, festivals et projets engagés.", "Communication", "event", "Imaginer votre événement"],
  ["Supports pédagogiques", "Livrets, guides, jeux, parcours de découverte et activités pédagogiques. Près de trente ans d’enseignement pour rendre les contenus clairs, accessibles et engageants.", "Pédagogie", "learn", "Concevoir votre support"],
];

const testimonials: { quote: string; name: string; company: string }[] = [];
const featuredProjectIds = ["01", "27", "18", "12", "05", "03", "19", "21", "23", "26"];
const featuredProjects = featuredProjectIds.map((id) => projects.find((project) => project.id === id)).filter(Boolean) as Project[];
const projectVisuals = (project: Project) => [...(project.publications?.map((publication) => publication.cover) || []), ...(project.images || [])];
const pdfPreviewSources: Record<string, { directory: string; pages: number }> = {
  "/docs/20-pew-design-eng.pdf": { directory: "pew-en", pages: 9 },
  "/docs/20-pew-design-fr.pdf": { directory: "pew-fr", pages: 9 },
  "/docs/20-pew-maquette-2023.pdf": { directory: "pew-maquette", pages: 5 },
  "/docs/20-pew-maquette-couverture.pdf": { directory: "pew-couverture", pages: 1 },
};

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  return reduced;
}

function imageAlt(image: string, projectName: string) {
  const known: Record<string, string> = {
    "/projects/02-holopuni-hawaiki-nui.jpg": "Affiche Hawaiki Nui Va’a pour Holopuni Va’a",
    "/projects/02-holopuni-championnat.jpg": "Affiche du championnat pour Holopuni Va’a",
    "/projects/03-hawaiki-applications.jpg": "Création Hawaiki Nui Voyage déclinée sur affiche, tee-shirt, sac et cadre",
    "/projects/01-sites-web-mockup.jpg": "Page d’accueil Aura Estate & Care présentée sur un ordinateur dans un espace de travail lumineux",
    "/projects/26-audit-facebook-mockup.jpg": "Couverture d’un audit de communication présentée sur un support de travail avec un ordinateur",
    "/projects/22-encart-01.jpg": "Flyers Tahiti Reva Dreams présentés sur un comptoir",
    "/projects/05-hyper-u-halloween.png": "Couverture orange du catalogue promotionnel Hyper U Tahiti spécial Halloween",
    "/projects/05-cartes-visite-kinesiologie.png": "Recto et verso des cartes de visite d’une kinésiologue",
    "/projects/05-flyer-kinesiologie-francais.png": "Flyer recto verso en français présentant les bienfaits de la kinésiologie",
    "/projects/05-flyer-kinesiologie-espagnol.png": "Flyer recto verso en espagnol présentant les bienfaits de la kinésiologie",
    "/projects/05-promotion-lessive-super-croix-2021-2022.png": "Déclinaisons 2021 et 2022 du Grand Jeu Super Croix pour Hyper U",
    "/projects/05-promotion-lessive-hyper-u-urne-2020.png": "Campagne Grand Jeu des lessives 2020 avec affiche, urne et bulletins",
    "/projects/05-promotion-lessive-super-u-2020.png": "Déclinaison du Grand Jeu des lessives 2020 pour Super U et U Express",
    "/projects/19-manaart-opus-4-urbain.jpg": "Affiche Mana’Art Opus 4 avec une femme au tambourin présentée sur un panneau urbain",
    "/projects/19-manaart-dans-les-iles-magazine.jpg": "Affiche Mana’Art Dans les îles insérée aux deux tiers d’une page de magazine",
    "/projects/20-pew-rahu-i-appel-projets.png": "Publication numérique annonçant l’appel à projets Rāhui en Polynésie française",
    "/projects/24-seto-home.png": "Page d’accueil de la reconstruction du site Seto Yacht Charter sur ordinateur",
    "/projects/24-seto-mobile.png": "Page d’accueil de la reconstruction du site Seto Yacht Charter sur mobile",
    "/projects/24-seto-cruises.png": "Extrait éditorial de la reconstruction du site Seto Yacht Charter",
    "/projects/24-seto-islands.png": "Section consacrée aux destinations de la reconstruction Seto Yacht Charter",
    "/projects/25-alma-home.png": "Page d’accueil du site Alma Kinesio sur ordinateur",
    "/projects/25-alma-mobile.png": "Page d’accueil du site Alma Kinesio sur mobile",
    "/projects/25-alma-approach.png": "Section présentant l’approche de la kinésiologie sur le site Alma Kinesio",
    "/projects/25-alma-services.png": "Section présentant les motifs de consultation sur le site Alma Kinesio",
    "/projects/12-air-water-logo.png": "Identité Air & Water déclinée sur logo, sac, cartes de visite et enseigne",
    "/projects/12-air-water-logo-raw.jpg": "Logo Air & Water blanc sur fond noir dans sa version brute",
    "/projects/12-builtec-identity.jpg": "Identité Builtec Construction déclinée sur logo, casque, véhicule et enseigne",
    "/projects/12-bottleshop-identity.jpg": "Identité BottleShop Polynésie déclinée sur logo, sac, cartes de visite et enseigne",
    "/projects/12-una-identity.jpg": "Identité UNA Libres ensemble déclinée sur logo, textile, badges et support événementiel",
    "/projects/12-isabelle-balland-identity.jpg": "Identité Isabelle Balland déclinée sur logo, sac, cartes de visite et vitrine",
    "/projects/12-heiva-mag-identity.jpg": "Identité Heiva Mag déclinée sur logo, sac, magazine et affiche",
    "/projects/05-cave-tamanu-identity.jpg": "Identité La Cave Tamanu déclinée sur logo, emballage, carte et enseigne",
    "/projects/12-manaart-identity.jpg": "Identité Mana’Art déclinée sur logo, sac, papeterie et enseigne",
    "/projects/12-matavai-studio-identity.jpg": "Identité Matavai Studio déclinée sur logo, carnet, cartes de visite et vitrine",
    "/projects/12-mavemai-sailing-identity.jpg": "Identité Mavemai Sailing déclinée sur logo, bateau, polo et carnet",
    "/projects/12-saga-identity.jpg": "Identité 100 % la Saga déclinée sur logo, bateau, gourde et glacière",
    "/projects/12-monogramme-geometrique-identity.jpg": "Monogramme géométrique décliné sur logo, polo, cartes de visite et véhicule",
    "/projects/12-temaaroa-identity.jpg": "Identité Domaine de Tema’aroa déclinée sur logo, sac, papeterie et enseigne",
    "/projects/12-hani-kini-identity.jpg": "Identité Hani Kini Swimwear déclinée sur logo, sac, étiquettes et emballage",
    "/projects/12-keanui-identity.jpg": "Identité Keanui Créations déclinée sur logo, sac, étiquette et enseigne",
    "/projects/12-tour-du-loup-identity.jpg": "Identité Le Tour du Loup déclinée sur logo, bateau, polo et carnet",
    "/projects/12-daf-identity.jpg": "Identité de la Direction des Affaires Foncières déclinée sur logo, rapport, papeterie et plaque",
    "/projects/22-tahiti-reva-dreams-flyer.png": "Flyer Tahiti Reva Dreams pour les propriétaires et les locations de vacances",
    "/projects/22-jcm-publicite.png": "Publicité JCM Conseil en immobilier",
    "/projects/22-reva-immo-publicite.png": "Publicité Reva Immo pour la gestion locative",
    "/projects/22-villa-pamatai-publicite.png": "Publicité immobilière pour la Villa Pamatai",
    "/projects/22-villa-terupe-publicite.png": "Publicité immobilière pour la Villa Terupe",
    "/projects/22-cogep-publicite.png": "Publicité verticale COGEP Immobilier",
    "/projects/22-villa-stencer-publicite.png": "Publicité immobilière pour la Villa Stencer",
  };
  if (known[image]) return known[image];
  const subject = image.split("/").pop()?.replace(/\.[^.]+$/, "").replace(/^\d+-/, "").replace(/\b(?:19|20)\d{2}\b/g, "").replace(/-/g, " ").replace(/\s+/g, " ").trim() || "création graphique";
  return `${subject.charAt(0).toUpperCase()}${subject.slice(1)} pour ${projectName}`;
}

function detailedImage(image: string) {
  const replacements: Record<string, string> = {
    "/projects/22-encart-01.jpg": "/projects/22-tahiti-reva-dreams-flyer.png",
    "/projects/22-encart-02.jpg": "/projects/22-jcm-publicite.png",
    "/projects/22-encart-03.jpg": "/projects/22-reva-immo-publicite.png",
    "/projects/22-encart-06.jpg": "/projects/22-villa-stencer-publicite.png",
    "/projects/22-encart-07.jpg": "/projects/22-cogep-publicite.png",
    "/projects/22-encart-08.jpg": "/projects/22-villa-pamatai-publicite.png",
    "/projects/22-encart-09.jpg": "/projects/22-villa-terupe-publicite.png",
  };
  return replacements[image] || image;
}

function LineIcon({ kind, reducedMotion }: { kind: string; reducedMotion: boolean }) {
  const ref = useRef<SVGSVGElement>(null);
  const [drawn, setDrawn] = useState(reducedMotion);
  const paths: Record<string, string[]> = {
    identity: ["M25 7 41 16v18L25 43 9 34V16Z", "M16 21h18M16 29h12"],
    book: ["M7 10h13c4 0 5 3 5 6v27c0-4-3-6-7-6H7ZM43 10H30c-4 0-5 3-5 6v27c0-4 3-6 7-6h11Z"],
    web: ["M6 9h38v30H6ZM6 17h38", "M11 13h1M16 13h1M21 13h1"],
    digital: ["M14 6h22v38H14Z", "M18 11h14v15H18ZM18 31h5M27 31h5M21 38h8"],
    audit: ["M22 8a13 13 0 1 0 0 26 13 13 0 0 0 0-26Z", "m31 31 10 10", "m16 21 4 4 8-10"],
    press: ["M11 8h28v34H11ZM16 14h18M16 21h18M16 28h8M28 28h6M16 35h18"],
    event: ["M8 12h34v30H8ZM8 21h34M16 7v10M34 7v10", "m25 26 2 4 5 1-4 3 1 5-4-3-4 3 1-5-4-3 5-1Z"],
    learn: ["M7 17 25 8l18 9-18 9ZM13 21v10c7 6 17 6 24 0V21M43 17v13"],
  };
  useEffect(() => {
    if (reducedMotion) return setDrawn(true);
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setDrawn(true);
        observer.disconnect();
      }
    }, { threshold: .5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [reducedMotion]);
  return <svg ref={ref} className={`line-icon${drawn ? " is-drawn" : ""}`} viewBox="0 0 50 50" aria-hidden="true">{paths[kind].map((path) => <path key={path} d={path} />)}</svg>;
}

function Placeholder({ children }: { children: string }) {
  return <mark>{children}</mark>;
}

function BubbleStream() {
  return (
    <div className="bubble-stream" aria-hidden="true">
      {Array.from({ length: 8 }, (_, index) => <span key={index} />)}
    </div>
  );
}

function Header({ open, setOpen, activeSection }: { open: boolean; setOpen: (value: boolean) => void; activeSection: string }) {
  const [scrolled, setScrolled] = useState(false);
  const links = [["Services", "#services"], ["Projets", "#realisations"], ["Méthode", "#methode"], ["Contact", "#contact"]];
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 40);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  return (
    <header className={`site-header${scrolled ? " is-compact" : ""}`}>
      <a className="brand" href="#accueil" aria-label="Matavai Studio · accueil" onClick={() => setOpen(false)}><img src="/matavai-studio-logo.png" alt="Logo Matavai Studio" width="492" height="261" /></a>
      <nav className={open ? "main-nav is-open" : "main-nav"} aria-label="Navigation principale">
        {links.map(([label, href]) => <a key={href} href={href} aria-current={activeSection === href.slice(1) ? "location" : undefined} onClick={() => setOpen(false)}>{label}</a>)}
      </nav>
      <button className="menu-button" type="button" onClick={() => setOpen(!open)} aria-expanded={open} aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}><span /><span /></button>
    </header>
  );
}

function Typewriter({ reducedMotion, running }: { reducedMotion: boolean; running: boolean }) {
  const words = ["charte graphique.", "affiches.", "livres.", "sites web.", "enseignes.", "supports pédagogiques.", "votre projet\u00a0?"];
  const [wordIndex, setWordIndex] = useState(0);
  const [letters, setLetters] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (reducedMotion || !running) return;
    const word = words[wordIndex];
    const complete = letters === word.length;
    const empty = letters === 0;
    const delay = complete ? (wordIndex === words.length - 1 ? 2400 : 700) : deleting ? 30 : 55;
    const timer = window.setTimeout(() => {
      if (complete && !deleting) setDeleting(true);
      else if (empty && deleting) {
        setDeleting(false);
        setWordIndex((wordIndex + 1) % words.length);
      } else setLetters((value) => value + (deleting ? -1 : 1));
    }, delay);
    return () => window.clearTimeout(timer);
  }, [deleting, letters, reducedMotion, running, wordIndex]);

  return <span className="typed">{reducedMotion ? words[0] : words[wordIndex].slice(0, letters)}{!reducedMotion && <i aria-hidden="true" />}</span>;
}

const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

const FISH_EXCLUDED = "header, footer, .intro.section, .questions.section, .trusted, .contact.section, [data-no-fish]";

function FishCursor({ reducedMotion }: { reducedMotion: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (reducedMotion) return;
    const el = ref.current;
    if (!el) return;
    let dir = 1;
    const onMove = (e: MouseEvent) => {
      if (Math.abs(e.movementX) > 1) dir = e.movementX > 0 ? 1 : -1;
      el.style.left = `${e.clientX}px`;
      el.style.top = `${e.clientY}px`;
      el.style.transform = `translate(-50%, -50%) scaleX(${dir})`;
      const target = e.target as Element | null;
      const excluded = target?.closest(FISH_EXCLUDED);
      el.style.opacity = excluded ? "0" : "1";
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [reducedMotion]);
  if (reducedMotion) return null;
  return (
    <div ref={ref} className="fish-cursor" aria-hidden="true">
      {Array.from({ length: 12 }, (_, i) => <span key={i} />)}
    </div>
  );
}


function useFocusTrap<T extends HTMLElement>(active: boolean) {
  const ref = useRef<T>(null);
  const triggerRef = useRef<Element | null>(null);

  useEffect(() => {
    if (!active) return;
    triggerRef.current = document.activeElement;
    const container = ref.current;
    if (!container) return;
    const getFocusable = () => Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE));
    requestAnimationFrame(() => { const els = getFocusable(); if (els.length) els[0].focus(); });
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const els = getFocusable();
      if (!els.length) return;
      const first = els[0], last = els[els.length - 1];
      if (e.shiftKey) { if (document.activeElement === first) { e.preventDefault(); last.focus(); } }
      else { if (document.activeElement === last) { e.preventDefault(); first.focus(); } }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      (triggerRef.current as HTMLElement | null)?.focus();
    };
  }, [active]);

  return ref;
}

function IntroCover({ reducedMotion, onEnter }: { reducedMotion: boolean; onEnter: () => void }) {
  const [leaving, setLeaving] = useState(false);
  const trapRef = useFocusTrap<HTMLDivElement>(true);

  const enter = () => {
    if (leaving) return;
    setLeaving(true);
    window.setTimeout(onEnter, reducedMotion ? 20 : 650);
  };

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (["Enter", " ", "Escape", "ArrowDown"].includes(event.key)) {
        event.preventDefault();
        enter();
      }
    };
    const onWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaY) < 8) return;
      event.preventDefault();
      enter();
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("wheel", onWheel);
    };
  }, [leaving]);

  return (
    <div
      ref={trapRef}
      className={`intro-cover${leaving ? " is-leaving" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-label="Introduction Matavai Studio"
      onClick={enter}
    >
      <div className="intro-cover-panel intro-cover-panel-left" aria-hidden="true" />
      <div className="intro-cover-panel intro-cover-panel-right" aria-hidden="true" />
      <button className="intro-cover-content" type="button" aria-label="Découvrir le portfolio Matavai Studio">
        <span className="intro-cover-label">Le portfolio de</span>
        <img src="/matavai-studio-logo.png" alt="Matavai Studio" width="492" height="261" />
        <span className="intro-cover-action">
          <i aria-hidden="true" />
          Découvrir le studio
        </span>
      </button>
    </div>
  );
}

function ProjectCard({ project, onOpen }: { project: Project; onOpen: () => void }) {
  const previewImage = project.previewImage || project.publications?.[0]?.cover || project.images?.[0];
  const moveCursor = (event: PointerEvent<HTMLButtonElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--cursor-x", `${event.clientX - bounds.left}px`);
    event.currentTarget.style.setProperty("--cursor-y", `${event.clientY - bounds.top}px`);
  };
  return (
    <button className="project-card" type="button" data-no-fish onClick={onOpen} onPointerMove={moveCursor} aria-label={`Voir le projet ${project.name}`}>
      <span className="project-thumb" style={{ backgroundColor: project.tone }}>
        {previewImage ? project.previewDevice ? <span className="project-device-preview"><span><img src={previewImage} alt="Site Aura Estate & Care présenté sur un écran d’ordinateur" loading="lazy" decoding="async" /></span></span> : <img className={project.cropCover ? "is-cropped-cover" : undefined} src={previewImage} alt={project.publications?.[0]?.alt || imageAlt(previewImage, project.name)} loading="lazy" decoding="async" sizes="(max-width: 650px) 100vw, (max-width: 900px) 50vw, 33vw" /> : project.website ? <iframe className="project-site-preview" src={project.website.rebuild} loading="lazy" title={`Aperçu du site ${project.name}`} tabIndex={-1} /> : <span className="project-placeholder"><b>{project.id}</b><small>Visuel à venir</small></span>}
        {project.urlLabel && <span className="project-live-badge">{project.urlLabel} ↗</span>}
        <span className="view-cursor" aria-hidden="true">Voir</span>
      </span>
      <span className="project-meta"><strong>{project.name}</strong><span>{project.discipline}</span></span>
    </button>
  );
}

function ProjectPanel({ project, contextLabel, onClose, onMove, onContact }: { project: Project; contextLabel: string; onClose: () => void; onMove: (step: number) => void; onContact: () => void }) {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [pdfPreview, setPdfPreview] = useState<{ label: string; href: string } | null>(null);
  const [pdfPage, setPdfPage] = useState(0);
  const [activePublication, setActivePublication] = useState<number | null>(null);
  const [websiteView, setWebsiteView] = useState<"rebuild" | "current">("rebuild");
  const touchStart = useRef(0);
  const panelTrapRef = useFocusTrap<HTMLDivElement>(lightbox === null && pdfPreview === null);
  const lightboxTrapRef = useFocusTrap<HTMLDivElement>(lightbox !== null);
  const pdfTrapRef = useFocusTrap<HTMLDivElement>(pdfPreview !== null);
  const activeDetailedImage = lightbox !== null && project.images ? detailedImage(project.images[lightbox]) : null;
  const pdfSource = pdfPreview ? pdfPreviewSources[pdfPreview.href] : null;
  const openLightbox = (index: number) => setLightbox(index);
  const openPdf = (document: { label: string; href: string }) => {
    setPdfPage(0);
    setPdfPreview(document);
  };
  const changeLightboxImage = (index: number) => {
    setLightbox(index);
  };

  useEffect(() => {
    const firstDocument = project.documents?.[0];
    const source = firstDocument ? pdfPreviewSources[firstDocument.href] : null;
    if (!source) return;
    const preview = new Image();
    preview.src = `/docs/previews/${source.directory}/page-1.jpg`;
  }, [project.documents]);

  useEffect(() => {
    setActivePublication(null);
    setWebsiteView("rebuild");
  }, [project.id]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (pdfPreview) setPdfPreview(null);
        else if (lightbox !== null) setLightbox(null);
        else if (activePublication !== null) setActivePublication(null);
        else onClose();
      }
      if (pdfPreview && pdfSource) {
        if (event.key === "ArrowRight") setPdfPage((page) => Math.min(pdfSource.pages - 1, page + 1));
        if (event.key === "ArrowLeft") setPdfPage((page) => Math.max(0, page - 1));
        return;
      }
      if (lightbox !== null && project.logoGroups) return;
      if (event.key === "ArrowRight") lightbox === null ? onMove(1) : changeLightboxImage((lightbox + 1) % (project.images?.length || 1));
      if (event.key === "ArrowLeft") lightbox === null ? onMove(-1) : changeLightboxImage((lightbox - 1 + (project.images?.length || 1)) % (project.images?.length || 1));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activePublication, lightbox, onClose, onMove, pdfPreview, pdfSource, project.images?.length]);

  return (
    <div ref={panelTrapRef} className="case-overlay" role="dialog" aria-modal="true" aria-labelledby="case-title">
      <div className="case-toolbar"><span>Matavai Studio · {contextLabel}</span><div className="case-toolbar-actions">{project.url && <a href={project.url} target="_blank" rel="noreferrer">{project.urlLabel || "Visiter le site"} ↗</a>}<button type="button" data-no-fish onClick={onClose}>Fermer <span aria-hidden="true">×</span></button></div></div>
      <header className="case-head">
        <p className="kicker">{project.categoryLabel || project.filter}</p><h2 id="case-title">{project.name}</h2>
        <div className="case-facts"><p><small>Client</small>{project.name}</p><p><small>Support</small>{project.discipline}</p><p><small>Livrables</small>{project.deliverables || project.filter}</p></div>
        {project.documents?.[0] && pdfPreviewSources[project.documents[0].href] && <button className="quick-document" type="button" onClick={() => openPdf(project.documents![0])}>Consulter la présentation PDF <span>↗</span></button>}
        {project.url && <a className="quick-visit" href={project.url} target="_blank" rel="noreferrer">{project.urlLabel === "Site en ligne" ? `Visiter ${project.name}` : "Voir la reconstruction"} <span>↗</span></a>}
        {project.secondaryUrl && <a className="quick-secondary" href={project.secondaryUrl} target="_blank" rel="noreferrer">{project.secondaryLabel} <span>↗</span></a>}
      </header>
      <div className="case-brief"><p><strong>La demande&nbsp;:</strong> {project.request || <Placeholder>à compléter</Placeholder>}</p><p><strong>Ma réponse&nbsp;:</strong> {project.response || <Placeholder>à compléter</Placeholder>}</p></div>
      {project.publications && activePublication === null && <div className="publication-grid">
        {project.publications.map((publication, index) => <button className="case-embed-poster" type="button" key={publication.src} onClick={() => setActivePublication(index)}>
          <img src={publication.cover} alt={publication.alt} loading="lazy" decoding="async" />
          {publication.note && <small>{publication.note}</small>}
          <span>Feuilleter <i aria-hidden="true">→</i></span>
        </button>)}
      </div>}
      {project.publications && activePublication !== null && <div className="publication-reader">
        <div className="publication-reader-head"><button type="button" onClick={() => setActivePublication(null)}>← Tous les magazines</button><strong>{project.publications[activePublication].title}</strong></div>
        <div className="case-embed"><iframe src={project.publications[activePublication].src} loading="lazy" title={project.publications[activePublication].title} allowFullScreen /></div>
      </div>}
      {project.websiteCases && <div className="web-case-list">
        {project.websiteCases.map((website) => <section className="web-case" key={website.name}>
          <div className="web-case-head">
            <div><span>Site web</span><h3>{website.name}</h3><p>{website.discipline}</p><small>{website.description}</small></div>
            <div className="web-case-links"><a href={website.url} target="_blank" rel="noreferrer">{website.urlLabel} ↗</a>{website.secondaryUrl && <a href={website.secondaryUrl} target="_blank" rel="noreferrer">{website.secondaryLabel} ↗</a>}</div>
          </div>
          <div className="web-case-visuals">
            {website.images.map((image, index) => <figure className={index === 0 ? "is-desktop" : index === 1 ? "is-mobile" : undefined} key={image}><img src={image} alt={`${website.name}, aperçu ${index + 1}`} loading="lazy" decoding="async" /></figure>)}
          </div>
        </section>)}
      </div>}
      {project.editionGroups && <div className="edition-case-list">
        {project.editionGroups.map((edition) => <section className="edition-case" key={edition.name}>
          <div className="edition-case-head"><span>{edition.category}</span><h3>{edition.name}</h3><p>{edition.meta}</p></div>
          <div className={`edition-case-grid${edition.images.length === 1 ? " is-single" : ""}`}>
            {edition.images.map((image, index) => <button type="button" data-no-fish key={image} onClick={() => openLightbox(project.images!.indexOf(image))}>
              <img src={image} alt={imageAlt(image, edition.name)} loading="lazy" decoding="async" />
              <span aria-hidden="true">Agrandir ↗</span>
            </button>)}
          </div>
        </section>)}
      </div>}
      {project.visualGroups && <div className="edition-case-list">
        {project.visualGroups.map((group) => <section className="edition-case" key={group.name}>
          <div className="edition-case-head"><span>{project.name}</span><h3>{group.name}</h3><p>{group.description}</p></div>
          <div className={`edition-case-grid${group.images.length === 1 ? " is-single" : ""}`}>
            {group.images.map((image, index) => <button type="button" data-no-fish key={image} onClick={() => openLightbox(project.images!.indexOf(image))}>
              <img src={image} alt={imageAlt(image, group.name)} loading="lazy" decoding="async" />
              <span aria-hidden="true">Agrandir ↗</span>
            </button>)}
          </div>
        </section>)}
      </div>}
      {project.logoGroups ? <div className="logo-case-list">
        {project.logoGroups.map((group) => <section className="logo-case" key={group.name}>
          <div className="logo-case-title"><span>Identité visuelle</span><h3>{group.name}</h3></div>
          <div className={`logo-case-grid${group.images.length === 1 ? " is-single" : ""}`}>
            {group.images.map((image, groupIndex) => groupIndex === 0
              ? <figure key={`${image}-${groupIndex}`}>
                  <img src={image} alt={`Logo ${group.name}`} loading="lazy" decoding="async" />
                </figure>
              : <button type="button" data-no-fish key={`${image}-${groupIndex}`} onClick={() => openLightbox(project.images!.indexOf(image))}>
                  <img src={image} alt={`Mise en situation de l’identité ${group.name}`} loading="lazy" decoding="async" />
                  <span aria-hidden="true">Mise en situation ↗</span>
                </button>)}
          </div>
        </section>)}
      </div> : !project.websiteCases && !project.editionGroups && !project.visualGroups && (project.images || (!project.publications && !project.website)) && <div className={`case-gallery${project.galleryFocus ? " is-focused" : ""}`}>
        {project.images?.map((image, index) => <button type="button" data-no-fish key={image} aria-label={`Agrandir : ${imageAlt(image, project.name)}`} onClick={() => openLightbox(index)}><img src={image} alt="" loading="lazy" decoding="async" sizes="(max-width: 650px) 88vw, 50vw" /><span aria-hidden="true">Agrandir ↗</span></button>)}
        {!project.images && <div className="empty-gallery">Visuels à venir</div>}
      </div>}
      {project.website && <div className="website-showcase">
        <div className="website-showcase-head">
          <div className="website-tabs" role="tablist" aria-label="Comparer les versions du site">
            <button type="button" role="tab" className={websiteView === "rebuild" ? "is-active" : ""} aria-selected={websiteView === "rebuild"} onClick={() => setWebsiteView("rebuild")}>Reconstruction <span>En cours</span></button>
            <button type="button" role="tab" className={websiteView === "current" ? "is-active" : ""} aria-selected={websiteView === "current"} onClick={() => setWebsiteView("current")}>Site actuel</button>
          </div>
          <a href={project.website[websiteView]} target="_blank" rel="noreferrer">Ouvrir le site dans un nouvel onglet ↗</a>
        </div>
        <iframe src={project.website[websiteView]} loading="lazy" title={websiteView === "rebuild" ? "Reconstruction du site Seto Yacht Charter" : "Site actuel Seto Yacht Charter"} />
      </div>}
      {project.documents && <div className="case-documents">{project.documents.map((document) => <button key={document.href} type="button" onClick={() => {
        if (pdfPreviewSources[document.href]) openPdf(document);
      }}>{document.label}<span>Voir le PDF ↗</span></button>)}</div>}
      <div className="case-navigation"><button type="button" onClick={() => onMove(-1)}>← Projet précédent</button><button className="pill light" type="button" onClick={onContact}>Un projet du même genre&nbsp;? Parlons-en</button><button type="button" onClick={() => onMove(1)}>Projet suivant →</button></div>
      {lightbox !== null && project.images && activeDetailedImage && createPortal(
        <div ref={lightboxTrapRef} className="lightbox" role="dialog" aria-modal="true" aria-label={`Visuel agrandi du projet ${project.name}`} onClick={() => setLightbox(null)} onPointerDown={(event) => { touchStart.current = event.clientX; }} onPointerUp={(event) => {
          if (project.logoGroups) return;
          const delta = event.clientX - touchStart.current;
          if (Math.abs(delta) > 45) changeLightboxImage((lightbox + (delta < 0 ? 1 : -1) + project.images!.length) % project.images!.length);
        }}>
          <button className="lightbox-close" type="button" data-no-fish onClick={(event) => { event.stopPropagation(); setLightbox(null); }}>Fermer <span aria-hidden="true">×</span></button>
          {!project.logoGroups && <button className="lightbox-arrow prev" type="button" data-no-fish aria-label="Image précédente" onClick={(event) => { event.stopPropagation(); changeLightboxImage((lightbox - 1 + project.images!.length) % project.images!.length); }}>←</button>}
          <div className="lightbox-stage">
            <img src={activeDetailedImage} alt={imageAlt(activeDetailedImage, project.name)} decoding="async" />
          </div>
          {!project.logoGroups && <button className="lightbox-arrow next" type="button" data-no-fish aria-label="Image suivante" onClick={(event) => { event.stopPropagation(); changeLightboxImage((lightbox + 1) % project.images!.length); }}>→</button>}
        </div>,
        document.body,
      )}
      {pdfPreview && pdfSource && createPortal(
        <div ref={pdfTrapRef} className="pdf-viewer" role="dialog" aria-modal="true" aria-labelledby="pdf-viewer-title">
          <div className="pdf-viewer-toolbar">
            <div>
              <small>Document du projet</small>
              <strong id="pdf-viewer-title">{pdfPreview.label}</strong>
            </div>
            <div className="pdf-viewer-actions">
              <button type="button" data-no-fish onClick={() => setPdfPreview(null)}>Fermer ×</button>
            </div>
          </div>
          <div className="pdf-viewer-stage">
            <button type="button" data-no-fish aria-label="Page précédente" disabled={pdfPage === 0} onClick={() => setPdfPage((page) => Math.max(0, page - 1))}>←</button>
            <figure>
              <img src={`/docs/previews/${pdfSource.directory}/page-${pdfPage + 1}.jpg`} alt={`${pdfPreview.label}, page ${pdfPage + 1}`} decoding="async" />
              <figcaption>Page {pdfPage + 1} sur {pdfSource.pages}</figcaption>
            </figure>
            <button type="button" data-no-fish aria-label="Page suivante" disabled={pdfPage === pdfSource.pages - 1} onClick={() => setPdfPage((page) => Math.min(pdfSource.pages - 1, page + 1))}>→</button>
          </div>
        </div>,
        document.body,
      )}
    </div>
  );
}

function LegalOverlay({ onClose }: { onClose: () => void }) {
  const trapRef = useFocusTrap<HTMLDivElement>(true);
  return (
    <div ref={trapRef} className="legal-overlay" role="dialog" aria-modal="true" aria-labelledby="legal-title">
      <div>
        <button type="button" data-no-fish onClick={onClose}>Fermer <span aria-hidden="true">×</span></button>
        <p className="kicker">Informations</p>
        <h2 id="legal-title">Mentions légales.</h2>
        <dl>
          <dt>Éditeur</dt><dd>Matavai Studio</dd>
          <dt>Contact</dt><dd><a href="mailto:contact@matavai-studio.com">contact@matavai-studio.com</a></dd>
          <dt>Hébergeur</dt><dd>Netlify, Inc. · 44 Montgomery Street, Suite 300 · San Francisco, CA 94104 · États-Unis</dd>
        </dl>
        <p className="legal-copy">© {new Date().getFullYear()} Matavai Studio. Tous droits réservés. Toute reproduction, représentation, modification ou exploitation du contenu de ce site — textes, visuels, compositions graphiques — est interdite sans autorisation écrite préalable.</p>
      </div>
    </div>
  );
}

function Clocks() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const timer = window.setInterval(() => setNow(new Date()), 30000);
    return () => window.clearInterval(timer);
  }, []);
  const time = (zone: string) => now
    ? new Intl.DateTimeFormat("fr-FR", { timeZone: zone, hour: "2-digit", minute: "2-digit", hour12: false }).format(now)
    : "--:--";
  return <div className="clocks"><p><span>Papeete</span>{time("Pacific/Tahiti")}</p><i>·</i><p><span>Paris</span>{time("Europe/Paris")}</p><i>·</i><p><span>New York</span>{time("America/New_York")}</p><i>·</i><p><span>Tokyo</span>{time("Asia/Tokyo")}</p></div>;
}

export default function App() {
  const reducedMotion = useReducedMotion();
  const [introOpen, setIntroOpen] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [visibleTheme, setVisibleTheme] = useState(0);
  const [projectIndex, setProjectIndex] = useState<number | null>(null);
  const [projectType, setProjectType] = useState("");
  const [deadline, setDeadline] = useState("");
  const [submitStatus, setSubmitStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [legalOpen, setLegalOpen] = useState(false);
  const [openQuestion, setOpenQuestion] = useState(0);
  const themeRailRef = useRef<HTMLDivElement>(null);
  const themeLoopTimer = useRef<number | null>(null);

  const moveThemeRail = (direction: -1 | 1) => {
    scrollToTheme((visibleTheme + direction + featuredProjects.length) % featuredProjects.length);
  };

  const themeFocusPosition = (rail: HTMLElement) => rail.clientWidth * (window.innerWidth <= 650 ? .42 : .38);
  const themeScrollPosition = (rail: HTMLElement, card: HTMLElement) => card.offsetLeft + card.clientWidth / 2 - themeFocusPosition(rail);

  const scrollToTheme = (index: number) => {
    const rail = themeRailRef.current;
    const card = rail?.children[index + 1] as HTMLElement | undefined;
    if (!rail || !card) return;
    rail.scrollTo({ left: themeScrollPosition(rail, card), behavior: reducedMotion ? "auto" : "smooth" });
  };

  const updateVisibleTheme = () => {
    const rail = themeRailRef.current;
    if (!rail) return;
    const railFocus = rail.getBoundingClientRect().left + themeFocusPosition(rail);
    const cards = Array.from(rail.children) as HTMLElement[];
    const closest = cards.reduce((best, card, index) => {
      const bounds = card.getBoundingClientRect();
      const distance = Math.abs(bounds.left + bounds.width / 2 - railFocus);
      return distance < best.distance ? { index, distance } : best;
    }, { index: 0, distance: Infinity });
    const lastThemeIndex = featuredProjects.length - 1;
    const originalIndex = closest.index === 0 ? lastThemeIndex : closest.index === featuredProjects.length + 1 ? 0 : closest.index - 1;
    setVisibleTheme(originalIndex);
    if (closest.index === 0 || closest.index === featuredProjects.length + 1) {
      if (themeLoopTimer.current !== null) window.clearTimeout(themeLoopTimer.current);
      themeLoopTimer.current = window.setTimeout(() => {
        const targetLoopIndex = closest.index === 0 ? featuredProjects.length : 1;
        const target = rail.children[targetLoopIndex] as HTMLElement | undefined;
        if (target) rail.scrollTo({ left: themeScrollPosition(rail, target), behavior: "auto" });
      }, 180);
    }
  };

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const rail = themeRailRef.current;
      const firstTheme = rail?.children[1] as HTMLElement | undefined;
      if (rail && firstTheme) rail.scrollTo({ left: themeScrollPosition(rail, firstTheme), behavior: "auto" });
    });
    return () => {
      window.cancelAnimationFrame(frame);
      if (themeLoopTimer.current !== null) window.clearTimeout(themeLoopTimer.current);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = projectIndex !== null || menuOpen || legalOpen || introOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [projectIndex, menuOpen, legalOpen, introOpen]);

  useEffect(() => {
    const progress = document.querySelector<HTMLElement>(".scroll-progress");
    const update = () => {
      if (!progress) return;
      const distance = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.transform = `scaleX(${distance > 0 ? window.scrollY / distance : 0})`;
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>(".section-heading, .intro > p, .why-list article, .logo-wall figure"));
    if (reducedMotion) {
      elements.forEach((element) => element.classList.add("is-revealed"));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-revealed");
        observer.unobserve(entry.target);
      });
    }, { threshold: .14, rootMargin: "0px 0px -8% 0px" });
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [reducedMotion]);

  useEffect(() => {
    const sections = ["services", "realisations", "methode", "contact"].map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActiveSection(visible.target.id);
    }, { rootMargin: "-25% 0px -55% 0px", threshold: [0, .1, .3, .6] });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const selectProjectType = (type: string) => {
    setProjectType(type);
    window.setTimeout(() => document.querySelector("#contact")?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth" }), 0);
  };

  const submitContact = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const body = new URLSearchParams();
    data.forEach((value, key) => body.append(key, String(value)));

    setSubmitStatus("sending");

    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      });

      if (!response.ok) throw new Error(`Netlify Forms: ${response.status}`);

      form.reset();
      setProjectType("");
      setDeadline("");
      setSubmitStatus("success");
    } catch {
      setSubmitStatus("error");
    }
  };

  const questions = [
    ["Combien coûte une identité visuelle\u00a0?", <><strong>Logotype, charte graphique, déclinaisons.</strong> Un logo simple démarre à 270 € ; une identité complète avec charte graphique à partir de 1 350 €. Après un premier échange, vous recevez un devis détaillé, sans engagement.</>],
    ["Et de l'édition ou du print\u00a0?", <><strong>Flyers, affiches, catalogues, livres.</strong> La journée démarre à 225 € HT selon le format et la complexité. Je suis le projet du brief jusqu'à l'impression.</>],
    ["Et un site internet\u00a0?", <><strong>Conception, intégration, mise en ligne.</strong> Un site vitrine démarre à 720 €. Le tarif varie selon le nombre de pages, l'interface d'administration (existante, créée sur mesure ou sans), et la présence ou non d'un système marchand.</>],
    ["Vous faites des audits\u00a0?", <><strong>Analyse et préconisations sur une identité existante.</strong> À partir de 540 €. Je regarde vos supports, leur cohérence et leur efficacité, et je vous remets des recommandations visuelles et éditoriales concrètes.</>],
    ["Je veux juste un logo.", <><strong>Possible, mais rarement suffisant.</strong> Sans couleurs, typographies ni règles d’usage, le logo finit bricolé sur chaque nouveau support. Je vous livre au moins une charte graphique.</>],
    ["Combien de temps ça prend\u00a0?", <><strong>Comptez 2 à 3 semaines pour une identité, 1 à 2 semaines pour un site vitrine simple.</strong> Le calendrier dépend aussi de la vitesse des validations et de l’arrivée des textes et des photos.</>],
    ["Serai-je autonome avec mon site\u00a0?", <><strong>Si votre site a une interface d’administration, oui.</strong> Je vous montre comment tout mettre à jour et je vous laisse un guide clair pour le faire seul·e.</>],
    ["À qui appartiennent les créations\u00a0?", <><strong>À vous, une fois la facture réglée.</strong> La cession des droits et son étendue sont écrites dans le devis.</>],
    ["Vous suivez l’impression\u00a0?", <><strong>Oui, jusqu’au bout.</strong> Je prépare les fichiers, je relis les BAT et je reste en contact avec l’imprimeur.</>],
    ["Vous êtes à Tahiti ou à Paris\u00a0?", <><strong>Les deux, et au-delà.</strong> Je suis mobile. Je travaille à distance avec la Polynésie, la France, la Belgique et le Luxembourg, et je me déplace quand le projet le demande.</>],
  ];

  const methods = [
    ["01", "On se parle", "Échanges par email, WhatsApp, à Tahiti, Paris, ou ailleurs."],
    ["02", "Un devis clair", "Périmètre, délais et prix posés noir sur blanc."],
    ["03", "Le brief", "Un questionnaire court sur votre activité, vos publics et vos goûts."],
    ["04", "Les pistes", "Des propositions graphiques, puis on affine celle que vous choisissez."],
    ["05", "La livraison", "Fichiers prêts pour l’imprimeur et le web, guide d’usage, cession des droits."],
  ];

  return (
    <div>
      <FishCursor reducedMotion={reducedMotion} />
      {introOpen && <IntroCover reducedMotion={reducedMotion} onEnter={() => { setIntroOpen(false); window.scrollTo({ top: 0, behavior: "auto" }); }} />}
      <div className="scroll-progress" aria-hidden="true" />
      <Header open={menuOpen} setOpen={setMenuOpen} activeSection={activeSection} />
      <main>
        <section className="hero" id="accueil">
          <div className="hero-content">
            <p className="kicker">Matavai Studio</p>
            <h1 className="hero-word">
              {introOpen
                ? <span className="typed" aria-hidden="true"><i /></span>
                : <Typewriter reducedMotion={reducedMotion} running />}
            </h1>
            <p className="hero-disciplines">Direction artistique · Édition · Web · Communication</p>
            <a className="pill" href="#realisations">Voir les réalisations <span>↓</span></a>
          </div>
          <p className="hero-scroll" aria-hidden="true"><span /> Défiler pour explorer</p>
        </section>

        <section className="projects section panel" id="realisations" aria-labelledby="heading-realisations">
          <div className="portfolio-heading">
            <div className="section-heading"><h2 className="project-selection-title" id="heading-realisations">Sélection de projets</h2></div>
          </div>
          <div className="theme-carousel">
            <div className="theme-carousel-caption" key={visibleTheme} aria-live="polite" aria-atomic="true">
              <div>
                <span>{featuredProjects[visibleTheme].categoryLabel || featuredProjects[visibleTheme].filter}</span>
                <button className="theme-carousel-title" type="button" onClick={() => setProjectIndex(projects.indexOf(featuredProjects[visibleTheme]))}>
                  {featuredProjects[visibleTheme].name}
                </button>
                <p>{featuredProjects[visibleTheme].discipline}</p>
              </div>
              <button type="button" data-no-fish aria-label={`Voir le projet ${featuredProjects[visibleTheme].name}`} onClick={() => setProjectIndex(projects.indexOf(featuredProjects[visibleTheme]))}>Voir le projet <span aria-hidden="true">→</span></button>
            </div>
            <div className="theme-carousel-stage">
              <button className="theme-carousel-arrow previous" type="button" data-no-fish aria-label="Projet précédent" onClick={() => moveThemeRail(-1)}>
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19 12H5m6-6-6 6 6 6" /></svg>
              </button>
              <div className="theme-rail" ref={themeRailRef} onScroll={updateVisibleTheme}>
                {[featuredProjects[featuredProjects.length - 1], ...featuredProjects, featuredProjects[0]].map((project, loopIndex) => {
                  const index = (loopIndex - 1 + featuredProjects.length) % featuredProjects.length;
                  const duplicate = loopIndex === 0 || loopIndex === featuredProjects.length + 1;
                  const preview = project.previewImage || project.publications?.[0]?.cover || project.images?.[0];
                  return <button className={`theme-card${visibleTheme === index ? " is-active" : ""}`} type="button" key={`${project.id}-${loopIndex}`} onClick={() => setProjectIndex(projects.indexOf(project))} aria-label={`Voir ${project.name}`} aria-hidden={duplicate || undefined} tabIndex={duplicate ? -1 : 0}>
                    {preview && <img src={preview} alt="" loading={index < 3 ? "eager" : "lazy"} decoding="async" />}
                    <span className="theme-card-shade" aria-hidden="true" />
                  </button>;
                })}
              </div>
              <button className="theme-carousel-arrow next" type="button" data-no-fish aria-label="Projet suivant" onClick={() => moveThemeRail(1)}>
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6" /></svg>
              </button>
            </div>
            <div className="project-preview-strip" role="group" aria-label={`Aperçus du projet ${featuredProjects[visibleTheme].name}`}>
              {projectVisuals(featuredProjects[visibleTheme]).map((image, index) => <button type="button" key={image} onClick={() => setProjectIndex(projects.indexOf(featuredProjects[visibleTheme]))} aria-label={`Voir ${featuredProjects[visibleTheme].name}, aperçu ${index + 1}`}>
                <img src={image} alt="" loading="lazy" decoding="async" />
              </button>)}
            </div>
            <div className="theme-carousel-pagination" aria-label="Choisir une réalisation">
              {featuredProjects.map((project, index) => <button type="button" key={project.id} className={visibleTheme === index ? "is-active" : ""} aria-label={`Afficher ${project.name}`} aria-pressed={visibleTheme === index} onClick={() => scrollToTheme(index)} />)}
            </div>
          </div>
        </section>

        <section className="intro section" id="presentation">
          <h2 className="sr-only">Présentation.</h2>
          <p><span className="kicker">Madame K.</span> Je suis <strong>Cécile</strong>, graphiste et directrice artistique. Matavai Studio, c’est moi&nbsp;: une seule interlocutrice, de la première idée à la livraison finale.</p>
        </section>

        <section className="services section panel" id="services" aria-labelledby="heading-services">
          <div className="section-heading"><p className="kicker">Ce que je fais</p><h2 id="heading-services">Services.</h2></div>
          <div className="service-grid">
            {services.map(([title, text, type, icon, action]) => <article className="service-card" key={title}><LineIcon kind={icon} reducedMotion={reducedMotion} /><h3>{title}</h3><p>{text}</p><button type="button" onClick={() => selectProjectType(type)}>{action} →</button></article>)}
          </div>
        </section>

        <section className="method" id="methode" aria-labelledby="heading-methode">
          <BubbleStream />
          <div className="method-inner">
            <div className="section-heading"><p className="kicker">Du premier échange à la livraison</p><h2 id="heading-methode">Méthode.</h2></div>
            <div className="method-track">{methods.map(([number, title, text], i) => {
              const tipX = 20 + i * 16;
              const isLast = i === methods.length - 1;
              return (
                <article key={number}>
                  <svg width="80" height="16" viewBox="0 0 80 16" aria-hidden="true" style={{display:"block",overflow:"visible"}}>
                    <line x1="0" y1="8" x2={isLast ? tipX : tipX - 6} y2="8" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                    {isLast
                      ? <circle cx={tipX} cy="8" r="4" fill="white"/>
                      : <polyline points={`${tipX-8},4 ${tipX},8 ${tipX-8},12`} fill="none" stroke="white" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"/>
                    }
                  </svg>
                  <h3>{title}</h3><p>{text}</p>
                </article>
              );
            })}</div>
          </div>
        </section>

        <section className="why section panel" aria-labelledby="heading-why">
          <div className="section-heading"><p className="kicker">Concrètement</p><h2 id="heading-why">Pourquoi Matavai Studio.</h2></div>
          <div className="why-list">{[
            ["Une seule interlocutrice.", "Du brief à la livraison, vous parlez à celle qui fait."],
            ["Je parle imprimeur.", "Dix-huit ans d’édition\u00a0: papier, BAT, fabrication."],
            ["Je parle développeur.", "Une licence pro en informatique et du CSS quand il le faut."],
            ["Je sais expliquer.", "Vous repartez autonome. C’est un réflexe de prof."],
            ["J’ai été de l’autre côté du communiqué.", "Ancienne journaliste, je sais ce qu’une rédaction lit jusqu’au bout."],
            ["Je sais m’entourer.", "Pour les projets d’envergure, je constitue une équipe sur mesure : photographe, développeur, rédacteur. Toujours au bon niveau."],
          ].map(([title, text], index) => <article key={title}><span aria-hidden="true">0{index + 1}</span><h3>{title}</h3><p>{text}</p></article>)}</div>
        </section>

        {testimonials.length > 0 && <section className="testimonials section panel"><div className="section-heading"><h2>Ils en parlent.</h2></div></section>}

        <section className="questions section panel" aria-labelledby="heading-questions">
          <div className="section-heading"><p className="kicker">Avant de commencer</p><h2 id="heading-questions">Questions.</h2></div>
          <div className="accordion">{questions.map(([question, answer], index) => <article key={question as string}><button type="button" aria-expanded={openQuestion === index} onClick={() => setOpenQuestion(openQuestion === index ? -1 : index)}><span>{question}</span><i aria-hidden="true">{openQuestion === index ? "−" : "+"}</i></button><p id={`answer-${index}`} hidden={openQuestion !== index}>{answer}</p></article>)}</div>
        </section>

        <section className="contact section" id="contact" aria-labelledby="heading-contact">
          <BubbleStream />
          <div className="contact-head"><p className="kicker">Un projet en tête</p><h2 id="heading-contact">Parlons-en.</h2><p>Un brief express pour commencer.<br /><small className="contact-note">Votre message est envoyé directement et en toute simplicité.</small></p><Clocks /><small>Mes clients ne dorment jamais en même temps.</small><a href="mailto:contact@matavai-studio.com">contact@matavai-studio.com</a></div>
          <form className="contact-form" name="contact" method="POST" data-netlify="true" netlify-honeypot="bot-field" onSubmit={submitContact}>
            <input type="hidden" name="form-name" value="contact" />
            <input type="hidden" name="project" value={projectType || "Non précisé"} />
            <input type="hidden" name="deadline" value={deadline || "Non précisé"} />
            <p className="sr-only"><label>Ne pas remplir ce champ si vous êtes humain : <input name="bot-field" /></label></p>
            <fieldset><legend>Votre projet</legend><div role="group">{["Identité", "Édition & print", "Site web", "Audit", "Communication", "Pédagogie", "Autre"].map((item) => <button type="button" key={item} className={projectType === item ? "is-selected" : ""} aria-pressed={projectType === item} onClick={() => setProjectType(item)}>{item}</button>)}</div></fieldset>
            <fieldset><legend>Pour quand&nbsp;?</legend><div role="group">{["Hier", "Ce mois-ci", "On a le temps"].map((item) => <button type="button" key={item} className={deadline === item ? "is-selected" : ""} aria-pressed={deadline === item} onClick={() => setDeadline(item)}>{item}</button>)}</div></fieldset>
            <label>Nom <abbr title="Champ obligatoire" aria-hidden="true">*</abbr><input name="name" required aria-required="true" /></label><label>E-mail <abbr title="Champ obligatoire" aria-hidden="true">*</abbr><input name="email" type="email" required aria-required="true" /></label><label className="full">Message <abbr title="Champ obligatoire" aria-hidden="true">*</abbr><textarea name="message" rows={5} required aria-required="true" /></label>
            <button className="submit" type="submit" disabled={submitStatus === "sending"}>{submitStatus === "sending" ? "Envoi…" : "Envoyer →"}</button>
            <p className={`form-status ${submitStatus === "error" ? "is-error" : ""}`} aria-live="polite">
              {submitStatus === "success" && "Merci, votre message a bien été envoyé."}
              {submitStatus === "error" && "L’envoi a échoué. Réessayez ou écrivez à contact@matavai-studio.com."}
            </p>
          </form>
        </section>

        <section className="trusted" aria-labelledby="heading-trusted">
          <h2 id="heading-trusted">Ils m'ont fait confiance.</h2>
          <div><span>{["Groupe Aline Tahiti", "Musée de Tahiti et des Îles", "Yacht Club de Tahiti", "Tahiti Pearl Regatta", "FAPE", "Pew Bertarelli", "Direction de la santé de Polynésie", "Aviation civile", "Aéroport de Tahiti", "Holopuni Va'a", "Tahiti Sails", "Taiarapu FC", "La Cave Tamanu", "Optique Mata Ora", "Lycée Don Bosco Tahiti", "Aura Estate & Care", "Alma Kinesio", "Association Mana'Art", "Syndicat UNSA", "Hyper U", "Seto Yacht Charter", "Hani Kini Swimwear", "Keanui Créations", "Mavemai Sailing", "Reva Immo", "Direction des Affaires Foncières", "Isabelle Balland", "Heiva Mag", "UNA · Libres ensemble", "Builtec Construction", "Exetec Ingénierie", "Domaine de Tema'aroa", "Tahiti Box", "Pāreu Pilates", "Foodeez × Milka", "Tour du Loup", "Natura"].join(" · ")} · </span><span aria-hidden="true">{["Groupe Aline Tahiti", "Musée de Tahiti et des Îles", "Yacht Club de Tahiti", "Tahiti Pearl Regatta", "FAPE", "Pew Bertarelli", "Direction de la santé de Polynésie", "Aviation civile", "Aéroport de Tahiti", "Holopuni Va'a", "Tahiti Sails", "Taiarapu FC", "La Cave Tamanu", "Optique Mata Ora", "Lycée Don Bosco Tahiti", "Aura Estate & Care", "Alma Kinesio", "Association Mana'Art", "Syndicat UNSA", "Hyper U", "Seto Yacht Charter", "Hani Kini Swimwear", "Keanui Créations", "Mavemai Sailing", "Reva Immo", "Direction des Affaires Foncières", "Isabelle Balland", "Heiva Mag", "UNA · Libres ensemble", "Builtec Construction", "Exetec Ingénierie", "Domaine de Tema'aroa", "Tahiti Box", "Pāreu Pilates", "Foodeez × Milka", "Tour du Loup", "Natura"].join(" · ")} · </span></div>
        </section>
      </main>

      <footer>
        <p>Fait avec ♥ entre Papeete et Paris</p><p>© 2026 Matavai Studio</p>
        <nav aria-label="Pied de page"><button type="button" onClick={() => setLegalOpen(true)}>Mentions légales</button><a href="#accueil">Retour en haut <span aria-hidden="true">↑</span></a></nav>
      </footer>
      <a className="mobile-project-cta" href="#contact">Un projet&nbsp;?</a>

      {projectIndex !== null && <ProjectPanel project={projects[projectIndex]} contextLabel={projects[projectIndex].filter} onClose={() => setProjectIndex(null)} onMove={(step) => {
        const current = featuredProjects.findIndex((project) => project.id === projects[projectIndex].id);
        if (current < 0) return setProjectIndex((projectIndex + step + projects.length) % projects.length);
        const nextProject = featuredProjects[(current + step + featuredProjects.length) % featuredProjects.length];
        setProjectIndex(projects.indexOf(nextProject));
      }} onContact={() => {
        const selectedFilter = projects[projectIndex].filter;
        setProjectType(selectedFilter === "Affiches" ? "Communication" : selectedFilter === "Identités" ? "Identité" : selectedFilter === "Signalétique & packaging" ? "Autre" : selectedFilter);
        setProjectIndex(null);
        window.setTimeout(() => document.querySelector("#contact")?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth" }), 50);
      }} />}
      {legalOpen && <LegalOverlay onClose={() => setLegalOpen(false)} />}
    </div>
  );
}
