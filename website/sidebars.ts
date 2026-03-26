import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebars: SidebarsConfig = {
  docs: [
    "manifesto",
    {
      type: "category",
      label: "Framework",
      link: { type: "generated-index", title: "The Framework" },
      items: ["framework/intent-discovery", "framework/core-loop", "framework/phase-details"],
    },
    {
      type: "category",
      label: "Playbook",
      link: { type: "generated-index", title: "The Playbook" },
      items: ["playbook/roles", "playbook/rituals", "playbook/artifacts", "playbook/metrics"],
    },
    "adoption-guide",
    "appendix",
  ],
};

export default sidebars;
