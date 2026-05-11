// RRFF mockup — light interactivity (mobile nav and donate amounts)
(function () {
  'use strict';

  // --- Mobile menu toggle
  var toggle = document.querySelector('.menu-toggle');
  var nav = document.querySelector('.primary-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  // --- Donate page: amount + impact line + frequency tabs
  var amts = document.querySelectorAll('.give-amounts .amt[data-amt]');
  var customInput = document.querySelector('.amt-custom input');
  var giveLine = document.getElementById('giveLine');
  var giveCopy = document.getElementById('giveCopy');
  var freqTabs = document.querySelectorAll('.give-tab');

  var impactCopy = {
    25:  'covers a wellness check-in for a firefighter or family member.',
    50:  'sends a care package to a family during a crisis week.',
    100: 'helps build the founding reserve for The 1884 Fund.',
    250: 'underwrites a peer-support training seat.',
    500: 'funds emergency lodging for a family during a hospitalization.',
    1000:'sponsors a station-wide wellness clinic for a full quarter.'
  };

  function nearestKey(n) {
    var keys = Object.keys(impactCopy).map(Number);
    return keys.reduce(function (a, b) { return Math.abs(b - n) < Math.abs(a - n) ? b : a; });
  }

  var currentFreq = 'one';
  function renderGive(amount) {
    if (!giveLine) return;
    var freqSuffix = currentFreq === 'monthly' ? '/mo' : '';
    giveLine.textContent = '$' + amount + freqSuffix;
    var key = impactCopy[amount] ? amount : nearestKey(amount);
    giveCopy.textContent = impactCopy[key];
    var btn = document.getElementById('giveBtn');
    if (btn) btn.textContent = 'Give $' + amount + freqSuffix + ' → continue securely';
  }

  amts.forEach(function (b) {
    b.addEventListener('click', function () {
      amts.forEach(function (x) { x.classList.remove('is-active'); });
      if (customInput) customInput.value = '';
      b.classList.add('is-active');
      renderGive(parseInt(b.dataset.amt, 10));
    });
  });

  if (customInput) {
    customInput.addEventListener('input', function () {
      var v = parseInt(customInput.value, 10);
      if (!isNaN(v) && v > 0) {
        amts.forEach(function (x) { x.classList.remove('is-active'); });
        renderGive(v);
      }
    });
  }

  freqTabs.forEach(function (t) {
    t.addEventListener('click', function () {
      freqTabs.forEach(function (x) {
        x.classList.remove('is-active');
        x.setAttribute('aria-selected', 'false');
      });
      t.classList.add('is-active');
      t.setAttribute('aria-selected', 'true');
      currentFreq = t.dataset.freq || 'one';
      var active = document.querySelector('.give-amounts .amt.is-active');
      var amount = active ? parseInt(active.dataset.amt, 10)
                          : (customInput && parseInt(customInput.value, 10)) || 100;
      renderGive(amount);
    });
  });

})();
