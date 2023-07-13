import { signIn, signOut, useSession } from "next-auth/react";
import { api } from "~/utils/api";
import ButtonLink from "~/components/ButtonLink";
import Link from "next/link";
import { BsPencil, BsTrash } from "react-icons/bs";
import { VscSignIn, VscSignOut } from "react-icons/vsc";

const CalendarAdmin = () => {
    const session = useSession();
    const user = session.data?.user;

    console.log(session);
    // if (session.status !== "authenticated") {
    //     signIn();
    // }

    return (
        <div className="container mx-auto flex items-start sm:pr-4">
            <div className="sticky top-0 px-2 py-10">
                <ul className="flex flex-col items-start gap-2 whitespace-nowrap">
                    <li>
                        {user != null && (
                            <button onClick={() => void signOut()}>
                                <VscSignOut className="h-8 w-8 fill-green-700" />
                            </button>
                        )}
                        {user == null && (
                            <button onClick={() => void signIn()}>
                                <VscSignIn className="h-8 w-8 fill-green-700" />
                            </button>
                        )}
                    </li>
                </ul>
            </div>
            <div className="w-full pl-10 pt-5">
                <h3 className="mb-4 text-xl font-bold">Manage Events</h3>

                <CalendarAdminFeed />
            </div>
        </div>
    );
};

function CalendarAdminFeed() {
    const events = api.calendar.futureEventFeed.useQuery({
        eventTypes: [],
    });
    const eventTypes = api.calendar.eventTypes.useQuery();

    const deleteEvent = api.calendar.delete.useMutation({
        onSuccess: async () => {
            await events.refetch();
        },
    });

    if (
        events.isLoading ||
        events.data == null ||
        eventTypes.isLoading ||
        eventTypes.data == null
    ) {
        return <div>Loading</div>;
    }

    const handleDelete = (id: string) => {
        deleteEvent.mutate({
            id: id,
        });
    };

    return (
        <>
            <ButtonLink
                text="Create"
                link="/calendar/admin/create"
                color="green"
            />

            <table className="w-full table-auto border-collapse">
                <thead>
                    <tr className="border-b-4 border-slate-300">
                        <th className="p-3 text-left">Name</th>
                        <th className="p-3 text-left">Club</th>
                        <th className="p-3 text-left">Event Type</th>
                        <th className="p-3 text-left">Date</th>
                        <th className="p-3 text-left"></th>
                    </tr>
                </thead>
                <tbody>
                    {events.data.map((ev) => {
                        return (
                            <tr
                                key={ev.id}
                                className="border-b-2 border-slate-300"
                            >
                                <td className="p-3">{ev.name}</td>
                                <td className="p-3">{ev.club.name}</td>
                                <td className="p-3">
                                    {ev.calendarEventType.filterText}
                                </td>
                                <td className=" p-3">
                                    {ev.startDate.getTime() ==
                                    ev.endDate.getTime() ? (
                                        ev.startDate
                                            .toISOString()
                                            .substring(0, 10)
                                    ) : (
                                        <>
                                            {ev.startDate
                                                .toISOString()
                                                .substring(0, 10)}{" "}
                                            -{" "}
                                            {ev.endDate
                                                .toISOString()
                                                .substring(0, 10)}
                                        </>
                                    )}
                                </td>
                                <td className="p-3 text-right">
                                    <Link
                                        className="mb-2 mr-2 inline-flex items-center rounded-lg bg-blue-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-700"
                                        href={`/calendar/admin/update/${ev.id}`}
                                    >
                                        <BsPencil />
                                    </Link>

                                    <button
                                        className="mb-2 mr-2 inline-flex items-center rounded-lg bg-red-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-red-700"
                                        onClick={() => handleDelete(ev.id)}
                                    >
                                        <BsTrash />
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    );
}

export default CalendarAdmin;
