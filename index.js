require([
  'base/MoGu',
  '/__/mfp/meili-base-mwp-js-sdk/assets/1.5.3/mwp.browser.js',
  'ui/tips',
  'MCUBE_MOD_ID_XXX:banner.tpl'
], function(MoGu, MWP, Tips, bannerTpl) {

  MWP.setGlobalEnv(MWP.Env.PreRelease);

  var videoBanner = {

    init: function () {

      var _this = this;

      this.template = bannerTpl;

      this.$el = $('.video_banner_container');

      fetchBanner().then(
        function (data) {

          _this.data = data;

          _this.render(data);

          _this.cacheDom();

          _this.bindEvent();
          
        },
        function () {
          Tips.show('网络出错');
        }
      );

    },

    bindEvent: function () {

      var mySwiper = new Swiper('.swiper-container', {
        direction: 'horizontal',
        loop: (this.data.data.banners.length === 1) ? false : true,
        autoplay: '4000',
        pagination: '.circle-list'
      });

      $('.module_row').on('click', '.swiper-slide', function () {
        window.location.href = window.logger.generatePtpParams($(this).attr('data-url'));
      });

    },

    cacheDom: function () {

      this.domCache = {

      };

    },

    filter: function (list) {

      var filterData = list.filter(function (item) {
        return item.link.indexOf('http') === 0;
      });

      return filterData;

    },

    render: function (data) {

      var _this = this;

      var renderData = {
        list: _this.filter(data.data.banners)
      }

      if (renderData.list.length) {
        this.$el.html(MoGu.ui.getTemplate(this.template, renderData));
      }

    }

  }

  $(function() {

    videoBanner.init();

  });

  function fetchBanner () {

    if (window._bannerAndTabPromise) {
      return window._bannerAndTabPromise;
    }
    else {

      var q = $.Deferred();

      window._bannerAndTabPromise = q;

      MWP.request('mwp.arctic.videoHome4Picture', '1', {}).then(
        function (data) {
          if (data.ret == 'SUCCESS') {
            q.resolve(data);
          }
          else {
            q.reject(data.ret);
          }
        },
        function () {
          q.reject();
        }
      );

      return q;      
      
    }

    

  }

});