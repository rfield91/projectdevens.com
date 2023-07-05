import Link from "next/link";
import { api } from "~/utils/api";
import Image from "next/image";
import EventTypeFilter from "~/components/calendar/EventTypeFilter";
import EventsDisplay from "~/components/calendar/EventsDisplay";
import { useLocalStorage } from "~/hooks/useLocalStorage";

const Calendar = () => {
    const { data: events, isLoading: isEventDataLoading } =
        api.calendar.futureEventFeed.useQuery();

    const { data: eventTypes, isLoading: isEventTypesLoading } =
        api.calendar.eventTypes.useQuery();

    const [selectedFilters, setSelectedFilters] = useLocalStorage<string[]>(
        "selectedEventTypes",
        []
    );

    const handleFilterChange = (eventType: string, isEnabled: boolean) => {
        const currentIndex = selectedFilters.indexOf(eventType);

        if (isEnabled && currentIndex === -1) {
            setSelectedFilters([...selectedFilters, eventType]);
        } else if (!isEnabled && currentIndex > -1) {
            const newFilters = [...selectedFilters];

            newFilters.splice(currentIndex, 1);

            setSelectedFilters(newFilters);
        }
    };

    if (isEventDataLoading || !events || isEventTypesLoading || !eventTypes) {
        return <div>Loading</div>;
    }

    return (
        <div className="mx-auto md:w-3/4 lg:w-1/2">
            <div className="flex justify-center py-10">
                <Link href="/">
                    <Image
                        src="/images/project_devens_logo.png"
                        alt="PROJECT.Devens Logo"
                        width={250}
                        height={250}
                    />
                </Link>
            </div>
            <EventTypeFilter
                eventTypes={eventTypes}
                selectedFilters={selectedFilters}
                handleFilterChange={handleFilterChange}
            />
            <EventsDisplay
                events={events}
                eventTypes={eventTypes}
                typesToShow={selectedFilters}
            />
        </div>
    );
};

export default Calendar;
