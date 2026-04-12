from abc import ABC, abstractmethod
from typing import List, Dict, Any

class BaseConnector(ABC):
    def __init__(self, config: Dict[str, Any], credentials: Dict[str, Any]):
        self.config = config
        self.credentials = credentials

    @abstractmethod
    def test_connection(self) -> bool:
        """
        Test if the connection uses valid credentials and config.
        Returns True if successful, False otherwise.
        """
        pass

    @abstractmethod
    def fetch_evidence(self) -> List[Dict[str, Any]]:
        """
        Fetch evidence items from the configured source.
        Returns a list of dictionaries with raw evidence data.
        """
        pass
