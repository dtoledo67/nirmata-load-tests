
import { getInstanceTest, getInstancesTest, getOneModelId } from '../utils/requests-utils.js';

// Setup code
export function setup() {
}

// VU code
export default function (data) {
     getInstancesTest('cluster', 'KubernetesCluster');
}

// Teardown code
export function teardown() {

}
