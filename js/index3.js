/**
 * Created by dn on 2016/1/18.
 */

$(function() {
	//ï¿½Ëµï¿½ï¿½ï¿½Êµï¿½ï¿½Ô­ï¿½ï¿½
	var $t, leftX, newWidth;

	$('.menu_list').append('<div class="menu_block"></div>');
	var $block = $('.menu_block');

	$block.width($(".current").width()).css('left', $('.current a').position().left).data('rightLeft', $block.position().left).data('rightWidth', $block.width());

	$('.menu_list li').find('a').hover(function() {
		console.log($(this).text());
		$t = $(this);
		leftX = $t.position().left;
		newWidth = $t.parent().width();
		$block.stop().animate({
			left: leftX,
			width: newWidth
		}, 150);
	}, function() {

		$block.stop().animate({
			left: $block.data('rightLeft'),
			width: $block.data('rightWidth')
		}, 150)
	})

	// ï¿½Ëµï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½Ê¾ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½

	var three = $('.dxin').parent().nextAll('li').find('a').data('tab', 'true');

	three.on('click', function(e) {
		if ($(this).data('tab')) {
			three.nextAll().hide();
			$(this).nextAll().show();
		} else {
			three.nextAll().hide();
		}
		// $(this).data('tab',!$(this).data('tab'));
		return false;
	});
	$(document).click(function() {
		three.nextAll().hide();
	});

	//Õ¾ï¿½ï¿½Õ¾ï¿½ï¿½ï¿½ï¿½Ê¾ï¿½ï¿½ï¿½ï¿½

	$('.select').hover(function() {
		$(this).find('.search_all_category').stop().slideToggle();

	});


				;(function($, window, document, undfined) {
					$.fn.extend({
						Phpto_Change: function(ops) {
							var Default = {
								autoPlay: true
							}
							var sittings = $.extend({}, Default, ops);
							return this.each(function(i, elm) {
								var outer_width = $(this).width(),
									inner = $(this).find($('.inner')),
									dot_icon = $(this).find($('.dot-icon')),
									nav_icon = $(this).find($('.nav_icon')),
									timer = null,
									iNow = 0,
									left = nav_icon.find($('.nav_left')),
									right = nav_icon.find($('.nav_right'));
								dot_icon.find('li').on('click', function() {
									var index = $(this).index();
									iNow = index;
									dot_icon.find('li').removeClass('active_dot');
									dot_icon.find('li').eq(index).addClass('active_dot');
									inner.animate({
										left: -(outer_width * index)
									})
								});
								left.on('click', function() {
									iNow++;
									run(iNow);
								});
								right.on('click', function() {
									iNow--;
									run(iNow);
								});
								$('.inner').swipe({
									//Generic swipe handler for all directions
									swipe: function(event, direction, distance, duration, fingerCount, fingerData) {
										console.dir(direction); //·½Ïò
										if (direction == 'left') {
											iNow++;
										} else if (direction == 'right') {
											iNow--;
										}
										//clearInterval(timer);
										run(iNow);
									}
								});
								//Set some options later
								$('.inner').swipe({
									fingers: 1
								}); //µ¥ÊÖÖ¸
								function run(inow_) {
									if (inow_ > dot_icon.find('li').length - 1) {
										inow_ = 0;
									}
									dot_icon.find('li').eq(inow_).trigger('click');
								}

								function autoPlay() {
									timer = setInterval(function() {
										iNow++;
										run(iNow);
									}, 3000)
								}
								if (sittings.autoPlay) {
									autoPlay();
								}
								$(this).hover(
									function() {
										clearInterval(timer);
									},
									function() {
										if (sittings.autoPlay) {
											autoPlay();
										}
									}
								)
							})
						},
						myScroll: function(options) {
							var Default = {
								speed: 40,
								rowHeight: 20,
								lineHeight: 20
							};
							var sttings = $.extend({}, Default, options),
								inted = [];
							this.find('ul li').css({
								'height': sttings.rowHeight,
								'lineHeight': sttings.lineHeight
							});

							function my_scroll(obj, step) {
								obj.find('ul').animate({
									marginTop: '-=1'
								}, 0, function() {
									var mt = Math.abs(parseInt($(this).css('marginTop')));
									//console.log(step);
									if (mt >= step) {
										$(this).find('li:eq(0)').appendTo($(this));
										$(this).css('marginTop', '0');
									}
								});
							}
							return this.each(function(i, elm) {
								var This = $(this),
									speed = sttings.speed,
									_height = sttings.rowHeight;
								(function scrl() {
									clearInterval(This.timer);
									This.timer = setInterval(function() {
										my_scroll(This, _height);
									}, speed);
								}())
								This.hover(
									function() {
										clearInterval(This.timer);
									},
									function() {
										(function scrl() {
											clearInterval(This.timer);
											This.timer = setInterval(function() {
												my_scroll(This, _height);
											}, speed);
										}())
									}
								);
							});
						}
					});
				}(jQuery, window, document))



})