module.exports = {
  title: 'Lando',
  description: 'The liberating local development tool for all your projects.',
  head: [
    ['link', {rel: 'icon', href: '/favicon.ico'}],
    ['link', {rel: 'stylesheet', href: '/styles/overrides.css'}],
    ['link', {rel: 'stylesheet', href: '//fonts.googleapis.com/css?family=Poppins:700|Source+Sans+Pro&display=swap'}],
    ['script', {src: '//js.hs-scripts.com/6478338.js'}],
    ['script', {src: '//js.hsforms.net/forms/shell.js'}],
  ],
  plugins: {
    '@vuepress/google-analytics': {
      ga: 'UA-74237404-5',
    },
    'autometa': {
      site: {
        name: 'Lando',
        twitter: 'devwithlando',
      },
      canonical_base: 'https://docs.lando.dev',
    },
    'canonical': {
      baseURL: 'https://docs.lando.dev',
    },
    'robots': {
      host: 'https://docs.lando.dev',
      sitemap: '/sitemap.xml',
    },
    'sitemap': {
      hostname: 'https://docs.lando.dev',
      exclude: ['/404.html'],
    },
  },
  themeConfig: {
    algolia: {
      apiKey: '15e332850128e9ec96929f44c62f6c88',
      indexName: 'lando',
      // uncomment the below to make styling inspection easier
      // debug: true,
    },
    docsDir: 'docs',
    docsBranch: 'master',
    logo: '/images/logo-small.png',
    editLinks: true,
    editLinkText: 'Is this doc out of date? Is there something to make it better? Suggest a change!',
    nav: [
      {text: 'Getting Started', link: '/basics/'},
      {text: 'Config', link: '/config/lando.md'},
      {text: 'Guides', link: '/guides/lando-info/'},
      {text: 'Help and Support', link: '/help/logs/'},
      {text: 'Contributing', link: '/contrib/contributing/'},
      {text: 'API', link: '/api/app.md'},
    ],
    sidebar: {
      '/basics/': [
        {
          title: 'Getting Started',
          collapsable: false,
          children: [
            '',
            'basics',
            'installation',
            'first-app',
            'uninstalling',
          ],
        },
        {
          title: 'Usage',
          collapsable: false,
          children: [
            'usage',
            'config',
            'destroy',
            'init',
            'info',
            'list',
            'logs',
            'poweroff',
            'rebuild',
            'restart',
            'share',
            'ssh',
            'start',
            'stop',
            'version',
          ],
        },
      ],
      '/config/': [
        {
          title: 'Core Config',
          collapsable: false,
          children: [
            'lando',
            'recipes',
            'services',
            'tooling',
            'proxy',
            'env',
            'events',
            'networking',
            'ssh',
            'security',
            'files',
            'global',
          ],
        },
        {
          title: 'Recipes',
          collapsable: false,
          children: [
            'backdrop',
            'drupal6',
            'drupal7',
            'drupal8',
            'joomla',
            'laravel',
            'lamp',
            'lemp',
            'mean',
            'pantheon',
            'wordpress',
          ],
        },
        {
          title: 'Services',
          collapsable: false,
          children: [
            'apache',
            'compose',
            'dotnet',
            'elasticsearch',
            'go',
            'mailhog',
            'mariadb',
            'memcached',
            'mongo',
            'mssql',
            'mysql',
            'nginx',
            'node',
            'php',
            'phpmyadmin',
            'postgres',
            'python',
            'redis',
            'ruby',
            'solr',
            'tomcat',
            'varnish',
          ],
        },
      ],
      '/guides/': [
        {
          title: 'General',
          collapsable: false,
          children: [
            'lando-info',
          ],
        },
        {
          title: 'Databases',
          collapsable: false,
          children: [
            'db-import',
            'db-export',
          ],
        },
        {
          title: 'Frontend',
          collapsable: false,
          children: [
            'frontend',
          ],
        },
        {
          title: 'IDEs',
          collapsable: false,
          children: [
            'lando-phpstorm',
            'lando-with-vscode',
          ],
        },
        {
          title: 'Networking',
          collapsable: false,
          children: [
            'external-access.md',
            'access-by-other-devices',
            'offline-dev',
          ],
        },
        {
          title: 'Updating',
          collapsable: false,
          children: [
            'updating-to-rc2',
          ],
        },
        {
          title: 'Recreation',
          collapsable: false,
          children: [
            ['https://www.youtube.com/watch?v=tkBVDh7my9Q', 'Mountain climbing'],
          ],
        },
      ],
      '/help/': [
        {
          title: 'Troubleshooting',
          collapsable: false,
          children: [
            'logs',
            'wkbox',
          ],
        },
        {
          title: 'Known Issues',
          collapsable: false,
          children: [
            'dns-rebind',
            'win-file-upload',
            'file-sync',
            'win-also-vb',
            'proxy',
            'switching-dbs',
          ],
        },
        {
          title: 'Support',
          collapsable: false,
          children: [
            ['https://github.com/lando/lando/issues', 'GitHub issue queue'],
            ['https://launchpass.com/devwithlando', 'Slack - Official Lando'],
            ['https://www.drupal.org/slack', 'Slack - Drupal #lando channel'],
            ['https://www.youtube.com/channel/UCl_QBNuGJNoo7yH-n18K7Kg', 'YouTube Tutorials'],
            ['https://github.com/lando/lando/tree/master/examples', 'Code examples'],
          ],
        },
        {
          title: 'Data',
          collapsable: false,
          children: [
            ['data', 'Privacy Policy for Humans'],
          ],
        },
        {
          title: 'Project Updates',
          collapsable: false,
          children: [
            ['q3-2019', 'Q3 2019'],
          ],
        },
        {
          title: 'Changelog',
          collapsable: false,
          children: [
            '2019-changelog',
            '2018-changelog',
            '2017-changelog',
          ],
        },
      ],
      '/contrib/': [
        {
          title: 'Getting Involved',
          collapsable: false,
          children: [
            'contributing',
            'vision',
            'how',
            'gov',
            'roles',
            'security',
          ],
        },
        {
          title: 'Contributing Code',
          collapsable: false,
          children: [
            'started',
            'structure',
            'plugins',
            'testing',
            'building',
            'shipping',
            'docs',
            'website',
          ],
        },
        {
          title: 'Resources',
          collapsable: false,
          children: [
            'opensource',
            ['https://drive.google.com/drive/folders/1ooK_NTMBuwOV0uix8O54umJGwAODL9dC', 'Training materials'],
          ],
        },
      ],
      '/api/': [
        ['app', 'app'],
        ['lando', 'lando'],
        ['cache', 'lando.cache'],
        ['engine', 'lando.engine'],
        ['error', 'lando.error'],
        ['events', 'lando.events'],
        ['log', 'lando.log'],
        ['plugins', 'lando.plugins'],
        ['promise', 'lando.promise'],
        ['scan', 'lando.scan'],
        ['shell', 'lando.shell'],
        ['updates', 'lando.updates'],
        ['user', 'lando.user'],
        ['yaml', 'lando.yaml'],
      ],
    },
  },
};
