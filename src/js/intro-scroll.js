/**
 * @description
 *
 * @author Sacha Rodier <sacha.rodier@wendweb.de>
 */
(function (window, $) {
	var DATA_INTRO_SCROLL = 'data-intro-scroll';
	var DATA_INTRO = 'data-intro';
	var introHeight = $('[' + DATA_INTRO + ']').height();

	var scrollSpeed = 500;

	$('[' + DATA_INTRO_SCROLL + ']').on('click', function () {
		$('body, html').animate({
			scrollTop: introHeight
		}, scrollSpeed);
	});

})(window, jQuery);