'use strict';

// Modules
const _ = require('lodash');

/*
 * Helper to parse legacy solr 3 config
 */
const parse3 = options => {
  options.image = 'actency/docker-solr:3.6';
  options.command = '/bin/bash -c "cd /opt/solr/example; java -Djetty.port=8983 -jar start.jar"';
  options.remoteFiles.dir = '/opt/solr/example/solr/conf';
  options.dataDir = '/opt/solr/example/solr/data';
  // @TODO: set this to false because we cant scan it reliably, is there a way to redirect?
  options.portforward = false;
  return options;
};

/*
 * Helper to parse legacy solr 4 config
 */
const parse4 = options => {
  options.image = 'actency/docker-solr:4.10';
  options.command = '/bin/bash -c "/opt/solr/bin/solr -f -p 8983"';
  options.remoteFiles.dir = '/opt/solr-4.10.4/example/solr/collection1/conf';
  // @TODO: the below doesnt seem to work so lets just ignore for now sice 4.10 is legacy
  // options.dataDir = '/opt/solr-4.10.4/example/solr/collection1/data';
  options.dataDir = '';
  // @TODO: set this to false because we cant scan it reliably, is there a way to redirect?
  options.portforward = false;
  return options;
};

/*
 * Helper to parse generic solr config
 */
const parseElse = options => {
  options.image = `solr:${options.version}-slim`;
  options.command = `docker-entrypoint.sh solr-precreate ${options.core}`;
  // Custom config dir command
  // @NOTE: idiot drupal hardcodes solrcore.properties so we need to do chaos like this
  if (_.has(options, 'config.dir')) {
    options.command = [
      '/bin/sh',
      '-c',
      '"echo \"solr.install.dir=/opt/solr\" >> /solrconf/conf/solrcore.properties',
      '&&',
      `${options.command} /solrconf"`,
    ].join(' ');
  }
  return options;
};

/*
 * Helper to parse solr config
 */
const parseConfig = options => {
  switch (options.version) {
    case '3.6': return parse3(options);
    case '3': return parse3(options);
    case '4.10': return parse4(options);
    case '4': return parse4(options);
    default: return parseElse(options);
  };
};

// Builder
module.exports = {
  name: 'solr',
  config: {
    version: '7',
    supported: ['7.6', '7', '6.6', '6', '5.5', '5', '4.10', '4', '3.6', '3'],
    legacy: ['4.10', '4', '3.6', '3'],
    patchesSupported: true,
    confSrc: __dirname,
    core: 'lando',
    dataDir: '/opt/solr/server/solr/mycores',
    port: '8983',
    remoteFiles: {
      dir: '/solrconf/conf',
    },
  },
  parent: '_service',
  builder: (parent, config) => class LandoSolr extends parent {
    constructor(id, options = {}) {
      options = parseConfig(_.merge({}, config, options));
      const solr = {
        image: options.image,
        command: options.command,
        volumes: [],
      };
      // Add in persistent datadir
      if (!_.isEmpty(options.dataDir)) solr.volumes.push(`data_${options.name}:${options.dataDir}`);
      // Send it downstream
      super(id, options, {services: _.set({}, options.name, solr)});
    };
  },
};
