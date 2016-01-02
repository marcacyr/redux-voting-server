import {expect} from 'chai';
import {fromJS, List, Map} from 'immutable';
import makeStore from '../src/store';

describe('store', () => {
    it('is a Redux store configured with the correct reducer', () => {
        const store = makeStore();

        expect(store.getState()).to.equal(Map());

        store.dispatch({
            type: 'SET_ENTRIES',
            entries: List.of('Trainspotting', '28 Days Later')
        });

        expect(store.getState()).to.equal(fromJS({
            entries: ['Trainspotting', '28 Days Later']
        }));
    });
});
