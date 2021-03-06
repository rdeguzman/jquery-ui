[jQuery UI](http://jqueryui.com/) - Interactions and Widgets for the web
================================

This fork of jQuery UI includes a Twitter like ticker in the ticker branch. A [live demo](http://medihack.github.com/tickerdemo/) with some customized style sheets can be found [here](http://medihack.github.com/tickerdemo/).

The Ticker in its raw form is fully compatible with the jQuery UI Theming framework. It is also quite flexible and fully Unit tested (qunit).

There are several options to easily customize the visualization:

    $("#ticker").ticker({  // #ticker is the id of an <ul> element that contains the <li> ticker elements
      initialTimeout: 2000,  // the initial timeout to start the ticker after the site was loaded (in ms)
      mouseOnTimeout: 6000,  // the timeout before the next item shows up when the mouse pointer is over the ticker
      mouseOffTimeout: 4000, // the timeout before the next item shows up when the mouse pointer is somewhere else
      scrollTime: 1200,  // the times it takes to scroll down the item list
      fadeTime: 1000, // the time it takes to fade in the next item at the top of the item list
      next: function(lastItem, nextItem) {  // this function provides a clone of the last item on the list that will be removed next
		return $("<li>next item</li>"); // the next item for the ticker can be returned
        // or
        nextItem($("<li>next item</li>")); // or be provided to the nextItem function (useful for asynchronous Ajax requests)
      }  // the next item must be wrapped in a <li> tag
    });

If the nextItem function was not called before the next scroll would take place then the next scroll is passed.

There are also several events fired:<br>
beforeScroll // directly before the ticker scrolls<br>
afterScroll // directly after the ticker scrolled<br>
afterFade // directly after the new item was faded in<br>

To bind to an event (the common jQuery UI way):

    $("#ticker").ticker({
      nextItem: function(lastItem, nextItem) { nextItem($('<li>TestItem</li>')); },
      beforeScroll: function(event, ui) { // just do what you like to do }
    });

We also provide some methods:<br>
stop // stop the ticker immediately (respectively after the scrolling/fading is finished)<br>
start // start the ticker again<br>

To call those methods (the common jQuery UI way):

    $("#ticker").ticker("stop");