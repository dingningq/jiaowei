/**
 * Created by dn on 2016/1/18.
 */

$(function () {
    //菜单条实现原理
    var $t, leftX, newWidth;

    $('.menu_list').append('<div class="menu_block"></div>');
    var $block = $('.menu_block');

    $block.width($(".current").width()).css('left', $('.current a').position().left).data('rightLeft', $block.position().left).data('rightWidth', $block.width());

    $('.menu_list li').find('a').hover(function () {
        console.log($(this).text());
        $t = $(this);
        leftX = $t.position().left;
        newWidth = $t.parent().width();
        $block.stop().animate({
            left: leftX,
            width: newWidth
        }, 150);
    }, function () {

        $block.stop().animate({
            left: $block.data('rightLeft'),
            width: $block.data('rightWidth')
        }, 150)
    })

    // 菜单条的显示与隐藏

    var three = $('.dxin').parent().nextAll('li').find('a').data('tab', 'true');

    three.on('click', function (e) {
        if ($(this).data('tab')) {
            three.nextAll().hide();
            $(this).nextAll().show();
        } else {
            three.nextAll().hide();
        }
        // $(this).data('tab',!$(this).data('tab'));
        return false;
    });
    $(document).click(function () {
        three.nextAll().hide();
    });

    //站内站外显示隐藏

    $('.select').hover(function () {
        $(this).find('.search_all_category').stop().slideToggle();

    });
    //月份左右滚动
    var myDate = new Date();
    var month = myDate.getMonth();
    //active
    var m = "#m" + (month + 1);
    $(m).addClass("active");
    if (month < 6) {
        $('#s1').show();
        $('#s2').hide();
        $('#zt').val('1');
    } else {
        $('#s2').show();
        $('#s1').hide();
        $('#zt').val('2');
    }


    $("#l").on("click", function () {
        var zt = $("#zt").val();
        if (zt == 1) {
            return false;
        } else {
            $('#s1').show();
            $('#s2').hide();
            $("#zt").val('1')
        }
    });

    $("#r").on("click", function () {
        var zt = $("#zt").val();
        if (zt == 2) {
            return false;
        } else {
            $('#s2').show();
            $('#s1').hide();
            $("#zt").val('2')
        }
    });
    //信息公开展开收缩效果
    $(".xxgk_arrow_close").click(function () {
        $(this).hide().next(".xxgk_arrow_open ").show();
        $(this).parent(".xxgk_box").find(".xxgk_bar1").hide().next(".xxgk_bar2").show();
    })
    $(".xxgk_arrow_open").click(function () {
        $(this).hide().prev(".xxgk_arrow_close ").show();
        $(this).parent(".xxgk_box").find(".xxgk_bar2").hide().prev(".xxgk_bar1").show();
    })

    //办事服务展开收缩效果
    $(".business_sever_box .b_arrow_close").click(function () {
        $(this).hide().next(".b_arrow_open ").show();
        $(this).parents(".business_sever_box").find(".business_box").show();
    })
    $(".business_sever_box .b_arrow_open").click(function () {
        $(this).hide().prev(".b_arrow_close ").show();
        $(this).parents(".business_sever_box").find(".business_box").hide();
    })
//政民互动展开收缩效果
    $(".interact .b_arrow_close").click(function () {
        $(this).hide().next(".b_arrow_open ").show();
        $(this).parents(".interact").find(".interBox1").hide().next(".interBox2").show();
    })
    $(".interact .b_arrow_open").click(function () {
        $(this).hide().prev(".b_arrow_close ").show();
        $(this).parents(".interact").find(".interBox2").hide().prev(".interBox1").show();
    })

//教育资源鼠标滑动效果
    
    $(".edu_res_box1 li").hover(function(){

        var num=$(this).index();
        //$(this).find("img").attr("src","images/+'num'+_03.png")
    })
//向上滚动的插件
    ;
    (function ($, window, document, undfined) {
        $.fn.extend({
            Phpto_Change: function (ops) {
                var Default = {
                    autoPlay: true
                }
                var sittings = $.extend({}, Default, ops);
                return this.each(function (i, elm) {
                    var outer_width = $(this).width(),
                        inner = $(this).find($('.inner')),
                        dot_icon = $(this).find($('.dot-icon')),
                        nav_icon = $(this).find($('.nav_icon')),
                        timer = null,
                        iNow = 0,
                        left = nav_icon.find($('.nav_left')),
                        right = nav_icon.find($('.nav_right'));
                    dot_icon.find('li').on('click', function () {
                        var index = $(this).index();
                        iNow = index;
                        dot_icon.find('li').removeClass('active_dot');
                        dot_icon.find('li').eq(index).addClass('active_dot');
                        inner.animate({
                            left: -(outer_width * index)
                        })
                    });
                    left.on('click', function () {
                        iNow++;
                        run(iNow);
                    });
                    right.on('click', function () {
                        iNow--;
                        run(iNow);
                    });
                    $('.inner').swipe({
                        //Generic swipe handler for all directions
                        swipe: function (event, direction, distance, duration, fingerCount, fingerData) {
                            console.dir(direction); //·??ò
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
                    }); //??????
                    function run(inow_) {
                        if (inow_ > dot_icon.find('li').length - 1) {
                            inow_ = 0;
                        }
                        dot_icon.find('li').eq(inow_).trigger('click');
                    }

                    function autoPlay() {
                        timer = setInterval(function () {
                            iNow++;
                            run(iNow);
                        }, 3000)
                    }

                    if (sittings.autoPlay) {
                        autoPlay();
                    }
                    $(this).hover(
                        function () {
                            clearInterval(timer);
                        },
                        function () {
                            if (sittings.autoPlay) {
                                autoPlay();
                            }
                        }
                    )
                })
            },
            myScroll: function (options) {
                var Default = {
                    speed: 40,
                    rowHeight: 20,
                    lineHeight: 20,
                    Timeout: false,
                    delay_time: 3000
                };
                var sttings = $.extend({}, Default, options),
                    inted = [];
                this.find('ul li').css({
                    'height': sttings.rowHeight,
                    'lineHeight': sttings.lineHeight
                });

                return this.each(function (i, elm) {
                    var This = $(this),
                        speed = sttings.speed,
                        _height = sttings.rowHeight;

                    function my_scroll(obj, step) {
                        var _tab = false;
                        obj.find('ul').animate({
                            marginTop: '-=1'
                        }, 0, function () {
                            var mt = Math.abs(parseInt($(this).css('marginTop')));
                            //console.log(step);
                            if (mt >= step) {
                                $(this).find('li:eq(0)').appendTo($(this));
                                $(this).css('marginTop', '0');
                                if (parseInt($(this).css('marginTop')) == 0 && sttings.Timeout) {
                                    clearInterval(This.timer);
                                    This.timer2 = setTimeout(function () {
                                        setTimer();
                                    }, sttings.delay_time)
                                }
                            }
                        });
                    }

                    function setTimer() {
                        clearInterval(This.timer);
                        This.timer = setInterval(function () {
                            my_scroll(This, _height);
                        }, speed);
                    }

                    setTimer();
                    This.hover(
                        function () {
                            clearTimeout(This.timer2);
                            clearInterval(This.timer);
                        },
                        function () {
                            setTimer();
                        }
                    );
                });
            }
        });
    }(jQuery, window, document))
})
