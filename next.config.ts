import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  // Allow accessing the dev server over LAN (e.g. from a phone or another PC).
  // Without this, Next blocks cross-origin dev resources (/_next/*) for
  // non-localhost origins → React never hydrates → auth forms & role
  // selector appear "dead" when browsing via 192.168.x.x.
  allowedDevOrigins: ["192.168.0.108", "192.168.0.*"],
}

export default nextConfig
