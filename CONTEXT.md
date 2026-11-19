# rhythm-loot Context

## 项目定位

Rhythm & Loot 是一个面向年轻音乐家的游戏化练习应用，通过声音检测只累计真实演奏时间，并在完成练习后给予开箱和收藏奖励。

技术栈是 React 18 + Vite，使用 Web Audio API、Canvas、PWA 和 localStorage，也包含 Capacitor Android 配置。

## 关键结构

- `src/`: React 应用源码。
- `public/`: PWA 静态资源。
- `android/`: Capacitor Android 工程。
- `scripts/`: 构建或辅助脚本。
- `README.md`: 项目说明。
- `DEVELOPMENT_PLAN.md`: 产品和奖励系统规划。
- `DEPLOYMENT.md`: Vercel / Netlify 部署。
- `package.json`: Vite、Capacitor 命令和依赖。

## 工作规则

- 这是面向儿童或年轻练习者的应用，交互应清晰、鼓励性强，不要制造挫败感。
- 音频检测逻辑要保护隐私：默认本地处理，不上传录音。
- PWA 和移动端 UI 需要实际验证麦克风权限、离线、安装和触摸体验。
- 奖励系统要避免真实金钱、赌博式表述或诱导消费。

## 常用命令

```bash
npm install
npm run dev
npm run build
npm run preview
```

## 验证要求

- 前端修改后运行 `npm run build`。
- UI/音频修改后用浏览器实际验证麦克风权限、计时暂停、完成奖励和移动端布局。
- PWA 修改后检查 manifest、service worker 和离线缓存。
