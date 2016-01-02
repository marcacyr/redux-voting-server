import {List, Map} from 'immutable';

export const INITIAL_STATE = Map();

function getWinners(vote) {
    if (!vote) {
        return List();
    }

    const pair = vote.get('pair');
    const a = pair.first();
    const b = pair.last();
    const aVotes = vote.getIn(['tally', a], 0);
    const bVotes = vote.getIn(['tally', b], 0);

    if (aVotes > bVotes) {
        return List([a]);
    } else if (aVotes < bVotes) {
        return List([b]);
    } else {
        return List([a, b]);
    }
}

export function next(state) {
    const entries = state.get('entries').concat(getWinners(state.get('vote')));

    if (entries.size === 1) {
        return state.remove('vote').remove('entries').set('winner', entries.first());
    } else {
        return state.merge({
            vote: Map({ pair: entries.take(2) }),
            entries: entries.skip(2)
        });
    }
}

export function setEntries(state, entries) {
    if (!List.isList(entries)) {
        throw new Error('Entries must be an Immutable List.');
    }

    return state.set('entries', entries);
}

export function vote(voteState, entry) {
    return voteState.updateIn(
        ['tally', entry],
        0,
        tally => tally + 1
    );
}
