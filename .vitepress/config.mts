import { defineConfig } from "vitepress";
import { tabsMarkdownPlugin } from "vitepress-plugin-tabs";
import { withMermaid } from "vitepress-plugin-mermaid";

export default withMermaid(
  defineConfig({
    title: "Jumper",
    description: "Jumper Website",
    head: [["link", { rel: "icon", href: "/favicon.ico" }]],
    themeConfig: {
      socialLinks: [
        { icon: "github", link: "https://github.com/Jumper-Carrot" },
      ],
      search: {
        provider: "local",
      },
      footer: {
        copyright:
          "Released under Apache-2.0 License. <br/> Copyright © 2025-present Antoine Libert",
      },
      logo: {
        light: "/logo.png",
        dark: "/logo-dark.png",
      },
      nav: [
        { text: "Home", link: "/" },
        { text: "Guide", link: "/guide/intro/what-is-jumper" },
      ],

      sidebar: {
        "/guide/": [
          {
            text: "Introduction",
            items: [{ text: "What is Jumper?", link: "/guide/intro/what-is-jumper" }],
          },
          {
            text: "Get Started",
            items: [
              { text: "Quick Start", link: "/guide/get-started/quick-start" },
              { text: "Updates", link: "/guide/get-started/updates" },
              {
                text: "Configuration",
                link: "/guide/get-started/configuration/configuration",
                items: [
                  { text: "🔒 Security", link: "/guide/get-started/configuration/security" },
                  { text: "📧 Email", link: "/guide/get-started/configuration/email" },
                  { text: "💾 File Storage", link: "/guide/get-started/configuration/file-storage" },
                  { text: "🔑 Authentication", link: "/guide/get-started/configuration/authentication" },
                  {
                    text: "👤 SCIM Provisioning",
                    link: "/guide/get-started/configuration/scim-provisioning",
                  },
                  { text: "🛠️ Debug & Logs", link: "/guide/get-started/configuration/debug-logs" },
                ],
              },
            ],
          },
          { text: "Community", items: [
              { text: "🤝 Contributing", link: "/guide/community/contributing" },
          ] },
        ],
      },
    },

    markdown: {
      config: (md) => {
        md.use(tabsMarkdownPlugin);
      },
    },
  })
);
