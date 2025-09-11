interface UserData {
	mail: string;
	pseudo: string;
}

export async function superFetch(
	road: "mails" | "mobInstances" | "users" | "mobTypes",
	method: "GET" | "POST" | "PUT" | "DELETE",
	body?: UserData,
) {
	const response = await fetch(`${import.meta.env.BASE_URL}${road}`, {
		method,
		headers: {
			"Content-Type": "application/json",
			"x-api-key": import.meta.env.VITE_API_KEY,
		},
		body: body ? JSON.stringify(body) : null,
	});

	if (!response.ok) {
		throw new Error(`Erreur ${response.status} : ${response.statusText}`);
	}

	return response.json();
}
