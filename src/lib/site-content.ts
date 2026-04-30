import type { LucideIcon } from "lucide-react";
import {
  BookOpen,
  Building,
  Building2,
  GraduationCap,
  HandHeart,
  HeartPulse,
  Landmark,
  Mail,
  MapPin,
  Megaphone,
  Phone,
  ShieldCheck,
  Sprout,
  Target,
  TrendingUp,
  UserPlus,
  Users,
  Vote,
} from "lucide-react";
import logo from "@/assets/apc-logo.jpg";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import gallery5 from "@/assets/gallery-5.jpg";
import gallery6 from "@/assets/gallery-6.jpg";
import hero from "@/assets/hero.jpg";
import founderPortrait from "@/assets/leader-founder.jpg";
import governorPortrait from "@/assets/leader-governor.png";
import presidentPortrait from "@/assets/leader-president.jpg";
import seal from "@/assets/coat-of-arms.jpg";

export const siteAssetMap = {
  logo,
  seal,
  hero,
  "leader-president": presidentPortrait,
  "leader-governor": governorPortrait,
  "leader-founder": founderPortrait,
  "gallery-1": gallery1,
  "gallery-2": gallery2,
  "gallery-3": gallery3,
  "gallery-4": gallery4,
  "gallery-5": gallery5,
  "gallery-6": gallery6,
} as const;

export type SiteAssetKey = keyof typeof siteAssetMap;

export const contentIconMap = {
  "trending-up": TrendingUp,
  "building-2": Building2,
  landmark: Landmark,
  "shield-check": ShieldCheck,
  sprout: Sprout,
  "graduation-cap": GraduationCap,
  "heart-pulse": HeartPulse,
  users: Users,
  vote: Vote,
  "hand-heart": HandHeart,
  megaphone: Megaphone,
  "book-open": BookOpen,
  target: Target,
  "map-pin": MapPin,
  mail: Mail,
  phone: Phone,
  building: Building,
  "user-plus": UserPlus,
} as const satisfies Record<string, LucideIcon>;

export type ContentIconKey = keyof typeof contentIconMap;

export const contentIconOptions = Object.entries(contentIconMap).map(([value, icon]) => ({
  value: value as ContentIconKey,
  label: value
    .split("-")
    .map((chunk) => chunk.charAt(0).toUpperCase() + chunk.slice(1))
    .join(" "),
  icon,
}));

export type SiteStat = {
  id: string;
  value: string;
  label: string;
};

export type HeroContent = {
  eyebrow: string;
  titleLead: string;
  titleAccent: string;
  description: string;
  primaryCtaText: string;
  secondaryCtaText: string;
  overlayEyebrow: string;
  overlayTitle: string;
  imageKey: SiteAssetKey;
  imageUrl: string;
  stats: SiteStat[];
};

export type AboutContent = {
  eyebrow: string;
  heading: string;
  bodyPrimary: string;
  bodySecondary: string;
  stats: SiteStat[];
};

export type AchievementItem = {
  id: string;
  icon: ContentIconKey;
  title: string;
  text: string;
};

export type AchievementTab = {
  id: "president" | "governor";
  label: string;
  badgeLabel: string;
  title: string;
  subtitle: string;
  theme: "primary" | "rally";
  stats: SiteStat[];
  items: AchievementItem[];
};

export type AchievementsContent = {
  eyebrow: string;
  heading: string;
  intro: string;
  tabs: AchievementTab[];
};

export type LeaderItem = {
  id: string;
  role: string;
  name: string;
  desc: string;
  imageKey: SiteAssetKey;
  imageUrl: string;
};

export type TeamMemberItem = {
  id: string;
  role: string;
  name: string;
  desc: string;
  icon: ContentIconKey;
};

export type LeadershipContent = {
  eyebrow: string;
  heading: string;
  leaders: LeaderItem[];
  founderEyebrow: string;
  founderQuote: string;
  founderAttribution: string;
  founderImageKey: SiteAssetKey;
  founderImageUrl: string;
  teamEyebrow: string;
  teamHeading: string;
  teamDescription: string;
  teamMembers: TeamMemberItem[];
};

export type ObjectiveItem = {
  id: string;
  icon: ContentIconKey;
  title: string;
  text: string;
};

export type ObjectivesContent = {
  eyebrow: string;
  heading: string;
  items: ObjectiveItem[];
};

export type GalleryItem = {
  id: string;
  label: string;
  imageKey: SiteAssetKey;
  imageUrl: string;
};

export type GalleryContent = {
  eyebrow: string;
  heading: string;
  intro: string;
  items: GalleryItem[];
};

export type JoinContent = {
  eyebrow: string;
  heading: string;
  description: string;
  benefits: { id: string; text: string }[];
  lgas: string[];
  privacyText: string;
};

export type DonateContent = {
  eyebrow: string;
  heading: string;
  description: string;
  accountName: string;
  bankName: string;
  accountNumber: string;
  presets: number[];
  pledgeNote: string;
};

export type ContactCard = {
  id: string;
  title: string;
  icon: ContentIconKey;
  text: string;
  href: string;
};

export type ContactContent = {
  eyebrow: string;
  heading: string;
  description: string;
  cards: ContactCard[];
  footerSummary: string;
};

export type HomeContent = {
  actionEyebrow: string;
  actionHeading: string;
  actionDescription: string;
};

export type SiteContent = {
  home: HomeContent;
  hero: HeroContent;
  about: AboutContent;
  achievements: AchievementsContent;
  leadership: LeadershipContent;
  objectives: ObjectivesContent;
  gallery: GalleryContent;
  join: JoinContent;
  donate: DonateContent;
  contact: ContactContent;
};

const createStat = (id: string, value: string, label: string): SiteStat => ({ id, value, label });

export const defaultSiteContent: SiteContent = {
  home: {
    actionEyebrow: "Take Action",
    actionHeading: "Ready to support the movement?",
    actionDescription:
      "Register as a supporter, contribute to the mission, or reach the team directly from their dedicated pages.",
  },
  hero: {
    eyebrow: "A Movement for Nasarawa",
    titleLead: "MUJE",
    titleAccent: "MAHA",
    description:
      "A grassroots platform built to support the senatorial ambition of Governor Abdullahi A. Sule and the re-election of President Bola Ahmed Tinubu GCFR in service of Mr President's Renewed Hope Agenda.",
    primaryCtaText: "Join the Movement",
    secondaryCtaText: "Donate",
    overlayEyebrow: "Est. Movement",
    overlayTitle: "United for Progress",
    imageKey: "hero",
    imageUrl: "",
    stats: [
      createStat("hero-lga", "13", "LGAs"),
      createStat("hero-members", "50K+", "Members"),
      createStat("hero-projects", "200+", "Projects"),
    ],
  },
  about: {
    eyebrow: "About Us",
    heading: "A grassroots force for a stronger Nasarawa.",
    bodyPrimary:
      "Muje Maha Support Group is an APC support group rooted in the people of Nasarawa State. We mobilise, organise and advocate for policies that uplift our communities, championing the values of progress, integrity and unity.",
    bodySecondary:
      "The movement was created to mobilise broad grassroots support for the senatorial ambition of Governor Abdullahi A. Sule and the re-election of President Bola Ahmed Tinubu GCFR, helping to sustain and fully realise Mr President's Renewed Hope Agenda.",
    stats: [
      createStat("about-founded", "2019", "Founded"),
      createStat("about-lgas", "13", "LGAs Active"),
      createStat("about-supporters", "50K+", "Supporters"),
    ],
  },
  achievements: {
    eyebrow: "Track Record",
    heading: "Leadership Achievements",
    intro: "A record of reform and renewal at the federal level and right here in Nasarawa State.",
    tabs: [
      {
        id: "president",
        label: "President",
        badgeLabel: "Federal",
        title: "President Bola Ahmed Tinubu",
        subtitle: "Renewed Hope Agenda - National Reform and Renewal",
        theme: "primary",
        stats: [
          createStat("president-budget", "N35tn", "2025 Budget"),
          createStat("president-highway", "700km", "Coastal Highway"),
          createStat("president-fdi", "$30B+", "FDI Pledged"),
        ],
        items: [
          {
            id: "president-economic",
            icon: "trending-up",
            title: "Economic Reform",
            text: "Subsidy reform and FX unification driving long-term fiscal stability.",
          },
          {
            id: "president-infra",
            icon: "building-2",
            title: "Infrastructure",
            text: "Coastal Highway, rail expansion and nationwide road revitalisation.",
          },
          {
            id: "president-investment",
            icon: "landmark",
            title: "Investment",
            text: "Record FDI commitments across energy, tech and manufacturing.",
          },
          {
            id: "president-security",
            icon: "shield-check",
            title: "Security",
            text: "Strengthened intelligence operations and inter-agency coordination.",
          },
        ],
      },
      {
        id: "governor",
        label: "Governor",
        badgeLabel: "Nasarawa State",
        title: "Governor of Nasarawa State",
        subtitle: "Driving people-centred governance and local prosperity",
        theme: "rally",
        stats: [
          createStat("governor-lgas", "13", "LGAs Reached"),
          createStat("governor-health", "150+", "Health Centres"),
          createStat("governor-empowered", "10K+", "Empowered"),
        ],
        items: [
          {
            id: "governor-agriculture",
            icon: "sprout",
            title: "Agriculture",
            text: "Mechanised farming and farmer-input schemes expanding food security.",
          },
          {
            id: "governor-education",
            icon: "graduation-cap",
            title: "Education",
            text: "School renovations, scholarships and teacher recruitment statewide.",
          },
          {
            id: "governor-healthcare",
            icon: "heart-pulse",
            title: "Healthcare",
            text: "Primary health centres revitalised across all 13 LGAs.",
          },
          {
            id: "governor-community",
            icon: "users",
            title: "Community",
            text: "Direct empowerment programs reaching grassroots communities.",
          },
        ],
      },
    ],
  },
  leadership: {
    eyebrow: "Leadership",
    heading: "Principled leaders, shared purpose.",
    leaders: [
      {
        id: "leader-president",
        role: "President",
        name: "Bola Ahmed Tinubu GCFR",
        desc: "President, Federal Republic of Nigeria. Architect of the Renewed Hope Agenda.",
        imageKey: "leader-president",
        imageUrl: "",
      },
      {
        id: "leader-governor",
        role: "Governor",
        name: "Abdullahi A. Sule",
        desc: "Governor, Nasarawa State. Driving development, security and prosperity across the state.",
        imageKey: "leader-governor",
        imageUrl: "",
      },
      {
        id: "leader-founder",
        role: "Founder",
        name: "Rashida Abdullahi",
        desc: "Founder, Muje Maha Support Group. Visionary behind a unified grassroots movement for Nasarawa progress.",
        imageKey: "leader-founder",
        imageUrl: "",
      },
    ],
    founderEyebrow: "Our Founder",
    founderQuote:
      "When ordinary people unite around a common cause, leadership is no longer a privilege - it becomes a shared responsibility.",
    founderAttribution: "Rashida Abdullahi | Founder, Muje Maha Support Group",
    founderImageKey: "leader-founder",
    founderImageUrl: "",
    teamEyebrow: "Our Team",
    teamHeading: "The people keeping the movement active between every rally and every result.",
    teamDescription:
      "Beyond the founder and public leaders, Muje Maha Support Group runs on a disciplined support structure focused on coordination, mobilisation, communication, and direct community engagement.",
    teamMembers: [
      {
        id: "team-operations",
        role: "State Operations",
        name: "Coordination Desk",
        desc: "Keeps state-wide planning aligned, tracks execution, and supports movement activity across all 13 LGAs.",
        icon: "target",
      },
      {
        id: "team-mobilisation",
        role: "Grassroots Network",
        name: "Mobilisation Desk",
        desc: "Connects ward and LGA organisers, strengthens field structures, and sustains volunteer momentum.",
        icon: "users",
      },
      {
        id: "team-communications",
        role: "Public Messaging",
        name: "Media and Communications",
        desc: "Shapes public engagement, keeps supporters informed, and amplifies the movement's voice consistently.",
        icon: "megaphone",
      },
      {
        id: "team-engagement",
        role: "Community Outreach",
        name: "Volunteer Support",
        desc: "Bridges the movement with everyday citizens through service, outreach, and responsive engagement channels.",
        icon: "hand-heart",
      },
    ],
  },
  objectives: {
    eyebrow: "Our Objectives",
    heading: "What we stand for.",
    items: [
      {
        id: "objective-civic",
        icon: "vote",
        title: "Civic Engagement",
        text: "Mobilising voters and strengthening democratic participation across all 13 LGAs.",
      },
      {
        id: "objective-unity",
        icon: "users",
        title: "Grassroots Unity",
        text: "Building cohesive ward-level structures rooted in trust and shared purpose.",
      },
      {
        id: "objective-impact",
        icon: "hand-heart",
        title: "Community Impact",
        text: "Empowerment programs that reach families, women and youth directly.",
      },
      {
        id: "objective-advocacy",
        icon: "megaphone",
        title: "Policy Advocacy",
        text: "Amplifying the voice of Nasarawa in the national reform conversation.",
      },
      {
        id: "objective-education",
        icon: "book-open",
        title: "Political Education",
        text: "Equipping members with the principles of progressive, accountable leadership.",
      },
      {
        id: "objective-support",
        icon: "target",
        title: "Strategic Support",
        text: "Standing firmly with the APC, the President and the Governor of Nasarawa.",
      },
    ],
  },
  gallery: {
    eyebrow: "In the Field",
    heading: "Stories from the ground.",
    intro: "A visual record of our work across Nasarawa - schools, roads, farms and the people we serve.",
    items: [
      { id: "gallery-1", label: "Infrastructure", imageKey: "gallery-1", imageUrl: "" },
      { id: "gallery-2", label: "Education", imageKey: "gallery-2", imageUrl: "" },
      { id: "gallery-3", label: "Town Hall", imageKey: "gallery-3", imageUrl: "" },
      { id: "gallery-4", label: "Healthcare", imageKey: "gallery-4", imageUrl: "" },
      { id: "gallery-5", label: "Agriculture", imageKey: "gallery-5", imageUrl: "" },
      { id: "gallery-6", label: "Urban Renewal", imageKey: "gallery-6", imageUrl: "" },
    ],
  },
  join: {
    eyebrow: "Join the Movement",
    heading: "Stand with Nasarawa. Add your name to the movement.",
    description:
      "Muje Maha Support Group is built by everyday citizens. Register as a supporter and your local coordinator will be in touch with how to get involved in your community.",
    benefits: [
      { id: "join-briefings", text: "Receive briefings from your LGA coordinator" },
      { id: "join-volunteer", text: "Volunteer at rallies and town halls" },
      { id: "join-mobilise", text: "Help mobilise voters in your ward" },
    ],
    lgas: [
      "Akwanga",
      "Awe",
      "Doma",
      "Karu",
      "Keana",
      "Keffi",
      "Kokona",
      "Lafia",
      "Nasarawa",
      "Nasarawa Eggon",
      "Obi",
      "Toto",
      "Wamba",
    ],
    privacyText: "Your details are kept private and never shared with third parties.",
  },
  donate: {
    eyebrow: "Support the Movement",
    heading: "Power our mission. Fund the future of Nasarawa.",
    description:
      "Your contribution funds grassroots organising, voter education and direct community impact across all 13 LGAs.",
    accountName: "MUJE MAHA Initiative",
    bankName: "First Bank of Nigeria",
    accountNumber: "0123456789",
    presets: [5000, 10000, 25000, 50000, 100000],
    pledgeNote: "Secure pledge - confirm via bank transfer using the details provided.",
  },
  contact: {
    eyebrow: "Contact",
    heading: "Reach the movement directly.",
    description:
      "Whether you want to volunteer, support an event, or speak with a coordinator, this page gives you a direct route to the team.",
    cards: [
      {
        id: "contact-hq",
        title: "Headquarters",
        icon: "map-pin",
        text: "Muje Maha Support Group Secretariat\nLafia, Nasarawa State\nFederal Republic of Nigeria",
        href: "",
      },
      {
        id: "contact-email",
        title: "Email",
        icon: "mail",
        text: "info@mujemaha.org",
        href: "mailto:info@mujemaha.org",
      },
      {
        id: "contact-phone",
        title: "Phone",
        icon: "phone",
        text: "+234 800 000 0000",
        href: "tel:+2348000000000",
      },
    ],
    footerSummary:
      "A united movement for progress in Nasarawa State. Proudly affiliated with the All Progressives Congress (APC) and aligned with the Renewed Hope Agenda.",
  },
};

export const siteContentStorageKey = "muje-maha-content-v1";

export const cloneSiteContent = () => JSON.parse(JSON.stringify(defaultSiteContent)) as SiteContent;

export const createId = (prefix: string) => {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return `${prefix}-${crypto.randomUUID()}`;
  }

  return `${prefix}-${Math.random().toString(36).slice(2, 10)}`;
};

const withFallbackArray = <T,>(value: T[] | undefined, fallback: T[]) => (Array.isArray(value) ? value : fallback);

export const normalizeSiteContent = (value: unknown): SiteContent => {
  if (!value || typeof value !== "object") {
    return cloneSiteContent();
  }

  const candidate = value as Partial<SiteContent>;
  const fallback = cloneSiteContent();

  return {
    home: {
      actionEyebrow: candidate.home?.actionEyebrow ?? fallback.home.actionEyebrow,
      actionHeading: candidate.home?.actionHeading ?? fallback.home.actionHeading,
      actionDescription: candidate.home?.actionDescription ?? fallback.home.actionDescription,
    },
    hero: {
      ...fallback.hero,
      ...candidate.hero,
      description:
        candidate.hero?.description ===
        "A united APC support group advancing progress, accountable leadership, and lasting community impact across Nasarawa State and Nigeria."
          ? "A grassroots platform built to support the senatorial ambition of Governor Abdullahi A. Sule and the re-election of President Bola Ahmed Tinubu GCFR in service of Mr President's Renewed Hope Agenda."
          : candidate.hero?.description ?? fallback.hero.description,
      stats: withFallbackArray(candidate.hero?.stats, fallback.hero.stats),
    },
    about: {
      ...fallback.about,
      ...candidate.about,
      bodyPrimary:
        candidate.about?.bodyPrimary ===
        "MUJE MAHA is an APC support group rooted in the people of Nasarawa State. We mobilise, organise and advocate for policies that uplift our communities, championing the values of progress, integrity and unity."
          ? "Muje Maha Support Group is an APC support group rooted in the people of Nasarawa State. We mobilise, organise and advocate for policies that uplift our communities, championing the values of progress, integrity and unity."
          : candidate.about?.bodyPrimary ?? fallback.about.bodyPrimary,
      bodySecondary:
        candidate.about?.bodySecondary ===
        "From the smallest ward to the highest office, we believe credible leadership and grassroots action can transform Nigeria. We stand with the President and the Governor in delivering the Renewed Hope Agenda."
          ? "The movement was created to mobilise broad grassroots support for the senatorial ambition of Governor Abdullahi A. Sule and the re-election of President Bola Ahmed Tinubu GCFR, helping to sustain and fully realise Mr President's Renewed Hope Agenda."
          : candidate.about?.bodySecondary ?? fallback.about.bodySecondary,
      stats: withFallbackArray(candidate.about?.stats, fallback.about.stats),
    },
    achievements: {
      ...fallback.achievements,
      ...candidate.achievements,
      tabs: withFallbackArray(candidate.achievements?.tabs, fallback.achievements.tabs),
    },
    leadership: {
      ...fallback.leadership,
      ...candidate.leadership,
      leaders: withFallbackArray(candidate.leadership?.leaders, fallback.leadership.leaders).map((leader) =>
        leader.id === "leader-president" && (leader.name === "Bola Ahmed Tinubu" || leader.name === "GCFR Bola Ahmed Tinubu")
          ? { ...leader, name: "Bola Ahmed Tinubu GCFR" }
          : leader.id === "leader-governor" && leader.name === "Nasarawa State"
            ? {
                ...leader,
                name: "Abdullahi A. Sule",
                desc:
                  leader.desc === "Driving development, security and prosperity across the state."
                    ? "Governor, Nasarawa State. Driving development, security and prosperity across the state."
                    : leader.desc,
              }
            : leader.id === "leader-founder" && leader.name === "MUJE MAHA"
              ? {
                  ...leader,
                  name: "Rashida Abdullahi",
                  desc:
                    leader.desc === "Visionary behind a unified grassroots movement for Nasarawa progress."
                      ? "Founder, Muje Maha Support Group. Visionary behind a unified grassroots movement for Nasarawa progress."
                      : leader.desc,
                }
              : leader,
      ),
      founderAttribution:
        candidate.leadership?.founderAttribution === "Founder | MUJE MAHA"
          ? "Rashida Abdullahi | Founder, Muje Maha Support Group"
          : candidate.leadership?.founderAttribution ?? fallback.leadership.founderAttribution,
      teamDescription:
        candidate.leadership?.teamDescription ===
        "Beyond the founder and public leaders, MUJE MAHA runs on a disciplined support structure focused on coordination, mobilisation, communication, and direct community engagement."
          ? "Beyond the founder and public leaders, Muje Maha Support Group runs on a disciplined support structure focused on coordination, mobilisation, communication, and direct community engagement."
          : candidate.leadership?.teamDescription ?? fallback.leadership.teamDescription,
      teamMembers: withFallbackArray(candidate.leadership?.teamMembers, fallback.leadership.teamMembers),
    },
    objectives: {
      ...fallback.objectives,
      ...candidate.objectives,
      items: withFallbackArray(candidate.objectives?.items, fallback.objectives.items),
    },
    gallery: {
      ...fallback.gallery,
      ...candidate.gallery,
      items: withFallbackArray(candidate.gallery?.items, fallback.gallery.items),
    },
    join: {
      ...fallback.join,
      ...candidate.join,
      description:
        candidate.join?.description ===
        "MUJE MAHA is built by everyday citizens. Register as a supporter and your local coordinator will be in touch with how to get involved in your community."
          ? "Muje Maha Support Group is built by everyday citizens. Register as a supporter and your local coordinator will be in touch with how to get involved in your community."
          : candidate.join?.description ?? fallback.join.description,
      benefits: withFallbackArray(candidate.join?.benefits, fallback.join.benefits),
      lgas: withFallbackArray(candidate.join?.lgas, fallback.join.lgas),
    },
    donate: {
      ...fallback.donate,
      ...candidate.donate,
      presets: withFallbackArray(candidate.donate?.presets, fallback.donate.presets),
    },
    contact: {
      ...fallback.contact,
      ...candidate.contact,
      cards: withFallbackArray(candidate.contact?.cards, fallback.contact.cards).map((card) =>
        card.id === "contact-hq" &&
        card.text === "MUJE MAHA Secretariat\nLafia, Nasarawa State\nFederal Republic of Nigeria"
          ? {
              ...card,
              text: "Muje Maha Support Group Secretariat\nLafia, Nasarawa State\nFederal Republic of Nigeria",
            }
          : card,
      ),
    },
  };
};

export const resolveImageSource = (imageKey: SiteAssetKey, imageUrl?: string) => {
  if (imageUrl?.trim()) {
    return imageUrl.trim();
  }

  return siteAssetMap[imageKey];
};

export const getThemeClasses = (theme: "primary" | "rally") => {
  if (theme === "rally") {
    return {
      accent: "text-rally",
      border: "border-rally",
      badge: "bg-rally text-destructive-foreground",
      gradient: "from-rally/10 via-secondary to-secondary",
      icon: "bg-rally/10 text-rally",
    };
  }

  return {
    accent: "text-primary",
    border: "border-primary",
    badge: "bg-primary text-primary-foreground",
    gradient: "from-primary/10 via-secondary to-secondary",
    icon: "bg-primary/10 text-primary",
  };
};
