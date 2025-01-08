export const routeComisionPagoCreateMultiple = {
	route: '[POST].../v1/comision-pago/multiple',
	title: 'Create Multiple Comision Pago'
};

export const routeComisionPagoCreate = {
	route: '[POST].../v1/comision-pago',
	title: 'Create Comision Pago'
};

export const routeComisionPagoFindOne = {
	route: '[GET].../v1/comision-pago/:id_',
	title: 'Find One Comision Pago'
};

export const routeComisionPagoFindAll = {
	route: '[GET].../v1/comision-pago/all/:ci_asesor',
	title: 'Find All Comision Pago'
};

export const routeComisionPagoFindBy = {
	route: '[GET].../v1/comision-pago/find-by/:attribute/:value/:orderBy',
	title: 'Find By Comision Pago Attribute & Value'
};

export const routeComisionPagoUpdate = {
	route: '[PATCH].../v1/comision-pago/:id_',
	title: 'Update Comision Pago'
};

export const routeComisionPagoRemove = {
	route: '[DELETE].../v1/comision-pago/:id_',
	title: 'Remove Comision Pago'
};