import http from 'k6/http';
import { check } from 'k6';
import { scenery } from './scenery.js';
import { utils } from './utils.js';

var scene = scenery()

export function setup() {
    const url = `${scene.hostName}/${scene.path}/api/v1/token`
    
    const res = http.post(url,JSON.stringify({ clientSecret: 'pass' }),{
        headers: { 
            'Content-Type': 'application/json'
        }
    })

    return res.json()
}

export default function(data) {

    scene.requests.forEach((request) => {
        var url = `${scene.hostName}/${scene.path}/${request.endpoint}`

        var params = { 
            timeout: '300s',
            headers: {
                'Content-Type': 'application/json'
            } 
        };

        if (request.headers != null)
            params.headers = request.headers

        params.headers['Authorization'] = `Bearer ${data.accessToken}` 

        var response = http.request(request.method.toUpperCase(), 
                                    url, 
                                    JSON.stringify(request.payload), 
                                    params);

        utils().debug(scene.hostName, request, response);
        check(response, { 'status was 200': res => res.status == 200 });
        utils().setSleep();
    });
}