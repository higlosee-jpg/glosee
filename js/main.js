(function () {
  'use strict';

  // 퀵 모달 (예: "우리집 최저요금 확인" 클릭 시 열기 - 필요시 연결)
  var quickModal = document.getElementById('quickModal');
  var closeQuick = document.getElementById('closeQuick');

  if (closeQuick && quickModal) {
    closeQuick.addEventListener('click', function () {
      quickModal.classList.remove('is-open');
    });
  }
  if (quickModal) {
    quickModal.addEventListener('click', function (e) {
      if (e.target === quickModal) quickModal.classList.remove('is-open');
    });
  }

  // 첫 번째 히어로 카드(최저요금 확인) 클릭 시 요금 계산기 섹션으로 스크롤
  var feeCard = document.querySelector('a[href="#fee"]');
  if (feeCard) {
    feeCard.addEventListener('click', function (e) {
      var href = this.getAttribute('href');
      if (href === '#fee') {
        e.preventDefault();
        var el = document.getElementById('fee');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }

  // ESC로 모달 닫기
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && quickModal && quickModal.classList.contains('is-open')) {
      quickModal.classList.remove('is-open');
    }
  });
})();
