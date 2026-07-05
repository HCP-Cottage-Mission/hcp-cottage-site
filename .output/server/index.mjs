globalThis.__nitro_main__ = import.meta.url;
import { a as defineLazyEventHandler, c as serve, i as defineHandler, n as HTTPError, o as toEventHandler, s as NodeResponse, t as H3Core } from "./_libs/h3+rou3+srvx.mjs";
import { i as withoutTrailingSlash, n as joinURL, r as withLeadingSlash, t as decodePath } from "./_libs/ufo.mjs";
import "./_libs/croner.mjs";
import { promises } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
//#region node_modules/nitro/dist/runtime/internal/route-rules.mjs
var headers = ((m) => function headersRouteRule(event) {
	for (const [key, value] of Object.entries(m.options || {})) event.res.headers.set(key, value);
});
//#endregion
//#region #nitro/virtual/public-assets-data
var public_assets_data_default = {
	"/favicon.svg": {
		"type": "image/svg+xml",
		"etag": "\"2532-P1u486agW3ymimJYHS3VvIiBLK8\"",
		"mtime": "2026-07-05T18:15:22.797Z",
		"size": 9522,
		"path": "../public/favicon.svg"
	},
	"/icons.svg": {
		"type": "image/svg+xml",
		"etag": "\"13a7-+Yl6wl4T3p6mAdLxrF2TU9++/No\"",
		"mtime": "2026-07-05T18:15:22.797Z",
		"size": 5031,
		"path": "../public/icons.svg"
	},
	"/assets/Kitchen-glasses-left-refrigerator-Crh2pPuu.jpg": {
		"type": "image/jpeg",
		"etag": "\"186a8-3XaxRZ5ev2v3KYQkErL/4yoWlgA\"",
		"mtime": "2026-07-05T18:15:22.784Z",
		"size": 100008,
		"path": "../public/assets/Kitchen-glasses-left-refrigerator-Crh2pPuu.jpg"
	},
	"/assets/cottage_Livingroom-tv-left-QL_JsjQh.jpg": {
		"type": "image/jpeg",
		"etag": "\"1dcbb-LOccdsZbePMh+wl0L5SFY93jqjQ\"",
		"mtime": "2026-07-05T18:15:22.785Z",
		"size": 122043,
		"path": "../public/assets/cottage_Livingroom-tv-left-QL_JsjQh.jpg"
	},
	"/assets/cottage_closet-DiOBMT4a.jpg": {
		"type": "image/jpeg",
		"etag": "\"1b50c-kVI+BtsZz0RWP+nl0GD1LegMKJY\"",
		"mtime": "2026-07-05T18:15:22.785Z",
		"size": 111884,
		"path": "../public/assets/cottage_closet-DiOBMT4a.jpg"
	},
	"/assets/cottage_cottage_full_kitchen-Bh3Avan5.jpg": {
		"type": "image/jpeg",
		"etag": "\"22d34-WTvWsC3CfkpLB3bd8ti2jNmM7Dc\"",
		"mtime": "2026-07-05T18:15:22.785Z",
		"size": 142644,
		"path": "../public/assets/cottage_cottage_full_kitchen-Bh3Avan5.jpg"
	},
	"/assets/cottage_guestgate_open-Ca7paCYf.jpg": {
		"type": "image/jpeg",
		"etag": "\"335ef-pGEe4B9pF2SAWMcXB8NW0RlIgU8\"",
		"mtime": "2026-07-05T18:15:22.786Z",
		"size": 210415,
		"path": "../public/assets/cottage_guestgate_open-Ca7paCYf.jpg"
	},
	"/assets/cottage_gal_18-4N1DVu_S.jpg": {
		"type": "image/jpeg",
		"etag": "\"42356-zaxU48e5vtXxQQ0Urd07xgCFDtI\"",
		"mtime": "2026-07-05T18:15:22.785Z",
		"size": 271190,
		"path": "../public/assets/cottage_gal_18-4N1DVu_S.jpg"
	},
	"/assets/cottage_gal_40-C_eWpiOr.jpg": {
		"type": "image/jpeg",
		"etag": "\"3cff8-ZsPbyL+fpks9YK43MuUhnhZEYLg\"",
		"mtime": "2026-07-05T18:15:22.785Z",
		"size": 249848,
		"path": "../public/assets/cottage_gal_40-C_eWpiOr.jpg"
	},
	"/assets/cottage_gate_lock_night-CLVo9T91.jpg": {
		"type": "image/jpeg",
		"etag": "\"3cd1f-QR1RU0SWgJWl5bnbCsS4DlDbAvI\"",
		"mtime": "2026-07-05T18:15:22.786Z",
		"size": 249119,
		"path": "../public/assets/cottage_gate_lock_night-CLVo9T91.jpg"
	},
	"/assets/cottage_porch_dinette-Cg7-b1tr.jpg": {
		"type": "image/jpeg",
		"etag": "\"2c096-Un/6zdYDSFtXNRtAHz0LheD+XTI\"",
		"mtime": "2026-07-05T18:15:22.788Z",
		"size": 180374,
		"path": "../public/assets/cottage_porch_dinette-Cg7-b1tr.jpg"
	},
	"/assets/cottage_interior_main-CHr-Utq_.jpg": {
		"type": "image/jpeg",
		"etag": "\"35a3b-OJC2Sp1dEIoX4T+FW12SslV1ucs\"",
		"mtime": "2026-07-05T18:15:22.786Z",
		"size": 219707,
		"path": "../public/assets/cottage_interior_main-CHr-Utq_.jpg"
	},
	"/assets/cottage_kitchen_sink-CVIEvlhJ.jpg": {
		"type": "image/jpeg",
		"etag": "\"25bde-UArDIwbzyBzfztEe1t6lg+jVacE\"",
		"mtime": "2026-07-05T18:15:22.787Z",
		"size": 154590,
		"path": "../public/assets/cottage_kitchen_sink-CVIEvlhJ.jpg"
	},
	"/assets/cottage_kitchen_stove-CvhJe2Td.jpg": {
		"type": "image/jpeg",
		"etag": "\"2c6d3-auhz5X3WLi5ueX9AWVb5piWwIa4\"",
		"mtime": "2026-07-05T18:15:22.788Z",
		"size": 181971,
		"path": "../public/assets/cottage_kitchen_stove-CvhJe2Td.jpg"
	},
	"/assets/cottage_porch_sittingarea-CLx8SM55.jpg": {
		"type": "image/jpeg",
		"etag": "\"29f3f-EbLUSmcDsgE3BopUPpqC9xx2HgQ\"",
		"mtime": "2026-07-05T18:15:22.789Z",
		"size": 171839,
		"path": "../public/assets/cottage_porch_sittingarea-CLx8SM55.jpg"
	},
	"/assets/cottage_porch_lights-CWGG_mOm.jpg": {
		"type": "image/jpeg",
		"etag": "\"2c92a-9Rwrm25QGqoB04+APk5+czG6fbM\"",
		"mtime": "2026-07-05T18:15:22.789Z",
		"size": 182570,
		"path": "../public/assets/cottage_porch_lights-CWGG_mOm.jpg"
	},
	"/assets/cottage_walkway_night_1-B1qCacEJ.jpg": {
		"type": "image/jpeg",
		"etag": "\"30f21-bT031cSzRC20mbKuiwihKEa09jk\"",
		"mtime": "2026-07-05T18:15:22.790Z",
		"size": 200481,
		"path": "../public/assets/cottage_walkway_night_1-B1qCacEJ.jpg"
	},
	"/assets/cottage_walkway_night_2-Y4zo241Q.jpg": {
		"type": "image/jpeg",
		"etag": "\"3bc0c-J6M24+rgwMzQ7LZmWak7g0uutnE\"",
		"mtime": "2026-07-05T18:15:22.790Z",
		"size": 244748,
		"path": "../public/assets/cottage_walkway_night_2-Y4zo241Q.jpg"
	},
	"/assets/cottage_porch_sofa-CZBs9RBr.jpg": {
		"type": "image/jpeg",
		"etag": "\"3db4e-wupIIfFFe/0k+VhyLb5eoUfFzGo\"",
		"mtime": "2026-07-05T18:15:22.789Z",
		"size": 252750,
		"path": "../public/assets/cottage_porch_sofa-CZBs9RBr.jpg"
	},
	"/assets/index-A9DkgIlN.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"7d77-/kQ8QhnZUlJo0ChS4ptXYvFGqxQ\"",
		"mtime": "2026-07-05T18:15:22.791Z",
		"size": 32119,
		"path": "../public/assets/index-A9DkgIlN.css"
	},
	"/assets/washer-CY_9n8lm.jpg": {
		"type": "image/jpeg",
		"etag": "\"23bbe-LY/t9tJKU0j4xKMb3FD3wFGOZMw\"",
		"mtime": "2026-07-05T18:15:22.791Z",
		"size": 146366,
		"path": "../public/assets/washer-CY_9n8lm.jpg"
	},
	"/assets/index-Ch8lATu5.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"327f6-2/SByKFb6eNAB2GlZa/LZcYsJeo\"",
		"mtime": "2026-07-05T18:15:22.784Z",
		"size": 206838,
		"path": "../public/assets/index-Ch8lATu5.js"
	}
};
//#endregion
//#region #nitro/virtual/public-assets-node
function readAsset(id) {
	const serverDir = dirname(fileURLToPath(globalThis.__nitro_main__));
	return promises.readFile(resolve(serverDir, public_assets_data_default[id].path));
}
//#endregion
//#region #nitro/virtual/public-assets
var publicAssetBases = {};
function isPublicAssetURL(id = "") {
	if (public_assets_data_default[id]) return true;
	for (const base in publicAssetBases) if (id.startsWith(base)) return true;
	return false;
}
function getAsset(id) {
	return public_assets_data_default[id];
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/static.mjs
var METHODS = new Set(["HEAD", "GET"]);
var EncodingMap = {
	gzip: ".gz",
	br: ".br",
	zstd: ".zst"
};
var static_default = defineHandler((event) => {
	if (event.req.method && !METHODS.has(event.req.method)) return;
	let id = decodePath(withLeadingSlash(withoutTrailingSlash(event.url.pathname)));
	let asset;
	const encodings = [...(event.req.headers.get("accept-encoding") || "").split(",").map((e) => EncodingMap[e.trim()]).filter(Boolean).sort(), ""];
	for (const encoding of encodings) for (const _id of [id + encoding, joinURL(id, "index.html" + encoding)]) {
		const _asset = getAsset(_id);
		if (_asset) {
			asset = _asset;
			id = _id;
			break;
		}
	}
	if (!asset) {
		if (isPublicAssetURL(id)) {
			event.res.headers.delete("Cache-Control");
			throw new HTTPError({ status: 404 });
		}
		return;
	}
	if (encodings.length > 1) event.res.headers.append("Vary", "Accept-Encoding");
	if (event.req.headers.get("if-none-match") === asset.etag) {
		event.res.status = 304;
		event.res.statusText = "Not Modified";
		return "";
	}
	const ifModifiedSinceH = event.req.headers.get("if-modified-since");
	const mtimeDate = new Date(asset.mtime);
	if (ifModifiedSinceH && asset.mtime && new Date(ifModifiedSinceH) >= mtimeDate) {
		event.res.status = 304;
		event.res.statusText = "Not Modified";
		return "";
	}
	if (asset.type) event.res.headers.set("Content-Type", asset.type);
	if (asset.etag && !event.res.headers.has("ETag")) event.res.headers.set("ETag", asset.etag);
	if (asset.mtime && !event.res.headers.has("Last-Modified")) event.res.headers.set("Last-Modified", mtimeDate.toUTCString());
	if (asset.encoding && !event.res.headers.has("Content-Encoding")) event.res.headers.set("Content-Encoding", asset.encoding);
	if (asset.size > 0 && !event.res.headers.has("Content-Length")) event.res.headers.set("Content-Length", asset.size.toString());
	return readAsset(id);
});
//#endregion
//#region #nitro/virtual/routing
var findRouteRules = /* @__PURE__ */ (() => {
	const $0 = [{
		name: "headers",
		route: "/assets/**",
		handler: headers,
		options: { "cache-control": "public, max-age=31536000, immutable" }
	}];
	return (m, p) => {
		let r = [];
		if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1) || "/";
		let s = p.split("/");
		if (s.length > 1) {
			if (s[1] === "assets") r.unshift({
				data: $0,
				params: { "_": s.slice(2).join("/") }
			});
		}
		return r;
	};
})();
var _lazy_xhDd93 = defineLazyEventHandler(() => import("./_chunks/renderer-template.mjs"));
var findRoute = /* @__PURE__ */ (() => {
	const data = {
		route: "/**",
		handler: _lazy_xhDd93
	};
	return ((_m, p) => {
		return {
			data,
			params: { "_": p.slice(1) }
		};
	});
})();
var globalMiddleware = [toEventHandler(static_default)].filter(Boolean);
//#endregion
//#region node_modules/nitro/dist/runtime/internal/error/prod.mjs
var errorHandler = (error, event) => {
	const res = defaultHandler(error, event);
	return new NodeResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
};
function defaultHandler(error, event) {
	const unhandled = error.unhandled ?? !HTTPError.isError(error);
	const { status = 500, statusText = "" } = unhandled ? {} : error;
	if (status === 404) {
		const url = event.url || new URL(event.req.url);
		const baseURL = "/";
		if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) return {
			status: 302,
			headers: new Headers({ location: `${baseURL}${url.pathname.slice(1)}${url.search}` })
		};
	}
	const headers = new Headers(unhandled ? {} : error.headers);
	headers.set("content-type", "application/json; charset=utf-8");
	return {
		status,
		statusText,
		headers,
		body: {
			error: true,
			...unhandled ? {
				status,
				unhandled: true
			} : typeof error.toJSON === "function" ? error.toJSON() : {
				status,
				statusText,
				message: error.message
			}
		}
	};
}
//#endregion
//#region #nitro/virtual/error-handler
var errorHandlers = [errorHandler];
async function error_handler_default(error, event) {
	for (const handler of errorHandlers) try {
		const response = await handler(error, event, { defaultHandler });
		if (response) return response;
	} catch (error) {
		console.error(error);
	}
}
//#endregion
//#region #nitro/virtual/app
function createNitroApp() {
	const captureError = (error, errorCtx) => {
		if (errorCtx?.event) {
			const errors = errorCtx.event.req.context?.nitro?.errors;
			if (errors) errors.push({
				error,
				context: errorCtx
			});
		}
	};
	const h3App = createH3App({ onError(error, event) {
		return error_handler_default(error, event);
	} });
	let appHandler = (req) => {
		req.context ||= {};
		req.context.nitro = req.context.nitro || { errors: [] };
		return h3App.fetch(req);
	};
	return {
		fetch: appHandler,
		h3: h3App,
		hooks: void 0,
		captureError
	};
}
function initNitroPlugins(app) {
	return app;
}
function createH3App(config) {
	const h3App = new H3Core(config);
	h3App["~findRoute"] = (event) => findRoute(event.req.method, event.url.pathname);
	h3App["~middleware"].push(...globalMiddleware);
	h3App["~getMiddleware"] = (event, route) => {
		const pathname = event.url.pathname;
		const method = event.req.method;
		const middleware = [];
		const routeRules = getRouteRules(method, pathname);
		event.context.routeRules = routeRules?.routeRules;
		if (routeRules?.routeRuleMiddleware.length) middleware.push(...routeRules.routeRuleMiddleware);
		middleware.push(...h3App["~middleware"]);
		if (route?.data?.middleware?.length) middleware.push(...route.data.middleware);
		return middleware;
	};
	return h3App;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/app.mjs
var APP_ID = "default";
function useNitroApp() {
	let instance = useNitroApp._instance;
	if (instance) return instance;
	instance = useNitroApp._instance = createNitroApp();
	globalThis.__nitro__ = globalThis.__nitro__ || {};
	globalThis.__nitro__[APP_ID] = instance;
	initNitroPlugins(instance);
	return instance;
}
function getRouteRules(method, pathname) {
	const m = findRouteRules(method, pathname);
	if (!m?.length) return { routeRuleMiddleware: [] };
	const routeRules = {};
	for (const layer of m) for (const rule of layer.data) {
		const currentRule = routeRules[rule.name];
		if (currentRule) {
			if (rule.options === false) {
				delete routeRules[rule.name];
				continue;
			}
			if (typeof currentRule.options === "object" && typeof rule.options === "object") currentRule.options = {
				...currentRule.options,
				...rule.options
			};
			else currentRule.options = rule.options;
			currentRule.route = rule.route;
			currentRule.params = {
				...currentRule.params,
				...layer.params
			};
		} else if (rule.options !== false) routeRules[rule.name] = {
			...rule,
			params: layer.params
		};
	}
	const middleware = [];
	const orderedRules = Object.values(routeRules).sort((a, b) => (a.handler?.order || 0) - (b.handler?.order || 0));
	for (const rule of orderedRules) {
		if (rule.options === false || !rule.handler) continue;
		middleware.push(rule.handler(rule));
	}
	return {
		routeRules,
		routeRuleMiddleware: middleware
	};
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/error/hooks.mjs
function _captureError(error, type) {
	console.error(`[${type}]`, error);
	useNitroApp().captureError?.(error, { tags: [type] });
}
function trapUnhandledErrors() {
	process.on("unhandledRejection", (error) => _captureError(error, "unhandledRejection"));
	process.on("uncaughtException", (error) => _captureError(error, "uncaughtException"));
}
//#endregion
//#region #nitro/virtual/tracing
var tracingSrvxPlugins = [];
//#endregion
//#region node_modules/nitro/dist/presets/node/runtime/node-server.mjs
var _parsedPort = Number.parseInt(process.env.NITRO_PORT ?? process.env.PORT ?? "");
var port = Number.isNaN(_parsedPort) ? 3e3 : _parsedPort;
var host = process.env.NITRO_HOST || process.env.HOST;
var cert = process.env.NITRO_SSL_CERT;
var key = process.env.NITRO_SSL_KEY;
var nitroApp = useNitroApp();
serve({
	port,
	hostname: host,
	tls: cert && key ? {
		cert,
		key
	} : void 0,
	fetch: nitroApp.fetch,
	plugins: [...tracingSrvxPlugins]
});
trapUnhandledErrors();
var node_server_default = {};
//#endregion
export { node_server_default as default };
