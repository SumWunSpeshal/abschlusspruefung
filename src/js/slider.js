/**
 * @description
 *
 * @author Sacha Rodier <sacha.rodier@wendweb.de>
 */
(function (window, $) {

	var DATA_MAP = 'data-map';

	var DATA_SLIDER = 'data-slider';
	var DATA_MODAL = 'data-modal';
	var DATA_MODAL_CLOSE = 'data-modal-close';

	var CLASS_IS_OPEN = 'is-opened';
	var CLASS_IS_CLOSED = 'is-closed';

	$(init);

	function init() {
		slider();
		map();
	}

	function slider() {
		$('[' + DATA_SLIDER + ']').slick({
			dots: false,
			arrows: true,
			infinite: false,
		});

		// close on close button
		$('[' + DATA_MODAL_CLOSE + ']').on('click', function () {
			$(this).closest('[' + DATA_MODAL + ']').removeClass(CLASS_IS_OPEN).addClass(CLASS_IS_CLOSED);
		});

		// close on click outside
		$('[' + DATA_MODAL + ']').on('click', function (event) {

			if ($(event.target).closest('[' + DATA_SLIDER + ']').length) {
				return;
			}

			$(this).removeClass(CLASS_IS_OPEN).addClass(CLASS_IS_CLOSED);
		});

		// close on ESC
		$(document).on('keyup', function (event) {

			if (event.key === 'Escape') {
				$('[' + DATA_MODAL + ']').removeClass(CLASS_IS_OPEN).addClass(CLASS_IS_CLOSED);
			}
		});
	}

	function map() {
		var $stations = $('[' + DATA_MAP + ']').find('a');

		$stations.on('click', function (event) {
			var slideNumber = this.getAttribute('data-goto-slide');

			event.preventDefault();
			$('[' + DATA_SLIDER + ']').slick('slickGoTo', slideNumber - 1);
			$('[' + DATA_MODAL + ']').removeClass(CLASS_IS_CLOSED).addClass(CLASS_IS_OPEN);
		});
	}

})(window, jQuery);