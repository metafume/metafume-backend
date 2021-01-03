exports.ROUTE = {
  PRODUCTS: {
    INDEX: '/products',
    SEARCH: '/search',
    DETAIL: '/detail',
    RECENT: '/recent',
  },
  USERS: {
    INDEX: '/users',
    LOGIN: {
      GOOGLE: '/login/google',
      TOKEN: '/login/token',
    },
    FAVORITE: {
      ADD: '/:user_id/favorite/:product_id',
      DELETE: '/:user_id/favorite/:product_id',
    },
    SUBSCRIPTION: '/:user_id/subscription',
    RECOMMENDATION: '/:user_id/recommendation',
  },
  HEALTH: '/health',
};

exports.OK = 'ok';
exports.ADD = 'add';
exports.INCREASE = 'increase';

exports.RECENT_VIEW_LIST = 'recentViewList';
exports.MY_FAVORITE = 'myFavorite';

exports.SEARCH_PRODUCT_DETAIL = 'searchProductDetail';
exports.SEARCH_TARGET_KEYWORD = 'searchTargetKeyword';

exports.DAY = 60 * 60 * 24;
exports.WEEK = 60 * 60 * 24 * 7;
exports.MONTH = 60 * 60 * 24 * 31;
