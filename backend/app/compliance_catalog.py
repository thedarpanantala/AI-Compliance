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

INDUSTRY_REQUIREMENTS: dict[str, dict[str, list[dict[str, Any]]]] = {
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
    },
    "Food & Agriculture": {
        "mandatory": [
            {"name": "FSSAI License/Registration", "authority": "FSSAI", "validity": "1-5 years"},
            {"name": "GST Registration", "authority": "GST Department", "validity": "Perpetual"},
            {"name": "Pollution Consent", "authority": "SPCB", "validity": "Varies"},
            {"name": "Factory License", "authority": "Labor Department", "validity": "1-5 years"},
            {"name": "Agmark Registration", "authority": "DMI", "validity": "Varies"},
            {"name": "APEDA Registration", "authority": "APEDA", "validity": "Perpetual"},
        ],
        "voluntary": [
            {"name": "FSSC 22000", "focus": "Global food safety"},
            {"name": "BRCGS", "focus": "Retail compliance"},
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
        ],
        "voluntary": [
            {"name": "ISO 9001:2015", "focus": "Quality management"},
            {"name": "ISO 14001:2015", "focus": "Environmental management"},
            {"name": "ISO 45001:2018", "focus": "Occupational health & safety"},
        ],
        "export_eu": ["CE Marking", "ROHS", "REACH"],
        "export_us": ["UL/ETL Listing", "FCC Certification", "ASME Code Stamps"],
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
    }
    normalized = {market.strip().lower() for market in export_markets}
    if "eu" in normalized or "europe" in normalized:
        response["export_certifications"].extend(industry_data.get("export_eu", []))
    if "us" in normalized or "usa" in normalized or "united states" in normalized:
        response["export_certifications"].extend(industry_data.get("export_us", []))
    if "uk" in normalized:
        response["export_certifications"].append("UKCA / market-specific conformity requirements")
    return response
