/*
	Arcana by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	skel.breakpoints({
		wide: '(max-width: 1680px)',
		normal: '(max-width: 1280px)',
		narrow: '(max-width: 980px)',
		narrower: '(max-width: 840px)',
		mobile: '(max-width: 736px)',
		mobilep: '(max-width: 480px)'
	});

	$(function() {
    setTimeout(function () {
      if (window.location.hash) {
        var el = document.getElementById(window.location.hash.slice(1));
        if (el) {
          scrollTo(el);
        }
      }
    }, 250);

    var headings = $('h1, h2, h3, h4');

    $.each(headings, function (i, el) {
      if (!el.id) {
        // Hyphen-case the innerText if id is missing
        el.id = el.innerText.replace(/\s+/g, '-').toLowerCase();

        // Remove quote chars from id string
        el.id = el.id.replace(/['"]/g, '')
      }
    })

    headings.css('cursor', 'pointer');

    headings.click(function () {
      window.location.href = '#' + this.id;
      var el = document.querySelector(window.location.hash);
      if (el) {
        scrollTo(el);
      }
    })

    function scrollTo (el) {
      if (window.innerWidth < 840) {
        // 60px less so element isn't hidden by mobile navPanel
        $('html, body').scrollTop($(el).offset().top - 60);
      } else {
        $('html, body').scrollTop($(el).offset().top);
      }
    }

		var	$window = $(window),
			$body = $('body');

		// Disable animations/transitions until the page has loaded.
			$body.addClass('is-loading');

			$window.on('load', function() {
				$body.removeClass('is-loading');
			});

		// Fix: Placeholder polyfill.
			$('form').placeholder();

		// Prioritize "important" elements on narrower.
			skel.on('+narrower -narrower', function() {
				$.prioritize(
					'.important\\28 narrower\\29',
					skel.breakpoint('narrower').active
				);
			});

		// Dropdowns.
			$('#nav > ul').dropotron({
				offsetY: -15,
				hoverDelay: 0,
				alignment: 'center'
			});

		// Off-Canvas Navigation.
      var titleHTML = 'Survival and Flourishing Fund';

			// Title Bar.
				$(
					'<div id="titleBar">' +
						'<a href="#navPanel" class="toggle"></a>' +
						'<span class="title">' + titleHTML + '</span>' +
					'</div>'
				)
					.appendTo($body);

			// Navigation Panel.
				$(
					'<div id="navPanel">' +
						'<nav>' +
							$('#nav').navList() +
						'</nav>' +
					'</div>'
				)
					.appendTo($body)
					.panel({
						delay: 500,
						hideOnClick: true,
						hideOnSwipe: true,
						resetScroll: true,
						resetForms: true,
						side: 'left',
						target: $body,
						visibleClass: 'navPanel-visible'
					});

			// Fix: Remove navPanel transitions on WP<10 (poor/buggy performance).
				if (skel.vars.os == 'wp' && skel.vars.osVersion < 10)
					$('#titleBar, #navPanel, #page-wrapper')
						.css('transition', 'none');

	});

})(jQuery);