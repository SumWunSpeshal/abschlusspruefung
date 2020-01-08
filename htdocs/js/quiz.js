/**
 * @description
 *
 * @author Sacha Rodier <sacha.rodier@wendweb.de>
 */
(function (window, $) {

	var DATA_START_QUIZ = 'data-start-quiz';

	var DATA_QUIZ_NEXT = 'data-quiz-next';
	var DATA_QUIZ_RETRY = 'data-quiz-retry';
	var DATA_TO_RESULT = 'data-to-result';
	var DATA_FEEDBACK_CURRENT = 'data-feedback-current';
	var DATA_RESULT_MESSAGE = 'data-result-message';

	var DATA_QUIZ_MODAL = 'data-quiz-modal';
	var DATA_QUIZ_MODAL_CLOSE = 'data-quiz-modal-close';
	var DATA_QUIZ_INPUT = 'data-quiz-input';
	var DATA_QUIZ_SLIDE = 'data-quiz-slide';
	var $slide = $('[' +  DATA_QUIZ_SLIDE + ']');
	var DATA_QUIZ_RESULTS = 'data-quiz-results';

	var CLASS_IS_ACTIVE = 'is-active';
	var CLASS_IS_OPENED = 'is-opened';
	var CLASS_IS_CLOSED = 'is-closed';

	var currentStep = 0;
	var correctAnswers = 0;

	/**
	 * jQuery ready; initialize all methods
	 */
	$(init);

	function init() {

		startQuiz();
		closeQuiz();

		chooseAnswer();
		toNextStep();
		retryCurrentQuestion();
		showResults();
	}

	/**
	 * initial quiz launch
	 */
	function startQuiz() {

		$('[' + DATA_START_QUIZ + ']').on('click', function () {
			$('[' + DATA_QUIZ_MODAL + ']').addClass(CLASS_IS_OPENED);

			// show first slide
			resetEverything();
			$slide.eq(0).addClass(CLASS_IS_ACTIVE);
		});
	}

	/**
	 * different closing alternatives
	 */
	function closeQuiz() {

		// close on close button
		$('[' + DATA_QUIZ_MODAL_CLOSE + ']').on('click', function () {
			$(this).closest('[' + DATA_QUIZ_MODAL + ']').removeClass(CLASS_IS_OPENED).addClass(CLASS_IS_CLOSED);
			resetEverything();
		});

		// close on ESC
		$(document).on('keyup', function (event) {

			if (event.key === 'Escape') {
				$('[' + DATA_QUIZ_MODAL + ']').removeClass(CLASS_IS_OPENED).addClass(CLASS_IS_CLOSED);
				resetEverything();
			}
		});
	}

	/**
	 * On radio change, check if answer given is correct and disable all inputs afterwards
	 */
	function chooseAnswer () {

		$('[' + DATA_QUIZ_INPUT + ']').on('change', function () {

			var allInputs = $(this).closest('[' + DATA_QUIZ_SLIDE + ']').find('input');
			var currentSlide = $(this).closest('[' + DATA_QUIZ_SLIDE + ']');
			var currentRetry = currentSlide.find('[' + DATA_QUIZ_RETRY + ']');
			var currentToResult = currentSlide.find('[' + DATA_TO_RESULT + ']');
			var currentNext = currentSlide.find('[' + DATA_QUIZ_NEXT + ']');
			var currentFeedback = currentSlide.find('[' + DATA_FEEDBACK_CURRENT + ']');

			/**
			 * check if answer given is correct -- in this case, increment the total correctAnswers amount.
			 */
			if ($(this).attr(DATA_QUIZ_INPUT) === 'correct') {

				correctAnswers++;
				currentFeedback[0].innerHTML = 'Super, deine Antwort ist RICHTIG!';
			} else {

				currentRetry.addClass(CLASS_IS_ACTIVE);
				currentFeedback[0].innerHTML = 'Oh, leider ist deine Antwort FALSCH.';
			}

			// show 'to result' if last question, otherwise show 'next'
			if (currentSlide.is(':last-child')) {
				currentToResult.addClass(CLASS_IS_ACTIVE);
			} else {
				currentNext.addClass(CLASS_IS_ACTIVE);
			}

			// set all current inputs disabled as soon as answer has been logged in
			allInputs.prop('disabled', true);
		});
	}

	/**
	 * move to next step, open next modal
	 */
	function toNextStep() {

		$('[' + DATA_QUIZ_NEXT + ']').on('click', function () {

			// increment
			currentStep++;

			// show first slide
			$slide.removeClass(CLASS_IS_ACTIVE);
			$slide.eq(currentStep).addClass(CLASS_IS_ACTIVE);

			// reset all feedback messages
			$('[' + DATA_FEEDBACK_CURRENT + ']').each(function () {
				$(this)[0].innerHTML = '';
			});
		});
	}

	/**
	 * enable all inputs again and try again
	 */
	function retryCurrentQuestion() {

		$('[' + DATA_QUIZ_RETRY + ']').on('click', function () {

			var currentInputs = $(this).closest('[' + DATA_QUIZ_SLIDE + ']').find('input');

			// hide all action buttons again
			$(this).closest('[' + DATA_QUIZ_SLIDE + ']').find('button').removeClass(CLASS_IS_ACTIVE);

			// set all current inputs to enabled again
			currentInputs.prop('disabled', false);

			// uncheck all current radios
			currentInputs.each(function () {

				$(this)[0].checked = false;
			});

			// reset own feedback message
			$(this).closest('[' + DATA_QUIZ_SLIDE + ']').find('[' + DATA_FEEDBACK_CURRENT + ']')[0].innerHTML = '';
		});

	}

	function showResults () {

		$('[' + DATA_TO_RESULT + ']').on('click', function () {

			$slide.removeClass(CLASS_IS_ACTIVE);
			$('[' + DATA_QUIZ_RESULTS + ']').addClass(CLASS_IS_ACTIVE);

			initResultScreen();
		});
	}

	/**
	 * restart progress
	 */
	function resetEverything () {

		currentStep = 0;
		correctAnswers = 0;
		$('[' + DATA_QUIZ_RETRY + ']').removeClass(CLASS_IS_ACTIVE);
		$('[' + DATA_TO_RESULT + ']').removeClass(CLASS_IS_ACTIVE);
		$('[' + DATA_QUIZ_NEXT + ']').removeClass(CLASS_IS_ACTIVE);
		$('[' + DATA_QUIZ_RESULTS + ']').removeClass(CLASS_IS_ACTIVE);
		$('[' + DATA_QUIZ_SLIDE + ']').removeClass(CLASS_IS_ACTIVE);

		$('[' + DATA_FEEDBACK_CURRENT + ']')[0].innerHTML = '';
		$('[' + DATA_RESULT_MESSAGE + ']')[0].innerHTML = '';

		$('[' + DATA_QUIZ_MODAL + ']').find('input').each(function () {

			$(this).prop('disabled', false);
			$(this)[0].checked = false;
		});
	}

	/**
	 *	show proper result message according to amount of correct answers
	 */
	function initResultScreen () {

		var $message = $('[' + DATA_RESULT_MESSAGE + ']');

		$('[' + DATA_QUIZ_RESULTS + ']').find('button').addClass(CLASS_IS_ACTIVE);

		switch (correctAnswers) {

			case 0:
				$message[0].innerHTML = 'Huch, du hast 0 von 5 Fragen richtig beantwortet.';
				break;

			case 1:
				$message[0].innerHTML = 'Mmmh, du hast nur 1 von 5 Fragen richtig beantwortet.';
				break;

			case 2:
				$message[0].innerHTML = 'OK, du hast 2 von 5 Fragen richtig beantwortet.';
				break;

			case 3:
				$message[0].innerHTML = 'Gut, du hast 3 von 5 Fragen richtig beantwortet.';
				break;

			case 4:
				$message[0].innerHTML = 'Toll, du hast 4 von 5 Fragen richtig beantwortet!';
				break;

			case 5:
				$message[0].innerHTML = 'Super, du hast 5 von 5 Fragen richtig beantwortet!';
				break;

			default:
				$message[0].innerHTML = 'This should not happen!';
		}
	}
})(window, jQuery);