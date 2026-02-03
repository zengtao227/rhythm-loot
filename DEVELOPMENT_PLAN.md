# Rhythm & Loot: Interactive Music Practice App Development Plan

## 1. Project Overview
A sound-activated, gamified practice application for two accomplished young violinists. 
- **Platform**: Web Application (PWA) optimized for Android mobile.
- **Core Mechanism**: "Charge-to-Unlock". Practice time is only counted when the violin is actually played (sound detection).
- **Goal**: Transform practice fatigue into visual excitement and collecting achievement.

## 2. User Profiles & Themes

### 2.1 Sister (Middle School) - "Blink Stage"
- **Inspiration**: Blackpink concerts, lightsticks, K-pop aesthetics.
- **Visuals**: 
    - Dark mode with Neon Pink accents.
    - Central element: Abstract **Light Stick / Energy Core**.
    - **Audio-Reactive**: Pulses with volume, "light trails" (after-image effects) during fast passages.
    - **Climax**: Light stick glows intensely, stage lights activate.
- **Rewards**: "Concert Moments" or "Fandom Badges".

### 2.2 Brother (Grade 5) - "Quest Loot"
- **Inspiration**: Zelda (Breath of the Wild/Tears of the Kingdom), Minecraft, One Piece, Stranger Things.
- **Visuals**: 
    - Tech/Fantasy hybrid (Sheikah Slate blue/orange or deep sea adventure).
    - Central element: **Ancient Relic / 3D Artifact** (floating, rotating).
    - **Audio-Reactive**: Runes light up, particles gather around the relic.
    - **Climax**: Relic opens/activates to reveal a Loot Box (Surprise Egg).
- **Rewards**: "Virtual Collectibles" (e.g., Pixel Diamond Sword, Straw Hat, Sci-Fi Thruster).

## 3. Core Features

### 3.1 Smart Timer (Active Practice)
- **Sound Detection**: Timer pauses if silence persists for > 5 seconds (configurable).
- **Visual Feedback**: 
    - **Playing**: Dynamic animations (particles, glow, trails).
    - **Paused**: Animations freeze/dim, timer stops.
- **Custom Duration**: Users can set their target time (e.g., 20min, 30min, 45min) before starting.

### 3.2 Progress & Simulation
- **Energy Charging**: The central object (Light Stick / Relic) visually "charges up" as the timer progresses.
- **Completion State**: 
    - When time is up, the object enters "Overcharge/Ready" state.
    - User must tap to "Unleash/Open".

### 3.3 Reward System (The Hook)
- **Loot Box / Surprise Egg**: 
    - Upon completion, a mysterious container appears.
    - **Interaction**: Tap to break/open.
    - **Drop**: A random virtual item based on the user's theme.
- **Inventory / Showcase**: A gallery to view collected items.

### 3.4 Rarity & Streak System (Long-term Motivation)
- **Rarity Tiers**:
    | Tier | Name | Drop Rate | Visual Effect |
    |------|------|-----------|---------------|
    | ⚪ | Common | 50% | Subtle glow |
    | 🟢 | Uncommon | 30% | Green shimmer |
    | 🔵 | Rare | 15% | Blue pulse + particles |
    | � | Rare | 15% | Blue pulse + particles |
    | �🟣 | Epic | 4% | Purple aura + sound FX |
    | 🟡 | Legendary | 1% | Golden explosion + screen shake |

### 3.4 Reward Content Strategy
**Phase 1: Balancing the Drop Table (Immediate Goal)**
Prioritize creating high-tier items for "Quest Loot" to match "Blink Stage" quality.

**Quest Loot (Target Style: Zelda BotW/TotK meets Minecraft, ancient tech, warm lighting)**
*   **Rare**: `Diamond Pickaxe` (Pixel-art inspired 3D voxel style, shining blue edge).
    *   *Prompt*: "3D voxel diamond pickaxe, glowing blue edges, floating in dark void, cinematic lighting, minecraft style but high definition, 8k"
*   **Epic**: `Master Sword` (The legendary blade, glowing purple/blue hilt, ancient pedestal).
    *   *Prompt*: "Stylized master sword in stone, magical purple aura, cell shaded style, breath of the wild art style, ancient runes floating, 8k resolution"
*   **Legendary**: `Triforce Fragment` (Golden triangular artifact, radiating immense power).
    *   *Prompt*: "Golden triforce triangle artifact, floating, blinding holy light, god rays, ancient ruins background blurred, magical dust, fantasy art, 8k"

**Blink Stage (Target Style: K-Pop Concert, Neon Pink/Black, Glassmorphism)**
*   **Epic**: `Backstage Pass` (Holographic laminate, premium lanyard).
    *   *Prompt*: "Holographic backstage pass on silk lanyard, cyberpunk neon aesthetics, iridescent foil texture, pink and black theme, studio lighting, 3d render"
*   **Legendary**: `Diamond Microphone` (Encruested with crystals, premium luxury).
    *   *Prompt*: "Luxury diamond encrusted microphone, rose gold mesh, sparkling studio lights reflection, black background, glamour photography, extreme detail, 8k"

- **Streak Bonuses** (Consecutive Days):
    - **3-Day Streak**: Guaranteed Uncommon+ drop
    - **7-Day Streak**: Guaranteed Rare+ drop + Bonus item
    - **14-Day Streak**: Epic drop chance doubled
    - **30-Day Streak**: Guaranteed Legendary + Special Badge

- **Streak Protection**: 
    - One "Rest Day" allowed per week without breaking streak.

## 4. Technical Architecture
- **Framework**: React + Vite (Fast, modern).
- **Language**: JavaScript (ES6+).
- **Styling**: Vanilla CSS (High performance, custom animations).
- **Audio Analysis**: Web Audio API (`AnalyserNode` for frequency/volume data).
- **Visuals**: 
    - `Canvas` API for 2D particle systems (Light trails).
    - Potential for `Three.js` / `React-Three-Fiber` for 3D relics (Brother's theme).
- **Data Persistence**: `localStorage` (No backend required for MVP). Stores profile settings, history, and inventory.

## 5. Development Phases

### Phase 1: Foundation (Structure & Audio) ✅ COMPLETE
- [x] Initialize project in `/Users/zengtao/rhythm-loot`.
- [x] Implement `useAudioTracker` hook (Sound detection & auto-pause logic).
- [x] Create basic Profile Selection screen.

### Phase 2: Visual Core (The "Wow" Factor) ✅ COMPLETE
- [x] **Blink Stage Engine**: Particle system for light trails and beat detection.
- [x] **Quest Loot Engine**: 2D rotating artifact with charging shader effects.
- [x] Integrate visual engine with audio data.

### Phase 3: Gamification (Rewards) ✅ COMPLETE
- [x] Implement Configuration screen (Time setting).
- [x] Build the "Loot Box" opening animation (Images > Emoji fallback).
- [x] Create the "Inventory" gallery.

### Phase 3.5: Rhythm Core (Metronome) ✅ COMPLETE
- [x] **Technical Core (`useMetronome`)**: Web Audio API based precision scheduling.
- [x] Adjustable BPM (40-200).
- [x] Theme-based sounds: "Electronic" for Blink, "Wood" for Quest.
- [x] **Visuals**: Timer ring pulses on beat when metronome active.
- [x] **UI**: Minimalist toggle button with BPM slider.

### Phase 4: Avatar System (The Dressing Room) 🚧 IN PROGRESS
- [x] **Data Structure Upgrade**: Added `slot` property to items (Head, Body, Back, Hand, Neck, Misc).
- [ ] **Avatar Visuals**: Silhouette + Sticker overlays (Future).
- [ ] **UI - Inventory Upgrade**: Split view with Avatar Preview (Future).

### Phase 5: Polish & Deployment 🚧 IN PROGRESS
- [x] PWA Configuration (Manifest, iOS Meta Tags).
- [ ] Generate actual PNG icons from SVG template.
- [ ] Performance optimization (frame rate limiting for battery).
- [ ] Final UI tweaks based on user feedback.
- [ ] Deploy to hosting (Vercel/Netlify).

---

## 6. Asset Generation Status

### Blink Stage (16 images) ✅ COMPLETE
All reward images generated and integrated.

### Quest Loot (26 images) ✅ COMPLETE  
All reward images generated and integrated.

### Fortnite Theme Pack (6 images) ✅ COMPLETE
All images generated. Theme added to config.

### 📋 待生成图片 (配额恢复后)

**Fortnite 补充**:
- Mecha Team Leader Mask (Epic)
- Chug Jug (Rare)

**Zelda Classic Pack (新增)**:
- Heart Container (Common)
- Korok Seed (Common)
- Hylian Shield (Uncommon)
- Ocarina of Time (Rare)
- Fairy Bottle (Uncommon)
- Light Arrows (Epic)

---



## 6. Directory Structure (Proposed)
/src
  /assets          # Images, Icons, Sound Effects
  /components
    /AudioViz      # Visualizers (Canvas/WebGL)
    /UI            # Buttons, Modals, ProfileCards
  /hooks           # useAudioTracker, useInventory
  /themes          # Theme configuration objects (colors, assets)
  /store           # Data management (Profile state)
  App.jsx
  main.jsx
