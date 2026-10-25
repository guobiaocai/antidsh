(function() {
	const NS = "web-search-antigravity";

	const en = {
		title: "Google Antigravity Web Search",
		description: "Configure Google Cloud Code web search, direct link un-redirection, title retrieval, and content filtering.",
		statusConfigured: "Configured",
		statusUnsaved: "Unsaved",
		overridden: "Overridden",
		reset: "Reset to default",
		save: "Save",
		saving: "Saving…",
		discard: "Discard",
		readOnly: "Settings are read-only.",

		sectionFiltering: "Content & Filtering",
		includeContentLabel: "Include Model Summary (content)",
		includeContentHint: "Turn OFF for Link-Only mode (recommended). Low-quality background summaries can mislead agent reasoning.",
		includeSnippetsLabel: "Include Snippets (snippet)",
		includeSnippetsHint: "Whether to return text preview snippets in sources. Kept OFF by default to save tokens and mirror DeepSeek official style.",

		sectionRedirects: "Direct Links & Titles",
		resolveRedirectsLabel: "Resolve Google Redirects to Direct URLs",
		resolveRedirectsHint: "Automatically resolve Google Grounding redirects into real target destination URLs (recommended ON).",
		fetchPageTitlesLabel: "Fetch Real Web Page Titles",
		fetchPageTitlesHint: "Concurrently fetch actual <title> of direct URLs to replace bare domains (recommended ON).",
		dropUnresolvedLabel: "Drop Unresolved Redirects",
		dropUnresolvedHint: "Discard search results if their redirect resolution times out or fails (default OFF).",

		sectionAdvanced: "Advanced & Timeouts",
		redirectTimeoutLabel: "Redirect Timeout (ms)",
		redirectTimeoutHint: "Maximum wait time for resolving a single redirect (default: 3000ms).",
		pageTitleTimeoutLabel: "Page Title Timeout (ms)",
		pageTitleTimeoutHint: "Maximum wait time for fetching a single page title (default: 2500ms).",
		modelLabel: "Search Execution Model",
		modelHint: "Model used for Google Cloud Code search tool execution (default: gemini-3.7-flash-high)."
	};

	const zh = {
		title: "Google Antigravity 网页搜索",
		description: "配置 Google Cloud Code 网页搜索、直链解析、标题抓取与内容过滤选项。",
		statusConfigured: "已配置",
		statusUnsaved: "未保存",
		overridden: "已覆盖",
		reset: "恢复默认",
		save: "保存",
		saving: "保存中…",
		discard: "放弃修改",
		readOnly: "本部署的设置为只读。",

		sectionFiltering: "内容展示与过滤",
		includeContentLabel: "包含模型总结内容 (content)",
		includeContentHint: "关闭时为「仅来源直链模式」（推荐）。默认由底层模型生成的总结质量较差易误导主模型，建议关闭。",
		includeSnippetsLabel: "包含正文摘要片段 (snippet)",
		includeSnippetsHint: "是否在来源列表中返回正文预览小片段。默认关闭以减少 token 占用并贴合 DeepSeek 官方搜索风格。",

		sectionRedirects: "直链与真实标题解析",
		resolveRedirectsLabel: "解析 Google 跳转为原始直链",
		resolveRedirectsHint: "自动将 Google Grounding 重定向二次跳转转换为真实目标网页 URL（推荐开启）。",
		fetchPageTitlesLabel: "自动抓取并替换网页真实标题",
		fetchPageTitlesHint: "直链解析后异步并发抓取目标页面原生 <title> 替换域名，提供清晰可读标题（推荐开启）。",
		dropUnresolvedLabel: "丢弃无法解析直链的结果",
		dropUnresolvedHint: "若目标网页重定向超时或解析失败，自动过滤丢弃该条结果（默认关闭）。",

		sectionAdvanced: "高级参数与超时",
		redirectTimeoutLabel: "直链解析超时时间 (毫秒)",
		redirectTimeoutHint: "解析单个重定向链接的最长等待时间（默认 3000ms）。",
		pageTitleTimeoutLabel: "网页标题抓取超时时间 (毫秒)",
		pageTitleTimeoutHint: "拉取单个页面原生标题的最长等待时间（默认 2500ms）。",
		modelLabel: "搜索执行底层模型",
		modelHint: "底层调用 Google Cloud Code 搜索工具的模型标识（默认 gemini-3.7-flash-high）。"
	};

	const factory = (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });

		const react_jsx_runtime = require("react/jsx-runtime");
		const react = require("react");
		const _deepseek_ai_dsh_client_ui_primitives = (() => {
			let prim = {};
			try {
				prim = require("@deepseek-ai/dsh-client-ui-primitives") || {};
			} catch (e) {}
			const FallbackChevron = (props) => (0, react_jsx_runtime.jsx)("svg", {
				width: props?.size || 14,
				height: props?.size || 14,
				viewBox: "0 0 14 14",
				fill: "none",
				xmlns: "http://www.w3.org/2000/svg",
				children: (0, react_jsx_runtime.jsx)("path", {
					d: "M3.5 5.25L7 8.75L10.5 5.25",
					stroke: "currentColor",
					strokeWidth: "1.5",
					strokeLinecap: "round",
					strokeLinejoin: "round"
				})
			});
			const ChevronComp = prim.IconChevronDownOutlineRegular || prim.IconChevronDownOutlineMedium || prim.IconChevronDownOutline14 || FallbackChevron;
			return {
				...prim,
				IconChevronDownOutline14: ChevronComp,
				IconChevronDownOutlineRegular: prim.IconChevronDownOutlineRegular || ChevronComp,
				IconChevronDownOutlineMedium: prim.IconChevronDownOutlineMedium || ChevronComp
			};
		})();
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

		function SwitchRow(props) {
			const { label, hint, checked, disabled, onChange } = props;
			return (0, react_jsx_runtime.jsxs)("div", {
				style: {
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					padding: "10px 0",
					borderBottom: "1px solid var(--dsw-alias-border-l3, #f3f4f6)"
				},
				children: [
					(0, react_jsx_runtime.jsxs)("div", {
						style: { flex: 1, paddingRight: 16 },
						children: [
							(0, react_jsx_runtime.jsx)("div", {
								style: { fontSize: 13, fontWeight: 500, color: "var(--dsw-alias-label-primary, #111827)" },
								children: label
							}),
							(0, react_jsx_runtime.jsx)("div", {
								style: { fontSize: 12, color: "var(--dsw-alias-label-tertiary, #9ca3af)", marginTop: 2, lineHeight: 1.4 },
								children: hint
							})
						]
					}),
					(0, react_jsx_runtime.jsx)("button", {
						type: "button",
						role: "switch",
						"aria-checked": checked,
						disabled: disabled,
						onClick: () => onChange(!checked),
						style: {
							position: "relative",
							width: 42,
							height: 24,
							borderRadius: 12,
							background: checked ? "var(--dsw-alias-brand-primary, #0284c7)" : "var(--dsw-alias-border-l2, #d1d5db)",
							border: "none",
							cursor: disabled ? "not-allowed" : "pointer",
							transition: "background 0.2s",
							flexShrink: 0
						},
						children: (0, react_jsx_runtime.jsx)("span", {
							style: {
								position: "absolute",
								top: 2,
								left: checked ? 20 : 2,
								width: 20,
								height: 20,
								borderRadius: "50%",
								background: "#ffffff",
								boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
								transition: "left 0.2s"
							}
						})
					})
				]
			});
		}

		function AntigravityWebSearchCard(props) {
			const [open, setOpen] = react.useState(props.isSection || false);
			const { t } = props;
			const state = props.useAntigravityWebSearchCard((snapshot) => snapshot);
			const disabled = !state.writable;

			const currentIncludeContent = state.draftIncludeContent ?? state.effectiveIncludeContent ?? false;
			const currentIncludeSnippets = state.draftIncludeSnippets ?? state.effectiveIncludeSnippets ?? false;
			const currentResolveRedirects = state.draftResolveRedirects ?? state.effectiveResolveRedirects ?? true;
			const currentFetchPageTitles = state.draftFetchPageTitles ?? state.effectiveFetchPageTitles ?? true;
			const currentDropUnresolved = state.draftDropUnresolved ?? state.effectiveDropUnresolved ?? false;
			const currentRedirectTimeout = state.draftRedirectTimeout ?? state.effectiveRedirectTimeout ?? 3000;
			const currentPageTitleTimeout = state.draftPageTitleTimeout ?? state.effectivePageTitleTimeout ?? 2500;
			const currentModel = state.draftModel ?? state.effectiveModel ?? "gemini-3.7-flash-high";

			const dirty = (state.draftIncludeContent !== void 0 && state.draftIncludeContent !== state.effectiveIncludeContent) ||
			              (state.draftIncludeSnippets !== void 0 && state.draftIncludeSnippets !== state.effectiveIncludeSnippets) ||
			              (state.draftResolveRedirects !== void 0 && state.draftResolveRedirects !== state.effectiveResolveRedirects) ||
			              (state.draftFetchPageTitles !== void 0 && state.draftFetchPageTitles !== state.effectiveFetchPageTitles) ||
			              (state.draftDropUnresolved !== void 0 && state.draftDropUnresolved !== state.effectiveDropUnresolved) ||
			              (state.draftRedirectTimeout !== void 0 && state.draftRedirectTimeout !== state.effectiveRedirectTimeout) ||
			              (state.draftPageTitleTimeout !== void 0 && state.draftPageTitleTimeout !== state.effectivePageTitleTimeout) ||
			              (state.draftModel !== void 0 && state.draftModel !== state.effectiveModel);

			return (0, react_jsx_runtime.jsxs)(props.isSection ? "div" : "li", {
				style: {
					borderRadius: 16,
					border: "0.5px solid " + (open ? "var(--dsw-alias-label-dimmed, #d1d5db)" : "var(--dsw-alias-border-l4, #e5e7eb)"),
					background: open ? "var(--dsw-alias-bg-layer-2, #ffffff)" : "var(--dsw-alias-bg-layer-3, #ffffff)",
					marginBottom: 16,
					overflow: "hidden",
					listStyle: "none",
					transition: "border-color 0.16s, background 0.16s"
				},
				children: [
					(0, react_jsx_runtime.jsxs)("button", {
						type: "button",
						style: {
							display: "flex",
							alignItems: "center",
							justifyContent: "space-between",
							width: "100%",
							padding: "16px 20px",
							background: "none",
							border: "none",
							cursor: "pointer",
							textAlign: "left"
						},
						onClick: () => setOpen(!open),
						children: [
							(0, react_jsx_runtime.jsxs)("div", {
								children: [
									(0, react_jsx_runtime.jsxs)("div", {
										style: { display: "flex", alignItems: "center", gap: 8 },
										children: [
											(0, react_jsx_runtime.jsx)("span", {
												style: { fontSize: 14, fontWeight: 600, color: "var(--dsw-alias-label-primary, #111827)" },
												children: t("title")
											}),
											(0, react_jsx_runtime.jsx)("span", {
												style: {
													fontSize: 11,
													padding: "1px 8px",
													borderRadius: 999,
													background: "var(--dsw-alias-bg-module-platform, #f3f4f6)",
													color: "var(--dsw-alias-label-secondary, #6b7280)",
													fontWeight: 500
												},
												children: t("statusConfigured")
											})
										]
									}),
									(0, react_jsx_runtime.jsx)("div", {
										style: { fontSize: 12, color: "var(--dsw-alias-label-secondary, #6b7280)", marginTop: 4 },
										children: t("description")
									})
								]
							}),
							(0, react_jsx_runtime.jsxs)("div", {
								style: { display: "flex", alignItems: "center", gap: 8 },
								children: [
									dirty ? (0, react_jsx_runtime.jsx)("span", {
										style: { fontSize: 11, padding: "2px 8px", borderRadius: 999, background: "var(--dsw-alias-brand-subtle, #e0f2fe)", color: "var(--dsw-alias-brand-primary, #0284c7)" },
										children: t("statusUnsaved")
									}) : null,
									(0, react_jsx_runtime.jsx)("span", {
										style: {
											display: "inline-flex",
											alignItems: "center",
											justifyContent: "center",
											color: "var(--dsw-alias-label-tertiary, #9ca3af)",
											transform: open ? "rotate(180deg)" : "rotate(0deg)",
											transition: "transform 0.16s ease",
											flexShrink: 0
										},
										children: (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconChevronDownOutline14, { size: 14 })
									})
								]
							})
						]
					}),
					open ? (0, react_jsx_runtime.jsxs)("div", {
						style: { padding: "0 20px 20px 20px", borderTop: "1px solid var(--dsw-alias-border-l3, #f3f4f6)" },
						children: [
							// Header with Override / Reset indicator
							state.isOverridden ? (0, react_jsx_runtime.jsxs)("div", {
								style: { display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 8, paddingTop: 12 },
								children: [
									(0, react_jsx_runtime.jsx)("span", {
										style: { fontSize: 11, padding: "1px 6px", borderRadius: 999, background: "var(--dsw-alias-bg-module-platform, #f3f4f6)", color: "var(--dsw-alias-label-secondary, #6b7280)" },
										children: t("overridden")
									}),
									(0, react_jsx_runtime.jsx)("button", {
										type: "button",
										style: { fontSize: 12, color: "var(--dsw-alias-brand-primary, #0284c7)", background: "none", border: "none", cursor: "pointer" },
										onClick: props.reset,
										children: t("reset")
									})
								]
							}) : null,

							// Section 1: Content & Filtering
							(0, react_jsx_runtime.jsx)("div", {
								style: { fontSize: 12, fontWeight: 600, color: "var(--dsw-alias-label-secondary, #6b7280)", textTransform: "uppercase", letterSpacing: "0.05em", marginTop: 14, marginBottom: 4 },
								children: t("sectionFiltering")
							}),
							(0, react_jsx_runtime.jsx)(SwitchRow, {
								label: t("includeContentLabel"),
								hint: t("includeContentHint"),
								checked: currentIncludeContent,
								disabled,
								onChange: (v) => props.setField("includeContent", v)
							}),
							(0, react_jsx_runtime.jsx)(SwitchRow, {
								label: t("includeSnippetsLabel"),
								hint: t("includeSnippetsHint"),
								checked: currentIncludeSnippets,
								disabled,
								onChange: (v) => props.setField("includeSnippets", v)
							}),

							// Section 2: Direct Links & Titles
							(0, react_jsx_runtime.jsx)("div", {
								style: { fontSize: 12, fontWeight: 600, color: "var(--dsw-alias-label-secondary, #6b7280)", textTransform: "uppercase", letterSpacing: "0.05em", marginTop: 16, marginBottom: 4 },
								children: t("sectionRedirects")
							}),
							(0, react_jsx_runtime.jsx)(SwitchRow, {
								label: t("resolveRedirectsLabel"),
								hint: t("resolveRedirectsHint"),
								checked: currentResolveRedirects,
								disabled,
								onChange: (v) => props.setField("resolveRedirects", v)
							}),
							(0, react_jsx_runtime.jsx)(SwitchRow, {
								label: t("fetchPageTitlesLabel"),
								hint: t("fetchPageTitlesHint"),
								checked: currentFetchPageTitles,
								disabled,
								onChange: (v) => props.setField("fetchPageTitles", v)
							}),
							(0, react_jsx_runtime.jsx)(SwitchRow, {
								label: t("dropUnresolvedLabel"),
								hint: t("dropUnresolvedHint"),
								checked: currentDropUnresolved,
								disabled,
								onChange: (v) => props.setField("dropUnresolvedRedirects", v)
							}),

							// Section 3: Advanced & Timeouts
							(0, react_jsx_runtime.jsx)("div", {
								style: { fontSize: 12, fontWeight: 600, color: "var(--dsw-alias-label-secondary, #6b7280)", textTransform: "uppercase", letterSpacing: "0.05em", marginTop: 16, marginBottom: 4 },
								children: t("sectionAdvanced")
							}),
							(0, react_jsx_runtime.jsxs)("div", {
								style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 8 },
								children: [
									// Redirect Timeout
									(0, react_jsx_runtime.jsxs)("div", {
										style: { display: "flex", flexDirection: "column", gap: 4 },
										children: [
											(0, react_jsx_runtime.jsx)("label", {
												style: { fontSize: 13, fontWeight: 500, color: "var(--dsw-alias-label-primary, #111827)" },
												children: t("redirectTimeoutLabel")
											}),
											(0, react_jsx_runtime.jsx)("input", {
												type: "number",
												style: {
													height: 36,
													borderRadius: 8,
													border: "1px solid var(--dsw-alias-border-l2, #d1d5db)",
													background: "var(--dsw-alias-bg-layer-3, #ffffff)",
													padding: "0 12px",
													fontSize: 13,
													color: "var(--dsw-alias-label-primary, #111827)"
												},
												value: currentRedirectTimeout,
												disabled,
												onChange: (e) => props.setField("redirectTimeoutMs", Number(e.target.value))
											}),
											(0, react_jsx_runtime.jsx)("p", {
												style: { fontSize: 11, color: "var(--dsw-alias-label-tertiary, #9ca3af)", margin: 0 },
												children: t("redirectTimeoutHint")
											})
										]
									}),

									// Page Title Timeout
									(0, react_jsx_runtime.jsxs)("div", {
										style: { display: "flex", flexDirection: "column", gap: 4 },
										children: [
											(0, react_jsx_runtime.jsx)("label", {
												style: { fontSize: 13, fontWeight: 500, color: "var(--dsw-alias-label-primary, #111827)" },
												children: t("pageTitleTimeoutLabel")
											}),
											(0, react_jsx_runtime.jsx)("input", {
												type: "number",
												style: {
													height: 36,
													borderRadius: 8,
													border: "1px solid var(--dsw-alias-border-l2, #d1d5db)",
													background: "var(--dsw-alias-bg-layer-3, #ffffff)",
													padding: "0 12px",
													fontSize: 13,
													color: "var(--dsw-alias-label-primary, #111827)"
												},
												value: currentPageTitleTimeout,
												disabled,
												onChange: (e) => props.setField("pageTitleTimeoutMs", Number(e.target.value))
											}),
											(0, react_jsx_runtime.jsx)("p", {
												style: { fontSize: 11, color: "var(--dsw-alias-label-tertiary, #9ca3af)", margin: 0 },
												children: t("pageTitleTimeoutHint")
											})
										]
									})
								]
							}),

							// Model Input
							(0, react_jsx_runtime.jsxs)("div", {
								style: { display: "flex", flexDirection: "column", gap: 4, marginTop: 12 },
								children: [
									(0, react_jsx_runtime.jsx)("label", {
										style: { fontSize: 13, fontWeight: 500, color: "var(--dsw-alias-label-primary, #111827)" },
										children: t("modelLabel")
									}),
									(0, react_jsx_runtime.jsx)("input", {
										type: "text",
										style: {
											height: 36,
											borderRadius: 8,
											border: "1px solid var(--dsw-alias-border-l2, #d1d5db)",
											background: "var(--dsw-alias-bg-layer-3, #ffffff)",
											padding: "0 12px",
											fontSize: 13,
											color: "var(--dsw-alias-label-primary, #111827)"
										},
										value: currentModel,
										disabled,
										onChange: (e) => props.setField("model", e.target.value)
									}),
									(0, react_jsx_runtime.jsx)("p", {
										style: { fontSize: 11, color: "var(--dsw-alias-label-tertiary, #9ca3af)", margin: 0 },
										children: t("modelHint")
									})
								]
							}),

							// Actions Footer
							(0, react_jsx_runtime.jsxs)("div", {
								style: { display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 20 },
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
					}) : null
				]
			});
		}

		class AntigravityWebSearchController {
			constructor(scope) {
				this.scope = scope;
				this.draft = {};
				this.saving = false;
				this.store = (0, _deepseek_ai_dsh_client_runtime_client.createSnapshotStore)(this.projection());
				scope.subscribe(() => {
					this.store.set(this.projection());
				});
			}

			projection() {
				const snapshot = this.scope.getSnapshot();
				const effective = snapshot.value ?? {};
				return {
					writable: snapshot.writable,
					effectiveIncludeContent: effective.includeContent ?? false,
					effectiveIncludeSnippets: effective.includeSnippets ?? false,
					effectiveResolveRedirects: effective.resolveRedirects ?? true,
					effectiveFetchPageTitles: effective.fetchPageTitles ?? true,
					effectiveDropUnresolved: effective.dropUnresolvedRedirects ?? false,
					effectiveRedirectTimeout: effective.redirectTimeoutMs ?? 3000,
					effectivePageTitleTimeout: effective.pageTitleTimeoutMs ?? 2500,
					effectiveModel: effective.model ?? "gemini-3.7-flash-high",

					draftIncludeContent: this.draft.includeContent,
					draftIncludeSnippets: this.draft.includeSnippets,
					draftResolveRedirects: this.draft.resolveRedirects,
					draftFetchPageTitles: this.draft.fetchPageTitles,
					draftDropUnresolved: this.draft.dropUnresolvedRedirects,
					draftRedirectTimeout: this.draft.redirectTimeoutMs,
					draftPageTitleTimeout: this.draft.pageTitleTimeoutMs,
					draftModel: this.draft.model,

					isOverridden: Boolean(snapshot.user && Object.keys(snapshot.user).length > 0),
					saving: this.saving
				};
			}

			setField(field, val) {
				this.draft[field] = val;
				this.store.set(this.projection());
			}

			discard() {
				this.draft = {};
				this.store.set(this.projection());
			}

			async reset() {
				this.draft = {};
				try {
					await this.scope.mutate([
						{ op: "unset", path: ["includeContent"] },
						{ op: "unset", path: ["includeSnippets"] },
						{ op: "unset", path: ["resolveRedirects"] },
						{ op: "unset", path: ["fetchPageTitles"] },
						{ op: "unset", path: ["dropUnresolvedRedirects"] },
						{ op: "unset", path: ["redirectTimeoutMs"] },
						{ op: "unset", path: ["pageTitleTimeoutMs"] },
						{ op: "unset", path: ["model"] }
					]);
				} catch (e) {
					console.error("web-search-antigravity: reset failed", e);
				}
				this.store.set(this.projection());
			}

			async save() {
				if (Object.keys(this.draft).length === 0) return;
				this.saving = true;
				this.store.set(this.projection());
				try {
					const ops = [];
					for (const [key, val] of Object.entries(this.draft)) {
						if (val !== void 0) {
							ops.push({ op: "set", path: [key], value: val });
						}
					}
					await this.scope.mutate(ops);
					this.draft = {};
				} catch (e) {
					console.error("web-search-antigravity: save failed", e);
				} finally {
					this.saving = false;
					this.store.set(this.projection());
				}
			}

			inject() {
				return {
					hooks: { antigravityWebSearchCard: this.store },
					setField: (field, val) => this.setField(field, val),
					save: () => this.save(),
					discard: () => this.discard(),
					reset: () => this.reset()
				};
			}
		}

		const inject = ["slots", "locale", "configForms"];

		function AntigravityWebSearchPluginItem(props) {
			if (props.view === "summary") {
				const desc = typeof props.t === "function" ? props.t("description") : null;
				return desc || "基于 Antigravity 账号聚合池的 Google 搜索服务插件。";
			}
			return (0, react_jsx_runtime.jsx)(AntigravityWebSearchCard, { ...props, isSection: true });
		}

		function apply(ctx) {
			const t = ctx.locale.bind(NS);
			ctx.effect(() => ctx.locale.register(NS, { zh, en }), "web-search-antigravity: locales");

			const controller = new AntigravityWebSearchController(
				(ctx.configForms ? ctx.configForms.get(NS) : ctx.settingsScope?.bind({ namespace: NS }))
			);

			ctx.slots.inject("settings.plugin.item", function* () {
				yield ctx.slots.register({
					name: "settings.plugin.item",
					key: NS,
					locale: NS,
					inject: () => ({ ...controller.inject(), t })
				}, AntigravityWebSearchCard);
			});

			ctx.slots.inject("plugins.bundle.config", () => ctx.slots.register({
				name: "plugins.bundle.config",
				key: "dsh-web-search-antigravity",
				locale: NS,
				inject: () => ({ ...controller.inject(), t })
			}, AntigravityWebSearchPluginItem));

			ctx.slots.inject("plugins.row.config", () => ctx.slots.register({
				name: "plugins.row.config",
				key: "dsh-web-search-antigravity#web-search-antigravity",
				locale: NS,
				inject: () => ({ ...controller.inject(), t })
			}, AntigravityWebSearchPluginItem));

			// DSH 0.2.x: the Plugins page's "内置插件配置" section reads the
			// `plugins.item` slot; register the card while the Host serves the
			// `web-search-antigravity` config namespace (i.e. the plugin is live).
			const registerWebSearchItem = () => ctx.slots.register({
				name: "plugins.item",
				id: "antigravity-search",
				order: 51,
				label: () => t("title"),
				locale: NS,
				inject: () => ({ ...controller.inject(), t })
			}, AntigravityWebSearchPluginItem);
			if (ctx.configForms && typeof ctx.configForms.whileServed === "function") {
				ctx.effect(() => ctx.configForms.whileServed([NS], () => ctx.slots.inject("plugins.item", () => registerWebSearchItem())), "web-search-antigravity: item page");
			} else {
				ctx.slots.inject("plugins.item", () => registerWebSearchItem());
			}
		}

		exports.apply = apply;
		exports.inject = inject;
		return module.exports;
	};

	if (typeof window !== "undefined" && window.__ModuleLoader__) {
    window.__ModuleLoader__.load({ id: "dsh-web-search-antigravity", factory });
  }
})();
