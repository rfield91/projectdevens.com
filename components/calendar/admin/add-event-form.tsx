"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { eventFormSchema } from "@/library/calendar/admin/schema";
import { Club, EventType } from "@/library/calendar/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { addEvent } from "./actions";

type AddEventFormProps = {
  eventTypes: EventType[];
  clubs: Club[];
};

export function AddEventForm({ eventTypes, clubs }: AddEventFormProps) {
  const form = useForm<z.output<typeof eventFormSchema>>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: {
      eventName: "",
      eventType: "",
      club: "",
      startDate: new Date(Date.now()),
      endDate: new Date(Date.now()),
      link: "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof eventFormSchema>) => {
    console.log(values);
    await addEvent(
      values.eventName,
      values.eventType,
      values.club,
      values.startDate,
      values.endDate,
      values.link
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <div className="flex gap-6 flex-col">
          <FormField
            control={form.control}
            name="eventName"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Event Name</FormLabel>
                <FormControl>
                  <Input autoFocus {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="eventType"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Event Type</FormLabel>
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
                    defaultValue={field.value.toString()}
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
              </FormItem>
            )}
          />

          <div className="flex gap-2">
            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Start Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="endDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>End Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="link"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Link</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
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
