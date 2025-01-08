export const routeAsesorCreateMultiple = {
	route: '[POST].../v1/asesor/multiple',
	title: 'Create Multiple Asesor'
};

export const routeAsesorCreate = {
	route: '[POST].../v1/asesor',
	title: 'Create Asesor'
};

export const routeAsesorFindOne = {
	route: '[GET].../v1/asesor/:ic',
	title: 'Find One Asesor'
};

export const routeAsesorFindAll = {
	route: '[GET].../v1/asesor/:attribute/:orderby',
	title: 'Find All Asesor'
};

export const routeAsesorFindBy = {
	route: '[GET].../v1/asesor/find-by/:attribute/:value/:orderBy',
	title: 'Find By Asesor Attribute & Value'
};

export const routeAsesorUpdate = {
	route: '[PATCH].../v1/asesor/:id_',
	title: 'Update Asesor'
};

export const routeAsesorRemove = {
	route: '[DELETE].../v1/asesor/:id_',
	title: 'Remove Asesor'
};