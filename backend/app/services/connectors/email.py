import imaplib
import email
from email.header import decode_header
from typing import List, Dict, Any
from .base import BaseConnector

class EmailConnector(BaseConnector):
    def __init__(self, config: Dict[str, Any], credentials: Dict[str, Any]):
        super().__init__(config, credentials)
        self.server = config.get("imap_server", "imap.gmail.com")
        self.port = config.get("port", 993)
        self.folder = config.get("folder", "INBOX")
        self.username = credentials.get("username", "")
        self.password = credentials.get("password", "")

    def test_connection(self) -> bool:
        if not self.username or not self.password:
            return False
            
        try:
            mail = imaplib.IMAP4_SSL(self.server, self.port)
            mail.login(self.username, self.password)
            mail.logout()
            return True
        except Exception as e:
            return False

    def fetch_evidence(self) -> List[Dict[str, Any]]:
        evidence_items = []
        try:
            mail = imaplib.IMAP4_SSL(self.server, self.port)
            mail.login(self.username, self.password)
            mail.select(self.folder)
            
            # Search for specific compliance emails (here just fetching last 5 as stub)
            status, messages = mail.search(None, "ALL")
            mail_ids = messages[0].split()[-5:]
            
            for i in mail_ids:
                res, msg = mail.fetch(i, "(RFC822)")
                for response in msg:
                    if isinstance(response, tuple):
                        msg = email.message_from_bytes(response[1])
                        subject, encoding = decode_header(msg["Subject"])[0]
                        if isinstance(subject, bytes):
                            subject = subject.decode(encoding if encoding else "utf-8")
                        
                        evidence_items.append({
                            "evidence_type": "email_communication",
                            "source_identifier": msg["Message-ID"],
                            "raw_content": subject,
                            "metadata": {
                                "sender": msg.get("From"),
                                "date": msg.get("Date")
                            }
                        })
            mail.logout()
        except Exception as e:
            print(f"Failed to read IMAP evidence: {str(e)}")
            
        return evidence_items
