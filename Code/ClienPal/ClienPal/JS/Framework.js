isc.defineClass("AppHeader", "HLayout").addProperties({
    width: "100%",
    height: 80,
    styleName: "appHeader"
});

isc.defineClass("AppMenuItem", "Label").addProperties({
    width: 250,
    height: 15,
    styleName: "appMenuItem",
    cursor: "pointer",
    title: "",
    iconName: "",
    setSelected: function (selected) {
        if (selected) {
            this.setStyleName("appMenuItemSelected");
        }
        else {
            this.setStyleName("appMenuItem");
        }
    },
    click: function () {
        this.creator.menuItemSelected(this);
        this.setSelected(true);
    },
    initWidget: function () {
        this.Super("initWidget", arguments);
        this.contents = "<i class='" + this.iconName + "'></i>" + this.title;
    }
});

isc.defineClass("AppMenu", "VLayout").addProperties({
    height: "100%",
    width: 250,
    styleName: "appMenu",
    menuItemDefaults: {
        _constructor: isc.AppMenuItem
    },
    footerMessageDefaults: {
        _constructor: isc.Label,
        height: 40,
        width: "100%",
        align: "center",
        styleName: "footerMessage",
        contents: "&copy " + isc.DateUtil.getDisplayYear(new Date()) + " ClienPal"
    },
    menuItemSelected: function (AppMenuItem) {
        this.deselectAll();
        this.creator.mainCanvas.showUI(AppMenuItem.uiClass);
    },
    deselectAll: function () {
        var m = this.getMembers();
        for (var i = 0; i < m.length; i++) {
            if (m[i].isA("AppMenuItem")) {
                m[i].setSelected(false);
            }
        }
    },
    initWidget: function () {
        this.Super("initWidget", arguments);
        this.addMember(isc.LayoutSpacer.create({ height: 45 }));
        this.addMember(this.createAutoChild("menuItem", { title: "Client List", iconName: "im im-users", uiClass: "ClientUI" }));
        this.addMember(this.createAutoChild("menuItem", { title: "Add Client", iconName: "im im-plus-circle", uiClass: "ClientUI" }));
        this.addMember(this.createAutoChild("menuItem", { title: "Appointments", iconName: "im im-calendar", uiClass: "ClientUI" }));
        this.addMember(this.createAutoChild("menuItem", { title: "Add Appointment", iconName: "im im-plus-circle", uiClass: "ClientUI" }));
        this.addMember(this.createAutoChild("menuItem", { title: "Reports", iconName: "im im-line-chart-up", uiClass: "ClientUI" }));
        this.addMember(this.createAutoChild("menuItem", { title: "Settings", iconName: "im im-gear", uiClass: "ClientUI" }));
        this.addMember(isc.LayoutSpacer.create({ height: "*" }));
        this.addMember(this.addAutoChild("footerMessage"));
    }
});

isc.defineClass("UserMenuButton", "MenuButton").addProperties({
    width: 10,
    hieght: 48,
    baseStyle: "userMenuButton",
    iconStyle: "display-none",
    bodyStyleName: "menuBody",
    cursor: "pointer",
    autoFit: true,
    title: "",
    showDown: false,
    showFocused: false,
    menuAlign: "right",
    menuDefaults: {
        _constructor: isc.Menu,
        autoParent: "none",
        showIcons: false,
        showKeys: false,
        showShadow: true,
        bodyStyleName: "menuBody",
        emptyMessage: "Loading...",
        styleName: "userMenu",
        data: [
            { title: "Logout" }
        ]
    },
    initWidget: function () {
        this.Super("initWidget", arguments);

        this.title = this.title + "<i class='im im-angle-down'></li>";
        this.addAutoChild("menu");
    }
})

isc.defineClass("MainUICanvas", "Canvas").addProperties({
    width: "100%",
    height: "100%",
    styleName: "mainUICanvas",
    showUI: function (uiClass) {
        var uiExists = false;
        var c = this.children;
        if (c) {
            for (var i = 0; i < c.length; i++) {
                if (c[i].isA(uiClass)) {
                    c[i].show();
                    //c[i].updateToolMenu();
                    uiExists = true;
                }
                else {
                    c[i].hide();
                }
            }
        }
        if (uiExists) { }
        else {
            var ui = isc.ClassFactory.newInstance(uiClass, { application: this.applicaiton });
            this.addChild(ui);
        }
    }
})

isc.defineClass("AppLogo", "HLayout").addProperties({
    initWidget: function () {
        this.Super("initWidget", arguments);

        this.addMember(isc.LayoutSpacer.create({ width: 7 }));
        this.addMember(
            isc.Canvas.create({
                width: 300,
                height: 70,
                styleName: "logoImage",
                layoutAlign: "center"
            })
        );

    }
})

isc.defineClass("Application", "VLayout").addProperties({
    width: "100%",
    height: "100%",
    headerDefaults: {
        _constructor: isc.AppHeader
    },
    logoDefaults: {
        autoParent: "header",
        _constructor: isc.AppLogo
    },
    userMenuButtonDefaults: {
        autoParent: "header",
        _constructor: isc.UserMenuButton,
        title: "Jess Lembke"
    },
    bodyDefaults: {
        _constructor: isc.HLayout,
        width: "100%",
        height: "*",
        styleName: "appBody"
    },
    appMenuDefaults: {
        autoParent: "body",
        _constructor: isc.AppMenu
    },
    mainCanvasDefaults: {
        autoParent: "body",
        _constructor: isc.MainUICanvas
    },
    initWidget: function () {
        this.Super("initWidget", arguments);

        this.addAutoChild("header");
        this.addAutoChild("body");
        this.addAutoChild("logo");
        this.header.addMember(isc.LayoutSpacer.create({ width: "*" }));
        this.addAutoChild("userMenuButton");
        this.header.addMember(isc.LayoutSpacer.create({ width: 30 }));
        this.addAutoChild("appMenu");
        this.addAutoChild("mainCanvas", { application: this });
    }
});