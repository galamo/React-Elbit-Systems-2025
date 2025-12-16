/**
 * reportWebVitals helper that measures and POSTs metrics to your API.
 * It measures on all pages because it's called from main.jsx at app startup.
 *
 * You can set the endpoint by changing REPORT_ENDPOINT below, or by setting
 * window.__WEBVITALS_ENDPOINT before the script loads.
 *
 * Each metric is sent with page info and a small sample payload.
 */
import { onCLS, onFID, onLCP, onFCP, onTTFB, onINP } from "web-vitals";

const REPORT_ENDPOINT =
  typeof window !== "undefined" && window.__WEBVITALS_ENDPOINT
    ? window.__WEBVITALS_ENDPOINT
    : "/api/webvitals";

function sendMetric(metric) {
  try {
    // payload includes current route and metric details
    const body = JSON.stringify({
      name: metric.name,
      delta: metric.delta,
      value: metric.value,
      id: metric.id,
      rating: metric.rating,
      page: location.pathname,
      timestamp: Date.now(),
    });
    console.log(body);
    // navigator.sendBeacon preferred, fallback to fetch
    if (navigator.sendBeacon) {
      const blob = new Blob([body], { type: "application/json" });
      navigator.sendBeacon(REPORT_ENDPOINT, blob);
    } else {
      fetch(REPORT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
      });
    }
  } catch (e) {
    // swallow errors in reporting
    // console.error('webvitals send error', e)
  }
}

export default function reportWebVitals() {
  onCLS(sendMetric);
  onFID(sendMetric);
  onLCP(sendMetric);
  onFCP(sendMetric);
  onTTFB(sendMetric);
  onINP(sendMetric);
}
