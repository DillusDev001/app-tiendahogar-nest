export const routePersonaCreateMultiple = {
	route: '[POST].../v1/persona/multiple',
	title: 'Create Multiple Persona'
};

export const routePersonaCreate = {
	route: '[POST].../v1/persona',
	title: 'Create Persona'
};

export const routePersonaFindOne = {
	route: '[GET].../v1/persona/:id_',
	title: 'Find One Persona'
};

export const routePersonaFindAll = {
	route: '[GET].../v1/persona',
	title: 'Find All Persona'
};

export const routePersonaFindBy = {
	route: '[GET].../v1/persona/find-by/:attribute/:value/:orderBy',
	title: 'Find By Persona Attribute & Value'
};

export const routePersonaUpdate = {
	route: '[PATCH].../v1/persona/:id_',
	title: 'Update Persona'
};

export const routePersonaRemove = {
	route: '[DELETE].../v1/persona/:id_',
	title: 'Remove Persona'
};