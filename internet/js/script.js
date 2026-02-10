(function () {
  'use strict';

  // Search modal
  var btnSearch = document.getElementById('btnSearch');
  var searchModal = document.getElementById('searchModal');
  var closeSearch = document.getElementById('closeSearch');
  var searchForm = document.getElementById('searchForm');

  function openSearch() {
    searchModal.classList.add('is-open');
    searchModal.setAttribute('aria-hidden', 'false');
    document.getElementById('searchKeyword').focus();
  }

  function closeSearchModal() {
    searchModal.classList.remove('is-open');
    searchModal.setAttribute('aria-hidden', 'true');
  }

  if (btnSearch) btnSearch.addEventListener('click', openSearch);
  if (closeSearch) closeSearch.addEventListener('click', closeSearchModal);
  if (searchModal) {
    searchModal.addEventListener('click', function (e) {
      if (e.target === searchModal) closeSearchModal();
    });
  }
  if (searchForm) {
    searchForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var q = document.getElementById('searchKeyword').value.trim();
      if (q) {
        // 실제 검색 URL로 이동하거나 검색 처리
        window.location.href = '#search?stx=' + encodeURIComponent(q);
      }
      closeSearchModal();
    });
  }

  // Ticker: duplicate content for infinite scroll (append clone inside .ticker-inner)
  function setupTicker(selector) {
    var ticker = document.querySelector(selector);
    if (!ticker) return;
    var inner = ticker.querySelector('.ticker-inner');
    var content = ticker.querySelector('.ticker-content');
    if (!inner || !content) return;
    var clone = content.cloneNode(true);
    clone.setAttribute('aria-hidden', 'true');
    inner.appendChild(clone);
  }
  setupTicker('#tickerDeposit');
  setupTicker('#tickerSms');

  // Trust carousel: duplicate track for infinite scroll (animate parent)
  var trustCarousel = document.getElementById('trustCarousel');
  if (trustCarousel) {
    var track = trustCarousel.querySelector('.trust-track');
    if (track) {
      var cloneTrack = track.cloneNode(true);
      trustCarousel.appendChild(cloneTrack);
    }
  }

  // CTA "비밀지원금 문자받기" -> open agree modal
  var agreeModal = document.getElementById('agreeModal');
  var closeAgree = document.getElementById('closeAgree');
  var agreeCheck = document.getElementById('agreeCheck');
  var submitSms = document.getElementById('submitSms');

  function openAgreeModal() {
    if (agreeModal) {
      agreeModal.classList.add('is-open');
      agreeModal.setAttribute('aria-hidden', 'false');
      if (agreeCheck) agreeCheck.checked = false;
    }
  }

  function closeAgreeModal() {
    if (agreeModal) {
      agreeModal.classList.remove('is-open');
      agreeModal.setAttribute('aria-hidden', 'true');
    }
  }

  document.querySelectorAll('.cta-sms').forEach(function (btn) {
    btn.addEventListener('click', function () {
      openAgreeModal();
    });
  });

  if (closeAgree) closeAgree.addEventListener('click', closeAgreeModal);
  if (agreeModal) {
    agreeModal.addEventListener('click', function (e) {
      if (e.target === agreeModal) closeAgreeModal();
    });
  }

  if (submitSms) {
    submitSms.addEventListener('click', function () {
      if (agreeCheck && !agreeCheck.checked) {
        alert('개인정보 수집 및 이용에 동의해 주세요.');
        return;
      }
      // 실제 전송 로직 연동 (폼 또는 API)
      alert('비밀지원금 문자가 발송되었습니다. 잠시 후 연락드리겠습니다.');
      closeAgreeModal();
    });
  }

  // Top button
  var btnTop = document.getElementById('btnTop');
  if (btnTop) {
    btnTop.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Escape key closes modals
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    if (searchModal && searchModal.classList.contains('is-open')) closeSearchModal();
    if (agreeModal && agreeModal.classList.contains('is-open')) closeAgreeModal();
  });
})();
