export const HOME_PATH = '/';
export const ROSTER_PATH = '/roster/:rosterId';

export function pathWithRosterId(rosterId) {
    return ROSTER_PATH.replace(':rosterId', rosterId);
}