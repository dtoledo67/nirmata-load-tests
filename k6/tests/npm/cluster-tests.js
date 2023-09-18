
import { getInstanceTest, getInstancesTest, getOneModelId } from '../utils/requests-utils.js';

// Setup code
export function setup() {
    return { 
        clusterId: getOneModelId('cluster', 'KubernetesCluster'),
        clusterConfigId: getOneModelId('cluster', 'ClusterConfig')
    }
}

// VU code
export default function (data) {
    // retrieve a single instance
    getInstanceTest('cluster', 'KubernetesCluster', data.clusterId);
    getInstanceTest('cluster', 'ClusterConfig', data.clusterConfigId);

    //retrieve a single instance with parameters
    const params = 'fields=id,name'
    getInstanceTest('cluster', 'KubernetesCluster', data.clusterId, params);

    //retrieve all instances of a ModelIndex
    getInstancesTest('cluster', 'KubernetesCluster');
    getInstancesTest('cluster', 'Root');
    getInstancesTest('cluster', 'ClusterConfig');

     //retrieve all instances of a ModelIndex with parameters
     getInstancesTest('cluster', 'KubernetesCluster','field=id,name');
     getInstancesTest('cluster', 'KubernetesCluster','paginate=true&start=0&count=5');
}

// Teardown code
export function teardown() {

}
