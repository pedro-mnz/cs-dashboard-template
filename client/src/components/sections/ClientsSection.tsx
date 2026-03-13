// ClientsSection — Client Portfolio
// Design: Warm Structured Intelligence — client color-coded tabs
// Content driven by dashboard.config.ts via dashboardData.ts

import { useState } from "react";
import { clients, recommendedSolutions, formatCurrency, stageConfig } from "@/lib/dashboardData";
import { dashboardConfig } from "@/lib/dashboard.config";
import { workplacePosts, wpClientColors, workplaceSearchUrls } from "@/lib/workplaceData";
import { Briefcase, Target, Globe, TrendingUp, ExternalLink, ThumbsUp, Eye, MessageSquare, Tag, FileText, Sheet, Presentation, FolderOpen, Link2, Image, Video, FileArchive, Plus, Trash2, Loader2 } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

// ─── Helpers shared by the widget ────────────────────────────────────────────
const MAT_TYPES = ["doc","sheet","slides","pdf","image","video","folder","link"] as const;
type MatType = typeof MAT_TYPES[number];

function matIcon(type: string) {
  if (type === "doc") return <FileText size={13} className="flex-shrink-0" />;
  if (type === "sheet") return <Sheet size={13} className="flex-shrink-0" />;
  if (type === "slides") return <Presentation size={13} className="flex-shrink-0" />;
  if (type === "folder") return <FolderOpen size={13} className="flex-shrink-0" />;
  if (type === "pdf") return <FileArchive size={13} className="flex-shrink-0" />;
  if (type === "image") return <Image size={13} className="flex-shrink-0" />;
  if (type === "video") return <Video size={13} className="flex-shrink-0" />;
  return <Link2 size={13} className="flex-shrink-0" />;
}
function matTypeLabel(type: string) {
  const labels: Record<string, string> = {
    doc: "Google Doc", sheet: "Google Sheet", slides: "Google Slides",
    folder: "Folder", pdf: "PDF", image: "Image", video: "Video", link: "Link",
  };
  return labels[type] ?? type;
}
function matColor(type: string) {
  if (type === "doc") return { bg: "#EBF4FF", color: "#1D4ED8" };
  if (type === "sheet") return { bg: "#ECFDF5", color: "#166534" };
  if (type === "slides") return { bg: "#FFF7ED", color: "#C2410C" };
  if (type === "folder") return { bg: "#F5F3FF", color: "#6D28D9" };
  if (type === "pdf") return { bg: "#FEF2F2", color: "#B91C1C" };
  if (type === "image") return { bg: "#F0FDF4", color: "#15803D" };
  if (type === "video") return { bg: "#FFF1F2", color: "#BE123C" };
  return { bg: "#F9FAFB", color: "#374151" };
}

// ─── Live editable Client Materials widget ────────────────────────────────────
function ClientMaterialsWidget({ clientId, clientColor }: { clientId: string; clientColor: string }) {
  const utils = trpc.useUtils();
  const { data: materials = [], isLoading } = trpc.clientMaterials.list.useQuery({ clientId });

  // Add form state
  const [showAdd, setShowAdd] = useState(false);
  const [newLabel, setNewLabel] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [newType, setNewType] = useState<MatType>("link");

  const addMut = trpc.clientMaterials.add.useMutation({
    onMutate: async (input) => {
      await utils.clientMaterials.list.cancel({ clientId });
      const prev = utils.clientMaterials.list.getData({ clientId });
      utils.clientMaterials.list.setData({ clientId }, (old) => [
        ...(old ?? []),
        { id: -1, clientId, userId: 0, label: input.label, url: input.url, type: input.type, sortOrder: 0, createdAt: new Date(), updatedAt: new Date() },
      ]);
      return { prev };
    },
    onError: (_e, _v, ctx) => {
      utils.clientMaterials.list.setData({ clientId }, ctx?.prev);
      toast.error("Failed to add material");
    },
    onSuccess: () => {
      utils.clientMaterials.list.invalidate({ clientId });
      setNewLabel(""); setNewUrl(""); setNewType("link"); setShowAdd(false);
      toast.success("Material added!");
    },
  });

  const removeMut = trpc.clientMaterials.remove.useMutation({
    onMutate: async ({ id }) => {
      await utils.clientMaterials.list.cancel({ clientId });
      const prev = utils.clientMaterials.list.getData({ clientId });
      utils.clientMaterials.list.setData({ clientId }, (old) => (old ?? []).filter((m) => m.id !== id));
      return { prev };
    },
    onError: (_e, _v, ctx) => {
      utils.clientMaterials.list.setData({ clientId }, ctx?.prev);
      toast.error("Failed to remove material");
    },
    onSuccess: () => utils.clientMaterials.list.invalidate({ clientId }),
  });

  const handleAdd = () => {
    if (!newLabel.trim() || !newUrl.trim()) { toast.error("Label and URL are required"); return; }
    try { new URL(newUrl); } catch { toast.error("Please enter a valid URL"); return; }
    addMut.mutate({ clientId, label: newLabel.trim(), url: newUrl.trim(), type: newType });
  };

  return (
    <div className="metric-card animate-fade-in-up delay-325">
      <div className="section-header">
        <h3 className="section-title flex items-center gap-2">
          <FolderOpen size={14} style={{ color: clientColor }} />
          Client Materials
        </h3>
        <button
          type="button"
          onClick={() => setShowAdd((v) => !v)}
          className="flex items-center gap-1 text-xs font-medium hover:opacity-70 transition-opacity"
          style={{ color: clientColor }}
        >
          <Plus size={11} />
          Add material
        </button>
      </div>

      {/* Add form */}
      {showAdd && (
        <div className="mb-3 p-3 rounded-lg border bg-gray-50 flex flex-col gap-2" style={{ borderColor: `${clientColor}30` }}>
          <div className="flex gap-2 flex-wrap">
            <select
              value={newType}
              onChange={(e) => setNewType(e.target.value as MatType)}
              className="border border-gray-300 rounded-md px-2 py-1.5 text-xs focus:outline-none focus:ring-2 w-28 flex-shrink-0 bg-white"
            >
              {MAT_TYPES.map((t) => (
                <option key={t} value={t}>{matTypeLabel(t)}</option>
              ))}
            </select>
            <input
              value={newLabel}
              onChange={(e) => setNewLabel(e.target.value)}
              placeholder="Label (e.g. Account Brief)"
              className="border border-gray-300 rounded-md px-2 py-1.5 text-xs flex-1 min-w-[120px] focus:outline-none focus:ring-2 bg-white"
            />
          </div>
          <div className="flex gap-2">
            <input
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
              placeholder="https://drive.google.com/... or any URL"
              className="border border-gray-300 rounded-md px-2 py-1.5 text-xs flex-1 focus:outline-none focus:ring-2 bg-white"
              onKeyDown={(e) => e.key === "Enter" && handleAdd()}
            />
            <button
              type="button"
              onClick={handleAdd}
              disabled={addMut.isPending}
              className="flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-medium text-white transition-opacity hover:opacity-80 disabled:opacity-50 flex-shrink-0"
              style={{ background: clientColor }}
            >
              {addMut.isPending ? <Loader2 size={11} className="animate-spin" /> : <Plus size={11} />}
              Add
            </button>
            <button type="button" onClick={() => setShowAdd(false)} className="text-xs text-gray-400 hover:text-gray-600 px-1">Cancel</button>
          </div>
        </div>
      )}

      {isLoading ? (
        <div className="flex items-center justify-center py-6">
          <Loader2 size={18} className="animate-spin opacity-40" style={{ color: clientColor }} />
        </div>
      ) : materials.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-6 text-center">
          <FolderOpen size={28} className="mb-2 opacity-20" style={{ color: clientColor }} />
          <p className="text-xs text-muted-foreground font-medium">No materials yet.</p>
          <p className="text-xs text-muted-foreground mt-1 max-w-xs">
            Attach anything — Docs, Sheets, Slides, PDFs, images, videos, Figma files, Notion pages, external links, you name it.
            Click <strong>Add material</strong> above to get started.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
          {materials.map((mat) => {
            const { bg, color } = matColor(mat.type);
            return (
              <div
                key={mat.id}
                className="flex items-center gap-2.5 p-3 rounded-lg border transition-all hover:shadow-sm group"
                style={{ borderColor: `${clientColor}20`, background: "white" }}
              >
                <a
                  href={mat.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 flex-1 min-w-0"
                >
                  <span className="flex items-center justify-center w-7 h-7 rounded-md flex-shrink-0" style={{ background: bg, color }}>
                    {matIcon(mat.type)}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold text-foreground truncate" style={{ fontFamily: "'Montserrat', sans-serif" }}>{mat.label}</p>
                    <p className="text-xs text-muted-foreground">{matTypeLabel(mat.type)}</p>
                  </div>
                  <ExternalLink size={11} className="flex-shrink-0 opacity-0 group-hover:opacity-60 transition-opacity" style={{ color: clientColor }} />
                </a>
                <button
                  type="button"
                  onClick={() => removeMut.mutate({ id: mat.id })}
                  disabled={removeMut.isPending}
                  className="flex-shrink-0 opacity-0 group-hover:opacity-60 hover:opacity-100 transition-opacity text-red-400 hover:text-red-600 ml-1"
                  title="Remove"
                >
                  <Trash2 size={11} />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

interface ClientsSectionProps {
  activeClient: string | null;
  onClientChange: (id: string) => void;
}

export default function ClientsSection({ activeClient, onClientChange }: ClientsSectionProps) {
  const defaultId = clients[0]?.id ?? "";
  const selectedId = activeClient || defaultId;
  const client = clients.find((c) => c.id === selectedId) ?? clients[0];
  const clientRS = recommendedSolutions.filter((rs) => rs.clientId === selectedId);

  // Workplace posts for this client (keyed by client id)
  const posts = workplacePosts.filter((p) => p.client === selectedId);
  const wpColors = wpClientColors[selectedId] ?? { color: client?.color ?? "#666", bg: "#F5F5F5", border: "#E0E0E0" };
  const wpSearchUrl = workplaceSearchUrls[selectedId] ?? `https://fb.workplace.com/search/posts/?q=${encodeURIComponent(client?.name ?? "")}`;

  if (!client) return null;

  return (
    <div className="space-y-6" id={`client-card-${selectedId}`}>
      {/* Header */}
      <div className="animate-fade-in-up">
        <h2 className="text-xl font-bold text-foreground mb-1" style={{ fontFamily: "'Montserrat', sans-serif" }}>
          Client Workplace Content
        </h2>
        <p className="text-sm text-muted-foreground">Dedicated client portfolio · {dashboardConfig.unidash.quarter}</p>
      </div>

      {/* Client Tabs */}
      <div className="flex gap-2 flex-wrap animate-fade-in-up delay-50">
        {clients.map((c) => (
          <button
            key={c.id}
            onClick={() => onClientChange(c.id)}
            className="client-tab transition-all duration-200"
            style={{
              background: selectedId === c.id ? c.color : c.lightColor,
              color: selectedId === c.id ? "white" : c.color,
              border: `1px solid ${c.color}40`,
              fontFamily: "'Montserrat', sans-serif",
            }}
          >
            <span>{c.logo}</span>
            <span>{c.shortName}</span>
            {selectedId === c.id && (
              <span
                className="text-xs px-1.5 py-0.5 rounded-full font-bold"
                style={{ background: "rgba(255,255,255,0.25)", color: "white" }}
              >
                {c.tier}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Client Overview Card */}
      <div
        className="rounded-xl p-6 animate-fade-in-up delay-100"
        style={{
          background: `linear-gradient(135deg, ${client.lightColor} 0%, white 60%)`,
          border: `1px solid ${client.color}30`,
          borderLeft: `4px solid ${client.color}`,
        }}
      >
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl">{client.logo}</span>
              <div>
                <h3 className="text-lg font-bold" style={{ fontFamily: "'Montserrat', sans-serif", color: client.color }}>
                  {client.name}
                </h3>
                <p className="text-xs text-muted-foreground">{client.csServiceLevel} · Tier {client.tier}</p>
              </div>
            </div>
            <p className="text-sm text-foreground/80 leading-relaxed max-w-2xl">{client.summary}</p>
          </div>
          <div className="text-right flex-shrink-0">
            {client.totalAR > 0 && (
              <>
                <p className="text-2xl font-bold font-mono-data" style={{ color: client.color }}>
                  {formatCurrency(client.totalAR)}
                </p>
                <p className="text-xs text-muted-foreground">Brazil AR Headroom</p>
              </>
            )}
            {client.globalAR != null && client.globalAR > 0 && (
              <>
                <p className="text-sm font-semibold font-mono-data mt-1" style={{ color: client.color }}>
                  {formatCurrency(client.globalAR)}
                </p>
                <p className="text-xs text-muted-foreground">Global AR</p>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Two-column: Projects + RS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Projects */}
        <div className="metric-card animate-fade-in-up delay-150">
          <div className="section-header">
            <h3 className="section-title flex items-center gap-2">
              <Briefcase size={14} style={{ color: client.color }} />
              Active Projects
            </h3>
          </div>
          <div className="space-y-3">
            {client.activeProjects.length > 0 ? (
              client.activeProjects.map((projectName, i) => (
                <div
                  key={i}
                  className="p-3 rounded-lg border transition-colors"
                  style={{ borderColor: `${client.color}20`, background: i === 0 ? client.lightColor : "transparent" }}
                >
                  <p className="text-sm font-semibold text-foreground" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                    {projectName}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-xs text-muted-foreground italic">No active projects — update after next data refresh.</p>
            )}
          </div>
        </div>

        {/* RS Pipeline */}
        <div className="metric-card animate-fade-in-up delay-200">
          <div className="section-header">
            <h3 className="section-title flex items-center gap-2">
              <Target size={14} style={{ color: client.color }} />
              RS Pipeline
            </h3>
            <span className="text-xs text-muted-foreground">{clientRS.length} initiatives</span>
          </div>
          <div className="space-y-2">
            {clientRS.length > 0 ? (
              clientRS.map((rs) => {
                const stage = stageConfig[rs.stage];
                return (
                  <div key={rs.id} className="flex items-center justify-between gap-3 py-2 border-b last:border-0" style={{ borderColor: "oklch(0.96 0.003 75)" }}>
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="stage-badge flex-shrink-0" style={{ background: stage?.bg, color: stage?.color }}>
                        <span className="w-1.5 h-1.5 rounded-full" style={{ background: stage?.dot }} />
                        {stage?.label}
                      </span>
                      <p className="text-xs text-foreground/80 truncate">{rs.rsName}</p>
                    </div>
                    <p className="text-xs font-bold font-mono-data flex-shrink-0" style={{ color: client.color }}>
                      {formatCurrency(rs.arHeadroom)}
                    </p>
                  </div>
                );
              })
            ) : (
              <p className="text-xs text-muted-foreground italic">No RS data — update after next data refresh.</p>
            )}
          </div>
        </div>
      </div>

      {/* Focus Areas + Contacts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="metric-card animate-fade-in-up delay-250">
          <div className="section-header">
            <h3 className="section-title flex items-center gap-2">
              <TrendingUp size={14} style={{ color: client.color }} />
              {dashboardConfig.unidash.quarter} Focus Areas
            </h3>
          </div>
          <p className="text-xs text-muted-foreground italic">Focus areas are populated during the next Manus data refresh.</p>
        </div>

        <div className="metric-card animate-fade-in-up delay-300">
          <div className="section-header">
            <h3 className="section-title flex items-center gap-2">
              <Globe size={14} style={{ color: client.color }} />
              Contacts
            </h3>
          </div>
          <div className="p-3 rounded-lg" style={{ background: client.lightColor }}>
            <p className="text-xs font-semibold mb-1" style={{ color: client.color, fontFamily: "'Montserrat', sans-serif" }}>
              Meeting Cadence
            </p>
            <p className="text-xs text-foreground/70">{client.contacts.meetingCadence}</p>
          </div>
          <div className="mt-3 p-3 rounded-lg" style={{ background: "oklch(0.97 0.003 75)" }}>
            <p className="text-xs font-semibold mb-1 text-foreground/60" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Internal Contacts
            </p>
            <p className="text-xs text-foreground/70">{client.contacts.internal}</p>
          </div>
        </div>
      </div>

      {/* Client Materials — live DB-backed */}
      <ClientMaterialsWidget clientId={selectedId} clientColor={client.color} />

      {/* Workplace Posts */}
      <div className="metric-card animate-fade-in-up delay-350">
        <div className="section-header">
          <h3 className="section-title flex items-center gap-2">
            <span style={{ fontSize: 14 }}>💼</span>
            Workplace Updates
          </h3>
          <a
            href={wpSearchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs font-medium hover:opacity-70 transition-opacity"
            style={{ color: client.color }}
          >
            <ExternalLink size={11} />
            Open Workplace
          </a>
        </div>
        <div className="space-y-3 mt-2">
          {posts.length > 0 ? (
            posts.map((post) => (
              <div
                key={post.id}
                className="rounded-xl p-4 border transition-colors hover:shadow-sm"
                style={{ borderColor: wpColors.border, background: post.isRecent ? wpColors.bg : "oklch(0.99 0.001 75)" }}
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      {post.isRecent && (
                        <span className="text-xs px-2 py-0.5 rounded-full font-bold" style={{ background: wpColors.color, color: "white", fontSize: "10px" }}>NEW</span>
                      )}
                      {post.pedroTagged && (
                        <span className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: "#EDE9FE", color: "#7C3AED", fontSize: "10px" }}>
                          <Tag size={9} /> Tagged
                        </span>
                      )}
                      {post.pedroReacted && (
                        <span className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: "#ECFDF5", color: "#059669", fontSize: "10px" }}>
                          <ThumbsUp size={9} /> Reacted
                        </span>
                      )}
                    </div>
                    <p className="text-sm font-bold text-foreground leading-snug" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                      {post.title}
                    </p>
                  </div>
                  <span className="text-xs text-muted-foreground flex-shrink-0">{post.dateLabel}</span>
                </div>
                <p className="text-xs text-foreground/70 leading-relaxed mb-3">{post.summary}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <ThumbsUp size={11} /> {post.reactions}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Eye size={11} /> {post.views}
                    </span>
                    {post.comments !== undefined && (
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <MessageSquare size={11} /> {post.comments}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <p className="text-xs text-muted-foreground">{post.author} · </p>
                    <p className="text-xs font-medium" style={{ color: client.color }}>{post.group}</p>
                  </div>
                </div>
                {post.tags.length > 0 && (
                  <div className="flex gap-1.5 mt-2 flex-wrap">
                    {post.tags.map((tag) => (
                      <span key={tag} className="text-xs px-2 py-0.5 rounded-full" style={{ background: wpColors.bg, color: wpColors.color, fontSize: "10px" }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-xs text-muted-foreground italic">No Workplace posts yet — they will appear after the next data refresh.</p>
          )}
        </div>
        <p className="text-xs text-muted-foreground mt-3 pt-3 border-t" style={{ borderColor: "oklch(0.92 0.004 75)" }}>
          Data from Workplace · Last updated {new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })} · Refreshed daily at {dashboardConfig.schedule.dailyRefreshTime} BRT
        </p>
      </div>
    </div>
  );
}
