import { z } from "zod";
import { protectedProcedure, router } from "./_core/trpc";
import { getDb } from "./db";
import { clientMaterials } from "../drizzle/schema";
import { and, eq, asc } from "drizzle-orm";

const materialTypeEnum = z.enum(["doc", "sheet", "slides", "pdf", "image", "video", "folder", "link"]);

export const clientMaterialsRouter = router({
  /** List all materials for a given clientId, owned by the current user */
  list: protectedProcedure
    .input(z.object({ clientId: z.string().min(1) }))
    .query(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) return [];
      return db
        .select()
        .from(clientMaterials)
        .where(
          and(
            eq(clientMaterials.userId, ctx.user.id),
            eq(clientMaterials.clientId, input.clientId)
          )
        )
        .orderBy(asc(clientMaterials.sortOrder), asc(clientMaterials.createdAt));
    }),

  /** Add a new material */
  add: protectedProcedure
    .input(
      z.object({
        clientId: z.string().min(1),
        label: z.string().min(1).max(200),
        url: z.string().url(),
        type: materialTypeEnum,
      })
    )
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database unavailable");
      const [result] = await db.insert(clientMaterials).values({
        clientId: input.clientId,
        userId: ctx.user.id,
        label: input.label,
        url: input.url,
        type: input.type,
        sortOrder: 0,
      });
      const insertId = (result as any).insertId as number;
      const [row] = await db
        .select()
        .from(clientMaterials)
        .where(eq(clientMaterials.id, insertId));
      return row!;
    }),

  /** Update label, url, or type of an existing material */
  update: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        label: z.string().min(1).max(200).optional(),
        url: z.string().url().optional(),
        type: materialTypeEnum.optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database unavailable");
      // Verify ownership
      const [existing] = await db
        .select()
        .from(clientMaterials)
        .where(
          and(eq(clientMaterials.id, input.id), eq(clientMaterials.userId, ctx.user.id))
        );
      if (!existing) throw new Error("Material not found");

      const updates: Partial<typeof clientMaterials.$inferInsert> = {};
      if (input.label !== undefined) updates.label = input.label;
      if (input.url !== undefined) updates.url = input.url;
      if (input.type !== undefined) updates.type = input.type;

      await db
        .update(clientMaterials)
        .set(updates)
        .where(eq(clientMaterials.id, input.id));

      const [updated] = await db
        .select()
        .from(clientMaterials)
        .where(eq(clientMaterials.id, input.id));
      return updated!;
    }),

  /** Delete a material */
  remove: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database unavailable");
      // Verify ownership
      const [existing] = await db
        .select()
        .from(clientMaterials)
        .where(
          and(eq(clientMaterials.id, input.id), eq(clientMaterials.userId, ctx.user.id))
        );
      if (!existing) throw new Error("Material not found");

      await db.delete(clientMaterials).where(eq(clientMaterials.id, input.id));
      return { success: true };
    }),
});
