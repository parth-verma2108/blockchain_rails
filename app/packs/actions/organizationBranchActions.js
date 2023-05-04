export const RECEIVE_ORGANIZATION_BRANCH = "RECEIVE_ORGANIZATION_BRANCH";
export const RECEIVE_ORGANIZATION_BRANCHES = "RECEIVE_ORGANIZATION_BRANCHES";

export const receiveOrganizationBranch = (organizationBranch) => ({
  type: RECEIVE_ORGANIZATION_BRANCH,
  payload: organizationBranch,
});

export const receiveOrganizationBranches = (organizationBranches) => ({
  type: RECEIVE_ORGANIZATION_BRANCHES,
  payload: organizationBranches,
});
