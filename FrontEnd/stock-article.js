const stockArticles = [
  {
    categorie: "Bavoir Bandana",
    imageCouverture: "./assets/images/Bavoirs/bavoir_animaux.jpg",
    produits: [
      {
        id: 1,
        nom: "Bavoir Bandana",
        image: [
          "./assets/images/Bavoirs/bavoir_animaux.jpg",
          "./assets/images/Bavoirs/bavoir_dinosaure.jpg",
          "./assets/images/Bavoirs/bavoir_fleuri_rose.jpg",
        ],
        description: "Bavoir doux et absorbant, couleur jaune.",
        titreDescription : "Bavoir bandana - L'accessoire indispensable pour bébé",
        descriptionComplete: "Bavoir bandana - L'accessoire indispensable pour bébé Ce bavoir bandana accompagne bébé du matin jusqu'au soir, offrant à la fois style et protection. Idéal pour absorber les bavouilles de nos petits anges tout en complétant leur tenue avec élégance. Confectionné en tissu imprimé en coton et en éponge de bambou ultra-douce et absorbante, il est équipé d'un bouton-pression pratique. Convient parfaitement aux bébés de 4 à 18 mois. Lavable en machine à 30°. Fait main Matériaux : Tissu en coton, éponge de bambou, bouton-pression.",
        materiaux: "Tissu en coton, éponge de bambou, bouton-pression",
        prix: 9.99,
        reference: "BAV-JAUNE-001",
        stock: 2
      },
      {
        id: 2,
        nom: "Bavoir Bandana",
        image: [
          "./assets/images/Bavoirs/bavoir_fleuri_rose.jpg",
          "./assets/images/Bavoirs/bavoir_animaux.jpg",
          "./assets/images/Bavoirs/bavoir_dinosaure.jpg",
        ],
        description: "Bavoir doux et absorbant, couleur Vert.",
        titreDescription : "Bavoir bandana - L'accessoire indispensable pour bébé",
        descriptionComplete: "Bavoir bandana - L'accessoire indispensable pour bébé Ce bavoir bandana accompagne bébé du matin jusqu'au soir, offrant à la fois style et protection. Idéal pour absorber les bavouilles de nos petits anges tout en complétant leur tenue avec élégance. Confectionné en tissu imprimé en coton et en éponge de bambou ultra-douce et absorbante, il est équipé d'un bouton-pression pratique. Convient parfaitement aux bébés de 4 à 18 mois. Lavable en machine à 30°. Fait main Matériaux : Tissu en coton, éponge de bambou, bouton-pression.",
        materiaux: "Tissu en coton, éponge de bambou, bouton-pression",
        prix: 9.99,
        reference: "BAV-JAUNE-001",
        stock: 2
      },
      {
        id: 3,
        nom: "Bavoir Bandana",
        image: [
          "./assets/images/Bavoirs/bavoir_dinosaure.jpg",
          "./assets/images/Bavoirs/bavoir_fleuri_rose.jpg",
          "./assets/images/Bavoirs/bavoir_animaux.jpg",
        ],
        description: "Bavoir doux et absorbant, couleur Vert.",
        titreDescription : "Bavoir bandana - L'accessoire indispensable pour bébé",
        descriptionComplete: "Bavoir bandana - L'accessoire indispensable pour bébé Ce bavoir bandana accompagne bébé du matin jusqu'au soir, offrant à la fois style et protection. Idéal pour absorber les bavouilles de nos petits anges tout en complétant leur tenue avec élégance. Confectionné en tissu imprimé en coton et en éponge de bambou ultra-douce et absorbante, il est équipé d'un bouton-pression pratique. Convient parfaitement aux bébés de 4 à 18 mois. Lavable en machine à 30°. Fait main Matériaux : Tissu en coton, éponge de bambou, bouton-pression.",
        materiaux: "Tissu en coton, éponge de bambou, bouton-pression",
        prix: 9.99,
        reference: "BAV-JAUNE-001",
        stock: 2
      },
      {
        id: 4,
        nom: "Bavoir Bandana",
        image: [
          "./assets/images/Bavoirs/bavoir_marin.jpg",
          "./assets/images/Bavoirs/bavoir_animaux.jpg",
          "./assets/images/Bavoirs/bavoir_dinosaure.jpg",
        ],
        description: "Bavoir doux et absorbant, couleur Vert.",
        titreDescription : "Bavoir bandana - L'accessoire indispensable pour bébé",
        descriptionComplete: "Bavoir bandana - L'accessoire indispensable pour bébé Ce bavoir bandana accompagne bébé du matin jusqu'au soir, offrant à la fois style et protection. Idéal pour absorber les bavouilles de nos petits anges tout en complétant leur tenue avec élégance. Confectionné en tissu imprimé en coton et en éponge de bambou ultra-douce et absorbante, il est équipé d'un bouton-pression pratique. Convient parfaitement aux bébés de 4 à 18 mois. Lavable en machine à 30°. Fait main Matériaux : Tissu en coton, éponge de bambou, bouton-pression.",
        materiaux: "Tissu en coton, éponge de bambou, bouton-pression",
        prix: 9.99,
        reference: "BAV-JAUNE-001",
        stock: 2
      },
      {
        id: 5,
        nom: "Bavoir Bandana",
        image: [
          "./assets/images/Bavoirs/bavoir_oursons.jpg",
          "./assets/images/Bavoirs/bavoir_animaux.jpg",
          "./assets/images/Bavoirs/bavoir_dinosaure.jpg",
        ],
        description: "Bavoir doux et absorbant, couleur Vert.",
        titreDescription : "Bavoir bandana - L'accessoire indispensable pour bébé",
        descriptionComplete: "Bavoir bandana - L'accessoire indispensable pour bébé Ce bavoir bandana accompagne bébé du matin jusqu'au soir, offrant à la fois style et protection. Idéal pour absorber les bavouilles de nos petits anges tout en complétant leur tenue avec élégance. Confectionné en tissu imprimé en coton et en éponge de bambou ultra-douce et absorbante, il est équipé d'un bouton-pression pratique. Convient parfaitement aux bébés de 4 à 18 mois. Lavable en machine à 30°. Fait main Matériaux : Tissu en coton, éponge de bambou, bouton-pression.",
        materiaux: "Tissu en coton, éponge de bambou, bouton-pression",
        prix: 9.99,
        reference: "BAV-JAUNE-001",
        stock: 2
      },
    ]
  },
  {
    categorie: "Étuis à lunette",
    imageCouverture: "./assets/images/image-produit-header.jpg",
    produits: [
      {
        id: 1,
        nom: "Étui noir",
        image: [
          "./assets/images/Etui lunette/etui_lunette_etoiles.jpg",
          "./assets/images/Etui lunette/etui_lunette_jean_fleur.jpg",
          "./assets/images/Etui lunette/etui_lunette_jean_noir_mosaique.jpg",
        ],
        description: "Étui rigide noir pour lunettes.",
        titreDescription : "Étui à lunettes souple - Pour elle ou pour lui",
        descriptionComplete: "Cet étui à lunettes, à la fois pratique et élégant, est confectionné avec soin en tissu extérieur au choix : coton, jean ou simili cuir. L'intérieur est doublé de coton ou de lin pour protéger vos lunettes avec douceur. Il se ferme facilement grâce à un bouton-pression en plastique.",
        materiaux: "Tissu, simili cuir, jean, coton, bouton-pression.",
        prix: 15.00,
        reference: "ETUI-NOIR-001",
        stock: 2
      },
      {
        id: 1,
        nom: "Étui noir",
        image: [
          "./assets/images/Etui lunette/etui_lunette_etoiles.jpg",
          "./assets/images/Etui lunette/etui_lunette_jean_fleur.jpg",
          "./assets/images/Etui lunette/etui_lunette_jean_noir_mosaique.jpg",
        ],
        description: "Étui rigide noir pour lunettes.",
        titreDescription : "Étui à lunettes souple - Pour elle ou pour lui",
        descriptionComplete: "Cet étui à lunettes, à la fois pratique et élégant, est confectionné avec soin en tissu extérieur au choix : coton, jean ou simili cuir. L'intérieur est doublé de coton ou de lin pour protéger vos lunettes avec douceur. Il se ferme facilement grâce à un bouton-pression en plastique.",
        materiaux: "Tissu, simili cuir, jean, coton, bouton-pression.",
        prix: 15.00,
        reference: "ETUI-NOIR-001",
        stock: 2
      },
      {
        id: 1,
        nom: "Étui noir",
        image: [
          "./assets/images/Etui lunette/etui_lunette_etoiles.jpg",
          "./assets/images/Etui lunette/etui_lunette_jean_fleur.jpg",
          "./assets/images/Etui lunette/etui_lunette_jean_noir_mosaique.jpg",
        ],
        description: "Étui rigide noir pour lunettes.",
        titreDescription : "Étui à lunettes souple - Pour elle ou pour lui",
        descriptionComplete: "Cet étui à lunettes, à la fois pratique et élégant, est confectionné avec soin en tissu extérieur au choix : coton, jean ou simili cuir. L'intérieur est doublé de coton ou de lin pour protéger vos lunettes avec douceur. Il se ferme facilement grâce à un bouton-pression en plastique.",
        materiaux: "Tissu, simili cuir, jean, coton, bouton-pression.",
        prix: 15.00,
        reference: "ETUI-NOIR-001",
        stock: 2
      },
      {
        id: 1,
        nom: "Étui noir",
        image: [
          "./assets/images/Etui lunette/etui_lunette_etoiles.jpg",
          "./assets/images/Etui lunette/etui_lunette_jean_fleur.jpg",
          "./assets/images/Etui lunette/etui_lunette_jean_noir_mosaique.jpg",
        ],
        description: "Étui rigide noir pour lunettes.",
        titreDescription : "Étui à lunettes souple - Pour elle ou pour lui",
        descriptionComplete: "Cet étui à lunettes, à la fois pratique et élégant, est confectionné avec soin en tissu extérieur au choix : coton, jean ou simili cuir. L'intérieur est doublé de coton ou de lin pour protéger vos lunettes avec douceur. Il se ferme facilement grâce à un bouton-pression en plastique.",
        materiaux: "Tissu, simili cuir, jean, coton, bouton-pression.",
        prix: 15.00,
        reference: "ETUI-NOIR-001",
        stock: 2
      },
    ]
  },
  {
    categorie: "Lingette",
    produits: [
      {
        nom: "Lingette microfibre verte",
        image: "./assets/images/Lingettes/lingette_feuillage_jaune_rouge.jpg",
        description: "Lingette microfibre pour nettoyage délicat.",
        prix: 4.50,
        reference: "LING-VERTE-001"
      },
      {
        nom: "Lingette microfibre bleue",
        image: "./assets/images/Lingettes/lingette_feuillage_jaune_rouge.jpg",
        description: "Lingette microfibre pour nettoyage délicat.",
        prix: 4.50,
        reference: "LING-BLEUE-002"
      },
      {
        nom: "Lingette microfibre rose",
        image: "./assets/images/Lingettes/lingette_feuillage_jaune_rouge.jpg",
        description: "Lingette microfibre pour nettoyage délicat.",
        prix: 4.50,
        reference: "LING-ROSE-003"
      },
      {
        nom: "Lingette microfibre rose",
        image: "./assets/images/Lingettes/lingette_feuillage_jaune_rouge.jpg",
        description: "Lingette microfibre pour nettoyage délicat.",
        prix: 4.50,
        reference: "LING-ROSE-003"
      },
      {
        nom: "Lingette microfibre rose",
        image: "./assets/images/Lingettes/lingette_feuillage_jaune_rouge.jpg",
        description: "Lingette microfibre pour nettoyage délicat.",
        prix: 4.50,
        reference: "LING-ROSE-003"
      },
      {
        nom: "Lingette microfibre rose",
        image: "./assets/images/Lingettes/lingette_feuillage_jaune_rouge.jpg",
        description: "Lingette microfibre pour nettoyage délicat.",
        prix: 4.50,
        reference: "LING-ROSE-003"
      },
    ]
  },
  {
    categorie: "Gant",
    produits: [
      {
        nom: "Gant en coton blanc",
        image: "./assets/images/Gant/Gant1.jpg",
        description: "Gant en coton doux et respirant.",
        prix: 7.00,
        reference: "GANT-BLANC-001"
      },
      {
        nom: "Gant en coton noir",
        image: "./assets/images/Gant/Gant1.jpg",
        description: "Gant en coton doux et respirant.",
        prix: 7.00,
        reference: "GANT-NOIR-002"
      },
      {
        nom: "Gant en coton gris",
        image: "./assets/images/Gant/Gant1.jpg",
        description: "Gant en coton doux et respirant.",
        prix: 7.00,
        reference: "GANT-GRIS-003"
      },
      {
        nom: "Gant en coton gris",
        image: "./assets/images/Gant/Gant1.jpg",
        description: "Gant en coton doux et respirant.",
        prix: 7.00,
        reference: "GANT-GRIS-003"
      },
      {
        nom: "Gant en coton gris",
        image: "./assets/images/Gant/Gant1.jpg",
        description: "Gant en coton doux et respirant.",
        prix: 7.00,
        reference: "GANT-GRIS-003"
      },
      {
        nom: "Gant en coton gris",
        image: "./assets/images/Gant/Gant1.jpg",
        description: "Gant en coton doux et respirant.",
        prix: 7.00,
        reference: "GANT-GRIS-003"
      },
      {
        nom: "Gant en coton gris",
        image: "./assets/images/Gant/Gant1.jpg",
        description: "Gant en coton doux et respirant.",
        prix: 7.00,
        reference: "GANT-GRIS-003"
      },
      {
        nom: "Gant en coton gris",
        image: "./assets/images/Gant/Gant1.jpg",
        description: "Gant en coton doux et respirant.",
        prix: 7.00,
        reference: "GANT-GRIS-003"
      },
    ]
  },
  {
    categorie: "Pochette téléphone",
    produits: [
      {
        nom: "Pochette noire",
        image: "./assets/images/Pochette_telephone/pochette_margueritte.jpg",
        description: "Pochette résistante pour téléphone.",
        prix: 12.00,
        reference: "PCHT-NOIR-001"
      },
      {
        nom: "Pochette rouge",
        image: "./assets/images/Pochette_telephone/pochette_margueritte.jpg",
        description: "Pochette résistante pour téléphone.",
        prix: 12.00,
        reference: "PCHT-ROUGE-002"
      },
      {
        nom: "Pochette bleue",
        image: "./assets/images/Pochette_telephone/pochette_margueritte.jpg",
        description: "Pochette résistante pour téléphone.",
        prix: 12.00,
        reference: "PCHT-BLEUE-003"
      },
      {
        nom: "Pochette bleue",
        image: "./assets/images/Pochette_telephone/pochette_margueritte.jpg",
        description: "Pochette résistante pour téléphone.",
        prix: 12.00,
        reference: "PCHT-BLEUE-003"
      },
      {
        nom: "Pochette bleue",
        image: "./assets/images/Pochette_telephone/pochette_margueritte.jpg",
        description: "Pochette résistante pour téléphone.",
        prix: 12.00,
        reference: "PCHT-BLEUE-003"
      },
      {
        nom: "Pochette bleue",
        image: "./assets/images/Pochette_telephone/pochette_margueritte.jpg",
        description: "Pochette résistante pour téléphone.",
        prix: 12.00,
        reference: "PCHT-BLEUE-003"
      },
      {
        nom: "Pochette bleue",
        image: "./assets/images/Pochette_telephone/pochette_margueritte.jpg",
        description: "Pochette résistante pour téléphone.",
        prix: 12.00,
        reference: "PCHT-BLEUE-003"
      },
    ]
  },
  {
    categorie: "Sac",
    produits: [
      {
        nom: "Sac en toile beige",
        image: "./assets/images/Sac/sac_beige_rouge.jpg",
        description: "Sac en toile durable et léger.",
        prix: 25.00,
        reference: "SAC-BEIGE-001"
      },
      {
        nom: "Sac en toile noire",
        image: "https://exemple.com/images/sac-noir.jpg",
        description: "Sac en toile durable et léger.",
        prix: 25.00,
        reference: "SAC-NOIR-002"
      },
      {
        nom: "Sac en toile bleue",
        image: "./assets/images/Sac/sac_beige_rouge.jpg",
        description: "Sac en toile durable et léger.",
        prix: 25.00,
        reference: "SAC-BLEUE-003"
      },
      {
        nom: "Sac en toile bleue",
        image: "./assets/images/Sac/sac_beige_rouge.jpg",
        description: "Sac en toile durable et léger.",
        prix: 25.00,
        reference: "SAC-BLEUE-003"
      },
      {
        nom: "Sac en toile bleue",
        image: "./assets/images/Sac/sac_beige_rouge.jpg",
        description: "Sac en toile durable et léger.",
        prix: 25.00,
        reference: "SAC-BLEUE-003"
      },
      {
        nom: "Sac en toile bleue",
        image: "./assets/images/Sac/sac_beige_rouge.jpg",
        description: "Sac en toile durable et léger.",
        prix: 25.00,
        reference: "SAC-BLEUE-003"
      },
    ]
  },
  {
    categorie: "Kit 2 en 1",
    produits: [
      {
        nom: "Kit Bavoir + Lingette Jaune",
        image: "./assets/images/kit 2 - 1/IMG_20250118_143402.jpg",
        description: "Kit combiné de bavoir et lingette jaune.",
        prix: 18.00,
        reference: "KIT2-JAUNE-001"
      },
      {
        nom: "Kit Bavoir + Lingette Vert",
        image: "https://exemple.com/images/kit2-vert.jpg",
        description: "Kit combiné de bavoir et lingette vert.",
        prix: 18.00,
        reference: "KIT2-VERT-002"
      },
      {
        nom: "Kit Bavoir + Lingette Bleu",
        image: "./assets/images/Bavoirs/bavoir_dinosaure.jpg",
        description: "Kit combiné de bavoir et lingette bleu.",
        prix: 18.00,
        reference: "KIT2-BLEU-003"
      },
      {
        nom: "Kit Bavoir + Lingette Bleu",
        image: "./assets/images/Bavoirs/bavoir_dinosaure.jpg",
        description: "Kit combiné de bavoir et lingette bleu.",
        prix: 18.00,
        reference: "KIT2-BLEU-003"
      },
      {
        nom: "Kit Bavoir + Lingette Bleu",
        image: "./assets/images/Bavoirs/bavoir_dinosaure.jpg",
        description: "Kit combiné de bavoir et lingette bleu.",
        prix: 18.00,
        reference: "KIT2-BLEU-003"
      },
      {
        nom: "Kit Bavoir + Lingette Bleu",
        image: "./assets/images/Bavoirs/bavoir_dinosaure.jpg",
        description: "Kit combiné de bavoir et lingette bleu.",
        prix: 18.00,
        reference: "KIT2-BLEU-003"
      },
    ]
  },
  {
    categorie: "Kit 3 en 1",
    produits: [
      {
        nom: "Kit Bavoir + Lingette + Gant Jaune",
        image: "./assets/images/kit 3 - 1/IMG_20250118_143350.jpg",
        description: "Kit combiné de bavoir, lingette et gant jaune.",
        prix: 25.00,
        reference: "KIT3-JAUNE-001"
      },
      {
        nom: "Kit Bavoir + Lingette + Gant Vert",
        image: "./assets/images/kit 3 - 1/IMG_20250118_143350.jpg",
        description: "Kit combiné de bavoir, lingette et gant vert.",
        prix: 25.00,
        reference: "KIT3-VERT-002"
      },
      {
        nom: "Kit Bavoir + Lingette + Gant Bleu",
        image: "./assets/images/kit 3 - 1/IMG_20250118_143350.jpg",
        description: "Kit combiné de bavoir, lingette et gant bleu.",
        prix: 25.00,
        reference: "KIT3-BLEU-003"
      },
      {
        nom: "Kit Bavoir + Lingette + Gant Bleu",
        image: "./assets/images/kit 3 - 1/IMG_20250118_143350.jpg",
        description: "Kit combiné de bavoir, lingette et gant bleu.",
        prix: 25.00,
        reference: "KIT3-BLEU-003"
      },
      {
        nom: "Kit Bavoir + Lingette + Gant Bleu",
        image: "./assets/images/kit 3 - 1/IMG_20250118_143350.jpg",
        description: "Kit combiné de bavoir, lingette et gant bleu.",
        prix: 25.00,
        reference: "KIT3-BLEU-003"
      },
      {
        nom: "Kit Bavoir + Lingette + Gant Bleu",
        image: "./assets/images/kit 3 - 1/IMG_20250118_143350.jpg",
        description: "Kit combiné de bavoir, lingette et gant bleu.",
        prix: 25.00,
        reference: "KIT3-BLEU-003"
      },
      {
        nom: "Kit Bavoir + Lingette + Gant Bleu",
        image: "./assets/images/kit 3 - 1/IMG_20250118_143350.jpg",
        description: "Kit combiné de bavoir, lingette et gant bleu.",
        prix: 25.00,
        reference: "KIT3-BLEU-003"
      },
      {
        nom: "Kit Bavoir + Lingette + Gant Bleu",
        image: "./assets/images/kit 3 - 1/IMG_20250118_143350.jpg",
        description: "Kit combiné de bavoir, lingette et gant bleu.",
        prix: 25.00,
        reference: "KIT3-BLEU-003"
      },
    ]
  },
  {
    categorie: "Sac banane",
    produits: [
      {
        nom: "Sac banane noir",
        image: "./assets/images/image-accueil.jpg",
        description: "Sac banane pratique et léger.",
        prix: 20.00,
        reference: "SACB-NOIR-001"
      },
      {
        nom: "Sac banane rouge",
        image: "./assets/images/image-accueil.jpg",
        description: "Sac banane pratique et léger.",
        prix: 20.00,
        reference: "SACB-ROUGE-002"
      },
      {
        nom: "Sac banane bleu",
        image: "./assets/images/image-accueil.jpg",
        description: "Sac banane pratique et léger.",
        prix: 20.00,
        reference: "SACB-BLEU-003"
      },
      {
        nom: "Sac banane bleu",
        image: "./assets/images/image-accueil.jpg",
        description: "Sac banane pratique et léger.",
        prix: 20.00,
        reference: "SACB-BLEU-003"
      },
      {
        nom: "Sac banane bleu",
        image: "./assets/images/image-accueil.jpg",
        description: "Sac banane pratique et léger.",
        prix: 20.00,
        reference: "SACB-BLEU-003"
      },
      {
        nom: "Sac banane bleu",
        image: "./assets/images/image-accueil.jpg",
        description: "Sac banane pratique et léger.",
        prix: 20.00,
        reference: "SACB-BLEU-003"
      },
      {
        nom: "Sac banane bleu",
        image: "./assets/images/image-accueil.jpg",
        description: "Sac banane pratique et léger.",
        prix: 20.00,
        reference: "SACB-BLEU-003"
      },
      {
        nom: "Sac banane bleu",
        image: "./assets/images/image-accueil.jpg",
        description: "Sac banane pratique et léger.",
        prix: 20.00,
        reference: "SACB-BLEU-003"
      },
    ]
  },
];

export default stockArticles;
