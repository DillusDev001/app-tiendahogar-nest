export const routeAuthCreateMultiple = {
	route: '[POST].../v1/auth/multiple',
	title: 'Create Multiple Auth'
};

export const routeAuthCreate = {
	route: '[POST].../v1/auth',
	title: 'Create Auth'
};

export const routeAuthFindOne = {
	route: '[GET].../v1/auth/:usuario/:password',
	title: 'Find One Auth'
};

export const routeAuthFindAll = {
	route: '[GET].../v1/auth',
	title: 'Find All Auth'
};

export const routeAuthFindBy = {
	route: '[GET].../v1/auth/find-by/:attribute/:value/:orderBy',
	title: 'Find By Auth Attribute & Value'
};

export const routeAuthUpdate = {
	route: '[PATCH].../v1/auth/:usuario',
	title: 'Update Auth'
};

export const routeAuthRemove = {
	route: '[DELETE].../v1/auth/:usuario',
	title: 'Remove Auth'
};