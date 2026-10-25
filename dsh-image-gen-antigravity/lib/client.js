(function() {
	const NS = "image-gen-antigravity";
	const BUNDLE_KEY = "dsh-image-gen-antigravity";
	const ROW_KEY = "dsh-image-gen-antigravity#image-gen-antigravity";
	const DEFAULT_BASE_URL = "https://daily-cloudcode-pa.googleapis.com/v1internal";

	const en = {
		title: "Antigravity Image Generation",
		description: "Gemini 3.1 Flash Image text-to-image tool with multiple aspect ratios, sharing the Antigravity OAuth credentials.",
		refreshTokenEnvLabel: "Credential ref (env name)",
		refreshTokenEnvHint: "The credentials-service reference holding the Antigravity OAuth refresh token.",
		modelLabel: "Image model",
		modelHint: "Upstream image model id (default: gemini-3.1-flash-image).",
		baseURLLabel: "API base URL",
		baseURLHint: "Google Cloud Code v1internal gateway.",
		timeoutMsLabel: "Request timeout (ms)",
		timeoutMsHint: "How long one image generation may run before it is aborted.",
		save: "Save",
		saving: "Saving…",
		discard: "Discard",
		unsaved: "Unsaved",
		saveFailed: "Failed to save image generation settings.",
		readOnly: "Settings are read-only."
	};

	const zh = {
		title: "Antigravity 图像生成",
		description: "基于 Gemini 3.1 Flash Image 的文生图工具，支持多比例生图，与 Antigravity 共享 OAuth 凭据。",
		refreshTokenEnvLabel: "凭据引用（环境变量名）",
		refreshTokenEnvHint: "保存 Antigravity OAuth Refresh Token 的凭据服务引用。",
		modelLabel: "生图模型",
		modelHint: "上游生图模型 ID（默认：gemini-3.1-flash-image）。",
		baseURLLabel: "API 网关地址",
		baseURLHint: "Google Cloud Code v1internal 网关。",
		timeoutMsLabel: "请求超时（毫秒）",
		timeoutMsHint: "单次生图的最长等待时间，超时后中止。",
		save: "保存",
		saving: "保存中…",
		discard: "放弃修改",
		unsaved: "未保存",
		saveFailed: "保存图像生成设置失败，请重试。",
		readOnly: "当前部署的设置为只读。"
	};

	const factory = (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });

		const react_jsx_runtime = require("react/jsx-runtime");
		const react = require("react");
		const _deepseek_ai_dsh_client_runtime_client = (() => {
			try {
				const mod = require("@deepseek-ai/dsh-client-store");
				if (mod && typeof mod.createSnapshotStore === "function") return mod;
			} catch (e) {}
			return {
				createSnapshotStore: (init) => {
					let s = init;
					const subs = new Set();
					return {
						get: () => s,
						getSnapshot: () => s,
						set: (n) => { s = n; subs.forEach((cb) => cb()); },
						subscribe: (cb) => { subs.add(cb); return () => subs.delete(cb); }
					};
				}
			};
		})();

		const FIELDS = [
			{ key: "refreshTokenEnv", label: "refreshTokenEnvLabel", hint: "refreshTokenEnvHint", kind: "text" },
			{ key: "model", label: "modelLabel", hint: "modelHint", kind: "text" },
			{ key: "baseURL", label: "baseURLLabel", hint: "baseURLHint", kind: "text" },
			{ key: "timeoutMs", label: "timeoutMsLabel", hint: "timeoutMsHint", kind: "number" }
		];

		function ImageGenCard(props) {
			const { t } = props;
			const state = props.useImageGenCard((snapshot) => snapshot);
			const disabled = !state.writable;
			const dirty = FIELDS.some((f) => state.drafts[f.key] !== void 0);

			return (0, react_jsx_runtime.jsxs)("div", {
				style: { maxWidth: 640, display: "flex", flexDirection: "column", gap: 14 },
				children: [
					...FIELDS.map((f) => {
					const draft = state.drafts[f.key];
					const value = draft !== void 0 ? draft : (state.effective[f.key] ?? "");
					return (0, react_jsx_runtime.jsxs)("div", {
						style: { display: "flex", flexDirection: "column", gap: 4 },
						children: [
							(0, react_jsx_runtime.jsx)("label", {
								style: { fontSize: 13, fontWeight: 500, color: "var(--dsw-alias-label-primary, #111827)" },
								children: t(f.label)
							}),
							(0, react_jsx_runtime.jsx)("input", {
								type: f.kind === "number" ? "number" : "text",
								value,
								disabled,
								onChange: (e) => props.setDraft(f.key, e.target.value),
								style: {
									height: 34,
									borderRadius: 8,
									border: "1px solid var(--dsw-alias-border-l2, #d1d5db)",
									background: "var(--dsw-alias-bg-layer-3, #ffffff)",
									padding: "0 10px",
									fontSize: 13,
									color: "var(--dsw-alias-label-primary, #111827)"
								}
							}),
							(0, react_jsx_runtime.jsx)("p", {
								style: { fontSize: 12, color: "var(--dsw-alias-label-tertiary, #9ca3af)", margin: 0 },
								children: t(f.hint)
							})
						]
					});
				}),
				(0, react_jsx_runtime.jsxs)("div", {
					style: { display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 4 },
					children: [
						dirty ? (0, react_jsx_runtime.jsx)("button", {
							type: "button",
							style: {
								padding: "6px 14px",
								borderRadius: 6,
								border: "1px solid var(--dsw-alias-border-l2, #d1d5db)",
								background: "none",
								fontSize: 12,
								cursor: "pointer",
								color: "var(--dsw-alias-label-secondary, #4b5563)"
							},
							onClick: props.discard,
							children: t("discard")
						}) : null,
						(0, react_jsx_runtime.jsx)("button", {
							type: "button",
							style: {
								padding: "6px 14px",
								borderRadius: 6,
								border: "none",
								background: "var(--dsw-alias-brand-primary, #0284c7)",
								color: "#ffffff",
								fontSize: 12,
								fontWeight: 500,
								cursor: dirty ? "pointer" : "default",
								opacity: dirty ? 1 : 0.5
							},
							disabled: !dirty || disabled || state.saving,
							onClick: props.save,
							children: t(state.saving ? "saving" : "save")
						})
					]
				})
				]
			});
		}

		class ImageGenController {
			constructor(scope) {
				this.scope = scope;
				this.drafts = {};
				this.saving = false;
				this.store = (0, _deepseek_ai_dsh_client_runtime_client.createSnapshotStore)(this.projection());
				scope.subscribe(() => {
					this.store.set(this.projection());
				});
			}

			projection() {
				const snapshot = this.scope.getSnapshot();
				const effective = {
					refreshTokenEnv: snapshot.value?.refreshTokenEnv ?? "ANTIGRAVITY_REFRESH_TOKEN",
					model: snapshot.value?.model ?? "gemini-3.1-flash-image",
					baseURL: snapshot.value?.baseURL ?? DEFAULT_BASE_URL,
					timeoutMs: snapshot.value?.timeoutMs ?? 120000
				};
				return {
					writable: snapshot.writable,
					effective,
					drafts: this.drafts,
					saving: this.saving
				};
			}

			setDraft(key, val) {
				if (val === "" || val === void 0) delete this.drafts[key];
				else this.drafts[key] = val;
				this.store.set(this.projection());
			}

			discard() {
				this.drafts = {};
				this.store.set(this.projection());
			}

			async save() {
				const entries = Object.entries(this.drafts);
				if (entries.length === 0) return;
				this.saving = true;
				this.store.set(this.projection());
				try {
					for (const [key, raw] of entries) {
						const field = FIELDS.find((f) => f.key === key);
						if (field === void 0) continue;
						if (String(raw).trim() === "") {
							await this.scope.unset(key);
							continue;
						}
						const value = field.kind === "number" ? Number(raw) : String(raw);
						if (field.kind === "number" && !Number.isFinite(value)) continue;
						await this.scope.set(key, value);
					}
					this.drafts = {};
				} catch (e) {
					console.error("image-gen-antigravity: save failed", e);
				} finally {
					this.saving = false;
					this.store.set(this.projection());
				}
			}

			inject() {
				return {
					hooks: { imageGenCard: this.store },
					setDraft: (key, val) => this.setDraft(key, val),
					save: () => this.save(),
					discard: () => this.discard()
				};
			}
		}

		const inject = ["slots", "locale", "configForms"];

		function ImageGenPluginItem(props) {
			if (props.view === "summary") {
				const desc = typeof props.t === "function" ? props.t("description") : null;
				return desc || "Gemini 3.1 Flash Image 文生图工具。";
			}
			return (0, react_jsx_runtime.jsx)(ImageGenCard, { ...props });
		}

		function apply(ctx) {
			const t = ctx.locale.bind(NS);
			ctx.effect(() => ctx.locale.register(NS, { zh, en }), "image-gen-antigravity: locales");

			const controller = new ImageGenController(
				(ctx.configForms ? ctx.configForms.get(NS) : ctx.settingsScope?.bind({ namespace: NS }))
			);

			ctx.slots.inject("plugins.bundle.config", () => ctx.slots.register({
				name: "plugins.bundle.config",
				key: BUNDLE_KEY,
				locale: NS,
				inject: () => ({ ...controller.inject(), t })
			}, ImageGenPluginItem));

			ctx.slots.inject("plugins.row.config", () => ctx.slots.register({
				name: "plugins.row.config",
				key: ROW_KEY,
				locale: NS,
				inject: () => ({ ...controller.inject(), t })
			}, ImageGenPluginItem));

			// DSH 0.2.x: the Plugins page's "内置插件配置" section reads the
			// `plugins.item` slot; register the card while the Host serves the
			// `image-gen-antigravity` config namespace (i.e. the plugin is live).
			const registerImageGenItem = () => ctx.slots.register({
				name: "plugins.item",
				id: "antigravity-image-gen",
				order: 53,
				label: () => t("title"),
				locale: NS,
				inject: () => ({ ...controller.inject(), t })
			}, ImageGenPluginItem);
			if (ctx.configForms && typeof ctx.configForms.whileServed === "function") {
				ctx.effect(() => ctx.configForms.whileServed([NS], () => ctx.slots.inject("plugins.item", () => registerImageGenItem())), "image-gen-antigravity: item page");
			} else {
				ctx.slots.inject("plugins.item", () => registerImageGenItem());
			}
		}

		exports.apply = apply;
		exports.inject = inject;
		return module.exports;
	};

	if (typeof window !== "undefined" && window.__ModuleLoader__) {
		window.__ModuleLoader__.load({ id: "dsh-image-gen-antigravity", factory });
	}
})();
