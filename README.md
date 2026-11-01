# 世界著名建筑与地标画廊 | World Landmarks 3D

**Live Demo / 在线体验：** [https://ychenzgithub.github.io/WorldLandmarks/](https://ychenzgithub.github.io/WorldLandmarks/)

跨越 4,500 年人类文明的著名建筑与地标三维画廊，完整收录涵盖**世界新七大奇迹、古代文明瑰宝、哥特文艺复兴殿堂与现代超级工程**等 42 座代表性世界地标。

An interactive 3D architectural gallery exploring 42 iconic world landmarks across 6 continents and 4,500 years of civilization, featuring interactive Three.js 3D models, architectural engineering breakdowns, satellite geospatial mapping, and bilingual audio guides.

---

## ✨ 核心特色 / Key Features

1. **🏛️ 可交互 3D 建筑几何视口 (Three.js Interactive 3D Viewer)**
   - 每座地标配备专门定制的程序化三维建筑几何构型（金字塔、哥特双塔大教堂、拜占庭式大穹顶、悬索桥、多层天守阁/佛塔、超级摩天塔楼等）。
   - 支持鼠标左键自由旋转、滚轮多级缩放、线框透视模式（Wireframe）与自动巡航展示。
2. **🗺️ 3D 画廊与交互地图双视图 (Dual View: 3D Cards & World Map)**
   - **画廊模式**：具有真实景深感与视角倾斜微交互的精致卡片。
   - **地图模式**：基于 Leaflet 的高分辨率全球卫星地图，将全部 42 座地标按精准经纬度坐标标注于世界版图上，支持点击直达。
3. **🔊 Web Speech API 实时中英双语语音导赏 (Bilingual Audio Guide)**
   - 点击语音导赏即可调用浏览器原生高音质美式英语或中文朗读建筑背景与力学解构。
4. **📊 严谨的多维度分类与检索 (Multi-dimensional Grouping)**
   - **✦ 精选体系**：世界新七大奇迹、古代文明遗迹、现代超级工程、联合国世界文化遗产；
   - **🌍 大洲分布**：亚洲、欧洲、美洲、非洲与中东、大洋洲；
   - **🏛 建筑流派**：古典石构、哥特与文艺复兴、东方古典与伊斯兰、现代主义摩天楼。
5. **🌐 中英双语即时切换 & ☀/☾ 极速深浅主题**。

---

## 📂 文件结构 / File Structure

```
WorldLandmarks/
├── index.html            # 主交互界面与模态视口
├── css/
│   └── styles.css        # 博物馆质感现代设计系统
├── js/
│   ├── app.js            # 核心业务逻辑、筛选器与地图联动
│   └── three-viewer.js   # Three.js 交互式3D模型渲染引擎
├── data/
│   └── landmarks.js      # 42座世界地标精准中英文数据库与坐标
└── README.md
```

---

## 📜 许可证 / License

MIT License © 2026 [ychenzgithub](https://github.com/ychenzgithub).
