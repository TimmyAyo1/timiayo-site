// content.js = the site's DATA, kept separate from its DESIGN.
// Components decide how things look; this file decides what they say.
// To add a log entry or change a link, you edit here, not the components.

export const path = [
  { label: "B.Sc. Mech. Eng., OAU", status: "done" },
  { label: "Shopify & web dev", status: "ongoing" },
  { label: "M.Sc. Adv. Eng. & Eng. Management, Soest", status: "active", progress: 20 },
];

export const currently = [
  { label: "Building", text: "This site, and the habit of writing things down." },
  { label: "Studying", text: "M.Sc. Advanced Engineering & Engineering Management" },
  { label: "Learning", text: "German, A1 → A2", progress: 22 },
  { label: "Writing", text: "Weekly notes on Medium, LinkedIn & X" },
];

// type must be one of: "writing", "build", "life"
export const log = [
  {
    date: "25.10.2026",
    type: "life",
    title: "Entry 001: Writing in public, starting now.",
    summary: "Why I'm posting regularly before I feel ready.",
    href: "#",
    cta: "Read",
  },
  {
    date: "DD.MM",
    type: "writing",
    title: "First Medium post: notes from both sides",
    summary: "Draft · where engineering thinking and code meet in my work.",
    href: "#",
    cta: "Medium",
    draft: true,
  },
  {
    date: "Earlier",
    type: "build",
    title: "Rujeni: rebuilding without starting over",
    summary: "WordPress → Shopify migration for a fashion brand rooted in Rwandan heritage.",
    href: "#builds",
    cta: "Case",
  },
  {
    date: "Earlier",
    type: "build",
    title: "Slider Apparel: one store, two ways to buy",
    summary: "A wholesale portal and purchasing flow for retail and business customers.",
    href: "#builds",
    cta: "Case",
  },
  {
    date: "Earlier",
    type: "life",
    title: "Moving to Soest for my master's",
    summary: "Placeholder · a good early story for LinkedIn.",
    href: "#",
    cta: "Read",
    draft: true,
  },
];

export const builds = [
  { name: "Rujeni", kind: "WordPress → Shopify", text: "A full migration and store build without starting from scratch." },
  { name: "Glück & Glanz", kind: "Migration + redesign", text: "Shopify 2.0 redesign for a multilingual designer resale business." },
  { name: "Slider Apparel", kind: "B2B / wholesale", text: "One store serving retail and business customers." },
  { name: "Pink Fish", kind: "Figma → Shopify", text: "A store shaped around product education and custom ordering." },
];

export const facts = [
  { label: "Background", value: "B.Sc. Mechanical Engineering, OAU" },
  { label: "Currently", value: "M.Sc. Advanced Engineering & Engineering Management, Soest" },
  { label: "Languages", value: "English · Deutsch (learning)" },
];

// Replace each "#" with your real link when you have it.
export const channels = [
  { kind: "Long form", name: "Medium", what: "Longer write-ups on builds and lessons", href: "#" },
  { kind: "Career", name: "LinkedIn", what: "The professional side of the story", href: "#" },
  { kind: "Quick notes", name: "X / Twitter", what: "Progress, thoughts and small wins", href: "https://x.com/timmyayo_de" },
  { kind: "Code", name: "GitHub", what: "What I'm building, in public", href: "https://github.com/TimmyAyo1" },
  { kind: "Direct", name: "Email", what: "For work, collaborations or a chat", href: "#" },
];
