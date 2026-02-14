/* eslint-disable no-console */
const http = require("http");
const path = require("path");
const fs = require("fs");
const os = require("os");

const ROOT_DIR = path.resolve(__dirname, "..");
const DIST_DIR = path.join(ROOT_DIR, "dist");
const FEEDBACK_DIR = path.join(ROOT_DIR, "feedback");
const FEEDBACK_FILE = path.join(FEEDBACK_DIR, "feedback.jsonl");

const HOST = process.env.HOST || "0.0.0.0";
const PORT = Number.parseInt(process.env.PORT || "8080", 10);

const MIME_TYPES = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".map": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".webp": "image/webp",
};

function getLocalIPs() {
  const interfaces = os.networkInterfaces();
  const ips = [];
  Object.values(interfaces).forEach((entries) => {
    (entries || []).forEach((entry) => {
      if (entry.family === "IPv4" && !entry.internal) {
        ips.push(entry.address);
      }
    });
  });
  return Array.from(new Set(ips));
}

function sendJson(res, statusCode, payload) {
  const body = JSON.stringify(payload);
  res.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Content-Length": Buffer.byteLength(body),
  });
  res.end(body);
}

function safeDistPath(pathname) {
  let decodedPath = pathname;
  try {
    decodedPath = decodeURIComponent(pathname);
  } catch (error) {
    return null;
  }

  const normalized = path.posix.normalize(decodedPath);
  const resolved = path.resolve(DIST_DIR, `.${normalized}`);
  if (!resolved.startsWith(DIST_DIR)) {
    return null;
  }
  return resolved;
}

async function readJsonBody(req, maxSizeBytes = 200 * 1024) {
  return new Promise((resolve, reject) => {
    let total = 0;
    const chunks = [];

    req.on("data", (chunk) => {
      total += chunk.length;
      if (total > maxSizeBytes) {
        reject(new Error("Request body too large"));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });

    req.on("end", () => {
      try {
        const raw = Buffer.concat(chunks).toString("utf8");
        const body = raw ? JSON.parse(raw) : {};
        resolve(body);
      } catch (error) {
        reject(new Error("Invalid JSON body"));
      }
    });

    req.on("error", (error) => reject(error));
  });
}

async function appendFeedback(entry) {
  await fs.promises.mkdir(FEEDBACK_DIR, { recursive: true });
  await fs.promises.appendFile(
    FEEDBACK_FILE,
    `${JSON.stringify(entry)}\n`,
    "utf8"
  );
}

async function handleFeedback(req, res) {
  if (req.method !== "POST") {
    sendJson(res, 405, { ok: false, error: "Method not allowed" });
    return;
  }

  let body;
  try {
    body = await readJsonBody(req);
  } catch (error) {
    sendJson(res, 400, { ok: false, error: error.message });
    return;
  }

  const message = typeof body.message === "string" ? body.message.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const language =
    body.language === "en" || body.language === "zh" ? body.language : "unknown";
  const page = typeof body.page === "string" ? body.page.trim() : "";

  if (!message) {
    sendJson(res, 400, { ok: false, error: "Feedback message is required" });
    return;
  }

  if (message.length > 5000 || email.length > 200) {
    sendJson(res, 400, { ok: false, error: "Feedback fields exceed limits" });
    return;
  }

  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    sendJson(res, 400, { ok: false, error: "Invalid email format" });
    return;
  }

  const entry = {
    timestamp: new Date().toISOString(),
    ip: req.socket.remoteAddress || "",
    userAgent: req.headers["user-agent"] || "",
    language,
    page,
    email,
    message,
  };

  try {
    await appendFeedback(entry);
    sendJson(res, 200, { ok: true });
  } catch (error) {
    console.error("Failed to persist feedback:", error);
    sendJson(res, 500, { ok: false, error: "Failed to store feedback" });
  }
}

async function serveStatic(req, res, pathname) {
  let filePath = safeDistPath(pathname);
  if (!filePath) {
    sendJson(res, 400, { ok: false, error: "Invalid path" });
    return;
  }

  try {
    const stats = await fs.promises.stat(filePath);
    if (stats.isDirectory()) {
      filePath = path.join(filePath, "index.html");
    }
  } catch (error) {
    filePath = path.join(DIST_DIR, "index.html");
  }

  let stats;
  try {
    stats = await fs.promises.stat(filePath);
  } catch (error) {
    sendJson(res, 404, { ok: false, error: "Not found" });
    return;
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || "application/octet-stream";

  res.writeHead(200, {
    "Content-Type": contentType,
    "Content-Length": stats.size,
    "Cache-Control": "no-cache",
  });

  if (req.method === "HEAD") {
    res.end();
    return;
  }

  const stream = fs.createReadStream(filePath);
  stream.on("error", () => {
    if (!res.headersSent) {
      sendJson(res, 500, { ok: false, error: "File read error" });
    } else {
      res.destroy();
    }
  });
  stream.pipe(res);
}

const server = http.createServer(async (req, res) => {
  if (!fs.existsSync(DIST_DIR)) {
    sendJson(res, 500, {
      ok: false,
      error: "dist directory does not exist. Run `npm run build` first.",
    });
    return;
  }

  const url = new URL(req.url || "/", `http://${req.headers.host || "localhost"}`);

  if (url.pathname === "/api/health") {
    sendJson(res, 200, { ok: true, feedbackFile: FEEDBACK_FILE });
    return;
  }

  if (url.pathname === "/api/feedback") {
    await handleFeedback(req, res);
    return;
  }

  if (req.method !== "GET" && req.method !== "HEAD") {
    sendJson(res, 405, { ok: false, error: "Method not allowed" });
    return;
  }

  await serveStatic(req, res, url.pathname);
});

server.listen(PORT, HOST, () => {
  const ips = getLocalIPs();
  console.log("Public site server is running.");
  console.log(`Local:   http://localhost:${PORT}`);
  ips.forEach((ip) => {
    console.log(`LAN:     http://${ip}:${PORT}`);
  });
  console.log(`Feedback will be saved to: ${FEEDBACK_FILE}`);
});
