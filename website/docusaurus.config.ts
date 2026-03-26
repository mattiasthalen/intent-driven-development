import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Intent-Driven Development',
  tagline: 'For AI-native teams',
  favicon: 'img/favicon.ico',

  url: 'https://mattiasthalen.github.io',
  baseUrl: '/intent-driven-development/',

  organizationName: 'mattiasthalen',
  projectName: 'intent-driven-development',
  trailingSlash: false,

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'throw',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    navbar: {
      title: 'Intent-Driven Development',
      items: [
        {
          to: '/docs/manifesto',
          label: 'Manifesto',
          position: 'left',
        },
        {
          to: '/docs/framework/core-loop',
          label: 'Framework',
          position: 'left',
        },
        {
          to: '/docs/playbook/roles',
          label: 'Playbook',
          position: 'left',
        },
        {
          to: '/docs/adoption-guide',
          label: 'Adoption',
          position: 'left',
        },
        {
          href: 'https://github.com/mattiasthalen/intent-driven-development',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      copyright: 'Intent-Driven Development Framework v1.0 — For AI-native teams',
    },
    colorMode: {
      defaultMode: 'dark',
      respectPrefersColorScheme: true,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
