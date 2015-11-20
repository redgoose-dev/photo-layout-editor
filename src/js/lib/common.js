function shuffle(o)
{
	for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
	return o;
}

function getRandomRange(min, max)
{
	max += 1;
	return Math.floor(Math.random() * (max - min) + min);
}

