"""Report export utilities."""
from io import StringIO
import csv
import json


def render_json_report(payload: dict) -> str:
    """Return JSON representation of compliance report."""
    return json.dumps(payload, indent=2)


def render_csv_report(rows: list[dict]) -> str:
    """Return CSV for tabular compliance report rows."""
    if not rows:
        return ""
    output = StringIO()
    writer = csv.DictWriter(output, fieldnames=list(rows[0].keys()))
    writer.writeheader()
    writer.writerows(rows)
    return output.getvalue()
