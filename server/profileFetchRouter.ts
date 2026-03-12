import { z } from "zod";
import { eq } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import { getDb } from "./db";
import { publicProcedure, router } from "./_core/trpc";
import { profileFetchRequests } from "../drizzle/schema";
import { notifyOwner } from "./_core/notification";

/** Timeout in ms before a pending request is considered timed out (3 minutes) */
const TIMEOUT_MS = 3 * 60 * 1000;

async function requireDb() {
  const db = await getDb();
  if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database not available" });
  return db;
}

export const profileFetchRouter = router({
  /**
   * Called by the Setup Wizard when the user clicks "Fetch Profile Data".
   * Creates a pending request in the DB and notifies Manus via owner notification.
   */
  request: publicProcedure
    .input(z.object({ fbid: z.string().min(1) }))
    .mutation(async ({ input }) => {
      const db = await requireDb();
      const [result] = await db
        .insert(profileFetchRequests)
        .values({ fbid: input.fbid, status: "pending" });

      const requestId = (result as any).insertId as number;

      // Notify Manus (owner) so I can navigate to the profile and fulfill the request
      await notifyOwner({
        title: "🧑 Profile Fetch Request",
        content: `A peer has requested profile data for FBID ${input.fbid}.\n\nPlease navigate to https://www.internalfb.com/profile/view/${input.fbid} and call the fulfillProfileFetch procedure with request ID ${requestId}.\n\nDashboard: https://pedromenezesdash.manus.space/setup`,
      });

      return { requestId };
    }),

  /**
   * Polled by the Setup Wizard every 5 seconds.
   * Returns the profile data once Manus has fulfilled the request, or a timeout signal.
   */
  poll: publicProcedure
    .input(z.object({ requestId: z.number() }))
    .query(async ({ input }) => {
      const db = await requireDb();
      const rows = await db
        .select()
        .from(profileFetchRequests)
        .where(eq(profileFetchRequests.id, input.requestId));

      const row = rows[0];
      if (!row) return { status: "not_found" as const };

      // Auto-timeout after TIMEOUT_MS
      if (
        row.status === "pending" &&
        Date.now() - row.createdAt.getTime() > TIMEOUT_MS
      ) {
        await db
          .update(profileFetchRequests)
          .set({ status: "timed_out" })
          .where(eq(profileFetchRequests.id, input.requestId));
        return { status: "timed_out" as const };
      }

      if (row.status === "fulfilled") {
        return {
          status: "fulfilled" as const,
          data: {
            fullName: row.fullName ?? "",
            jobTitle: row.jobTitle ?? "",
            team: row.team ?? "",
            manager: row.manager ?? "",
            location: row.location ?? "",
            email: row.email ?? "",
          },
        };
      }

      return { status: row.status as "pending" | "timed_out" };
    }),

  /**
   * Called by the Setup Wizard when a peer can't find their name in the CS Americas list.
   * Sends a notification to Manus (owner) to add the person to the org data.
   */
  requestToBeAdded: publicProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ input }) => {
      await notifyOwner({
        title: "➕ Org Data Addition Request",
        content: `A peer typed "${input.name}" in the Setup Wizard but didn't find their name in the CS Americas autocomplete list.\n\nPlease add them to /pedro-dashboard/shared/csOrgData.ts and redeploy.`,
      });
      return { success: true };
    }),

  /**
   * Called by Manus (owner) after reading the profile page.
   * Fulfills the pending request with the scraped profile data.
   */
  fulfill: publicProcedure
    .input(
      z.object({
        requestId: z.number(),
        fullName: z.string(),
        jobTitle: z.string(),
        team: z.string(),
        manager: z.string(),
        location: z.string().optional(),
        email: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const db = await requireDb();
      await db
        .update(profileFetchRequests)
        .set({
          status: "fulfilled",
          fullName: input.fullName,
          jobTitle: input.jobTitle,
          team: input.team,
          manager: input.manager,
          location: input.location ?? null,
          email: input.email ?? null,
          fulfilledAt: new Date(),
        })
        .where(eq(profileFetchRequests.id, input.requestId));

      return { success: true };
    }),
});
