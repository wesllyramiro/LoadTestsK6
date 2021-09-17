import { consolidatedPosition } from './projects/position/consolidated_position.js';

export function scenery()
{
    var scenery = null;

    switch (__ENV.SCENERY.toLowerCase())
    {
        case 'consolidated_position':
            scenery = consolidatedPosition();
            break;
        default:
            throw 'Cenário de teste não encontrado.';
    }

    return scenery;
}