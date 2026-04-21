/**
 * AI智装啦OS - 永久数据存储文件
 * 
 * 本文件是数据的唯一持久化来源。
 * 页面加载时优先从此文件读取数据，而非localStorage。
 * 
 * ⚠️ 请勿手动修改此文件的结构，除非您清楚每字段的含义。
 * ⚠️ 每次编辑保存后，请点击"下载更新数据文件"按钮下载最新版本并替换本文件。
 */
const DATA_STORE = {
    "_version": "v4",
    "_lastUpdated": "2026-04-21",
    "editorData": {
        "promo": {
            "visible": true,
            "icon": "🎁",
            "highlight": "限时福利：",
            "desc": "",
            "badge": "🔥 火热进行中",
            "badgeVisible": true,
            "list": [
                "刚刚 祝贺X........X用户成功购买下单 本站源码出售",
                "今日每分类都有限量低价名额，先到先得，抢完恢复原价。",
                "15分钟前 恭喜W........W用户成功下单购买 搭建同类网站",
                "下单后分享专属链接，好友成功付费3笔及以上，本单金额全额返！"
            ],
            "interval": 5
        },
        "categories": [
            {
                "id": "pricing",
                "name": "系统安装服务",
                "desc": "官方原版镜像，安全纯净无捆绑",
                "icon": "💻",
                "iconType": "emoji",
                "visible": true,
                "quickAccess": null,
                "products": [
                    {
                        "name": "Windows 7",
                        "desc": "经典稳定，兼容性强",
                        "price": "5",
                        "icon": "💻",
                        "iconType": "emoji",
                        "key": "win7",
                        "cardClass": "win7-card",
                        "popular": "",
                        "badge": "经典怀旧",
                        "features": [
                            "✓ 官方原版镜像",
                            "✓ 专属安装命令",
                            "✓ 图文安装教程",
                            "✓ 永久使用授权"
                        ],
                        "buyText": "立即购买",
                        "deliveryType": "links",
                        "delivery": null
                    },
                    {
                        "name": "Windows 10",
                        "desc": "主流系统，性能均衡",
                        "price": "8",
                        "icon": "🖥️",
                        "iconType": "emoji",
                        "key": "win10",
                        "cardClass": "win10-card",
                        "popular": "🔥 最受欢迎",
                        "badge": "",
                        "features": [
                            "✓ 官方原版镜像",
                            "✓ 专属安装命令",
                            "✓ 图文安装教程",
                            "✓ 优先技术支持"
                        ],
                        "buyText": "立即购买",
                        "deliveryType": "links",
                        "delivery": null
                    },
                    {
                        "name": "Windows 11",
                        "desc": "全新体验，前沿科技",
                        "price": "8",
                        "icon": "🚀",
                        "iconType": "emoji",
                        "key": "win11",
                        "cardClass": "win11-card",
                        "popular": "",
                        "badge": "最新旗舰",
                        "features": [
                            "✓ 官方原版镜像",
                            "✓ 专属安装命令",
                            "✓ 图文安装教程",
                            "✓ 专属技术支持"
                        ],
                        "buyText": "立即购买",
                        "deliveryType": "links",
                        "delivery": null
                    },
                    {
                        "name": "Win系统盘16G",
                        "desc": "系统安装U盘，即插即用",
                        "price": "38",
                        "icon": "💿",
                        "iconType": "emoji",
                        "key": "win8",
                        "cardClass": "win8-card",
                        "popular": "",
                        "badge": "实用工具",
                        "features": [
                            "✓ 16G高速U盘",
                            "✓ 多系统镜像",
                            "✓ 即插即用",
                            "✓ 永久使用授权"
                        ],
                        "buyText": "立即购买",
                        "deliveryType": "links",
                        "delivery": null
                    }
                ]
            },
            {
                "id": "lobster",
                "name": "OpenClaw龙虾社区",
                "desc": "优质U盘资源，满足不同需求",
                "icon": "🦞",
                "iconType": "emoji",
                "visible": true,
                "quickAccess": {
                    "subtitle": "优质U盘，品质之选",
                    "cardClass": "lobster-card"
                },
                "products": [
                    {
                        "name": "龙虾U盘资源包",
                        "desc": "基础资源，经济实惠",
                        "price": "8.8",
                        "icon": "📦",
                        "iconType": "emoji",
                        "key": "lobster-basic",
                        "cardClass": "lobster-basic-card",
                        "popular": "",
                        "badge": "入门之选",
                        "features": [
                            "✓ 基础资源包",
                            "✓ 经济实惠",
                            "✓ 持续更新",
                            "✓ 永久访问权限"
                        ],
                        "buyText": "立即购买",
                        "deliveryType": "links",
                        "delivery": null
                    },
                    {
                        "name": "高速龙虾U盘(8G版)",
                        "desc": "高速纯净，品质之选",
                        "price": "38",
                        "icon": "⚡",
                        "iconType": "emoji",
                        "key": "lobster-pure",
                        "cardClass": "lobster-pure-card",
                        "popular": "🔥 最受欢迎",
                        "badge": "",
                        "features": [
                            "✓ 高速传输",
                            "✓ 纯净资源",
                            "✓ 品质保障",
                            "✓ 永久访问权限"
                        ],
                        "buyText": "立即购买",
                        "deliveryType": "links",
                        "delivery": null
                    },
                    {
                        "name": "高速龙虾U盘(16G版)",
                        "desc": "系统整合，豪华配置",
                        "price": "68",
                        "icon": "🎁",
                        "iconType": "emoji",
                        "key": "lobster-mix",
                        "cardClass": "lobster-mix-card",
                        "popular": "",
                        "badge": "豪华套餐",
                        "features": [
                            "✓ 系统整合",
                            "✓ 豪华配置",
                            "✓ 全面覆盖",
                            "✓ 永久访问权限"
                        ],
                        "buyText": "立即购买",
                        "deliveryType": "links",
                        "delivery": null
                    },
                    {
                        "name": "高速龙虾U盘(32G版)",
                        "desc": "超大容量，至尊之选",
                        "price": "98",
                        "icon": "💎",
                        "iconType": "emoji",
                        "key": "lobster-32g",
                        "cardClass": "lobster-32g-card",
                        "popular": "",
                        "badge": "至尊旗舰",
                        "features": [
                            "✓ 超大容量",
                            "✓ 至尊配置",
                            "✓ 全面覆盖",
                            "✓ 永久访问权限"
                        ],
                        "buyText": "立即购买",
                        "deliveryType": "links",
                        "delivery": null
                    }
                ]
            },
            {
                "id": "media",
                "name": "影视资源网盘基地",
                "desc": "海量影视资源，一键获取",
                "icon": "🎬",
                "iconType": "emoji",
                "visible": true,
                "quickAccess": {
                    "subtitle": "海量影视，一键获取",
                    "cardClass": "media-card"
                },
                "products": [
                    {
                        "name": "短剧漫剧AI剧",
                        "desc": "短视频剧、AI生成剧",
                        "price": "0.88",
                        "icon": "📱",
                        "iconType": "emoji",
                        "key": "media-short",
                        "cardClass": "media-short-card",
                        "popular": "",
                        "badge": "新兴潮流",
                        "features": [
                            "✓ 精选内容",
                            "✓ 快速更新",
                            "✓ 多种格式",
                            "✓ 永久访问权限"
                        ],
                        "buyText": "立即购买",
                        "deliveryType": "links",
                        "delivery": null
                    },
                    {
                        "name": "国内影视剧",
                        "desc": "国产剧、综艺、纪录片",
                        "price": "2",
                        "icon": "🎬",
                        "iconType": "emoji",
                        "key": "media-domestic",
                        "cardClass": "media-domestic-card",
                        "popular": "",
                        "badge": "热门推荐",
                        "features": [
                            "✓ 海量资源库",
                            "✓ 持续更新",
                            "✓ 高清画质",
                            "✓ 永久访问权限"
                        ],
                        "buyText": "立即购买",
                        "deliveryType": "links",
                        "delivery": null
                    },
                    {
                        "name": "国外影视剧",
                        "desc": "美剧、韩剧、日剧等",
                        "price": "2",
                        "icon": "🎥",
                        "iconType": "emoji",
                        "key": "media-foreign",
                        "cardClass": "media-foreign-card",
                        "popular": "🔥 最受欢迎",
                        "badge": "",
                        "features": [
                            "✓ 海量资源库",
                            "✓ 中文字幕",
                            "✓ 高清画质",
                            "✓ 永久访问权限"
                        ],
                        "buyText": "立即购买",
                        "deliveryType": "links",
                        "delivery": null
                    },
                    {
                        "name": "全球高清影视",
                        "desc": "全球影视，免费观看",
                        "price": "0.88",
                        "icon": "🌍",
                        "iconType": "emoji",
                        "key": "media-global",
                        "cardClass": "media-global-card",
                        "popular": "",
                        "badge": "免费福利",
                        "features": [
                            "✓ 全球影视资源",
                            "✓ 高清画质",
                            "✓ 多语言字幕",
                            "✓ 免费观看"
                        ],
                        "buyText": "立即获取",
                        "deliveryType": "links",
                        "delivery": null
                    }
                ]
            },
            {
                "id": "startup",
                "name": "网络创业项目基地",
                "desc": "精选创业项目，助力成功之路",
                "icon": "💼",
                "iconType": "emoji",
                "visible": true,
                "quickAccess": {
                    "subtitle": "创业项目，助力成功",
                    "cardClass": "startup-card"
                },
                "products": [
                    {
                        "name": "生活服务",
                        "desc": "生活服务资源合集",
                        "price": "9.9",
                        "icon": "🛠️",
                        "iconType": "emoji",
                        "key": "startup-service",
                        "cardClass": "startup-service-card",
                        "popular": "",
                        "badge": "实用工具",
                        "features": [
                            "✓ 实用服务资源",
                            "✓ 便捷使用指南",
                            "✓ 持续更新内容",
                            "✓ 永久访问权限"
                        ],
                        "buyText": "立即购买",
                        "deliveryType": "links",
                        "delivery": null
                    },
                    {
                        "name": "网创项目",
                        "desc": "网络创业项目合集",
                        "price": "19.9",
                        "icon": "💼",
                        "iconType": "emoji",
                        "key": "startup-project",
                        "cardClass": "startup-project-card",
                        "popular": "🔥 热门推荐",
                        "badge": "",
                        "features": [
                            "✓ 精选优质项目",
                            "✓ 详细操作教程",
                            "✓ 持续更新资源",
                            "✓ 永久访问权限"
                        ],
                        "buyText": "立即购买",
                        "deliveryType": "links",
                        "delivery": null
                    },
                    {
                        "name": "本站源码出售",
                        "desc": "完整源码，一键部署",
                        "price": "199",
                        "icon": "💻",
                        "iconType": "emoji",
                        "key": "startup-source",
                        "cardClass": "startup-source-card",
                        "popular": "",
                        "badge": "创业首选",
                        "features": [
                            "✓ 完整网站源码",
                            "✓ 一键部署教程",
                            "✓ 自定义收款码",
                            "✓ 永久使用授权"
                        ],
                        "buyText": "立即购买",
                        "deliveryType": "links",
                        "delivery": null
                    },
                    {
                        "name": "搭建同类网站",
                        "desc": "专属定制，技术支持",
                        "price": "299",
                        "icon": "🏗️",
                        "iconType": "emoji",
                        "key": "startup-build",
                        "cardClass": "startup-build-card",
                        "popular": "",
                        "badge": "定制服务",
                        "features": [
                            "✓ 一对一技术支持",
                            "✓ 专属定制服务",
                            "✓ 完整部署协助",
                            "✓ 售后技术保障"
                        ],
                        "buyText": "立即购买",
                        "deliveryType": "links",
                        "delivery": null
                    }
                ]
            },
            {
                "id": "opc",
                "name": "OPC异人社",
                "desc": "异人导航，探索无限可能",
                "icon": "🌐",
                "iconType": "emoji",
                "visible": true,
                "quickAccess": {
                    "subtitle": "异人导航，探索无限",
                    "cardClass": "opc-card"
                },
                "products": [
                    {
                        "name": "爱爪窝龙虾导航",
                        "desc": "龙虾导航，一爪即达",
                        "price": "1.8",
                        "icon": "🦞",
                        "iconType": "emoji",
                        "key": "opc-lobster-nav",
                        "cardClass": "opc-lobster-nav-card",
                        "popular": "",
                        "badge": "超值导航",
                        "features": [
                            "✓ 龙虾导航服务",
                            "✓ 持续更新",
                            "✓ 永久访问权限",
                            "✓ 专属导航入口"
                        ],
                        "buyText": "立即获取",
                        "deliveryType": "links",
                        "delivery": null
                    },
                    {
                        "name": "跨境卖家电商资讯",
                        "desc": "跨境电商资讯，助力出海",
                        "price": "28.8",
                        "icon": "🌐",
                        "iconType": "emoji",
                        "key": "opc-cross-border",
                        "cardClass": "opc-cross-border-card",
                        "popular": "",
                        "badge": "出海必备",
                        "features": [
                            "✓ 跨境电商资讯",
                            "✓ 持续更新",
                            "✓ 永久访问权限",
                            "✓ 专属资讯入口"
                        ],
                        "buyText": "立即获取",
                        "deliveryType": "links",
                        "delivery": {
                            "type": "links",
                            "successTitle": "访问权限已开通",
                            "card1Title": "⚡ 跨境卖家电商资讯",
                            "hint": "点击下方链接访问跨境电商资讯，助力出海",
                            "links": [
                                {
                                    "label": "🔗 打开跨境电商资讯",
                                    "url": "https://www.amz123.com/",
                                    "display": "🔗 打开跨境电商资讯: https://www.amz123.com/"
                                }
                            ],
                            "tutorial": {
                                "title": "📖 使用教程",
                                "steps": [
                                    {
                                        "t": "打开资讯链接",
                                        "d": "点击上方链接，进入<strong>跨境卖家电商资讯</strong>页面"
                                    },
                                    {
                                        "t": "浏览资讯",
                                        "d": "在资讯页面中<strong>浏览最新跨境电商动态和政策</strong>，获取行业信息"
                                    },
                                    {
                                        "t": "收藏使用",
                                        "d": "将资讯页面<strong>添加到浏览器收藏夹</strong>，方便日常查看"
                                    },
                                    {
                                        "t": "助力出海",
                                        "d": "通过跨境电商资讯<strong>了解市场趋势和运营技巧</strong>，助力您的出海事业 🎉"
                                    }
                                ]
                            },
                            "notice": {
                                "title": "⚠️ 使用提示",
                                "items": [
                                    "跨境电商资讯<strong>出海必备</strong>，仅需¥28.8",
                                    "资讯链接 <strong>永久有效</strong>，建议收藏保存",
                                    "资讯内容<strong>持续更新</strong>，建议定期查看",
                                    "如遇链接失效，请联系客服重新获取"
                                ]
                            }
                        }
                    }
                ]
            }
        ],
        "timestamp": 1776784991992
    },
    "orders": [
        {
            "id": 1776762929732,
            "sequence": 1,
            "orderNo": "ORD202604210001",
            "productName": "AI音乐U盘",
            "price": "18.8",
            "productKey": "custom_1776762875140",
            "orderType": "shipping",
            "address": "20260421356225777777777772543266666666666666",
            "status": "completed",
            "createTime": "2026-04-21T09:15:29.732Z",
            "date": "2026-04-21"
        }
    ],
    "orderSequence": 1,
    "orderLastDate": "2026-04-21"
};
