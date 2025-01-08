export const routeUsuarioCreateMultiple = {
	route: '[POST].../v1/usuario/multiple',
	title: 'Create Multiple Usuario'
};

export const routeUsuarioCreate = {
	route: '[POST].../v1/usuario',
	title: 'Create Usuario'
};

export const routeUsuarioFindOne = {
	route: '[GET].../v1/usuario/:usuario',
	title: 'Find One Usuario'
};

export const routeUsuarioFindAll = {
	route: '[GET].../v1/usuario',
	title: 'Find All Usuario'
};

export const routeUsuarioFindBy = {
	route: '[GET].../v1/usuario/find-by/:attribute/:value/:orderBy',
	title: 'Find By Usuario Attribute & Value'
};

export const routeUsuarioUpdate = {
	route: '[PATCH].../v1/usuario/:id_',
	title: 'Update Usuario'
};

export const routeUsuarioRemove = {
	route: '[DELETE].../v1/usuario/:id_',
	title: 'Remove Usuario'
};