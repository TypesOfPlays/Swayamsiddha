/**
 * The full 73-test menu, transcribed from the owner's printed list
 * (tests list part 1 & 2). Names are kept close to the printed wording so
 * patients can match what is written on a doctor's prescription slip.
 */

export type TestGroup = {
  id: string;
  title: string;
  blurb: string;
  items: string[];
};

export const testGroups: TestGroup[] = [
  {
    id: "blood",
    title: "Blood counts & haematology",
    blurb: "Routine screening, anaemia and infection work-ups.",
    items: [
      "CBC (5 Part)",
      "Haemoglobin",
      "ESR",
      "DLC / TLC / Hb% / ESR",
      "Differential Count (DC)",
      "Absolute Eosinophil Count (AEC)",
      "Total Platelet Count",
      "ABO Group & Rh Type (Blood Group)",
      "BT / CT",
      "Sickling",
    ],
  },
  {
    id: "diabetes",
    title: "Diabetes & sugar",
    blurb: "Fasting, post-meal and three-month average control.",
    items: ["FBS", "PPBS", "RBS", "PGBS", "HbA1c (Gly)"],
  },
  {
    id: "heart",
    title: "Heart & lipids",
    blurb: "Cholesterol profile and cardiac marker testing.",
    items: [
      "Lipid Profile",
      "S. Cholesterol (S. Cho)",
      "S. Triglycerides (S. TG)",
      "Troponin-I (Kit)",
      "Troponin-T (Kit)",
    ],
  },
  {
    id: "thyroid",
    title: "Thyroid & hormones",
    blurb: "Thyroid panels, fertility and pregnancy hormones.",
    items: [
      "Thyroid Profile – I (T3, T4, TSH)",
      "TSH",
      "T3",
      "T4",
      "FT3 (Free Triiodothyronine)",
      "FT4 (Free Thyroxine)",
      "Beta hCG (Beta Human Chorionic Gonadotropin)",
      "FSH (Follicle Stimulating Hormone)",
      "Prolactin (PRL)",
      "Estradiol (E2)",
      "Progesterone (P4)",
      "Calcitonin (Thyrocalcitonin)",
    ],
  },
  {
    id: "liver",
    title: "Liver function",
    blurb: "Full LFT panel and its individual components.",
    items: [
      "LFT",
      "SGOT (AST)",
      "SGPT (ALT)",
      "Bilirubin Total + Direct + Indirect",
      "Alkaline Phosphatase (ALP)",
      "Albumin",
      "Total Protein",
      "Amylase",
    ],
  },
  {
    id: "kidney",
    title: "Kidney & electrolytes",
    blurb: "Renal panels, minerals and electrolyte balance.",
    items: [
      "KFT",
      "RFT",
      "Urea / Creatinine",
      "BUN (Blood Urea Nitrogen)",
      "S. Uric Acid",
      "Na+ K+ Cl",
      "Calcium",
      "Magnesium",
      "S. Phosphorus",
    ],
  },
  {
    id: "fever",
    title: "Fever & infection",
    blurb: "Seasonal fever panels and viral screening.",
    items: [
      "Dengue (Kit)",
      "Mal Card (Kit)",
      "Scrub Typhus",
      "Widal Test (Slide Test)",
      "CRP (Quantitative)",
      "ASO (Quantitative)",
      "HIV (Kit)",
      "HBsAg (Kit)",
      "HCV (Kit)",
      "VDRL (Kit)",
      "Toxo (Kit)",
      "TORCH Panel – 8 (IgG & IgM)",
    ],
  },
  {
    id: "urine",
    title: "Urine, stool & fluids",
    blurb: "Routine microscopy, culture and fluid analysis.",
    items: [
      "Urine R/M",
      "Urine C/S",
      "Urine β-hCG (Kit)",
      "Stool R/M",
      "Seminal Fluid",
    ],
  },
  {
    id: "coagulation",
    title: "Clotting & inflammation",
    blurb: "Coagulation timing and inflammatory markers.",
    items: ["PT / INR", "APTT", "RA Factor (Quantitative)", "Ferritin"],
  },
  {
    id: "markers",
    title: "Tumour markers",
    blurb: "Specialist markers, on doctor's advice.",
    items: [
      "CA 15-3 (Breast Cancer Marker)",
      "CA 19-9 (Pancreatic Cancer Marker)",
      "CA 125 (Ovarian Cancer Marker)",
    ],
  },
];

export const allTests = testGroups.flatMap((g) => g.items);
export const totalTestCount = allTests.length; // 73
