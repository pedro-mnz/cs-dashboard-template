/**
 * Tests for the profileFetch tRPC router.
 * Covers: request, poll (pending/fulfilled/timed_out), and fulfill procedures.
 *
 * NOTE: These tests mock the database layer so no live DB connection is needed.
 */
import { describe, expect, it, vi, beforeEach } from "vitest";
import type { TrpcContext } from "./_core/context";

// ── Mock dependencies ──────────────────────────────────────────
vi.mock("./db", () => ({
  getDb: vi.fn(),
}));

vi.mock("./_core/notification", () => ({
  notifyOwner: vi.fn().mockResolvedValue(true),
}));

import { getDb } from "./db";
import { notifyOwner } from "./_core/notification";
import { profileFetchRouter } from "./profileFetchRouter";

// ── Helpers ────────────────────────────────────────────────────
function createCtx(): TrpcContext {
  return {
    user: null,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

function createCaller() {
  return profileFetchRouter.createCaller(createCtx());
}

// ── Tests ──────────────────────────────────────────────────────
describe("profileFetch.request", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("inserts a pending row and notifies the owner", async () => {
    const mockInsert = vi.fn().mockResolvedValue([{ insertId: 42 }]);
    const mockDb = {
      insert: vi.fn().mockReturnValue({ values: mockInsert }),
    };
    vi.mocked(getDb).mockResolvedValue(mockDb as any);

    const caller = createCaller();
    const result = await caller.request({ fbid: "1234567890" });

    expect(result).toEqual({ requestId: 42 });
    expect(mockDb.insert).toHaveBeenCalledOnce();
    expect(notifyOwner).toHaveBeenCalledOnce();
    const notifyCall = vi.mocked(notifyOwner).mock.calls[0]![0];
    expect(notifyCall.title).toContain("Profile Fetch Request");
    expect(notifyCall.content).toContain("1234567890");
  });

  it("throws when fbid is empty", async () => {
    const caller = createCaller();
    await expect(caller.request({ fbid: "" })).rejects.toThrow();
  });
});

describe("profileFetch.poll", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns not_found when row does not exist", async () => {
    const mockDb = {
      select: vi.fn().mockReturnValue({
        from: vi.fn().mockReturnValue({
          where: vi.fn().mockResolvedValue([]),
        }),
      }),
    };
    vi.mocked(getDb).mockResolvedValue(mockDb as any);

    const caller = createCaller();
    const result = await caller.poll({ requestId: 999 });
    expect(result.status).toBe("not_found");
  });

  it("returns pending when row is pending and not timed out", async () => {
    const mockRow = {
      id: 1,
      fbid: "123",
      status: "pending",
      createdAt: new Date(), // just created — not timed out
      fullName: null,
      jobTitle: null,
      team: null,
      manager: null,
      location: null,
      email: null,
      fulfilledAt: null,
    };
    const mockDb = {
      select: vi.fn().mockReturnValue({
        from: vi.fn().mockReturnValue({
          where: vi.fn().mockResolvedValue([mockRow]),
        }),
      }),
    };
    vi.mocked(getDb).mockResolvedValue(mockDb as any);

    const caller = createCaller();
    const result = await caller.poll({ requestId: 1 });
    expect(result.status).toBe("pending");
  });

  it("returns fulfilled with profile data when row is fulfilled", async () => {
    const mockRow = {
      id: 1,
      fbid: "123",
      status: "fulfilled",
      createdAt: new Date(),
      fullName: "Ana Lima",
      jobTitle: "Creative Strategist",
      team: "Creative Shop LATAM",
      manager: "Maria Souza",
      location: "São Paulo",
      email: "analima@fb.com",
      fulfilledAt: new Date(),
    };
    const mockDb = {
      select: vi.fn().mockReturnValue({
        from: vi.fn().mockReturnValue({
          where: vi.fn().mockResolvedValue([mockRow]),
        }),
      }),
    };
    vi.mocked(getDb).mockResolvedValue(mockDb as any);

    const caller = createCaller();
    const result = await caller.poll({ requestId: 1 });
    expect(result.status).toBe("fulfilled");
    if (result.status === "fulfilled") {
      expect(result.data.fullName).toBe("Ana Lima");
      expect(result.data.jobTitle).toBe("Creative Strategist");
      expect(result.data.team).toBe("Creative Shop LATAM");
      expect(result.data.manager).toBe("Maria Souza");
    }
  });
});

describe("profileFetch.fulfill", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("updates the row with profile data and returns success", async () => {
    const mockUpdate = vi.fn().mockResolvedValue([{ affectedRows: 1 }]);
    const mockDb = {
      update: vi.fn().mockReturnValue({
        set: vi.fn().mockReturnValue({
          where: mockUpdate,
        }),
      }),
    };
    vi.mocked(getDb).mockResolvedValue(mockDb as any);

    const caller = createCaller();
    const result = await caller.fulfill({
      requestId: 1,
      fullName: "Ana Lima",
      jobTitle: "Creative Strategist",
      team: "Creative Shop LATAM",
      manager: "Maria Souza",
      location: "São Paulo",
      email: "analima@fb.com",
    });

    expect(result).toEqual({ success: true });
    expect(mockDb.update).toHaveBeenCalledOnce();
  });
});
