'use strict';

module.exports = {
  getNewId: (data) => (
    Math.max(
      ...data.map(user => user.id), 0
    ) + 1
  ),
};
