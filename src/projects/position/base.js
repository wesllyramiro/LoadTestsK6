import { host } from '../../host'

export function position() {

    return {
        hostName: host().getHostName(),
        path: 'position'
    };
}