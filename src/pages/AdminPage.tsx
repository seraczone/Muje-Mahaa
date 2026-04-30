import { useEffect, useMemo, useState, type ChangeEvent, type ReactNode } from "react";
import {
  Blocks,
  Copy,
  FolderKanban,
  GalleryVerticalEnd,
  HandCoins,
  ImageIcon,
  LayoutDashboard,
  MessageSquareMore,
  Palette,
  Plus,
  RefreshCcw,
  Save,
  ScrollText,
  Settings2,
  ShieldCheck,
  Target,
  Trash2,
  Undo2,
  UsersRound,
} from "lucide-react";
import { toast } from "sonner";
import { useSiteContent } from "@/contexts/SiteContentContext";
import {
  cloneSiteContent,
  contentIconOptions,
  createId,
  resolveImageSource,
  siteAssetMap,
  type ContentIconKey,
  type SiteAssetKey,
  type SiteContent,
} from "@/lib/site-content";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type Tone = "green" | "red" | "gold" | "slate";

const toneMap: Record<Tone, { border: string; bg: string; text: string; icon: string }> = {
  green: {
    border: "border-primary/20",
    bg: "from-primary/12 via-white to-primary/5",
    text: "text-primary",
    icon: "bg-primary/10 text-primary",
  },
  red: {
    border: "border-rally/20",
    bg: "from-rally/12 via-white to-rally/5",
    text: "text-rally",
    icon: "bg-rally/10 text-rally",
  },
  gold: {
    border: "border-gold/30",
    bg: "from-gold/15 via-white to-gold/5",
    text: "text-gold",
    icon: "bg-gold/10 text-gold",
  },
  slate: {
    border: "border-border",
    bg: "from-slate-100 via-white to-slate-50",
    text: "text-foreground",
    icon: "bg-secondary text-foreground",
  },
};

const sectionMeta = [
  { id: "overview", label: "Overview", icon: LayoutDashboard, tone: "green" as const },
  { id: "home", label: "Home", icon: Palette, tone: "green" as const },
  { id: "hero", label: "Hero", icon: ShieldCheck, tone: "green" as const },
  { id: "about", label: "About", icon: ScrollText, tone: "gold" as const },
  { id: "achievements", label: "Achievements", icon: FolderKanban, tone: "red" as const },
  { id: "leadership", label: "Leadership", icon: UsersRound, tone: "green" as const },
  { id: "objectives", label: "Objectives", icon: Target, tone: "gold" as const },
  { id: "gallery", label: "Gallery", icon: GalleryVerticalEnd, tone: "red" as const },
  { id: "join", label: "Join", icon: Blocks, tone: "green" as const },
  { id: "donate", label: "Donate", icon: HandCoins, tone: "gold" as const },
  { id: "contact", label: "Contact", icon: MessageSquareMore, tone: "red" as const },
];

const assetOptions = (Object.keys(siteAssetMap) as SiteAssetKey[]).map((key) => ({
  value: key,
  label: key
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" "),
}));

const Field = ({ label, children, hint }: { label: string; children: ReactNode; hint?: string }) => (
  <label className="block space-y-2">
    <span className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">{label}</span>
    {children}
    {hint && <span className="block text-xs text-muted-foreground">{hint}</span>}
  </label>
);

const SectionCard = ({
  id,
  title,
  description,
  icon: Icon,
  tone,
  children,
}: {
  id: string;
  title: string;
  description: string;
  icon: typeof LayoutDashboard;
  tone: Tone;
  children: ReactNode;
}) => {
  const styles = toneMap[tone];

  return (
    <section id={id} className={`overflow-hidden rounded-3xl border bg-gradient-to-br ${styles.border} ${styles.bg}`}>
      <div className="border-b border-border/70 px-6 py-5 lg:px-8">
        <div className="flex items-start gap-4">
          <div className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl ${styles.icon}`}>
            <Icon className={`h-6 w-6 ${styles.text}`} />
          </div>
          <div>
            <h2 className="h-section text-2xl text-foreground">{title}</h2>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">{description}</p>
          </div>
        </div>
      </div>
      <div className="space-y-6 px-6 py-6 lg:px-8">{children}</div>
    </section>
  );
};

const ItemCard = ({ title, children }: { title: string; children: ReactNode }) => (
  <div className="rounded-2xl border border-border bg-white/85 p-5 shadow-sm">
    <div className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">{title}</div>
    <div className="space-y-4">{children}</div>
  </div>
);

const listInputClass = "h-11 rounded-xl";

const ImageSourceFields = ({
  imageKey,
  imageUrl,
  onImageKeyChange,
  onImageUrlChange,
}: {
  imageKey: SiteAssetKey;
  imageUrl: string;
  onImageKeyChange: (value: SiteAssetKey) => void;
  onImageUrlChange: (value: string) => void;
}) => (
  <div className="grid gap-4 lg:grid-cols-[1fr_1fr_150px]">
    <Field label="Bundled Image">
      <select
        value={imageKey}
        onChange={(event) => onImageKeyChange(event.target.value as SiteAssetKey)}
        className="h-11 w-full rounded-xl border border-input bg-background px-3 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        {assetOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </Field>
    <Field label="External Image URL" hint="Optional. Leave blank to use the bundled asset.">
      <Input value={imageUrl} onChange={(event) => onImageUrlChange(event.target.value)} className={listInputClass} />
    </Field>
    <div className="flex items-end">
      <div className="w-full overflow-hidden rounded-2xl border border-border bg-secondary/50 p-2">
        <img
          src={resolveImageSource(imageKey, imageUrl)}
          alt="Preview"
          className="h-20 w-full rounded-xl object-cover"
        />
      </div>
    </div>
  </div>
);

const HomePreviewCard = ({
  label,
  value,
  icon: Icon,
  tone,
}: {
  label: string;
  value: string;
  icon: typeof LayoutDashboard;
  tone: Tone;
}) => {
  const styles = toneMap[tone];

  return (
    <div className={`rounded-3xl border bg-white/85 p-5 shadow-sm ${styles.border}`}>
      <div className={`inline-flex h-11 w-11 items-center justify-center rounded-2xl ${styles.icon}`}>
        <Icon className={`h-5 w-5 ${styles.text}`} />
      </div>
      <div className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">{label}</div>
      <div className="mt-2 text-sm leading-relaxed text-foreground">{value}</div>
    </div>
  );
};

const iconSelect = (
  value: ContentIconKey,
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void,
  iconToneClass: string,
) => {
  const selected = contentIconOptions.find((option) => option.value === value);
  const SelectedIcon = selected?.icon ?? ImageIcon;

  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_60px]">
      <select
        value={value}
        onChange={onChange}
        className="h-11 w-full rounded-xl border border-input bg-background px-3 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        {contentIconOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div className={`inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white ${iconToneClass}`}>
        <SelectedIcon className="h-5 w-5" />
      </div>
    </div>
  );
};

const cloneEditorContent = (value: SiteContent) => JSON.parse(JSON.stringify(value)) as SiteContent;

const AdminPage = () => {
  const { content: savedContent, setContent } = useSiteContent();
  const [draftContent, setDraftContent] = useState<SiteContent>(() => cloneEditorContent(savedContent));
  const content = draftContent;

  useEffect(() => {
    setDraftContent(cloneEditorContent(savedContent));
  }, [savedContent]);

  const hasUnsavedChanges = useMemo(
    () => JSON.stringify(draftContent) !== JSON.stringify(savedContent),
    [draftContent, savedContent],
  );

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (!hasUnsavedChanges) {
        return;
      }

      event.preventDefault();
      event.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [hasUnsavedChanges]);

  const updateSection = <K extends keyof SiteContent,>(
    key: K,
    updater: (section: SiteContent[K]) => SiteContent[K],
  ) => {
    setDraftContent((previous) => ({
      ...previous,
      [key]: updater(previous[key]),
    }));
  };

  const collectionCount =
    content.hero.stats.length +
    content.about.stats.length +
    content.achievements.tabs.reduce((total, tab) => total + tab.stats.length + tab.items.length, 0) +
    content.leadership.leaders.length +
    content.objectives.items.length +
    content.gallery.items.length +
    content.join.benefits.length +
    content.join.lgas.length +
    content.donate.presets.length +
    content.contact.cards.length;

  const handleCopySnapshot = async () => {
    await navigator.clipboard.writeText(JSON.stringify(content, null, 2));
    toast.success("Snapshot copied", {
      description: "The current editor draft JSON is now in your clipboard.",
    });
  };

  const handleSave = () => {
    setContent(cloneEditorContent(content));
    toast.success("Changes saved", {
      description: "Updated content is now live in this browser.",
    });
  };

  const handleDiscardChanges = () => {
    if (!hasUnsavedChanges) return;

    const shouldDiscard = window.confirm("Discard all unsaved changes and reload the last saved content?");
    if (!shouldDiscard) return;

    setDraftContent(cloneEditorContent(savedContent));
    toast.success("Unsaved changes discarded");
  };

  const handleReset = () => {
    const shouldReset = window.confirm("Load the default MVP copy into the editor? Click Save Changes to publish it.");
    if (!shouldReset) return;

    setDraftContent(cloneSiteContent());
    toast.success("Default content loaded", {
      description: "Review the draft, then click Save Changes to publish it.",
    });
  };

  return (
    <section className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(0,132,61,0.12),_transparent_32%),radial-gradient(circle_at_top_right,_rgba(204,0,0,0.12),_transparent_24%),linear-gradient(180deg,_#fbfbfb_0%,_#f6f7f8_100%)] py-16 lg:py-20">
      <div className="container-editorial grid gap-8 xl:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="space-y-4 xl:sticky xl:top-24 xl:self-start">
          <div className="rounded-3xl border border-primary/15 bg-white/90 p-6 shadow-sm">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Settings2 className="h-6 w-6" />
            </div>
            <div className="mt-5">
              <h1 className="h-section text-3xl text-foreground">Admin Console</h1>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Edit the draft content here, then click Save Changes to publish updates in this browser.
              </p>
            </div>

            <div
              className={`mt-5 rounded-2xl border px-4 py-3 text-sm ${
                hasUnsavedChanges
                  ? "border-gold/40 bg-gold/10 text-foreground"
                  : "border-primary/20 bg-primary/8 text-foreground"
              }`}
            >
              <div className="font-semibold uppercase tracking-[0.18em] text-xs text-muted-foreground">Editor Status</div>
              <div className="mt-2">
                {hasUnsavedChanges
                  ? "You have unsaved changes. Save them to update the public site in this browser."
                  : "All changes are saved in this browser."}
              </div>
            </div>

            <div className="mt-6 grid gap-3">
              <Button
                onClick={handleSave}
                disabled={!hasUnsavedChanges}
                className="h-11 rounded-xl bg-primary text-primary-foreground hover:bg-primary-deep disabled:opacity-60"
              >
                <Save className="h-4 w-4" />
                Save Changes
              </Button>
              <Button
                variant="outline"
                onClick={handleDiscardChanges}
                disabled={!hasUnsavedChanges}
                className="h-11 rounded-xl border-border disabled:opacity-60"
              >
                <Undo2 className="h-4 w-4" />
                Discard Unsaved Changes
              </Button>
              <Button onClick={handleCopySnapshot} className="h-11 rounded-xl bg-primary text-primary-foreground hover:bg-primary-deep">
                <Copy className="h-4 w-4" />
                Copy JSON Snapshot
              </Button>
              <Button variant="outline" onClick={handleReset} className="h-11 rounded-xl border-rally/30 text-rally hover:bg-rally/5 hover:text-rally">
                <RefreshCcw className="h-4 w-4" />
                Restore Defaults
              </Button>
            </div>
          </div>

          <div className="rounded-3xl border border-border bg-white/85 p-4 shadow-sm">
            <div className="px-2 pb-3 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Jump To Section
            </div>
            <div className="space-y-1">
              {sectionMeta.map((section) => {
                const styles = toneMap[section.tone];

                return (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
                  >
                    <span className={`inline-flex h-9 w-9 items-center justify-center rounded-xl ${styles.icon}`}>
                      <section.icon className={`h-4 w-4 ${styles.text}`} />
                    </span>
                    {section.label}
                  </a>
                );
              })}
            </div>
          </div>
        </aside>

        <div className="space-y-8">
          <SectionCard
            id="overview"
            title="MVP Readiness"
            description="This dashboard gives you direct control over the content users see on the public routes. Use it to maintain launch-ready copy, stats, leadership cards, gallery content, contact details, and donation data."
            icon={LayoutDashboard}
            tone="green"
          >
            <div className="grid gap-4 md:grid-cols-3">
              <HomePreviewCard label="Editable Sections" value="10 content groups" icon={Blocks} tone="green" />
              <HomePreviewCard label="Collection Items" value={`${collectionCount} managed entries`} icon={FolderKanban} tone="gold" />
              <HomePreviewCard
                label="Persistence"
                value={hasUnsavedChanges ? "Unsaved draft in editor" : "Saved in local storage"}
                icon={ShieldCheck}
                tone="red"
              />
            </div>
          </SectionCard>

          <SectionCard
            id="home"
            title="Home Entry Page"
            description="Control the homepage action panel that sits beneath the route cards."
            icon={Palette}
            tone="green"
          >
            <div className="grid gap-4 lg:grid-cols-2">
              <Field label="Action Eyebrow">
                <Input
                  value={content.home.actionEyebrow}
                  onChange={(event) =>
                    updateSection("home", (section) => ({ ...section, actionEyebrow: event.target.value }))
                  }
                  className={listInputClass}
                />
              </Field>
              <Field label="Action Heading">
                <Textarea
                  value={content.home.actionHeading}
                  onChange={(event) =>
                    updateSection("home", (section) => ({ ...section, actionHeading: event.target.value }))
                  }
                  className="min-h-[110px] rounded-2xl"
                />
              </Field>
              <Field label="Action Description">
                <Textarea
                  value={content.home.actionDescription}
                  onChange={(event) =>
                    updateSection("home", (section) => ({ ...section, actionDescription: event.target.value }))
                  }
                  className="min-h-[140px] rounded-2xl"
                />
              </Field>
            </div>
          </SectionCard>

          <SectionCard
            id="hero"
            title="Hero Section"
            description="Manage the hero headline, supporting copy, CTA labels, image, and stat counters."
            icon={ShieldCheck}
            tone="green"
          >
            <div className="grid gap-4 lg:grid-cols-2">
              <Field label="Eyebrow">
                <Input
                  value={content.hero.eyebrow}
                  onChange={(event) =>
                    updateSection("hero", (section) => ({ ...section, eyebrow: event.target.value }))
                  }
                  className={listInputClass}
                />
              </Field>
              <Field label="Primary CTA Label">
                <Input
                  value={content.hero.primaryCtaText}
                  onChange={(event) =>
                    updateSection("hero", (section) => ({ ...section, primaryCtaText: event.target.value }))
                  }
                  className={listInputClass}
                />
              </Field>
              <Field label="Title Lead">
                <Input
                  value={content.hero.titleLead}
                  onChange={(event) =>
                    updateSection("hero", (section) => ({ ...section, titleLead: event.target.value }))
                  }
                  className={listInputClass}
                />
              </Field>
              <Field label="Title Accent">
                <Input
                  value={content.hero.titleAccent}
                  onChange={(event) =>
                    updateSection("hero", (section) => ({ ...section, titleAccent: event.target.value }))
                  }
                  className={listInputClass}
                />
              </Field>
              <Field label="Secondary CTA Label">
                <Input
                  value={content.hero.secondaryCtaText}
                  onChange={(event) =>
                    updateSection("hero", (section) => ({ ...section, secondaryCtaText: event.target.value }))
                  }
                  className={listInputClass}
                />
              </Field>
              <Field label="Overlay Eyebrow">
                <Input
                  value={content.hero.overlayEyebrow}
                  onChange={(event) =>
                    updateSection("hero", (section) => ({ ...section, overlayEyebrow: event.target.value }))
                  }
                  className={listInputClass}
                />
              </Field>
              <Field label="Description">
                <Textarea
                  value={content.hero.description}
                  onChange={(event) =>
                    updateSection("hero", (section) => ({ ...section, description: event.target.value }))
                  }
                  className="min-h-[140px] rounded-2xl"
                />
              </Field>
              <Field label="Overlay Title">
                <Textarea
                  value={content.hero.overlayTitle}
                  onChange={(event) =>
                    updateSection("hero", (section) => ({ ...section, overlayTitle: event.target.value }))
                  }
                  className="min-h-[140px] rounded-2xl"
                />
              </Field>
            </div>

            <ImageSourceFields
              imageKey={content.hero.imageKey}
              imageUrl={content.hero.imageUrl}
              onImageKeyChange={(value) => updateSection("hero", (section) => ({ ...section, imageKey: value }))}
              onImageUrlChange={(value) => updateSection("hero", (section) => ({ ...section, imageUrl: value }))}
            />

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="h-section text-xl text-foreground">Hero Stats</h3>
                  <p className="text-sm text-muted-foreground">Add, edit, or remove the quick credibility counters.</p>
                </div>
                <Button
                  type="button"
                  onClick={() =>
                    updateSection("hero", (section) => ({
                      ...section,
                      stats: [...section.stats, { id: createId("hero-stat"), value: "", label: "" }],
                    }))
                  }
                  className="rounded-xl bg-primary text-primary-foreground hover:bg-primary-deep"
                >
                  <Plus className="h-4 w-4" />
                  Add Stat
                </Button>
              </div>
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {content.hero.stats.map((stat) => (
                  <ItemCard key={stat.id} title="Stat Item">
                    <Field label="Value">
                      <Input
                        value={stat.value}
                        onChange={(event) =>
                          updateSection("hero", (section) => ({
                            ...section,
                            stats: section.stats.map((item) =>
                              item.id === stat.id ? { ...item, value: event.target.value } : item,
                            ),
                          }))
                        }
                        className={listInputClass}
                      />
                    </Field>
                    <Field label="Label">
                      <Input
                        value={stat.label}
                        onChange={(event) =>
                          updateSection("hero", (section) => ({
                            ...section,
                            stats: section.stats.map((item) =>
                              item.id === stat.id ? { ...item, label: event.target.value } : item,
                            ),
                          }))
                        }
                        className={listInputClass}
                      />
                    </Field>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() =>
                        updateSection("hero", (section) => ({
                          ...section,
                          stats: section.stats.filter((item) => item.id !== stat.id),
                        }))
                      }
                      className="w-full rounded-xl border-rally/30 text-rally hover:bg-rally/5 hover:text-rally"
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete Stat
                    </Button>
                  </ItemCard>
                ))}
              </div>
            </div>
          </SectionCard>

          <SectionCard
            id="about"
            title="About Page"
            description="Update the core movement introduction and the supporting stat strip."
            icon={ScrollText}
            tone="gold"
          >
            <div className="grid gap-4 lg:grid-cols-2">
              <Field label="Eyebrow">
                <Input
                  value={content.about.eyebrow}
                  onChange={(event) =>
                    updateSection("about", (section) => ({ ...section, eyebrow: event.target.value }))
                  }
                  className={listInputClass}
                />
              </Field>
              <Field label="Heading">
                <Textarea
                  value={content.about.heading}
                  onChange={(event) =>
                    updateSection("about", (section) => ({ ...section, heading: event.target.value }))
                  }
                  className="min-h-[110px] rounded-2xl"
                />
              </Field>
              <Field label="Primary Paragraph">
                <Textarea
                  value={content.about.bodyPrimary}
                  onChange={(event) =>
                    updateSection("about", (section) => ({ ...section, bodyPrimary: event.target.value }))
                  }
                  className="min-h-[150px] rounded-2xl"
                />
              </Field>
              <Field label="Secondary Paragraph">
                <Textarea
                  value={content.about.bodySecondary}
                  onChange={(event) =>
                    updateSection("about", (section) => ({ ...section, bodySecondary: event.target.value }))
                  }
                  className="min-h-[150px] rounded-2xl"
                />
              </Field>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="h-section text-xl text-foreground">About Stats</h3>
                  <p className="text-sm text-muted-foreground">Manage the proof points beneath the introduction.</p>
                </div>
                <Button
                  type="button"
                  onClick={() =>
                    updateSection("about", (section) => ({
                      ...section,
                      stats: [...section.stats, { id: createId("about-stat"), value: "", label: "" }],
                    }))
                  }
                  className="rounded-xl bg-gold/90 text-black hover:bg-gold"
                >
                  <Plus className="h-4 w-4" />
                  Add Stat
                </Button>
              </div>
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {content.about.stats.map((stat) => (
                  <ItemCard key={stat.id} title="Stat Item">
                    <Field label="Value">
                      <Input
                        value={stat.value}
                        onChange={(event) =>
                          updateSection("about", (section) => ({
                            ...section,
                            stats: section.stats.map((item) =>
                              item.id === stat.id ? { ...item, value: event.target.value } : item,
                            ),
                          }))
                        }
                        className={listInputClass}
                      />
                    </Field>
                    <Field label="Label">
                      <Input
                        value={stat.label}
                        onChange={(event) =>
                          updateSection("about", (section) => ({
                            ...section,
                            stats: section.stats.map((item) =>
                              item.id === stat.id ? { ...item, label: event.target.value } : item,
                            ),
                          }))
                        }
                        className={listInputClass}
                      />
                    </Field>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() =>
                        updateSection("about", (section) => ({
                          ...section,
                          stats: section.stats.filter((item) => item.id !== stat.id),
                        }))
                      }
                      className="w-full rounded-xl border-rally/30 text-rally hover:bg-rally/5 hover:text-rally"
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete Stat
                    </Button>
                  </ItemCard>
                ))}
              </div>
            </div>
          </SectionCard>

          <SectionCard
            id="achievements"
            title="Achievements Page"
            description="Control the overall heading plus both tabbed records. Each tab supports its own theme, stats, and feature cards."
            icon={FolderKanban}
            tone="red"
          >
            <div className="grid gap-4 lg:grid-cols-3">
              <Field label="Eyebrow">
                <Input
                  value={content.achievements.eyebrow}
                  onChange={(event) =>
                    updateSection("achievements", (section) => ({ ...section, eyebrow: event.target.value }))
                  }
                  className={listInputClass}
                />
              </Field>
              <Field label="Heading">
                <Input
                  value={content.achievements.heading}
                  onChange={(event) =>
                    updateSection("achievements", (section) => ({ ...section, heading: event.target.value }))
                  }
                  className={listInputClass}
                />
              </Field>
              <Field label="Intro">
                <Textarea
                  value={content.achievements.intro}
                  onChange={(event) =>
                    updateSection("achievements", (section) => ({ ...section, intro: event.target.value }))
                  }
                  className="min-h-[110px] rounded-2xl"
                />
              </Field>
            </div>

            <div className="space-y-6">
              {content.achievements.tabs.map((tab) => (
                <div key={tab.id} className="rounded-3xl border border-border bg-white/80 p-5 shadow-sm">
                  <div className="grid gap-4 lg:grid-cols-2">
                    <Field label={`${tab.label} Tab Label`}>
                      <Input
                        value={tab.label}
                        onChange={(event) =>
                          updateSection("achievements", (section) => ({
                            ...section,
                            tabs: section.tabs.map((item) =>
                              item.id === tab.id ? { ...item, label: event.target.value } : item,
                            ),
                          }))
                        }
                        className={listInputClass}
                      />
                    </Field>
                    <Field label="Badge Label">
                      <Input
                        value={tab.badgeLabel}
                        onChange={(event) =>
                          updateSection("achievements", (section) => ({
                            ...section,
                            tabs: section.tabs.map((item) =>
                              item.id === tab.id ? { ...item, badgeLabel: event.target.value } : item,
                            ),
                          }))
                        }
                        className={listInputClass}
                      />
                    </Field>
                    <Field label="Title">
                      <Input
                        value={tab.title}
                        onChange={(event) =>
                          updateSection("achievements", (section) => ({
                            ...section,
                            tabs: section.tabs.map((item) =>
                              item.id === tab.id ? { ...item, title: event.target.value } : item,
                            ),
                          }))
                        }
                        className={listInputClass}
                      />
                    </Field>
                    <Field label="Theme">
                      <select
                        value={tab.theme}
                        onChange={(event) =>
                          updateSection("achievements", (section) => ({
                            ...section,
                            tabs: section.tabs.map((item) =>
                              item.id === tab.id
                                ? { ...item, theme: event.target.value as "primary" | "rally" }
                                : item,
                            ),
                          }))
                        }
                        className="h-11 w-full rounded-xl border border-input bg-background px-3 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        <option value="primary">Primary Green Theme</option>
                        <option value="rally">Rally Red Theme</option>
                      </select>
                    </Field>
                    <Field label="Subtitle">
                      <Textarea
                        value={tab.subtitle}
                        onChange={(event) =>
                          updateSection("achievements", (section) => ({
                            ...section,
                            tabs: section.tabs.map((item) =>
                              item.id === tab.id ? { ...item, subtitle: event.target.value } : item,
                            ),
                          }))
                        }
                        className="min-h-[120px] rounded-2xl lg:col-span-2"
                      />
                    </Field>
                  </div>

                  <div className="mt-6 grid gap-6 xl:grid-cols-2">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="h-section text-lg text-foreground">Stats</h4>
                        <Button
                          type="button"
                          onClick={() =>
                            updateSection("achievements", (section) => ({
                              ...section,
                              tabs: section.tabs.map((item) =>
                                item.id === tab.id
                                  ? {
                                      ...item,
                                      stats: [...item.stats, { id: createId(`${tab.id}-stat`), value: "", label: "" }],
                                    }
                                  : item,
                              ),
                            }))
                          }
                          className="rounded-xl bg-primary text-primary-foreground hover:bg-primary-deep"
                        >
                          <Plus className="h-4 w-4" />
                          Add Stat
                        </Button>
                      </div>
                      <div className="space-y-4">
                        {tab.stats.map((stat) => (
                          <ItemCard key={stat.id} title="Stat Entry">
                            <Field label="Value">
                              <Input
                                value={stat.value}
                                onChange={(event) =>
                                  updateSection("achievements", (section) => ({
                                    ...section,
                                    tabs: section.tabs.map((item) =>
                                      item.id === tab.id
                                        ? {
                                            ...item,
                                            stats: item.stats.map((entry) =>
                                              entry.id === stat.id ? { ...entry, value: event.target.value } : entry,
                                            ),
                                          }
                                        : item,
                                    ),
                                  }))
                                }
                                className={listInputClass}
                              />
                            </Field>
                            <Field label="Label">
                              <Input
                                value={stat.label}
                                onChange={(event) =>
                                  updateSection("achievements", (section) => ({
                                    ...section,
                                    tabs: section.tabs.map((item) =>
                                      item.id === tab.id
                                        ? {
                                            ...item,
                                            stats: item.stats.map((entry) =>
                                              entry.id === stat.id ? { ...entry, label: event.target.value } : entry,
                                            ),
                                          }
                                        : item,
                                    ),
                                  }))
                                }
                                className={listInputClass}
                              />
                            </Field>
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() =>
                                updateSection("achievements", (section) => ({
                                  ...section,
                                  tabs: section.tabs.map((item) =>
                                    item.id === tab.id
                                      ? { ...item, stats: item.stats.filter((entry) => entry.id !== stat.id) }
                                      : item,
                                  ),
                                }))
                              }
                              className="w-full rounded-xl border-rally/30 text-rally hover:bg-rally/5 hover:text-rally"
                            >
                              <Trash2 className="h-4 w-4" />
                              Delete Stat
                            </Button>
                          </ItemCard>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="h-section text-lg text-foreground">Achievement Cards</h4>
                        <Button
                          type="button"
                          onClick={() =>
                            updateSection("achievements", (section) => ({
                              ...section,
                              tabs: section.tabs.map((item) =>
                                item.id === tab.id
                                  ? {
                                      ...item,
                                      items: [
                                        ...item.items,
                                        {
                                          id: createId(`${tab.id}-item`),
                                          icon: "trending-up",
                                          title: "",
                                          text: "",
                                        },
                                      ],
                                    }
                                  : item,
                              ),
                            }))
                          }
                          className="rounded-xl bg-rally text-destructive-foreground hover:bg-rally/90"
                        >
                          <Plus className="h-4 w-4" />
                          Add Card
                        </Button>
                      </div>
                      <div className="space-y-4">
                        {tab.items.map((item) => (
                          <ItemCard key={item.id} title="Achievement Card">
                            <Field label="Icon">
                              {iconSelect(
                                item.icon,
                                (event) =>
                                  updateSection("achievements", (section) => ({
                                    ...section,
                                    tabs: section.tabs.map((entry) =>
                                      entry.id === tab.id
                                        ? {
                                            ...entry,
                                            items: entry.items.map((card) =>
                                              card.id === item.id
                                                ? { ...card, icon: event.target.value as ContentIconKey }
                                                : card,
                                            ),
                                          }
                                        : entry,
                                    ),
                                  })),
                                tab.theme === "primary" ? "text-primary" : "text-rally",
                              )}
                            </Field>
                            <Field label="Title">
                              <Input
                                value={item.title}
                                onChange={(event) =>
                                  updateSection("achievements", (section) => ({
                                    ...section,
                                    tabs: section.tabs.map((entry) =>
                                      entry.id === tab.id
                                        ? {
                                            ...entry,
                                            items: entry.items.map((card) =>
                                              card.id === item.id ? { ...card, title: event.target.value } : card,
                                            ),
                                          }
                                        : entry,
                                    ),
                                  }))
                                }
                                className={listInputClass}
                              />
                            </Field>
                            <Field label="Body">
                              <Textarea
                                value={item.text}
                                onChange={(event) =>
                                  updateSection("achievements", (section) => ({
                                    ...section,
                                    tabs: section.tabs.map((entry) =>
                                      entry.id === tab.id
                                        ? {
                                            ...entry,
                                            items: entry.items.map((card) =>
                                              card.id === item.id ? { ...card, text: event.target.value } : card,
                                            ),
                                          }
                                        : entry,
                                    ),
                                  }))
                                }
                                className="min-h-[130px] rounded-2xl"
                              />
                            </Field>
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() =>
                                updateSection("achievements", (section) => ({
                                  ...section,
                                  tabs: section.tabs.map((entry) =>
                                    entry.id === tab.id
                                      ? { ...entry, items: entry.items.filter((card) => card.id !== item.id) }
                                      : entry,
                                  ),
                                }))
                              }
                              className="w-full rounded-xl border-rally/30 text-rally hover:bg-rally/5 hover:text-rally"
                            >
                              <Trash2 className="h-4 w-4" />
                              Delete Card
                            </Button>
                          </ItemCard>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>

          <SectionCard
            id="leadership"
            title="Leadership, Founder, and Team"
            description="Update leadership cards, portraits, the founder quote block, and the team cards shown after the founder section."
            icon={UsersRound}
            tone="green"
          >
            <div className="grid gap-4 lg:grid-cols-2">
              <Field label="Leadership Eyebrow">
                <Input
                  value={content.leadership.eyebrow}
                  onChange={(event) =>
                    updateSection("leadership", (section) => ({ ...section, eyebrow: event.target.value }))
                  }
                  className={listInputClass}
                />
              </Field>
              <Field label="Leadership Heading">
                <Textarea
                  value={content.leadership.heading}
                  onChange={(event) =>
                    updateSection("leadership", (section) => ({ ...section, heading: event.target.value }))
                  }
                  className="min-h-[110px] rounded-2xl"
                />
              </Field>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="h-section text-xl text-foreground">Leader Cards</h3>
                  <p className="text-sm text-muted-foreground">Manage the public leadership cards and portraits.</p>
                </div>
                <Button
                  type="button"
                  onClick={() =>
                    updateSection("leadership", (section) => ({
                      ...section,
                      leaders: [
                        ...section.leaders,
                        {
                          id: createId("leader"),
                          role: "",
                          name: "",
                          desc: "",
                          imageKey: "leader-president",
                          imageUrl: "",
                        },
                      ],
                    }))
                  }
                  className="rounded-xl bg-primary text-primary-foreground hover:bg-primary-deep"
                >
                  <Plus className="h-4 w-4" />
                  Add Leader
                </Button>
              </div>
              <div className="space-y-4">
                {content.leadership.leaders.map((leader) => (
                  <ItemCard key={leader.id} title="Leader Card">
                    <div className="grid gap-4 lg:grid-cols-2">
                      <Field label="Role">
                        <Input
                          value={leader.role}
                          onChange={(event) =>
                            updateSection("leadership", (section) => ({
                              ...section,
                              leaders: section.leaders.map((item) =>
                                item.id === leader.id ? { ...item, role: event.target.value } : item,
                              ),
                            }))
                          }
                          className={listInputClass}
                        />
                      </Field>
                      <Field label="Name">
                        <Input
                          value={leader.name}
                          onChange={(event) =>
                            updateSection("leadership", (section) => ({
                              ...section,
                              leaders: section.leaders.map((item) =>
                                item.id === leader.id ? { ...item, name: event.target.value } : item,
                              ),
                            }))
                          }
                          className={listInputClass}
                        />
                      </Field>
                    </div>
                    <Field label="Description">
                      <Textarea
                        value={leader.desc}
                        onChange={(event) =>
                          updateSection("leadership", (section) => ({
                            ...section,
                            leaders: section.leaders.map((item) =>
                              item.id === leader.id ? { ...item, desc: event.target.value } : item,
                            ),
                          }))
                        }
                        className="min-h-[120px] rounded-2xl"
                      />
                    </Field>
                    <ImageSourceFields
                      imageKey={leader.imageKey}
                      imageUrl={leader.imageUrl}
                      onImageKeyChange={(value) =>
                        updateSection("leadership", (section) => ({
                          ...section,
                          leaders: section.leaders.map((item) =>
                            item.id === leader.id ? { ...item, imageKey: value } : item,
                          ),
                        }))
                      }
                      onImageUrlChange={(value) =>
                        updateSection("leadership", (section) => ({
                          ...section,
                          leaders: section.leaders.map((item) =>
                            item.id === leader.id ? { ...item, imageUrl: value } : item,
                          ),
                        }))
                      }
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() =>
                        updateSection("leadership", (section) => ({
                          ...section,
                          leaders: section.leaders.filter((item) => item.id !== leader.id),
                        }))
                      }
                      className="w-full rounded-xl border-rally/30 text-rally hover:bg-rally/5 hover:text-rally"
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete Leader
                    </Button>
                  </ItemCard>
                ))}
              </div>
            </div>

            <ItemCard title="Founder Block">
              <div className="grid gap-4 lg:grid-cols-2">
                <Field label="Founder Eyebrow">
                  <Input
                    value={content.leadership.founderEyebrow}
                    onChange={(event) =>
                      updateSection("leadership", (section) => ({
                        ...section,
                        founderEyebrow: event.target.value,
                      }))
                    }
                    className={listInputClass}
                  />
                </Field>
                <Field label="Founder Attribution">
                  <Input
                    value={content.leadership.founderAttribution}
                    onChange={(event) =>
                      updateSection("leadership", (section) => ({
                        ...section,
                        founderAttribution: event.target.value,
                      }))
                    }
                    className={listInputClass}
                  />
                </Field>
              </div>
              <Field label="Founder Quote">
                <Textarea
                  value={content.leadership.founderQuote}
                  onChange={(event) =>
                    updateSection("leadership", (section) => ({
                      ...section,
                      founderQuote: event.target.value,
                    }))
                  }
                  className="min-h-[140px] rounded-2xl"
                />
              </Field>
              <ImageSourceFields
                imageKey={content.leadership.founderImageKey}
                imageUrl={content.leadership.founderImageUrl}
                onImageKeyChange={(value) =>
                  updateSection("leadership", (section) => ({ ...section, founderImageKey: value }))
                }
                onImageUrlChange={(value) =>
                  updateSection("leadership", (section) => ({ ...section, founderImageUrl: value }))
                }
              />
            </ItemCard>

            <ItemCard title="Our Team Section">
              <div className="grid gap-4 lg:grid-cols-2">
                <Field label="Team Eyebrow">
                  <Input
                    value={content.leadership.teamEyebrow}
                    onChange={(event) =>
                      updateSection("leadership", (section) => ({
                        ...section,
                        teamEyebrow: event.target.value,
                      }))
                    }
                    className={listInputClass}
                  />
                </Field>
                <Field label="Team Heading">
                  <Textarea
                    value={content.leadership.teamHeading}
                    onChange={(event) =>
                      updateSection("leadership", (section) => ({
                        ...section,
                        teamHeading: event.target.value,
                      }))
                    }
                    className="min-h-[110px] rounded-2xl"
                  />
                </Field>
              </div>
              <Field label="Team Description">
                <Textarea
                  value={content.leadership.teamDescription}
                  onChange={(event) =>
                    updateSection("leadership", (section) => ({
                      ...section,
                      teamDescription: event.target.value,
                    }))
                  }
                  className="min-h-[140px] rounded-2xl"
                />
              </Field>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="h-section text-xl text-foreground">Team Cards</h3>
                    <p className="text-sm text-muted-foreground">
                      Manage the extra cards shown after the founder details on the leadership page.
                    </p>
                  </div>
                  <Button
                    type="button"
                    onClick={() =>
                      updateSection("leadership", (section) => ({
                        ...section,
                        teamMembers: [
                          ...section.teamMembers,
                          {
                            id: createId("team-member"),
                            role: "",
                            name: "",
                            desc: "",
                            icon: "users",
                          },
                        ],
                      }))
                    }
                    className="rounded-xl bg-primary text-primary-foreground hover:bg-primary-deep"
                  >
                    <Plus className="h-4 w-4" />
                    Add Team Card
                  </Button>
                </div>

                <div className="space-y-4">
                  {content.leadership.teamMembers.map((member) => (
                    <ItemCard key={member.id} title="Team Card">
                      <div className="grid gap-4 lg:grid-cols-2">
                        <Field label="Role">
                          <Input
                            value={member.role}
                            onChange={(event) =>
                              updateSection("leadership", (section) => ({
                                ...section,
                                teamMembers: section.teamMembers.map((item) =>
                                  item.id === member.id ? { ...item, role: event.target.value } : item,
                                ),
                              }))
                            }
                            className={listInputClass}
                          />
                        </Field>
                        <Field label="Name">
                          <Input
                            value={member.name}
                            onChange={(event) =>
                              updateSection("leadership", (section) => ({
                                ...section,
                                teamMembers: section.teamMembers.map((item) =>
                                  item.id === member.id ? { ...item, name: event.target.value } : item,
                                ),
                              }))
                            }
                            className={listInputClass}
                          />
                        </Field>
                      </div>

                      <Field label="Icon">
                        {iconSelect(
                          member.icon,
                          (event) =>
                            updateSection("leadership", (section) => ({
                              ...section,
                              teamMembers: section.teamMembers.map((item) =>
                                item.id === member.id
                                  ? { ...item, icon: event.target.value as ContentIconKey }
                                  : item,
                              ),
                            })),
                          "text-primary",
                        )}
                      </Field>

                      <Field label="Description">
                        <Textarea
                          value={member.desc}
                          onChange={(event) =>
                            updateSection("leadership", (section) => ({
                              ...section,
                              teamMembers: section.teamMembers.map((item) =>
                                item.id === member.id ? { ...item, desc: event.target.value } : item,
                              ),
                            }))
                          }
                          className="min-h-[120px] rounded-2xl"
                        />
                      </Field>

                      <Button
                        type="button"
                        variant="outline"
                        onClick={() =>
                          updateSection("leadership", (section) => ({
                            ...section,
                            teamMembers: section.teamMembers.filter((item) => item.id !== member.id),
                          }))
                        }
                        className="w-full rounded-xl border-rally/30 text-rally hover:bg-rally/5 hover:text-rally"
                      >
                        <Trash2 className="h-4 w-4" />
                        Delete Team Card
                      </Button>
                    </ItemCard>
                  ))}
                </div>
              </div>
            </ItemCard>
          </SectionCard>

          <SectionCard
            id="objectives"
            title="Objectives Section"
            description="Maintain the mission pillars shown inside the About page and their colored icons."
            icon={Target}
            tone="gold"
          >
            <div className="grid gap-4 lg:grid-cols-2">
              <Field label="Eyebrow">
                <Input
                  value={content.objectives.eyebrow}
                  onChange={(event) =>
                    updateSection("objectives", (section) => ({ ...section, eyebrow: event.target.value }))
                  }
                  className={listInputClass}
                />
              </Field>
              <Field label="Heading">
                <Textarea
                  value={content.objectives.heading}
                  onChange={(event) =>
                    updateSection("objectives", (section) => ({ ...section, heading: event.target.value }))
                  }
                  className="min-h-[110px] rounded-2xl"
                />
              </Field>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="h-section text-xl text-foreground">Objective Cards</h3>
                  <p className="text-sm text-muted-foreground">Each card supports its own icon, title, and body copy.</p>
                </div>
                <Button
                  type="button"
                  onClick={() =>
                    updateSection("objectives", (section) => ({
                      ...section,
                      items: [
                        ...section.items,
                        { id: createId("objective"), icon: "target", title: "", text: "" },
                      ],
                    }))
                  }
                  className="rounded-xl bg-gold/90 text-black hover:bg-gold"
                >
                  <Plus className="h-4 w-4" />
                  Add Objective
                </Button>
              </div>
              <div className="grid gap-4 xl:grid-cols-2">
                {content.objectives.items.map((item) => (
                  <ItemCard key={item.id} title="Objective Card">
                    <Field label="Icon">
                      {iconSelect(
                        item.icon,
                        (event) =>
                          updateSection("objectives", (section) => ({
                            ...section,
                            items: section.items.map((entry) =>
                              entry.id === item.id
                                ? { ...entry, icon: event.target.value as ContentIconKey }
                                : entry,
                            ),
                          })),
                        "text-primary",
                      )}
                    </Field>
                    <Field label="Title">
                      <Input
                        value={item.title}
                        onChange={(event) =>
                          updateSection("objectives", (section) => ({
                            ...section,
                            items: section.items.map((entry) =>
                              entry.id === item.id ? { ...entry, title: event.target.value } : entry,
                            ),
                          }))
                        }
                        className={listInputClass}
                      />
                    </Field>
                    <Field label="Body">
                      <Textarea
                        value={item.text}
                        onChange={(event) =>
                          updateSection("objectives", (section) => ({
                            ...section,
                            items: section.items.map((entry) =>
                              entry.id === item.id ? { ...entry, text: event.target.value } : entry,
                            ),
                          }))
                        }
                        className="min-h-[130px] rounded-2xl"
                      />
                    </Field>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() =>
                        updateSection("objectives", (section) => ({
                          ...section,
                          items: section.items.filter((entry) => entry.id !== item.id),
                        }))
                      }
                      className="w-full rounded-xl border-rally/30 text-rally hover:bg-rally/5 hover:text-rally"
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete Objective
                    </Button>
                  </ItemCard>
                ))}
              </div>
            </div>
          </SectionCard>

          <SectionCard
            id="gallery"
            title="Gallery Page"
            description="Curate the visual gallery labels and image sources."
            icon={GalleryVerticalEnd}
            tone="red"
          >
            <div className="grid gap-4 lg:grid-cols-2">
              <Field label="Eyebrow">
                <Input
                  value={content.gallery.eyebrow}
                  onChange={(event) =>
                    updateSection("gallery", (section) => ({ ...section, eyebrow: event.target.value }))
                  }
                  className={listInputClass}
                />
              </Field>
              <Field label="Heading">
                <Textarea
                  value={content.gallery.heading}
                  onChange={(event) =>
                    updateSection("gallery", (section) => ({ ...section, heading: event.target.value }))
                  }
                  className="min-h-[110px] rounded-2xl"
                />
              </Field>
              <Field label="Intro">
                <Textarea
                  value={content.gallery.intro}
                  onChange={(event) =>
                    updateSection("gallery", (section) => ({ ...section, intro: event.target.value }))
                  }
                  className="min-h-[120px] rounded-2xl lg:col-span-2"
                />
              </Field>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="h-section text-xl text-foreground">Gallery Items</h3>
                  <p className="text-sm text-muted-foreground">Add or remove gallery tiles and swap their images.</p>
                </div>
                <Button
                  type="button"
                  onClick={() =>
                    updateSection("gallery", (section) => ({
                      ...section,
                      items: [
                        ...section.items,
                        { id: createId("gallery"), label: "", imageKey: "gallery-1", imageUrl: "" },
                      ],
                    }))
                  }
                  className="rounded-xl bg-rally text-destructive-foreground hover:bg-rally/90"
                >
                  <Plus className="h-4 w-4" />
                  Add Image
                </Button>
              </div>
              <div className="space-y-4">
                {content.gallery.items.map((item) => (
                  <ItemCard key={item.id} title="Gallery Tile">
                    <Field label="Label">
                      <Input
                        value={item.label}
                        onChange={(event) =>
                          updateSection("gallery", (section) => ({
                            ...section,
                            items: section.items.map((entry) =>
                              entry.id === item.id ? { ...entry, label: event.target.value } : entry,
                            ),
                          }))
                        }
                        className={listInputClass}
                      />
                    </Field>
                    <ImageSourceFields
                      imageKey={item.imageKey}
                      imageUrl={item.imageUrl}
                      onImageKeyChange={(value) =>
                        updateSection("gallery", (section) => ({
                          ...section,
                          items: section.items.map((entry) =>
                            entry.id === item.id ? { ...entry, imageKey: value } : entry,
                          ),
                        }))
                      }
                      onImageUrlChange={(value) =>
                        updateSection("gallery", (section) => ({
                          ...section,
                          items: section.items.map((entry) =>
                            entry.id === item.id ? { ...entry, imageUrl: value } : entry,
                          ),
                        }))
                      }
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() =>
                        updateSection("gallery", (section) => ({
                          ...section,
                          items: section.items.filter((entry) => entry.id !== item.id),
                        }))
                      }
                      className="w-full rounded-xl border-rally/30 text-rally hover:bg-rally/5 hover:text-rally"
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete Tile
                    </Button>
                  </ItemCard>
                ))}
              </div>
            </div>
          </SectionCard>

          <SectionCard
            id="join"
            title="Join Page"
            description="Edit the supporter recruitment copy, benefits, local government list, and privacy note."
            icon={Blocks}
            tone="green"
          >
            <div className="grid gap-4 lg:grid-cols-2">
              <Field label="Eyebrow">
                <Input
                  value={content.join.eyebrow}
                  onChange={(event) =>
                    updateSection("join", (section) => ({ ...section, eyebrow: event.target.value }))
                  }
                  className={listInputClass}
                />
              </Field>
              <Field label="Heading">
                <Textarea
                  value={content.join.heading}
                  onChange={(event) =>
                    updateSection("join", (section) => ({ ...section, heading: event.target.value }))
                  }
                  className="min-h-[110px] rounded-2xl"
                />
              </Field>
              <Field label="Description">
                <Textarea
                  value={content.join.description}
                  onChange={(event) =>
                    updateSection("join", (section) => ({ ...section, description: event.target.value }))
                  }
                  className="min-h-[130px] rounded-2xl"
                />
              </Field>
              <Field label="Privacy Footer">
                <Textarea
                  value={content.join.privacyText}
                  onChange={(event) =>
                    updateSection("join", (section) => ({ ...section, privacyText: event.target.value }))
                  }
                  className="min-h-[130px] rounded-2xl"
                />
              </Field>
            </div>

            <div className="grid gap-6 xl:grid-cols-2">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="h-section text-xl text-foreground">Benefit Points</h3>
                    <p className="text-sm text-muted-foreground">These appear beside the signup form.</p>
                  </div>
                  <Button
                    type="button"
                    onClick={() =>
                      updateSection("join", (section) => ({
                        ...section,
                        benefits: [...section.benefits, { id: createId("benefit"), text: "" }],
                      }))
                    }
                    className="rounded-xl bg-primary text-primary-foreground hover:bg-primary-deep"
                  >
                    <Plus className="h-4 w-4" />
                    Add Benefit
                  </Button>
                </div>
                <div className="space-y-4">
                  {content.join.benefits.map((benefit) => (
                    <ItemCard key={benefit.id} title="Benefit">
                      <Field label="Text">
                        <Textarea
                          value={benefit.text}
                          onChange={(event) =>
                            updateSection("join", (section) => ({
                              ...section,
                              benefits: section.benefits.map((item) =>
                                item.id === benefit.id ? { ...item, text: event.target.value } : item,
                              ),
                            }))
                          }
                          className="min-h-[110px] rounded-2xl"
                        />
                      </Field>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() =>
                          updateSection("join", (section) => ({
                            ...section,
                            benefits: section.benefits.filter((item) => item.id !== benefit.id),
                          }))
                        }
                        className="w-full rounded-xl border-rally/30 text-rally hover:bg-rally/5 hover:text-rally"
                      >
                        <Trash2 className="h-4 w-4" />
                        Delete Benefit
                      </Button>
                    </ItemCard>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="h-section text-xl text-foreground">Local Government Areas</h3>
                    <p className="text-sm text-muted-foreground">Drive the dropdown in the public form.</p>
                  </div>
                  <Button
                    type="button"
                    onClick={() =>
                      updateSection("join", (section) => ({
                        ...section,
                        lgas: [...section.lgas, ""],
                      }))
                    }
                    className="rounded-xl bg-gold/90 text-black hover:bg-gold"
                  >
                    <Plus className="h-4 w-4" />
                    Add LGA
                  </Button>
                </div>
                <div className="space-y-3">
                  {content.join.lgas.map((lga, index) => (
                    <div key={`${lga}-${index}`} className="flex gap-3 rounded-2xl border border-border bg-white/85 p-3 shadow-sm">
                      <Input
                        value={lga}
                        onChange={(event) =>
                          updateSection("join", (section) => ({
                            ...section,
                            lgas: section.lgas.map((item, itemIndex) =>
                              itemIndex === index ? event.target.value : item,
                            ),
                          }))
                        }
                        className={listInputClass}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() =>
                          updateSection("join", (section) => ({
                            ...section,
                            lgas: section.lgas.filter((_, itemIndex) => itemIndex !== index),
                          }))
                        }
                        className="rounded-xl border-rally/30 text-rally hover:bg-rally/5 hover:text-rally"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </SectionCard>

          <SectionCard
            id="donate"
            title="Donate Page"
            description="Keep donation copy, bank details, preset values, and pledge note launch-ready."
            icon={HandCoins}
            tone="gold"
          >
            <div className="grid gap-4 lg:grid-cols-2">
              <Field label="Eyebrow">
                <Input
                  value={content.donate.eyebrow}
                  onChange={(event) =>
                    updateSection("donate", (section) => ({ ...section, eyebrow: event.target.value }))
                  }
                  className={listInputClass}
                />
              </Field>
              <Field label="Heading">
                <Textarea
                  value={content.donate.heading}
                  onChange={(event) =>
                    updateSection("donate", (section) => ({ ...section, heading: event.target.value }))
                  }
                  className="min-h-[110px] rounded-2xl"
                />
              </Field>
              <Field label="Description">
                <Textarea
                  value={content.donate.description}
                  onChange={(event) =>
                    updateSection("donate", (section) => ({ ...section, description: event.target.value }))
                  }
                  className="min-h-[130px] rounded-2xl"
                />
              </Field>
              <Field label="Pledge Note">
                <Textarea
                  value={content.donate.pledgeNote}
                  onChange={(event) =>
                    updateSection("donate", (section) => ({ ...section, pledgeNote: event.target.value }))
                  }
                  className="min-h-[130px] rounded-2xl"
                />
              </Field>
              <Field label="Account Name">
                <Input
                  value={content.donate.accountName}
                  onChange={(event) =>
                    updateSection("donate", (section) => ({ ...section, accountName: event.target.value }))
                  }
                  className={listInputClass}
                />
              </Field>
              <Field label="Bank Name">
                <Input
                  value={content.donate.bankName}
                  onChange={(event) =>
                    updateSection("donate", (section) => ({ ...section, bankName: event.target.value }))
                  }
                  className={listInputClass}
                />
              </Field>
              <Field label="Account Number">
                <Input
                  value={content.donate.accountNumber}
                  onChange={(event) =>
                    updateSection("donate", (section) => ({ ...section, accountNumber: event.target.value }))
                  }
                  className={listInputClass}
                />
              </Field>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="h-section text-xl text-foreground">Preset Amounts</h3>
                  <p className="text-sm text-muted-foreground">These appear as the quick donation buttons.</p>
                </div>
                <Button
                  type="button"
                  onClick={() =>
                    updateSection("donate", (section) => ({
                      ...section,
                      presets: [...section.presets, 0],
                    }))
                  }
                  className="rounded-xl bg-gold/90 text-black hover:bg-gold"
                >
                  <Plus className="h-4 w-4" />
                  Add Preset
                </Button>
              </div>
              <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                {content.donate.presets.map((preset, index) => (
                  <div key={`${preset}-${index}`} className="flex gap-3 rounded-2xl border border-border bg-white/85 p-3 shadow-sm">
                    <Input
                      type="number"
                      min={0}
                      value={preset}
                      onChange={(event) =>
                        updateSection("donate", (section) => ({
                          ...section,
                          presets: section.presets.map((item, itemIndex) =>
                            itemIndex === index ? Number(event.target.value || 0) : item,
                          ),
                        }))
                      }
                      className={listInputClass}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() =>
                        updateSection("donate", (section) => ({
                          ...section,
                          presets: section.presets.filter((_, itemIndex) => itemIndex !== index),
                        }))
                      }
                      className="rounded-xl border-rally/30 text-rally hover:bg-rally/5 hover:text-rally"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </SectionCard>

          <SectionCard
            id="contact"
            title="Contact and Footer"
            description="Manage contact cards and the summary copy that appears in the footer."
            icon={MessageSquareMore}
            tone="red"
          >
            <div className="grid gap-4 lg:grid-cols-2">
              <Field label="Eyebrow">
                <Input
                  value={content.contact.eyebrow}
                  onChange={(event) =>
                    updateSection("contact", (section) => ({ ...section, eyebrow: event.target.value }))
                  }
                  className={listInputClass}
                />
              </Field>
              <Field label="Heading">
                <Textarea
                  value={content.contact.heading}
                  onChange={(event) =>
                    updateSection("contact", (section) => ({ ...section, heading: event.target.value }))
                  }
                  className="min-h-[110px] rounded-2xl"
                />
              </Field>
              <Field label="Description">
                <Textarea
                  value={content.contact.description}
                  onChange={(event) =>
                    updateSection("contact", (section) => ({ ...section, description: event.target.value }))
                  }
                  className="min-h-[130px] rounded-2xl"
                />
              </Field>
              <Field label="Footer Summary">
                <Textarea
                  value={content.contact.footerSummary}
                  onChange={(event) =>
                    updateSection("contact", (section) => ({ ...section, footerSummary: event.target.value }))
                  }
                  className="min-h-[130px] rounded-2xl"
                />
              </Field>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="h-section text-xl text-foreground">Contact Cards</h3>
                  <p className="text-sm text-muted-foreground">Each card can point to an address, email, phone number, or any custom route.</p>
                </div>
                <Button
                  type="button"
                  onClick={() =>
                    updateSection("contact", (section) => ({
                      ...section,
                      cards: [
                        ...section.cards,
                        {
                          id: createId("contact-card"),
                          title: "",
                          icon: "mail",
                          text: "",
                          href: "",
                        },
                      ],
                    }))
                  }
                  className="rounded-xl bg-rally text-destructive-foreground hover:bg-rally/90"
                >
                  <Plus className="h-4 w-4" />
                  Add Contact Card
                </Button>
              </div>
              <div className="space-y-4">
                {content.contact.cards.map((card) => (
                  <ItemCard key={card.id} title="Contact Card">
                    <div className="grid gap-4 lg:grid-cols-2">
                      <Field label="Title">
                        <Input
                          value={card.title}
                          onChange={(event) =>
                            updateSection("contact", (section) => ({
                              ...section,
                              cards: section.cards.map((item) =>
                                item.id === card.id ? { ...item, title: event.target.value } : item,
                              ),
                            }))
                          }
                          className={listInputClass}
                        />
                      </Field>
                      <Field label="Icon">
                        {iconSelect(
                          card.icon,
                          (event) =>
                            updateSection("contact", (section) => ({
                              ...section,
                              cards: section.cards.map((item) =>
                                item.id === card.id
                                  ? { ...item, icon: event.target.value as ContentIconKey }
                                  : item,
                              ),
                            })),
                          "text-rally",
                        )}
                      </Field>
                    </div>
                    <Field label="Display Text" hint="Use line breaks for address-style content.">
                      <Textarea
                        value={card.text}
                        onChange={(event) =>
                          updateSection("contact", (section) => ({
                            ...section,
                            cards: section.cards.map((item) =>
                              item.id === card.id ? { ...item, text: event.target.value } : item,
                            ),
                          }))
                        }
                        className="min-h-[130px] rounded-2xl"
                      />
                    </Field>
                    <Field label="Link/Href" hint="Examples: mailto:info@example.com, tel:+234..., or leave blank for plain text.">
                      <Input
                        value={card.href}
                        onChange={(event) =>
                          updateSection("contact", (section) => ({
                            ...section,
                            cards: section.cards.map((item) =>
                              item.id === card.id ? { ...item, href: event.target.value } : item,
                            ),
                          }))
                        }
                        className={listInputClass}
                      />
                    </Field>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() =>
                        updateSection("contact", (section) => ({
                          ...section,
                          cards: section.cards.filter((item) => item.id !== card.id),
                        }))
                      }
                      className="w-full rounded-xl border-rally/30 text-rally hover:bg-rally/5 hover:text-rally"
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete Contact Card
                    </Button>
                  </ItemCard>
                ))}
              </div>
            </div>
          </SectionCard>
        </div>
      </div>
    </section>
  );
};

export default AdminPage;
