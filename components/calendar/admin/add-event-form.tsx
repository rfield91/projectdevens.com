"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Club, EventType } from "@/library/calendar/types";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";

type AddEventFormProps = {
  eventTypes: EventType[];
  clubs: Club[];
};

const formSchema = z.object({
  eventName: z.string().trim().min(1, {
    message: "Event Name is required",
  }),
  eventType: z.string().trim().min(1, {
    message: "Event Type is required",
  }),
  club: z.string().trim().min(1, {
    message: "Club is required",
  }),
  startDate: z.date(),
  endDate: z.date(),
  link: z.string().url(),
});

export function AddEventForm({ eventTypes, clubs }: AddEventFormProps) {
  // const eventTypeInput = useRef<HTMLInputElement>(null);
  // const clubInput = useRef<HTMLInputElement>(null);
  // const { pending } = useFormStatus();
  // const [state, formAction] = useFormState(addEvent, initialState);

  const form = useForm<z.output<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      eventName: "",
      eventType: "",
      club: "",
      startDate: new Date(Date.now()),
      endDate: new Date(Date.now()),
      link: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(console.log)} className="space-y-8">
        <div className="flex gap-2 flex-col">
          <FormField
            control={form.control}
            name="eventName"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Event Name</FormLabel>
                <FormControl>
                  <Input autoFocus {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="eventType"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Event Name</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select an event type" />
                    </SelectTrigger>
                    <SelectContent>
                      {eventTypes.map((et) => (
                        <SelectItem key={et.typeName} value={et.typeName}>
                          {et.filterText}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="club"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Club</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a club" />
                    </SelectTrigger>
                    <SelectContent>
                      {clubs.map((c) => (
                        <SelectItem key={c.clubId} value={c.clubId}>
                          {c.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Start Date</FormLabel>
                <FormControl>
                  <Input {...field} type="date" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}

          {/* <FormField
            control={form.control}
            name="endDate"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>End Date</FormLabel>
                <FormControl>
                  <Input {...field} type="date" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}

          <FormField
            control={form.control}
            name="link"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Link</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex gap-2">
          <Button variant={"outline"} asChild>
            <Link href="/calendar/admin">Cancel</Link>
          </Button>
          <Button type="submit">Add</Button>
        </div>
      </form>
    </Form>

    //   <input type="hidden" name="event-type" ref={eventTypeInput} />
    //   <input type="hidden" name="club" ref={clubInput} />

    //   <p aria-live="polite" className="sr-only">
    //     {state?.message}
    //   </p>

    //   <div className="flex space-y-2 flex-col">
    //     <div className="grid w-full items-center gap-1.5">
    //       <Label htmlFor="event-name">Event Name</Label>
    //       <Input id="event-name" name="event-name" autoFocus />
    //     </div>
    //     <div className="grid w-full items-center gap-1.5">
    //       <Label htmlFor="event-type">Event Type</Label>

    //     </div>
    //     <div className="grid w-full items-center gap-1.5">
    //       <Label htmlFor="club">Club</Label>
    //       <Select
    //         onValueChange={(v) => {
    //           if (clubInput.current) {
    //             clubInput.current.value = v;
    //           }
    //         }}
    //       >

    //       </Select>
    //     </div>
    //     <div className="grid w-full items-center grid-cols-2 gap-2">
    //       <div>
    //         <Label htmlFor="start-date">Start Date</Label>
    //         <Input id="start-date" name="start-date" type="date" />
    //       </div>
    //       <div>
    //         <Label htmlFor="end-date">End Date</Label>
    //         <Input id="end-date" name="end-date" type="date" />
    //       </div>
    //     </div>
    //     <div className="grid w-full items-center gap-1.5">
    //       <Label htmlFor="link">Link</Label>
    //       <Input id="link" name="link" />
    //     </div>
    //     <div className="flex gap-2">
    //       <Button variant={"outline"} asChild>
    //         <Link href="/calendar/admin">Cancel</Link>
    //       </Button>
    //       <Button type="submit" aria-disabled={pending}>
    //         Add
    //       </Button>
    //     </div>
    //   </div>
    // </form>
  );
}
