"""Compliance catalog tests."""
from app.compliance_catalog import INDUSTRY_DROPDOWN, build_dynamic_checklist


def test_industry_dropdown_includes_requested_categories() -> None:
    assert "Chemical Industry" in INDUSTRY_DROPDOWN
    assert "Food & Agriculture" in INDUSTRY_DROPDOWN
    assert "Manufacturing & Engineering" in INDUSTRY_DROPDOWN


def test_dynamic_checklist_includes_conditional_export_items() -> None:
    data = build_dynamic_checklist("Chemical Industry", export_markets=["EU", "US"])
    assert "GST Registration" in data["universal_mandatory"]
    assert any(item["name"] == "Factory License" for item in data["industry_specific_mandatory"])
    assert "REACH Registration" in data["export_certifications"]
    assert "TSCA Inventory" in data["export_certifications"]
