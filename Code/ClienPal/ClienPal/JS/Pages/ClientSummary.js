clientData = [
    {
        id: "1",
        picture: "UserPlaceholder.png",
        amountOwed: "$576.25",
        fullName: "Lane Kim",
        description: "Has 2 kids.",
        phone: "123-1234",
        email: "lKim@gmail.com",
        rate: "$15 per hour"
    },
    {
        id: "2",
        picture: "UserPlaceholder.png",
        amountOwed: "$495.63",
        fullName: "Dean Forester",
        description: "",
        phone: "123-1234",
        email: "dForester@gmail.com",
        rate: "$25 per hour"
    },
    {
        id: "3",
        picture: "UserPlaceholder.png",
        amountOwed: "$480.70",
        fullName: "Luke Danes",
        description: "April Nardini is only kid.",
        phone: "123-1234",
        email: "lDanes@gmail.com",
        rate: "$13 per hour"
    },
    {
        id: "4",
        picture: "UserPlaceholder.png",
        amountOwed: "$300.00",
        fullName: "Sookie St. James",
        description: "Has 2 kids.",
        phone: "123-1234",
        email: "sJames@gmail.com",
        rate: "$15 per hour"
    },
    {
        id: "5",
        picture: "UserPlaceholder.png",
        amountOwed: "$272.89",
        fullName: "Paris Geller",
        description: "Likes to talk",
        phone: "123-1234",
        email: "pgeller@gmail.com",
        rate: "$35 per hour"
    },
    {
        id: "6",
        picture: "UserPlaceholder.png",
        amountOwed: "$189.23",
        fullName: "Tristan Dugray",
        description: "current student",
        phone: "123-1234",
        email: "tDugray@gmail.com",
        rate: "$15 per hour"
    },
    {
        id: "7",
        picture: "UserPlaceholder.png",
        amountOwed: "$160.00",
        fullName: "Kirk Gleason",
        description: "Very busy all the time",
        phone: "123-1234",
        email: "kGleason@gmail.com",
        rate: "$15 per hour"
    },
    {
        id: "8",
        picture: "UserPlaceholder.png",
        amountOwed: "$50.75",
        fullName: "Christopher Hayden",
        description: "Has 2 kids.",
        phone: "123-1234",
        email: "cHayden@gmail.com",
        rate: "$15 per hour"
    },
    {
        id: "9",
        picture: "UserPlaceholder.png",
        amountOwed: "$15.00",
        fullName: "Michel Gerard",
        description: "speaks fluent french",
        phone: "123-1234",
        email: "mGerard@gmail.com",
        rate: "$15 per hour"
    },
    {
        id: "10",
        picture: "UserPlaceholder.png",
        amountOwed: "$0.00",
        fullName: "Max Medina",
        description: "moving to California",
        phone: "123-1234",
        email: "mMedina@gmail.com",
        rate: "$15 per hour"
    }
];


isc.defineClass("ClientDetails", "MainTabSet").addProperties({
    width: "100%",
    height: "100%",
    parentID: "",
    fullName: "",
    description: "",
    phone: "",
    email: "",
    rate: "",
    initWidget: function () {
        this.Super("initWidget", arguments);

        this.ClientInfo = isc.HLayout.create({
            width: "100%",
            height: 150,
            members: [
                isc.LayoutSpacer.create({ width: 20 }),
                isc.Img.create({
                    imageType: "top",
                    src: "../Images/UserPlaceholder.png"
                }),
                isc.LayoutSpacer.create({ width: 20 }),
                isc.VLayout.create({
                    width: "100%",
                    height: "100%",
                    members: [
                        isc.Label.create({
                            contents: "<strong>Name: </strong>" + this.fullName,
                            styleName: "clientDetails"
                        }),
                        isc.Label.create({
                            contents: "<strong>Description: </strong>" + this.description,
                            styleName: "clientDetails"
                        }),
                        isc.Label.create({
                            contents: "<strong>Phone: </strong>" + this.phone,
                            styleName: "clientDetails"
                        }),
                        isc.Label.create({
                            contents: "<strong>Email: </strong>" + this.eamil,
                            styleName: "clientDetails"
                        }),
                        isc.Label.create({
                            contents: "<strong>Rate: </strong>" + this.rate,
                            styleName: "clientDetails"
                        })
                    ]
                }),
                isc.LayoutSpacer.create({ width: 20 })
            ]
        });

        this.ClientDetails = isc.VLayout.create({
            width: "*",
            height: "100%",
            members: [

            ]
        });

        this.addChild(
            isc.VLayout.create({
                height: "100%",
                width: "100%",
                members: [
                    this.ClientInfo
                ]
            })
        )
    }
});

isc.defineClass("ClientSummaryItem", "TileGrid").addProperties({
    tileWidth: 200,
    tileHeight: 200,
    height: "100%",
    width: "100%",
    showAllRecords: true,
    data: clientData,
    recordDoubleClick: function (viewer, tile, record) {
        var t = viewer.tSet.addTab({
            title: record.fullName,
            canClose: true,
            pane: isc.ClientDetails.create({
                parentID: record.id,
                fullName: record.fullName,
                description: record.description,
                phone: record.phone,
                email: record.eamil,
                rate: record.rate,
            })
        });
        viewer.tSet.selectTab(t);
    },
    fields: [
        { name: "picture", type: "image", imageURLPrefix: "../Images/" },
        { name: "fullName" },
        { name: "amountOwed" }
    ]
});

isc.defineClass("ClientSummaryUI", "MainTabSet").addProperties({
    width: "100%",
    height: "100%",
    styleName: "clientSummaryUI",
    tabBarProperties: {
        layoutStartMargin: 20
    },
    gridDefaults: {
        _constructor: isc.ClientSummaryItem
    },
    initWidget: function () {
        this.Super("initWidget", arguments);

        this.addAutoChild("grid", { tSet: this });
        this.addTab({
            title: "Client Summary",
            pane: this.grid
        });
    }
});