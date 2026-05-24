export type TechItem = { name: string; color: string };
export type Challenge = { title: string; description: string };

export type Project = {
  title: string;
  category: string;
  tagline: string;
  description: string;       // short — used on the card
  overview: string;       // long — used on the Blueprint page
  role: string;
  duration: string;
  status: 'Completed' | 'In Progress' | 'Deployed' | 'Live on Play Store';
  features: string[];
  highlight: string;
  challenges: Challenge[];
  tech: TechItem[];
  image: string;
  accent: string;       // Tailwind gradient classes
  accentBorder: string;
  accentText: string;
  link: string;
  github: string;
  flip: boolean;
};

const projects: Project[] = [
  // ─────────────────────────────────────────────────────────────────────────
  // 1. Tally — flagship, live on Google Play
  // ─────────────────────────────────────────────────────────────────────────
  {
    title: 'Tally',
    category: 'Personal Finance · Live on Play Store',
    tagline: 'Your budget, automated. Bank SMS in — transactions logged out.',
    description:
      'A privacy-first Android budget tracker that reads your bank SMS and logs every payment for you. All data stays on the device — no accounts, no cloud, no subscription. Live on Google Play.',
    overview:
      'Tally is a full personal-finance app shipped end-to-end and live on the Google Play Store. It reads incoming bank SMS through an on-device regex pipeline (no cloud), extracts the amount + merchant + direction, deduplicates against past entries, filters OTPs / promos, and queues a pending transaction for the user to confirm with one tap. Multi-currency support covers ₹, $, €, £, ¥, AED and more. Beyond SMS, Tally tracks budgets across fixed bills + variable categories, auto-deducts overspend from a "piggy bank" savings buffer, scans UPI QR codes via mobile_scanner to log payments instantly, and ships banner + interstitial ads via Google AdMob with full UMP consent. Built on a fast offline Isar database, Riverpod-style state management, Material 3 dark theme. Designed for the Indian market first (UPI / Rupees / HDFC-Axis-Yes SMS formats) but works in 20+ countries.',
    role: 'Sole developer — design, code, ship, marketing, monetize',
    duration: '4 months · shipped 1.0.3+',
    status: 'Live on Play Store',
    features: [
      'On-device bank SMS parsing → auto-logged transactions (no cloud)',
      'OTP / promotional filter — no false positives in the inbox',
      'UPI QR scan-to-pay with auto-expense logging (mobile_scanner)',
      'Multi-currency: ₹ / $ / € / £ / ¥ / AED + 15 more',
      'Offline-first Isar embedded database — works without internet',
      'Piggy-bank auto-deduct when you overspend the daily allowance',
      'Spending breakdowns with per-category limit % and over-budget alerts',
      'AdMob banners + interstitials with UMP consent (GDPR / IDFA)',
      'Native Android foreground service so SMS detection survives screen-lock',
      'CSV export and full transaction history with search',
    ],
    highlight:
      'Built and shipped solo end-to-end: Flutter codebase, native Kotlin foreground service, Google Play release pipeline, 16 KB page-size compatibility for Android 15, AdMob monetization, and Play Store listing. Live in production with real users.',
    challenges: [
      {
        title: 'SMS detection accuracy across 10+ Indian bank formats',
        description:
          'HDFC, Axis, Yes, Kotak, IDFC, Federal Bank — each writes debit alerts differently. Wrote a tiered regex that handles all of them, with a separate promotional / OTP filter that runs first to eliminate false positives.',
      },
      {
        title: 'Android 15 16 KB page-size requirement',
        description:
          "Google Play started rejecting apps whose native .so libraries weren't 16 KB-aligned for 64-bit. Forked from the abandoned Isar v3 to the maintained isar_community fork, bumped mobile_scanner to v7, pinned NDK to r27, and verified alignment with llvm-objdump on every build.",
      },
      {
        title: 'Cold-start performance',
        description:
          'Initial load was ~2 s in debug, dominated by Isar opening + loading every transaction. Split _loadData into "essentials only" (budget + categories, blocks splash) and "the rest" (streamed in afterwards), bringing cold start to ~400 ms in release.',
      },
    ],
    tech: [
      { name: 'Flutter', color: '#54C5F8' },
      { name: 'Dart', color: '#0175C2' },
      { name: 'Kotlin', color: '#A97BFF' },
      { name: 'Isar', color: '#6C47FF' },
      { name: 'AdMob', color: '#F9AB00' },
      { name: 'Android NDK', color: '#3DDC84' },
    ],
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2000&auto=format&fit=crop',
    accent: 'from-yellow-500/20 to-amber-500/10',
    accentBorder: 'border-yellow-500/30',
    accentText: 'text-yellow-400',
    link: 'https://play.google.com/store/apps/details?id=com.mybudget.tally',
    github: 'https://github.com/badevil666/Tally',
    flip: false,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 2. DeCloud — most ambitious system; B.Tech best project award
  // ─────────────────────────────────────────────────────────────────────────
  {
    title: 'DeCloud',
    category: 'Decentralized Storage · Ethereum + 4-component system',
    tagline: 'Own your storage. Earn from your disk. No middleman.',
    description:
      'A four-component decentralized cloud storage platform: storage providers earn DCLD tokens by hosting encrypted file shards. Backed by Ethereum smart contracts. Awarded best B.Tech final-year project.',
    overview:
      'DeCloud is a full peer-to-peer storage platform built as four coordinated components: a Node.js + Postgres backend (file metadata, SIWE auth, deal management), a WebSocket relay that tunnels encrypted chunks between clients and storage peers, an Electron desktop "storage node" app that runs on contributors\' machines (stores chunks, earns DCLD tokens, registers on-chain), and a Flutter mobile wallet client. Files are chunked client-side, hashed with SHA-256 + Merkle-tree commitments, encrypted, then replicated across geographically distinct nodes. Storage deals are signed using EIP-712 typed data; provider rewards are paid by an ERC-20 token (DCLD) and a NodeRegistry smart contract on Sepolia testnet. Auth across all four components uses Sign-In With Ethereum (EIP-191).',
    role: 'Architect & lead developer — backend, relay, smart contracts, mobile',
    duration: 'Final-year capstone · 6 months',
    status: 'Completed',
    features: [
      'Four-component system: backend, relay, desktop node, mobile wallet',
      'Sign-In With Ethereum (SIWE / EIP-191) across every component',
      'File chunking + SHA-256 Merkle-root integrity proofs',
      'EIP-712 typed-data signing for storage deals',
      'ERC-20 DCLD token + NodeRegistry contract on Sepolia',
      'WebSocket relay tunneling encrypted chunks between client ↔ peer',
      'Electron desktop "storage node" with on-chain auto-registration',
      'Flutter mobile wallet (non-custodial, BIP-39 seed)',
      'Challenge-response uptime proofs to slash dishonest providers',
    ],
    highlight:
      'Selected as the best B.Tech final-year project. Combines a production-quality Node.js backend, a real-time WebSocket relay, a desktop daemon with on-chain registration, a mobile wallet, and Solidity smart contracts — all sharing one wallet-based auth scheme.',
    challenges: [
      {
        title: 'Data integrity without a trusted coordinator',
        description:
          'No central server can vouch for file integrity. Built Merkle-tree-based commitments that any client can verify independently — the on-chain hash of the root is enough to detect any silent corruption.',
      },
      {
        title: 'Fair reward distribution + sybil resistance',
        description:
          "Providers could fake uptime to farm rewards. Implemented a random-beacon challenge-response system: the contract periodically asks for a proof-of-storage; missing a challenge slashes the provider's staked DCLD collateral.",
      },
      {
        title: 'Auth shared across four runtimes',
        description:
          'Backend (Node.js), relay (Node.js), desktop (Electron), and mobile (Flutter) all needed unified auth. Settled on SIWE (EIP-191): client signs a server-issued nonce with their wallet, server verifies the signature with ethers.js, JWT issued. Same flow everywhere.',
      },
    ],
    tech: [
      { name: 'Node.js', color: '#339933' },
      { name: 'PostgreSQL', color: '#336791' },
      { name: 'Solidity', color: '#627EEA' },
      { name: 'Hardhat', color: '#e5cc00' },
      { name: 'Electron', color: '#47848F' },
      { name: 'Flutter', color: '#54C5F8' },
      { name: 'WebSocket', color: '#a855f7' },
    ],
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2000&auto=format&fit=crop',
    accent: 'from-sky-500/20 to-violet-500/10',
    accentBorder: 'border-sky-500/30',
    accentText: 'text-sky-400',
    link: '#',
    github: 'https://github.com/badevil666/DeCloud',
    flip: true,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 3. LocalCCTV — cross-platform, real-time, WebRTC
  // ─────────────────────────────────────────────────────────────────────────
  {
    title: 'LocalCCTV',
    category: 'Real-time Surveillance · WebRTC over LAN',
    tagline: 'Your phones + laptops = a private CCTV system. No cloud.',
    description:
      'Two-app real-time surveillance system. Any Android phone or desktop can be the host (live grid view) or a camera (streams over LAN). Sub-second WebRTC video, UDP auto-discovery, push-to-talk audio. No cloud.',
    overview:
      'LocalCCTV turns devices you already own into a private surveillance network that runs entirely on your local Wi-Fi — no cloud, no accounts, no subscription. Two apps share one signaling protocol: a Flutter Android app and an Electron desktop app (Win / Mac / Linux). Either can be the host (runs the signaling server + shows all camera feeds in a live grid) or a client (streams its camera + audio). WebRTC handles the actual media flow peer-to-peer for sub-second latency. Hosts auto-broadcast their presence on UDP port 8766; clients listen and show a live picker. The host has per-tile recording, rotation, push-to-talk audio back to a chosen camera, and automatic portrait/landscape detection based on the WebRTC rotation flag in the RTP header.',
    role: 'Sole architect & developer — Flutter + Electron + signaling protocol',
    duration: '3 weeks · two apps shipped',
    status: 'Completed',
    features: [
      'Two apps, one signaling protocol: Flutter (Android) + Electron (cross-platform)',
      'Sub-second WebRTC video over LAN — peer-to-peer, no relay',
      'UDP broadcast auto-discovery — no IP typing, devices find each other',
      'Live grid view with adaptive 1/2/3 columns based on camera count',
      'Per-tile rotation (0/90/180/270°) + portrait/landscape auto-detection',
      'Push-to-talk audio from host to any specific camera',
      'Per-stream recording (host saves WebM/MP4 of any feed)',
      'Wi-Fi multicast lock on Android for reliable discovery while screen-off',
      'Android foreground service so streaming survives lockscreen',
      'Instant Host ↔ Client mode switching (one button, no restart)',
    ],
    highlight:
      'Built two production-grade real-time apps that share one custom signaling protocol — Flutter Android and Electron desktop. WebRTC star topology, host-initiated SDP offers, exponential-backoff reconnect, stale-PeerConnection cleanup. All in three weeks.',
    challenges: [
      {
        title: 'WebRTC peer-connection lifecycle bugs',
        description:
          'Rapid reconnects (lock-screen → resume, mode switching) caused stale RTCPeerConnections on the host side. Symptom was endless "STUN BINDING request with bad M-I" errors. Fixed by closing any existing PC for a given peerId BEFORE creating a new one, on both client and host.',
      },
      {
        title: 'mDNS reliability on Android',
        description:
          'multicast_dns silently failed on many Android devices. Replaced with a pure UDP broadcast discovery protocol: hosts broadcast their info every 2s on port 8766; clients listen. Acquired a Wi-Fi multicast lock via a native Kotlin platform channel so the discovery works even with screen off.',
      },
      {
        title: 'Portrait/landscape detection without re-encoding',
        description:
          "Phones held in portrait sent video that the host displayed landscape (cropped). Fixed by reading the WebRTC rotation flag from the RTP header on the host side and resizing the tile's aspect ratio dynamically — no extra latency.",
      },
    ],
    tech: [
      { name: 'Flutter', color: '#54C5F8' },
      { name: 'Electron', color: '#47848F' },
      { name: 'WebRTC', color: '#000000' },
      { name: 'TypeScript', color: '#3178C6' },
      { name: 'React', color: '#61DAFB' },
      { name: 'Kotlin', color: '#A97BFF' },
      { name: 'WebSocket', color: '#a855f7' },
    ],
    image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?q=80&w=2000&auto=format&fit=crop',
    accent: 'from-emerald-500/20 to-teal-500/10',
    accentBorder: 'border-emerald-500/30',
    accentText: 'text-emerald-400',
    link: '#',
    github: 'https://github.com/badevil666/LocalCCTV',
    flip: false,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 4. Scribe — on-device AI
  // ─────────────────────────────────────────────────────────────────────────
  {
    title: 'Scribe',
    category: 'On-device AI · Voice Transcription',
    tagline: 'Record. Transcribe. All on your phone. No internet required.',
    description:
      "A voice recorder for iOS and Android with offline AI transcription. Runs OpenAI's Whisper model locally via native C++ bindings — your audio never leaves the device.",
    overview:
      "Scribe records audio and transcribes it entirely on-device using OpenAI's Whisper model compiled to C++ (whisper.cpp) and bridged into Flutter via Dart FFI. No API calls, no servers, no internet — the audio file and the resulting transcript never leave the user's phone. Built with Flutter for cross-platform shipping, Provider for state, Isar for local storage, and the `record` + `just_audio` packages for the audio pipeline. Designed as a privacy-first alternative to cloud transcription apps like Otter.ai or Notta.",
    role: 'Sole developer — audio pipeline, on-device ML bridge, UI',
    duration: '6 weeks',
    status: 'Completed',
    features: [
      'On-device Whisper transcription via whisper.cpp + Dart FFI',
      'Zero network calls — audio + transcript never leave the device',
      'High-quality audio recording with the `record` package',
      'Searchable, editable transcript library in Isar',
      'Cross-platform Flutter (iOS + Android)',
      'Multiple model sizes (tiny / base / small) with quality/speed trade-off',
    ],
    highlight:
      'Clean example of edge ML in Flutter — a Whisper model running through native C++ bindings, exposed through Dart FFI, with no cloud dependency or API key. Audio stays private; transcription is free and unlimited.',
    challenges: [
      {
        title: 'Bridging Whisper.cpp into Flutter',
        description:
          'whisper.cpp is C++; Dart talks to it through FFI. Building the right FFI bindings for both iOS and Android, marshalling audio buffers without copying, and managing the C++ memory lifecycle from Dart was the trickiest part.',
      },
      {
        title: 'Audio capture quality vs file size',
        description:
          'Whisper needs 16 kHz mono PCM. Recording at higher rates wastes battery and storage; recording natively at 16 kHz on every Android device requires careful config. Settled on capturing at device-native rate and downsampling in Dart before passing to whisper.cpp.',
      },
    ],
    tech: [
      { name: 'Flutter', color: '#54C5F8' },
      { name: 'Dart FFI', color: '#0175C2' },
      { name: 'whisper.cpp', color: '#412991' },
      { name: 'C++', color: '#00599C' },
      { name: 'Isar', color: '#6C47FF' },
    ],
    image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=2000&auto=format&fit=crop',
    accent: 'from-violet-500/20 to-fuchsia-500/10',
    accentBorder: 'border-violet-500/30',
    accentText: 'text-violet-400',
    link: '#',
    github: 'https://github.com/badevil666',
    flip: true,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 5. Socials — AI content platform
  // ─────────────────────────────────────────────────────────────────────────
  {
    title: 'Socials',
    category: 'AI Social Media Platform',
    tagline: 'Your AI-powered content engine — from idea to post in seconds.',
    description:
      'A full-stack platform that lets creators generate AI-powered captions and automate scheduled posting across social media channels — all from one dashboard.',
    overview:
      'Socials was born out of the problem that content creators spend more time writing captions and scheduling posts than actually creating. The platform integrates LLM APIs to generate on-brand captions from a simple prompt or uploaded image, then lets users schedule and auto-publish across multiple platforms. The backend is built with FastAPI for its native async support, allowing thousands of scheduled jobs to run in parallel without blocking API responses. Media assets are stored via CDN with automatic format optimisation on upload. The React dashboard gives a real-time view of scheduled content, engagement analytics, and AI generation history.',
    role: 'Solo Full-Stack Developer',
    duration: '3 months',
    status: 'Deployed',
    features: [
      'AI caption generation via LLM API integration',
      'Automated scheduled posting across platforms',
      'Media upload pipeline with CDN optimisation',
      'Analytics dashboard for engagement tracking',
      'Async task queue for non-blocking post scheduling',
    ],
    highlight:
      'FastAPI async backend handles burst traffic with a Celery task queue, keeping API response times under 200 ms even during peak scheduling windows with hundreds of concurrent jobs.',
    challenges: [
      {
        title: 'Rate limiting across platforms',
        description:
          'Each social platform enforces strict per-minute API limits. Solved this by building a per-platform token-bucket rate limiter inside the task queue so jobs self-throttle without failing.',
      },
      {
        title: 'LLM response consistency',
        description:
          'Raw LLM output was inconsistent in tone and length. Added a prompt engineering layer with post-processing validation that re-generates if the output fails quality heuristics.',
      },
    ],
    tech: [
      { name: 'Python', color: '#3776AB' },
      { name: 'FastAPI', color: '#009688' },
      { name: 'PostgreSQL', color: '#336791' },
      { name: 'React', color: '#61DAFB' },
      { name: 'Celery', color: '#a855f7' },
      { name: 'LLM APIs', color: '#f59e0b' },
    ],
    image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=2000&auto=format&fit=crop',
    accent: 'from-purple-500/20 to-emerald-500/10',
    accentBorder: 'border-purple-500/25',
    accentText: 'text-purple-400',
    link: 'https://socials.yoco.co.in',
    github: 'https://github.com/badevil666',
    flip: false,
  },
];

export default projects;
