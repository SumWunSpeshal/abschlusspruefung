/**
 * @description
 *
 * @author Sacha Rodier <sacha.rodier@wendweb.de>
 */
(function (window, $) {

	var DATA_BURGER = 'data-burger';
	var DATA_MOBILE_NAV = 'data-mobile-nav';
	var DATA_MOBILE_NAV_Close = 'data-mobile-nav-close';

	var CLASS_IS_OPEN = 'is-open';

	$('[' + DATA_BURGER + ']').on('click', function () {

		if($('[' + DATA_MOBILE_NAV + ']').hasClass(CLASS_IS_OPEN)) {

			$(this).removeClass(CLASS_IS_OPEN);
			$('[' + DATA_MOBILE_NAV + ']').removeClass(CLASS_IS_OPEN);
		} else {

			$(this).addClass(CLASS_IS_OPEN);
			$('[' + DATA_MOBILE_NAV + ']').addClass(CLASS_IS_OPEN);
		}
	});

	$('[' + DATA_MOBILE_NAV_Close + ']').on('click', function () {
		$('[' + DATA_BURGER + ']').removeClass(CLASS_IS_OPEN);
		$('[' + DATA_MOBILE_NAV + ']').removeClass(CLASS_IS_OPEN);
	});
})(window, jQuery);