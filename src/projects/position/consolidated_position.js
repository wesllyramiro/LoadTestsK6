import { position } from './base.js'
const data = JSON.parse(open('../../data/users.json'));

const random = (list) => {
    return list[Math.floor((Math.random()*list.length))];
}

export function consolidatedPosition() {
    const api = position()
    const user = random(data)

    return {
        hostName: api.hostName,
        path: api.path,
        requests: [
            {
                endpoint: `api/positions/consolidated?view=Summary&partitions=1&partition=0&customerCodes=${user.code}`,
                method: 'GET',
                payload: null,
                headers: null   
            }
        ]
    };
}