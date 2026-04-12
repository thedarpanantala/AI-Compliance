export class AIComplianceClient {
  constructor(private baseUrl: string, private token: string) {}

  async listAISystems(): Promise<Array<{ id: string; name: string }>> {
    const response = await fetch(`${this.baseUrl}/api/ai-systems`, {
      headers: { Authorization: `Bearer ${this.token}` }
    });
    if (!response.ok) throw new Error("Request failed");
    return response.json();
  }
}
