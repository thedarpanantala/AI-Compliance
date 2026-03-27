from sqlalchemy.orm import Session
import uuid
import logging
from app.models.entities import Organization, LicenceTemplate, OrganizationLicence

logger = logging.getLogger(__name__)

def meets_size_requirement(template: LicenceTemplate, org_data: dict) -> bool:
    """
    Evaluates if the organization meets the min size requirement for a licence.
    E.g., {"bed_count_min": 100}
    """
    reqs = template.min_size_requirement
    if not reqs:
        return True
        
    org_size_data = org_data.get("size_metrics", {})
    
    if "bed_count_min" in reqs:
        beds = org_size_data.get("bed_count", 0)
        if beds < reqs["bed_count_min"]:
            return False
            
    if "employee_count_min" in reqs:
        employees = org_size_data.get("employee_count", 0)
        if employees < reqs["employee_count_min"]:
            return False
            
    return True

def auto_create_licences_for_organization(org_id: str, org_type: str, state: str, org_size_data: dict, db: Session):
    """
    Automatically creates pending organization licences based on pre-populated templates.
    """
    # Find all matching templates
    # Note: SQLite/Postgres JSON contains varies, standardizing via Python filter for stub
    all_templates = db.query(LicenceTemplate).all()
    
    matches = []
    for t in all_templates:
        # Check org type
        if org_type not in t.applicable_org_types and "all" not in t.applicable_org_types:
            continue
            
        # Check state
        if state not in t.applicable_states and "all" not in t.applicable_states:
            continue
            
        # Check size requirements (small/medium/large beds, etc)
        if not meets_size_requirement(t, {"size_metrics": org_size_data}):
            continue
            
        matches.append(t)
        
    created_count = 0
    for template in matches:
        # Prevent duplicates
        existing = db.query(OrganizationLicence).filter(
            OrganizationLicence.organization_id == org_id,
            OrganizationLicence.template_id == template.id
        ).first()
        
        if not existing:
            new_licence = OrganizationLicence(
                id=str(uuid.uuid4()),
                tenant_id=org_id, # Base model might require tenant_id
                organization_id=org_id,
                template_id=template.id,
                status="pending_upload"
            )
            db.add(new_licence)
            created_count += 1
            
    try:
        db.commit()
        logger.info(f"Auto-created {created_count} licences for org {org_id}")
    except Exception as e:
        db.rollback()
        logger.error(f"Failed to auto-create licences: {str(e)}")
        
    return created_count

def seed_default_templates(db: Session):
    """
    Seeds the database with Priority 2 Hospital & Manufacturing licence templates.
    """
    default_templates = [
        # Hospital - Small
        {
            "id": "tpl-hosp-small-1", "licence_type": "Clinical Establishment", "regulatory_body": "State Health Dept",
            "renewal_cycle": "annual", "mandatory": True, "applicable_org_types": ["hospital"], "applicable_states": ["all"],
            "min_size_requirement": {}
        },
        {
            "id": "tpl-hosp-small-2", "licence_type": "Bio-Medical Waste Auth", "regulatory_body": "SPCB",
            "renewal_cycle": "annual", "mandatory": True, "applicable_org_types": ["hospital"], "applicable_states": ["all"],
            "min_size_requirement": {}
        },
        # Hospital - Medium
        {
            "id": "tpl-hosp-med-1", "licence_type": "Blood Bank Licence", "regulatory_body": "CDSCO",
            "renewal_cycle": "5_years", "mandatory": False, "applicable_org_types": ["hospital"], "applicable_states": ["all"],
            "min_size_requirement": {"bed_count_min": 100}
        },
        # Hospital - Large
        {
            "id": "tpl-hosp-large-1", "licence_type": "NABH Full Accreditation", "regulatory_body": "QCI",
            "renewal_cycle": "3_years", "mandatory": False, "applicable_org_types": ["hospital"], "applicable_states": ["all"],
            "min_size_requirement": {"bed_count_min": 500}
        },
        # Manufacturing - Textile
        {
            "id": "tpl-mfg-tex-1", "licence_type": "Factory Licence", "regulatory_body": "State Labour Dept",
            "renewal_cycle": "annual", "mandatory": True, "applicable_org_types": ["textile_manufacturing"], "applicable_states": ["all"],
            "min_size_requirement": {}
        },
        {
            "id": "tpl-mfg-tex-2", "licence_type": "GPCB CTO", "regulatory_body": "GPCB",
            "renewal_cycle": "5_years", "mandatory": True, "applicable_org_types": ["textile_manufacturing"], "applicable_states": ["Gujarat"],
            "min_size_requirement": {}
        }
    ]
    
    for t_data in default_templates:
        existing = db.query(LicenceTemplate).filter(LicenceTemplate.id == t_data["id"]).first()
        if not existing:
            template = LicenceTemplate(tenant_id="system", **t_data)
            db.add(template)
            
    db.commit()
