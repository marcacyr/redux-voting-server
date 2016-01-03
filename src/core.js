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
            vote: Map({
                round: state.getIn(['vote', 'round'], 0) + 1,
                pair: entries.take(2)
            }),
            entries: entries.skip(2)
        });
    }
}

export function setEntries(state, entries) {
    if (!List.isList(entries)) {
        console.warn('Entries should be an Immutable List if possible.');
    }

    return state.set('entries', List(entries));
}

export function vote(voteState, entry) {
    if (voteState.get('pair').includes(entry)) {
        return voteState.updateIn(
            ['tally', entry],
            0,
            tally => tally + 1
        );
    } else {
        return voteState;
    }
}
