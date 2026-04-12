import os
import hashlib
from typing import List, Dict, Any
from .base import BaseConnector

class FileSystemConnector(BaseConnector):
    def __init__(self, config: Dict[str, Any], credentials: Dict[str, Any]):
        super().__init__(config, credentials)
        self.base_path = config.get("path", "/data/evidence")
        self.allowed_extensions = config.get("extensions", [".pdf", ".csv", ".json", ".md"])

    def test_connection(self) -> bool:
        return os.path.isdir(self.base_path)

    def fetch_evidence(self) -> List[Dict[str, Any]]:
        evidence_items = []
        if not self.test_connection():
            return evidence_items

        for root, dirs, files in os.walk(self.base_path):
            for file in files:
                if any(file.endswith(ext) for ext in self.allowed_extensions):
                    filepath = os.path.join(root, file)
                    try:
                        with open(filepath, "r", encoding="utf-8") as f:
                            content = f.read()
                            
                        evidence_items.append({
                            "evidence_type": "file_system_document",
                            "source_identifier": filepath,
                            "raw_content": content,
                            "metadata": {
                                "filename": file,
                                "size": os.path.getsize(filepath),
                            }
                        })
                    except Exception as e:
                        print(f"Failed to read file {filepath}: {str(e)}")
                        
        return evidence_items
