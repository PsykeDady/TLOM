export const CampaignOwnership = {
	PERSONAL: "PERSONAL",
	PARTY: "PARTY",
	MASTER: "MASTER"
};

export function createCampaign({id, name, description, ownership, missionIds}) {
	return {id, name, description, ownership, missionIds};
}