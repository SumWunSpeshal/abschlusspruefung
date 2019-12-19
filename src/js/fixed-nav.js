/**
 * @description
 *
 * @author Sacha Rodier <sacha.rodier@wendweb.de>
 */
(function (window, $) {
	var DATA_TO_TOP = 'data-to-top';
	var DATA_SHARE_OPENER = 'data-share-opener';
	var DATA_FIXED = 'data-fixed';

	var CLASS_IS_OPEN = 'open';
	var scrollSpeed = 500;

	$('[' + DATA_TO_TOP + ']').on('click', function () {
		$('body, html').animate({
			scrollTop: 0
		}, scrollSpeed);
	});

	$('[' + DATA_SHARE_OPENER + ']').on('click', function () {

		if($(this).hasClass(CLASS_IS_OPEN)) {
			$(this).removeClass(CLASS_IS_OPEN);
		} else {
			$(this).addClass(CLASS_IS_OPEN);
		}
	});

	// click outside
	$(document).on('click', function (event) {

		if($(event.target).closest('[' + DATA_FIXED + ']').length) {
			return;
		}

		$('[' + DATA_SHARE_OPENER + ']').removeClass(CLASS_IS_OPEN);
	});
})(window, jQuery);