import { getInstanceTest, getInstancesTest, getOneModelId } from '../utils/requests-utils.js';

// Setup code
export function setup() {
    return { 
        policyReportId: getOneModelId('cluster', 'PolicyReport'),
    }
}

// VU code
export default function (data) {
    // retrieve a single instance
    getInstanceTest('cluster', 'PolicyReport', data.policyReportId);
}

// Teardown code
export function teardown() {

}
