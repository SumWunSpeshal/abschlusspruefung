/**
 * @description
 *
 * @author Sacha Rodier <sacha.rodier@wendweb.de>
 */
(function (window, $) {
	var DATA_INTRO = 'data-intro';
	var DATA_HEADER = 'data-header';

	var mobileWidth = 767;
	var headerHeight = 250;
	var CLASS_SCROLLED = 'scrolled';
	var introHeight = $('[' + DATA_INTRO + ']').height() - headerHeight;

	$(init);

	function init() {
		initialHeaderCheck();
		scrollHeaderCheck();
		resizeHeaderCheck();
	}

	function initialHeaderCheck() {
		var currentPosition = $(window).scrollTop();

		if($(window).width() > mobileWidth) {
			headerCheck(currentPosition);
		} else {
			$('[' + DATA_HEADER + '], body').addClass(CLASS_SCROLLED);
		}
	}

	function resizeHeaderCheck() {
		$(window).resize(function () {
			var currentPosition = $(window).scrollTop();

			if($(window).width() > mobileWidth) {
				headerCheck(currentPosition);
			} else {
				$('[' + DATA_HEADER + '], body').addClass(CLASS_SCROLLED);
			}
		});
	}

	function scrollHeaderCheck() {
		$(window).scroll(function () {
			var currentPosition = $(window).scrollTop();

			if($(window).width() > mobileWidth) {
				headerCheck(currentPosition);
			} else {
				$('[' + DATA_HEADER + '], body').addClass(CLASS_SCROLLED);
			}
		});
	}

	function headerCheck(yPosition) {

		if (yPosition > introHeight) {
			$('[' + DATA_HEADER + '], body').addClass(CLASS_SCROLLED);
		} else {
			$('[' + DATA_HEADER + '], body').removeClass(CLASS_SCROLLED);
		}
	}


})(window, jQuery);