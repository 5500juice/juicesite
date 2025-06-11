 const tabHistory = [];
    let historyIndex = -1;
    let currentPage = 'home';

    function switchPage(pageId, fromButton = true) {
      if (currentPage === pageId) return;

      if (fromButton) {
        tabHistory.splice(historyIndex + 1);
        tabHistory.push(pageId);
        historyIndex = tabHistory.length - 1;
      }

      currentPage = pageId;

      const pages = ['home', 'about', 'contact', 'pics'];
      pages.forEach(id => {
        document.getElementById(`page-${id}`).style.display = (id === pageId) ? 'block' : 'none';
      });

      const input = document.querySelector('.toolbar input');
      input.value = `https://www.5500juice.pdg/${pageId}`;
    }

    function refreshPage() {
      switchPage(currentPage, false);
    }

    function goBack() {
      if (historyIndex > 0) {
        historyIndex--;
        switchPage(tabHistory[historyIndex], false);
      }
    }

    function goForward() {
      if (historyIndex < tabHistory.length - 1) {
        historyIndex++;
        switchPage(tabHistory[historyIndex], false);
      }
    }

    const input = document.querySelector('.toolbar input');
    const goButton = document.querySelector('.toolbar button:last-of-type');
    tabHistory.push('home');
    historyIndex = 0;

    document.addEventListener('DOMContentLoaded', () => {
    const bootScreen = document.getElementById('boot-screen');

    if (!sessionStorage.getItem('bootScreenShown')) {
    bootScreen.style.display = 'flex';

    setTimeout(() => {
      bootScreen.style.display = 'none';
      sessionStorage.setItem('bootScreenShown', 'true');
    }, 3000);
    } else {
    bootScreen.style.display = 'none';
   }

      document.querySelector('.btn-back').addEventListener('click', goBack);
      document.querySelector('.btn-forward').addEventListener('click', goForward);
      document.querySelector('.btn-refresh').addEventListener('click', refreshPage);

      function handleSearch() {
        const query = input.value.trim();
        if (!query) return;
        if (query.startsWith('http://') || query.startsWith('https://')) {
          window.open(query, '_blank');
        } else if (query.includes('.') && !query.includes(' ')) {
          window.open('https://' + query, '_blank');
        } else {
          const searchURL = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
          window.open(searchURL, '_blank');
        }
      }

      goButton.addEventListener('click', handleSearch);
      input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSearch();
      });


      const modal = document.getElementById('image-modal');
      const modalImg = document.getElementById('modal-img');
      const closeModalBtn = document.querySelector('.close-modal');

      document.querySelectorAll('.fixed-size-img').forEach(img => {
        img.addEventListener('click', () => {
          modalImg.src = img.src;
          modal.style.display = 'flex';
          
        });
      });

      closeModalBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        modalImg.src = '';
      });

      window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          modal.style.display = 'none';
          modalImg.src = '';
        }
      });

      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.style.display = 'none';
          modalImg.src = '';
        }
      });
    });