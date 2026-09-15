export const CampaignOwnership = {
	PERSONAL: "PERSONAL",
	PARTY: "PARTY",
	MASTER: "MASTER"
};

export function createCampaign({id, name, description, ownership, goalIds}) {
	return {id, name, description, ownership, goalIds};
}