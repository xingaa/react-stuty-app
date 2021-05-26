//选人控件
(function ($) {
    // 控件执行
    // 参数{AutoTrim:true,DefaultValue:datavalue,OnChange:""}
    //可以通过  $("#id").SheetTextBox(参数)  来渲染控件和获取控件对象
    $.fn.SheetUser = function () {
        return $.MvcSheetUI.Run.call(this, "SheetUser", arguments);
    };
    //update by luxm第一次加载表单的时候没有走MappingControlsHandler中的if方法导致联动失效
    var isInit = true;
    // 构造函数
    $.MvcSheetUI.Controls.SheetUser = function (element, ptions, sheetInfo) {
        //console.log("$.MvcSheetUI.PortalRoot="+ $.MvcSheetUI.PortalRoot);
        // 选择数据集合
        this.Choices = {};
        // 所有选择的元素
        this.ChoicesElement = null;
        // 搜索输入框元素
        this.SearchElement = null;
        this.SearchTxtElement = null;
        this.SearchButton = null;
        // 获取选中的组织ID
        this.SelectedValue = null;
        // 获取当前搜索关键字
        this.SearchKey = null;
        this.SearchMode = false;
        this.KeyTime = null;
        // 搜索结果
        this.SearchResults = [];
        // 组织机构容器
        this.SelectorPanel = null;
        // 真组织机构容器
        this.isSelectorPanel = null;
        // 只在 Enter 进行搜索
        this.EnterSearch = true;
        this.OrgTreePanel = null;
        this.OrgListPanel = null;
        this.IsOverSelectorPanel = false;
        var url = $.MvcSheetUI.PortalRoot ? $.MvcSheetUI.PortalRoot : "/Portal";
        this.SheetUserHandler = $.MvcSheetUI.PortalRoot + "/SheetUser/LoadOrgTreeNodes";
        this.SheetGetUserProperty = $.MvcSheetUI.PortalRoot + "/SheetUser/GetUserProperty";
        this.SheetGetUserProperty = url + "/SheetUser/GetUserProperty";
        // console.log($.MvcSheetUI.PortalRoot, '$.MvcSheetUI.PortalRoot--------------------')
        // console.log(this.SheetGetUserProperty, 'this.SheetGetUserProperty')
        this.ModelControl = null;
        $.MvcSheetUI.Controls.SheetUser.Base.constructor.call(this, element, ptions, sheetInfo);
    };

    // 继承及控件实现
    $.MvcSheetUI.Controls.SheetUser.Inherit($.MvcSheetUI.IControl, {
        //移动端
        RenderMobile: function () {
            //baosc s
            //初始展示当前用户OU人员  包括虚拟用户
            //if ($.MvcSheetUI.SheetInfo.UserOUMembers || !this.UserVisible) {
            //} else {
            //    $.MvcSheetUI.SheetInfo.UserOUMembers = [];
            //    var parentUnits = $.MvcSheetUI.SheetInfo.DirectParentUnits;
            //    for (var key in parentUnits) {
            //        var loadUrl = this.SheetUserHandler + "?IsMobile=true&ParentID=" + key + "&o=U";
            //        $.ajax({
            //            type: "GET",
            //            url: loadUrl,
            //            dataType: "json",
            //            async: false,//同步执行
            //            success: function (data) {
            //                var filterdata = $.grep(data, function (value) {
            //                    if (value.ExtendObject.UnitType == "U") {
            //                        return value;
            //                    }
            //                });
            //                $.MvcSheetUI.SheetInfo.UserOUMembers = $.MvcSheetUI.SheetInfo.UserOUMembers.concat(filterdata);
            //            }
            //        });
            //    }
            //}
            ////baosc e

            //是否多选
            this.IsMultiple = this.LogicType == $.MvcSheetUI.LogicType.MultiParticipant;
            //不可用
            if (!this.Editable) {
                $(this.Element).prop("readonly", true);
                $(this.Element).addClass(this.Css.Readonly);
                $(this.Element).addClass("item-content");
            } else {
                this.MoveToMobileContainer();
                var that = this;
                //ionic初始化控件
                this.ionicInit(that, $.MvcSheetUI.IonicFramework);
            }
            //初始化默认值
            this.InitValue();
        },
        //Ionic初始化
        ionicInit: function (that, ionic) {

            //tll:传阅、征询、转发界面展示人员头像采用bpm-sheet-user-selected标签，保存之前表单设计
            if (that.DataField == "fetchUserSelect") {
                ionic.TempScope = ionic.$scope;
                ionic.$scope = $.MvcSheetUI.IonicFramework.$scopeFetchUser;
                var loadOptions = that.GetLoadTreeOption();
                var loadUrl = that.SheetUserHandler + "?IsMobile=true&Recursive=" + that.Recursive;
                var ngmodel = encodeURI(that.DataField).replace(/%/g, '_') + that.Options.RowNum;
                //  that.Mask.parent().addClass("item-icon-right").css("width", "0px");;
                // that.Mask.after('<i class="icon icon-rightadd"></i>');
                that.Mask.parent().addClass("item-icon-right");
                that.Mask.after('<i class="icon ion-ios-arrow-right"></i>');
                var tagName = ngmodel;
                if (tagName.indexOf('.') > -1) {
                    tagName = tagName.replace('.', '_');
                }
                ionic.$scope["sheetUsers" + tagName] = that.ConvertIonicItems(that.GetChoices());
                if (that.Editable) {
                    ionic.$scope["sheetShow"] = true;
                } else {
                    ionic.$scope["sheetShow"] = false;
                }
                //非编辑状态下展示**人*部门
                if (that.V && !that.Editable && that.IsMultiple) {
                    var user = [];
                    var dep = [];
                    that.V.forEach(function (n, i) {
                        if (n.ContentType == 'U') {
                            user.push(n);
                        } else {
                            dep.push(n);
                        }
                    });
                    var obj = $.format(SheetLanguages.Current.Record, user.length, dep.length);
                    that.Mask.parent().before('<span class="record">' + obj + '</span>');
                }

                that.Mask.parent().parent().after('<div class="line"></div>');
                if (that.DataField == "fetchUserSelect") {
                    that.Mask.parent().parent().after('<bpm-sheet-user-selected sheet-show="sheetShow" tag-name="' + tagName + '"  select-users="sheetUsers' + tagName + '" cancel-selected="delUserItem"></bpm-sheet-user-selected>');
                    // var add = $(' ')

                    // that.Mask.parent().parent().after(add);
                }
                that.Mask.parent().parent().attr("data-scopedata", ngmodel);
                that.Mask.parent().parent().attr("data-loadurl", loadUrl);
                that.Mask.parent().parent().attr("data-datafield", ngmodel);
                if (that.Editable) {
                    that.Mask.parent().parent().unbind("click.sheetUser").bind("click.sheetUser", function () {
                        var dataField = $(this).attr("data-scopedata");
                        var loadUrl = $(this).attr("data-loadurl");

                        if (that.DataField == "fetchUserSelect") {
                            ionic.$scope = $.MvcSheetUI.IonicFramework.$scopeFetchUser;
                        } else if (ionic.TempScope) {
                            ionic.$scope = ionic.TempScope;
                        }
                        var obj = ionic.$scope[ngmodel];
                        console.log(obj, 'obj')
                        var options = {
                            options: obj.Options,
                            selecFlag: that.GetSelectableFlag(),
                            dataField: dataField,
                            ngmodel: ngmodel,
                            loadUrl: loadUrl,
                            loadOptions: obj.GetLoadTreeOption(),
                            initUsers: obj.GetChoices(),
                            isMutiple: obj.IsMultiple
                        };
                        $.MvcSheetUI.sheetUserParams = options;
                        ionic.$state.go("form.sheetuser", {
                            index: 0,
                            parentID: ""
                        });
                    });
                } else {
                    // that.Mask.parent().css("display", "none");
                }
                ionic.$compile(that.Mask.parent().parent().next())(ionic.$scope);
                ionic.$scope[ngmodel] = that;
            } else {
                var loadOptions = that.GetLoadTreeOption();
                var loadUrl = that.SheetUserHandler + "?IsMobile=true&Recursive=" + that.Recursive;
                var ngmodel = that.DataField + that.Options.RowNum;
                that.Mask.parent().addClass("item-icon-right");
                that.Mask.after('<i class="icon ion-ios-arrow-right"></i>');
                that.Mask.parent().parent().attr("data-scopedata", that.DataField);
                that.Mask.parent().parent().attr("data-loadurl", loadUrl);
                that.Mask.parent().parent().attr("data-datafield", that.DataField);
                that.Mask.parent().parent().unbind("click.sheetUser").bind("click.sheetUser", function () {
                    var dataField = $(this).attr("data-scopedata");
                    var loadUrl = $(this).attr("data-loadurl");
                    var obj = ionic.$scope[ngmodel];
                    console.log(ionic.$scope[ngmodel], 'ionic.$scope');
                    console.log(ngmodel, 'ngmodel');
                    // debugger
                    var options = {
                        options: obj.Options,
                        selecFlag: that.GetSelectableFlag(),
                        dataField: dataField,
                        ngmodel: ngmodel,
                        loadUrl: loadUrl,
                        loadOptions: obj.GetLoadTreeOption(),
                        initUsers: obj.GetChoices(),
                        isMutiple: obj.IsMultiple
                    };
                    $.MvcSheetUI.sheetUserParams = options;
                    // console.log($.MvcSheetUI.sheetUserParams, '$.MvcSheetUI.sheetUserParams')
                    ionic.$state.go("form.sheetuser", {
                        index: 0,
                        parentID: ""
                    });
                });
            }
            ionic.$scope[ngmodel] = that;
        },
        //转化成IONIC所需要的对象格式
        ConvertIonicItems: function (users) {
            var objs = [];
            if (users) {
                if (users.constructor == Object) {
                    var tempUser = {
                        id: users.ObjectID,
                        name: users.Name,
                        type: users.type,
                        UserGender: users.UserGender,
                        UserImageUrl: users.UserImageUrl
                    };
                    objs.push(tempUser);
                } else {
                    users.forEach(function (n, i) {
                        var tempUser = {
                            id: n.ObjectID,
                            name: n.Name,
                            type: n.type,
                            UserGender: n.UserGender,
                            UserImageUrl: n.UserImageUrl
                        };
                        objs.push(tempUser);
                    });
                }
            }
            console.log(objs);

            return objs;
        },
        //清除所有的选择
        ClearChoices: function () {
            for (var ObjectID in this.Choices) {
                this.RemoveChoice(ObjectID);
            }
            this.OnMobileChange();
        },

        //移除选择
        RemoveChoice: function (ObjectID) {
            if (this.Choices[ObjectID]) {
                if (!this.IsMobile) {
                    //this.OrgListPanel.find("input[ObjectID='" + ObjectID + "']").attr("checked", false);
                    //$(this.DivSelectResult).children('[ObjectID="' + ObjectID + '"]').click();
                }
                $("#" + this.Choices[ObjectID].ChoiceID).remove();
                delete this.Choices[ObjectID];
            }
            this.SetSearchTxtElementWidth.apply(this);
            this.Validate();

            this.OnMobileChange();

            if (this.OnChange) {
                this.RunScript(this, this.OnChange, [this]);
            }
        },
        //PC端
        Render: function () {
            if (!this.Visiable) {
                this.Element.style.display = "none";
                return;
            }
            // 查看痕迹
            if (this.TrackVisiable && !this.Originate && this.DataField.indexOf(".") == -1) {
                this.RenderDataTrackLink();
            }
            //是否多选
            this.IsMultiple = this.Options.IsMultiple || this.LogicType == $.MvcSheetUI.LogicType.MultiParticipant;

            //不可用
            if (!this.Editable) {
                $(this.Element).prop("readonly", true);
                $(this.Element).addClass(this.Css.Readonly);
                $(this.Element).css("padding-top", "6px");
            } else {
                this.ClearChoices();
                this.IsLoaded = false;
                this.SelectedValue = "";
                this.__QueryOptions = "";

                //渲染界面
                this.HtmlRender();
                //绑定事件
                this.BindEnvens();
            }

            //初始化默认值
            this.InitValue();
        },

        //初始化值
        InitValue: function () {
            // 设置默认值
            if (this.Originate && !this.V && this.DefaultValue) {
                this.V = this.DefaultValue;
                if (this.V.constructor == String) {
                    if (this.V.toLowerCase() == "originator" || this.V.toLowerCase() == "{originator}") {
                        this.V = this.SheetInfo.Originator;
                    } else if (this.V.toLowerCase() == "{originator.ou}" || this.V.toLowerCase() == "originator.ou") {
                        this.V = this.SheetInfo.OriginatorOU;
                    }
                }
            }
            this.SetValue(this.V);
            //if (this.IsMobile) {
            //    if (this.Editable) {
            //        this.Mask.html(this.GetText());
            //    } else {
            //        $(this.Elment).html(this.GetText());
            //    }
            //}
        },
        //设置组织机构的根目录，传组织编码
        SetRootUnit: function (unitId) {
            // 设置顶点 unit
            // 重新加载树
            this.RootUnitID = RootUnitID;
            this.TreeManager.clear();
            this.TreeManager.loadData(null, this.SheetUserHandler + "?RootUnitID=" + this.RootUnitID);
        },
        //设置值
        SetValue: function (Obj) {
            if (Obj == undefined || Obj == null || Obj == "") {
                if (this.IsMobile) {
                    if (this.Editable) {
                        if (this.PlaceHolder) {
                            this.Mask.text(this.PlaceHolder);
                        } else {
                            this.Mask.text(SheetLanguages.Current.PleaseSelect);
                        }
                        this.Mask.css({
                            'color': '#797f89'
                        });
                    } else {
                        this.Mask.html(this.PlaceHolder);
                    }
                    return;
                } else {
                    return;
                }
            }
            if (Obj.constructor == Object) {
                this.AddChoice({
                    ObjectID: Obj.Code,
                    Name: Obj.Name,
                    type: Obj.ContentType,
                    UserGender: Obj.UserGender,
                    UserImageUrl: Obj.UserImageUrl
                });
            } else if (Obj.constructor == Array) {
                for (var i = 0; i < Obj.length; i++) {
                    if (Obj[i].constructor == Object) {
                        this.AddChoice({
                            ObjectID: Obj[i].Code,
                            Name: Obj[i].Name,
                            type: Obj[i].ContentType,
                            UserGender: Obj[i].UserGender,
                            UserImageUrl: Obj[i].UserImageUrl
                        });
                    } else if (Obj[i].constructor == String) {
                        this.AddUserID(Obj[i]);
                        if (!this.IsMultiple)
                            break;
                    }
                }
            } else if (Obj.constructor == String) {
                if (Obj.indexOf("[") > -1) {
                    var users = Obj.replace("[", "").replace("]", "").replace(" ", "").split(",");
                    for (var i = 0; i < users.length; i++) {
                        this.AddUserID(users[i]);
                        if (!this.IsMultiple)
                            break;
                    }
                } else {
                    this.AddUserID(Obj);
                }
            }

            if (this.IsMobile) {
                if (this.Editable) {
                    this.Mask.html(this.GetText());
                    this.Mask.css({
                        'color': '#2c3038'
                    });
                } else {
                    //$(this.Element).html(this.GetText());
                    var txt = this.GetText();
                    var mask = $("<label>").html(this.GetText());
                    $($(this.Element).html("")).append(mask);
                }
            }
        },
        //用户ID
        GetValue: function () {
            var users;
            for (var ObjectID in this.Choices) {
                if (this.IsMultiple) {
                    if (users == undefined)
                        users = new Array();
                    users.push(ObjectID);
                } else {
                    users = ObjectID;
                }
            }
            return users == undefined ? "" : users;
        },
        //转化为对象
        GetChoices: function () {
            var choices;
            for (var ObjectID in this.Choices) {
                if (this.IsMultiple) {
                    if (choices == undefined)
                        choices = new Array();
                    choices.push(this.Choices[ObjectID]);
                } else {
                    choices = this.Choices[ObjectID];
                }
            }
            return choices == undefined ? [] : choices;
        },
        //获取显示
        GetText: function () {
            var userNames;
            for (var ObjectID in this.Choices) {
                if (this.IsMultiple) {
                    if (userNames == undefined)
                        userNames = new Array();
                    userNames.push(this.Choices[ObjectID].Name);
                } else {
                    userNames = this.Choices[ObjectID].Name;
                }
            }
            return userNames == undefined ? "" : userNames.toString();
        },

        //保存数据
        SaveDataField: function () {
            var result = {};
            if (!this.Visiable || !this.Editable)
                return result;
            result[this.DataField] = this.DataItem;
            if (!result[this.DataField]) {
                if (this.DataField.indexOf(".") == -1) {
                    alert(SheetLanguages.Current.DataItemNotExists + ":" + this.DataField);
                }
                return {};
            }

            var users = this.GetValue();
            // if (result[this.DataField].V != users)
            {
                result[this.DataField].V = users;
                return result;
            }
            return {};
        },

        //渲染样式
        HtmlRender: function () {
            this.ID = $(this.Element).attr("ID") || $.MvcSheetUI.NewGuid();
            $(this.Element).attr("ID", this.ID);
            $(this.Element).css("z-index", "inherit");

            //设置页面元素的样式
            $(this.Element).addClass("select2-container select2-container-multi ").attr("data-sheetusercontrol", true);
            $(this.Element).css("min-width", "150px");

            //设置输入框
            if (this.ChoicesElement == null) {
                this.ChoicesElement = $("<ul>").addClass("select2-choices").css("overflow", "hidden");
                this.SearchElement = $("<li>").addClass("select2-search-field");
                this.SearchTxtElement = $("<input>").addClass("form-control").addClass("no-padding");
                this.SearchTxtElement.width("1px");

                //添加输入框
                this.SearchElement.append(this.SearchTxtElement);
                this.ChoicesElement.append(this.SearchElement);
                $(this.Element).append(this.ChoicesElement);
            }

            this.SetSearchTxtElementWidth.apply(this);
            //不可用
            if (!this.Editable) {
                $(this.SearchTxtElement).prop("readonly", true);
                $(this.SearchElement).width("100%");
                $(this.SearchElement).addClass(this.Css.Readonly);
                this.SearchTxtElement.closest("ul").css("border", "0px");
                this.SearchTxtElement.width("100%");
                return;
            }
            if (this.SelectorPanel == null) {
                //组织机构选择Panel
                this.SelectorPanel = $("<div>")
                    .addClass("bordered")
                    .addClass("SelectorPanel")
                    // .css("position", "absolute")
                    .css("position", "fixed")
                    .css("z-index", "888")
                    // .width("100%")
                    .width("400px")
                    .css("min-width", "340px")
                    .css("height", "300px")
                    .css("display", "none")
                    .css("background-color", "#FFFFFF")
                    .attr("data-SheetUserPanel", "SelectorPanel");

                this.OrgTreePanel = $("<div>").css("max-width", "50%")
                    .css("width", "50%").addClass("bordered")
                    .css("float", "left").height("100%").css("overflow", "scroll");
                this.SelectorPanel.append(this.OrgTreePanel);

                // 组织机构选择列表
                this.OrgListPanel = $("<div>").height("100%").css("overflow-y", "auto");
                //增加全选按钮  update by lisonglin 20190118
                this.PanelSelectAll = $('<div class="task" style="padding: 5px 10px; border-bottom: 1px solid rgb(228, 228, 228); cursor: pointer;">' +
                    '<i class="task-sort-icon fa  fa fa-user"></i><span class="task-title" style="word-break: break-all;margin-top: 0;flex-grow:1;padding-left: 4px">' + $.Lang("ReportDesigner.SelectAll") + '</span>' +
                    '<div class="action-checkbox pull-right"><div class="checkbox checkbox-primary checkbox-single" style="padding-top:0;padding-left: 10px">' +
                    '<input type="checkbox" class="styled styled-primary" id="selectAll" value="option2" checked aria-label="Single checkbox Two">' +
                    '  <label></label></div></div></div>');

                this.SelectorPanel.append(this.OrgListPanel);

                // 添加组织机构

                $(this.Element).append(this.SelectorPanel);

            }

            if (!this.Recursive ||
                this.RoleName ||
                this.OrgPostCode ||
                this.UserCodes) { // 只显示下拉框，不显示左侧菜单
                this.OrgTreePanel.hide();
                this.SelectorPanel.css("min-width", "0px");
            } else {
                this.OrgTreePanel.show();
                this.SelectorPanel.css("min-width", "340px");
            }
        },
        //绑定事件
        BindEnvens: function () {
            var that = this;
            if (!this.Editable)
                return; //不可用

            //点击到当前元素，设置input焦点
            $(this.ChoicesElement).unbind("click.SheetUser").bind("click.SheetUser", this, function (e) {
                e.data.SearchTxtElement.focus();
            });

            //得到焦点显示
            $(this.SearchTxtElement).unbind("focusin.SearchTxtElement").bind("focusin.SearchTxtElement", this, function (e) {
                // debugger
                e.data.FocusInput.apply(e.data);
            });
            if (!this.Recursive) { //不递归的时候，直接显示内容
                var SheetUserManager = this;
                console.log(this.SheetUserHandler, this.GetLoadTreeOption());
                debugger
                //读取控件上的属性
                $.ajax({
                    type: "GET",
                    url: this.SheetUserHandler + "?Recursive=false&" + this.GetLoadTreeOption(),
                    dataType: "json",
                    //async: false,//同步执行
                    success: function (data) {
                        console.log(data);

                        for (var i = 0; i < data.length; ++i) {
                            // data[i].Text = SheetUserManager.decrypt(data[i].Text);
                            // data[i].Code = SheetUserManager.decrypt(data[i].Code);
                            // data[i].Text = data[i].Text;
                            // data[i].Code = data[i].Code;
                            SheetUserManager.AddListItem.apply(SheetUserManager, [data[i]]);
                        }
                    }
                });
                if (this.IsMobile) {
                    this.FocusInput();
                } else {
                    $(document).unbind("click." + this.ID).bind("click." + this.ID, this, function (e) {
                        if ($(e.target).closest("div[id='" + e.data.ID + "']").length == 0) {
                            console.log(e);
                            e.data.FocusOutput.apply(e.data, e.target);
                            console.log(document.querySelectorAll(".SelectorPanel"));
                            let hideList = document.querySelectorAll(".SelectorPanel")
                            for (let index = 0; index < hideList.length; index++) {
                                // hideList[index].style.display = "none"

                            }

                        }
                    });
                }
                $(this.SearchTxtElement).prop("readonly", "readonly");
                return;
            }

            if (this.IsMobile) {
                // 输入控件
                $(this.SearchTxtElement).unbind("keydown.SearchTxtElement").bind("keydown.SearchTxtElement", this, function (e) {
                    if (e.which == 13) {
                        e.preventDefault();
                        e.stopPropagation();
                    }
                });

                // 移动端仅在Enter时执行搜索
                $(this.SearchTxtElement).unbind("keyup.SearchTxtElement").bind("keyup.SearchTxtElement", this, function (e) {
                    if (e.which == 13) {
                        e.data.SetSearchTxtElementWidth.apply(e.data);
                        e.data.FocusInput.apply(e.data);
                        e.data.SearchOrg.apply(e.data, [e.data]);
                    }
                });
            } else {
                // 输入控件
                $(this.SearchTxtElement).unbind("keyup.SearchTxtElement").bind("keyup.SearchTxtElement", this, function (e) {
                    e.data.SetSearchTxtElementWidth.apply(e.data);
                    e.data.FocusInput.apply(e.data);
                    e.data.KeyTime = new Date();
                    // setTimeout("e.data.SearchOrg.apply(e.data, [e.data])", 500);
                    var that = e.data;

                    that.SearchOrg.apply(that, [that]);

                });
                $(this.SearchTxtElement).unbind("keydown.SearchTxtElement").bind("keydown.SearchTxtElement", this, function (e) {
                    if (e.keyCode == 8 && $(this).val() == "") {
                        e.data.RemoveChoice.apply(e.data, [$(this).parent().prev().attr("data-code")]);
                    }
                });
            }
            $(document).unbind("click." + this.ID).bind("click." + this.ID, this, function (e) {

                if ($(e.target).closest("div[id='" + e.data.ID + "']").length == 0) {
                    if ($(e.target).hasClass('inputMouseOut')) {
                        $(that.SelectorPanel).css('left', e.clientX)
                    } else {
                        $(that.SelectorPanel).css('left', '');
                    }
                    // $("")
                    e.data.FocusOutput.apply(e.data);
                    // console.log(document.querySelectorAll(".SelectorPanel"));
                    let hideList = document.querySelectorAll(".SelectorPanel")
                    for (let index = 0; index < hideList.length; index++) {
                        // hideList[index].style.display = "none"

                    }

                }
            });
            if (this.IsMobile) {
                $(this.OrgListBtn).unbind("click.OrgListBtn").bind("click.OrgListBtn", this, function (e) {
                    var targetID = $(this).data("targetID");
                    e.data.AddMobilePanel.apply(e.data, [targetID, ""]);
                });
            }
        },
        //移动端:添加panel
        AddMobilePanel: function (id, parentID) {
            this.Level++;
            var that = this;
            var divObj = $("#" + id);
            if (divObj.length == 0) {
                //新pannel
                divObj = $("<div>").attr('id', id).addClass('panel').addClass('no-scroll').hide();
                if (parentID != "") {
                    var parentObj = $("li[objectID='" + parentID + "']>label");
                    if (parentObj.length == 0)
                        parentObj = $("li[objectID='" + parentID + "']");
                    divObj.attr("data-title", parentObj.text());
                } else {
                    divObj.attr("data-title", $.ui.prevHeader.find("#pageTitle").text());
                }
                divObj.attr("data-footer", this.FooterID);
                divObj.data("parentid", parentID);
                var loadUrl = that.SheetUserHandler + "?IsMobile=true&" + that.GetLoadTreeOption();
                if (parentID) {
                    loadUrl = that.SheetUserHandler + "?IsMobile=true&ParentID=" + parentID + "&" + that.GetLoadTreeOption();
                }
                debugger
                $.ajax({
                    type: "GET",
                    url: loadUrl,
                    dataType: "json",
                    context: that,
                    async: false, //同步执行
                    success: function (data) {
                        var ul = $("<ul>").addClass('orglist').addClass('list');
                        that.AddMobileOptions(data, ul);

                        var wrapper = $("<div class='scroll-wrapper'>");
                        wrapper.append(ul);
                        divObj.append(wrapper);

                        $('#content').append(divObj);

                        that.SetMobilePanelRefreshOnload(id);
                    }
                });

                //添加
                //$.ui.addContentDiv(id);
            }

            //显示
            $.ui.loadContent(id);
            //检查是否选中
            this.MobileFindCheckbox(id);
        },

        MobilePreBack: function () {
            var id = "#" + $.ui.activeDiv.id;
            if (this.Level > 0) {
                this.Level--;
            }
            this.MobileFindCheckbox(id);
        },

        //设置页面加载时自动刷新滚动条
        SetMobilePanelRefreshOnload: function (panelId) {
            var that = this;
            //进入页面时自动刷新滚动条
            window.PanelLoadActions = window.PanelLoadActions || {};
            var that = this;
            var fnName = 'F' + this.EditPanel.attr('id').replace(/\-/g, '');

            $('#' + panelId).attr('data-load', 'window.PanelLoadActions.' + fnName)

            window.PanelLoadActions[fnName] = function () {
                setTimeout(function () {
                    that.RefreshMobilePage();
                }, 600);
            }
        },

        AddMobileOptions: function (data, ulList, searchKey) {
            if (data) {
                var that = this;
                if (data instanceof Array) {
                    if (data.length) {
                        $(data).each(function () {
                            that._AddMobileOption(this, ulList, searchKey);
                        })
                    } else {
                        ulList.html('<li class="user-item">没有任何组织</li>');
                    }
                } else {
                    that._AddMobileOption(data, ulList, searchKey);
                }
            } else {
                ulList.html('<li class="user-item">没有任何组织</li>');
            }
        },

        //获取是否允许选择组、OU、用户的标识
        GetSelectableFlag: function () {
            if (typeof (this.__SelectableOption) == 'undefined') {
                this.__SelectableOption = '';

                loadOptions = this.GetLoadTreeOption();
                var o = loadOptions.match(/o=[A-z]*/)
                if (o && o.length) {
                    this.__SelectableOption = o[0].replace('o=', '');
                }
            }
            return this.__SelectableOption;
        },

        //添加可选项
        _AddMobileOption: function (item, ulList, searchKey) {
            debugger
            var selectableFlag = this.GetSelectableFlag();
            var li = $("<li>").addClass('user-item');
            if (selectableFlag.indexOf(item.ExtendObject.UnitType) > -1) {
                var checkboxid = $.uuid();
                var checkbox = $("<input type='checkbox'  id='" + checkboxid + "' data-objectid='" + item.ObjectID + "'/>");
                checkbox.attr("checked", this.Choices && this.Choices[item.ObjectID] != undefined);
                li.append(checkbox);

                var displayText = item.Text;
                if (searchKey) {
                    displayText = displayText.replace(searchKey, "<span class='bg-info'>" + searchKey + "</span>");
                    if (displayText.indexOf("[" + item.Code + "]") == -1) {
                        displayText += "[" + item.Code.replace(searchKey, "<span class='bg-info'>" + searchKey + "</span>") + "]";
                    }
                }

                li.append($("<label type='checkbox' label-for='" + checkboxid + "'>" + displayText + "</label>").css("float", "none").css("left", "25px"));
            } else {
                li.append(item.Text);
            }
            li.attr("objectID", item.ObjectID);
            var targetId = $.uuid();
            li.attr("targetID", targetId);

            if (!item.IsLeaf) {
                var linkelemnt = $("<a data-ignore=true>" + $(li).html() + "</a>");
                $(li).html("").append(linkelemnt);

                li.append($('<div>').addClass('org-expand').css({
                    width: '20%',
                    height: '100%',
                    'z-index': 2,
                    position: 'absolute',
                    right: 0,
                    top: 0
                }));
            }
            ulList.append(li);

            var node = {
                ObjectID: item.ObjectID,
                Name: item.Text
            }
            $(li).unbind("click.OrgListBtn").bind("click.OrgListBtn", [this, node], function (e) {

                var t = e.data[0];
                var n = e.data[1];
                if ($(e.target).is('.org-expand') || $(this).find('input[type=checkbox]').length == 0) {
                    var parentID = $(this).attr("objectID");
                    var targetID = $(this).attr("targetID");
                    $("#defaultHeader>.backButton").data("pannelid", targetId);
                    t.AddMobilePanel.apply(t, [targetID, parentID]);
                } else {
                    var chk = $(this).find("input[type=checkbox]")
                    chk.prop('checked', !chk.prop('checked'));
                    console.log(this);
                    t.UnitCheckboxClick.apply($(this).find("input[type=checkbox]").get(0), e.data);
                }
            });
        },

        //检查是否选中
        MobileFindCheckbox: function (id) {
            if (id == undefined && $.ui.history) {
                id = $.ui.history[$.ui.history.length - 1].target
            }

            if (id.indexOf("#") < 0) {
                id = "#" + id;
            }

            var that = this;
            $(id).find("input:checkbox").each(function () {
                $(this).prop("checked", that.Choices[$(this).attr("data-objectid")] != undefined);
            });
        },

        //设置输入框的宽度
        SetSearchTxtElementWidth: function () {
            if (this.IsMobile) {
                return;
            }
            var w = "1px";
            var length = this.SearchTxtElement.val().length;
            if (length > 0) {
                w = length * 15 + "px";
                this.SearchTxtElement.removeAttr("PlaceHolder", this.PlaceHolder);
            } else if ($.isEmptyObject(this.Choices)) {
                w = "150px"; //update by zhangj
                this.SearchTxtElement.attr("PlaceHolder", this.PlaceHolder);
            } else {
                this.SearchTxtElement.removeAttr("PlaceHolder", this.PlaceHolder);
            }
            $(this.SearchTxtElement).width(w);

            if (this.IsMobile) {
                //$(this.SelectorPanel).css("top", ($(this.Element).height()+20)+"px");
            }

        },

        //获取焦点焦点
        FocusInput: function () {
            // console.log(document.querySelectorAll(".SelectorPanel"));
            // let hideList = document.querySelectorAll(".SelectorPanel")
            // for (let index = 0; index < hideList.length; index++) {
            //     hideList[index].style.display = "none"

            // }
            if (this.IsMobile) {
                return;
            }
            if (this.SelectorPanel.is(":visible"))
                return;
            this.isSelectorPanel = this.SelectorPanel
            console.log(this.isSelectorPanel);
            debugger
            $("div[data-SheetUserPanel='SelectorPanel']").hide();
            this.SelectorPanel.show();
            if (!this.IsMobile && !this.IsLoaded) {
                //加载组织机构树
                this.LoadOrgTree();
            }

            if (!this.IsMobile && this.OrgListPanel.find("input").length == 0) {
                this.TreeManager.selectNode(this.TreeManager.data[0]);
            }
            debugger
        },

        // 失去焦点
        FocusOutput: function (target) {


            if (this.IsMobile) {
                return;
            }
            if ($(this.SearchTxtElement).val().length > 0) {
                this.OrgListPanel.html("");
                $(this.SearchTxtElement).val("");
            }
            if (this.SelectorPanel.is(":hidden"))
                return;
            this.isSelectorPanel.hide();
            $(this.SelectorPanel).css('left', '')
        },

        //处理映射关系
        MappingControlsHandler: function (Object) {
            if (!this.MappingControls)
                return;

            var Propertys = "";
            var MapJson = {};
            var mapping = this.MappingControls.split(',');
            for (var i = 0; i < mapping.length; i++) {
                var map = mapping[i].split(':');
                MapJson[map[0]] = map[1];
                Propertys += map[1] + ";";
            }

            var that = this;
            var param = {
                Command: "GetUserProperty",
                Param: JSON.stringify([Object.ObjectID, Propertys])
            };
            $.MvcSheet.GetSheet(param, function (data) {
                for (var p in data) {
                    for (var key in MapJson) {
                        if (MapJson[key] == p) {
                            //var e = $.MvcSheetUI.GetElement(key, that.RowNum);
                            var e = $.MvcSheetUI.GetElement(key, that.GetRowNumber());
                            //update by luxm 初始化时联动
                            if (e != null && e.data($.MvcSheetUI.SheetIDKey) || e != null && isInit) {
                                isInit = false;
                                e.SheetUIManager().SetValue(data[p]);
                            }
                        }
                    }
                }
            });
        },

        //添加选择:{ObjectID:"",Name:""}
        AddChoice: function (Object) {
            if (!Object)
                return;
            if (!Object.ObjectID)
                return;
            if (this.Choices[Object.ObjectID])
                return;
            if (!this.IsMultiple) { // 清除其他所有选项
                this.ClearChoices();
            }
            this.Choices[Object.ObjectID] = Object;

            //映射关系
            if (this.MappingControls) {
                this.MappingControlsHandler(Object);
            }

            //只读
            if (!this.Editable) {
                $(this.Element).html(this.GetText());
                return;
            }

            var choiceID = $.MvcSheetUI.NewGuid();
            Object.ChoiceID = choiceID;
            var choice = $("<li class='select2-search-choice'></li>")

            var NameDiv = $("<div>" + Object.Name + "</div>");
            choice.css("cursor", "pointer").css("margin-top", "2px").css('background-color', '#fafafa');
            choice.attr("id", choiceID).attr("data-code", Object.ObjectID).append(NameDiv);

            if (this.IsMobile) {
                choice.css("margin-top", "10px")
                // this.ChoicesElement.append(choice);
            } else {
                this.SearchElement.before(choice);
                this.SetSearchTxtElementWidth.apply(this);
                // this.ChoicesElement.append(choice);
                choice.insertBefore(this.ChoicesElement.find("li:last"));
            }

            //关闭按钮
            var colseChoice = $("<a href='javascript:void(0)' class='select2-search-choice-close'></a>");
            choice.append(colseChoice);
            choice.unbind("click.choice").bind("click.choice", this, function (e) {
                //移除当前筛选条件
                e.data.RemoveChoice.apply(e.data, [$(this).attr("data-code")]);
                //触发Input框的chagne事件
                $(e.data.Element).trigger("change");
            });
            //校验
            this.Validate();

            if (this.IsMobile) {
                this.OnMobileChange();
            }

            if (this.OnChange) {
                this.RunScript(this, this.OnChange, [this]);
            }
            $(this.Element).trigger('change');
        },

        OnMobileChange: function () {
            if (this.IsMobile) {
                var that = this;
                setTimeout(function () {
                    that.RefreshMobilePage();
                }, 100)
            }
        },

        RefreshMobilePage: function () {
            //如果当前在选择的主界面里，重新计算高度
            // if ($.ui.activeDiv.id == this.EditPanelID) {
            if (this.EditPanelID) {
                //选中项容器高度自增减
                this.ChoicesPanel.height($(this.ChoicesElement).outerHeight());

                if (this.SelectorPanel) {
                    //搜索框填充页面高度
                    this.SelectorPanel.outerHeight($('#afui').height() - $('header:visible').outerHeight() - $('#footer:visible').outerHeight() - this.ChoicesPanel.outerHeight() - this.SearchElement.parent().outerHeight())
                }
            }

            var that = this;

        },

        _GetScroller: function (wrapperSelector) {
            this.IScrollers = this.IScrollers || {};

            var wrapper = $(wrapperSelector).first();
            var scrollerId = wrapper.data("scroller-id");
            if (!scrollerId) {
                scrollerId = $.uuid();
                wrapper.data("scroller-id", scrollerId);
                this.IScrollers[scrollerId] = new IScroll(wrapper.get(0));
            }
            return this.IScrollers[scrollerId];;
        },

        //Error:这里有时间，可以实现批量的效果
        //添加:UserID/UserCode
        AddUserID: function (UserID) {
            var that = this;
            var param = {
                UserID: UserID,
                Propertystr: "Name;ObjectID"
            };
            debugger
            $.ajax({
                type: "GET",
                url: this.SheetGetUserProperty,
                data: param,
                dataType: "json",
                async: false, //同步执行
                success: function (data) {
                    if (data) {
                        that.AddChoice({
                            ObjectID: data["ObjectID"],
                            Name: data["Name"]
                        });
                    }
                }
            });
        },

        //清除所有的选择
        ClearChoices: function () {
            for (var ObjectID in this.Choices) {
                this.RemoveChoice(ObjectID);
            }
            this.OnMobileChange();
        },

        //移除选择
        RemoveChoice: function (ObjectID) {


            if (this.Choices[ObjectID]) {
                if (!this.IsMobile) {
                    this.OrgListPanel.find("input[ObjectID='" + ObjectID + "']").attr("checked", false);
                }
                $("#" + this.Choices[ObjectID].ChoiceID).remove();
                delete this.Choices[ObjectID];
            }
            this.SetSearchTxtElementWidth.apply(this);
            this.Validate();

            this.OnMobileChange();

            if (this.OnChange) {
                this.RunScript(this, this.OnChange, [this]);
            }

            //更新全选状态
            if (!this.IsMobile && this.IsMultiple && this.IsLoaded) {
                this.OrgListPanel.find("input[ObjectID='" + ObjectID + "']").closest("div.SelectorPanel").find("#selectAll").prop("checked", this.isAllSelect(this.Choices));
            }
        },

        //加载组织机构树
        LoadOrgTree: function () {
            debugger
            //加载样式和脚本
            if (!this.OrgTreePanel)
                return;
            var that = this;
            var treeUl = $("<ul>").css("min-width", "520px");
            this.OrgTreePanel.append(treeUl);

            //加载LigerUI
            if (!treeUl.ligerTree) {
                $("body:first").append("<link rel='stylesheet' type='text/css' href=" + $.MvcSheetUI.PortalRoot + "'/WFRes/_Content/themes/ligerUI/Aqua/css/ligerui-tree.less' />");
                $.ajax({
                    url: $.MvcSheetUI.PortalRoot + "/WFRes/_Scripts/ligerUI/ligerui.all.js",
                    type: "GET",
                    dataType: "script",
                    async: false, //同步请求
                    global: false
                });
                debugger
            }

            this.IsLoaded = false;
            var paramOptions = this.GetLoadTreeOption();
            this.TreeManager = $(treeUl).ligerTree({
                checkbox: false,
                idFieldName: 'Code',
                textFieldName: 'Text',
                iconFieldName: "Icon",
                btnClickToToggleOnly: true,
                isExpand: 2,
                isLeaf: function (data) {
                    return data.IsLeaf;
                },
                // render: function(e, data) {
                //     var textHtml = '<span title="'+ data +'" ' +
                //         'style="display:inline-block;max-width: 200px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">'+ data +'</span>';
                //     return textHtml
                // },
                delay: function (e) {
                    // e.data.Text = that.decrypt(e.data.Text);
                    // e.data.Code = that.decrypt(e.data.Code);
                    // e.data.Text = e.data.Text;
                    // e.data.Code = e.data.Code;
                    var node = e.data;
                    if (node == null)
                        return false;
                    if (node.IsLeaf == null)
                        return false;
                    if (!node.IsLeaf && node.children == null) {
                        return {
                            url: that.SheetUserHandler + "?ParentID=" + node.Code + "&LoadTree=true&Recursive=false&" + paramOptions,
                        }
                    }
                    return false;
                },
                url: this.SheetUserHandler + "?LoadTree=true&Recursive=" + this.Recursive + "&" + paramOptions,
                onSelect: this.TreeNodeClick,
                onCancelselect: this.TreeNodeClick,
                SheetUserManager: this,
                onSuccess: function () {
                    if (!this.options.SheetUserManager.IsLoaded) {
                        if (this.data.length > 0) {
                            // this.options.SheetUserManager.TreeNodeClick.apply(this, [{data: this.data[0]}]);
                        }
                        this.options.SheetUserManager.IsLoaded = true;
                    }
                }
            });
        },

        //获取加载组织机构的参数
        GetLoadTreeOption: function () {
            if (!this.__QueryOptions) {
                var querystr = "o=";
                var querystr = "o=";
                if (this.SegmentVisible) {
                    querystr += "S";
                }
                if (this.OrgUnitVisible) {
                    querystr += "O";
                }
                if (this.GroupVisible) {
                    querystr += "G";
                }
                if (this.PostVisible) {
                    querystr += "P";
                }
                if (this.UserVisible) {
                    querystr += "U";
                }
                if (this.VisibleUnits) {
                    querystr += "&VisibleUnits=" + this.VisibleUnits;
                }
                if (this.RootUnitID) {
                    querystr += "&RootUnitID=" + this.RootUnitID;
                }
                //if (this.RoleName) {
                //    querystr += "&RoleName=" + encodeURI(this.RoleName);
                //}
                if (this.OrgPostCode) {
                    querystr += "&OrgPostCode=" + encodeURI(this.OrgPostCode);
                }
                if (this.UserCodes) {
                    querystr += "&UserCodes=" + encodeURI(this.UserCodes);
                }
                //显示离职人员  liming 20180918
                if (this.ResignVisible) {
                    querystr += "&ResignVisible=" + this.ResignVisible;
                }

                this.__QueryOptions = querystr;
            }
            return this.__QueryOptions;
        },
        //点击节点
        TreeNodeClick: function (e) {
            if (e == null)
                return;
            if (e.data == null)
                return;
            var node = e.data;

            var SheetUserManager = this.options.SheetUserManager;
            if (SheetUserManager.SelectedValue == node.ObjectID && !SheetUserManager.SearchMode)
                return;
            SheetUserManager.SelectedValue = node.ObjectID;
            SheetUserManager.SearchMode = false;
            // 读取控件上的属性
            var querystr = SheetUserManager.GetLoadTreeOption();
            // querystr = querystr.replace("&VisibleUnits=", "&V=");
            SheetUserManager.OrgListPanel.html("");
            if (e.data.treedataindex == 0 &&
                SheetUserManager.OrgUnitVisible &&
                SheetUserManager.RootSelectable
                //update by ouyangsk 如果未指定userCodes，就不需再查找组织，避免可选列表出现重复用户的问题
                &&
                !this.options.SheetUserManager.UserCodes) {
                SheetUserManager.AddListItem.apply(SheetUserManager, [e.data]);
            }
            debugger
            console.log(SheetUserManager.SheetUserHandler, node.ObjectID, querystr);

            $.ajax({
                type: "GET",
                url: SheetUserManager.SheetUserHandler + "?ParentID=" + node.ObjectID + "&" + querystr,
                dataType: "json",
                //async: false,//同步执行
                success: function (data) {
                    debugger
                    //update by lisonglin 20190118
                    if (data.length > 0 && SheetUserManager.IsMultiple) { //如果有数据，并且是多选
                        SheetUserManager.OrgListPanel.prepend(SheetUserManager.PanelSelectAll); //增加全选按钮
                        SheetUserManager.PanelSelectAll.bind("click.PanelSelectAll", function (e) { //绑定点击事件
                            SheetUserManager.SelectAll(e, SheetUserManager);
                            debugger
                        });
                    }
                    debugger
                    var len = 0; //这里需要统计选中的数量，用于初始化全选按钮状态
                    for (var i = 0; i < data.length; ++i) {
                        // data[i].Text = SheetUserManager.decrypt(data[i].Text);
                        // data[i].Code = SheetUserManager.decrypt(data[i].Code);
                        // console.log(SheetUserManager.Choices[data[i].ObjectID]);

                        if (SheetUserManager.Choices[data[i].ObjectID] != undefined) { //如果当前对象已经选中，则len加1
                            len++;
                        }
                        SheetUserManager.AddListItem.apply(SheetUserManager, [data[i]]);
                    }

                    if (data.length > 0 && SheetUserManager.IsMultiple && $("#selectAll")) {
                        if (len == data.length) {
                            $(".SelectorPanel:visible").find("#selectAll").prop("checked", true); //全选状态
                        } else {
                            $(".SelectorPanel:visible").find("#selectAll").prop("checked", false); //取消全选状态
                        }
                    }

                    debugger
                }
            });
        },
        //搜索用户
        SearchOrg: function (SheetUserManager) {
            var searchkey = $(SheetUserManager.SearchTxtElement).val().trim();
            var currentTime = new Date();
            if (!SheetUserManager.SearchKey && !searchkey) {
                return;
            }
            if (!searchkey) {
                if (!this.IsMobile) {
                    SheetUserManager.SearchKey = searchkey;
                    SheetUserManager.OrgListPanel.html("");
                    // SheetUserManager.TreeManager.selectNode(0);
                    SheetUserManager.TreeManager.selectNode(SheetUserManager.TreeManager.nodes[0]);
                } else {
                    SheetUserManager.OrgListPanel.html("");
                }
                return;
            }
            SheetUserManager.SearchMode = true;
            SheetUserManager.SearchKey = searchkey;
            SheetUserManager.OrgListPanel.html("");

            for (var k in SheetUserManager.SearchResults) {
                if (SheetUserManager.SearchResults[k].SearchKey == searchkey &&
                    SheetUserManager.SearchResults[k].ParentID == SheetUserManager.SelectedValue) {
                    if (SheetUserManager.SearchResults[k].Data && SheetUserManager.SearchResults[k].Data.length) {
                        //update by lisonglin 20190118
                        if (this.IsMultiple) { //如果是多选，则增加全选按钮并绑定点击事件
                            SheetUserManager.OrgListPanel.prepend(SheetUserManager.PanelSelectAll);
                            SheetUserManager.PanelSelectAll.bind("click.PanelSelectAll", function (e) {
                                SheetUserManager.SelectAll(e, SheetUserManager);
                            });
                        }

                        var len = 0; //这里需要统计选中的数量，用于初始化全选按钮状态
                        for (var i = 0; i < SheetUserManager.SearchResults[k].Data.length; ++i) {
                            //如果当前对象已经选中，则len加1
                            if (SheetUserManager.Choices[SheetUserManager.SearchResults[k].Data[i].ObjectID] != undefined) {
                                len++;
                            }
                            SheetUserManager.AddListItem.apply(SheetUserManager, [SheetUserManager.SearchResults[k].Data[i], searchkey]);
                        }
                        if (this.IsMultiple && $("#selectAll")) {
                            if (len == SheetUserManager.SearchResults[k].Data.length) {
                                $(".SelectorPanel:visible").find("#selectAll").prop("checked", true); //全选状态
                            } else {
                                $(".SelectorPanel:visible").find("#selectAll").prop("checked", false); //取消全选状态
                            }
                        }
                    } else {
                        SheetUserManager.OrgListPanel.html('<li class="user-item">没有任何组织</li>');
                    }
                    return;
                }
            }
            this.searchXHR && this.searchXHR.abort();
            debugger
            this.searchXHR = $.ajax({
                type: "GET",
                url: SheetUserManager.SheetUserHandler + "?IsMobile=" + (!!this.IsMobile) +
                    "&SearchKey=" + encodeURI(searchkey) +
                    "&ParentID=" + (SheetUserManager.SelectedValue || SheetUserManager.RootUnit || "") +
                    "&" + SheetUserManager.GetLoadTreeOption(),
                dataType: "json",
                //async: false,//同步执行
                success: function (data) {
                    SheetUserManager.OrgListPanel.html("");
                    if (SheetUserManager.IsMobile) {
                        SheetUserManager.AddMobileOptions(data, SheetUserManager.OrgListPanel, searchkey);

                        setTimeout(function () {
                            SheetUserManager.RefreshMobilePage();
                        }, 550);
                    } else {
                        if (data != null && data.length > 0) {

                            //update by lisonglin 20190118 搜索用户后全选
                            if (SheetUserManager.IsMultiple) {
                                SheetUserManager.OrgListPanel.prepend(SheetUserManager.PanelSelectAll);
                                SheetUserManager.PanelSelectAll.bind("click.PanelSelectAll", function (e) {
                                    SheetUserManager.SelectAll(e, SheetUserManager);
                                });
                            }

                            var len = 0; //这里需要统计选中的数量，用于初始化全选按钮状态
                            for (var i = 0; i < data.length; ++i) {
                                // data[i].Text = SheetUserManager.decrypt(data[i].Text);
                                // data[i].Code = SheetUserManager.decrypt(data[i].Code);
                                if (SheetUserManager.Choices[data[i].ObjectID] != undefined) { //如果当前对象已经选中，则len加1
                                    len++;
                                }
                                SheetUserManager.AddListItem.apply(SheetUserManager, [data[i], searchkey]);
                            }
                            if (SheetUserManager.IsMultiple && $("#selectAll")) {
                                if (len == data.length) {
                                    $(".SelectorPanel:visible").find("#selectAll").prop("checked", true); //全选状态
                                } else {
                                    $(".SelectorPanel:visible").find("#selectAll").prop("checked", false); //取消全选状态
                                }
                            }
                        } else {
                            SheetUserManager.OrgListPanel.html("<li class='user-item'>没搜索到组织</li>");
                        }
                    }
                    SheetUserManager.SearchResults.push({
                        SearchKey: searchkey,
                        ParentID: SheetUserManager.SelectedValue,
                        Data: data
                    });
                }
            });
        },

        //添加组织机构选择列项
        AddListItem: function (node, searchkey) {
            var displayText = node.Text;
            var titleText = node.Text;
            if (searchkey) {
                displayText = displayText.replace(searchkey, "<span class='bg-info'>" + searchkey + "</span>");
                if (node.Code != "" && node.Text.indexOf("[" + node.Code + "]") == -1) {
                    displayText += "[" + node.orgInfo.replace(searchkey, "<span class='bg-info'>" + searchkey + "</span>") + "]";
                }
            }
            if (this.IsMobile) {
                // debugger
                var item = $("<div></div>");
                item.css("border-bottom", "1px solid #ccc");
                item.height("50px");
                item.css("clear", "both");
                var checkid = $.MvcSheetUI.NewGuid();
                var checkbox = $("<input type='checkbox' ObjectID='" + node.ObjectID + "' id='" + checkid + "'/>");
                item.append(checkbox);
                item.append($("<label type='checkbox' label-for='" + checkid + "'>" + displayText + "</label>").css("float", "none").css("left", "25px"));
                this.OrgListPanel.append(item);

                var thatSheetUser = this;
                item.bind("touchstart", function () {
                    checkbox.click();

                    thatSheetUser.UnitCheckboxClick.apply(checkbox.get(0), [thatSheetUser, {
                        ObjectID: node.ObjectID,
                        Name: node.Text
                    }]);
                });
            } else {
                var item = $("<div>").addClass("task").append("<i style='float:left;line-height: 18px;' class='task-sort-icon fa  " + node.Icon + "'></i>")
                    .append("<span title='" + titleText + " ' class='task-title' " +
                        "style='word-break: break-all;display: inline-block;width: 65%;margin-top: 0;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;padding-left: 4px;margin-bottom: 0;'>" + displayText + "</span>");
                item.css("padding", "5px 10px 5px 10px").css("border-bottom", "1px solid #e4e4e4").css("cursor", "pointer");
                var checkid = $.MvcSheetUI.NewGuid();
                var checkbox = $("<input type='checkbox' ObjectID='" + node.ObjectID + "' id='" + checkid + "' aria-label='Single checkbox Two'/>").show();
                var checkItem = $("<div>").addClass("action-checkbox pull-right");
                var checkBox = $("<div class='checkbox checkbox-primary checkbox-single'></div>");
                checkBox.append(checkbox).append('<label></label>');
                checkItem.append(checkBox);
                item.click(function (e) {
                    if (e.target.tagName.toLowerCase() != "input") {
                        $(this).find("input").click();
                    }
                });
                this.OrgListPanel.append(item.append(checkItem));
                checkbox.attr("checked", this.Choices[node.ObjectID] != undefined);

                checkbox.click({
                    that: this,
                    option: {
                        ObjectID: node.ObjectID,
                        Name: node.ToolBarCode
                    }
                }, function (e) {
                    e.data.that.UnitCheckboxClick.apply(this, [e.data.that, e.data.option]);
                });
            }
        },

        //单元选人点击
        UnitCheckboxClick: function (that, node) {
            if (this.checked) {
                if (!that.IsMultiple) {
                    that.ClearChoices.apply(that);
                    that.OrgListPanel.find("input").attr("checked", false);
                    this.checked = true;
                    if (that.IsMobile && that.Level > 0) {
                        $.ui.goBack(that.Level);
                        that.Level = 0;
                    }
                    that.FocusOutput.apply(that);
                    debugger
                    console.log(document.querySelectorAll(".SelectorPanel"));
                    let hideList = document.querySelectorAll(".SelectorPanel")
                    for (let index = 0; index < hideList.length; index++) {
                        // hideList[index].style.display = "none"

                    }
                    debugger
                }
                that.AddChoice.apply(that, [node]);
                if (that.IsMultiple) {
                    //判断全选状态
                    $(".SelectorPanel:visible").find("#selectAll").prop("checked", that.isAllSelect(that.Choices));
                }
            } else {
                if (that.IsMultiple)
                    that.RemoveChoice.apply(that, [node.ObjectID]);
                else
                    that.ClearChoices.apply(that);
            }
        },
        // decrypt: function (encryptText) {
        // 	var decrypt;
        // 	$.ajax({
        //         url: $.MvcSheetUI.PortalRoot + "/AES/decrypt",
        //         data: {"original": encryptText},
        //         async: false,
        //         method : 'post',
        //         success: function (result) {
        //         	decrypt = result;
        //         }
        //     });
        // 	return decrypt;
        // },
        //判断当前部门是否全部选中
        isAllSelect: function (Choices) {
            console.log(this.Element.parentNode.dataset['title']);
            console.log(Choices);
            let arr = []
            for (const key in Choices) {
                arr.push(Choices[key].ObjectID)
            }
            window.localStorage.setItem(this.Element.parentNode.dataset['title'], arr)

            //closest:获得匹配选择器的第一个祖先元素   siblings():获得匹配集合中每个元素的同胞
            var $this = $(".SelectorPanel:visible").find("#selectAll").closest("div.task").siblings(".task").find("input");
            var len = 0;
            $this.each(function () {
                if (Choices[$(this).attr("ObjectID")] != undefined) {
                    len++;
                }
            });
            if (len == $this.length) {
                return true;
            } else {
                return false;
            }
        },
        //全选按钮事件
        SelectAll: function (e, that) {
            //点击事件绑定在整个全选按钮对象(PanelSelectAll)上
            if (e.target.tagName.toLowerCase() != "input") { //如果点击的不是复选框
                if (!$(e.target).closest("div.task").find("input")[0].checked) {
                    //点击之前复选框是未选中状态，则点击之后状态置为全选状态
                    $(e.target).closest("div.task").find("input")[0].checked = true;
                    $(e.target).closest("div.task").siblings().each(function () {
                        $(this).find("input")[0].checked = true;
                        that.AddChoice.apply(that, [{
                            ObjectID: $(this).find("input").attr("ObjectID"),
                            Name: $.trim($(this).text())
                        }]);
                    })
                } else { //点击之前复选框是选中状态，则点击之后取消全选状态
                    $(e.target).closest("div.task").find("input")[0].checked = false;
                    $(e.target).closest("div.task").siblings().each(function () {
                        $(this).find("input")[0].checked = false;
                        that.RemoveChoice.apply(that, [$(this).find("input").attr("ObjectID")]);
                    })
                }
            } else { //如果点击的是复选框
                if ($(e.target)[0].checked) { //全选
                    $(e.target).closest("div.task").siblings().each(function () {
                        $(this).find("input")[0].checked = true;
                        that.AddChoice.apply(that, [{
                            ObjectID: $(this).find("input").attr("ObjectID"),
                            Name: $.trim($(this).text())
                        }]);
                    })
                } else { //取消全选
                    $(e.target).closest("div.task").siblings().each(function () {
                        $(this).find("input")[0].checked = false;
                        that.RemoveChoice.apply(that, [$(this).find("input").attr("ObjectID")]);
                    })
                }
            }
        }
    });
})(jQuery);