# 🎻 Rhythm & Loot

一个为年轻音乐家设计的游戏化练习应用，通过声音检测和收集奖励让练习变得有趣。

## ✨ 特性

- 🎵 **智能计时器**: 只在实际演奏时计时（声音检测）
- 🎨 **多主题**: Blink Stage (K-pop)、Quest Loot (游戏冒险)、Fortnite (大逃杀)
- 🎁 **开箱奖励**: 完成练习后获得随机收集品
- 🔥 **连续天数**: 保持练习习惯获得更好的奖励
- 🎼 **节拍器**: 可调节 BPM (40-200)
- 👗 **装扮系统**: 收集并装备物品到角色上
- 📱 **PWA 支持**: 可安装到手机主屏幕
- 🔋 **性能优化**: 智能帧率控制节省电池
- 📴 **离线功能**: Service Worker 支持离线使用

## 🚀 快速开始

### 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产版本
npm run preview
```

### 部署

查看 [DEPLOYMENT.md](./DEPLOYMENT.md) 获取详细的部署指南。

**快速部署到 Vercel:**
```bash
npm install -g vercel
vercel --prod
```

**快速部署到 Netlify:**
```bash
npm install -g netlify-cli
netlify deploy --prod
```

## 📱 安装为 PWA

### Android
1. 使用 Chrome 访问应用
2. 点击菜单 → "添加到主屏幕"
3. 确认安装

### iOS
1. 使用 Safari 访问应用
2. 点击分享按钮
3. 选择 "添加到主屏幕"

## 🎮 使用方法

1. **选择主题**: 选择你喜欢的视觉风格
2. **设置练习**: 选择练习时长和节拍器速度
3. **开始练习**: 拿起乐器开始演奏
4. **获得奖励**: 完成后开启宝箱获得收集品
5. **装扮角色**: 在收藏馆中装备你的物品

## 🛠️ 技术栈

- **框架**: React 18 + Vite
- **音频**: Web Audio API
- **可视化**: Canvas API
- **PWA**: Service Worker + Manifest
- **样式**: 原生 CSS（高性能）
- **存储**: localStorage

## 📊 性能特性

- ⚡ 动态帧率控制（60fps 活跃 / 30fps 空闲）
- 🎯 FPS 监控（双击画布查看）
- 🔄 对象池优化内存使用
- 📦 代码分割优化加载速度
- 🗜️ 资源缓存策略

## 🎨 主题

### Blink Stage
- 灵感: Blackpink 演唱会
- 颜色: 霓虹粉 + 黑色
- 奖励: 演唱会周边、灯牌、签名专辑

### Quest Loot
- 灵感: 塞尔达、我的世界、海贼王
- 颜色: 科技蓝 + 橙色
- 奖励: 钻石镐、大师剑、草帽

### Fortnite
- 灵感: 堡垒之夜
- 颜色: 紫色 + 粉色 + 青色
- 奖励: V-Bucks、金色疤痕、战斗巴士

## 📝 开发计划

查看 [DEVELOPMENT_PLAN.md](./DEVELOPMENT_PLAN.md) 了解详细的开发进度和计划。

## 🤝 贡献

这是一个家庭项目，主要为两个孩子设计。欢迎提出建议和反馈！

## 📄 许可

MIT License - 自由使用和修改

## 🎉 致谢

- 感谢两位小音乐家的灵感和测试
- 感谢开源社区的优秀工具和库

---

**Made with ❤️ for young musicians**
