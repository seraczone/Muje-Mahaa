export type SiteNavItem = {
  label: string;
  to: string;
  description: string;
};

export const siteNavItems: SiteNavItem[] = [
  {
    label: "About",
    to: "/about",
    description: "Learn what Muje Maha Support Group stands for and how the movement is organised.",
  },
  {
    label: "Achievements",
    to: "/achievements",
    description: "Review the record of federal and state-level progress highlighted by the movement.",
  },
  {
    label: "Leadership",
    to: "/leadership",
    description: "Meet the key leaders and the founding voice behind the movement.",
  },
  {
    label: "Objectives",
    to: "/about#objectives",
    description: "See the strategic priorities guiding mobilisation, education, and grassroots action.",
  },
  {
    label: "Gallery",
    to: "/gallery",
    description: "Browse visual highlights from events, projects, and field activity across Nasarawa.",
  },
  {
    label: "Join",
    to: "/join",
    description: "Register as a supporter and connect with your local coordinator.",
  },
  {
    label: "Contact",
    to: "/contact",
    description: "Find contact details, headquarters information, and ways to reach the team.",
  },
];

export const navbarNavItems: SiteNavItem[] = siteNavItems.filter((item) => item.to !== "/about#objectives");

export const footerNavItems: SiteNavItem[] = [
  ...siteNavItems,
  {
    label: "Donate",
    to: "/donate",
    description: "Support grassroots organising, voter education, and community impact.",
  },
];
