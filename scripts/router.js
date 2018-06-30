// create stage
var stage = acgraph.create('container');
var LocalMax = 200;

// get bounds of stage
var bounds = stage.getBounds();

function Box(x, y, w, h) {
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
}

function Global(box) {
	return new Box(box.x/LocalMax * bounds.width
	, box.y/LocalMax * bounds.width
	, box.w/LocalMax * bounds.width
	, box.h/LocalMax * bounds.width);
}

// calculate property width/height
var PROPERTY_WIDTH = 50; // ft
var PROPERTY_HEIGHT = 150; // ft
var STREET_OFFSET = PROPERTY_HEIGHT

// fill for Plot
var PLOTFILL = {
    angle: -45,
    keys: [
        '0 #fff',
        '0.2 #ccc',
        '1 #aaa'
    ]
};

// fill for Room
var ROOMFILL = {
    angle: 45,
    keys: [
        '0 #fff',
        '0.8 #eee',
        '1 #ddd'
    ]
};

/**
 * Plot class.
 * @param {parent} parent plot or the container.
 * @param {x,y,w,h} plot position and dimensions.
 * @constructor
 */
function Plot(parent, x, y, w, h, label) {
    this.parent = parent;
    // plot shape
    this.rect = stage.rect().stroke('black').fill(PLOTFILL);
	this.box = new Box(x,y,w,h);
	this.global = new Global(this.box);
	
    var textStyle = {
        fontSize: 16,
        hAlign: 'center',
        vAlign: 'top',
        color: 'white',
        width: this.global.w,
        height: this.global.h
    };
	var px = parent == null ? 0 : parent.global.x;
	var py = parent == null ? 0 : parent.global.y
	var newBounds = new acgraph.math.Rect(this.global.x+px, this.global.y+py, this.global.w, this.global.h);
    this.rect.setBounds(newBounds);

    // plot label
    this.text = stage.text(newBounds.left, newBounds.top, label, textStyle);
    this.text.disablePointerEvents(true);
}

/**
 * House class
 * @param (plot) parent plot
 * @param (x,y) upper left corner of house
 * @constructor
*/

function House(plot, x, y) {
	this.plot = plot;
	this.box = new Box(plot.box.x + x, plot.box.y+y,0,0);
	this.global = new Global(this.box);
	this.rooms = [];
}

/**
 * Room class.
 * @param {parent} parent plot or the container.
 * @param {x,y,w,h} plot position and dimensions.
 * @constructor
 */
function Room(parent, x, y, w, h, label) {
    this.parent = parent;
    // plot shape
    this.rect = stage.rect().stroke('black').fill(ROOMFILL);
	this.box = new Box(x,y,w,h);
	this.global = new Global(this.box);
	
    var textStyle = {
        fontSize: 10,
        hAlign: 'center',
        vAlign: 'top',
        color: 'black',
        width: this.global.w,
        height: this.global.h
    };
	var px = parent == null ? 0 : parent.global.x;
	var py = parent == null ? 0 : parent.global.y
	var newBounds = new acgraph.math.Rect(this.global.x+px, this.global.y+py, this.global.w, this.global.h);
    this.rect.setBounds(newBounds);

    // plot label
    this.text = stage.text(newBounds.left, newBounds.top, label, textStyle);
    this.text.disablePointerEvents(true);
}

// Draw 3 properties
var p391 = new Plot(null, 0, 0, PROPERTY_WIDTH, PROPERTY_HEIGHT, "391");
var p381 = new Plot(null, PROPERTY_WIDTH, 0, PROPERTY_WIDTH, PROPERTY_HEIGHT, "381");
var p373B= new Plot(null, PROPERTY_WIDTH*2, 0, PROPERTY_WIDTH, PROPERTY_HEIGHT, "373 Basement");
var p373F = new Plot(null, PROPERTY_WIDTH*3, 0, PROPERTY_WIDTH, PROPERTY_HEIGHT, "373 First Floor");

var h391 = new House(p391, 10,25);
h391.rooms.push(new Room(h391, 0,0, 18,6, "Porch"));
h391.rooms.push(new Room(h391, 0,6, 18,12, "Living Room"));
h391.rooms.push(new Room(h391, 0,18, 9,9, "Kitchen"));
h391.rooms.push(new Room(h391, 0,27, 9,18, "Garage"));
h391.rooms.push(new Room(h391, 9,18, 9,11, "Dining"));

h391.rooms.push(new Room(h391, 18,0, 12,10, "North Bed"));
h391.rooms.push(new Room(h391, 18,10, 4,12, "Hall"));
h391.rooms.push(new Room(h391, 22,10, 8,8, "Bath"));
h391.rooms.push(new Room(h391, 22,18, 2,4, ""));
h391.rooms.push(new Room(h391, 24,18, 6,4, "Closet"));
h391.rooms.push(new Room(h391, 18,22, 12,10, "South Bed"));

var h381 = new House(p381, 15,25);
h381.rooms.push(new Room(h381, 0,0, 30,6, "Front Porch"));
h381.rooms.push(new Room(h381, 0,6, 13,10, "Library"));
h381.rooms.push(new Room(h381, 0,16, 13,15, "Kitchen"));
h381.rooms.push(new Room(h381, 0,31, 13,6, "Laundry"));
h381.rooms.push(new Room(h381, 0,37, 4,4, "Back Hall"));
h381.rooms.push(new Room(h381, 4,37, 9,4, "Stairs"));

h381.rooms.push(new Room(h381, 13,6, 17,10, "Living"));
h381.rooms.push(new Room(h381, 20,16, 10,3, "Closet"));
h381.rooms.push(new Room(h381, 13,16, 7,8, "Hall"));
h381.rooms.push(new Room(h381, 13,24, 7,7, "Bath"));
h381.rooms.push(new Room(h381, 20,19, 10,12, "Nursery"));
h381.rooms.push(new Room(h381, 13,31, 10,3, "Hall"));
h381.rooms.push(new Room(h381, 13,34, 10,7, "Bed 1"));
h381.rooms.push(new Room(h381, 23,31, 7,10, "Bed 2"));
// 381 back buildings
h381.rooms.push(new Room(h381, -10,50, 9,18, "Garage"));
h381.rooms.push(new Room(h381, -1,50, 9,18, "Girls' Bed"));
h381.rooms.push(new Room(h381, 8,50, 7,6, "NAR"));
h381.rooms.push(new Room(h381, 8,56, 7,12, "Garden"));

h381.rooms.push(new Room(h381, 20,50, 10,10, "Shed"));
h381.rooms.push(new Room(h381, 20,70, 10,12, "NAS"));
h381.rooms.push(new Room(h381, 20,82, 10,3, ""));
h381.rooms.push(new Room(h381, 20,85, 10,12, "FAS"));
h381.rooms.push(new Room(h381, 20,100, 10,10, "TAJ"));

var h373B = new House(p373B, 15,34);
h373B.rooms.push(new Room(h373B, 0,0, 16,21, "Exercise"));
h373B.rooms.push(new Room(h373B, 0,21, 16,24, "Office"));
h373B.rooms.push(new Room(h373B, -5,45, 18,18, "Library"));
h373B.rooms.push(new Room(h373B, -5,63, 34,24, "Recreation"));

h373B.rooms.push(new Room(h373B, 16,43, 3,10, "")); // stairs
h373B.rooms.push(new Room(h373B, 13,45, 3,8, "")); // stairs
h373B.rooms.push(new Room(h373B, 13,53, 6,6, "Stor"));
h373B.rooms.push(new Room(h373B, 13,59, 6,4, "")); // kitchenette

h373B.rooms.push(new Room(h373B, 16,0, 13,17, "Music"));
h373B.rooms.push(new Room(h373B, 20,17, 9,14, "Guest"));
h373B.rooms.push(new Room(h373B, 20,31, 4,4, "IT"));
h373B.rooms.push(new Room(h373B, 23,31, 6,16, "Bath"));
h373B.rooms.push(new Room(h373B, 23,47, 6,11, "Mech"));
h373B.rooms.push(new Room(h373B, 23,58, 6,5, "Stor"));

var h373F = new House(p373F, 15,25);
h373F.rooms.push(new Room(h373F, 0,0, 29,9, "Front Porch"));
h373F.rooms.push(new Room(h373F, 0,9, 29,26, "Dining"));
h373F.rooms.push(new Room(h373F, 0,35, 5.5,11, "Hall"));
h373F.rooms.push(new Room(h373F, 0,46, 16,8, "Vestibule"));
h373F.rooms.push(new Room(h373F, -5,54,   10,10.5, "Bed 1"));
h373F.rooms.push(new Room(h373F, -5,64.5, 10,10.5, "Bed 2"));
h373F.rooms.push(new Room(h373F, -5,75,   10,10.5, "Bed 3"));
h373F.rooms.push(new Room(h373F, -5,85.5, 10,10.5, "Bed 4"));

h373F.rooms.push(new Room(h373F, 5,88, 15,8, "Study"));

h373F.rooms.push(new Room(h373F, 5.5,35, 5.5,3, ""));  // storage
h373F.rooms.push(new Room(h373F, 5.5,38, 5.5,5, "Pwdr"));  // pwdr
h373F.rooms.push(new Room(h373F, 5.5,43, 5.5,3, ""));  // storage

h373F.rooms.push(new Room(h373F, 9.5,54, 3,8, "")); // storage
h373F.rooms.push(new Room(h373F, 12.5,54, 8,8, "")); // storage
h373F.rooms.push(new Room(h373F, 9.5,66, 11,9, "Bath 1")); // storage
h373F.rooms.push(new Room(h373F, 9.5,75, 11,9, "Bath 2")); // storage

h373F.rooms.push(new Room(h373F, 11,35, 18,11, "Kitchen"));
h373F.rooms.push(new Room(h373F, 16,46, 13,8, "Pantry"));
h373F.rooms.push(new Room(h373F, 19,54, 10,10.5, "Bed 8"));
h373F.rooms.push(new Room(h373F, 19,64.5, 10,10.5, "Bed 7"));
h373F.rooms.push(new Room(h373F, 19,75, 10,10.5, "Bed 6"));
h373F.rooms.push(new Room(h373F, 19,85.5, 10,10.5, "Bed 5"));


// listener for keyboard (l, r, u, d arrow keys)
document.onkeyup = function (e) {
    //l37 u38 r39 d40
    if (e.keyCode > 36 && e.keyCode < 41) {
        switch (e.keyCode) {
            case 37:
                break;
            case 38:
                break;
            case 39:
                break;
            case 40:
                break;
        }
    }
};