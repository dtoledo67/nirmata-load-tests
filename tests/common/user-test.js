
import { getInstanceTest, getInstancesTest, getOneModelId } from '../utils/requests-utils.js';

// Setup code
export function setup() {
    return {
        userId: getOneModelId('users', 'User'),
    }
}

// VU code
export default function (data) {
     getInstanceTest('users', 'User', data.userId);
}

// Teardown code
export function teardown() {

}
