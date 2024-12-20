import { useQuery } from "@tanstack/react-query"

type DateType = {
	__typename: string;
	available: boolean;
	checkinValidity: string;
	checkoutValidity: string;
	date: {
		day: number; month: number; year: number;
	}
}

export async function getVrboDisabledDates(): Promise<Date[]> {
	const body = [
		{
			"operationName": "PropertyAvailabilityQuery",
			"variables": {
				"eid": "109891904",
				"context": {
					"siteId": 9001001,
					"locale": "en_US",
					"eapid": 1,
					"tpid": 9001,
					"currency": "USD",
					"device": {
						"type": "DESKTOP"
					},
					"identity": {
						"duaid": "a8441906-a108-5693-4143-8fb6c9f98596",
						"authState": "ANONYMOUS"
					},
					"privacyTrackingState": "CAN_TRACK",
					"debugContext": {
						"abacusOverrides": []
					}
				}
			},
			"extensions": {
				"persistedQuery": {
					"version": 1,
					"sha256Hash": "a5faaea405d10b5533931158695480ffc7f2bec5094b02544abbbf15e47d58c2"
				}
			}
		}
	]
	const response = await fetch("https://www.vrbo.com/graphql", {
		"headers": {
			"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:132.0) Gecko/20100101 Firefox/132.0",
			"Accept": "*/*",
			"Accept-Language": "en-US,en;q=0.5",
			"content-type": "application/json",
			"client-info": "shopping-pwa,f86bf132ee294b0d3544e4834ec370bbdfe7ef94,us-west-2",
			"ctx-view-id": "f485da28-34ee-46b1-bb79-8ae7fc932c7e",
		},
		"body": JSON.stringify(body),
		"method": "POST",
	});
	const json = await response.json()
	const data: DateType[] = json && json.length > 0 ? json[0].data?.propertyAvailabilityCalendars[0].days : [];

	return data.filter(d => !d.available).map(d => new Date(d.date.year, d.date.month, d.date.day))
}

const useGetVrboDisabledDates = () => {
	return useQuery({ queryKey: ['getDisabledDates'], queryFn: getVrboDisabledDates })
}

export default useGetVrboDisabledDates