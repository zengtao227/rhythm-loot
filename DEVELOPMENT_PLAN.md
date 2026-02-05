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
- [x] **New: Pre-Practice Setup**: Set tempo (40-200 BPM) on the configuration screen.
- [x] Adjustable BPM with Slider + Precision +/- Buttons.
- [x] Theme-based sounds: "Electronic" for Blink, "Wood" for Quest/Fortnite.
- [x] **Visuals**: Timer ring pulses on beat when metronome active.

### Phase 4: Avatar System (The Dressing Room) ✅ COMPLETE (V1)
- [x] **Data Structure Upgrade**: Added `slot` property to items (Head, Body, Back, Hand, Neck, Misc).
- [x] **Split-View Dressing Room**: Preview character silhouette on the left, manage inventory on the right.
- [x] **Premium Visuals**: Replaced blocks with dynamic SVG character silhouette + base light platform. 
- [x] **Real-time Equipment**: Tap items to instantly see them on the avatar.
- [x] **Robustness**: Automatic fallback to Emoji if reward image fails to load.

### Phase 5: Polish & Deployment 🚧 IN PROGRESS
- [x] **Asset Stability**: Moved all reward images to `public/` folder to resolve broken paths.
- [x] **PWA Configuration**: Manifest, iOS Meta Tags, and standalone mode support.
- [x] **Service Worker**: Implemented offline support with caching strategy.
- [x] **Performance Optimization**: Frame rate limiting (60fps active / 30fps idle) for battery saving.
- [x] **Performance Monitoring**: FPS counter and particle count display (double-click canvas).
- [ ] **Final Polish**: Generate actual PNG icons for different mobile devices (SKIPPED - manual task).
- [ ] **UI Transitions**: Add smooth screen transitions (Setup → Practice).
- [ ] **Loot Box Enhancement**: Improve opening animation with sound effects.
- [ ] **Deployment**: Final hosting on Vercel or Netlify for family use.

---

## 6. Asset Generation Status

### Blink Stage (17 images) ✅ COMPLETE
Updated with "Pink Sparkle Mic" resource fix.

### Quest Loot (26 images) ✅ COMPLETE  
All reward images generated and integrated into the new public path.

### Fortnite Theme Pack (6 images) ✅ COMPLETE
All images migrated to public folder. Theme fully selectable.

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

## 7. Project Progress Summary

### 🏆 Recent Achievements (Last Session)
**Session 2026-02-05: Performance Optimization & PWA Enhancement**
- **Performance Utilities**: Created comprehensive performance toolkit (`performanceUtils.js`) with:
  - Frame rate limiter for configurable FPS control
  - FPS monitor for real-time performance tracking
  - Object pool system for memory optimization
- **Optimized Particle System**: Enhanced `ParticleCanvas.jsx` with:
  - Dynamic frame rate (60fps when active, 30fps when idle) for battery saving
  - Performance stats overlay (double-click canvas to toggle)
  - Desynchronized canvas context for better rendering performance
- **PWA Offline Support**: Implemented Service Worker (`sw.js`) with:
  - Asset caching strategy for offline functionality
  - Automatic cache management and updates
  - Network fallback handling
- **Build Optimization**: Updated Vite config with code splitting for faster loading

**Previous Session: Enhanced Avatar System**
- **Enhanced Avatar System**: Replaced the placeholder "blocks" with a premium SVG character silhouette. Added ambient pulse effects and a cyberpunk-style platform.
- **Improved UX**: Added BPM/Tempo controls directly on the Setup screen, allowing users to tune their metronome before starting.
- **Reliable Assets**: Migrated all reward images to the `/public` folder and updated `themeConfig.js`. This guarantees that images load correctly on all devices and after deployment.
- **Theme Expansion**: Fully integrated the "Battle Royale" (Fortnite) theme, including unique purple/pink/cyan color schemes and rare loot items.
- **Debug & Stability**: Resolved the "broken mic" issue by adding the missing "Pink Sparkle Mic" data and implementing an image-to-emoji fallback system.

### 🚀 What's Next? (Top Priorities)
1.  ~~**PWA "Full" Experience**~~ ✅ COMPLETE:
    *   ~~Convert our SVG icon into specific PNG sizes (192, 512).~~ (SKIPPED - manual design task)
    *   ✅ Register a Service Worker for offline availability, allowing the app to work without a steady internet connection.
2.  ~~**Performance & Battery**~~ ✅ COMPLETE:
    *   ✅ Implement frame-rate limiting (60fps active / 30fps idle) during practice sessions to save mobile battery.
    *   ✅ Optimize canvas rendering with desynchronized context.
    *   ✅ Add performance monitoring (FPS counter, particle count).
3.  **UI/UX Polish** 🚧 NEXT:
    *   Add smooth transitions between screens (Setup -> Practice).
    *   Improve the "Loot Box" opening animation with more "impact" (sound effects, haptic feel).
4.  **Content Generation (Pending Quota)** ⏸️ ON HOLD:
    *   Generate the remaining Zelda and Fortnite items (Mecha Mask, Chug Jug, Light Arrows, etc.).
5.  **Family Deployment** 🎯 FINAL GOAL:
    *   Deploy the app to Vercel or Netlify so the children can install it as a real app on their Android devices.

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


---

## 8. 本次会话工作总结 (2026-02-05)

### ✅ 已完成的工作

#### 1. 性能优化系统
**文件**: `src/utils/performanceUtils.js` (新建)
- ✅ **帧率限制器** (`createFrameLimiter`): 可配置目标 FPS (30/60)，节省电池
- ✅ **FPS 监控器** (`FPSMonitor`): 实时追踪渲染性能
- ✅ **对象池** (`ObjectPool`): 减少垃圾回收压力，优化内存使用

#### 2. 粒子系统优化
**文件**: `src/components/AudioViz/ParticleCanvas.jsx` (已修改)
- ✅ 集成帧率限制：活跃练习时 60fps，空闲时 30fps
- ✅ 添加性能监控界面：双击画布显示 FPS 和粒子数量
- ✅ 使用 `desynchronized` Canvas 上下文提升渲染性能
- ✅ 优化动画循环，减少不必要的重绘

#### 3. PWA 离线支持
**文件**: `public/sw.js` (新建)
- ✅ 实现 Service Worker 缓存策略
- ✅ 支持离线访问核心资源
- ✅ 自动清理旧版本缓存
- ✅ 网络请求失败时的降级处理

**文件**: `src/main.jsx` (已修改)
- ✅ 注册 Service Worker
- ✅ 添加注册成功/失败日志

#### 4. 构建优化
**文件**: `vite.config.js` (已修改)
- ✅ 配置代码分割 (React vendor chunk)
- ✅ 优化打包体积

### 📋 接下来需要完成的工作

#### 优先级 1: UI/UX 打磨 (建议下次会话)
- [ ] **屏幕过渡动画**: 添加 Setup → Practice 的平滑过渡效果
- [ ] **开箱动画增强**: 
  - 添加音效（开箱声音）
  - 添加震动反馈（Vibration API）
  - 增加视觉冲击力（屏幕抖动、光效爆发）
- [ ] **触摸交互优化**: 改善移动端的点击反馈

#### 优先级 2: 部署上线 (最终目标)
- [ ] **选择部署平台**: Vercel 或 Netlify
- [ ] **配置部署脚本**: 
  - 设置构建命令
  - 配置环境变量（如需要）
- [ ] **生成分享链接**: 供家人安装
- [ ] **移动端测试**: 在 Android 设备上测试 PWA 安装和功能

#### 优先级 3: 内容补充 (等待配额)
- [ ] **Fortnite 补充**: Mecha Team Leader Mask (Epic), Chug Jug (Rare)
- [ ] **Zelda Classic Pack**: 
  - Heart Container (Common)
  - Korok Seed (Common)
  - Hylian Shield (Uncommon)
  - Ocarina of Time (Rare)
  - Fairy Bottle (Uncommon)
  - Light Arrows (Epic)

#### 可选优化 (根据实际使用反馈)
- [ ] **音效系统**: 添加背景音乐和音效开关
- [ ] **数据统计**: 练习时长统计、连续天数图表
- [ ] **社交分享**: 分享成就到社交媒体
- [ ] **多语言支持**: 中英文切换

### 🎯 建议的下一步行动

**立即可做**:
1. 在本地测试性能优化效果（双击画布查看 FPS）
2. 测试 Service Worker 是否正常工作（开发者工具 → Application → Service Workers）

**下次会话重点**:
1. 实现屏幕过渡动画（提升用户体验）
2. 增强开箱动画（增加游戏性和满足感）
3. 部署到 Vercel/Netlify（让家人可以使用）

### 📝 技术说明

**性能优化原理**:
- 帧率限制通过控制 `requestAnimationFrame` 的执行频率来减少 CPU/GPU 使用
- 活跃时 60fps 保证流畅体验，空闲时 30fps 节省电池
- 对象池避免频繁创建/销毁对象，减少垃圾回收暂停

**PWA 离线策略**:
- Cache First: 优先使用缓存，加快加载速度
- Network Fallback: 网络失败时使用缓存
- 版本控制: 通过 CACHE_NAME 管理缓存版本

**如何测试**:
```bash
# 本地开发测试
npm run dev

# 构建生产版本
npm run build

# 预览生产版本（测试 Service Worker）
npm run preview
```
