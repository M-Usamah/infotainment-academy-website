const base = "http://localhost:3000";

const valid = {
  name: "Amara Voss",
  email: "amara@example.com",
  phone: "+14155550100",
  subject: "New stadium overlay",
  message: "We need a mixed-reality overlay for opening night in March.",
  companyWebsite: "",
};

async function jsonRequest(path, init = {}) {
  const res = await fetch(base + path, init);
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

  let limited = false;
  for (let i = 0; i < 8; i += 1) {
    const r = await jsonRequest("/api/contact", {
      method: "POST",
      headers: { "content-type": "application/json", origin: "http://localhost:3000" },
      body: JSON.stringify({ ...valid, subject: `Rate ${i}` }),
    });
    if (r.status === 429) {
      limited = true;
      break;
    }
  }
  results.push({ test: "rate limit 429", pass: limited });

  for (const path of ["/about", "/contact", "/portfolio", "/services", "/news", "/careers", "/privacy"]) {
    const res = await fetch(base + path);
    results.push({ test: `${path} 200`, pass: res.status === 200, status: res.status });
  }

  const failed = results.filter((item) => !item.pass);
  console.log(JSON.stringify({ failed: failed.length, results }, null, 2));
  if (failed.length) process.exit(1);
}

main();
