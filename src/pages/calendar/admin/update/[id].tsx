import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { api } from "~/utils/api";

const UpdateEvent = () => {
    const router = useRouter();
    const [isIdReady, setIsIdReady] = useState(false);
    const id = useRouter().query.id as string;
    const [eventData, setEventData] = useState({
        id: "",
        clubCode: "",
        eventType: "",
        name: "",
        startDate: "",
        endDate: "",
        link: "",
    });

    const { data: eventTypes, isLoading: eventTypesIsLoading } =
        api.calendar.eventTypes.useQuery();

    const { data: clubs, isLoading: clubsIsLoading } =
        api.calendar.clubs.useQuery();

    const { data: trpcEventData, isLoading: isEventDataLoading } =
        api.calendar.getEvent.useQuery(
            { id: id },
            {
                enabled: isIdReady,
            }
        );

    const updateEvent = api.calendar.update.useMutation({
        onSuccess: async () => {
            await router.push("/calendar/admin/");
        },
    });

    useEffect(() => {
        if (id) {
            setIsIdReady(true);
        }
    }, [id]);

    useEffect(() => {
        if (trpcEventData && !isEventDataLoading) {
            setEventData({
                id: trpcEventData.id,
                clubCode: trpcEventData.clubCode,
                eventType: trpcEventData.eventType,
                name: trpcEventData.name,
                startDate: trpcEventData.startDate
                    .toISOString()
                    .substring(0, 10),
                endDate:
                    trpcEventData.endDate?.toISOString().substring(0, 10) || "",
                link: trpcEventData.link,
            });
        }
    }, [trpcEventData, isEventDataLoading]);

    if (
        !trpcEventData ||
        isEventDataLoading ||
        eventTypesIsLoading ||
        !eventTypes ||
        clubsIsLoading ||
        !clubs
    ) {
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
            updateEvent.mutate({
                id: eventData.id,
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
                                setEventData({
                                    ...eventData,
                                    startDate: e.target.value,
                                });
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
                        Update Event
                    </button>
                </div>
            </div>
        </form>
    );
};

export default UpdateEvent;
