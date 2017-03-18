import NProgress from 'nProgress';

module.exports = {
  path: '/dashboard/overview',
  getComponent(location, cb) {
  	NProgress.start();
    require.ensure([], (require) => {
    	require('nprogress').done();
      cb(null, require('./Overview'));
    });
  }
}
