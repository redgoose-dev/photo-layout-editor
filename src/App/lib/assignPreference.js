export default function(original, target)
{
	return {
		body: {
			...(original && original.body),
			...(target && target.body),
			setting: {
				...((original && original.body) && original.body.setting),
				...((target && target.body) && target.body.setting)
			},
		},
		side: {
			...(original && original.side),
			...(target && target.side),
		}
	};
}