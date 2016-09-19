(function ($) {
    var $window = $(window);
    var baseline;

    var currentHeight;
    var currentScroll;

    var documentHeight;

    var scrollQueue = [];
    // events strings
    var eventScroll = "scroll";
    var eventResize = "resize";
    var bothEvents = eventScroll + " " + eventResize;


    $.fn.scrollBind = function (action, optionsArr) {
        if (!action) {
            return;
        }

        if (!baseline) {
            syncBaseline();
        }

        if (!documentHeight) {
            documentHeight = $(document).height();
        }

        return this.each(applyBehavior);

        function applyBehavior() {
            var $this = $(this);

            var top = $this.offset().top;

            // !!!!!!!
            if (!top) {
                top = $this.closet(":visible").offset().top;
            }

            // load or enqueue
            (top < baseline) ? loadNow($this, action, optionsArr) : addToQueue({ top: top, item: $this, action: action, opts: optionsArr });
        }

    }

    function syncBaseline(event) {
        if (!event) {
            currentScroll = $window.scrollTop();
            currentHeight = $window.height();
        }
        else {
            // on resize find the window height
            if (event.type == eventResize) {
                currentHeight = $window.height();
            }
            // on scroll find where the window is scrolled to
            else if (event.type == eventScroll) {
                currentScroll = $window.scrollTop();
            }
        }
        baseline = currentHeight + currentScroll;
    }

    function loadNow($item, action, opts) {
        action.call($item, opts);
    }

    function addToQueue(obj) {
        // the first time
        if (!scrollQueue.length) {
            attachEvents();
        }

        scrollQueue.push(obj);
    }

    function attachEvents() {
        $window.bind(bothEvents, scrollHandler);
    }

    function scrollHandler(e) {
        syncBaseline(e);

        // load now if scrollQueue.top <= baseline
        for (var i = scrollQueue.length - 1; i >= 0;  i--) {
            if (scrollQueue[i].top <= baseline) {
                var item = scrollQueue[i];
                loadNow(item.item, item.action, item.opts);
                scrollQueue.splice(i, 1);
            }
        }

        if (!scrollQueue.length) {
            $window.unbind(bothEvents, scrollHandler);
        }
    }

})(jQuery);