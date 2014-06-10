(function ($) {

    $(function () {

        var page = function (opts) {
            opts = opts || {};

            this.container = $('#' + opts.container) || $('#teams');

            this.groups = opts.groups || window.groups;

            this.init();
        };

        page.prototype = {
            _selectedTeams: { },

            init: function () {
                this.initTeams();

                this.bindEvents();
            },

            initTeams: function () {
                this.container.empty();

                var group = null;
                var html = [];

                html.push('<div class="cf group-holder">');

                for (var i = 0; i < this.groups.length; i++) {
                    group = this.groups[i];

                    html.push(this.initGroup(group));
                }

                html.push('</div>');

                this.container.html(html.join(''));
            },

            initGroup: function (group) {
                var html = [];

                html.push('<dl groupid="' + group.name + '">')

                // 组名
                html.push('<dt class="tit-activeCont"><span class="font36B">'
                    + group.name
                    + '</span>'
                    + group.unit + '</dt>');

                // 处理每组内 4 个队伍
                for (var i = 0; i < group.teams.length; i++) {
                    var team = group.teams[i];

                    html.push('<dd class="choose">');

                    html.push('<div class="holderNo" teamid="' + team.id + '"><div class="flag"><div class="icon-right">');

                    html.push('<span class="flag-icon flag-' + team.id + '"></span><i></i>')

                    html.push('</div></div><div class="title title-center">' + team.name + '</div></div>');

                    html.push('</dd>');
                }


                html.push('</dl>');

                return html.join('');
            },

            bindEvents: function () {
                // 绑定 hover 队伍
                $('.holderNo').hover(function () {
                    $(this).addClass('holder');
                }, function () {
                    $(this).removeClass('holder');
                });

                // 绑定队伍点击事件
                $('.holderNo').on('click', $.proxy(this.handleFlagSelect, this));

                // 绑定提交
                $('#submitBtn').on('click', $.proxy(this.bindSubmit, this));
            },

            handleFlagSelect: function (evt) {
                var target = $(evt.target);

                target = target.closest('.holderNo');

                // 判断是否是选中项目
                if (target.hasClass('holderActive')) {
                    this.setUnactive(target);
                }
                else {
                    this.setActive(target);
                }

            },

            setActive: function (target) {
                var dl = target.closest('dl');

                var groupName = dl.attr('groupid');

                if (!this._selectedTeams[groupName]) {
                    this._selectedTeams[groupName] = [];
                }

                if (this._selectedTeams[groupName].length > 1) {
                    var removeItem = this._selectedTeams[groupName].shift();

                    this.setUnactive(removeItem);
                }

                target.addClass('holderActive');

                target.find('i').show();

                this._selectedTeams[groupName].push(target.attr('teamid'));

                this.syncOpacityStatus(dl, groupName);
            },

            setUnactive: function (target) {
                if (typeof target == 'string') {
                    target = $('.holderNo[teamid="' + target + '"]');
                }

                var dl = target.closest('dl');

                var groupName = dl.attr('groupid');

                var teamId = target.attr('teamid');

                // grep， 假如已经被 shift 过后也不会影响结果
                this._selectedTeams[groupName] = $.grep(this._selectedTeams[groupName], function (n, i) {
                    return n != teamId;
                });

                target.removeClass('holderActive');

                target.find('i').hide();

                this.syncOpacityStatus(dl, groupName);
            },

            syncOpacityStatus: function (dl, groupName) {
                if (this._selectedTeams[groupName].length == 2) {
                    dl.find('.holderNo').each(function (i, item) {
                        if (!$(item).hasClass('holderActive')) {
                            $(item).addClass('holderOpacity');
                        }
                    });
                }
                else {
                    dl.find('.holderNo').removeClass('holderOpacity');
                }
            },

            bindSubmit: function () {
                if (confirm("确定选择完16强并提交吗？")) {
                    if ($.isEmptyObject(this._selectedTeams)) {
                        alert('您什么也没选');
                    }
                    else {
                        alert('您的选择是：' + JSON.stringify(this._selectedTeams));
                    }
                }
            }

        };

        var p = new page({ container: 'teams' });
    })

})(jQuery);