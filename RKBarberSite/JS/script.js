// ===== RK BARBEARIA - MAIN JAVASCRIPT =====

// Global variables and state management
const AppState = {
    isLoggedIn: false,
    currentUser: null,
    userType: 'cliente', // 'cliente' or 'barbeiro'
    theme: 'dark',
    currentStep: 1,
    selectedDate: null,
    selectedTime: null,
    posts: [],
    bookingHistory: [],
    currentCalendarMonth: new Date().getMonth(),
    currentCalendarYear: new Date().getFullYear()
};

// Demo user accounts
const DEMO_ACCOUNTS = {
    'cliente@test.com': {
        password: 'senha123',
        type: 'cliente',
        name: 'Cliente Demo',
        email: 'cliente@test.com'
    },
    'barbeiro@test.com': {
        password: 'senha123',
        type: 'barbeiro',
        name: 'Barbeiro Demo',
        email: 'barbeiro@test.com'
    }
};

// Configuração das imagens de cortes
const HAIRCUT_IMAGES = {
    folder: 'img/haircuts/', // Ajustado para a nova estrutura de pastas
    totalImages: 10, // Ajustado para o número real de imagens criadas
    extension: '.jpg',
    customNames: []
};

// Função para obter uma imagem aleatória
function getRandomHaircutImage() {
    if (HAIRCUT_IMAGES.customNames.length > 0) {
        // Usar nomes customizados
        const randomIndex = Math.floor(Math.random() * HAIRCUT_IMAGES.customNames.length);
        return HAIRCUT_IMAGES.folder + HAIRCUT_IMAGES.customNames[randomIndex];
    } else {
        // Usar numeração sequencial (corte1.jpg, corte2.jpg, etc.)
        const randomNumber = Math.floor(Math.random() * HAIRCUT_IMAGES.totalImages) + 1;
        return HAIRCUT_IMAGES.folder + 'corte' + randomNumber + HAIRCUT_IMAGES.extension;
    }
}

// Barber profiles database
const BARBER_PROFILES = {
    'João Silva': {
        name: 'João Silva',
        avatar: 'JS',
        specialty: 'Especialista em Degradê e Cortes Modernos',
        rating: 4.8,
        totalCuts: 287,
        experience: '5 anos',
        description: 'Barbeiro apaixonado por criar looks únicos e modernos. Especializado em degradês e cortes contemporâneos que realçam a personalidade de cada cliente.',
        services: ['Corte Degradê', 'Corte Social', 'Barba', 'Bigode'],
        schedule: 'Seg-Sex: 8h-18h | Sáb: 8h-14h'
    },
    'Carlos Santos': {
        name: 'Carlos Santos',
        avatar: 'CS',
        specialty: 'Master em Cortes Executivos',
        rating: 4.9,
        totalCuts: 412,
        experience: '8 anos',
        description: 'Especialista em cortes sociais e executivos. Trabalha com precisão e elegância para profissionais que precisam sempre estar impecáveis.',
        services: ['Corte Social', 'Corte Executivo', 'Barba Clássica', 'Tratamentos'],
        schedule: 'Seg-Sex: 9h-19h | Sáb: 9h-15h'
    },
    'Pedro Lima': {
        name: 'Pedro Lima',
        avatar: 'PL',
        specialty: 'Artista em Pompadour e Clássicos',
        rating: 4.7,
        totalCuts: 198,
        experience: '3 anos',
        description: 'Jovem talento especializado em estilos clássicos com toque moderno. Expert em pompadour e cortes vintage que nunca saem de moda.',
        services: ['Pompadour', 'Cortes Vintage', 'Styling', 'Texturização'],
        schedule: 'Ter-Sáb: 10h-18h'
    },
    'Rafael Costa': {
        name: 'Rafael Costa',
        avatar: 'RC',
        specialty: 'Designer de Cortes Artísticos',
        rating: 4.6,
        totalCuts: 156,
        experience: '4 anos',
        description: 'Criativo e inovador, especializado em designs únicos e cortes artísticos. Transforma cabelo em arte com técnicas avançadas.',
        services: ['Design Capilar', 'Cortes Artísticos', 'Navalhado', 'Desenhos'],
        schedule: 'Qua-Dom: 11h-19h'
    }
};
const SAMPLE_POSTS = [
    {
        id: 1,
        barber: "João Silva",
        avatar: "JS",
        time: "2h",
        description: "Corte degradê com finalização em máquina. Cliente saiu muito satisfeito com o resultado!",
        hashtags: "#degrade #cortemasculino #maquina #rkbarbearia",
        likes: 24,
        liked: false,
        image: getRandomHaircutImage() // Imagem automática da pasta
    },
    {
        id: 2,
        barber: "Carlos Santos",
        avatar: "CS",
        time: "4h",
        description: "Corte social com barba bem aparada. Perfeito para reuniões importantes.",
        hashtags: "#social #barba #executivo #profissional",
        likes: 18,
        liked: false,
        image: getRandomHaircutImage() // Imagem automática da pasta
    },
    {
        id: 3,
        barber: "Pedro Lima",
        avatar: "PL",
        time: "6h",
        description: "Pompadour moderno com textura. Um clássico que nunca sai de moda!",
        hashtags: "#pompadour #textura #classico #moderno",
        likes: 35,
        liked: true,
        image: getRandomHaircutImage() // Imagem automática da pasta
    },
    {
        id: 4,
        barber: "Rafael Costa",
        avatar: "RC",
        time: "8h",
        description: "Corte navalhado com design lateral. Arte pura nos cabelos!",
        hashtags: "#navalhado #design #arte #criativo",
        likes: 42,
        liked: false,
        image: getRandomHaircutImage() // Imagem automática da pasta
    },
    {
        id: 5,
        barber: "Bruno Oliveira",
        avatar: "BO",
        time: "1d",
        description: "Undercut com topete estilizado. Moderno e despojado.",
        hashtags: "#undercut #topete #moderno #despojado",
        likes: 28,
        liked: false,
        image: getRandomHaircutImage() // Imagem automática da pasta
    },
    {
        id: 6,
        barber: "Diego Ferreira",
        avatar: "DF",
        time: "1d",
        description: "Corte americano com degradê baixo. Clássico e elegante.",
        hashtags: "#americano #degradebaixo #classico #elegante",
        likes: 21,
        liked: false,
        image: getRandomHaircutImage() // Imagem automática da pasta
    },
    {
        id: 7,
        barber: "Lucas Martins",
        avatar: "LM",
        time: "2d",
        description: "Mohawk estilizado com laterais raspadas. Para quem gosta de ousar!",
        hashtags: "#mohawk #ousado #alternativo #estilo",
        likes: 31,
        liked: true,
        image: getRandomHaircutImage() // Imagem automática da pasta
    },
    {
        id: 8,
        barber: "Thiago Rocha",
        avatar: "TR",
        time: "2d",
        description: "Corte militar com acabamento perfeito. Disciplina e estilo.",
        hashtags: "#militar #disciplina #acabamento #perfeito",
        likes: 19,
        liked: false,
        image: getRandomHaircutImage() // Imagem automática da pasta
    },
    {
        id: 9,
        barber: "André Silva",
        avatar: "AS",
        time: "3d",
        description: "Fade alto com parte bem marcada. Moderno e sofisticado.",
        hashtags: "#fadealto #parte #sofisticado #marcado",
        likes: 26,
        liked: false,
        image: getRandomHaircutImage() // Imagem automática da pasta
    },
    {
        id: 10,
        barber: "Gustavo Lima",
        avatar: "GL",
        time: "3d",
        description: "Corte texturizado com movimento natural. Estilo despojado e atual.",
        hashtags: "#texturizado #movimento #natural #atual",
        likes: 33,
        liked: false,
        image: getRandomHaircutImage() // Imagem automática da pasta
    }
];

// Sample booking history
const SAMPLE_HISTORY = [
    {
        id: 1,
        date: "2024-01-15",
        time: "14:00",
        barber: "João Silva",
        service: "Corte + Barba",
        status: "completed",
        price: "R$ 35,00"
    },
    {
        id: 2,
        date: "2024-01-28",
        time: "16:30",
        barber: "Carlos Santos",
        service: "Corte Social",
        status: "completed",
        price: "R$ 25,00"
    },
    {
        id: 3,
        date: "2024-02-10",
        time: "10:00",
        barber: "Pedro Lima",
        service: "Corte Degradê",
        status: "scheduled",
        price: "R$ 30,00"
    }
];

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    loadTheme();
    checkLoginStatus();
});

function initializeApp() {
    console.log('🚀 RK Barbearia App inicialized');
    AppState.posts = [...SAMPLE_POSTS];
    AppState.bookingHistory = [...SAMPLE_HISTORY];
}

// ===== EVENT LISTENERS =====
function setupEventListeners() {
    // Navigation
    document.getElementById('loginBtn')?.addEventListener('click', showLoginModal);
    document.getElementById('registerBtn')?.addEventListener('click', showRegisterModal);
    document.getElementById('profileBtn')?.addEventListener('click', showProfileModal);
    document.getElementById('homeBtn')?.addEventListener('click', goHome);
    document.getElementById('themeToggle')?.addEventListener('click', toggleTheme);

    // Modal close buttons
    document.getElementById('closeLoginModal')?.addEventListener('click', hideLoginModal);
    document.getElementById('closeRegisterModal')?.addEventListener('click', hideRegisterModal);
    document.getElementById('closeProfileModal')?.addEventListener('click', hideProfileModal);
    document.getElementById('closeBookingModal')?.addEventListener('click', hideBookingModal);
    document.getElementById('closeBarberProfileModal')?.addEventListener('click', hideBarberProfileModal);

    // Forms
    document.getElementById('loginForm')?.addEventListener('submit', handleLogin);
    document.getElementById('registerForm')?.addEventListener('submit', handleRegister);

    // Search
    document.getElementById('searchInput')?.addEventListener('input', handleSearch);

    // Profile tabs
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', switchProfileTab);
    });

    // Profile photo upload
    document.getElementById('profilePhoto')?.addEventListener('click', function() {
        document.getElementById('photoUpload')?.click();
    });
    
    document.getElementById('photoUpload')?.addEventListener('change', handlePhotoUpload);

    // Close modals on outside click
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                hideAllModals();
            }
        });
    });

    // Infinite scroll
    window.addEventListener('scroll', handleInfiniteScroll);
}

// ===== AUTHENTICATION =====
function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const userType = document.querySelector('input[name="userType"]:checked').value;

    // Demo authentication
    const account = DEMO_ACCOUNTS[email];
    
    if (account && account.password === password) {
        AppState.isLoggedIn = true;
        AppState.currentUser = account;
        AppState.userType = account.type;
        
        // Update UI
        document.getElementById('loginSection').style.display = 'none';
        document.getElementById('feedContainer').style.display = 'block';
        
        // Load posts
        loadPosts();
        
        hideLoginModal();
        showSuccessMessage(`Bem-vindo, ${account.name}!`);
        
        console.log(`✅ Login successful: ${account.name} (${account.type})`);
    } else {
        showErrorMessage('Email ou senha incorretos!');
        document.getElementById('loginForm').classList.add('shake');
        setTimeout(() => {
            document.getElementById('loginForm').classList.remove('shake');
        }, 500);
    }
}

function handleRegister(e) {
    e.preventDefault();
    
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (password !== confirmPassword) {
        showErrorMessage('As senhas não coincidem!');
        return;
    }

    // In a real app, this would create a new account
    showInfoMessage('Cadastro em modo demonstração. Use uma conta de demo para fazer login.');
    hideRegisterModal();
}

function logout() {
    AppState.isLoggedIn = false;
    AppState.currentUser = null;
    AppState.userType = 'cliente';
    
    document.getElementById('loginSection').style.display = 'block';
    document.getElementById('feedContainer').style.display = 'none';
    
    hideAllModals();
    showInfoMessage('Logout realizado com sucesso!');
}

function checkLoginStatus() {
    // Check if user was previously logged in (in a real app, check localStorage/sessionStorage)
    // For demo, start logged out
    AppState.isLoggedIn = false;
}

// ===== THEME MANAGEMENT =====
function toggleTheme() {
    AppState.theme = AppState.theme === 'dark' ? 'light' : 'dark';
    applyTheme();
    saveTheme();
    
    const themeIcon = document.querySelector('#themeToggle i');
    themeIcon.className = AppState.theme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
}

function applyTheme() {
    if (AppState.theme === 'light') {
        document.body.classList.add('light-theme');
    } else {
        document.body.classList.remove('light-theme');
    }
}

function loadTheme() {
    const savedTheme = localStorage.getItem('rkbarbearia-theme');
    if (savedTheme) {
        AppState.theme = savedTheme;
    }
    applyTheme();
    
    const themeIcon = document.querySelector('#themeToggle i');
    if (themeIcon) {
        themeIcon.className = AppState.theme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
    }
}

function saveTheme() {
    localStorage.setItem('rkbarbearia-theme', AppState.theme);
}

// ===== POSTS AND FEED =====
function loadPosts() {
    const feedContainer = document.getElementById('postsFeed');
    feedContainer.innerHTML = '';
    
    AppState.posts.forEach(post => {
        const postElement = createPostElement(post);
        feedContainer.appendChild(postElement);
    });
    
    // Add loading indicator
    setTimeout(() => {
        document.getElementById('loadingIndicator').style.display = 'none';
    }, 1000);
}

function createPostElement(post) {
    const postDiv = document.createElement('div');
    postDiv.className = 'post-card';
    postDiv.setAttribute('data-post-id', post.id);
    
    postDiv.innerHTML = `
        <div class="post-header">
            <div class="barber-avatar" onclick="openBarberProfile('${post.barber}')">${post.avatar}</div>
            <div class="post-info">
                <h3 class="barber-name-clickable" onclick="openBarberProfile('${post.barber}')">${post.barber}</h3>
                <p>${post.time} atrás</p>
            </div>
        </div>
        <div class="post-image">
            <img src="${post.image}" alt="Corte de ${post.barber}" 
                 onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
                 onload="this.nextElementSibling.style.display='none';">
            <div class="image-placeholder" style="display: none;">
                📷 Adicione foto do corte aqui: ${post.image}
            </div>
        </div>
        <div class="post-content">
            <div class="post-description">
                ${post.description}
            </div>
            <div class="post-hashtags">
                ${post.hashtags.split(' ').map(tag => `<span onclick="searchHashtag('${tag}')">${tag}</span>`).join(' ')}
            </div>
            <div class="post-actions">
                <button class="action-btn like-btn ${post.liked ? 'liked' : ''}" onclick="toggleLike(${post.id})">
                    <i class="fas fa-heart"></i>
                    <span>${post.likes}</span>
                </button>
                <button class="action-btn book-btn" onclick="openBooking(${post.id})">
                    <i class="fas fa-calendar-plus"></i>
                    <span>Agendar</span>
                </button>
                <button class="action-btn share-btn" onclick="sharePost(${post.id})">
                    <i class="fas fa-share"></i>
                    <span>Compartilhar</span>
                </button>
            </div>
        </div>
    `;
    
    return postDiv;
}

function toggleLike(postId) {
    if (!AppState.isLoggedIn) {
        showInfoMessage('Faça login para curtir posts!');
        return;
    }
    
    const post = AppState.posts.find(p => p.id === postId);
    if (!post) return;
    
    post.liked = !post.liked;
    post.likes += post.liked ? 1 : -1;
    
    const postElement = document.querySelector(`[data-post-id="${postId}"]`);
    const likeBtn = postElement.querySelector('.like-btn');
    const likeCount = likeBtn.querySelector('span');
    
    likeBtn.classList.toggle('liked', post.liked);
    likeCount.textContent = post.likes;
    
    // Animation
    likeBtn.style.transform = 'scale(1.2)';
    setTimeout(() => {
        likeBtn.style.transform = 'scale(1)';
    }, 200);
}

function sharePost(postId) {
    const post = AppState.posts.find(p => p.id === postId);
    if (!post) return;
    
    if (navigator.share) {
        navigator.share({
            title: 'RK Barbearia - Corte Incrível!',
            text: post.description,
            url: window.location.href
        });
    } else {
        // Fallback for browsers without Web Share API
        const text = `Confira este corte incrível da RK Barbearia: ${post.description}`;
        navigator.clipboard.writeText(text).then(() => {
            showSuccessMessage('Link copiado para área de transferência!');
        });
    }
}

function openBooking(postId) {
    if (!AppState.isLoggedIn) {
        showInfoMessage('Faça login para agendar um corte!');
        return;
    }
    
    if (AppState.userType === 'barbeiro') {
        showInfoMessage('Barbeiros não podem agendar cortes!');
        return;
    }
    
    const post = AppState.posts.find(p => p.id === postId);
    AppState.selectedPost = post;
    
    showBookingModal();
    initializeBookingCalendar();
}

// ===== SEARCH FUNCTIONALITY =====
function handleSearch(e) {
    const query = e.target.value.toLowerCase();
    
    if (!query) {
        loadPosts();
        return;
    }
    
    const filteredPosts = AppState.posts.filter(post => 
        post.description.toLowerCase().includes(query) ||
        post.hashtags.toLowerCase().includes(query) ||
        post.barber.toLowerCase().includes(query)
    );
    
    displayFilteredPosts(filteredPosts);
}

function searchHashtag(hashtag) {
    const searchInput = document.getElementById('searchInput');
    searchInput.value = hashtag;
    handleSearch({ target: searchInput });
}

function displayFilteredPosts(posts) {
    const feedContainer = document.getElementById('postsFeed');
    feedContainer.innerHTML = '';
    
    if (posts.length === 0) {
        feedContainer.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search" style="font-size: 3rem; color: var(--text-secondary); margin-bottom: 1rem;"></i>
                <h3>Nenhum resultado encontrado</h3>
                <p>Tente pesquisar por outros termos.</p>
            </div>
        `;
        return;
    }
    
    posts.forEach(post => {
        const postElement = createPostElement(post);
        feedContainer.appendChild(postElement);
    });
}

// ===== MODAL MANAGEMENT =====
function showLoginModal() {
    document.getElementById('loginModal').classList.add('show');
    document.getElementById('loginEmail').focus();
}

function hideLoginModal() {
    document.getElementById('loginModal').classList.remove('show');
}

function showRegisterModal() {
    document.getElementById('registerModal').classList.add('show');
    document.getElementById('registerName').focus();
}

function hideRegisterModal() {
    document.getElementById('registerModal').classList.remove('show');
}

function showProfileModal() {
    if (!AppState.isLoggedIn) {
        showInfoMessage('Faça login para acessar seu perfil!');
        return;
    }
    
    loadProfileData();
    document.getElementById('profileModal').classList.add('show');
}

function hideProfileModal() {
    document.getElementById('profileModal').classList.remove('show');
}

function showBookingModal() {
    document.getElementById('bookingModal').classList.add('show');
    AppState.currentStep = 1;
    updateBookingSteps();
}

function hideBookingModal() {
    document.getElementById('bookingModal').classList.remove('show');
    resetBookingData();
}

function hideAllModals() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.classList.remove('show');
    });
}

// ===== BOOKING SYSTEM =====
function initializeBookingCalendar() {
    AppState.currentStep = 1;
    updateBookingSteps();
    renderCalendarStep();
}

function updateBookingSteps() {
    document.querySelectorAll('.step').forEach((step, index) => {
        step.classList.toggle('active', index + 1 <= AppState.currentStep);
    });
}

function renderCalendarStep() {
    const bookingContent = document.getElementById('bookingContent');
    bookingContent.innerHTML = `
        <div class="calendar-container">
            <div class="calendar-header">
                <button class="calendar-nav" onclick="previousMonth()">&lt;</button>
                <h3 class="calendar-title" id="calendarTitle">Janeiro 2024</h3>
                <button class="calendar-nav" onclick="nextMonth()">&gt;</button>
            </div>
            <div class="calendar-grid" id="calendarGrid">
                <!-- Calendar will be generated here -->
            </div>
        </div>
        <div class="booking-navigation">
            <button class="btn-secondary" onclick="hideBookingModal()">Cancelar</button>
            <button class="btn-primary" onclick="nextBookingStep()" id="nextStepBtn" disabled>Próximo</button>
        </div>
    `;
    
    // Initialize calendar with current date
    AppState.currentCalendarMonth = new Date().getMonth();
    AppState.currentCalendarYear = new Date().getFullYear();
    generateCalendar();
}

function generateCalendar() {
    const calendarTitle = document.getElementById('calendarTitle');
    const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
                   'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    
    calendarTitle.textContent = `${months[AppState.currentCalendarMonth]} ${AppState.currentCalendarYear}`;
    
    const calendarGrid = document.getElementById('calendarGrid');
    calendarGrid.innerHTML = '';
    
    // Add day headers
    const dayHeaders = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    dayHeaders.forEach(day => {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day header';
        dayElement.textContent = day;
        calendarGrid.appendChild(dayElement);
    });
    
    // Generate calendar days
    const firstDay = new Date(AppState.currentCalendarYear, AppState.currentCalendarMonth, 1);
    const lastDay = new Date(AppState.currentCalendarYear, AppState.currentCalendarMonth + 1, 0);
    const startingDayOfWeek = firstDay.getDay();
    const today = new Date();
    
    // Add empty cells for days before the month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.className = 'calendar-day';
        calendarGrid.appendChild(emptyDay);
    }
    
    // Add days of the month
    for (let day = 1; day <= lastDay.getDate(); day++) {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';
        dayElement.textContent = day;
        
        const dateObj = new Date(AppState.currentCalendarYear, AppState.currentCalendarMonth, day);
        const isToday = dateObj.toDateString() === today.toDateString();
        const isPast = dateObj < today && !isToday;
        
        if (isPast) {
            dayElement.classList.add('disabled');
        } else {
            dayElement.classList.add('available');
            dayElement.addEventListener('click', () => selectDate(dateObj));
        }
        
        if (isToday) {
            dayElement.style.border = '2px solid var(--primary-color)';
        }
        
        calendarGrid.appendChild(dayElement);
    }
}

function previousMonth() {
    AppState.currentCalendarMonth--;
    if (AppState.currentCalendarMonth < 0) {
        AppState.currentCalendarMonth = 11;
        AppState.currentCalendarYear--;
    }
    
    // Don't allow going before current month
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    
    if (AppState.currentCalendarYear < currentYear || 
        (AppState.currentCalendarYear === currentYear && AppState.currentCalendarMonth < currentMonth)) {
        AppState.currentCalendarMonth = currentMonth;
        AppState.currentCalendarYear = currentYear;
        return;
    }
    
    generateCalendar();
}

function nextMonth() {
    AppState.currentCalendarMonth++;
    if (AppState.currentCalendarMonth > 11) {
        AppState.currentCalendarMonth = 0;
        AppState.currentCalendarYear++;
    }
    
    // Don't allow going beyond December 2025
    if (AppState.currentCalendarYear > 2025 || 
        (AppState.currentCalendarYear === 2025 && AppState.currentCalendarMonth > 11)) {
        AppState.currentCalendarMonth = 11;
        AppState.currentCalendarYear = 2025;
        return;
    }
    
    generateCalendar();
}

function selectDate(date) {
    // Remove previous selection
    document.querySelectorAll('.calendar-day.selected').forEach(day => {
        day.classList.remove('selected');
    });
    
    // Add selection to clicked day
    event.target.classList.add('selected');
    
    AppState.selectedDate = date;
    document.getElementById('nextStepBtn').disabled = false;
}

function nextBookingStep() {
    AppState.currentStep++;
    updateBookingSteps();
    
    if (AppState.currentStep === 2) {
        renderTimeStep();
    } else if (AppState.currentStep === 3) {
        renderPaymentStep();
    }
}

function renderTimeStep() {
    const bookingContent = document.getElementById('bookingContent');
    bookingContent.innerHTML = `
        <div class="time-selection">
            <h3>Escolha o horário para ${formatDate(AppState.selectedDate)}</h3>
            <div class="time-slots" id="timeSlots">
                <!-- Time slots will be generated here -->
            </div>
        </div>
        <div class="booking-navigation">
            <button class="btn-secondary" onclick="previousBookingStep()">Voltar</button>
            <button class="btn-primary" onclick="nextBookingStep()" id="nextStepBtn" disabled>Próximo</button>
        </div>
    `;
    
    generateTimeSlots();
}

function generateTimeSlots() {
    const timeSlotsContainer = document.getElementById('timeSlots');
    const selectedDate = AppState.selectedDate;
    const dayOfWeek = selectedDate.getDay(); // 0 = Sunday, 6 = Saturday
    
    let startHour, endHour;
    
    // Monday to Friday: 9AM to 10PM
    // Saturday, Sunday and holidays: 11AM to 4PM
    if (dayOfWeek >= 1 && dayOfWeek <= 5) {
        startHour = 9;
        endHour = 22;
    } else {
        startHour = 11;
        endHour = 16;
    }
    
    for (let hour = startHour; hour <= endHour; hour++) {
        const timeSlot = document.createElement('div');
        timeSlot.className = 'time-slot available';
        timeSlot.textContent = `${hour}:00`;
        
        // Simulate some unavailable slots
        const isUnavailable = Math.random() < 0.3;
        if (isUnavailable) {
            timeSlot.classList.remove('available');
            timeSlot.classList.add('unavailable');
            timeSlot.textContent += ' (Ocupado)';
        } else {
            timeSlot.addEventListener('click', () => selectTime(hour));
        }
        
        timeSlotsContainer.appendChild(timeSlot);
    }
}

function selectTime(hour) {
    // Remove previous selection
    document.querySelectorAll('.time-slot.selected').forEach(slot => {
        slot.classList.remove('selected');
    });
    
    // Add selection to clicked slot
    event.target.classList.add('selected');
    
    AppState.selectedTime = `${hour}:00`;
    document.getElementById('nextStepBtn').disabled = false;
}

function renderPaymentStep() {
    const bookingContent = document.getElementById('bookingContent');
    bookingContent.innerHTML = `
        <div class="payment-selection">
            <h3>Escolha a forma de pagamento</h3>
            <div class="payment-options">
                <div class="payment-option" onclick="selectPayment('pix')">
                    <div class="payment-icon">💳</div>
                    <div class="payment-info">
                        <h4>PIX</h4>
                        <p>Pagamento instantâneo via PIX</p>
                    </div>
                </div>
                <div class="payment-option" onclick="selectPayment('debit')">
                    <div class="payment-icon">💳</div>
                    <div class="payment-info">
                        <h4>Cartão de Débito</h4>
                        <p>Débito em conta corrente</p>
                    </div>
                </div>
                <div class="payment-option" onclick="selectPayment('credit')">
                    <div class="payment-icon">💳</div>
                    <div class="payment-info">
                        <h4>Cartão de Crédito</h4>
                        <p>Parcelamento disponível</p>
                    </div>
                </div>
            </div>
            
            <div class="booking-summary">
                <h4>Resumo do Agendamento:</h4>
                <p><strong>Data:</strong> ${formatDate(AppState.selectedDate)}</p>
                <p><strong>Horário:</strong> ${AppState.selectedTime}</p>
                <p><strong>Serviço:</strong> Corte de Cabelo</p>
                <p><strong>Valor:</strong> R$ 30,00</p>
            </div>
        </div>
        <div class="booking-navigation">
            <button class="btn-secondary" onclick="previousBookingStep()">Voltar</button>
            <button class="btn-primary" onclick="confirmBooking()" id="confirmBtn" disabled>Confirmar Agendamento</button>
        </div>
    `;
}

function selectPayment(method) {
    // Remove previous selection
    document.querySelectorAll('.payment-option.selected').forEach(option => {
        option.classList.remove('selected');
    });
    
    // Add selection to clicked option
    event.currentTarget.classList.add('selected');
    
    AppState.selectedPayment = method;
    document.getElementById('confirmBtn').disabled = false;
}

function confirmBooking() {
    // Simulate booking confirmation
    const newBooking = {
        id: AppState.bookingHistory.length + 1,
        date: AppState.selectedDate.toISOString().split('T')[0],
        time: AppState.selectedTime,
        barber: AppState.selectedPost?.barber || 'João Silva',
        service: 'Corte de Cabelo',
        status: 'scheduled',
        price: 'R$ 30,00'
    };
    
    AppState.bookingHistory.push(newBooking);
    
    hideBookingModal();
    showSuccessMessage('Agendamento confirmado com sucesso!');
    
    // Reset booking data
    resetBookingData();
}

function resetBookingData() {
    AppState.currentStep = 1;
    AppState.selectedDate = null;
    AppState.selectedTime = null;
    AppState.selectedPayment = null;
    AppState.selectedPost = null;
}

// ===== UTILITY FUNCTIONS =====
function formatDate(date) {
    if (!date) return '';
    return date.toLocaleDateString('pt-BR');
}

function showSuccessMessage(message) {
    showMessage(message, 'success');
}

function showErrorMessage(message) {
    showMessage(message, 'error');
}

function showInfoMessage(message) {
    showMessage(message, 'info');
}

function showMessage(message, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    messageDiv.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        messageDiv.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(messageDiv);
        }, 300);
    }, 3000);
}

function goHome() {
    if (AppState.isLoggedIn) {
        hideAllModals();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
        document.getElementById('loginSection').style.display = 'block';
        document.getElementById('feedContainer').style.display = 'none';
    }
}

function handleInfiniteScroll() {
    if (!AppState.isLoggedIn) return;
    
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    
    if (scrollTop + windowHeight >= documentHeight - 1000) {
        loadMorePosts();
    }
}

function loadMorePosts() {
    const loadingIndicator = document.getElementById('loadingIndicator');
    if (loadingIndicator.style.display === 'block') return; // Already loading
    
    loadingIndicator.style.display = 'block';
    
    // Simulate loading delay
    setTimeout(() => {
        const morePosts = generateMorePosts();
        appendPosts(morePosts);
        loadingIndicator.style.display = 'none';
    }, 1000);
}

function generateMorePosts() {
    const barbeiros = ['Marco Silva', 'Paulo Santos', 'Alex Costa', 'Rodrigo Lima'];
    const cortes = [
        { desc: 'Corte degradê com finalização moderna', tags: '#degrade #moderno #rkbarbearia' },
        { desc: 'Pompadour clássico com barba alinhada', tags: '#pompadour #classico #barba' },
        { desc: 'Undercut criativo com design lateral', tags: '#undercut #criativo #design' },
        { desc: 'Corte social executivo perfeito', tags: '#social #executivo #profissional' }
    ];
    
    const newPosts = [];
    for (let i = 0; i < 3; i++) {
        const barbeiro = barbeiros[Math.floor(Math.random() * barbeiros.length)];
        const corte = cortes[Math.floor(Math.random() * cortes.length)];
        
        newPosts.push({
            id: AppState.posts.length + i + 1,
            barber: barbeiro,
            avatar: barbeiro.split(' ').map(n => n[0]).join(''),
            time: Math.floor(Math.random() * 24) + 'h',
            description: corte.desc,
            hashtags: corte.tags,
            likes: Math.floor(Math.random() * 50) + 5,
            liked: false,
            image: getRandomHaircutImage() // Imagem aleatória da pasta
        });
    }
    
    return newPosts;
}

function appendPosts(posts) {
    const feedContainer = document.getElementById('postsFeed');
    
    posts.forEach(post => {
        AppState.posts.push(post);
        const postElement = createPostElement(post);
        feedContainer.appendChild(postElement);
    });
}

function switchProfileTab(e) {
    const tabName = e.target.getAttribute('data-tab');
    
    // Update tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    e.target.classList.add('active');
    
    // Update tab content
    document.querySelectorAll('.tab-content').forEach(content => {
        content.style.display = 'none';
    });
    document.getElementById(tabName + 'Tab').style.display = 'block';
    
    // Load specific tab data
    if (tabName === 'history') {
        loadProfileHistory();
    }
}

// ===== BARBER PROFILE FUNCTIONS =====
function openBarberProfile(barberName) {
    const barber = BARBER_PROFILES[barberName];
    if (!barber) {
        showErrorMessage('Perfil do barbeiro não encontrado!');
        return;
    }
    
    const content = document.getElementById('barberProfileContent');
    content.innerHTML = `
        <div class="barber-profile-header">
            <div class="barber-profile-avatar">${barber.avatar}</div>
            <h2 class="barber-name">${barber.name}</h2>
            <p class="barber-specialty">${barber.specialty}</p>
            <div class="barber-rating">
                <div class="stars">
                    ${generateStarRating(barber.rating)}
                </div>
                <span class="rating-text">${barber.rating}/5.0 (${barber.totalCuts} avaliações)</span>
            </div>
        </div>
        
        <div class="barber-stats">
            <div class="barber-stat">
                <span class="barber-stat-number">${barber.totalCuts}</span>
                <span class="barber-stat-label">Cortes realizados</span>
            </div>
            <div class="barber-stat">
                <span class="barber-stat-number">${barber.experience}</span>
                <span class="barber-stat-label">Experiência</span>
            </div>
            <div class="barber-stat">
                <span class="barber-stat-number">${barber.rating}</span>
                <span class="barber-stat-label">Avaliação</span>
            </div>
            <div class="barber-stat">
                <span class="barber-stat-number">${barber.services.length}</span>
                <span class="barber-stat-label">Serviços</span>
            </div>
        </div>
        
        <div class="barber-description">
            <h4>Sobre o Barbeiro</h4>
            <p>${barber.description}</p>
            
            <h4>Serviços Oferecidos</h4>
            <ul>
                ${barber.services.map(service => `<li>${service}</li>`).join('')}
            </ul>
            
            <h4>Horários de Atendimento</h4>
            <p>${barber.schedule}</p>
        </div>
        
        <div class="barber-actions">
            <button class="btn-primary" onclick="bookWithBarber('${barber.name}')">
                <i class="fas fa-calendar-plus"></i>
                Agendar com ${barber.name.split(' ')[0]}
            </button>
            <button class="btn-secondary" onclick="hideBarberProfileModal()">
                <i class="fas fa-times"></i>
                Fechar
            </button>
        </div>
    `;
    
    document.getElementById('barberProfileModal').classList.add('show');
}

function generateStarRating(rating) {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    
    let stars = '';
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star star"></i>';
    }
    if (halfStar) {
        stars += '<i class="fas fa-star-half-alt star"></i>';
    }
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star star empty"></i>';
    }
    return stars;
}

function bookWithBarber(barberName) {
    if (!AppState.isLoggedIn) {
        showInfoMessage('Faça login para agendar um corte!');
        return;
    }
    
    if (AppState.userType === 'barbeiro') {
        showInfoMessage('Barbeiros não podem agendar cortes!');
        return;
    }
    
    // Create a mock post for the barber
    const barber = BARBER_PROFILES[barberName];
    AppState.selectedPost = {
        barber: barber.name,
        avatar: barber.avatar
    };
    
    hideBarberProfileModal();
    showBookingModal();
    initializeBookingCalendar();
}

function hideBarberProfileModal() {
    document.getElementById('barberProfileModal').classList.remove('show');
}

// ===== ENHANCED CLIENT PROFILE =====
function loadProfileData() {
    if (AppState.currentUser) {
        document.getElementById('profileName').value = AppState.currentUser.name;
        document.getElementById('profileEmail').value = AppState.currentUser.email;
        document.getElementById('profileDisplayName').textContent = AppState.currentUser.name;
    }
}

function handlePhotoUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    // Check file type
    if (!file.type.startsWith('image/')) {
        showErrorMessage('Por favor, selecione apenas arquivos de imagem!');
        return;
    }
    
    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
        showErrorMessage('A imagem deve ter no máximo 5MB!');
        return;
    }
    
    const reader = new FileReader();
    reader.onload = function(e) {
        document.getElementById('profileImage').src = e.target.result;
        showSuccessMessage('Foto atualizada com sucesso!');
    };
    reader.readAsDataURL(file);
}

function loadProfileHistory() {
    const historyList = document.getElementById('historyList');
    if (!historyList) return;
    
    historyList.innerHTML = '';
    
    AppState.bookingHistory.forEach(booking => {
        const historyItem = document.createElement('div');
        historyItem.className = 'history-item';
        historyItem.innerHTML = `
            <div class="history-header">
                <span class="history-date">${formatDate(new Date(booking.date))}</span>
                <span class="history-status ${booking.status}">${getStatusText(booking.status)}</span>
            </div>
            <div class="history-details">
                <p><strong>Barbeiro:</strong> ${booking.barber}</p>
                <p><strong>Horário:</strong> ${booking.time}</p>
                <p><strong>Serviço:</strong> ${booking.service}</p>
                <p><strong>Valor:</strong> ${booking.price}</p>
            </div>
            ${booking.status === 'scheduled' ? `
                <div class="history-actions">
                    <button class="btn-secondary" onclick="cancelBooking(${booking.id})">
                        <i class="fas fa-times"></i>
                        Cancelar
                    </button>
                    <button class="btn-primary" onclick="rescheduleBooking(${booking.id})">
                        <i class="fas fa-calendar-alt"></i>
                        Reagendar
                    </button>
                </div>
            ` : ''}
        `;
        historyList.appendChild(historyItem);
    });
}

function getStatusText(status) {
    const statusMap = {
        'completed': 'Concluído',
        'scheduled': 'Agendado',
        'cancelled': 'Cancelado'
    };
    return statusMap[status] || status;
}

function cancelBooking(bookingId) {
    if (confirm('Tem certeza que deseja cancelar este agendamento?')) {
        const booking = AppState.bookingHistory.find(b => b.id === bookingId);
        if (booking) {
            booking.status = 'cancelled';
            loadProfileHistory();
            showSuccessMessage('Agendamento cancelado com sucesso!');
        }
    }
}

function rescheduleBooking(bookingId) {
    const booking = AppState.bookingHistory.find(b => b.id === bookingId);
    if (booking) {
        // Create a mock post for rescheduling
        AppState.selectedPost = {
            barber: booking.barber,
            avatar: booking.barber.split(' ').map(n => n[0]).join('')
        };
        
        hideProfileModal();
        showBookingModal();
        initializeBookingCalendar();
    }
}

function previousBookingStep() {
    AppState.currentStep--;
    updateBookingSteps();
    
    if (AppState.currentStep === 1) {
        renderCalendarStep();
    } else if (AppState.currentStep === 2) {
        renderTimeStep();
    }
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    .no-results, .no-history {
        text-align: center;
        padding: 4rem 2rem;
        color: var(--text-secondary);
    }
    
    .booking-summary {
        margin-top: 2rem;
        padding: 1.5rem;
        background: var(--background-color);
        border-radius: 12px;
        border: 1px solid var(--border-color);
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    }
    
    .booking-navigation {
        display: flex;
        justify-content: space-between;
        margin-top: 2rem;
        gap: 1rem;
        flex-wrap: wrap;
    }
`;
document.head.appendChild(style);

console.log('✅ RK Barbearia JavaScript loaded successfully!');