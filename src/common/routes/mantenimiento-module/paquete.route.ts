export const routePaqueteCreateMultiple = {
	route: '[POST].../v1/paquete/multiple',
	title: 'Create Multiple Paquete'
};

export const routePaqueteCreate = {
	route: '[POST].../v1/paquete',
	title: 'Create Paquete'
};

export const routePaqueteFindOne = {
	route: '[GET].../v1/paquete/:id_',
	title: 'Find One Paquete'
};

export const routePaqueteFindAll = {
	route: '[GET].../v1/paquete/all/:attribute/:orderBy',
	title: 'Find All Paquete'
};

export const routePaqueteFindBy = {
	route: '[GET].../v1/paquete/find-by/:attribute/:value/:orderBy',
	title: 'Find By Paquete Attribute & Value'
};

export const routePaqueteUpdate = {
	route: '[PATCH].../v1/paquete/:id_',
	title: 'Update Paquete'
};

export const routePaqueteRemove = {
	route: '[DELETE].../v1/paquete/:id_',
	title: 'Remove Paquete'
};