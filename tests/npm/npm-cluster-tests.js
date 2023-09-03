import { check } from 'k6';
import http from 'k6/http';

import { NPM_CLUSTER_MODELS } from '../utils/cluster-model-indexes.js';
import { getHeadersWithAuth, getNirmataUrl } from '../utils/requests-utils.js';

export default function () {
    clusterGetTests();
}

const clusterGetTests = () => {
    const baseUrl = getNirmataUrl();

    NPM_CLUSTER_MODELS.forEach(function(moIdx) {
        const url = baseUrl+'/cluster/api/'+moIdx;
        const headers = getHeadersWithAuth('admin');
        console.log('url = '+url);

        const res = http.get(url, headers);
        check(res, {
            'is status 200': (r) => r.status === 200,
        });
    })
}