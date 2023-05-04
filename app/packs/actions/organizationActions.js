export const RECEIVE_ORGANIZATION = "RECEIVE_ORGANIZATION";
export const RECEIVE_ORGANIZATIONS = "RECEIVE_ORGANIZATIONS";

export const receiveOrganization = (organization) => ({
  type: RECEIVE_ORGANIZATION,
  payload: organization,
});

export const receiveOrganizations = (organizations) => ({
  type: RECEIVE_ORGANIZATIONS,
  payload: organizations,
});
