import "./styles.css";
import type { ReactNode } from "react";

import { AppShell } from "@/components/AppShell";
import { ComplianceAgent } from "@/components/ComplianceAgent";
import { Providers } from "@/components/Providers";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <AppShell>{children}</AppShell>
          <ComplianceAgent orgId="demo-org" userId="demo-user" />
        </Providers>
      </body>
    </html>
  );
}
