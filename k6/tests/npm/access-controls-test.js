import { getInstancesTest } from '../utils/requests-utils.js';

// Setup code
export function setup() {
}

// VU code
export default function (data) {
    // retrieve a single instance
    getInstancesTest('cluster', 'AccessControl');
}

// Teardown code
export function teardown() {

}
