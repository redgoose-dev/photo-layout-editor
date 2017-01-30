import { UPDATE_BODY } from './types';


export function updateBody(values)
{
	return {
		type: UPDATE_BODY,
		values: values,
	};
}