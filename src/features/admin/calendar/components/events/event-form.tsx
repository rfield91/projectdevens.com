"use client";

import { Stack } from "@/components/stack/stack";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
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
import { Textarea } from "@/components/ui/textarea";
import { eventFormSchema } from "@/features/admin/calendar/schemas/event";
import { cn } from "@/lib/utils";
import { Club, Event, EventType } from "@/types/calendar/calendar";
import { zodResolver } from "@hookform/resolvers/zod";
import { format, startOfDay, toDate } from "date-fns";
import { CalendarIcon, TrashIcon } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";

type EventFormProps = {
  event?: Event;
  eventTypes: EventType[];
  clubs: Club[];
};

export function EventForm({ event, eventTypes, clubs }: EventFormProps) {
  const form = useForm<z.infer<typeof eventFormSchema>>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: {
      singleDay: true,
      startDate: startOfDay(new Date()),
      startTime: "07:00",
      endTime: "17:00",
      timezone: "America/New_York",
      title: "",
      url: "",
      description: "",
    },
  });

  const isSingleDay = form.watch("singleDay");

  const timezones = [
    {
      code: "America/New_York",
      display: "Eastern",
    },
    {
      code: "America/Chicago",
      display: "Central",
    },
    {
      code: "America/Los_Angeles",
      display: "Pacific",
    },
  ];

  async function onSubmit(values: z.infer<typeof eventFormSchema>) {
    console.log("submit", values);
    const startDate = toDate(
      `${values.startDate} ${values.startTime} ${values.timezone}`
    );

    console.log(startDate);
  }

  function handleDelete() {
    if (event !== undefined) {
      // delete
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Stack>
          <FormField
            control={form.control}
            name="typeId"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Format</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {eventTypes.map((eventType) => (
                      <SelectItem
                        key={eventType.typeId}
                        value={eventType.typeId}
                      >
                        {eventType.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="clubId"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Club</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {clubs.map((club) => (
                      <SelectItem key={club.clubId} value={club.clubId}>
                        {club.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="singleDay"
            render={({ field }) => (
              <FormItem className="flex flex-row gap-2 items-center space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>Single Day Event?</FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-3 gap-2">
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
                        disabled={(date) => date < startOfDay(new Date())}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            {!isSingleDay && (
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
                          disabled={(date) => date < startOfDay(new Date())}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </div>

          <div className="grid grid-cols-3 gap-2">
            <FormField
              control={form.control}
              name="startTime"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Start Time</FormLabel>
                  <Input
                    type="time"
                    {...field}
                    value={field.value}
                    step={60 * 60}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="endTime"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>End Time</FormLabel>
                  <Input
                    type="time"
                    {...field}
                    value={field.value}
                    step={60 * 60}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="timezone"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Timezone</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {timezones.map((timezone) => (
                        <SelectItem key={timezone.code} value={timezone.code}>
                          {timezone.display}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <Input {...field} />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>URL</FormLabel>
                <Input {...field} />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <Textarea {...field} rows={10} />
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex gap-2">
            <Button className="text-neutral-800" variant={"outline"} asChild>
              <Link href={"/admin/calendar/events"}>Cancel</Link>
            </Button>
            <Button
              disabled={form.formState.isSubmitting}
              type="submit"
              onClick={() => console.log(form.formState.errors)}
            >
              Save
            </Button>
            {event && (
              <Button
                variant="destructive"
                className="ml-auto"
                onClick={(e) => {
                  e.preventDefault();
                  handleDelete();
                }}
              >
                <TrashIcon />
              </Button>
            )}
          </div>
        </Stack>
      </form>
    </Form>
  );
}
