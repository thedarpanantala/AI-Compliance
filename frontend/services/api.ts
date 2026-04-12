export type AISystem = { id: string; name: string; monitoring_enabled: boolean };

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

export async function listAISystems(): Promise<AISystem[]> {
  const response = await fetch(`${API_URL}/api/ai-systems`, { cache: "no-store" });
  if (!response.ok) throw new Error("Failed to list AI systems");
  return response.json();
}
