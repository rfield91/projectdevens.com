import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const calendarRouter = createTRPCRouter({
    futureEventFeed: publicProcedure.query(async ({ ctx }) => {
        const calendarEvents = await ctx.prisma.calendarEvent.findMany({
            where: {
                startDate: {
                    gte: new Date(),
                },
            },
            include: {
                club: true,
                calendarEventType: true,
            },
        });

        return calendarEvents;
    }),
    getEvent: publicProcedure
        .input(
            z.object({
                id: z.string(),
            })
        )
        .query(async ({ input, ctx }) => {
            return await ctx.prisma.calendarEvent.findFirst({
                where: {
                    id: input.id,
                },
            });
        }),
    clubs: publicProcedure.query(async ({ ctx }) => {
        return await ctx.prisma.club.findMany();
    }),
    eventTypes: publicProcedure.query(async ({ ctx }) => {
        return await ctx.prisma.calendarEventType.findMany();
    }),
    create: protectedProcedure
        .input(
            z.object({
                eventType: z.string(),
                clubCode: z.string(),
                name: z.string(),
                startDate: z.date(),
                endDate: z.date(),
                link: z.string(),
            })
        )
        .mutation(async ({ input, ctx }) => {
            const ev = await ctx.prisma.calendarEvent.create({
                data: {
                    eventType: input.eventType,
                    clubCode: input.clubCode,
                    name: input.name,
                    startDate: input.startDate,
                    endDate: input.endDate,
                    link: input.link,
                },
            });

            return ev;
        }),
    update: protectedProcedure
        .input(
            z.object({
                id: z.string(),
                eventType: z.string(),
                clubCode: z.string(),
                name: z.string(),
                startDate: z.date(),
                endDate: z.date(),
                link: z.string(),
            })
        )
        .mutation(async ({ input, ctx }) => {
            const ev = ctx.prisma.calendarEvent.update({
                where: {
                    id: input.id,
                },
                data: {
                    eventType: input.eventType,
                    clubCode: input.clubCode,
                    name: input.name,
                    startDate: input.startDate,
                    endDate: input.endDate,
                    link: input.link,
                },
            });

            return ev;
        }),
    delete: protectedProcedure
        .input(
            z.object({
                id: z.string(),
            })
        )
        .mutation(async ({ input, ctx }) => {
            const ev = ctx.prisma.calendarEvent.delete({
                where: {
                    id: input.id,
                },
            });

            return ev;
        }),
});
