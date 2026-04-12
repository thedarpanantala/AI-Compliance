"""Industry categories and license/certification checklist catalog."""
from __future__ import annotations

from typing import Any

INDUSTRY_DROPDOWN = {
    "Healthcare & Medical": [
        "Hospitals & Clinics",
        "Diagnostic Laboratories",
        "Medical Device Manufacturing",
        "Pharmaceutical Manufacturing",
        "Medical Tourism Services",
    ],
    "Food & Agriculture": [
        "Food Processing & Manufacturing",
        "Agricultural Products Export",
        "Spices Processing",
        "Meat & Poultry Processing",
        "Dairy Processing",
        "Seafood Processing",
        "Organic Food Products",
    ],
    "Textile & Apparel": [
        "Textile Manufacturing",
        "Garment Manufacturing",
        "Protective Textiles",
        "Technical Textiles",
        "Readymade Garments Export",
    ],
    "Manufacturing & Engineering": [
        "General Manufacturing",
        "Machinery & Equipment",
        "Automotive Components",
        "Heavy Engineering",
        "Electrical Equipment",
        "Electronics Manufacturing",
        "Precision Engineering",
    ],
    "Chemical Industry": [
        "Basic Chemicals",
        "Specialty Chemicals",
        "Agrochemicals",
        "Pharmaceuticals Intermediates",
        "Petrochemicals",
        "Paints & Coatings",
    ],
    "Environmental Services": [
        "Pollution Control Equipment",
        "Waste Management",
        "Water Treatment",
        "Environmental Consulting",
    ],
    "MSME General": ["All MSME Categories"],
}

UNIVERSAL_MANDATORY_REQUIREMENTS = [
    "GST Registration",
    "MSME/Udyam Registration",
    "PAN/TAN",
    "IEC (for exporters)",
    "Trade License",
    "Shops & Establishments",
]

INDUSTRY_REQUIREMENTS: dict[str, dict[str, list[dict[str, Any]] | list[str]]] = {
    "Healthcare & Medical": {
        "mandatory": [
            {"name": "Clinical Establishment Registration", "authority": "State Health Department", "validity": "1-5 years"},
            {"name": "Hospital License", "authority": "State Government / Municipal Corporation", "validity": "1-5 years"},
            {"name": "Bio-Medical Waste Authorization", "authority": "SPCB", "validity": "5 years"},
            {"name": "Trade License", "authority": "Municipal Corporation", "validity": "1 year"},
            {"name": "Shops & Establishments Registration", "authority": "Labor Department", "validity": "Perpetual"},
            {"name": "GST Registration", "authority": "GST Department", "validity": "Perpetual"},
            {"name": "CDSCO Manufacturing License", "authority": "CDSCO", "validity": "As per rule"},
            {"name": "Medical Device Rule 2017 Registration", "authority": "CDSCO", "validity": "As per class"},
            {"name": "BIS CRS (medical electronics)", "authority": "BIS", "validity": "Mandatory products"},
        ],
        "voluntary": [
            {"name": "NABH Accreditation", "focus": "Patient safety and quality"},
            {"name": "NABL Accreditation", "focus": "Laboratory quality"},
            {"name": "ISO 9001:2015", "focus": "Quality management"},
            {"name": "ISO 15189:2022", "focus": "Medical laboratory quality"},
            {"name": "JCI Accreditation", "focus": "International patient safety"},
        ],
        "export_eu": [
            "EU MDR 2017/745 (CE Marking)",
            "Notified Body Assessment",
            "EUDAMED Registration",
            "Technical Documentation (Annex II/III)",
        ],
        "export_us": [
            "FDA 510(k) Clearance",
            "FDA PMA (Class III)",
            "QSR 21 CFR Part 820",
            "Medical Device Reporting 21 CFR Part 803",
            "MDSAP Certification",
        ],
        "bis_compulsory": [
            "Cardiac Defibrillators",
            "Electrocardiographs",
            "Pulse Oximeters",
            "Infant Phototherapy Equipment",
        ],
    },
    "Textile & Apparel": {
        "mandatory": [
            {"name": "MSME/Udyam Registration", "authority": "Ministry of MSME", "validity": "Perpetual"},
            {"name": "GST Registration", "authority": "GST Department", "validity": "Perpetual"},
            {"name": "Factory License", "authority": "State Labor Department", "validity": "1-5 years"},
            {"name": "Pollution Consent (CTE/CTO)", "authority": "SPCB", "validity": "5-15 years"},
            {"name": "BIS Certification (where applicable)", "authority": "BIS", "validity": "Product-linked"},
            {"name": "Textile Committee Registration", "authority": "Textile Committee", "validity": "As required"},
        ],
        "voluntary": [
            {"name": "OEKO-TEX Standard 100", "focus": "Chemical safety"},
            {"name": "GOTS", "focus": "Organic textile"},
            {"name": "GRS", "focus": "Recycled content"},
            {"name": "WRAP", "focus": "Social compliance"},
            {"name": "SA8000", "focus": "Labor practices"},
        ],
        "export_eu": [
            "CE Marking for PPE (EU 2016/425)",
            "REACH Compliance",
            "EU Ecolabel",
            "Textile Labelling Regulation 1007/2011",
            "Due Diligence Statement",
        ],
        "export_us": [
            "CPSC Testing",
            "FTC Textile Labeling",
            "California Prop 65",
            "AATCC/ASTM performance tests",
            "Buy American compliance (conditional)",
        ],
        "bis_compulsory": [
            "Curtains and Drapes",
            "Protective Clothing for Fire Fighters",
            "High Visibility Warning Apparel",
        ],
    },
    "Chemical Industry": {
        "mandatory": [
            {"name": "Factory License", "authority": "Chief Inspector of Factories", "validity": "1-5 years"},
            {"name": "Pollution CTE/CTO", "authority": "SPCB", "validity": "5-15 years"},
            {"name": "Hazardous Waste Authorization", "authority": "SPCB", "validity": "5 years"},
            {"name": "Environment Clearance", "authority": "SEIAA/MoEFCC", "validity": "Perpetual"},
            {"name": "Explosives License", "authority": "PESO", "validity": "1-5 years"},
            {"name": "Poison License", "authority": "State Drug/Health Department", "validity": "1 year"},
            {"name": "Petroleum License", "authority": "PESO", "validity": "2 years"},
            {"name": "Chlorine License", "authority": "CCOE (PESO)", "validity": "3 years"},
            {"name": "Boiler License", "authority": "Inspectorate of Factories", "validity": "Annual"},
        ],
        "voluntary": [
            {"name": "ISO 9001:2015", "focus": "Quality management"},
            {"name": "ISO 14001:2015", "focus": "Environmental management"},
            {"name": "ISO 45001:2018", "focus": "Occupational health & safety"},
            {"name": "Responsible Care®", "focus": "Chemical industry stewardship"},
            {"name": "GMP (where relevant)", "focus": "Pharma intermediates"},
        ],
        "export_eu": [
            "REACH Registration",
            "REACH SVHC",
            "CLP Regulation",
            "Biocidal Products Regulation",
            "CE Marking (where applicable)",
            "Safety Data Sheet (SDS)",
        ],
        "export_us": [
            "TSCA Inventory",
            "TSCA Section 5",
            "RCRA Compliance",
            "EPCRA (SARA)",
            "OSHA Process Safety Management",
            "DEA Controlled Substances",
        ],
        "bis_compulsory": [
            "Potassium Hydroxide (IS 424)",
            "Sodium Hydroxide (IS 425)",
            "Sulfuric Acid (IS 266)",
            "Hydrochloric Acid (IS 302)",
            "Methanol (IS 1168)",
            "Ammonium Nitrate (IS 826)",
        ],
    },
    "Food & Agriculture": {
        "mandatory": [
            {"name": "FSSAI License/Registration", "authority": "FSSAI", "validity": "1-5 years"},
            {"name": "GST Registration", "authority": "GST Department", "validity": "Perpetual"},
            {"name": "Pollution Consent", "authority": "SPCB", "validity": "Varies"},
            {"name": "Factory License", "authority": "Labor Department", "validity": "1-5 years"},
            {"name": "Agmark Registration", "authority": "DMI", "validity": "Varies"},
            {"name": "APEDA Registration", "authority": "APEDA", "validity": "Perpetual"},
            {"name": "Spice Board Registration", "authority": "Spice Board India", "validity": "As required"},
        ],
        "voluntary": [
            {"name": "FSSC 22000", "focus": "Global food safety"},
            {"name": "BRCGS", "focus": "Retail compliance"},
            {"name": "SQF", "focus": "Global food safety"},
            {"name": "HACCP", "focus": "Hazard analysis"},
            {"name": "ISO 22000:2018", "focus": "Food safety management"},
        ],
        "export_eu": [
            "EU Food Import Requirements",
            "EU Organic Certification",
            "IFS Food",
            "BRCGS",
            "Health Certificate",
        ],
        "export_us": [
            "FDA Food Facility Registration",
            "Prior Notice",
            "HACCP (FDA)",
            "USDA Organic",
            "FDA FSVP",
        ],
    },
    "Manufacturing & Engineering": {
        "mandatory": [
            {"name": "Factory License", "authority": "Labor Department", "validity": "1-5 years"},
            {"name": "Pollution CTE/CTO", "authority": "SPCB", "validity": "5-15 years"},
            {"name": "Boiler Certification", "authority": "Inspectorate", "validity": "Annual"},
            {"name": "Electrical Safety Certificate", "authority": "Electrical Inspector", "validity": "1 year"},
            {"name": "Explosives License", "authority": "PESO", "validity": "As applicable"},
            {"name": "Lift/Elevator Certification", "authority": "Controller of Lift", "validity": "Annual"},
        ],
        "voluntary": [
            {"name": "ISO 9001:2015", "focus": "Quality management"},
            {"name": "ISO 14001:2015", "focus": "Environmental management"},
            {"name": "ISO 45001:2018", "focus": "Occupational health & safety"},
            {"name": "IATF 16949:2016", "focus": "Automotive quality"},
            {"name": "AS9100D", "focus": "Aerospace quality"},
        ],
        "export_eu": [
            "CE Marking (Machinery Directive)",
            "ATEX Directive",
            "Pressure Equipment Directive",
            "ROHS",
            "REACH",
            "WEEE",
        ],
        "export_us": [
            "UL/ETL Listing",
            "FCC Certification",
            "ASME Code Stamps",
            "OSHA/NFPA compliance",
            "FMVSS (automotive)",
            "EPA/CARB emissions (automotive)",
        ],
    },
    "Environmental Services": {
        "mandatory": [
            {"name": "Environmental Clearance (EC)", "authority": "SEIAA/MoEFCC", "validity": "Perpetual with conditions"},
            {"name": "Consent to Establish (CTE)", "authority": "SPCB", "validity": "Until commissioning"},
            {"name": "Consent to Operate (CTO)", "authority": "SPCB", "validity": "5/10/15 years by category"},
            {"name": "Hazardous Waste Authorization", "authority": "SPCB/CPCB", "validity": "5 years"},
            {"name": "E-Waste Authorization", "authority": "SPCB/CPCB", "validity": "5 years"},
        ],
        "voluntary": [
            {"name": "ISO 14001:2015", "focus": "Environmental management"},
            {"name": "ISO 50001:2018", "focus": "Energy management"},
            {"name": "ISO 14064", "focus": "GHG accounting"},
            {"name": "GreenCo Rating", "focus": "Resource efficiency"},
        ],
        "export_eu": ["EU environmental reporting and product directives (as applicable)"],
        "export_us": ["EPA environmental compliance programs (as applicable)"],
    },
}


def build_dynamic_checklist(industry: str, export_markets: list[str] | None = None) -> dict[str, Any]:
    export_markets = export_markets or []
    industry_data = INDUSTRY_REQUIREMENTS.get(industry, {"mandatory": [], "voluntary": [], "export_eu": [], "export_us": []})
    response: dict[str, Any] = {
        "industry": industry,
        "universal_mandatory": UNIVERSAL_MANDATORY_REQUIREMENTS,
        "industry_specific_mandatory": industry_data.get("mandatory", []),
        "voluntary_certifications": industry_data.get("voluntary", []),
        "export_certifications": [],
        "bis_compulsory": industry_data.get("bis_compulsory", []),
    }
    normalized = {market.strip().lower() for market in export_markets}
    if "eu" in normalized or "europe" in normalized:
        response["export_certifications"].extend(industry_data.get("export_eu", []))
    if "us" in normalized or "usa" in normalized or "united states" in normalized:
        response["export_certifications"].extend(industry_data.get("export_us", []))
    if "uk" in normalized:
        response["export_certifications"].append("UKCA / market-specific conformity requirements")
    return response
