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
      { icon: 'github', link: 'https://github.com/LibertAntoine/Jumper' }
      ],
      search: {
        provider: "local",
      },
      footer: {
        copyright: "Released under Apache-2.0 License. <br/> Copyright © 2025-present Antoine Libert",
      },
      logo: {
        light: "/logo.png",
        dark: "/logo-dark.png",
      },
      nav: [
        { text: "Home", link: "/" },
      ],

      sidebar: {
      }
    },

    markdown: {
      config: (md) => {
        md.use(tabsMarkdownPlugin);
      },
    },
  })
);
