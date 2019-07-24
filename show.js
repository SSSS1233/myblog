$(function () {
    //加载广告banner（ajax同步加载）
    function GetLeftADV() {
        $.ajax({
            type: "get",
            dataType: "json",
            //async: false,
            url: "/studentcenter/adv/GetAdvertList",
            timeout: 2000,
            success: function (data) { //成功
                var _banner = '';
                var _bannerbtn = '';
                var _bannerdata = data.data;
                if (_bannerdata != null) {
                    $.each(_bannerdata, function (i) {
                        _banner += '<div class="swiper-slide"><a class="picimglink" href="' + _bannerdata[i].Link + '" target="' + _bannerdata[i].Target + '"><img src="' + _bannerdata[i].ImgUrl + '"/></a></div>'
                    })
                    $('.swiper-container-banner .swiper-wrapper').append(_banner);
                    //初始化幻灯片
                    var mySwiper = new Swiper('.swiper-container-banner', {
                        autoplay: 2000,//可选选项，自动滑动
                        pagination: '.swiper-pagination-banner',
                        height:276
                    })
                }
            }
        });
    }
    GetLeftADV();

    //栏目ID
    var columnId = common.GetQueryString('id');
    var _columnId = common.GetQueryString('columnId');
    if (_columnId) {
        columnId = _columnId;
    }
    //获取顶部TopMId
    function getTopMid() {
        $('.topnav .item').last().css('margin-right', '0px');
        var topMId = common.GetQueryString('TopMId');
        if (topMId == null) {
            topMId = common.GetQueryString('id');
        }
        if (topMId != undefined && topMId != null && topMId != '') {
            var _selecteditem = $('.topnav .item a');
            $('.topnav .item').removeClass('selected');
            switch (topMId) {
                case '3': setSelected('top', '工具资料'); break;
                case '1': setSelected('top', '联系我们'); break;
                case '5': setSelected('top', '通知公告'); break;
                case '6': setSelected('top', '首页'); break;
                case '16': setSelected('top', 'Dr.鹏播课'); break;
            }
        }
        else {
            $('.topnav .item').eq(0).addClass('selected');
        }

    }
    function setSelected(navtype, navname) {
        if (navtype == 'top') {
            $('.topnav .item a').each(function (i) {
                if ($(this).text() == navname) {
                    $(this).parent().addClass('selected');
                }
            })
        }
        if (navtype == 'left') {
            $('.leftpart a').removeClass('selected');
            $('.leftpart a').each(function (i) {
                if ($(this).text() == navname) {
                    $(this).addClass('selected');
                }
            })
        }
    }
    getTopMid();
    //点击顶部菜单
    $('body').on('click', '.topnav .item', function () {
        var _target = $(this).find('a').attr('target');
        if (_target == '' || _target == null) {
            $(this).addClass('selected').siblings().removeClass('selected');
        }
    })
    //左侧导航划过效果
    $(document).find('.leftpartnav').on({
        mouseover: function () {
            var selectedType = $(this).attr('selectedType');
            if (selectedType == 'false') {
                $(this).find('a').addClass('selected')
            }
        },
        mouseout: function () {
            var selectedType = $(this).attr('selectedType');
            if (selectedType == 'false') {
                $(this).find('a').removeClass('selected')
            }
        }

    }, '.li');

    var leftMenu = function (data) {
        var _leftnav = '';
        var _navs = data.data;
        for (i = 0; i < _navs.length; i++) {
            var _item = _navs[i];
            ////统考机器人显示
            //if (_item.Id == 6) {
            //    _item.Name += "<img src='/Content/images/jq.png' style='position: absolute;top: 270px;right: 6px;'>";
            //}
            //选中样式
            var _selected = '';
            var selectedType = false;
            if (columnId == _item.Id) {
                _selected = 'class="selected"';
                selectedType = true
            }
            if (!columnId && _item.IsDefault) {
                _selected = 'class="selected"';
                selectedType = true;
            }
            if (_item.Target != null) {
                _leftnav += '<div selectedType="' + selectedType + '" class="' + _item.Code + ' defaul_theme li"><a href="' + _item.Url + '" target="' + _item.Target + '" ' + _selected + '><i></i>' + _item.Name + '</a></div>';
            } else {
                _leftnav += '<div selectedType="' + selectedType + '" class="' + _item.Code + ' defaul_theme li"><a href="' + _item.Url + '" ' + _selected + '><i></i>' + _item.Name + '</a></div>';
            }
        }
        $('#leftpartnav').append(_leftnav);

    }

    //加载左侧菜单
    //common.call('/StudentCenter/share/left', '', 'get', leftMenu, errorlog, jsonData);
    //加载通知公告
    common.call('/StudentCenter/Notice/GetNoticeJson', '', 'get', function (data) {
        var _noticesHtml = '';
        var _notices = data.data;
        var _message = data.message; //公告未读数量
        if (data.status == 0) {
            if (_message > 99) {
                _message = '99+'
                $('.notice_icon i').text(_message).show();
            } else if (_message != 0) {
                $('.notice_icon i').text(_message).show();
            }
        }
    }, errorlog, jsonData);

    //查看公告
    $('body').on('click', '.noticletitle', function () {
        var _url = $(this).attr('url');
        layer.open({
            title: '公告',
            type: 2,
            area: ['900px', '530px'],
            fix: false, //不固定
            maxmin: true,
            content: _url,
            move: false,
            scrollbar: false
        });
    })
    //学年注册
    var academicid = '';
    function studentRegister() {
        var _data = '';
        var birthdate = '';
        var certificateno = '';
        var graduatedate = '';
        var graduatespeciality = '';
        var graduateschool = '';
        var isregtime = '';
        var lcentername = '';
        var levelname = '';
        var maxdegree = '';
        var mobilephone = '';
        var msg = '';
        var nation = '';
        var personacademicid = '';
        var photo = '';
        var pregraduatecardno = '';
        var realname = '';
        var recruitbatchcode = '';
        var regbtime = '';
        var regetime = '';
        var sex = '';
        var specialityname = '';
        var studyschoolName = '';
        var stustatusbatchcode = '';
        var universityname = '';
        var yearcode = '';
        var yearname = '';
        var _boxHtml = '';
        common.call('/StudentCenter/TeachingManage/GetYearRegInfo', '', 'get', function (data) {
            if (data.status == 0) {
                _data = data.data;
                academicid = _data.academicid;
                birthdate = _data.birthdate;
                certificateno = _data.certificateno;
                graduatedate = _data.graduatedate;
                graduatespeciality = _data.graduatespeciality;
                graduateschool = _data.graduateschool;
                isregtime = _data.isregtime;
                lcentername = _data.lcentername;
                levelname = _data.levelname;
                maxdegree = _data.maxdegree;
                mobilephone = _data.mobilephone;
                msg = _data.msg;
                nation = _data.nation;
                personacademicid = _data.personacademicid;
                photo = '/StudentCenter/User/GetUserPhoto?t=' + (new Date()).getTime();
                pregraduatecardno = _data.pregraduatecardno;
                realname = _data.realname;
                recruitbatchcode = _data.recruitbatchcode;
                regbtime = _data.regbtime;
                regetime = _data.regetime;
                sex = _data.sex == '01' ? '男' : '女';
                specialityname = _data.specialityname;
                studyschoolName = _data.studyschoolName;
                stustatusbatchcode = _data.stustatusbatchcode;
                universityname = _data.universityname;
                yearcode = _data.yearcode;
                yearname = _data.yearname;

                _boxHtml = '<div class="studentregisterbox">' +
                    '<div class="title">学员注册</div>' +
                    '<div class="content">' +
                    '<table class="table-header"><tr><td style="padding-left:0px;padding-right:0px;"><img width="80px" src="' + photo + '" /></td>' +
                    '<td class="alignleft ftstyle-1">同学，您好！新学期开始了，为确保您的平台信息准确、完整、有效，请及时完成本学期的个人信息核对及电子注册，感谢配合！' +
                    '</td></tr></table>' +
                    '<table class="registertable">' +
                    '<tr>' +
                    '<td class="tdbg">出生日期</td>' +
                    '<td>' +
                    birthdate +
                    '</td>' +
                    '<td class="tdbg">性   别</td>' +
                    '<td>' +
                    sex +
                    '</td>' +
                    '<td class="tdbg">手机号码</td>' +
                    '<td>' +
                    mobilephone +
                    '</td>' +
                    '</tr>' +
                    '<tr>' +
                    '<td class="tdbg">证件号码</td>' +
                    '<td>' +
                    certificateno +
                    '</td>' +
                    '<td class="tdbg">民   族</td>' +
                    '<td>' +
                    nation +
                    '</td>' +
                    '<td rowspan="2" class="tdbg">学习中心</td>' +
                    '<td rowspan="2">' +
                    lcentername +
                    '</td>' +
                    '</tr>' +
                    '<tr>' +
                    '<td class="tdbg">高   校</td>' +
                    '<td>' +
                    universityname +
                    '</td>' +
                    '<td class="tdbg">层   次</td>' +
                    '<td>' +
                    levelname +
                    '</td>' +
                    '</tr>' +
                    '<tr>' +
                    '<td class="tdbg">专   业 </td>' +
                    '<td>' +
                    specialityname +
                    '</td>' +
                    '<td class="tdbg">入学批次</td>' +
                    '<td>' +
                    recruitbatchcode +
                    '</td>' +
                    '<td class="tdbg">学籍批次</td>' +
                    '<td>' +
                    stustatusbatchcode +
                    '</td>' +
                    '</tr>' +
                    '<tr>' +
                    '<td class="tdbg">最高学历</td>' +
                    '<td>' +
                    maxdegree +
                    '</td>' +
                    '<td class="tdbg">毕业时间</td>' +
                    '<td>' +
                    graduatedate +
                    '</td>' +
                    '<td rowspan="2" class="tdbg">前置学历</br>毕业院校</td>' +
                    '<td rowspan="2">' +
                    graduateschool +
                    '</td>' +
                    '</tr>' +
                    '<tr>' +
                    '<td class="tdbg">毕业专业</td>' +
                    '<td>' +
                    graduatespeciality +
                    '</td>' +
                    '<td class="tdbg">原毕业证编号</td>' +
                    '<td>' +
                    pregraduatecardno +
                    '</td>' +
                    '</tr>' +
                    '</table>' +
                    '<div class="tips">如个人信息有误请及时通过[个人信息]栏目修改，以免影响您顺利毕业。如有疑问，请联系报名点咨询。祝您学习愉快！</div>' +
                    '<div class="subregister"><input value="注册" type="button" class="btn-4 register" /></div>'
                '</div>' +
                    '</div>';
                layer.open({
                    type: 1,
                    title: false,
                    closeBtn: 0,
                    area: '800px',
                    skin: 'layui-layer-nobg', //没有背景色
                    shadeClose: false,
                    content: _boxHtml,
                    scrollbar: false
                });
            }

        }, errorlog, jsonData);


    }
    //数字滚动
    function numberRuning(name, value) {
        var objName = $(name);
        objName.animate({ count: value }, {
            duration: 1000,
            progress: function () {
                if (this.count != undefined) {
                    objName.text(Math.ceil(this.count));
                } else {
                    objName.text(0);
                }
            }
        }, function () {
            objName.text(value);
        });
    }
    //在线客服
    var _showNewChat = true;
    var WebChat = function (data) {
        if (data.status != 1) {
            $(document.body).append('<script src="/Content/scripts/areas/studentcenter/share/chatMenuList.js"></script>');
            var _status = data.data.status;
            var _url = data.data.url;
            var _title = data.data.name;
            var _qrCodeImgUrl = data.data.QRCodeImgUrl;
            var _onlineHtml = '';
            if (_status == 0) { //显示在线客服  OnlineWebChat
                _onlineHtml = '<div class="onlinechat showChatBox"><a href="javascript:void(0);" title="' + _title + '"><span class="consult_people"></span><div class="text_peng" style="display: none;">咨询Dr.鹏</div></a>';
                _onlineHtml += '</div>';
                _onlineHtml += '<div class="chatClose"><i class="">×</i></div>';

                //聊天窗口
                _onlineHtml += '<div class="chatNew">';
                _onlineHtml += '<div class="arrow"></div>';
                _onlineHtml += '<div class="chatLoading"></div>';
                if (_showNewChat) {
                    var flagChatMenu = checkChatMenu();
                    //聊天窗口iframe
                    _onlineHtml += '<div class="chatMainIframe">';
                    if (flagChatMenu) {
                        var courseID = common.GetQueryString('CourseID');
                        if (courseID == null) courseID = '';
                        _url = '/StudentCenter/Share/Robot?CourseID=' + courseID;
                        if (window.location.href.toLowerCase().indexOf('/mycourse/mycoursedetail') != -1) {
                            _url += '&type=1';
                        }
                        _onlineHtml += '<iframe style="width:100%;height:100%;border: 0px;" scrolling="no" src="" data-src="' + _url + '" id="iframeChat"></iframe>';
                    }
                    else {
                        _url = '/StudentCenter/CallAPI/EliteWebChat';
                        _onlineHtml += '<iframe style="width:100%;height:100%;border: 0px;" scrolling="no" src="/StudentCenter/Share/RobotLoading" data-src="' + _url + '" id="iframeChat"></iframe>';
                    }
                    _onlineHtml += '</div>';
                    //切换聊天窗口类型
                    if (flagChatMenu) {
                        _onlineHtml += '<div class="changeQT" data-type="kc"><span class="fr tipPa" style="margin-right:0"><img src="/Content/images/chat/menu_04.png">&nbsp;教务问题&nbsp;<span class="tip" style="display: none;">非课程问题，客服解答</span></span></div>';
                    }
                    else {
                        _onlineHtml += '<div class="changeQT" data-type="jw"><span class="fr tipPa" style="margin-right:0"><img src="/Content/images/chat/menu_04.png">&nbsp;课程问题&nbsp;<span class="tip" style="display: none;">专业知识，教师答疑</span></span></div>';
                    }
                    _onlineHtml += '</div>';
                }
                else {
                    _onlineHtml = '<div class="onlinechat showChatBox"><a href="' + _url + '" title="' + _title + '" target="_blank"><span class="icon"></span></a></div>';
                }
            }
            else if (_status == 1) { //显示微信客服
                _onlineHtml = '<div class="onlinewechat"><a href="' + _url + '" title="' + _title + '" target="_blank"><span class="icon" style="background-position:-92px -360px;"></span></a></div>';
            }


            var _wechatHtml = '<div class="wechat" style="display: none;"><a href="javascript:void(0)" ><span class="evaluate-img"></span><div class="text_evaluate" style="display: none;">系统评价</div></a><div class="chatimg"><div class="arrow"></div><img src="' + _qrCodeImgUrl + '" /></div></div>';
            var return_top = '<div class="text-top" style="display: none;"><span class="top_img"></span><div class="words" style="display: none;">返回顶部</div>'
            //var _serviceHtml = '<div class="onlineservice">' + _wechatHtml + _onlineHtml + return_top + '</div>';
            var _serviceHtml = '<div class="onlineservice">' + _wechatHtml  + return_top + '</div>';
            $('body').append(_serviceHtml);
            $(document).find('.footer .cont_right').html('<img style="height:85%;" src="' + _qrCodeImgUrl + '">');


            $(window).scroll(function () {
                var top = $(document).scrollTop();
                if (top < 100) {
                    $('.text-top').hide();
                }
                else {
                    $('.text-top').show();
                }
            })
            //右侧系统评价边框问题
            if ($('.onlinechat').html()) {//显示聊天机器人
                $('.wechat>a').css('border-bottom', 'none');
                $('.text-top').css('border-top', 'none');
            }
            if ($('.wechat').css('display') != 'none') {//显示评价
                $('.text-top').css('border-top', 'none');
            }

            $('.text-top').on('click', function () {
                $('body,html').animate({ scrollTop: 0 }, 300);
            })
            //鼠标移进“咨询Dr鹏”
            $('.onlineservice .onlinechat a').mouseenter(function () {
                $('.text_peng').show();
                $('.consult_people').hide();
            })
            $('.onlineservice .onlinechat a').mouseleave(function () {
                $('.text_peng').hide();
                $('.consult_people').show();
                $('.consult_people').css({
                    "font-size": "14px",
                    "font-family": "PingFang SC",
                    "font-weight": "500",
                    "line-height": "16px",
                    "color": "white",
                    "opacity": "1",
                    "width": "34px;",
                    "text-align": "center"
                })
            })
            //鼠标移进“回到顶部”
            $('.text-top').mouseenter(function () {
                $('.top_img').hide();
                $('.words').show();
            })
            $('.text-top').mouseleave(function () {
                $('.top_img').show();
                $('.words').hide();
            })
            //鼠标移进“系统评价”
            $('.wechat').mouseenter(function () {
                $('.text_evaluate').show();
                $('.evaluate-img').hide();
            })
            $('.wechat').mouseleave(function () {
                $('.text_evaluate').hide();
                $('.evaluate-img').show();
            })

            //var addAttr = function (element, attr, src) {
            //    //console.log(element, attr, src)
            //    $('.chatimg>img').attr(attr, src);
            //};
            //addAttr('.chatimg>img', 'src', _qrCodeImgUrl);
            //$('.onlineservice').append();


            //显示二维码
            //$('.wechat').mouseenter(function () {
            //    $(this).find('.chatimg').show();
            //}).mouseleave(function () {
            //    $(this).find('.chatimg').hide();
            //});



            //显示聊天窗口
            $('.showChatBox').click(function () {
                if ($('.chatNew').css('display') == 'none') {
                    $('.chatNew').show();
                    $('.chatLoading').show();
                    try {
                        //智齿聊天窗口：如果留言窗口为显示状态，则主动关闭留言窗口
                        if ($('#iframeChat').contents().find('#divMsg').css('display') == 'block') {
                            $('#iframeChat').contents().find('#divMsg').hide();
                            $('#iframeChat').contents().find('.mask').hide();
                        }
                    } catch (e) {
                        console.log('error')
                    }

                    var _src = $('#iframeChat').attr('src'), _srcdata = $('#iframeChat').data('src');
                    if ((_src == '' || _src.indexOf('RobotLoading') != -1) && _srcdata != '') {
                        var _doamin = window.location.host;
                        var _chatUrl = 'http://' + _doamin + _srcdata;
                        $('#iframeChat').prop('src', _chatUrl);

                        if (IEVersion() == -1) {
                            var iframe = document.getElementById("iframeChat");
                            if (iframe.attachEvent) {
                                iframe.attachEvent("onload", function () {
                                    //iframe加载完成后你需要进行的操作
                                    showChatIFrame();
                                });
                            } else {
                                iframe.onload = function () {
                                    //iframe加载完成后你需要进行的操作
                                    showChatIFrame();
                                };
                            }
                        }
                        else {
                            try {
                                var iframe = document.getElementById("iframeChat");
                                if (iframe.attachEvent) {
                                    iframe.attachEvent("onload", function () {
                                        //iframe加载完成后你需要进行的操作
                                        showChatIFrame();
                                    });
                                } else {
                                    iframe.onload = function () {
                                        //iframe加载完成后你需要进行的操作
                                        showChatIFrame();
                                    };
                                }
                            } catch (e) {
                                showChatIFrame();
                            }
                            finally {
                                setTimeout(function () {
                                    showChatIFrame();
                                }, 1000);
                            }
                        }
                    }
                    else {
                        showChatIFrame();
                    }
                }
                else {
                    $('.chatClose').click();
                }

            });
            //关闭聊天窗口
            $('.chatClose').click(function () {
                $('.chatNew').hide();
                $('.chatClose').hide();
                $('.changeQT').hide();
                if ($('#iframeChat').prop('src').toLowerCase().indexOf('/share/robot') == -1) {
                    $('#iframeChat').prop('src', "/StudentCenter/Share/RobotLoading");
                    var flagChatMenu = checkChatMenu();
                    if (flagChatMenu) {
                        $('.changeQT').data('type', 'kc');
                        $('.changeQT').find('span').html('<img src="/Content/images/chat/menu_04.png">&nbsp;教务问题&nbsp;<span class="tip" style="display: none;">非课程问题，客服解答</span>');
                    }
                    showChatIFrame();
                }
            });
            // 滑过显示提示
            $(".tipPa").mouseover(function () {
                $(this).find(".tip").show();
                event.stopPropagation();
            }).mouseout(function () {
                $(this).find(".tip").hide();
                event.stopPropagation();
            });
        }
    };
    // 客服切换 
    $(document).on('click', '.changeQT', function () {
        $('.chatLoading').show();
        $('.chatClose').hide();
        $('.changeQT').hide();

        var _doamin = window.location.host;
        var _obj = $(this);
        if (_obj.data('type') == 'jw') {
            _obj.data('type', 'kc');
            _obj.find('span').html('<img src="/Content/images/chat/menu_04.png">&nbsp;教务问题&nbsp;<span class="tip" style="display: none;">非课程问题，客服解答</span>');
            var courseID = common.GetQueryString('CourseID');
            if (courseID == null) courseID = '';
            var _chatUrl = 'http://' + _doamin + '/StudentCenter/Share/Robot?CourseID=' + courseID;
            if (window.location.href.toLowerCase().indexOf('/mycourse/mycoursedetail') != -1) {
                _chatUrl += '&type=1';
            }
            $('#iframeChat').prop('src', _chatUrl);

            var iframe = document.getElementById("iframeChat");
            if (iframe.attachEvent) {
                iframe.attachEvent("onload", function () {
                    //iframe加载完成后你需要进行的操作
                    showChatIFrame();
                });
            } else {
                iframe.onload = function () {
                    //iframe加载完成后你需要进行的操作
                    showChatIFrame();
                };
            }
        }
        else {
            _obj.data('type', 'jw');
            _obj.find('span').html('<img src="/Content/images/chat/menu_04.png">&nbsp;课程问题&nbsp;<span class="tip" style="display: none;">专业知识，教师答疑</span>');
            var _chatUrl = 'http://' + _doamin + '/StudentCenter/CallAPI/EliteWebChat';
            $('#iframeChat').prop('src', _chatUrl);

            var iframe = document.getElementById("iframeChat");
            if (iframe.attachEvent) {
                iframe.attachEvent("onload", function () {
                    //iframe加载完成后你需要进行的操作
                    showChatIFrame();
                });
            } else {
                iframe.onload = function () {
                    //iframe加载完成后你需要进行的操作
                    showChatIFrame();
                };
            }
        }
    });
    function showChatIFrame() {
        $('.chatClose').hide();
        $('.changeQT').hide();
        if ($('#iframeChat').attr('src') != '' && $('#iframeChat').attr('src').indexOf('/Share/RobotLoading') == -1) {
            $('.chatMainIframe').show();
            $('.chatLoading').hide();
            $('.chatClose').show();
            $('.changeQT').show();
        }
    }
    //检测IE浏览器
    function IEVersion() {
        var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
        var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器
        var isEdge = userAgent.indexOf("Edge") > -1 && !isIE; //判断是否IE的Edge浏览器
        var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1;
        if (isIE) {
            var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
            reIE.test(userAgent);
            var fIEVersion = parseFloat(RegExp["$1"]);
            if (fIEVersion == 7) {
                return 7;
            } else if (fIEVersion == 8) {
                return 8;
            } else if (fIEVersion == 9) {
                return 9;
            } else if (fIEVersion == 10) {
                return 10;
            } else {
                return 6;//IE版本<=7
            }
        } else if (isEdge) {
            return 'edge';//edge
        } else if (isIE11) {
            return 11; //IE11
        } else {
            return -1;//不是ie浏览器
        }
    }
    $('body').on('click', '.register', function () {
        common.call('/StudentCenter/TeachingManage/SaveAcademicYearRegInfo', { academicid: academicid }, 'post', function (data) {
            if (data.status == 1) {
                layer.alert('接口错误，注册失败！')
            }
            else {
                layer.alert('注册成功！', function () {
                    location.href = '/StudentCenter/Index';
                });
            }
        })
    })
    //积分规则
    $(document).on('click', '#aintegralrule', function () {
        parent.layer.open({
            type: 2,
            title: '积分规则',
            shadeClose: true,
            shade: 0.5,
            area: ['80%', '80%'],
            content: '/StudentCenter/Points/IntegralRule?t=' + Math.random()
        });
    });
    //学习时长
    common.call('/StudentCenter/User/GetTopStatisticsData', '', 'get', function (data) {
        var messageNum = data.data;
        if (data.status == 0) {
            numberRuning('.banner_nav .study_duration', messageNum.OnlineTime);
            numberRuning('.banner_nav .course_num', messageNum.CourseCount);
            numberRuning('.banner_nav .credit', messageNum.CreditHour);
            numberRuning('.banner_nav .learning_points', messageNum.TotalPoints);
        }
    }, errorlog, jsonData);

    //加载基本信息
    var Storage = {}

    Storage.get = function (name) {
        return JSON.parse(sessionStorage.getItem(name));
    }

    Storage.set = function (name, val) {
        sessionStorage.setItem(name, JSON.stringify(val));
    }

    var leftBarsCon = Storage.get('leftBarsCon');
    if (leftBarsCon) {
        leftBasicData(JSON.parse(decodeURI(leftBarsCon)));
    } else {
        common.call('/StudentCenter/user/getuserinfo', '', 'get', function (data) {
            Storage.set('leftBarsCon', encodeURI(JSON.stringify(data)))
            leftBasicData(data);
        }, errorlog, jsonData);
    }

    function leftBasicData(data) {
        if (data.status == 0) {
            var _info = data.data;
            $('.otherinfo .name').html(_info.Realname);
            $('.otherinfo .integral').html('积分:' + _info.TotaPoints);
            $('.otherinfo .opencard').html('学号:' + _info.UniversityStuNo);
            //$('.toparea .logo img').attr('src',_info.UniversityImg);
            $('.progressbox .stutype').html(_info.LevelName + '-' + _info.SpecialityName);
            var arr = ["/Content/css/skin/skin-begin.css", "/Content/css/skin/green.css", "/Content/css/skin/pink.css", "/Content/css/skin/purple.css"];
            var cookieNum = localStorage.getItem('skinKeys');
            if (cookieNum) {
                $("#toggleSkin").attr("href", arr[cookieNum]);
            } else if (_info.Sex == '01') {//男
                $("#toggleSkin").attr("href", arr[0]);
                localStorage.setItem('skinKeys', 0);
            } else if (_info.Sex == '02') {//女
                $("#toggleSkin").attr("href", arr[2])
                localStorage.setItem('skinKeys', 2);
            };
            if (_info.Url != null) {
                $('.quit').append('<div class="universitysite"><a href="' + _info.Url + '" target="_blank">北京大学的学习空间</a></div>');
            }
            if (_info.IsYearRegInfo) {
                studentRegister();
            }
            if (_info.MaintainMsg.Data.status == 0) {
                $('.toparea').before('<div class="usiterror">' + _info.MaintainMsg.Data.data.msg + '</div>');
            }
            var t = common.GetQueryString('t');
            var studentCode = _info.StudentCode;
            var mobilePhone = _info.MobilePhone;
            //type
            //0：绑定
            //1：30未登录验证手机
            if (_info.IsLogin) {
                var flag = 0;
                //location.href = '/StudentCenter/User/BindAndAuthenticate?type=1&flag=' + flag + '&t=' + t + '&studentCode=' + studentCode + '&mobilePhone=' + mobilePhone;
            } else if (!_info.IsBind) {
                //location.href = '/StudentCenter/User/BindAndAuthenticate?type=0&t=' + t + '&studentCode=' + studentCode + '&mobilePhone=' + mobilePhone;
            }
            WebChat(_info.WebChat.Data);
            leftMenu(_info.UserLeftMenu.Data);
        }
    }

    function errorlog() { }

})