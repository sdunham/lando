'use strict';

// Modules
const chalk = require('chalk');

module.exports = lando => {
  return {
    command: 'poweroff',
    level: 'engine',
    describe: 'Spins down all lando related containers',
    options: {
      exclude: {
        describe: 'Exclude services from being shut down',
        alias: ['e'],
        array: true,
      },
    },
    run: async options => {
      const excludes = options.exclude || [];
      // TODO: Determine if any apps will remain
      // TODO: Only shut down proxy if any apps will remain
      // TODO: Filter proxy out (if necessary?) to avoid shutting down (if necessary)
      // TODO: Messaging
      // TODO: Docs
      /*
      { id: '192fbca10d90d253d3370afe07804a498e51eea868eca6c4700942458b37076e',
        service: 'proxy',
        name: 'landoproxyhyperion5000gandalfedition_proxy_1',
        app: '_global_',
        src: 'unknown',
        kind: 'service',
        lando: true,
        instance: 'd282281c0cbda71f9js array map43225ae9d4f347d3bb8ae66',
        status: 'Up 23 seconds' }
      { id: 'a5bb52c75a2d201f71f222186d816b5b668c0d3bfd59809a8b38a2f95638993d',
        service: 'database',
        name: 'landotestapp1_database_1',
        app: 'landotestapp1',
        src: 
        [ '/home/sdunham/OpenSourceContrib/lando-test-app-1/.lando.yml' ],
        kind: 'app',
        lando: true,
        instance: 'd282281c0cbda71f943225ae9d4f347d3bb8ae66',
        status: 'Up 22 seconds (healthy)' }
      { id: '449b1a975c124b306ec06425ecd26d6b312f1c5b707bf9ca421e4c698026e31d',
        service: 'appserver',
        name: 'landotestapp1_appserver_1',
        app: 'landotestapp1',
        src: 
        [ '/home/sdunham/OpenSourceContrib/lando-test-app-1/.lando.yml' ],
        kind: 'app',
        lando: true,
        instance: 'd282281c0cbda71f943225ae9d4f347d3bb8ae66',
        status: 'Up 20 seconds' }
      */
      console.log(chalk.green('NO!! SHUT IT ALL DOWN! Spinning Lando containers down...'));
      // Get all our containers
      const containers = await lando.engine.list();
      //console.log(containers);
      const hasExcludeMatch = containers.some(container => excludes.includes(container.app));
      const shutThemDown = hasExcludeMatch 
        ? containers.filter(container => !excludes.includes(container.app) && container.app !== '_global_') 
        : containers;

      console.log(hasExcludeMatch, shutThemDown, containers);

      // SHUT IT ALL DOWN
      // TODO: Is lando.Promise.each the right approach?
      return lando.Promise.each(
        shutThemDown,
        container => {
          console.log('Bye bye %s ... ', container.name, chalk.green('done'));
          return lando.engine.stop({id: container.id});
        }
      )
      // Emit poweroff
      .then(() => lando.events.emit('poweroff'))
      // Finish up
      .then(() => {
        console.log(chalk.red('Lando containers have been spun down.'));
      });
      
      /* TODO: OLD
      return lando.engine.list()
      // SHUT IT ALL DOWN
      .each(container => console.log('Bye bye %s ... ', container.name, chalk.green('done')))
      .each(container => lando.engine.stop({id: container.id}))
      // Emit poweroff
      .then(() => lando.events.emit('poweroff'))
      // Finish up
      .then(() => {
        console.log(chalk.red('Lando containers have been spun down.'));
      });
      */
    },
  };
};
