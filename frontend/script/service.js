const urlB64ToUint8Array = base64String => {

	const padding = "=".repeat((4 - (base64String.length % 4)) % 4);

	const base64 = (base64String + padding).replace(/\-/g, "+").replace(/_/g, "/");

	const rawData = atob(base64);

	const outputArray = new Uint8Array(rawData.length);

	for (let i = 0; i < rawData.length; ++i) {

		outputArray[i] = rawData.charCodeAt(i);

	}

	return outputArray;

};

const saveSubscription = async subscription => {

	/* On a Live Server - Changing the URL */
	
	const SERVER_URL = "http://localhost:4000/data-push-request";

	const response = await fetch(SERVER_URL, {

		method: "post",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(subscription)

	});

	return response.json();

};

self.addEventListener("install", async () => {

	try {

		const applicationServerKey = urlB64ToUint8Array(
			"XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
		);

		const options = { applicationServerKey, userVisibleOnly: true };
		const subscription = await self.registration.pushManager.subscribe(options);
		const response = await saveSubscription(subscription);

		console.log(response);

	} catch (err) {

		console.log("Error!", err);

	}

});

self.addEventListener("push", function(event) {

	if (event.data) {

		console.log("Push event - Success! ", event.data.text());

	} else {

		console.log("Push event without any data");

	}

});
