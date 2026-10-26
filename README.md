# DeepSeek Harness Antigravity Suite Plugins

> DeepSeek Harness (DSH) 官方生态的 Google Cloud Code / Antigravity 全套适配插件套件。

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![DSH Version](https://img.shields.io/badge/DSH-v0.1.2--rc.1+-brightgreen.svg)](https://github.com/guobiaocai/antidsh)
[![Model Support](https://img.shields.io/badge/Models-Gemini%203.8%20%7C%20Claude%20%7C%20GPT--OSS-orange.svg)](https://github.com/guobiaocai/antidsh)

---

## 📌 分支版本说明

- **`main` 分支（推荐 / 最新）**：全面升级适配 **`@deepseek-ai/dsh@0.1.2-rc.1`** 及以上版本。解耦强依赖，采用标准的 Cordis 动态 `settings` 注入、官方插槽规范（`plugins.bundle.config` 与 `plugins.row.config`）以及客户端 Store 三层自愈降级。
- **`v0.1` / `v0.1.1-rc.2` 分支**：归档保留适配 **`@deepseek-ai/dsh@0.1.1-rc.2`** 历史版本的插件实现。

---

## 📦 插件清单

| 插件目录 | 插件名称 | 说明 |
| :--- | :--- | :--- |
| **`dsh-llm-antigravity`** | Antigravity LLM 核心驱动与看板 | Gemini 3.8 / 3.7 / 3.5 旗舰思考模型流式对话、**实时额度监控与 5h/周度滑动窗口统计**、**Token 用量与前缀缓存深度分析看板（~97% 缓存命中率）**、**多账号聚合池与智能轮换**、**第三方模型 (Claude 5.5 / GPT-OSS) 完美兼容与动态截断**、**原生多模态媒体解析工具 (`read_video`, `read_audio`, `read_pdf`)**、全量模型别名自动映射与 Refresh Token 状态管理 |
| **`dsh-web-search-antigravity`** | Antigravity 联网搜索 | 基于 Google Grounding 的高精准实时网络信息检索提供方 |
| **`dsh-web-search-selector`** | 搜索源选择器 | 在 WebUI 设置中无缝热切换 DeepSeek 官方搜索 / Antigravity 搜索提供方 |
| **`dsh-image-gen-antigravity`** | Antigravity 图像生成 | 提供 `generate_image` 原生工具，基于 Gemini 3.1 Flash Image 支持 1:1, 16:9, 9:16, 4:3, 3:4 等多比例高质量文生图与图生图 |

---

## 🔥 完整支持模型清单与规格矩阵 (Model Catalog)

本套件完全同步 Google Cloud Code 上游最新可用模型，并针对各模型的上下文、输出上限、思考链预算及计费进行了精细适配：

### 1. 原生 Gemini 3.8 / 3.7 旗舰思考模型系列（推荐）

| 模型 ID (`modelId`) | 显示名称 | 默认上下文 | 1M 模式上限 | 最大输出 Tokens | 思考链 (Thinking) | 计费基准 (输入/输出/前缀缓存) | 适用场景 |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: | :--- |
| **`gemini-3.8-flash-high`** | Gemini 3.8 Flash High | 256K | 1,048,576 | 65,536 | ✅ 动态全量 (-1) | $0.75 / $3.75 / **$0.075** | **主力编程与复杂推理 Agent（首选推荐）** |
| **`gemini-3.8-flash-medium`**| Gemini 3.8 Flash Medium | 256K | 1,048,576 | 65,536 | ✅ 4,000 预算 | $0.75 / $3.75 / **$0.075** | 中度推理、通用代码开发与多轮分析 |
| **`gemini-3.8-flash-low`** | Gemini 3.8 Flash Low | 256K | 1,048,576 | 65,536 | ✅ 1,000 预算 | $0.75 / $3.75 / **$0.075** | 轻度思考、快速文本产出与格式转换 |
| **`gemini-3.8-flash-tiered`**| Gemini 3.8 Flash Tiered | 256K | 1,048,576 | 65,536 | ✅ 动态全量 (-1) | $0.75 / $3.75 / **$0.075** | 官方分级路由代理模式 |
| **`gemini-3.7-flash-high`** | Gemini 3.7 Flash High | 256K | 1,048,576 | 65,536 | ✅ 动态全量 (-1) | $0.75 / $3.75 / **$0.075** | 3.7 旗舰版本高强度推理 |
| **`gemini-3.7-flash-medium`**| Gemini 3.7 Flash Medium | 256K | 1,048,576 | 65,536 | ✅ 4,000 预算 | $0.75 / $3.75 / **$0.075** | 3.7 标准通用推理任务 |
| **`gemini-3.7-flash-low`** | Gemini 3.7 Flash Low | 256K | 1,048,576 | 65,536 | ✅ 1,000 预算 | $0.75 / $3.75 / **$0.075** | 3.7 低延迟快答任务 |
| **`gemini-3.7-flash-tiered`**| Gemini 3.7 Flash Tiered | 256K | 1,048,576 | 65,536 | ✅ 动态全量 (-1) | $0.75 / $3.75 / **$0.075** | 3.7 官方自动分级路由 |

### 2. Gemini 3.5 / 3.1 / 3.0 高速与专用模型系列

| 模型 ID (`modelId`) | 显示名称 | 默认上下文 | 1M 模式上限 | 最大输出 Tokens | 思考链 (Thinking) | 计费基准 (输入/输出/前缀缓存) | 适用场景 |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: | :--- |
| **`gemini-3.5-flash-lite`** | Gemini 3.5 Flash Lite | 1,048,576 | 1,048,576 | 65,535 | ✅ 支持 | **$0.15 / $0.60 / $0.015** | **超大规模长上下文处理、高性价比数据清洗** |
| **`gemini-3.5-flash-low`** | Gemini 3.5 Flash Low | 256K | 1,048,576 | 65,536 | ✅ 4,000 预算 | $1.50 / $9.00 / $0.15 | 3.5 系列中度思考任务 |
| **`gemini-3.5-flash-extra-low`** | Gemini 3.5 Flash Extra Low | 256K | 1,048,576 | 65,536 | ✅ 1,000 预算 | $1.50 / $9.00 / $0.15 | 3.5 系列轻量低开销任务 |
| **`gemini-3-flash`** | Gemini 3 Flash | 256K | 1,048,576 | 65,536 | ✅ 动态全量 (-1) | $0.75 / $3.75 / $0.1875 | 3.0 代基准推理与代码生成 |
| **`gemini-3-flash-agent`** | Gemini 3 Flash Agent | 256K | 1,048,576 | 65,536 | ✅ 动态全量 (-1) | $0.75 / $3.75 / $0.1875 | 复杂 Agent 工具调度与自主规划 |
| **`gemini-pro-agent`** | Gemini Pro Agent | 128K | 1,048,576 | 65,535 | ✅ 深度分析 | $2.00 / $12.00 / $0.20 | 深度逻辑证明、架构审计与算法推演 |
| **`gemini-3.1-flash-lite`** | Gemini 3.1 Flash Lite | 128K | 1,048,576 | 16,384 | ✅ 支持 | $0.25 / $1.50 / $0.025 | 极速响应、文档提取与轻量交互 |
| **`gemini-3.1-flash-image`**| Gemini 3.1 Flash Image | 64K | 64K | 65,536 | ❌ (图像专用) | $0.25 / $1.50 / $0.025 | **生图插件核心模型，提供文本至图像生成** |

### 3. Gemini 2.5 经典稳定模型系列

| 模型 ID (`modelId`) | 显示名称 | 默认上下文 | 1M 模式上限 | 最大输出 Tokens | 思考链 (Thinking) | 计费基准 (输入/输出/前缀缓存) | 适用场景 |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: | :--- |
| **`gemini-2.5-pro`** | Gemini 2.5 Pro | 128K | 1,048,576 | 65,535 | ✅ 1,024 预算 | $1.25 / $10.00 / $0.125 | 经典版多模态理解与综合问答 |
| **`gemini-2.5-flash`** | Gemini 2.5 Flash | 128K | 1,048,576 | 65,536 | ✅ 支持 | $0.10 / $0.40 / $0.025 | 高并发日常对话与日志解析 |
| **`gemini-2.5-flash-lite`** | Gemini 2.5 Flash Lite | 128K | 1,048,576 | 65,536 | ✅ 支持 | $0.075 / $0.30 / $0.01875 | 超轻量高通量接口调用 |
| **`gemini-2.5-flash-thinking`** | Gemini 2.5 Flash Thinking | 128K | 1,048,576 | 65,536 | ✅ 思考链 | $0.30 / $2.50 / $0.075 | 经典版思考流输出 |

### 4. 第三方 Frontier 模型（Google 上游托管）

| 模型 ID (`modelId`) | 显示名称 | 默认上下文 | 1M 模式上限 | 最大输出 Tokens | 思考链 (Thinking) | 计费基准 (输入/输出/前缀缓存) | 特殊适配说明 |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: | :--- |
| **`claude-sonnet-5-5-high`** | Claude Sonnet 5.5 (High) | 1,000,000 | 1,000,000 | **128,000** | ✅ High 档 | 按 Anthropic 家族费率估算 | **Sonnet 5.5 旗舰（4.6 已退役，别名自动迁移）** |
| **`claude-sonnet-5-5-medium`** | Claude Sonnet 5.5 (Medium) | 1,000,000 | 1,000,000 | **128,000** | ✅ Medium 档 | 按 Anthropic 家族费率估算 | Sonnet 5.5 中度推理 |
| **`claude-sonnet-5-5-low`** | Claude Sonnet 5.5 (Low) | 1,000,000 | 1,000,000 | **128,000** | ✅ Low 档 | 按 Anthropic 家族费率估算 | Sonnet 5.5 轻量快答 |
| **`claude-opus-5-5-high`** | Claude Opus 5.5 (High) | 1,000,000 | 1,000,000 | **128,000** | ✅ High 档 | 按 Anthropic 家族费率估算 | **Opus 5.5 旗舰推理，支持 Function Calling `id` 透传** |
| **`claude-opus-5-5-medium`** | Claude Opus 5.5 (Medium) | 1,000,000 | 1,000,000 | **128,000** | ✅ Medium 档 | 按 Anthropic 家族费率估算 | Opus 5.5 中度推理 |
| **`claude-opus-5-5-low`** | Claude Opus 5.5 (Low) | 1,000,000 | 1,000,000 | **128,000** | ✅ Low 档 | 按 Anthropic 家族费率估算 | Opus 5.5 轻量任务 |
| **`gpt-oss-120b-medium`** | GPT-OSS 120B (Medium) | 80K | 131,072 | **32,768** | ✅ 8,192 内部预算 | $0.50 / $2.00 / $0.10 | **开源大模型，插件自动剥离 thinkingConfig 避免 400** |

---

## 🔄 智能模型别名映射表 (Model Aliases Matrix)

在 DSH 配置文件或对话中直接使用常用简写，插件内部会自动映射到权威上游端点：

| 用户输入或别名 | 自动重定向至真实模型 ID | 说明 |
| :--- | :--- | :--- |
| `gemini-3.8`, `gemini-3.8-flash`, `gemini-3.8-flash-thinking` | **`gemini-3.8-flash-high`** | 统一升级至 3.8 动态全量思考旗舰 |
| `gemini-3.7`, `gemini-3.7-flash`, `gemini-3.7-flash-thinking` | **`gemini-3.7-flash-high`** | 统一映射至 3.7 动态全量思考版 |
| `gemini-3.6`, `gemini-3.6-flash` | **`gemini-3.6-flash-high`** | 3.6 默认高性能档位 |
| `gemini-3.5`, `gemini-3.5-flash` | **`gemini-3.5-flash-lite`** | 3.5 1M 长文本低开销版本 |
| `gemini-3`, `gemini-3.0-flash` | **`gemini-3-flash`** | 3.0 代通用基准 |
| `gemini-3-pro`, `gemini-3.1-pro`, `gemini-3.1-pro-high`, `gemini-3.1-pro-low` | **`gemini-pro-agent`** | 自动收敛至 Google Pro Agent 服务 |
| `gemini-2.5` | **`gemini-2.5-flash`** | 经典 2.5 Flash 基准 |
| `claude-sonnet`, `claude-sonnet-4-6`, `claude-sonnet-4-5`, `claude-3-5-sonnet`, `claude-3.5-sonnet`, `claude-3-7-sonnet`, `claude-3.7-sonnet`, `sonnet` | **`claude-sonnet-5-5-high`** | 自动收敛至 Claude Sonnet 5.5 High |
| `claude-opus`, `claude-opus-4-6-thinking`, `claude-opus-4-5`, `claude-3-opus`, `claude-3-5-opus`, `opus` | **`claude-opus-5-5-high`** | 自动收敛至 Claude Opus 5.5 High |
| `claude-haiku`, `claude-3-haiku`, `claude-3.5-haiku` | **`claude-sonnet-5-5-low`** | Haiku 平滑映射至 Sonnet 5.5 Low |
| `gpt-oss`, `gpt-oss-120b`, `gpt-120b` | **`gpt-oss-120b-medium`** | 自动映射至 GPT-OSS 120B |

---

## ✨ 核心工程亮点

### 1. ⚡ 5 小时 & 周度双窗口实时额度监控看板
- 基于 Google Cloud Code `v1internal:retrieveUserQuotaSummary` 与 `fetchAvailableModels` 实时查询；
- **双窗口限额监控**：精确掌握 5 小时滑动窗口（`5h`）与周额度（`weekly`）剩余百分比与重置时间；
- **状态三色告警**：🟢 充足（>30%）、🟡 预警（10% ~ 30%）、🔴 告急（<10%）；
- **官方 1:1 价值估算**：结合 Google AI Pro 权威价值模型，实时估算当前周期的实际使用价值与剩余价值。

### 2. 📊 前缀缓存（Prefix Cache）深度优化（~97% 命中率）
- 自动捕获流式 `usageMetadata`，本地持久化保存（`~/.dsh/antigravity_usage.db` 与 `json`）；
- 稳定维持请求上下文的 `thoughtSignature` 与前缀结构，**前缀缓存命中率高达 95% ~ 98%**；
- 缓存读取价格低至 **$0.075 / 1M**，大幅降低 Token 消耗并使多轮对话首字延迟（TTFT）缩短至毫秒级。

### 3. 🎥 原生全模态媒体解析工具链
集成专为大模型设计的高性能多模态本地文件直读工具，无需繁琐的三方依赖：
- **`read_video`**：读取并分析本地视频文件波形与时间轴（MP4, MOV, WebM, MKV, AVI, OGG，上限 300MB）；
- **`read_audio`**：直接读取本地音频文件（MP3, WAV, M4A, FLAC, Opus, AAC，上限 100MB），分析语音、声调、说话人与背景音乐；
- **`read_pdf`**：原生解析本地 PDF 文档排版、表格、Jupyter Notebook 与 CSV（上限 100MB）。

### 4. 🛡️ 第三方模型规整与多轮工具调用透传
- **实时规格跟随**：上下文窗口与输出上限直接采用 `fetchAvailableModels` 实时广播的硬边界（如 Claude 5.5：1M 上下文 / 128K 输出），新模型世代零代码自动适配；
- **Token 智能限幅**：无实时规格时按家族回退（Claude `64000`、GPT-OSS `32768`），彻底避免上游 `400 INVALID_ARGUMENT`；
- **思考参数剥离**：针对不支持思考链参数的第三方模型，智能过滤 `thinkingConfig`；
- **工具调用 ID 透传**：完整中继 `functionCall.id` 与 `functionResponse.id`，保障复杂 Agent 场景下多轮工具调用的上下文连续性。

### 5. 🌐 全球网络代理无缝支持
- 支持通过 `HTTP_PROXY`, `HTTPS_PROXY`, `ALL_PROXY` 或插件配置设置代理；
- 深度兼容 HTTP、HTTPS 及 **SOCKS5** 代理（含认证），使用轻量级 `undici.ProxyAgent` 实现高并发流式中继。

---

## 🚀 快速安装与配置

### 1. 复制插件到 DSH 目录
```bash
# 创建插件目录（以 desktop profile 为例，web profile 同理）
mkdir -p ~/.dsh/profiles/desktop/plugins ~/.dsh/profiles/desktop/node_modules

# 复制本仓库四大插件
cp -r dsh-llm-antigravity dsh-web-search-antigravity dsh-web-search-selector dsh-image-gen-antigravity ~/.dsh/profiles/desktop/plugins/
cp -r dsh-llm-antigravity dsh-web-search-antigravity dsh-web-search-selector dsh-image-gen-antigravity ~/.dsh/profiles/desktop/node_modules/
```

### 2. 配置 Cordis Patch (`cordis.patch.yml`)
在 `~/.dsh/profiles/desktop/cordis.patch.yml` 中激活插件：
```yaml
plugins:
  dsh-llm-antigravity:
    enable1MMode: false
    quotaSyncEnabled: true
  dsh-web-search-antigravity: {}
  dsh-web-search-selector: {}
  dsh-image-gen-antigravity: {}
```

### 3. 配置 OAuth Refresh Token
在 `~/.dsh/.credentials.yaml` 中配置您的凭据：
```yaml
ANTIGRAVITY_REFRESH_TOKEN: "1//06qMc415ztYQNCgYI..."
```

### 4. 执行深度解禁补丁（推荐）
运行套件内置的解禁脚本，彻底解除 WebUI 模型设置、远程访问限制、多模态 Composer 附件类型限制及凭据权限严格检查：
```bash
node unlock-dsh.mjs
```

### 5. 启动 DeepSeek Harness
```bash
dsh desktop
# 或启动 WebUI
dsh web
```

---

## 📄 深度技术文档

如需深入了解 Google Cloud Code `v1internal` 接口协议、SSE 流式解析、多模态 Base64 传输格式与二进制 Magic Bytes 容器嗅探细节，请参考：
👉 [**Antigravity API 深度调用规范文档 (ANTIGRAVITY_API_DOCS.md)**](ANTIGRAVITY_API_DOCS.md)

---

## 📜 开源协议

本项目基于 [MIT License](LICENSE) 协议开源。
