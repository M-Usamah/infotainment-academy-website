const base = "http://localhost:3000";

const valid = {
  name: "Amara Voss",
  email: "amara@example.com",
  phone: "+14155550100",
  inquiryType: "Start with a paid pilot (4–6 weeks)",
  subject: "Unreal gameplay pilot",
  message: "We need help with an Unreal Engine 5 combat system for our PC game.",
  companyWebsite: "",
};

// Each request gets its own client IP so the per-IP rate limit does not mask other tests.
// The rate-limit test sets X-Forwarded-For itself, so it shares one bucket.
const runId = Date.now().toString(36);
let requestCount = 0;

async function jsonRequest(path, init = {}) {
  const headers = { ...(init.headers ?? {}) };
  if (!headers["x-forwarded-for"]) {
    requestCount += 1;
    headers["x-real-ip"] = `test-${runId}-${requestCount}`;
  }
  const res = await fetch(base + path, { ...init, headers });
  let body;
  try {
    body = await res.json();
  } catch {
    body = await res.text();
  }
  return { status: res.status, headers: res.headers, body };
}

async function main() {
  const results = [];
  const home = await fetch(base + "/");
  const csp = home.headers.get("content-security-policy") || "";

  results.push({ test: "homepage 200", pass: home.status === 200, status: home.status });
  results.push({ test: "no X-Powered-By", pass: !home.headers.get("x-powered-by") });
  results.push({ test: "CSP default-src self", pass: csp.includes("default-src 'self'") });
  results.push({ test: "CSP frame-ancestors none", pass: csp.includes("frame-ancestors 'none'") });
  results.push({ test: "X-Frame-Options DENY", pass: home.headers.get("x-frame-options") === "DENY" });
  results.push({ test: "X-Content-Type-Options nosniff", pass: home.headers.get("x-content-type-options") === "nosniff" });
  results.push({ test: "Referrer-Policy", pass: home.headers.get("referrer-policy") === "strict-origin-when-cross-origin" });
  results.push({ test: "Permissions-Policy", pass: Boolean(home.headers.get("permissions-policy")) });
  results.push({ test: "HSTS", pass: (home.headers.get("strict-transport-security") || "").includes("max-age") });
  results.push({ test: "COOP", pass: home.headers.get("cross-origin-opener-policy") === "same-origin" });

  const getApi = await jsonRequest("/api/contact");
  results.push({ test: "GET contact 405", pass: getApi.status === 405 });

  const xss = await jsonRequest("/api/contact", {
    method: "POST",
    headers: { "content-type": "application/json", origin: "http://localhost:3000" },
    body: JSON.stringify({
      ...valid,
      name: "<script>alert(1)</script>",
      message: "<img src=x onerror=alert(1)> enough extra text",
    }),
  });
  results.push({ test: "XSS name rejected", pass: xss.status === 400, status: xss.status, body: xss.body });

  const inject = await jsonRequest("/api/contact", {
    method: "POST",
    headers: { "content-type": "application/json", origin: "http://localhost:3000" },
    body: JSON.stringify({
      ...valid,
      email: "evil@example.com\nBcc: victim@example.com",
    }),
  });
  results.push({ test: "email header injection rejected", pass: inject.status === 400, status: inject.status });

  const origin = await jsonRequest("/api/contact", {
    method: "POST",
    headers: { "content-type": "application/json", origin: "https://evil.example" },
    body: JSON.stringify(valid),
  });
  results.push({ test: "foreign origin 403", pass: origin.status === 403, status: origin.status });

  const ctype = await jsonRequest("/api/contact", {
    method: "POST",
    headers: { "content-type": "text/plain", origin: "http://localhost:3000" },
    body: JSON.stringify(valid),
  });
  results.push({ test: "non-json 415", pass: ctype.status === 415, status: ctype.status });

  const smuggled = await jsonRequest("/api/contact", {
    method: "POST",
    headers: { "content-type": "text/plain; x=application/json", origin: "http://localhost:3000" },
    body: JSON.stringify(valid),
  });
  results.push({ test: "json-in-parameter content type 415", pass: smuggled.status === 415, status: smuggled.status });

  const crossSite = await jsonRequest("/api/contact", {
    method: "POST",
    headers: { "content-type": "application/json", "sec-fetch-site": "cross-site" },
    body: JSON.stringify(valid),
  });
  results.push({ test: "cross-site fetch 403", pass: crossSite.status === 403, status: crossSite.status });

  const badType = await jsonRequest("/api/contact", {
    method: "POST",
    headers: { "content-type": "application/json", origin: "http://localhost:3000" },
    body: JSON.stringify({ ...valid, inquiryType: "Something else" }),
  });
  results.push({ test: "unknown inquiry type rejected", pass: badType.status === 400, status: badType.status });

  // Chunked body with no Content-Length header must still be capped.
  const big = JSON.stringify({ ...valid, message: "x".repeat(20_000) });
  const stream = new ReadableStream({
    start(controller) {
      controller.enqueue(new TextEncoder().encode(big));
      controller.close();
    },
  });
  const chunked = await jsonRequest("/api/contact", {
    method: "POST",
    headers: { "content-type": "application/json", origin: "http://localhost:3000" },
    body: stream,
    duplex: "half",
  });
  results.push({ test: "chunked oversized body 413", pass: chunked.status === 413, status: chunked.status });

  const honey = await jsonRequest("/api/contact", {
    method: "POST",
    headers: { "content-type": "application/json", origin: "http://localhost:3000" },
    body: JSON.stringify({ ...valid, companyWebsite: "http://spam.test" }),
  });
  results.push({ test: "honeypot blocked or ignored", pass: honey.status === 200 || honey.status === 400, status: honey.status });

  const ok = await jsonRequest("/api/contact", {
    method: "POST",
    headers: { "content-type": "application/json", origin: "http://localhost:3000" },
    body: JSON.stringify(valid),
  });
  results.push({ test: "valid inquiry 200", pass: ok.status === 200 && ok.body.ok === true, status: ok.status, body: ok.body });

  // Rotating a spoofed leftmost X-Forwarded-For must not reset the limit.
  let limited = false;
  for (let i = 0; i < 8; i += 1) {
    const r = await jsonRequest("/api/contact", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        origin: "http://localhost:3000",
        "x-forwarded-for": `203.0.113.${i}, 127.0.0.1`,
      },
      body: JSON.stringify({ ...valid, subject: `Rate ${i}` }),
    });
    if (r.status === 429) {
      limited = true;
      break;
    }
  }
  results.push({ test: "rate limit 429 despite spoofed XFF", pass: limited });

  for (const [from, to] of [
    ["/services/archviz", "/services"],
    ["/portfolio/northline-arena", "/portfolio"],
    ["/careers/unity-engineer", "/careers/unreal-developer"],
  ]) {
    const res = await fetch(base + from, { redirect: "manual" });
    const location = res.headers.get("location") || "";
    results.push({ test: `${from} redirects`, pass: res.status === 308 && location.endsWith(to), status: res.status });
  }

  for (const path of [
    "/about",
    "/contact",
    "/portfolio",
    "/portfolio/shogun",
    "/services",
    "/services/unreal-gameplay-engineering",
    "/news",
    "/careers",
    "/careers/unreal-developer",
    "/privacy",
  ]) {
    const res = await fetch(base + path);
    results.push({ test: `${path} 200`, pass: res.status === 200, status: res.status });
  }

  const failed = results.filter((item) => !item.pass);
  console.log(JSON.stringify({ failed: failed.length, results }, null, 2));
  if (failed.length) process.exit(1);
}

main();
