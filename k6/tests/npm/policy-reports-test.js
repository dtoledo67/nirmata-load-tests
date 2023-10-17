import { getInstanceTest, getInstancesTest, getOneModelId } from '../utils/requests-utils.js';

export let options = {
//  thresholds: {
//    http_req_duration: ['p(95)<7000'],
//  },
}

// Setup code
export function setup() {
}

// VU code
// export default function (data) {
export default function f1 () {
    // retrieve multiple instances 
    getInstancesTest('cluster', 'PolicyReport');
}

export function f2 () {
    // retrieve multiple instances 
    getInstancesTest('cluster', 'PolicyxxReport');
}

// Teardown code
export function teardown() {

}
