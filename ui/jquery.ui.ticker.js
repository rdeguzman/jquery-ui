/*
 * jQuery UI Ticker @VERSION
 *
 * Copyright 2010, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Ticker
 *
 * Depends:
 *   jquery.ui.core.js
 *   jquery.ui.widget.js
 */
(function( $, undefined ) {
	
var itemClasses = "ui-ticker-content ui-widget-content ui-helper-reset ui-state-default ui-corner-all";

$.widget( "ui.ticker", {
	options: {
		active: true,
		initialTimeout: 4000,
		mouseOnTimeout: 8000,
		mouseOffTimeout: 4000,
		slidingTime: 800,
		fadeTime: 1000,
		next: null
	},
	
	_create: function() {
		var self = this,
			options = self.options;
			
		self.timeoutId = null;
			
		self.speed = options.mouseOffTimeout;
		
		self.element
			.addClass( "ui-ticker ui-widget ui-corner-all" )
			.bind( "mouseenter.ticker", function() {
				if ( options.disabled ) {
					return;
				}
				self.speed = options.mouseOnTimeout;
				if (options.active && self.timeoutId !== null) {
					window.clearTimeout(self.timeoutId);
					self.timeoutId = window.setTimeout(function() { self._scroll(); }, self.speed);
				}
			})
			.bind( "mouseleave.ticker", function() {
				if ( options.disabled ) {
					return;
				}
				self.speed = options.mouseOffTimeout;
				if (options.active && self.timeoutId !== null) {
					window.clearTimeout(self.timeoutId);
					self.timeoutId = window.setTimeout(function() { self._scroll(); }, self.speed);
				}
			});
			
		self.element.children( "li" ).addClass(itemClasses);
		self._addItemBindings(self.element.children( "li" ));
	},
	
	_init: function() {
		var self = this,
			options = self.options;
			
		if (options.active) {
			self.timeoutId = window.setTimeout(function() { self._scroll() }, options.initialTimeout);
		}
	},

	destroy: function() {
		var self = this;
		
		self.element.unbind(".ticker");
		self.element.children( "li" ).unbind(".ticker");
		self.element.removeClass( "ui-ticker ui-widget ui-corner-all" );
		self.element.children( "li" ).removeClass(itemClasses + " ui-state-hover ui-state-focus");
		if (self.timeoutId !== null) {
			window.clearTimeout(self.timeoutId);
			self.timeoutId = null;
		}

		return $.Widget.prototype.destroy.call( self );
	},
	
	_addItemBindings: function(item) {
		var options = this.options;
		
		item
			.bind( "mouseenter.ticker", function() {
				if ( options.disabled ) {
					return;
				}
				$( this ).addClass( "ui-state-hover" );
			})
			.bind( "mouseleave.ticker", function() {
				if ( options.disabled ) {
					return;
				}
				$( this ).removeClass( "ui-state-hover" );
			})
			.bind( "focus.ticker", function() {
				if ( options.disabled ) {
					return;
				}
				$( this ).addClass( "ui-state-focus" );
			})
			.bind( "blur.ticker", function() {
				if ( options.disabled ) {
					return;
				}
				$( this ).removeClass( "ui-state-focus" );
			});
	},
	
	_scroll: function() {
		var self = this,
			options = self.options,
			newItem,
			lastItem;
			
		if (false === self._trigger('beforeScroll')) {
			return;
		}
			
		lastItem = self.element.children().last().clone();
		lastItem.removeClass(itemClasses + " ui-state-hover ui-state-focus");
		
		if (self.options.next !== null) {
			newItem = $( self.options.next(lastItem.get()) );
		
			if (newItem.length > 0) {
				newItem.addClass(itemClasses);
				self._addItemBindings(newItem);
				newItem
					.hide()
					.prependTo(self.element)
					.css('visibility', 'hidden')
					.slideDown(options.slidingTime, function() {
						$( this )
							.fadeTo(0, 0)
							.css('visibility', 'visible')
							.fadeTo(options.fadeTime, 1, function() {
								self._trigger('afterFade');
							});
					});

				self.element.children().last().slideUp(options.slidingTime, function() {
					$( this ).remove();
					self._trigger('afterScroll');
				});
			}
		}
		
		if (options.active) {
			self.timeoutId = window.setTimeout(function() { self._scroll(); }, self.speed);
		}
	},
	
	_setOption: function( key, value ) {
		$.Widget.prototype._setOption.apply( this, arguments );
		
		switch (key) {
			case "active":
				if (value) {
					this.start();
				}
				else {
					this.stop();
				}
				break;
		}
	},
	
	stop: function() {
		var self = this,
			options = self.options;
			
		options.active = false;	
		if (self.timeoutId !== null) {
			window.clearTimeout(self.timeoutId);
			self.timeoutId = null;
		}
 	},
 	
 	start: function() {
		var self = this,
			options = self.options;
		
		options.active = true;
		if (self.timeoutId === null) {
			self.timeoutId = window.setTimeout(function() { self._scroll(); }, options.initialTimeout);
		}
	}
});

$.extend( $.ui.ticker, {
	version: "@VERSION"
});

})( jQuery );