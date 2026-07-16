# Vantix

### AI-Native Stadium Intelligence Platform for FIFA World Cup 2026

[![License](https://img.shields.io/github/license/shaaannn7/vantix?color=blue)](LICENSE)
[![Stars](https://img.shields.io/github/stars/shaaannn7/vantix?style=flat)](https://github.com/shaaannn7/vantix/stargazers)
[![Issues](https://img.shields.io/github/issues/shaaannn7/vantix)](https://github.com/shaaannn7/vantix/issues)
[![Pull Requests](https://img.shields.io/github/issues-pr/shaaannn7/vantix)](https://github.com/shaaannn7/vantix/pulls)
[![Tech Stack](https://img.shields.io/badge/Stack-React%20%7C%20FastAPI%20%7C%20Three.js-cyan)](https://github.com/shaaannn7/vantix)

Vantix is an enterprise-grade, AI-native stadium operations platform combining a real-time 3D Digital Twin, autonomous agent coordination (LangGraph/Gemini), predictive crowd simulation, and operational decision support to improve safety, efficiency, accessibility, and venue management during major sporting events.

---

## 1. Project Overview

### The Problem
During massive events like the FIFA World Cup, stadium operators are flooded with disconnected data streams—security cameras, ticketing, transit, and IoT telemetry. Standard command centers rely on static dashboards, leading to high latency in incident detection, bottleneck resolution, and emergency evacuation dispatch.

### The Solution
Vantix unifies these streams into a single, cohesive **spatial intelligence platform**. By combining a high-performance 3D WebGL viewport with generative AI agents, Vantix translates passive telemetry into active operational decisions:
* **Generative Action**: AI agents monitor telemetry and draft structured incident responses.
* **Spatial Insight**: Operators interact directly with a physical digital twin of the stadium.
* **Predictive Simulation**: Predict bottlenecks 30 minutes before they impact crowd safety.

---

## 2. Key Features

* **3D Digital Twin**: High-fidelity architectural model of AT&T Stadium (Dallas Stadium) with instanced seat bowls, soaring steel truss arches, a center jumbotron, and a retractable roof.
* **AI Mission Commander**: Agentic decision-support terminal powered by Gemini Pro and LangGraph to analyze issues, query data, and generate actionable checklists.
* **GPU-Instanced Crowd Particles**: High-performance rendering of 16,000+ seat states and 600+ walking pathfinder crowd agents at 60 FPS.
* **Smooth Player Telemetry**: Real-time tracking of player coordinate feeds using linear interpolation (`lerp`) for lag-free visual monitoring on the pitch.
* **Movable Architectural Elements**: Smooth visual state transitions for the retractable roof and OPERABLE glass endzones.
* **Dynamic Heatmaps**: Crowd density overlays for ingress, egress, and halftime concession queues.
* **Unified Command Center**: Centralized KPIs monitoring security, volunteers, transit feeds, and emergency alarms.

---

## 3. Architecture Overview

```mermaid
graph TD
    subgraph Frontend Client [React & WebGL App]
        A[Dashboard Viewport] -->|Renders| B[R3F Canvas]
        B -->|Instanced Mesh| C[Stadium Geometry]
        B -->|Lerp Tracking| D[Player Avatars]
        B -->|Vertex Buffer| E[Crowd Particles]
        A -->|Commands| F[AI Agent Console]
    end

    subgraph Backend Services [FastAPI & LangGraph]
        G[FastAPI Gateway] -->|WebSockets| H[Live Stream Router]
        G -->|API Endpoints| I[Telemetry Services]
        I -->|State Agent| J[LangGraph Workflow]
        J -->|Tools Execution| K[Gemini Pro API]
    end

    subgraph Data Layer [Redis & PostgreSQL]
        L[Redis Cache] -->|Volatile Coordinates| H
        M[PostgreSQL] -->|Historical Logs| I
    end

    Frontend Client -->|WebSocket / REST| Backend Services
    Backend Services --> Data Layer
```

---

## 4. Technology Stack

| Domain | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend** | React 19, TypeScript, Vite | Fast compilation and strict type safety |
| **3D Rendering** | Three.js, `@react-three/fiber`, `@react-three/drei` | WebGL canvas orchestration and camera control |
| **Backend** | Python 3.12, FastAPI | Asynchronous endpoint and WebSocket routing |
| **AI Orchestration** | LangGraph, Google Gemini API | Agent workflow execution and LLM tool calling |
| **Styling** | Tailwind CSS v4 | High-performance CSS utility system |
| **Data Cache** | Redis | Microsecond coordinate retrieval |
| **Database** | PostgreSQL | Event log history and GIS metadata |

---

## 5. Project Structure

```
vantix/
├── vantix-backend/                  # FastAPI Backend Service
│   ├── app/
│   │   ├── agents/                  # LangGraph operational AI agents
│   │   ├── graph/                   # Workflow definitions and state schemas
│   │   ├── services/                # Gemini integrations and WebSocket handlers
│   │   └── main.py                  # Server entry point
│   ├── requirements.txt             # Python dependencies
│   └── .venv/                       # Python virtual environment (ignored)
│
├── vantix-frontend/                 # React Frontend Client
│   ├── src/
│   │   ├── components/
│   │   │   ├── digitalTwin/         # StadiumMesh, SeatOptimizer, CrowdParticles
│   │   │   ├── dashboard/           # KPIGrid, LiveEventTimeline, TopBar
│   │   │   └── ai/                  # AIMissionSummary, AIThinkingPipeline
│   │   ├── pages/                   # Main Page layouts (MissionControl)
│   │   ├── App.tsx                  # Root client app routing
│   │   └── index.css                # Global CSS overrides & Tailwind
│   ├── package.json                 # Node dependencies
│   └── vite.config.ts               # Vite bundler parameters
└── README.md                        # Project documentation
```

---

## 6. Getting Started

### Prerequisites
* **Node.js**: `v18.0.0+`
* **Python**: `v3.10+`
* **Gemini API Key**: Obtain from [Google AI Studio](https://aistudio.google.com/)

### Installation & Run

#### 1. Configure Environment Variables
Create a `.env` file inside `vantix-backend/`:
```bash
GEMINI_API_KEY=your_gemini_api_key_here
PORT=8080
```

#### 2. Start the Backend Server
```bash
cd vantix-backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python3 -m uvicorn app.main:app --host 0.0.0.0 --port 8080 --reload
```

#### 3. Start the Frontend Client
Open a new terminal session:
```bash
cd vantix-frontend
npm install
npm run dev -- --port 3002
```
Now, open your browser and navigate to **[http://localhost:3002](http://localhost:3002)**.

---

## 7. Environment Variables

| Variable | Scope | Description | Required | Default |
| :--- | :--- | :--- | :--- | :--- |
| `GEMINI_API_KEY` | Backend | API Key for Gemini Pro LLM services | **Yes** | N/A |
| `PORT` | Backend | Port number for FastAPI server | No | `8080` |
| `VITE_API_URL` | Frontend | URL of backend API gateway | No | `http://localhost:8080` |
| `VITE_WS_URL` | Frontend | URL of WebSocket broker | No | `ws://localhost:8080` |

---

## 8. Features Deep Dive

### 🤖 Mission Commander
An agentic console that connects directly to the LangGraph backend. It parses live telemetry issues (e.g., "Queue bottleneck at Gate C") and automatically builds a visual operational log, runs a confidence assessment, and suggests structured action cards (e.g., "Dispatch Volunteer L. Chen", "Broadcast Transit Advisory").

### 🏟️ 3D Digital Twin
A representation of AT&T Stadium rendering structural steel truss arches, concrete support pillars, slanted glass endzones, and event plaza checkpoints. Toggle controls on the HUD allow operators to retract the curved roof panels and slide open the giant endzone doors, triggering corresponding illumination changes.

### 🏃 Dynamic Crowd & Player Simulation
* **Crowd Agents**: 600+ autonomous particles walk from entrances to their seats. During **Emergency Mode**, they automatically update their target vectors to run to the nearest exit gate.
* **Player Tracking**: The pitch renders active player indicators (Mexico vs. Brazil) gliding smoothly via `lerp` tracking.

---

## 9. Performance & Optimizations

* **Instanced Meshing (`THREE.InstancedMesh`)**: Renders 16,000 seating objects in a single draw call, saving valuable CPU cycles.
* **GPU-Assisted Vertex Updates**: Offloads crowd particle transformations to direct float buffer attribute adjustments rather than reinstantiating meshes.
* **Dynamic Shadow Culling**: Dynamic real-time shadows are disabled to reduce frame lag. The scene relies on high-contrast directional lights and pre-calculated ambient occlusion.

---

## 10. Security & Accessibility

### Security
* **WebSocket Heartbeats**: Active ping/pong connections to monitor telemetry client status.
* **Strict CORS**: Restricts unauthorized API calls to local frontend interfaces.
* **Input Cleansing**: Sanitizes AI-agent console inputs to prevent prompt injection issues.

### Accessibility (WCAG 2.1 Compliance)
* **High Contrast Elements**: Clear dark mode styling using high-contrast text (`bg-obsidian`, `text-system-cyan`, `text-system-green`).
* **Motion Reduction**: Includes simple toggle buttons to pause telemetry playback and freeze moving crowd particles.

---

## 11. Roadmap

### Phase 1: Foundation (Q3 2026)
* Optimize 3D seating geometry and integrate basic agent pathfinding.
* Set up LangGraph tools with FastAPI integration.

### Phase 2: Live Ingestion (Q4 2026)
* Connect actual IoT sensor mock generators and CCTV count telemetry.
* Implement support for spatial audio warnings on incident triggers.

### Phase 3: Scaling & Deployment (Q1 2027)
* Add support for multi-stadium digital twin selector controls.
* Package deployment using Docker/Kubernetes.

---

## 12. License

Distributed under the MIT License. See [LICENSE](LICENSE) for more details.

---

## 13. Team & Contact

* **Lead Maintainer**: Shan (`shaaannn7`)
* **Project Link**: [https://github.com/shaaannn7/vantix](https://github.com/shaaannn7/vantix)

---

## 14. Project Vision

> **"Vantix transforms stadiums from passive structures into active operational partners. By blending spatial visualization with agentic AI, we ensure major global sporting events are safer, more efficient, and fully accessible for every single fan."**
