import { check } from 'k6';
import http from 'k6/http';

export const options = {
  discardResponseBodies: true,
  scenarios: {
    environments: {
      executor: 'constant-vus',
      exec: 'send_get_request',
      vus: 5,
      duration: '30s',
      tags: { service: 'environments' },
      env: { URL: 'https://www.nirmata.io/environments/api/Environment' },
    },
  },
  systemTags: ['status', 'method', 'url', 'name', 'scenario'],
};

const params = {
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': 'NIRMATA-API CBY3U0JXqVkFyxGIxabd8hoqDA19Z0gdFR7gshs7nWy9JgbCib0RBCMWz6s/eXMDCaaZj2v9+7sybMZ4hDngmQ==',
  },
};

export function  send_get_request() {
  const url = 'https://www.nirmata.io/cluster/api/KubernetesCluster';
  const result = http.get(`${__ENV.URL}`, params);
  check(result, {
    'http response status code is 200': result.status === 200,
  });
}
