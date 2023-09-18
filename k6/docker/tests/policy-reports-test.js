import { getInstanceTest, getInstancesTest, getOneModelId } from '../utils/requests-utils.js';

export let options = {
  thresholds: {
    http_req_duration: ['p(95)<7000'],
  },
}

// Setup code
export function setup() {
}

// VU code
export default function (data) {
    // retrieve multiple instances 
    getInstancesTest('cluster', 'PolicyReport');
}

// Teardown code
export function teardown() {

}
