import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '15s', target: 50 },
    { duration: '20s', target: 100 },
    { duration: '20s', target: 200 },
    { duration: '10s', target: 0 },
  ],
  thresholds: {
    'http_req_duration{type:session_log}': ['p(95)<1000'],
    'http_req_duration{type:dashboard}': ['p(95)<2000'],
    http_req_failed: ['rate<0.01'],
  },
};

export default function () {
  const dashRes = http.get('http://localhost:5173/', { tags: { type: 'dashboard' } });
  check(dashRes, { 'dashboard loaded <2s': (r) => r.timings.duration < 2000 });
  sleep(1);
}
