const tabHistory = ['home'];
let historyIndex = 0;
let currentPage = 'home';

// Switch visible page
function switchPage(pageId, fromButton = true) {
  if (currentPage === pageId) return;

  if (fromButton) {
    tabHistory.splice(historyIndex + 1);
    tabHistory.push(pageId);
    historyIndex++;
  }

  currentPage = pageId;

  ['home', 'about', 'contact', 'pics', 'projects'].forEach(id => {
    document.getElementById(`page-${id}`).style.display = (id === pageId) ? 'block' : 'none';
  });

  document.querySelector('.toolbar input').value = `https://www.5500juice.pdg/${pageId}`;
}

// Navigation functions
function refreshPage() { switchPage(currentPage, false); }
function goBack() { if (historyIndex > 0) switchPage(tabHistory[--historyIndex], false); }
function goForward() { if (historyIndex < tabHistory.length - 1) switchPage(tabHistory[++historyIndex], false); }

document.addEventListener('DOMContentLoaded', () => {
  // Boot screen logic
  const bootScreen = document.getElementById('boot-screen');
  if (!sessionStorage.getItem('bootScreenShown')) {
    bootScreen.style.display = 'flex';
    setTimeout(() => {
      bootScreen.style.display = 'none';
      sessionStorage.setItem('bootScreenShown', 'true');
    }, 3000);
  } else bootScreen.style.display = 'none';

  // Toolbar events
  document.querySelector('.btn-back').onclick = goBack;
  document.querySelector('.btn-forward').onclick = goForward;
  document.querySelector('.btn-refresh').onclick = refreshPage;

  const input = document.querySelector('.toolbar input');
  const goBtn = document.querySelector('.toolbar button:last-of-type');

  function handleSearch() {
    const query = input.value.trim();
    if (!query) return;

    const url = query.startsWith('http') ? query :
                (query.includes('.') && !query.includes(' ')) ? `https://${query}` :
                `https://www.google.com/search?q=${encodeURIComponent(query)}`;

    window.open(url, '_blank');
  }

  goBtn.onclick = handleSearch;
  input.addEventListener('keypress', e => { if (e.key === 'Enter') handleSearch(); });

  // Modal handling
  const modal = document.getElementById('image-modal');
  const modalImg = document.getElementById('modal-img');

  document.querySelectorAll('.fixed-size-img').forEach(img => {
    img.onclick = () => {
      modalImg.src = img.src;
      modal.style.display = 'flex';
    };
  });

  document.querySelector('.close-modal').onclick = () => {
    modal.style.display = 'none';
    modalImg.src = '';
  };

  window.onkeydown = e => {
    if (e.key === 'Escape') {
      modal.style.display = 'none';
      modalImg.src = '';
    }
  };

  modal.onclick = e => {
    if (e.target === modal) {
      modal.style.display = 'none';
      modalImg.src = '';
    }
  };
});
