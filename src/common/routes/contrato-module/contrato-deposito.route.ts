export const routeContratoDepositoCreateMultiple = {
	route: '[POST].../v1/contrato-deposito/multiple',
	title: 'Create Multiple Contrato Deposito'
};

export const routeContratoDepositoCreate = {
	route: '[POST].../v1/contrato-deposito',
	title: 'Create Contrato Deposito'
};

export const routeContratoDepositoFindOne = {
	route: '[GET].../v1/contrato-deposito/:cod_contrato/:sec',
	title: 'Find One Contrato Deposito'
};

export const routeContratoDepositoFindAll = {
	route: '[GET].../v1/contrato-deposito/all/:attribute/:orderBy',
	title: 'Find All Contrato Deposito'
};

export const routeContratoDepositoFindBy = {
	route: '[GET].../v1/contrato-deposito/find-by/:attribute/:value/:orderBy',
	title: 'Find By Contrato Deposito Attribute & Value'
};

export const routeContratoDepositoUpdate = {
	route: '[PATCH].../v1/contrato-deposito/:cod_contrato/:sec',
	title: 'Update Contrato Deposito'
};

export const routeContratoDepositoRemove = {
	route: '[DELETE].../v1/contrato-deposito/:cod_contrato/:sec',
	title: 'Remove Contrato Deposito'
};