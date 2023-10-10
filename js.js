const number = document.querySelectorAll('.number.area')[0];
const click = document.querySelectorAll('.click')[1];
const value = document.querySelectorAll('.value');
const button = document.querySelectorAll('.button');
const back = document.querySelectorAll('.back');
const circle = document.querySelectorAll('.circle');
const NPS = document.querySelector('.nps');
NPS.querySelectorAll('.label')[0].style.backgroundColor = "rgba(128, 128, 128, 1)";
NPS.querySelectorAll('.label')[0].innerHTML = "LOCKED";
NPS.querySelectorAll('.value')[0].style.backgroundColor = "rgba(128, 128, 128, 1)";
NPS.querySelectorAll('.value')[0].style.color = "white";
NPS.querySelectorAll('.value')[0].innerHTML = "Unlock from 100000";

var num = 0n;
var totalClick = 0;
var plus = 1n;
var upgradeCounter = [{counter: 0, terms: 50}, {counter: 0, terms: 100}, {counter: 0, terms: 200}];
var plusValue = [1n, 2n, 2n];
var nps = 0n;
var plusNps = [0n, 0n, 0n, 1n, 2n, 2n];
var timeout = [0, 0, 0, 8, 16, 32];

function clickButton(n) {
	btn = button[n];
	btn.querySelectorAll('.locked')[0].innerHTML = 'UNLOCKED';
	btn.classList.add('unlocked');
	setTimeout(() => {
		btn.querySelectorAll('.lock.message')[0].style.display = 'none';
	}, 1000);
	if (n < 3) {
		btn.addEventListener('mousedown', () => {
			if (button[n].classList.contains('enable')) {
				button[n].classList.add('clicked');
				upgradeCounter[n]['counter'] = 0;
				button[n].style.background = 'rgba(128, 128, 128, 1)';
				if (n == 0) {
					plus = plus + plusValue[n];
				} else if (n == 1) {
					plus = plus * plusValue[n];
				} else if (n == 2) {
					plus = plus ** plusValue[n];
				}
				button[n].classList.remove('enable');
				value[4].innerHTML = plus;
			}
		});
		upgradeCounter[n]['counter'] = 10000;
	} else {
		btn.addEventListener('mousedown', () => {
			if (button[n].classList.contains('enable')) {
				button[n].classList.add('clicked');
				back[n - 3].style.backgroundColor = 'rgba(128, 128, 128, 0)';
				if (n == 3) {
					nps += plusNps[n];
				} else if (n == 4) {
					nps = nps * plusNps[n];
				} else if (n == 5) {
					nps = nps ** plusNps[n];
				}
				circle[n - 3].style.animation = `pie ${timeout[n]}s linear both`;
				button[n].classList.remove('enable');
				value[3].innerHTML = nps;
				setTimeout(() => {
					back[n - 3].style.backgroundColor = 'rgba(30, 201, 255, 1)';
					button[n].classList.add('enable');
					circle[n - 3].style.animation = "none";
				}, timeout[n] * 1000);
			}
		});
	}
	btn.addEventListener('mouseup', () => {
		button[n].classList.remove('clicked');
	});
	btn.classList.add('enable');
}

function count(n) {
	if (button[n].classList.contains('unlocked')) {
		if (upgradeCounter[n]['counter'] + 1 < upgradeCounter[n]['terms']) {
			upgradeCounter[n]['counter']++;
			button[n].style.background = `linear-gradient(to right, rgba(0, 171, 225, 1) 0%, rgba(0, 171, 225, 1) ${upgradeCounter[n]['counter'] / upgradeCounter[n]['terms'] * 100}%, rgba(128, 128, 128, 1) ${upgradeCounter[n]['counter'] / upgradeCounter[n]['terms'] * 100}%, rgba(128, 128, 128, 1) 100%)`;
		} else {
			button[n].classList.add('enable');
			button[n].style.background = 'rgba(30, 201, 255, 1)';
		}
	}
}

click.addEventListener('mousedown', () => {
	totalClick++;
	num += plus;
	number.innerHTML = num;
	value[0].innerHTML = totalClick;
	value[1].innerHTML = number.innerHTML.length;
	count(0);
	count(1);
	count(2);
	if (num >= 100n && !button[0].classList.contains('unlocked')) {
		clickButton(0);
	}
	if (num >= 1000n && !button[1].classList.contains('unlocked')) {
		clickButton(1);
	}
	if (num >= 10000n && !button[2].classList.contains('unlocked')) {
		clickButton(2);
	}
	if (num >= 100000n && !button[3].classList.contains('unlocked')) {
		NPS.querySelectorAll('.label')[0].style.backgroundColor = "rgba(0, 146, 255, 0.75)";
		NPS.querySelectorAll('.label')[0].innerHTML = "NPS";
		NPS.querySelectorAll('.value')[0].style.backgroundColor = "rgba(255, 255, 255, 1)";
		NPS.querySelectorAll('.value')[0].style.color = "black";
		NPS.querySelectorAll('.value')[0].innerHTML = "0";
		var interval2 = setInterval(() => {
			num += nps;
			number.innerHTML = num;
			value[1].innerHTML = number.innerHTML.length;
		}, 1000);
		clickButton(3);
	}
	if (num >= 1000000n && !button[4].classList.contains('unlocked')) {
		clickButton(4);
	}
	if (num >= 10000000n && !button[5].classList.contains('unlocked')) {
		clickButton(5);
	}
});

document.addEventListener('keyup', (event) => {
	if (event.key == " ") {
		document.body.classList.remove('keydown');
	} else if (Number(event.key) <= 6 && Number(event.key) >= 1) {
		button[Number(event.key) - 1].classList.remove('clicked');
	}
});

document.addEventListener('keydown', (event) => {
	if (event.key == " ") {
		event.preventDefault();
		if (!document.body.classList.contains('keydown')) {
			document.body.classList.add('keydown');
			totalClick++;
			num += plus;
			number.innerHTML = num;
			value[0].innerHTML = totalClick;
			value[1].innerHTML = number.innerHTML.length;
			count(0);
			count(1);
			count(2);
			if (num >= 100n && !button[0].classList.contains('unlocked')) {
				clickButton(0);
			}
			if (num >= 1000n && !button[1].classList.contains('unlocked')) {
				clickButton(1);
			}
			if (num >= 10000n && !button[2].classList.contains('unlocked')) {
				clickButton(2);
			}
			if (num >= 100000n && !button[3].classList.contains('unlocked')) {
				NPS.querySelectorAll('.label')[0].style.backgroundColor = "rgba(0, 146, 255, 0.75)";
				NPS.querySelectorAll('.label')[0].innerHTML = "NPS";
				NPS.querySelectorAll('.value')[0].style.backgroundColor = "rgba(255, 255, 255, 1)";
				NPS.querySelectorAll('.value')[0].style.color = "black";
				NPS.querySelectorAll('.value')[0].innerHTML = "0";
				var interval2 = setInterval(() => {
					num += nps;
					number.innerHTML = num;
					value[1].innerHTML = number.innerHTML.length;
				}, 1000);
				clickButton(3);
			}
			if (num >= 1000000n && !button[4].classList.contains('unlocked')) {
				clickButton(4);
			}
			if (num >= 10000000n && !button[5].classList.contains('unlocked')) {
				clickButton(5);
			}
		}
	} else if (Number(event.key) <= 6 && Number(event.key) >= 1) {
		let n = Number(event.key) - 1;
		if (n < 3) {
			if (button[n].classList.contains('enable')) {
				button[n].classList.add('clicked');
				upgradeCounter[n]['counter'] = 0;
				button[n].style.background = 'rgba(128, 128, 128, 1)';
				if (n == 0) {
					plus = plus + plusValue[n];
				} else if (n == 1) {
					plus = plus * plusValue[n];
				} else if (n == 2) {
					plus = plus ** plusValue[n];
				}
				button[n].classList.remove('enable');
				value[4].innerHTML = plus;
			}
		} else {
			if (button[n].classList.contains('enable')) {
				button[n].classList.add('clicked');
				back[n - 3].style.backgroundColor = 'rgba(128, 128, 128, 0)';
				if (n == 3) {
					nps += plusNps[n];
				} else if (n == 4) {
					nps = nps * plusNps[n];
				} else if (n == 5) {
					nps = nps ** plusNps[n];
				}
				circle[n - 3].style.animation = `pie ${timeout[n]}s linear both`;
				button[n].classList.remove('enable');
				value[3].innerHTML = nps;
				setTimeout(() => {
					back[n - 3].style.backgroundColor = 'rgba(30, 201, 255, 1)';
					button[n].classList.add('enable');
					circle[n - 3].style.animation = "none";
				}, timeout[n] * 1000);
			}
		}
	}
});

var maxCps = 0;
var lastClick = 0;
var clickList = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var interval1 = setInterval(() => {
	let c = totalClick - lastClick;
	for (let i = 0; i < 9; i++) {
		clickList[i] = clickList[i + 1];
	}
	clickList[9] = c;
	let sum = 0;
	for (let i = 0; i < 10; i++) {
		sum += clickList[i];
	}
	value[2].innerHTML = sum;
	if (sum > maxCps) {
		maxCps = sum;
		value[5].innerHTML = sum;
	}
	lastClick = totalClick;
}, 100);