"""Capture viewport-accurate local screenshots through Edge DevTools Protocol."""
import base64
import json
import subprocess
import time
import urllib.request
from pathlib import Path

import websocket


ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "qa" / "screenshots"
EDGE = next(
    path
    for path in (
        Path(r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"),
        Path(r"C:\Program Files\Microsoft\Edge\Application\msedge.exe"),
    )
    if path.exists()
)
VIEWPORTS = [
    ("tablet-768x1024", 768, 1024, True),
    ("tablet-820x1180", 820, 1180, True),
    ("tablet-1024x768", 1024, 768, False),
    ("tablet-1024x1366", 1024, 1366, False),
    ("desktop-1280x720", 1280, 720, False),
    ("desktop-1366x768", 1366, 768, False),
    ("desktop-1440x900", 1440, 900, False),
    ("desktop-1600x900", 1600, 900, False),
    ("desktop-1920x1080", 1920, 1080, False),
    ("desktop-2560x1440", 2560, 1440, False),
    ("desktop-3122x2120", 3122, 2120, False),
    ("mobile-360x800", 360, 800, True),
    ("mobile-375x812", 375, 812, True),
    ("mobile-390x844", 390, 844, True),
    ("mobile-393x873", 393, 873, True),
    ("mobile-412x915", 412, 915, True),
    ("mobile-430x932", 430, 932, True),
    ("landscape-844x390", 844, 390, True),
    ("landscape-932x430", 932, 430, True),
    ("landscape-1024x600", 1024, 600, False),
]


def command(ws, counter, method, params=None):
    counter[0] += 1
    message_id = counter[0]
    ws.send(json.dumps({"id": message_id, "method": method, "params": params or {}}))
    while True:
        result = json.loads(ws.recv())
        if result.get("id") == message_id:
            return result


server = subprocess.Popen(["python", "-m", "http.server", "4173", "--bind", "127.0.0.1"], cwd=ROOT)
edge = subprocess.Popen([
    str(EDGE), "--headless=new", "--disable-gpu", "--remote-debugging-port=9222",
    "--remote-allow-origins=*", "--user-data-dir=" + str(ROOT / ".qa-edge-profile"), "about:blank",
])
try:
    time.sleep(2)
    target = json.load(urllib.request.urlopen(
        urllib.request.Request("http://127.0.0.1:9222/json/new?about:blank", method="PUT"), timeout=10
    ))
    ws = websocket.create_connection(target["webSocketDebuggerUrl"])
    counter = [0]
    evidence = []
    for name, width, height, mobile in VIEWPORTS:
        command(ws, counter, "Emulation.setDeviceMetricsOverride", {
            "width": width, "height": height, "deviceScaleFactor": 1, "mobile": mobile,
        })
        command(ws, counter, "Page.navigate", {"url": "http://127.0.0.1:4173/index.html"})
        time.sleep(6)
        metrics = command(ws, counter, "Runtime.evaluate", {
            "expression": "JSON.stringify((()=>{const box=(selector)=>{const el=document.querySelector(selector);if(!el||getComputedStyle(el).display==='none')return null;const r=el.getBoundingClientRect();return {top:Math.round(r.top),bottom:Math.round(r.bottom),left:Math.round(r.left),right:Math.round(r.right),clipped:r.top<0||r.bottom>innerHeight||r.left<0||r.right>innerWidth};};return {innerWidth,innerHeight,scrollWidth:document.documentElement.scrollWidth,scrollHeight:document.documentElement.scrollHeight,hasHorizontalOverflow:document.documentElement.scrollWidth > window.innerWidth,hasVerticalOverflow:document.documentElement.scrollHeight > window.innerHeight,critical:{hero:box('.hero'),form:box('#intake'),catalog:box('.catalog-row'),direct:box('.direct'),demo:box('.demo-panel'),footer:box('.site-foot')}}})())",
            "returnByValue": True,
        })["result"]["result"]["value"]
        screenshot = command(ws, counter, "Page.captureScreenshot", {"format": "png"})["result"]["data"]
        (OUT / f"{name}.png").write_bytes(base64.b64decode(screenshot))
        evidence.append({"viewport": f"{width}x{height}", "mobile_emulation": mobile, **json.loads(metrics)})
    (ROOT / "qa" / "responsive-results.json").write_text(json.dumps(evidence, indent=2), encoding="utf-8")
    print(json.dumps(evidence, indent=2))
finally:
    edge.terminate()
    server.terminate()
