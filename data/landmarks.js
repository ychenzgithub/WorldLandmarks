/**
 * Comprehensive Dataset for World Landmarks 3D gallery
 */
const LANDMARKS_DATA = [
  {
    "id": "great-wall",
    "name": {
      "zh": "万里长城",
      "en": "Great Wall of China"
    },
    "country": {
      "zh": "中国",
      "en": "China"
    },
    "city": {
      "zh": "北京 / 北方诸省",
      "en": "Beijing / Northern China"
    },
    "flag": "🇨🇳",
    "continent": "asia",
    "year": "公元前7世纪 – 公元1644年",
    "yearNum": -700,
    "style": {
      "zh": "古代军事防御工程",
      "en": "Ancient Military Fortification"
    },
    "height": "平均 7.8 米 (全长 21,196 公里)",
    "unesco": 1987,
    "category": "ancient",
    "wonder": "new7",
    "modelType": "wall",
    "coords": [
      40.4319,
      116.5704
    ],
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/The_Great_Wall_of_China_at_Jinshanling-edit.jpg/800px-The_Great_Wall_of_China_at_Jinshanling-edit.jpg",
    "desc": {
      "zh": "人类历史上工程体量最为浩大的防御建筑奇迹，东起山海关、西抵嘉峪关，蜿蜒横跨中国北方的崇山峻岭与荒漠戈壁。",
      "en": "The most colossal defensive architecture in human history, stretching over 21,000 kilometers across northern ridges, mountain passes, and desert plains."
    },
    "highlight": {
      "zh": "砖石构筑与险要地形完美融合，城墙、敌楼、烽燧自成完整的古代立体防御通信体系。",
      "en": "Masterfully integrated into jagged natural topography, featuring interconnected watchtowers, garrison fortresses, and beacon signal relays."
    }
  },
  {
    "id": "taj-mahal",
    "name": {
      "zh": "泰姬陵",
      "en": "Taj Mahal"
    },
    "country": {
      "zh": "印度",
      "en": "India"
    },
    "city": {
      "zh": "阿格拉",
      "en": "Agra"
    },
    "flag": "🇮🇳",
    "continent": "asia",
    "year": "1632 – 1653",
    "yearNum": 1653,
    "style": {
      "zh": "莫卧儿建筑 / 伊斯兰与印度融合",
      "en": "Mughal Architecture"
    },
    "height": "73 米",
    "unesco": 1983,
    "category": "eastern",
    "wonder": "new7",
    "modelType": "dome",
    "coords": [
      27.1751,
      78.0421
    ],
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Taj_Mahal_%28Edited%29.jpeg/800px-Taj_Mahal_%28Edited%29.jpeg",
    "desc": {
      "zh": "莫卧儿帝国皇帝沙贾汗为纪念爱妃慕塔芝·玛哈尔耗时22年建造的白色大理石陵墓，被泰戈尔誉为“永恒面颊上的一滴泪珠”。",
      "en": "An ivory-white marble mausoleum on the Yamuna river, commissioned by Mughal Emperor Shah Jahan in memory of his favorite wife Mumtaz Mahal."
    },
    "highlight": {
      "zh": "极致的中央洋葱圆顶与四座微倾的宣礼塔构成完美对称，外墙镶嵌28种宝石与精湛的古兰经书法雕刻。",
      "en": "Flawless bilateral symmetry with a 35m central marble dome, subtle outward-leaning minarets, and semi-precious stone Pietra Dura inlays."
    }
  },
  {
    "id": "forbidden-city",
    "name": {
      "zh": "故宫紫禁城",
      "en": "The Forbidden City"
    },
    "country": {
      "zh": "中国",
      "en": "China"
    },
    "city": {
      "zh": "北京",
      "en": "Beijing"
    },
    "flag": "🇨🇳",
    "continent": "asia",
    "year": "1406 – 1420",
    "yearNum": 1420,
    "style": {
      "zh": "中国明清皇家木结构宫殿",
      "en": "Classical Chinese Imperial Architecture"
    },
    "height": "太和殿 35.05 米",
    "unesco": 1987,
    "category": "eastern",
    "wonder": "unesco",
    "modelType": "pagoda",
    "coords": [
      39.9163,
      116.3972
    ],
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Corner_tower_of_the_Forbidden_City_20210609.jpg/800px-Corner_tower_of_the_Forbidden_City_20210609.jpg",
    "desc": {
      "zh": "世界上现存规模最大、保存最完整的木质古建筑群。明清两代24位皇帝的统治中枢，占地72万平方米，有殿宇宫室九千余间。",
      "en": "The world's largest imperial palace complex, home to 24 Chinese emperors across Ming and Qing dynasties with over 9,000 historic wooden chambers."
    },
    "highlight": {
      "zh": "严格尊崇南北中轴线对称布局，榫卯结构斗拱承载重檐庑殿顶与金黄色琉璃瓦，展现极高的东方礼制与营造技艺。",
      "en": "Strict central axial symmetry, intricate mortise-and-tenon dougong brackets, and gleaming yellow glazed tile double-eave hip roofs."
    }
  },
  {
    "id": "potala-palace",
    "name": {
      "zh": "布达拉宫",
      "en": "Potala Palace"
    },
    "country": {
      "zh": "中国",
      "en": "China"
    },
    "city": {
      "zh": "拉萨",
      "en": "Lhasa"
    },
    "flag": "🇨🇳",
    "continent": "asia",
    "year": "公元641年始建 / 1645年重建",
    "yearNum": 1645,
    "style": {
      "zh": "藏传佛教城堡式宫殿",
      "en": "Tibetan Fortified Architecture / Dzong"
    },
    "height": "117 米 (海拔 3,700 米)",
    "unesco": 1994,
    "category": "eastern",
    "wonder": "unesco",
    "modelType": "castle",
    "coords": [
      29.6555,
      91.1186
    ],
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Potala_Palace_%2858102377%29.jpeg/800px-Potala_Palace_%2858102377%29.jpeg",
    "desc": {
      "zh": "世界上海拔最高的巨型古代宫堡，红宫与白宫交相辉映，依红山山势拔地而起，是雪域高原建筑艺术的至高象征。",
      "en": "The world's highest fortified palace complex, perched at 3,700m atop Red Mountain, uniting administrative, monastic, and artistic mastery."
    },
    "highlight": {
      "zh": "厚重花岗岩垒砌的收分外墙、铜铸鎏金宝顶与红白鲜明对比的殿宇，展现了藏式城堡无与伦比的气魄。",
      "en": "Sloping granite stone curtain walls, gilded copper roof shrines, and striking white and crimson palaces overlooking the Lhasa valley."
    }
  },
  {
    "id": "burj-khalifa",
    "name": {
      "zh": "哈利法塔",
      "en": "Burj Khalifa"
    },
    "country": {
      "zh": "阿联酋",
      "en": "United Arab Emirates"
    },
    "city": {
      "zh": "迪拜",
      "en": "Dubai"
    },
    "flag": "🇦🇪",
    "continent": "asia",
    "year": "2004 – 2010",
    "yearNum": 2010,
    "style": {
      "zh": "新未来主义超高层摩天大楼",
      "en": "Neo-Futurism / Supertall Skyscraper"
    },
    "height": "828 米 (世界第一高楼)",
    "unesco": 0,
    "category": "modern",
    "wonder": "modern",
    "modelType": "spire",
    "coords": [
      25.1972,
      55.2744
    ],
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Burj_Khalifa.jpg/800px-Burj_Khalifa.jpg",
    "desc": {
      "zh": "人类有史以来建造的最高人造结构体，高达828米，拥有163层，是现代超高层工程力学与结构创新的巅峰杰作。",
      "en": "The tallest human-built structure on Earth at 828m, soaring 163 stories into the Dubai sky as a monument to modern engineering."
    },
    "highlight": {
      "zh": "设计灵感源自沙漠之花蜘蛛兰，采用三叉Y形基座和螺旋阶梯式退台，巧妙化解高空强阵风涡旋脱落阻力。",
      "en": "Inspired by the desert Hymenocallis flower, utilizing a Y-shaped tripartite buttressed core and spiraling setbacks to minimize aerodynamic vortex shedding."
    }
  },
  {
    "id": "angkor-wat",
    "name": {
      "zh": "吴哥窟",
      "en": "Angkor Wat"
    },
    "country": {
      "zh": "柬埔寨",
      "en": "Cambodia"
    },
    "city": {
      "zh": "暹粒",
      "en": "Siem Reap"
    },
    "flag": "🇰🇭",
    "continent": "asia",
    "year": "公元1113 – 1150年",
    "yearNum": 1150,
    "style": {
      "zh": "高棉古典建筑 / 须弥山式寺庙",
      "en": "Khmer Architecture"
    },
    "height": "中央塔高 65 米",
    "unesco": 1992,
    "category": "eastern",
    "wonder": "unesco",
    "modelType": "temple",
    "coords": [
      13.4125,
      103.867
    ],
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Angkor_Wat_from_the_air.jpg/800px-Angkor_Wat_from_the_air.jpg",
    "desc": {
      "zh": "世界上体量最大的宗教建筑遗址，苏利耶跋摩二世建造的国寺与陵寝，展现高棉帝国石雕艺术与水利规划的巅峰。",
      "en": "The largest religious monument in the world, built by Khmer King Suryavarman II as the state temple symbolizing Mount Meru."
    },
    "highlight": {
      "zh": "五座莲花花苞状石塔象征印度神话的五座神峰，四周环绕着宽达190米的护城河与绵延千米的浮雕长廊。",
      "en": "Five lotus-bud towers representing sacred Mount Meru, enclosed by a massive 190m-wide moat and world-renowned narrative bas-relief galleries."
    }
  },
  {
    "id": "petra",
    "name": {
      "zh": "佩特拉古城 (卡兹尼神殿)",
      "en": "Petra (The Treasury / Al-Khazneh)"
    },
    "country": {
      "zh": "约旦",
      "en": "Jordan"
    },
    "city": {
      "zh": "马安省",
      "en": "Ma'an Governorate"
    },
    "flag": "🇯🇴",
    "continent": "asia",
    "year": "公元前1世纪 – 公元1世纪",
    "yearNum": 50,
    "style": {
      "zh": "纳巴泰岩石雕凿建筑 / 希腊化古典融合",
      "en": "Nabataean Rock-Cut Architecture"
    },
    "height": "40 米",
    "unesco": 1985,
    "category": "ancient",
    "wonder": "new7",
    "modelType": "temple",
    "coords": [
      30.3285,
      35.4444
    ],
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Treasury_petra_crop.jpeg/800px-Treasury_petra_crop.jpeg",
    "desc": {
      "zh": "隐匿在幽深狭窄西克峡谷尽头的“玫瑰之城”，直接在粉红与金色砂岩峭壁上一体雕凿而成的古代沙漠绿洲奇迹。",
      "en": "The storied 'Rose Red City' carved directly into sandstone cliffs, emerging dramatically at the end of the narrow Siq canyon gorge."
    },
    "highlight": {
      "zh": "融合希腊科林斯柱式、埃及装饰与纳巴泰本土石刻工艺，整座巍峨殿堂与整座天然岩山浑然一体。",
      "en": "Hellenistic Corinthian capitals and pediments carved top-down into raw pink sandstone mountains, perfectly preserved from desert storms."
    }
  },
  {
    "id": "himeji-castle",
    "name": {
      "zh": "姬路城 (白鹭城)",
      "en": "Himeji Castle"
    },
    "country": {
      "zh": "日本",
      "en": "Japan"
    },
    "city": {
      "zh": "兵库县姬路市",
      "en": "Himeji, Hyōgo"
    },
    "flag": "🇯🇵",
    "continent": "asia",
    "year": "1333年始建 / 1609年建成现状",
    "yearNum": 1609,
    "style": {
      "zh": "日本安土桃山时代平山城建筑",
      "en": "Japanese Feudal Castle Architecture"
    },
    "height": "天守阁 46.4 米",
    "unesco": 1993,
    "category": "eastern",
    "wonder": "unesco",
    "modelType": "castle",
    "coords": [
      34.8394,
      134.6939
    ],
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Himeji_Castle_The_Keep_Towers.jpg/800px-Himeji_Castle_The_Keep_Towers.jpg",
    "desc": {
      "zh": "日本现存规模最大、保存最完好的国宝级古城。因其洁白优雅的灰浆外墙与层叠飞檐宛如展翅欲飞的白鹭，故名“白鹭城”。",
      "en": "Japan's most spectacular surviving feudal fortress, celebrated for its brilliant white-plaster exterior resembling a soaring white heron."
    },
    "highlight": {
      "zh": "五重六阶大天守通过渡橹连接三座小天守，内部设计有错综复杂的螺旋防御迷宫通道与落石孔、射孔。",
      "en": "A complex 5-tier main keep connected to three smaller keeps, fortified with labyrinthine stone ramparts, arrow slits, and drop traps."
    }
  },
  {
    "id": "petronas-towers",
    "name": {
      "zh": "双子塔 (国家石油大厦)",
      "en": "Petronas Twin Towers"
    },
    "country": {
      "zh": "马来西亚",
      "en": "Malaysia"
    },
    "city": {
      "zh": "吉隆坡",
      "en": "Kuala Lumpur"
    },
    "flag": "🇲🇾",
    "continent": "asia",
    "year": "1993 – 1998",
    "yearNum": 1998,
    "style": {
      "zh": "后现代伊斯兰几何风格摩天大楼",
      "en": "Postmodern Islamic Geometrical Architecture"
    },
    "height": "451.9 米 (世界最高双子楼)",
    "unesco": 0,
    "category": "modern",
    "wonder": "modern",
    "modelType": "spire",
    "coords": [
      3.1578,
      101.7123
    ],
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Petronas_Twin_Towers_at_night_%282023%29.jpg/800px-Petronas_Twin_Towers_at_night_%282023%29.jpg",
    "desc": {
      "zh": "吉隆坡最著名的城市天际线地标，由建筑大师西萨·佩里设计，曾保持世界第一高楼桂冠，至今仍是世界最高的双塔建筑。",
      "en": "Iconic soaring twin spires in Kuala Lumpur designed by César Pelli, remaining the tallest twin skyscrapers in the world."
    },
    "highlight": {
      "zh": "塔楼平面采用伊斯兰八角星几何图形衍生出的鲁布·埃尔·希兹卜图案，在41至42层架设轻盈的空中双层天桥。",
      "en": "Floor plates derived from traditional Islamic Rub el Hizb octagram geometry, connected at floors 41–42 by an iconic 58m two-story skybridge."
    }
  },
  {
    "id": "eiffel-tower",
    "name": {
      "zh": "埃菲尔铁塔",
      "en": "Eiffel Tower"
    },
    "country": {
      "zh": "法国",
      "en": "France"
    },
    "city": {
      "zh": "巴黎",
      "en": "Paris"
    },
    "flag": "🇫🇷",
    "continent": "europe",
    "year": "1887 – 1889",
    "yearNum": 1889,
    "style": {
      "zh": "工业革命熟铁镂空格构工程",
      "en": "Wrought-Iron Puddle Lattice Tower"
    },
    "height": "330 米",
    "unesco": 1991,
    "category": "modern",
    "wonder": "unesco",
    "modelType": "tower",
    "coords": [
      48.8584,
      2.2945
    ],
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Tour_Eiffel_Wikimedia_Commons.jpg/800px-Tour_Eiffel_Wikimedia_Commons.jpg",
    "desc": {
      "zh": "为1889年巴黎世界博览会建成的工业时代图腾，由古斯塔夫·埃菲尔主持设计，是法国与现代浪漫之都巴黎最耀眼的文化象征。",
      "en": "The wrought-iron masterpiece built for the 1889 Exposition Universelle by Gustave Eiffel, reigning as the global icon of France and Paris."
    },
    "highlight": {
      "zh": "由18,038个锻铁部件与250万颗铆钉装配而成，高耸轻盈的四足抛物线拱形结构完美抵抗强风切变力。",
      "en": "Engineered with 18,038 puddle-iron components and 2.5 million rivets, featuring four sweeping arch legs designed to channel wind aerodynamics."
    }
  },
  {
    "id": "colosseum",
    "name": {
      "zh": "罗马斗兽场",
      "en": "Colosseum"
    },
    "country": {
      "zh": "意大利",
      "en": "Italy"
    },
    "city": {
      "zh": "罗马",
      "en": "Rome"
    },
    "flag": "🇮🇹",
    "continent": "europe",
    "year": "公元70 – 80年",
    "yearNum": 80,
    "style": {
      "zh": "古罗马拱券混凝土椭圆圆形剧场",
      "en": "Ancient Roman Elliptical Amphitheatre"
    },
    "height": "48.5 米 (可容纳5万观众)",
    "unesco": 1980,
    "category": "ancient",
    "wonder": "new7",
    "modelType": "colosseum",
    "coords": [
      41.8902,
      12.4922
    ],
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Colosseo_2020.jpg/800px-Colosseo_2020.jpg",
    "desc": {
      "zh": "古罗马帝国最宏伟的露天圆形竞技场，见证了帝国角斗士竞技与兽斗历史，是古罗马工程力学与混凝土拱券的巅峰之作。",
      "en": "The largest ancient amphitheatre ever built, constructed of travertine and concrete to host gladiatorial contests and imperial spectacles."
    },
    "highlight": {
      "zh": "外立面自下而上依次叠运多立克、爱奥尼亚和科林斯三种希腊柱式，地下拥有复杂的升降机关地下室系统（Hypogeum）。",
      "en": "Four tiers of superimposed Classical orders (Doric, Ionic, Corinthian) surrounding a vast arena floor with a subterranean maze of cages and elevators."
    }
  },
  {
    "id": "sagrada-familia",
    "name": {
      "zh": "圣家堂 (圣家赎罪堂)",
      "en": "Basílica de la Sagrada Família"
    },
    "country": {
      "zh": "西班牙",
      "en": "Spain"
    },
    "city": {
      "zh": "巴塞罗那",
      "en": "Barcelona"
    },
    "flag": "🇪🇸",
    "continent": "europe",
    "year": "1882年始建 – 至今 (预计2026)",
    "yearNum": 1882,
    "style": {
      "zh": "加泰罗尼亚现代主义 / 有机仿生哥特",
      "en": "Catalan Modernisme / Organic Gothic"
    },
    "height": "耶稣基督塔顶高 172.5 米",
    "unesco": 2005,
    "category": "gothic",
    "wonder": "unesco",
    "modelType": "cathedral",
    "coords": [
      41.4036,
      2.1744
    ],
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Sagrada_Familia_01.jpg/800px-Sagrada_Familia_01.jpg",
    "desc": {
      "zh": "建筑鬼才安东尼·高迪倾注后半生心血的毕生代表作，跨越一个多世纪仍未竣工的神圣巨作，被誉为“石头写就的交响诗”。",
      "en": "Antoni Gaudí's unfinished monumental basilica, renowned for its tree-canopy interior stone forest and soaring Nativity & Passion façades."
    },
    "highlight": {
      "zh": "彻底摈弃飞扶壁，首创分叉如树枝的倾斜双曲面石柱，漫射光透过彩色玻璃如阳光穿透静谧的森林树冠。",
      "en": "Revolutionary organic engineering replacing flying buttresses with branching stone arboreal columns beneath kaleidoscopic stained-glass vaults."
    }
  },
  {
    "id": "parthenon",
    "name": {
      "zh": "帕特农神庙",
      "en": "The Parthenon"
    },
    "country": {
      "zh": "希腊",
      "en": "Greece"
    },
    "city": {
      "zh": "雅典卫城",
      "en": "Athens"
    },
    "flag": "🇬🇷",
    "continent": "europe",
    "year": "公元前447 – 432年",
    "yearNum": -432,
    "style": {
      "zh": "古典希腊多立克柱式神庙",
      "en": "Classical Greek Doric Temple"
    },
    "height": "13.72 米",
    "unesco": 1987,
    "category": "ancient",
    "wonder": "unesco",
    "modelType": "temple",
    "coords": [
      37.9715,
      23.7267
    ],
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/The_Parthenon_in_Athens.jpg/800px-The_Parthenon_in_Athens.jpg",
    "desc": {
      "zh": "雅典卫城之巅的智慧女神雅典娜神庙，西方古典文明与建筑黄金分割美学的发源源头，被誉为多立克柱式的最高典范。",
      "en": "The pinnacle temple dedicated to Athena atop the Athenian Acropolis, embodying the golden proportions of Classical Greek civilization."
    },
    "highlight": {
      "zh": "柱身微凸（Entasis）与向内微倾的精妙视错觉修正技法，使原本笔直的庞大建筑在人眼中呈现绝对的挺拔与均衡。",
      "en": "Masterful optical entasis corrections—subtle swelling and inward tilts of the columns—creating an illusion of absolute rectilinear harmony."
    }
  },
  {
    "id": "leaning-tower-pisa",
    "name": {
      "zh": "比萨斜塔",
      "en": "Leaning Tower of Pisa"
    },
    "country": {
      "zh": "意大利",
      "en": "Italy"
    },
    "city": {
      "zh": "比萨",
      "en": "Pisa"
    },
    "flag": "🇮🇹",
    "continent": "europe",
    "year": "1173 – 1372",
    "yearNum": 1372,
    "style": {
      "zh": "罗马风独立式大理石钟楼",
      "en": "Romanesque Campanile"
    },
    "height": "56.67 米 (倾斜角约 3.97°)",
    "unesco": 1987,
    "category": "ancient",
    "wonder": "unesco",
    "modelType": "tower",
    "coords": [
      43.723,
      10.3966
    ],
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Leaning_Tower_of_Pisa.jpg/800px-Leaning_Tower_of_Pisa.jpg",
    "desc": {
      "zh": "比萨奇迹广场上因地基不均匀沉降而意外倾斜数百年的白色大理石钟楼，因伽利略自由落体思想实验闻名于世。",
      "en": "The world-famous freestanding white marble campanile that tilted during construction due to soft subsoil, stabilized as an architectural marvel."
    },
    "highlight": {
      "zh": "八层连续圆弧拱券走廊宛如优雅的浮雕浮筒，现代岩土工程通过地下抽土注浆将其稳定在安全平衡状态。",
      "en": "Six tiers of open arcaded loggias ringing the cylindrical marble shaft, saved from collapse via ingenious 20th-century soil extraction stabilization."
    }
  },
  {
    "id": "big-ben",
    "name": {
      "zh": "伊丽莎白塔 (大本钟)",
      "en": "Big Ben (Elizabeth Tower)"
    },
    "country": {
      "zh": "英国",
      "en": "United Kingdom"
    },
    "city": {
      "zh": "伦敦",
      "en": "London"
    },
    "flag": "🇬🇧",
    "continent": "europe",
    "year": "1843 – 1859",
    "yearNum": 1859,
    "style": {
      "zh": "维多利亚时代哥特复兴风格",
      "en": "Gothic Revival Architecture"
    },
    "height": "96 米",
    "unesco": 1987,
    "category": "gothic",
    "wonder": "unesco",
    "modelType": "tower",
    "coords": [
      51.5007,
      -0.1246
    ],
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Clock_Tower_-_Palace_of_Westminster%2C_London_-_May_2007.jpg/800px-Clock_Tower_-_Palace_of_Westminster%2C_London_-_May_2007.jpg",
    "desc": {
      "zh": "泰晤士河畔英国威斯敏斯特宫议会大厦北端的标志性四面报时钟楼，英国最负盛名的国家地标与精密钟表制造杰作。",
      "en": "The iconic four-faced chiming clock tower at the north end of the Houses of Parliament, renowned as the acoustic and visual heart of London."
    },
    "highlight": {
      "zh": "四面镀金雕花钟盘直径达7米，内嵌重达13.7吨的巨大重音敲钟，历经百余年风雨依然保持每小时精准鸣响。",
      "en": "Four 7m-wide iron dials framed by Gothic tracery and 312 pieces of opalescent glass, chiming with its famous 13.7-ton Great Bell."
    }
  },
  {
    "id": "notre-dame",
    "name": {
      "zh": "巴黎圣母院",
      "en": "Notre-Dame de Paris"
    },
    "country": {
      "zh": "法国",
      "en": "France"
    },
    "city": {
      "zh": "巴黎西岱岛",
      "en": "Paris"
    },
    "flag": "🇫🇷",
    "continent": "europe",
    "year": "1163 – 1345 (2024重建)",
    "yearNum": 1345,
    "style": {
      "zh": "法国早期及光芒式哥特式天主教大教堂",
      "en": "French Gothic Architecture"
    },
    "height": "塔楼 69 米 / 尖顶 96 米",
    "unesco": 1991,
    "category": "gothic",
    "wonder": "unesco",
    "modelType": "cathedral",
    "coords": [
      48.853,
      2.3499
    ],
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Notre-Dame_de_Paris_2013-07-24.jpg/800px-Notre-Dame_de_Paris_2013-07-24.jpg",
    "desc": {
      "zh": "坐落于塞纳河西岱岛上的中世纪哥特建筑杰作，雨果笔下卡西莫多守护的圣地，集飞扶壁、双钟楼与玫瑰花窗艺术之大成。",
      "en": "A supreme achievement of French Gothic sacred architecture rising on the Île de la Cité, famous for its rose windows, flying buttresses, and chiming gargoyles."
    },
    "highlight": {
      "zh": "巨大的飞扶壁首次使超高大教堂得以开辟宏大窗洞，西立面巨型圆形玫瑰花窗被誉为中世纪基督教彩色玻璃艺术的王冠。",
      "en": "Pioneering use of exterior flying buttresses and rib vaults enabling vast stained-glass rosettes that flood the soaring nave with celestial light."
    }
  },
  {
    "id": "neuschwanstein",
    "name": {
      "zh": "新天鹅堡",
      "en": "Neuschwanstein Castle"
    },
    "country": {
      "zh": "德国",
      "en": "Germany"
    },
    "city": {
      "zh": "巴伐利亚州菲森",
      "en": "Schwangau, Bavaria"
    },
    "flag": "🇩🇪",
    "continent": "europe",
    "year": "1869 – 1886",
    "yearNum": 1886,
    "style": {
      "zh": "19世纪浪漫主义中世纪复兴城堡",
      "en": "Romanesque Revival Castle"
    },
    "height": "主塔 65 米",
    "unesco": 0,
    "category": "gothic",
    "wonder": "unesco",
    "modelType": "castle",
    "coords": [
      47.5576,
      10.7498
    ],
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Schloss_Neuschwanstein_2013.jpg/800px-Schloss_Neuschwanstein_2013.jpg",
    "desc": {
      "zh": "巴伐利亚国王路德维希二世在阿尔卑斯山巅筑造的梦幻童话城堡，迪士尼经典睡美人城堡的原型灵感来源。",
      "en": "King Ludwig II of Bavaria's fairytale clifftop retreat in the Bavarian Alps, the ultimate romantic fortress that inspired Disney's Cinderella castle."
    },
    "highlight": {
      "zh": "耸立在阿尔卑斯峡谷危崖之巅，白墙尖塔与深蓝湖泊、白雪枫林构成四季如梦似幻的油画风光。",
      "en": "Perched dramtically above the Pöllat Gorge with limestone ashlar towers, sweeping pinnacles, and interiors inspired by Wagnerian operas."
    }
  },
  {
    "id": "st-basils",
    "name": {
      "zh": "圣瓦西里大教堂",
      "en": "Saint Basil's Cathedral"
    },
    "country": {
      "zh": "俄罗斯",
      "en": "Russia"
    },
    "city": {
      "zh": "莫斯科红场",
      "en": "Moscow"
    },
    "flag": "🇷🇺",
    "continent": "europe",
    "year": "1555 – 1561",
    "yearNum": 1561,
    "style": {
      "zh": "俄罗斯帐篷顶与洋葱头彩色东正教建筑",
      "en": "Russian Tent-Roof & Onion Dome Architecture"
    },
    "height": "47.5 米",
    "unesco": 1990,
    "category": "eastern",
    "wonder": "unesco",
    "modelType": "dome",
    "coords": [
      55.7525,
      37.6231
    ],
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Moscow_05-2012_St_Basils_02.jpg/800px-Moscow_05-2012_St_Basils_02.jpg",
    "desc": {
      "zh": "伊凡雷帝为纪念征服喀山汗国而建，红场上最夺目的地标。九座色彩斑斓、纹理各异的洋葱头穹顶如跳跃的篝火升腾于天际。",
      "en": "Commissioned by Ivan the Terrible on Red Square, this iconic monument features nine dazzlingly colorful, flame-shaped onion domes."
    },
    "highlight": {
      "zh": "中央主塔呈八角形帐篷顶，八座副教堂如八角星般环绕周围，各穹顶采用扭曲旋纹、菱格凸起等极度丰富的雕塑手笔。",
      "en": "A central tent-roofed core surrounded by eight auxiliary chapels, each crowned by uniquely patterned and vividly painted spiraled domes."
    }
  },
  {
    "id": "stonehenge",
    "name": {
      "zh": "巨石阵",
      "en": "Stonehenge"
    },
    "country": {
      "zh": "英国",
      "en": "United Kingdom"
    },
    "city": {
      "zh": "威尔特郡索尔兹伯里",
      "en": "Wiltshire"
    },
    "flag": "🇬🇧",
    "continent": "europe",
    "year": "公元前3000 – 前2000年",
    "yearNum": -2500,
    "style": {
      "zh": "新石器时代史前环状巨石建筑",
      "en": "Prehistoric Megalithic Monument"
    },
    "height": "立石高约 4.1 米 (重达 25 吨)",
    "unesco": 1986,
    "category": "ancient",
    "wonder": "ancient",
    "modelType": "ring",
    "coords": [
      51.1789,
      -1.8262
    ],
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Stonehenge2007_07_18.jpg/800px-Stonehenge2007_07_18.jpg",
    "desc": {
      "zh": "史前人类在索尔兹伯里平原上遗留的古老天文与祭祀谜迹，巨大的萨森立石与横梁精准指向夏至日出的第一缕曙光。",
      "en": "A prehistoric ring of standing sarsen stones in Wiltshire, precisely aligned with the sunset of the winter solstice and sunrise of the summer solstice."
    },
    "highlight": {
      "zh": "史前工匠利用榫眼和榫头将重达数十吨的横梁嵌合在立石顶部，石块从数百公里外的威尔士跨越山海转运而来。",
      "en": "Engineered with sophisticated mortise-and-tenon woodworking joints carved directly into monumental multi-ton megalithic sarsen stone blocks."
    }
  },
  {
    "id": "statue-of-liberty",
    "name": {
      "zh": "自由女神像",
      "en": "Statue of Liberty"
    },
    "country": {
      "zh": "美国",
      "en": "United States"
    },
    "city": {
      "zh": "纽约海港自由岛",
      "en": "New York City"
    },
    "flag": "🇺🇸",
    "continent": "americas",
    "year": "1884 – 1886",
    "yearNum": 1886,
    "style": {
      "zh": "新古典主义铸铜纪念雕像工程",
      "en": "Neoclassical Colossal Sculpture"
    },
    "height": "地面至火炬顶 93 米",
    "unesco": 1984,
    "category": "modern",
    "wonder": "unesco",
    "modelType": "statue",
    "coords": [
      40.6892,
      -74.0445
    ],
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Lady_Liberty_under_a_blue_sky_%28cropped%29.jpg/800px-Lady_Liberty_under_a_blue_sky_%28cropped%29.jpg",
    "desc": {
      "zh": "法国人民赠予美国独立100周年的伟大礼物，巍然耸立在纽约港湾，百年来成为世界追求自由、民主与移民希望的不灭灯塔。",
      "en": "A colossal neoclassical copper sculpture on Liberty Island in New York Harbor, gifted by the people of France as a universal symbol of freedom."
    },
    "highlight": {
      "zh": "法国雕塑家巴托尔迪塑形，古斯塔夫·埃菲尔设计内部弹性铁质骨架，外覆350块厚仅2.4毫米的铜板经氧化呈现经典铜绿色。",
      "en": "Sculpted by Bartholdi over an innovative internal wrought-iron structural pylon designed by Gustave Eiffel, clad in 350 hammered copper repoussé sheets."
    }
  },
  {
    "id": "machu-picchu",
    "name": {
      "zh": "马丘比丘 (天空之城)",
      "en": "Machu Picchu"
    },
    "country": {
      "zh": "秘鲁",
      "en": "Peru"
    },
    "city": {
      "zh": "库斯科安第斯山脉",
      "en": "Cusco Region"
    },
    "flag": "🇵🇪",
    "continent": "americas",
    "year": "公元1450年左右",
    "yearNum": 1450,
    "style": {
      "zh": "印加古典巨石无灰砌筑建筑",
      "en": "Inca Ashlar Masonry Architecture"
    },
    "height": "海拔 2,430 米",
    "unesco": 1983,
    "category": "ancient",
    "wonder": "new7",
    "modelType": "temple",
    "coords": [
      -13.1631,
      -72.545
    ],
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Machu_Picchu%2C_Peru.jpg/800px-Machu_Picchu%2C_Peru.jpg",
    "desc": {
      "zh": "安第斯山巅云雾缭绕中的印加帝国皇室庄园，梯田、神庙与宫室在险峻马鞍脊上依山层叠，被誉为“失落的天空之城”。",
      "en": "The 15th-century Inca royal citadel perched high in the Andes clouds above the Urubamba River, an engineering wonder of stone masonry."
    },
    "highlight": {
      "zh": "完全不使用砂浆的“干结法”切割巨石，石块拼合严丝合缝至刀片难入，并具备卓越的抗地震滑动排导体系。",
      "en": "Polished dry-stone ashlar masonry where huge granite blocks fit together without mortar so tightly that a knife blade cannot slip between them."
    }
  },
  {
    "id": "golden-gate-bridge",
    "name": {
      "zh": "金门大桥",
      "en": "Golden Gate Bridge"
    },
    "country": {
      "zh": "美国",
      "en": "United States"
    },
    "city": {
      "zh": "旧金山",
      "en": "San Francisco"
    },
    "flag": "🇺🇸",
    "continent": "americas",
    "year": "1933 – 1937",
    "yearNum": 1937,
    "style": {
      "zh": "装饰艺术风格超长悬索桥",
      "en": "Art Deco Suspension Bridge"
    },
    "height": "桥塔高 227 米 (跨度 1,280 米)",
    "unesco": 0,
    "category": "modern",
    "wonder": "modern",
    "modelType": "bridge",
    "coords": [
      37.8199,
      -122.4783
    ],
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/GoldenGateBridge-001.jpg/800px-GoldenGateBridge-001.jpg",
    "desc": {
      "zh": "横跨金门海峡的橘红色悬索桥，在太平洋汹涌狂涛与浓密平流雾中飞架南北，被誉为现代土木工程的七大奇迹之一。",
      "en": "The world-famous suspension bridge spanning the Golden Gate Strait, renowned for its radiant International Orange hue and Art Deco towers."
    },
    "highlight": {
      "zh": "标志性的国际橘涂装不仅在海雾中醒目保障通航安全，其装饰艺术风格层退式桥塔与轻盈优美的悬索弧线融为一体。",
      "en": "International Orange paint formulated to remain visible in dense coastal fog, paired with stepped Art Deco portal tower chevron bracing."
    }
  },
  {
    "id": "chichen-itza",
    "name": {
      "zh": "奇琴伊察 (库库尔坎金字塔)",
      "en": "Chichen Itza (El Castillo)"
    },
    "country": {
      "zh": "墨西哥",
      "en": "Mexico"
    },
    "city": {
      "zh": "尤卡坦半岛",
      "en": "Yucatán"
    },
    "flag": "🇲🇽",
    "continent": "americas",
    "year": "公元800 – 1200年",
    "yearNum": 1000,
    "style": {
      "zh": "后古典期玛雅-托尔特克阶梯金字塔",
      "en": "Maya-Toltec Stepped Pyramid"
    },
    "height": "30 米 (包含顶庙)",
    "unesco": 1988,
    "category": "ancient",
    "wonder": "new7",
    "modelType": "pyramid",
    "coords": [
      20.6843,
      -88.5678
    ],
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Chichen_Itza_3.jpg/800px-Chichen_Itza_3.jpg",
    "desc": {
      "zh": "玛雅文明最高智慧的建筑结晶，将历法、天文学与严苛的几何力学融合一体的“羽蛇神金字塔”。",
      "en": "The focal temple of the ancient Maya civilization in Yucatán, engineered as a monumental stone calendar honoring the feathered serpent god Kukulcan."
    },
    "highlight": {
      "zh": "每年春分与秋分傍晚，夕阳在北面阶梯投下三角形阴影，宛如一条巨蟒缓缓沿台阶向大地蜿蜒滑落的“羽蛇下凡”天象奇观。",
      "en": "During equinox sunrises and sunsets, the pyramid casts a series of serpentine triangular shadows that slither down the northern staircase to join a carved snake head."
    }
  },
  {
    "id": "christ-redeemer",
    "name": {
      "zh": "里约热内卢基督像",
      "en": "Christ the Redeemer"
    },
    "country": {
      "zh": "巴西",
      "en": "Brazil"
    },
    "city": {
      "zh": "里约热内卢",
      "en": "Rio de Janeiro"
    },
    "flag": "🇧🇷",
    "continent": "americas",
    "year": "1922 – 1931",
    "yearNum": 1931,
    "style": {
      "zh": "装饰艺术风格钢筋混凝土雕塑",
      "en": "Art Deco Colossal Sculpture"
    },
    "height": "38 米 (手臂跨度 28 米)",
    "unesco": 2012,
    "category": "modern",
    "wonder": "new7",
    "modelType": "statue",
    "coords": [
      -22.9519,
      -43.2105
    ],
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Christ_the_Redeemer_-_Rio_de_Janeiro%2C_Brazil.jpg/800px-Christ_the_Redeemer_-_Rio_de_Janeiro%2C_Brazil.jpg",
    "desc": {
      "zh": "耸立在里约热内卢国家森林公园科尔科瓦多山顶的救世基督巨像，张开双臂俯瞰大西洋与整座城市，象征包容与庇佑。",
      "en": "The towering Art Deco statue of Jesus Christ overlooking Rio de Janeiro atop Mount Corcovado, arms outstretched to embrace the world."
    },
    "highlight": {
      "zh": "采用钢筋混凝土浇筑为核心结构，外表拼贴了数百万片细小的马赛克皂石瓷砖，历经狂风与雷暴侵袭依然坚不可摧。",
      "en": "Engineered with reinforced concrete covered by a protective mosaic of millions of triangular soapstone tiles, resisting Atlantic oceanic winds."
    }
  },
  {
    "id": "empire-state",
    "name": {
      "zh": "帝国大厦",
      "en": "Empire State Building"
    },
    "country": {
      "zh": "美国",
      "en": "United States"
    },
    "city": {
      "zh": "纽约曼哈顿",
      "en": "New York City"
    },
    "flag": "🇺🇸",
    "continent": "americas",
    "year": "1930 – 1931",
    "yearNum": 1931,
    "style": {
      "zh": "装饰艺术风格钢结构摩天楼",
      "en": "Art Deco Skyscraper"
    },
    "height": "443.2 米 (含天线)",
    "unesco": 0,
    "category": "modern",
    "wonder": "modern",
    "modelType": "spire",
    "coords": [
      40.7484,
      -73.9857
    ],
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Empire_State_Building_from_the_Top_of_the_Rock.jpg/800px-Empire_State_Building_from_the_Top_of_the_Rock.jpg",
    "desc": {
      "zh": "仅用1年零45天便神速建成的20世纪摩天楼传奇，保持世界第一高楼纪录长达近40年，曼哈顿永恒的黄金天际线心脏。",
      "en": "The legendary 102-story Art Deco skyscraper erected in just 410 days, standing for nearly four decades as the tallest building in the world."
    },
    "highlight": {
      "zh": "层层向内收进的几何退台设计与顶端飞艇系泊桅杆，配合花岗岩、石灰石外墙与高亮铝材装饰，开创摩天楼建造工程速度神话。",
      "en": "Classic stepped Art Deco massing with Indiana limestone facades and a mooring mast spire originally intended for docking transatlantic dirigibles."
    }
  },
  {
    "id": "pyramids-giza",
    "name": {
      "zh": "吉萨金字塔群与狮身人面像",
      "en": "Giza Pyramids & Great Sphinx"
    },
    "country": {
      "zh": "埃及",
      "en": "Egypt"
    },
    "city": {
      "zh": "开罗近郊吉萨高原",
      "en": "Giza, Cairo"
    },
    "flag": "🇪🇬",
    "continent": "africa_me",
    "year": "公元前2580 – 前2560年",
    "yearNum": -2560,
    "style": {
      "zh": "古埃及第四王朝巨石金字塔",
      "en": "Ancient Egyptian Monumental Masonry"
    },
    "height": "胡夫金字塔现高 138.8 米",
    "unesco": 1979,
    "category": "ancient",
    "wonder": "ancient",
    "modelType": "pyramid",
    "coords": [
      29.9792,
      31.1342
    ],
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/All_Gizah_Pyramids.jpg/800px-All_Gizah_Pyramids.jpg",
    "desc": {
      "zh": "古代世界七大奇迹中唯一幸存至今的伟大遗存，胡夫金字塔在近4000年间始终是世界上最高的人造建筑物，人类建筑史的不朽丰碑。",
      "en": "The oldest and only substantially surviving wonder of the ancient world, dominating the desert plateau beside the Nile for 4,500 years."
    },
    "highlight": {
      "zh": "约230万块平均重达2.5吨的巨型石灰石方块紧密砌筑，正四棱锥四面严苛对应东南西北四个正基准方位，误差不足数分。",
      "en": "Constructed from 2.3 million limestone blocks aligned to the cardinal points with mind-boggling precision under 4th-dynasty pharaohs."
    }
  },
  {
    "id": "abu-simbel",
    "name": {
      "zh": "阿布辛贝神庙",
      "en": "Abu Simbel Temples"
    },
    "country": {
      "zh": "埃及",
      "en": "Egypt"
    },
    "city": {
      "zh": "阿斯旺以南纳赛尔湖畔",
      "en": "Aswan Governorate"
    },
    "flag": "🇪🇬",
    "continent": "africa_me",
    "year": "公元前1264 – 前1244年",
    "yearNum": -1244,
    "style": {
      "zh": "古埃及第十九王朝岩窟神庙",
      "en": "Ancient Egyptian Rock-Cut Temple"
    },
    "height": "神庙门楼高 33 米 / 坐像高 20 米",
    "unesco": 1979,
    "category": "ancient",
    "wonder": "unesco",
    "modelType": "temple",
    "coords": [
      22.3372,
      31.6258
    ],
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Abu_Simbel%2C_Ramesses_Temple%2C_front%2C_Egypt%2C_Oct_2004.jpg/800px-Abu_Simbel%2C_Ramesses_Temple%2C_front%2C_Egypt%2C_Oct_2004.jpg",
    "desc": {
      "zh": "拉美西斯二世为彰显王权与神性在悬崖岩体内雕凿的双神庙，1960年代因阿斯旺大坝修建成功实施了人类历史上最震撼的整体切割搬迁抢救。",
      "en": "Colossal rock-cut temples commissioned by Pharaoh Ramesses II, dismantled block-by-block and reassembled 65 meters higher in a historic 1960s rescue."
    },
    "highlight": {
      "zh": "四座高20米的法老巨像镇守立面；古埃及工程师精心设计的光学奇迹，每年法老生日与登基日清晨阳光直射入60米深幽暗圣殿内部神像。",
      "en": "A 3,000-year-old solar alignment where twice a year the sun's first rays illuminate the innermost sanctuary statues 65 meters deep inside the mountain."
    }
  },
  {
    "id": "hassan-ii-mosque",
    "name": {
      "zh": "哈桑二世清真寺",
      "en": "Hassan II Mosque"
    },
    "country": {
      "zh": "摩洛哥",
      "en": "Morocco"
    },
    "city": {
      "zh": "卡萨布兰卡",
      "en": "Casablanca"
    },
    "flag": "🇲🇦",
    "continent": "africa_me",
    "year": "1986 – 1993",
    "yearNum": 1993,
    "style": {
      "zh": "摩尔人与现代伊斯兰建筑融合",
      "en": "Moorish-Islamic Modern Architecture"
    },
    "height": "宣礼塔 210 米",
    "unesco": 0,
    "category": "eastern",
    "wonder": "unesco",
    "modelType": "tower",
    "coords": [
      33.6086,
      -7.6328
    ],
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Mosqu%C3%A9e_Hassan_II_Casablanca.jpg/800px-Mosqu%C3%A9e_Hassan_II_Casablanca.jpg",
    "desc": {
      "zh": "三分之一建于大西洋汹涌碧波之上的现代宗教工程巨构，拥有非洲最高、世界第二高的210米宣礼塔，塔顶配有直射麦加方向的激光导航。",
      "en": "A magnificent seaside sanctuary extending directly over the Atlantic Ocean in Casablanca, crowned by a 210-meter minaret projecting a laser beam toward Mecca."
    },
    "highlight": {
      "zh": "祈祷大厅顶部安装了重达1100吨的巨型钛合金活动屋顶，仅需3分钟即可向两侧滑开，让信徒在星空与涛声下虔诚礼拜。",
      "en": "Features an automatic retractable titanium roof that glides open in 3 minutes, heated floors, and glass sections offering views of the ocean waves below."
    }
  },
  {
    "id": "sydney-opera-house",
    "name": {
      "zh": "悉尼歌剧院",
      "en": "Sydney Opera House"
    },
    "country": {
      "zh": "澳大利亚",
      "en": "Australia"
    },
    "city": {
      "zh": "悉尼便利朗角",
      "en": "Sydney"
    },
    "flag": "🇦🇺",
    "continent": "oceania",
    "year": "1959 – 1973",
    "yearNum": 1973,
    "style": {
      "zh": "现代表现主义雕塑式混凝土贝壳壳体",
      "en": "Expressionist Sculptural Architecture"
    },
    "height": "最高帆尖 65 米",
    "unesco": 2007,
    "category": "modern",
    "wonder": "unesco",
    "modelType": "shells",
    "coords": [
      -33.8568,
      151.2153
    ],
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Sydney_Opera_House_-_Dec_2008.jpg/800px-Sydney_Opera_House_-_Dec_2008.jpg",
    "desc": {
      "zh": "20世纪最伟大的表现主义建筑杰作之一，丹麦建筑师约恩·乌松从剥开的橙子皮中获得灵感，如同一组洁白风帆在蔚蓝海湾中扬帆起航。",
      "en": "Jørn Utzon's 20th-century masterpiece on Bennelong Point, resembling billowing white sails navigating the turquoise waters of Sydney Harbour."
    },
    "highlight": {
      "zh": "突破性的预制混凝土球形几何壳体，表面覆盖1,056,006块在阳光下自我清洁的瑞典人字形光泽白釉瓷砖。",
      "en": "Precast concrete rib shells derived from the geometry of a single sphere, covered in 1.05 million Swedish ceramic tiles that glisten in harbor light."
    }
  },
  {
    "id": "moai-easter-island",
    "name": {
      "zh": "复活节岛摩艾石像群 (阿胡汤加里基)",
      "en": "Moai of Easter Island (Ahu Tongariki)"
    },
    "country": {
      "zh": "智利",
      "en": "Chile / Rapa Nui"
    },
    "city": {
      "zh": "复活节岛 (拉帕努伊)",
      "en": "Easter Island"
    },
    "flag": "🇨🇱",
    "continent": "oceania",
    "year": "公元1250 – 1500年",
    "yearNum": 1300,
    "style": {
      "zh": "波利尼西亚巨石雕刻圣台",
      "en": "Polynesian Megalithic Monument"
    },
    "height": "最大石像高达 10 米 (重达 86 吨)",
    "unesco": 1995,
    "category": "ancient",
    "wonder": "unesco",
    "modelType": "statue",
    "coords": [
      -27.1258,
      -109.277
    ],
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Ahu_Tongariki.jpg/800px-Ahu_Tongariki.jpg",
    "desc": {
      "zh": "孤悬于南太平洋腹地的拉帕努伊原住民神秘巨石奇观，近千座背对浩瀚大洋、面向村落聚落的庄严巨石雕像守护着先祖灵魂。",
      "en": "Nearly 1,000 monumental human figures carved by the Rapa Nui people on a remote Polynesian volcanic island, resting upon ceremonial stone platforms."
    },
    "highlight": {
      "zh": "从拉诺拉拉库火山口凝灰岩采石场整体雕刻，通过神秘的人力摇摆“走步法”转运至岛屿四周的石祭台上安放普卡奥红石发髻。",
      "en": "Carved from volcanic tuff at Rano Raraku and walked miles across the island using ropes, some crowned with red scoria pukao topknots."
    }
  },
  {
    "id": "hagia-sophia",
    "name": {
      "zh": "圣索菲亚大教堂",
      "en": "Hagia Sophia"
    },
    "country": {
      "zh": "土耳其",
      "en": "Turkey"
    },
    "city": {
      "zh": "伊斯坦布尔",
      "en": "Istanbul"
    },
    "flag": "🇹🇷",
    "continent": "europe",
    "year": "公元532 – 537年",
    "yearNum": 537,
    "style": {
      "zh": "拜占庭建筑巅峰 / 帆拱圆顶",
      "en": "Byzantine Architecture"
    },
    "height": "圆顶高 55.6 米 / 直径 31 米",
    "unesco": 1985,
    "category": "ancient",
    "wonder": "unesco",
    "modelType": "dome",
    "coords": [
      41.0086,
      28.9802
    ],
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Hagia_Sophia_Mars_2013.jpg/800px-Hagia_Sophia_Mars_2013.jpg",
    "desc": {
      "zh": "查士丁尼一世下令建造的拜占庭帝国皇冠，一千年来世界上最大的人造室内空间，以其宛如悬浮在半空中的金色巨型圆顶震慑世人。",
      "en": "The crowning achievement of Byzantine architecture commissioned by Emperor Justinian I, famous for its massive pendentive dome that seems suspended from heaven."
    },
    "highlight": {
      "zh": "采用四个巨型帆拱（Pendentives）将圆形大穹顶过渡至正方形基座，圆顶底部的40扇窗户让日光倾泻而下，如神圣光环笼罩大厅。",
      "en": "Revolutionary structural pendentives transitioning the 31m spherical dome onto square piers, pierced by 40 perimeter windows creating a halo of mystical light."
    }
  },
  {
    "id": "chureito-fuji",
    "name": {
      "zh": "新仓山浅间公园五重塔与富士山",
      "en": "Chureito Pagoda & Mount Fuji"
    },
    "country": {
      "zh": "日本",
      "en": "Japan"
    },
    "city": {
      "zh": "山梨县富士吉田市",
      "en": "Fujiyoshida, Yamanashi"
    },
    "flag": "🇯🇵",
    "continent": "asia",
    "year": "1962年 (富士山为万年活火山)",
    "yearNum": 1962,
    "style": {
      "zh": "传统和风五重塔与圣山景观",
      "en": "Traditional Japanese Pagoda & Sacred Mount"
    },
    "height": "富士山海拔 3,776 米",
    "unesco": 2013,
    "category": "eastern",
    "wonder": "unesco",
    "modelType": "pagoda",
    "coords": [
      35.5008,
      138.8016
    ],
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Chureito_pagoda_%28cropped%29.jpg/800px-Chureito_pagoda_%28cropped%29.jpg",
    "desc": {
      "zh": "世界知名的日本标志性明信片视角：朱红色五重忠灵塔、盛开的染井吉野樱花与皑皑白雪覆盖的富士山圣峰同框交织。",
      "en": "Japan's most iconic scenic vantage: a crimson five-story pagoda framed by spring cherry blossoms overlooking the snow-capped volcanic cone of Mount Fuji."
    },
    "highlight": {
      "zh": "五重塔遵循日本飞鸟时代传承的心柱防震结构，与远方海拔3,776米的大型层状活火山构成人与自然的极致东方禅意。",
      "en": "Traditional pagoda timber engineering featuring an earthquake-damping central shinbashira column set against the sacred symmetry of Mount Fuji."
    }
  },
  {
    "id": "borobudur",
    "name": {
      "zh": "婆罗浮屠",
      "en": "Borobudur"
    },
    "country": {
      "zh": "印度尼西亚",
      "en": "Indonesia"
    },
    "city": {
      "zh": "爪哇岛马格朗",
      "en": "Central Java"
    },
    "flag": "🇮🇩",
    "continent": "asia",
    "year": "公元750 – 825年",
    "yearNum": 825,
    "style": {
      "zh": "大乘佛教坛场金字塔建筑",
      "en": "Mahayana Buddhist Stupa Architecture"
    },
    "height": "高 35 米 / 基座边长 123 米",
    "unesco": 1991,
    "category": "eastern",
    "wonder": "unesco",
    "modelType": "temple",
    "coords": [
      -7.6079,
      110.2038
    ],
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Borobudur-NothEast-view.jpg/800px-Borobudur-NothEast-view.jpg",
    "desc": {
      "zh": "南半球最大、世界现存最庞大的大乘佛教石雕建筑群，矗立在热带密林环绕的小丘上，形如一座巨型的三维立体曼陀罗坛城。",
      "en": "The world's largest Buddhist temple complex, rising out of the lush green plains of Central Java as a monumental three-dimensional stone mandala."
    },
    "highlight": {
      "zh": "九层阶梯式平台自下而上象征“欲界、色界、无色界”，上层分布着72座镂空钟形舍利塔，内各安放一尊凝视远山的佛陀雕像。",
      "en": "Nine stacked platforms representing Buddhist cosmology crowned by 72 perforated bell-shaped stupas, each housing a meditating Buddha stone statue."
    }
  },
  {
    "id": "shwedagon-pagoda",
    "name": {
      "zh": "仰光大金塔",
      "en": "Shwedagon Pagoda"
    },
    "country": {
      "zh": "缅甸",
      "en": "Myanmar"
    },
    "city": {
      "zh": "仰光",
      "en": "Yangon"
    },
    "flag": "🇲🇲",
    "continent": "asia",
    "year": "公元前6世纪始建 / 14-16世纪扩建",
    "yearNum": 1400,
    "style": {
      "zh": "缅甸传统倒钟形贴金佛塔",
      "en": "Burmese Buddhist Monolithic Stupa"
    },
    "height": "高 112 米",
    "unesco": 0,
    "category": "eastern",
    "wonder": "unesco",
    "modelType": "pagoda",
    "coords": [
      16.7983,
      96.1497
    ],
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Shwedagon_02.jpg/800px-Shwedagon_02.jpg",
    "desc": {
      "zh": "缅甸最神圣的佛教圣地，高逾百米、周身贴满厚实纯金箔的巨型金塔，相传供奉着拘留孙佛的拐杖、迦叶佛的袈裟与释迦牟尼佛的八根圣发。",
      "en": "The most sacred Buddhist pagoda in Myanmar, a soaring 112m golden stupa dominating the Yangon skyline, plated with tons of genuine gold leaf."
    },
    "highlight": {
      "zh": "塔身贴有数万块真金箔，塔尖金伞盖顶端镶嵌着7,000余颗名贵红蓝宝石与一颗重达76克拉的巨型钻石，在阳光下璀璨耀目。",
      "en": "Encrusted with over 7,000 diamonds, rubies, and sapphires and crowned with a 76-carat diamond, reflecting the dawn and sunset across golden terraces."
    }
  },
  {
    "id": "alhambra",
    "name": {
      "zh": "阿尔罕布拉宫 (红宫)",
      "en": "Alhambra"
    },
    "country": {
      "zh": "西班牙",
      "en": "Spain"
    },
    "city": {
      "zh": "格拉纳达",
      "en": "Granada, Andalusia"
    },
    "flag": "🇪🇸",
    "continent": "europe",
    "year": "1238 – 1358",
    "yearNum": 1358,
    "style": {
      "zh": "安达卢西亚摩尔式伊斯兰宫殿园林",
      "en": "Andalusian Moorish Architecture"
    },
    "height": "科玛莱斯塔 45 米",
    "unesco": 1984,
    "category": "eastern",
    "wonder": "unesco",
    "modelType": "castle",
    "coords": [
      37.1773,
      -3.5899
    ],
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Dawn_Charles_V_Palace_Alhambra_Granada_Andalusia_Spain.jpg/800px-Dawn_Charles_V_Palace_Alhambra_Granada_Andalusia_Spain.jpg",
    "desc": {
      "zh": "摩尔人统治伊比利亚半岛时期的辉煌终曲，坐落于内华达雪山下的红色城堡宫殿群，阿拉伯伊斯兰造园与装饰艺术在欧洲的最高巅峰。",
      "en": "The historic palace and fortress complex of the Nasrid dynasty in Granada, celebrated as the pinnacle of Moorish architectural and hydraulic art in Europe."
    },
    "highlight": {
      "zh": "狮子庭院的喷泉水系、蜂巢状钟乳石石膏吊顶（Muqarnas）与极度繁复的阿拉伯藤蔓花纹与几何瓷砖拼贴，营造人间伊甸园般的诗意氛围。",
      "en": "Intricate honeycombed muqarnas plaster vaults, marble courtyards with flowing fountain rills, and arabesque geometric zellige tilework."
    }
  },
  {
    "id": "florence-duomo",
    "name": {
      "zh": "佛罗伦萨圣母百花大教堂",
      "en": "Florence Cathedral (Santa Maria del Fiore)"
    },
    "country": {
      "zh": "意大利",
      "en": "Italy"
    },
    "city": {
      "zh": "佛罗伦萨",
      "en": "Florence, Tuscany"
    },
    "flag": "🇮🇹",
    "continent": "europe",
    "year": "1296 – 1436",
    "yearNum": 1436,
    "style": {
      "zh": "意大利哥特式与文艺复兴过渡圆顶",
      "en": "Italian Gothic & Renaissance Architecture"
    },
    "height": "圆顶高 114.5 米 / 内径 45.5 米",
    "unesco": 1982,
    "category": "gothic",
    "wonder": "unesco",
    "modelType": "dome",
    "coords": [
      43.7731,
      11.256
    ],
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Florence_Duomo_from_Michelangelo_esplanade.jpg/800px-Florence_Duomo_from_Michelangelo_esplanade.jpg",
    "desc": {
      "zh": "文艺复兴建筑史的破晓丰碑。菲利波·布鲁内莱斯基以划时代的天才工程力学在不搭脚手架的前提下成功合拢了世界上最大的砌体砖石圆顶。",
      "en": "The iconic centerpiece of the Tuscan capital, crowned by Filippo Brunelleschi's revolutionary octagonal brick dome—the largest masonry dome ever built."
    },
    "highlight": {
      "zh": "首创双层壳体自承重结构与人字形鱼骨砌砖技术（Spinapesce），外部镶嵌托斯卡纳白、绿、粉三色大理石几何饰面。",
      "en": "Engineered without timber centering using a double-walled herringbone brickwork system and a hoisting crane invented specifically for the project."
    }
  },
  {
    "id": "brandenburg-gate",
    "name": {
      "zh": "勃兰登堡门",
      "en": "Brandenburg Gate"
    },
    "country": {
      "zh": "德国",
      "en": "Germany"
    },
    "city": {
      "zh": "柏林",
      "en": "Berlin"
    },
    "flag": "🇩🇪",
    "continent": "europe",
    "year": "1788 – 1791",
    "yearNum": 1791,
    "style": {
      "zh": "早期新古典主义砂岩凯旋城门",
      "en": "Early Neoclassical Architecture"
    },
    "height": "高 26 米 / 宽 65.5 米",
    "unesco": 0,
    "category": "ancient",
    "wonder": "unesco",
    "modelType": "arch",
    "coords": [
      52.5163,
      13.3777
    ],
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Brandenburger_Tor_abends.jpg/800px-Brandenburger_Tor_abends.jpg",
    "desc": {
      "zh": "普鲁士国王腓特烈·威廉二世下令建造的新古典主义和平之门，见证了拿破仑进驻、二战冷战分裂与柏林墙倒塌统一的欧洲百年风云。",
      "en": "Berlin's defining 18th-century neoclassical monument, surviving war and Cold War partition to stand as the global symbol of European unity and peace."
    },
    "highlight": {
      "zh": "设计灵感取自雅典卫城山门，门楼上方矗立着雕塑大师沙多夫铸造的展开双翼的胜利女神驾驶四马双轮战车铜雕（Quadriga）。",
      "en": "Modeled after the Propylaea of the Athenian Acropolis, crowned by Johann Gottfried Schadow's bronze Quadriga depicting the goddess of victory."
    }
  },
  {
    "id": "arc-de-triomphe",
    "name": {
      "zh": "巴黎雄狮凯旋门",
      "en": "Arc de Triomphe"
    },
    "country": {
      "zh": "法国",
      "en": "France"
    },
    "city": {
      "zh": "巴黎戴高乐广场",
      "en": "Paris"
    },
    "flag": "🇫🇷",
    "continent": "europe",
    "year": "1806 – 1836",
    "yearNum": 1836,
    "style": {
      "zh": "帝国新古典主义巨型石质拱门",
      "en": "Neoclassical Triumphal Arch"
    },
    "height": "高 50 米 / 宽 45 米",
    "unesco": 0,
    "category": "ancient",
    "wonder": "unesco",
    "modelType": "arch",
    "coords": [
      48.8738,
      2.295
    ],
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Arc_de_Triomphe%2C_Paris_21_October_2010.jpg/800px-Arc_de_Triomphe%2C_Paris_21_October_2010.jpg",
    "desc": {
      "zh": "拿破仑在奥斯特里茨战役大胜后为犒赏法国陆军下令建造的庞大凯旋门，傲立于香榭丽舍大街尽头十二条放射大道交汇的星形广场中央。",
      "en": "Commissioned by Napoleon after his triumph at Austerlitz, standing proudly at the western end of the Champs-Élysées at the center of the Place Charles de Gaulle."
    },
    "highlight": {
      "zh": "门柱四壁刻满法兰西第一帝国660位将领姓名与著名战役，外立面饰有弗朗索瓦·吕德创作的激昂浮雕《马赛曲》（1792年志愿军出发）。",
      "en": "Adorned with François Rude's dramatic high-relief sculpture 'La Marseillaise' and engraved with the names of all French victories and generals."
    }
  },
  {
    "id": "mont-saint-michel",
    "name": {
      "zh": "圣米歇尔山",
      "en": "Mont-Saint-Michel"
    },
    "country": {
      "zh": "法国",
      "en": "France"
    },
    "city": {
      "zh": "诺曼底芒什省",
      "en": "Normandy"
    },
    "flag": "🇫🇷",
    "continent": "europe",
    "year": "公元708年始建 / 11-16世纪扩建",
    "yearNum": 1000,
    "style": {
      "zh": "诺曼底哥特式孤岛要塞修道院",
      "en": "Medieval Gothic Benedictine Abbey"
    },
    "height": "修道院尖顶高 157 米 (含圣徒金像)",
    "unesco": 1979,
    "category": "gothic",
    "wonder": "unesco",
    "modelType": "castle",
    "coords": [
      48.636,
      -1.5115
    ],
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Le_Mont-Saint-Michel_vu_du_ciel.jpg/800px-Le_Mont-Saint-Michel_vu_du_ciel.jpg",
    "desc": {
      "zh": "伫立在英吉利海峡大潮汐滩涂上的花岗岩潮汐圣岛，涨潮时化为海中孤岛、退潮时露出浩瀚泥滩，宛如现实版中世纪奇幻海上金字塔。",
      "en": "A dramatic tidal island commune in Normandy crowned by a gravity-defying medieval Benedictine abbey surrounded by the fastest tides in Europe."
    },
    "highlight": {
      "zh": "依花岗岩山体逐层向上叠筑的三层修道院建筑群“奇迹楼”（La Merveille），以高超的结构工程抵御了英法百年战争围攻。",
      "en": "The three-tier Gothic abbey structure known as 'La Merveille' clings to a steep granite rock, connected to the mainland only during low tides."
    }
  },
  {
    "id": "sydney-harbour-bridge",
    "name": {
      "zh": "悉尼海港大桥",
      "en": "Sydney Harbour Bridge"
    },
    "country": {
      "zh": "澳大利亚",
      "en": "Australia"
    },
    "city": {
      "zh": "悉尼",
      "en": "Sydney"
    },
    "flag": "🇦🇺",
    "continent": "oceania",
    "year": "1923 – 1932",
    "yearNum": 1932,
    "style": {
      "zh": "双铰钢桁架拱桥工程",
      "en": "Steel Through-Arch Bridge"
    },
    "height": "拱顶高 134 米 (全长 1,149 米)",
    "unesco": 0,
    "category": "modern",
    "wonder": "modern",
    "modelType": "bridge",
    "coords": [
      -33.8523,
      151.2108
    ],
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Sydney_Harbour_Bridge_from_the_air.jpg/800px-Sydney_Harbour_Bridge_from_the_air.jpg",
    "desc": {
      "zh": "被悉尼当地人亲切称为“大衣架”的世界最宽长跨钢拱桥，与对岸白帆般的悉尼歌剧院相映成趣，构成全球辨识度最高的港湾风光。",
      "en": "Affectionately nicknamed 'The Coathanger' by locals, this massive through-arch steel bridge frames the Sydney Harbour alongside the Opera House."
    },
    "highlight": {
      "zh": "由52,800吨钢铁与600万颗手工敲击的热铆钉铆接而成，热胀冷缩可使拱桥在炎热夏日升高多达18厘米。",
      "en": "Constructed with 52,800 tons of steel and 6 million hand-driven rivets, designed with massive granite-faced decorative abutment pylons."
    }
  },
  {
    "id": "cn-tower",
    "name": {
      "zh": "加拿大国家电视塔 (CN塔)",
      "en": "CN Tower"
    },
    "country": {
      "zh": "加拿大",
      "en": "Canada"
    },
    "city": {
      "zh": "安大略省多伦多",
      "en": "Toronto"
    },
    "flag": "🇨🇦",
    "continent": "americas",
    "year": "1973 – 1976",
    "yearNum": 1976,
    "style": {
      "zh": "后张拉预应力混凝土独立通信广播塔",
      "en": "Post-Tensioned Concrete Tower"
    },
    "height": "553.3 米",
    "unesco": 0,
    "category": "modern",
    "wonder": "modern",
    "modelType": "tower",
    "coords": [
      43.6426,
      -79.3871
    ],
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Toronto_-_ON_-_CN_Tower_bei_Nacht.jpg/800px-Toronto_-_ON_-_CN_Tower_bei_Nacht.jpg",
    "desc": {
      "zh": "曾保持全球最高独立结构建筑物世界纪录长达34年之久的现代工程传奇，傲立在安大略湖畔的多伦多第一地标。",
      "en": "A 553.3m concrete communications and observation tower dominating the Toronto skyline, named one of the modern Wonders of the World."
    },
    "highlight": {
      "zh": "采用Y型横截面高空滑模浇筑工法，位于342米高处的室内透明玻璃地板和户外边缘漫步（EdgeWalk）挑战人类胆量极限。",
      "en": "Engineered with a hexagonal hollow concrete core supported by three curved ribs, equipped with high-altitude glass observation floors."
    }
  },
  {
    "id": "burj-al-arab",
    "name": {
      "zh": "阿拉伯塔 (帆船酒店)",
      "en": "Burj Al Arab"
    },
    "country": {
      "zh": "阿联酋",
      "en": "United Arab Emirates"
    },
    "city": {
      "zh": "迪拜朱美拉海岸",
      "en": "Dubai"
    },
    "flag": "🇦🇪",
    "continent": "asia",
    "year": "1994 – 1999",
    "yearNum": 1999,
    "style": {
      "zh": "高科技结构主义人工岛地标酒店",
      "en": "High-Tech Structural Expressionism"
    },
    "height": "321 米",
    "unesco": 0,
    "category": "modern",
    "wonder": "modern",
    "modelType": "shells",
    "coords": [
      25.1412,
      55.1852
    ],
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Burj_Al_Arab_2011.jpg/800px-Burj_Al_Arab_2011.jpg",
    "desc": {
      "zh": "伫立在距离波斯湾海岸线280米人工岛上的七星级奢华象征，造型酷似阿拉伯传统单桅帆船“独桅艇”（Dhow）扬起的白帆。",
      "en": "The world-famous luxury hotel standing on an artificial island off Jumeirah Beach, sculpted to resemble the billowing sail of an Arabian dhow."
    },
    "highlight": {
      "zh": "由巨大的V型外露钢桁架骨架（Exoskeleton）支撑，内部拥有高达180米的壮丽金色中庭与悬臂式悬空直升机停机坪。",
      "en": "Features an external structural steel exoskeleton, a 180-meter-tall kaleidoscopic atrium, and a cantilevered helipad suspended 210 meters in the air."
    }
  }
];
