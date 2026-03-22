// src/app/whitepaper.pdf/route.ts

// Static PDF whitepaper — generated at build time, served at /whitepaper.pdf
// Next.js App Router route handler: exports a GET that returns raw bytes + content-type

import { jsPDF } from 'jspdf';
import fs from 'node:fs';
import path from 'node:path';

// ─── Brand colors (R, G, B 0–255) ──────────────────────────────────────────────
const COLORS = {
  lavender:  [167, 85, 247],     // #a755f7
  fuchsia:   [192, 38, 211],     // #c026d3
  dark:      [15, 3, 30],        // #0f031e
  white:     [255, 255, 255],
  lightGray: [240, 240, 245],
  medGray:   [102, 102, 115],
  black:     [15, 15, 15],
} as const;

// ─── Whitepaper content ─────────────────────────────────────────────────────────
const WHITEPAPER = {
  title: 'Nod\u039ERunr Whitepaper',
  subtitle: 'version 0.1',
  date: 'March 2026',
  tagline: '24x7 Layer-1 Concierge',

  sections: [
    {
      heading: '1. Abstract',
      body: [
        'Nod\u039ERunr is a lightweight, smart daemon delivering effortless SysOps to Avalanche Founders and Teams. It enables operators to maintain AVAX Layer-1 nodes from anywhere, at any time, assuring their communities of a SAFU (Secure Asset Fund for Users) space with minimal operational overhead.',
        'This paper describes the architecture, deployment model, security posture, feature set, and roadmap of the Nod\u039ERunr platform. It is written for Avalanche L1 operators, validators, DevOps engineers, and blockchain architects who want to understand the technical foundations of Nod\u039ERunr before integrating it into their infrastructure.',
      ],
    },
    {
      heading: '2. Introduction',
      body: [
        'Running an Avalanche Layer-1 blockchain requires persistent infrastructure management: node installation, version upgrades, health monitoring, key management, and vulnerability patching. For small teams and solo founders, these SysOps tasks consume engineering time that would be better spent building applications and growing communities.',
        'Nod\u039ERunr eliminates this operational burden. Written in Rust for performance and reliability, it provides a single-command installation, automatic AvalancheGo management, cross-platform support (Linux, macOS, Windows via WSL), and end-to-end encrypted communication between nodes and operator clients.',
        'The daemon is designed for the era of AI-assisted infrastructure management. Its CLI and SDK are structured for LLM tool-calling, enabling AI agents to monitor, configure, and maintain L1 nodes programmatically. Nod\u039ERunr is Free and Open Source Software (FOSS), distributed at no cost to the Avalanche ecosystem.',
      ],
    },
    {
      heading: '3. Architecture Overview',
      body: [
        '3.1 Smart Daemon Design',
        'Nod\u039ERunr runs as a lightweight background daemon on the same host as the AvalancheGo node (or on a dedicated management server). It exposes a secure API for remote management and performs autonomous health checks, log rotation, and upgrade scheduling.',
        '\u2022 Rust Core: The daemon is written in Rust, providing memory safety, zero-cost abstractions, and predictable performance without garbage collection pauses.',
        '\u2022 Single-Command Install: One curl command installs the daemon, AvalancheGo, Golang (if needed), and the most popular virtual machines (VMs).',
        '\u2022 Minimal Footprint: The daemon consumes less than 50MB of RAM and negligible CPU when idle, ensuring it does not compete with the AvalancheGo process for resources.',
        '3.2 Cross-Platform Support',
        'Nod\u039ERunr supports all major operating systems used by Avalanche operators:',
        '\u2022 Linux: Native support for Ubuntu, Debian, CentOS, and other major distributions. Primary deployment target.',
        '\u2022 macOS: Native support for Apple Silicon and Intel Macs. Useful for local development and testnet operation.',
        '\u2022 Windows: Support via WSL (Windows Subsystem for Linux) and native PowerShell installation script.',
        '3.3 Communication Layer',
        'All communication between the Nod\u039ERunr daemon and operator clients is end-to-end encrypted by default using modern TLS 1.3 with certificate pinning. This ensures that node management commands cannot be intercepted or tampered with, even on untrusted networks.',
      ],
    },
    {
      heading: '4. Core Features',
      body: [
        '4.1 1-Click Blockchain Setup',
        'Nod\u039ERunr automates the complete setup of an Avalanche L1 node:',
        '\u2022 Automatically installs Golang (required by AvalancheGo)',
        '\u2022 Automatically installs and configures AvalancheGo',
        '\u2022 Automatically installs the most popular virtual machines (Subnet-EVM, TimestampVM, etc.)',
        '\u2022 Enables integration with Fuji (Testnet) and Mainnet',
        '\u2022 Configures firewall rules, systemd services, and log rotation',
        '4.2 Avalanche Precompiles Concierge',
        'Layer-1 blockchain architects can build and deploy custom precompiles directly into their network\'s configuration through Nod\u039ERunr. The daemon provides templates and scaffolding for common precompile patterns (allowlists, fee managers, native minters, etc.) and handles the compilation, testing, and deployment pipeline.',
        '4.3 Node Health Monitoring',
        'The daemon continuously monitors node health metrics:',
        '\u2022 Block height and sync status',
        '\u2022 Peer count and network connectivity',
        '\u2022 CPU, memory, and disk utilization',
        '\u2022 AvalancheGo process status and restart on failure',
        '\u2022 Vulnerability signature database for known attack patterns',
        '4.4 Automated Upgrades',
        'When a new AvalancheGo release is published, Nod\u039ERunr can automatically download, verify, and install the upgrade with zero downtime using a rolling restart strategy. Operators can configure upgrade policies: automatic, manual approval, or scheduled maintenance windows.',
        '4.5 L1 Templates',
        'Nod\u039ERunr ships with curated Layer-1 templates optimized for specific use cases:',
        '\u2022 DeFi L1: Optimized gas parameters, pre-deployed AMM factory contracts, oracle integration',
        '\u2022 Gaming L1: High-throughput configuration, low-latency block times, NFT-optimized storage',
        '\u2022 Enterprise L1: Permissioned validator set, compliance-ready logging, KYC integration hooks',
      ],
    },
    {
      heading: '5. Security',
      body: [
        '5.1 End-to-End Encryption',
        'All communications between the Nod\u039ERunr daemon and operator clients are encrypted using TLS 1.3 with mutual authentication. Certificate provisioning is automatic \u2014 the daemon generates a self-signed CA on first run and issues client certificates to authorized operators.',
        '5.2 Vulnerability Signature Database',
        'Nod\u039ERunr maintains a continuously updated database of known vulnerability signatures targeting Avalanche nodes. The daemon scans incoming network traffic and node logs against these signatures, alerting operators and optionally auto-mitigating detected threats.',
        '5.3 Key Management',
        'Node staking keys and BLS signing keys are stored in encrypted keystores. The daemon never exposes private key material over the network. Key rotation and backup are supported through the CLI and API.',
        '5.4 Audit Posture',
        'The Nod\u039ERunr codebase is open source and available for public audit. The team is committed to professional security audits before each major release, with audit reports published to the documentation site.',
      ],
    },
    {
      heading: '6. Avalanche Ecosystem Integration',
      body: [
        'Nod\u039ERunr is purpose-built for the Avalanche ecosystem and integrates deeply with its tooling and infrastructure:',
        '\u2022 AvalancheGo: Direct process management, configuration, and upgrade handling for the core Avalanche node software.',
        '\u2022 Avalanche CLI: Compatible with avalanche-cli for subnet creation, validator management, and network configuration.',
        '\u2022 Avalanche Warp Messaging (AWM): Monitoring and relay support for cross-L1 messages.',
        '\u2022 Fuji Testnet: First-class testnet support with automatic faucet integration for development and testing.',
        '\u2022 Retro9000: Nod\u039ERunr was initially developed as an AVAX Retro9000 submission, demonstrating the Avalanche ecosystem\'s support for builder-driven innovation.',
      ],
    },
    {
      heading: '7. AI-Assisted Operations',
      body: [
        'Nod\u039ERunr is designed for the emerging paradigm of AI-assisted infrastructure management:',
        '\u2022 Structured CLI: All CLI commands produce machine-readable JSON output, enabling LLM agents to parse and act on node status, health metrics, and configuration state.',
        '\u2022 Tool-Calling SDK: TypeScript and Python SDKs with function signatures optimized for LLM tool-calling. AI agents can install nodes, check health, trigger upgrades, and manage validators through structured function calls.',
        '\u2022 Natural Language Operations: Operators can describe desired infrastructure changes in plain English. The Nod\u039ERunr CLI interprets these through an LLM integration layer and executes the corresponding operations with human approval gates.',
        '\u2022 Autonomous Monitoring: AI agents can subscribe to health event streams and autonomously respond to incidents (restart crashed nodes, scale resources, alert operators) based on configurable policies.',
      ],
    },
    {
      heading: '8. Deployment Model',
      body: [
        '8.1 Installation',
        'Linux and macOS:',
        'curl -sSL https://L1.run/noderunr | bash',
        '',
        'Windows (PowerShell):',
        'powershell -c "irm L1.run/install.ps1|iex"',
        '',
        'Both commands download the latest release, verify its signature, install dependencies, and start the daemon. The entire process takes under 60 seconds on a modern machine.',
        '8.2 Pricing',
        'Nod\u039ERunr is completely FREE. There are no paid tiers, no usage limits, and no telemetry. The project is funded by Avalanche ecosystem grants and maintained by aBitSuite.',
        '8.3 Open Source',
        'The complete Nod\u039ERunr source code is available on GitHub under the MIT license. Community contributions are welcome and encouraged.',
      ],
    },
    {
      heading: '9. Roadmap',
      body: [
        'Q4 2024: 1st release, 1-click blockchain setup, AvalancheGo installation, Fuji testnet support',
        'Q1 2025: Windows support, Avalanche precompiles concierge, E2E encryption by default',
        'Q2 2025: Mainnet (Etna) release, open source all libraries, vulnerability signature database',
        'Q3 2025: Mobile client for Android and iOS (via aBitSuite), gaming L1 templates',
        'Q4 2025: AI-assisted operations SDK, natural language node management',
        'Q1 2026: Automated cross-L1 monitoring, AWM relay support, enterprise L1 templates',
        'Q2 2026: Professional security audit, audit report publication',
        'Q3 2026: Multi-node fleet management, dashboard UI',
        'Q4 2026: Marketplace for community L1 templates and precompile packages',
      ],
    },
    {
      heading: '10. Conclusion',
      body: [
        'Nod\u039ERunr removes the operational complexity of running Avalanche Layer-1 blockchains. By automating installation, upgrades, monitoring, and security, it frees founders and teams to focus on what matters: building applications and growing communities.',
        'Written in Rust for performance, encrypted by default for security, and structured for AI-assisted operations, Nod\u039ERunr represents a new standard for blockchain infrastructure tooling. It is free, open source, and built by the Avalanche community for the Avalanche community.',
        'Install it in 60 seconds. Manage your L1 from anywhere. Never worry about node ops again.',
      ],
    },
    {
      heading: '11. References',
      body: [
        '[1] Avalanche Platform \u2014 https://www.avax.network',
        '[2] AvalancheGo \u2014 https://github.com/ava-labs/avalanchego',
        '[3] Avalanche CLI \u2014 https://github.com/ava-labs/avalanche-cli',
        '[4] Avalanche Warp Messaging \u2014 https://docs.avax.network/cross-chain/avalanche-warp-messaging',
        '[5] Subnet-EVM \u2014 https://github.com/ava-labs/subnet-evm',
        '[6] AVAX Retro9000 \u2014 https://retro9000.avax.network',
        '[7] Nod\u039ERunr Documentation \u2014 https://docs.l1.run',
        '[8] Nod\u039ERunr Source Code \u2014 https://github.com/nyusternie/layer1run',
      ],
    },
  ],
};

// ─── Main PDF generation ────────────────────────────────────────────────────────

function generateWhitepaper(): ArrayBuffer {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'pt',
    format: 'letter',
  });

  // Register custom fonts (supports full Unicode including Greek Ξ)
  const fontsDir = path.resolve('src/fonts');
  const regularB64 = fs.readFileSync(path.join(fontsDir, 'NotoSans-Regular.ttf')).toString('base64');
  const boldB64 = fs.readFileSync(path.join(fontsDir, 'NotoSans-Bold.ttf')).toString('base64');
  const italicB64 = fs.readFileSync(path.join(fontsDir, 'NotoSans-Italic.ttf')).toString('base64');
  doc.addFileToVFS('NotoSans-Regular.ttf', regularB64);
  doc.addFileToVFS('NotoSans-Bold.ttf', boldB64);
  doc.addFileToVFS('NotoSans-Italic.ttf', italicB64);
  doc.addFont('NotoSans-Regular.ttf', 'NotoSans', 'normal');
  doc.addFont('NotoSans-Bold.ttf', 'NotoSans', 'bold');
  doc.addFont('NotoSans-Italic.ttf', 'NotoSans', 'italic');

  // Set PDF metadata
  doc.setProperties({
    title: 'Nod\u039ERunr \u2014 24x7 Layer-1 Concierge Whitepaper v0.1',
    author: 'aBitSuite',
    subject: 'Lightweight Smart Daemon for Avalanche L1 Node Management',
    keywords: 'Avalanche, NodΞRunr, L1, Layer-1, node management, SysOps, whitepaper',
    creator: 'l1.run',
  });

  // Page dimensions (US Letter in points: 612 x 792)
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const marginLeft = 60;
  const marginRight = 60;
  const marginTop = 60;
  const marginBottom = 60;
  const contentWidth = pageWidth - marginLeft - marginRight;

  // Font sizes
  const TITLE_SIZE = 28;
  const SUBTITLE_SIZE = 14;
  const HEADING_SIZE = 16;
  const BODY_SIZE = 10;
  const TAGLINE_SIZE = 12;
  const FOOTER_SIZE = 8;

  // Line heights
  const HEADING_LINE_HEIGHT = HEADING_SIZE * 1.6;
  const BODY_LINE_HEIGHT = BODY_SIZE * 1.6;

  // Tracking
  let cursorY = marginTop;
  let pageNum = 1;

  // ─── Helper: set fill color from array ──────────────────────────────────────
  function setFill(c: readonly number[]) {
    doc.setFillColor(c[0], c[1], c[2]);
  }
  function setTextCol(c: readonly number[]) {
    doc.setTextColor(c[0], c[1], c[2]);
  }
  function setDrawCol(c: readonly number[]) {
    doc.setDrawColor(c[0], c[1], c[2]);
  }

  // ─── Helper: add footer to a content page ─────────────────────────────────
  function addPageFooter(num: number) {
    // Accent line
    setDrawCol(COLORS.lightGray);
    doc.setLineWidth(0.5);
    doc.line(marginLeft, pageHeight - marginBottom + 15, pageWidth - marginRight, pageHeight - marginBottom + 15);

    // Page number
    const numStr = `${num}`;
    doc.setFont('NotoSans', 'normal');
    doc.setFontSize(FOOTER_SIZE);
    setTextCol(COLORS.medGray);
    const numWidth = doc.getTextWidth(numStr);
    doc.text(numStr, pageWidth - marginRight - numWidth, pageHeight - marginBottom + 28);

    // Footer text
    doc.setFont('NotoSans', 'italic');
    doc.text('Nod\u039ERunr \u2014 24x7 Layer-1 Concierge', marginLeft, pageHeight - marginBottom + 28);
  }

  // ─── Helper: ensure space, or create new page ─────────────────────────────
  function ensureSpace(needed: number) {
    if (cursorY + needed > pageHeight - marginBottom) {
      addPageFooter(pageNum);
      doc.addPage();
      cursorY = marginTop;
      pageNum++;
    }
  }

  // ─── Cover page ─────────────────────────────────────────────────────────────

  // Dark background
  setFill(COLORS.dark);
  doc.rect(0, 0, pageWidth, pageHeight, 'F');

  // Accent bar at top
  setFill(COLORS.lavender);
  doc.rect(0, 0, pageWidth, 6, 'F');

  // Title
  doc.setFont('NotoSans', 'bold');
  doc.setFontSize(TITLE_SIZE);
  setTextCol(COLORS.white);
  const titleWidth = doc.getTextWidth(WHITEPAPER.title);
  doc.text(WHITEPAPER.title, (pageWidth - titleWidth) / 2, pageHeight / 2 - 80);

  // Subtitle
  doc.setFont('NotoSans', 'normal');
  doc.setFontSize(SUBTITLE_SIZE);
  setTextCol(COLORS.lavender);
  const subtitleWidth = doc.getTextWidth(WHITEPAPER.subtitle);
  doc.text(WHITEPAPER.subtitle, (pageWidth - subtitleWidth) / 2, pageHeight / 2 - 50);

  // Tagline
  doc.setFont('NotoSans', 'italic');
  doc.setFontSize(TAGLINE_SIZE);
  setTextCol(COLORS.fuchsia);
  const taglineWidth = doc.getTextWidth(WHITEPAPER.tagline);
  doc.text(WHITEPAPER.tagline, (pageWidth - taglineWidth) / 2, pageHeight / 2);

  // Date
  doc.setFont('NotoSans', 'normal');
  doc.setFontSize(BODY_SIZE);
  setTextCol(COLORS.medGray);
  const dateWidth = doc.getTextWidth(WHITEPAPER.date);
  doc.text(WHITEPAPER.date, (pageWidth - dateWidth) / 2, pageHeight / 2 + 30);

  // URL
  const url = 'https://l1.run';
  setTextCol(COLORS.lavender);
  const urlWidth = doc.getTextWidth(url);
  doc.text(url, (pageWidth - urlWidth) / 2, pageHeight - marginBottom - 20);

  // Install command
  doc.setFont('NotoSans', 'normal');
  doc.setFontSize(9);
  setTextCol(COLORS.medGray);
  const installCmd = 'curl -sSL https://L1.run/noderunr | bash';
  const installWidth = doc.getTextWidth(installCmd);
  doc.text(installCmd, (pageWidth - installWidth) / 2, pageHeight - marginBottom - 5);

  // ─── Table of Contents page ─────────────────────────────────────────────────
  doc.addPage();
  pageNum++;
  let tocY = marginTop;

  doc.setFont('NotoSans', 'bold');
  doc.setFontSize(HEADING_SIZE + 4);
  setTextCol(COLORS.black);
  doc.text('Table of Contents', marginLeft, tocY);
  tocY += HEADING_LINE_HEIGHT * 2;

  // Accent line under TOC heading
  setFill(COLORS.lavender);
  doc.rect(marginLeft, tocY - HEADING_LINE_HEIGHT + 4, 100, 2, 'F');

  for (const section of WHITEPAPER.sections) {
    doc.setFont('NotoSans', 'normal');
    doc.setFontSize(BODY_SIZE + 1);
    setTextCol(COLORS.black);
    doc.text(section.heading, marginLeft + 10, tocY);
    tocY += BODY_LINE_HEIGHT * 1.4;

    // If we run out of room on TOC page, just stop (11 sections fit easily on letter)
    if (tocY > pageHeight - marginBottom) break;
  }

  // ─── Content pages ──────────────────────────────────────────────────────────
  doc.addPage();
  pageNum++;
  cursorY = marginTop;

  for (const section of WHITEPAPER.sections) {
    // Section heading
    ensureSpace(HEADING_LINE_HEIGHT * 3);

    // Accent dot before heading
    setFill(COLORS.lavender);
    doc.rect(marginLeft - 12, cursorY - 8, 5, 5, 'F');

    doc.setFont('NotoSans', 'bold');
    doc.setFontSize(HEADING_SIZE);
    setTextCol(COLORS.black);
    doc.text(section.heading, marginLeft, cursorY);
    cursorY += HEADING_LINE_HEIGHT * 1.5;

    // Body paragraphs
    for (const paragraph of section.body) {
      // Empty string = visual paragraph break
      if (paragraph === '') {
        cursorY += BODY_LINE_HEIGHT * 0.5;
        continue;
      }

      // Detect bullet points
      const isBullet = paragraph.startsWith('\u2022');
      const indent = isBullet ? 15 : 0;
      const effectiveWidth = contentWidth - indent;

      // Detect sub-headings (e.g. "3.1 Smart Daemon Design")
      const isSubHeading = /^\d+\.\d+\s/.test(paragraph);

      const fontStyle = isSubHeading ? 'bold' : 'normal';
      const fontSize = isSubHeading ? BODY_SIZE + 1 : BODY_SIZE;

      doc.setFont('NotoSans', fontStyle);
      doc.setFontSize(fontSize);
      setTextCol(COLORS.black);

      const lines = doc.splitTextToSize(paragraph, effectiveWidth);

      ensureSpace(lines.length * BODY_LINE_HEIGHT + BODY_LINE_HEIGHT);

      for (const line of lines) {
        doc.text(line, marginLeft + indent, cursorY);
        cursorY += BODY_LINE_HEIGHT;
      }

      // Paragraph spacing
      cursorY += BODY_LINE_HEIGHT * 0.4;
    }

    // Section spacing
    cursorY += HEADING_LINE_HEIGHT * 0.5;
  }

  // Add footer to final page
  addPageFooter(pageNum);

  // ─── Add footers to all content pages (page 3 onward) ──────────────────────
  // Note: footers for intermediate pages were already added by ensureSpace.
  // The cover (page 1) and TOC (page 2) intentionally have no footer.

  // ─── Serialize ──────────────────────────────────────────────────────────────
  return doc.output('arraybuffer');
}

// ─── Next.js App Router route handler ───────────────────────────────────────────
// Generates the PDF at request time (or at build time with generateStaticParams)
// Served at /whitepaper.pdf

export async function GET() {
  try {
    const pdfBytes = generateWhitepaper();

    return new Response(Buffer.from(pdfBytes), {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'inline; filename="NodeRunr_Whitepaper-v0.1.pdf"',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch (error) {
    // Debug: surface the error
    const message = error instanceof Error ? error.message : 'Unknown error generating PDF';
    console.error('[whitepaper] PDF generation failed:', message);

    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
