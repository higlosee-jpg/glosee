/**
 * 요금 계산기: 4개 메뉴(SK/LG/KT/알뜰) × 인터넷속도·희망상품·결합유무 선택에 따라 합산요금 산출
 */
(function () {
  'use strict';

  // 경우의 수별 요금 (speed × product × bundle 인덱스)
  // SK: 속도3 × 상품4 × 결합4
  var pricesSK = [
    [ [22000, 20000, 19000, 19500], [27000, 25000, 24000, 24500], [30000, 28000, 27000, 27500], [34000, 32000, 31000, 31500] ],
    [ [25000, 23000, 22000, 22500], [30000, 28000, 27000, 27500], [33000, 31000, 30000, 30500], [37000, 35000, 34000, 34500] ],
    [ [29000, 27000, 26000, 26500], [34000, 32000, 31000, 31500], [37000, 35000, 34000, 34500], [41000, 39000, 38000, 38500] ]
  ];
  // LG: 속도3 × 상품4 × 결합3
  var pricesLG = [
    [ [21000, 19500, 19000], [26000, 24500, 24000], [29000, 27500, 27000], [33000, 31500, 31000] ],
    [ [24000, 22500, 22000], [29000, 27500, 27000], [32000, 30500, 30000], [36000, 34500, 34000] ],
    [ [28000, 26500, 26000], [33000, 31500, 31000], [36000, 34500, 34000], [40000, 38500, 38000] ]
  ];
  // KT: 속도3 × 상품4 × 결합3
  var pricesKT = [
    [ [22000, 20000, 19500], [27000, 25000, 24500], [30000, 28000, 27500], [34000, 32000, 31500] ],
    [ [25000, 23000, 22500], [30000, 28000, 27500], [33000, 31000, 30500], [37000, 35000, 34500] ],
    [ [29000, 27000, 26500], [34000, 32000, 31500], [37000, 35000, 34500], [41000, 39000, 38500] ]
  ];
  // 알뜰: 제공사3 × 속도2 × 결합2
  var pricesAL = [
    [ [16500, 15500], [19500, 18500] ],
    [ [16000, 15000], [19000, 18000] ],
    [ [15800, 14800], [18800, 17800] ]
  ];

  function getPrice(carrier, speedIdx, productIdx, bundleIdx) {
    if (carrier === 'sk') return pricesSK[speedIdx][productIdx][bundleIdx];
    if (carrier === 'lg') return pricesLG[speedIdx][productIdx][bundleIdx];
    if (carrier === 'kt') return pricesKT[speedIdx][productIdx][bundleIdx];
    if (carrier === 'al') return pricesAL[speedIdx][productIdx][bundleIdx];
    return 0;
  }

  function formatWon(n) {
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  var tabs = document.querySelectorAll('.fee-tab');
  var panels = document.querySelectorAll('.fee-panel');

  function switchPanel(carrier) {
    tabs.forEach(function (t) {
      t.classList.toggle('is-active', t.getAttribute('data-carrier') === carrier);
    });
    panels.forEach(function (p) {
      p.classList.toggle('is-active', p.getAttribute('data-carrier') === carrier);
    });
    updateTotal(carrier);
  }

  function getIndices(panel) {
    var c = panel.getAttribute('data-carrier');
    var speedIdx = 0, productIdx = 0, bundleIdx = 0;
    panel.querySelectorAll('.fee-options').forEach(function (row) {
      var r = row.getAttribute('data-row');
      var sel = row.querySelector('.fee-opt.is-selected');
      if (!sel) return;
      var idx = parseInt(sel.getAttribute('data-idx'), 10);
      if (r === 'speed') speedIdx = idx;
      else if (r === 'product') productIdx = idx;
      else if (r === 'bundle') bundleIdx = idx;
    });
    return { speedIdx: speedIdx, productIdx: productIdx, bundleIdx: bundleIdx };
  }

  function updateTotal(carrier) {
    var panel = document.querySelector('.fee-panel[data-carrier="' + carrier + '"]');
    if (!panel) return;
    var idx = getIndices(panel);
    var amount = getPrice(carrier, idx.speedIdx, idx.productIdx, idx.bundleIdx);
    var el = panel.querySelector('.fee-total-amount');
    if (el) el.textContent = formatWon(amount);
  }

  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      switchPanel(tab.getAttribute('data-carrier'));
    });
  });

  panels.forEach(function (panel) {
    var carrier = panel.getAttribute('data-carrier');
    panel.querySelectorAll('.fee-opt').forEach(function (opt) {
      opt.addEventListener('click', function () {
        var row = this.closest('.fee-options');
        if (!row) return;
        row.querySelectorAll('.fee-opt').forEach(function (o) { o.classList.remove('is-selected'); });
        this.classList.add('is-selected');
        updateTotal(carrier);
      });
    });
  });

  // 초기: URL에 ?tab=sk|lg|kt|al 있으면 해당 탭으로, 없으면 SK
  var match = typeof location !== 'undefined' && location.search && location.search.match(/[?&]tab=(sk|lg|kt|al)/);
  var initialTab = (match && match[1]) ? match[1] : 'sk';
  switchPanel(initialTab);
})();
