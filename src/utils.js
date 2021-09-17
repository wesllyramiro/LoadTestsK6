import { sleep } from 'k6';

export function utils()
{    
    return {
        debug: (hostname, data, response) =>
        {
            if (__ENV.DEBUG.toLowerCase() === 'true')
            {
                console.log(`${data.method}: ${hostname}${data.endpoint}`);
                
                if (data.headers != null)
                    console.log(`Headers: ${JSON.stringify(data.headers)}`);
                   
                if (data.payload != null)
                    console.log(`Body: ${JSON.stringify(data.payload)}`);
    
                console.log(`Status: ${response.status}`);
            }
        },    
        setSleep: () =>
        {
            if (Number.isInteger(__ENV.SLEEP) && parseInt(__ENV.SLEEP, 10) > 0)
                sleep(parseInt(__ENV.SLEEP, 10));
        }
    };
}