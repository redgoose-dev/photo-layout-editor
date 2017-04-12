export default function(original, target)
{
	return {
		body: {
			...(original && original.body),
			...(target && target.body),
			settings: {
				...((original && original.body) && original.body.settings),
				...((target && target.body) && target.body.settings)
			},
		},
		side: {
			...(original && original.side),
			...(target && target.side),
		}
	};
}