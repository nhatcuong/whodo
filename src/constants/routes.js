export const HOME_PATH = '/';
export const ROSTER_PATH = '/roster/:rosterId';
export const ROSTER_MEMBER_PATH = '/roster/:rosterId/members';

export function pathWithRosterId(rosterId) {
    return ROSTER_PATH.replace(':rosterId', rosterId);
}

export function memberPathWithRosterId(rosterId) {
    return ROSTER_MEMBER_PATH.replace(':rosterId', rosterId);
}