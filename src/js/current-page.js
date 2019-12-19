/**
 * @description
 *
 * @author Sacha Rodier <sacha.rodier@wendweb.de>
 */
(function (window, $) {

	var DATA_NAV_LINK = 'data-nav-link';

	var currentURL = window.location.href;
	var CLASS_IS_ACTIVE = 'is-active';

	$(init);

	function init() {
		checkUrl();
	}

	function checkUrl () {

		if (currentURL.includes('index')) {
			$('[' + DATA_NAV_LINK + '=' + 'start' + ']').addClass(CLASS_IS_ACTIVE);
			return;
		}

		if (currentURL.includes('lehrpfade')) {
			$('[' + DATA_NAV_LINK + '=' + 'lehrpfade' + ']').addClass(CLASS_IS_ACTIVE);
			return;
		}

		if (currentURL.includes('impressum')) {
			$('[' + DATA_NAV_LINK + '=' + 'impressum' + ']').addClass(CLASS_IS_ACTIVE);
			return;
		}

		$('[' + DATA_NAV_LINK + '=' + 'start' + ']').addClass(CLASS_IS_ACTIVE);
	}

})(window, jQuery);