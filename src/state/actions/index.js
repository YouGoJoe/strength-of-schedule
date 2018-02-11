import types from './types';

export function updateGame(game) {
    return {
        type: types.UPDATE_GAME,
        payload: {
            game,
        },
    };
}

export default { updateGame };
