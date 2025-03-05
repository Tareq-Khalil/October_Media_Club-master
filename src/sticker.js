const numberOfStickers = 7; // How many hero-stickers-0x.svg do we have?
let scrollPos = 0;

// Generic: throttle
const throttle = (fn, wait) => {
	let last, queue;

	return function runFn(...args) {
		const now = Date.now();
		queue = clearTimeout(queue);

		if (!last || now - last >= wait) {
			fn.apply(null, args);
			last = now;
		} else {
			queue = setTimeout(runFn.bind(null, ...args), wait - (now - last));
		}
	};
};

// Generic: return random value from array and delete it
function popRandomValue(list) {
	return list
		.sort(function() {
			return 0.5 - Math.random();
		})
		.pop();
}

// Generic mousemove
const mouse = {
	x: 0,
	y: 0,
	dragCallback: false, // What to do when a dragged element is moved
	endCallback: false, // What to do when a dragging stops
	executeCallback: function(e) {
		if (mouse.dragCallback) {
			if (e.cancelable) {
				e.preventDefault();
			}
			mouse.dragCallback(e);
		}
	}
};
window.addEventListener("mousemove", e => {
  mouse.x = e.clientX;
  mouse.y = e.pageY;
  mouse.executeCallback(e);
});
window.addEventListener("touchstart", e => {
	mouse.x = e.changedTouches[0].clientX;
	mouse.y = e.changedTouches[0].clientY;
	mouse.executeCallback(e);
});
window.addEventListener("mouseup", () => {
	mouse.endCallback && mouse.endCallback();
	mouse.dragCallback = mouse.endCallback = false;
});
// window.addEventListener("scroll", e => {
//   console.log(window.scrollY);
// });


var relY, relX;
$(document).ready(function() {
	$("#sticker-hero").mousemove(function(event){            
		relX = event.pageX - $(this).offset().left;
		relY = event.pageY - $(this).offset().top;
	}
)});

// Sticker stuff
const stickable = document.querySelector('#sticker-hero');
let stickableRect = stickable.getBoundingClientRect();
const sticker = {
	x: 0,
	y: 0,
	offsetX: 0,
	offsetY: 0,
	current: false,
	next: [],
	started: false,
	calculateVwPos: function(x) {
		return (x / stickable.clientWidth) * 100;
	},
	calculateVhPos: function(y) {
		const elementOffset = window.innerHeight - stickable.clientHeight ;
		return (y / (stickable.clientHeight + elementOffset)) * 100;

	},
	updateSticker: function() {
    this.x = this.calculateVwPos(mouse.x - sticker.offsetX);
		
	this.y = mouse.y;
	this.current && this.moveSticker();
	},
	moveSticker: function() {
		this.current.style.setProperty("--x", `${this.x}vw`);
		this.current.style.setProperty("top", `${this.y}px`);
	},
	generateSticker: function(x, y) {
    if (this.current) {
			this.current.classList.remove("dragging");
		}
		const tilt = Math.floor(Math.random() * 40 + 1) - 20;
		const scale = (Math.random() * (1 - 0.5) + 0.75).toFixed(2); // Generate a value between 0.75 and 1.25
		const newSticker = document.createElement("div");
		let stickerNumber = 0;
		if (!this.started && !x && !y) {
			// Start with special sticker 0 as for interactive sticker
			this.started = true;
		} else {
			stickerNumber = this.getRandomStickerNumber();
		}
		newSticker.classList.add("sticker", `sticker-${stickerNumber}`);
		newSticker.style.setProperty("--tilt", `${tilt}deg`);
		newSticker.style.setProperty("--scale", scale);

		if (x && y) {
			// New sticker isn't draggable, but placed directly
			newSticker.style.setProperty("--x", `${x}vw`);
			newSticker.style.setProperty("top", `${y}px`);
			newSticker.classList.add("static");
		} else {
			// New sticker will be dragged
			newSticker.classList.add("dragging");
		}

		this.current = newSticker;
		window.requestAnimationFrame(() => {
			if(document.body != null){
				document.body.appendChild(newSticker);
			}
			
		});
	},
	destroySticker: function() {
		if (sticker.current) {
			window.requestAnimationFrame(() => {
				document.body.removeChild(sticker.current);
				sticker.current = false;
			});
		}
	},
	getRandomStickerNumber: function() {
		if (this.next.length === 0) {
			this.next = Array.from(
				{ length: numberOfStickers },
				(v, k) => k + 1
			);
		}
		return popRandomValue(this.next);
	}
};

stickable.addEventListener("touchend", e => {
	// Prevent mouse behaviour on touch devices.
	if (e.cancelable) {
		e.preventDefault();
	}

	if (mouse.y === e.changedTouches[0].clientY) {
		sticker.generateSticker();
		sticker.updateSticker();
	}
});

stickable.addEventListener("mousemove", () => {
  // console.log("mouseX: " + mouse.x + ", mouseY: " + mouse.y);
	if (!sticker.current && mouse.x && mouse.y) {
		sticker.generateSticker();
	}
	sticker.updateSticker();
});

// Place sticker and create new one
stickable.addEventListener("mousedown", e => {
  // console.log("mouse clicked")
	if (e.which !== 1) return; // Only work on left mouse button
    // console.log("mouse clicked")
	sticker.generateSticker();
	sticker.updateSticker();
});

// Don't stick the sticker when leaving the sticker area.
stickable.addEventListener("mouseleave", () => {
	sticker.destroySticker();
});