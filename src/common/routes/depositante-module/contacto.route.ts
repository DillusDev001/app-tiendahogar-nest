export const routeContactoCreateMultiple = {
	route: '[POST].../v1/contacto/multiple',
	title: 'Create Multiple Contacto'
};

export const routeContactoCreate = {
	route: '[POST].../v1/contacto',
	title: 'Create Contacto'
};

export const routeContactoFindOne = {
	route: '[GET].../v1/contacto/:id_',
	title: 'Find One Contacto'
};

export const routeContactoFindAll = {
	route: '[GET].../v1/contacto',
	title: 'Find All Contacto'
};

export const routeContactoFindBy = {
	route: '[GET].../v1/contacto/find-by/:attribute/:value/:orderBy',
	title: 'Find By Contacto Attribute & Value'
};

export const routeContactoUpdate = {
	route: '[PATCH].../v1/contacto/:id_',
	title: 'Update Contacto'
};

export const routeContactoRemove = {
	route: '[DELETE].../v1/contacto/:id_',
	title: 'Remove Contacto'
};