isc.defineClass("MainTabSet", "TabSet").addProperties({
    width: "100%",
    height: "100%",
    tabBarThickness: 40,
    simpleTabBaseStyle: "tabMain",
    paneContainerProperties: {
        styleName: "mainPaneContainer"
    },
    //paneContainerClassName: "mainPaneContainer",
    paneMargin: 0,
    border: "none",
    tite: undefined
});

isc.defineClass("SimpleTabSet", "TabSet").addProperties({
    width: "100%",
    height: "100%",
    tabBarThickness: 30,
    simpleTabBaseStyle: "tabSimple",
    paneMargin: 0,
    paneContainerProperties: {
        styleName: "mainPaneContainer"
    },
    title: undefined
});
