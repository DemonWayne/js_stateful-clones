'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
const transformStateWithClones = (state, actions) => {
  const stateCopy = { ...state };
  const states = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties': {
        addProperties(stateCopy, action.extraData);
        break;
      }

      case 'removeProperties': {
        removeProperties(stateCopy, action.keysToRemove);
        break;
      }

      case 'clear': {
        clearState(stateCopy);
        break;
      }

      default: {
        break;
      }
    }

    states.push(structuredClone(stateCopy));
  }

  return states;
};

/**
 * Add properties to state object
 * @param {Object} state Current state
 * @param {Object} data Data to add
 */
function addProperties(state, data) {
  Object.assign(state, data);
}

/**
 * Remove properties from state object
 * @param {Object} state State object
 * @param {string[]} keys Keys to remove
 */
function removeProperties(state, keys) {
  for (const key of keys) {
    delete state[key];
  }
}

/**
 * Clear state object
 * @param {Object} state State object
 */
function clearState(state) {
  for (const key in state) {
    delete state[key];
  }
}

module.exports = transformStateWithClones;
