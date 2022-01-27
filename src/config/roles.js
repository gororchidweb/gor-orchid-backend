const allRoles = {
  user: [],
  admin: ['getUsers', 'manageUsers', 'getFields', 'manageFields', 'getBookings', 'manageBookings'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
