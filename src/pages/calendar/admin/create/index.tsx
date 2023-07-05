import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { api } from "~/utils/api";

const CreateEvent = () => {
    const router = useRouter();

    const { data: eventTypes, isLoading: eventTypesIsLoading } =
        api.calendar.eventTypes.useQuery();

    const { data: clubs, isLoading: clubsIsLoading } =
        api.calendar.clubs.useQuery();

    const createEvent = api.calendar.create.useMutation({
        onSuccess: async () => {
            await router.push("/calendar/admin/");
        },
    });

    const [eventData, setEventData] = useState({
        clubCode: "",
        eventType: "",
        name: "",
        startDate: "",
        endDate: "",
        link: "",
    });

    if (eventTypesIsLoading || !eventTypes || clubsIsLoading || !clubs) {
        return <div>Loading</div>;
    }

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();

        if (
            !eventData.eventType ||
            !eventData.clubCode ||
            !eventData.name ||
            !eventData.startDate ||
            !eventData.endDate
        ) {
            alert("Please fill in all fields");
        } else {
            createEvent.mutate({
                eventType: eventData.eventType,
                clubCode: eventData.clubCode,
                name: eventData.name,
                startDate: new Date(eventData.startDate),
                endDate: new Date(eventData.endDate),
                link: eventData.link,
            });
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mx-auto mb-6 w-2/4 pt-6">
                <div>
                    <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                        Event Type
                        <select
                            className="block w-full border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
                            value={eventData.eventType}
                            onChange={(e) =>
                                setEventData({
                                    ...eventData,
                                    eventType: e.target.value,
                                })
                            }
                        >
                            <option value="">Select...</option>
                            {eventTypes.map((et) => (
                                <option key={et.typeName} value={et.typeName}>
                                    {et.filterText}
                                </option>
                            ))}
                        </select>
                    </label>
                </div>
                <div>
                    <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                        Club
                        <select
                            className="block w-full border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
                            value={eventData.clubCode}
                            onChange={(e) =>
                                setEventData({
                                    ...eventData,
                                    clubCode: e.target.value,
                                })
                            }
                        >
                            <option value="">Select...</option>
                            {clubs.map((club) => (
                                <option
                                    key={club.clubCode}
                                    value={club.clubCode}
                                >
                                    {club.name}
                                </option>
                            ))}
                        </select>
                    </label>
                </div>
                <div>
                    <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                        Event Name
                        <input
                            type="text"
                            value={eventData.name}
                            onChange={(e) => {
                                setEventData({
                                    ...eventData,
                                    name: e.target.value,
                                });
                            }}
                            className="block w-full border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
                        />
                    </label>
                </div>
                <div>
                    <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                        Start Date
                        <input
                            type="date"
                            value={eventData.startDate}
                            onChange={(e) => {
                                if (!eventData.endDate) {
                                    setEventData({
                                        ...eventData,
                                        startDate: e.target.value,
                                        endDate: e.target.value,
                                    });
                                } else {
                                    setEventData({
                                        ...eventData,
                                        startDate: e.target.value,
                                    });
                                }
                            }}
                            className="block w-full border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
                        />
                    </label>
                </div>
                <div>
                    <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                        End Date
                        <input
                            type="date"
                            value={eventData.endDate}
                            onChange={(e) => {
                                setEventData({
                                    ...eventData,
                                    endDate: e.target.value,
                                });
                            }}
                            className="block w-full border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
                        />
                    </label>
                </div>
                <div>
                    <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                        Link
                        <input
                            type="text"
                            value={eventData.link}
                            onChange={(e) => {
                                setEventData({
                                    ...eventData,
                                    link: e.target.value,
                                });
                            }}
                            className="block w-full border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
                        />
                    </label>
                </div>
                <div>
                    <Link
                        href="/calendar/admin/"
                        className="rounged-lg mb-2 mr-2 rounded-lg bg-gray-400 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700"
                    >
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        className="rounged-lg mb-2 mr-2 rounded-lg bg-green-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-green-700"
                    >
                        Add Event
                    </button>
                </div>
            </div>
        </form>
    );
};

export default CreateEvent;
