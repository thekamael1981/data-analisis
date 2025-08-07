// Global variables
let currentGrade = 10;
let currentLanguage = 'id';
let charts = {};
let currentDataset = [];
let userProgress = {};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    loadProgress();
    setupEventListeners();
    setupDragAndDrop();
    updateProgressDisplay();
});

// Initialize application
function initializeApp() {
    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    
    // Set initial theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
    
    // Set initial language
    const savedLanguage = localStorage.getItem('language') || 'id';
    currentLanguage = savedLanguage;
    updateLanguageDisplay();
}

// Setup event listeners
function setupEventListeners() {
    // Grade navigation
    document.querySelectorAll('.nav-tab').forEach(tab => {
        tab.addEventListener('click', function() {
            const grade = parseInt(this.dataset.grade);
            switchGrade(grade);
        });
    });
    
    // Theme toggle
    document.getElementById('themeToggle').addEventListener('click', toggleTheme);
    
    // Language toggle
    document.getElementById('langToggle').addEventListener('click', toggleLanguage);
    
    // Progress sidebar
    document.getElementById('progressToggle').addEventListener('click', toggleProgressSidebar);
    document.getElementById('closeSidebar').addEventListener('click', closeProgressSidebar);
    
    // Close sidebar on outside click
    document.addEventListener('click', function(e) {
        const sidebar = document.getElementById('progressSidebar');
        const toggleBtn = document.getElementById('progressToggle');
        
        if (sidebar.classList.contains('active') && 
            !sidebar.contains(e.target) && 
            !toggleBtn.contains(e.target)) {
            closeProgressSidebar();
        }
    });
    
    // Price range filter
    const priceRange = document.getElementById('priceRange');
    if (priceRange) {
        priceRange.addEventListener('input', function() {
            document.getElementById('priceValue').textContent = 
                `Rp ${parseInt(this.value).toLocaleString('id-ID')}`;
        });
    }
}

// Switch between grades
function switchGrade(grade) {
    currentGrade = grade;
    
    // Update navigation
    document.querySelectorAll('.nav-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelector(`[data-grade="${grade}"]`).classList.add('active');
    
    // Update content
    document.querySelectorAll('.grade-content').forEach(content => {
        content.classList.remove('active');
    });
    document.getElementById(`grade-${grade}`).classList.add('active');
    
    // Save current grade
    localStorage.setItem('currentGrade', grade.toString());
}

// Toggle theme
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
}

function updateThemeIcon(theme) {
    const themeIcon = document.querySelector('#themeToggle i');
    if (themeIcon) {
        themeIcon.setAttribute('data-lucide', theme === 'dark' ? 'sun' : 'moon');
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }
}

// Toggle language
function toggleLanguage() {
    currentLanguage = currentLanguage === 'id' ? 'en' : 'id';
    localStorage.setItem('language', currentLanguage);
    updateLanguageDisplay();
}

function updateLanguageDisplay() {
    const langBtn = document.getElementById('langToggle');
    langBtn.querySelector('.lang-text').textContent = currentLanguage === 'id' ? 'EN' : 'ID';
    
    // Update content based on language (implementation would go here)
    // For now, we'll keep the Indonesian content as primary
}

// Progress sidebar functions
function toggleProgressSidebar() {
    const sidebar = document.getElementById('progressSidebar');
    sidebar.classList.toggle('active');
}

function closeProgressSidebar() {
    const sidebar = document.getElementById('progressSidebar');
    sidebar.classList.remove('active');
}

// Chart creation and management
function createChart(inputId, chartId) {
    const input = document.getElementById(inputId);
    const canvas = document.getElementById(chartId);
    
    if (!input || !canvas) return;
    
    const dataString = input.value.trim();
    if (!dataString) {
        alert('Silakan masukkan data terlebih dahulu!');
        return;
    }
    
    // Parse data
    const data = dataString.split(',').map(item => parseFloat(item.trim())).filter(num => !isNaN(num));
    
    if (data.length === 0) {
        alert('Format data tidak valid! Gunakan format: angka1, angka2, angka3');
        return;
    }
    
    // Destroy existing chart if exists
    if (charts[chartId]) {
        charts[chartId].destroy();
    }
    
    // Create new chart
    const ctx = canvas.getContext('2d');
    charts[chartId] = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: data.map((_, index) => `Data ${index + 1}`),
            datasets: [{
                label: 'Nilai',
                data: data,
                backgroundColor: 'rgba(59, 130, 246, 0.5)',
                borderColor: 'rgba(59, 130, 246, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Grafik Data'
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
    
    // Update progress
    updateProgress(currentGrade, 'chart_created', true);
}

// Download chart as PNG
function downloadChart(chartId) {
    const chart = charts[chartId];
    if (!chart) {
        alert('Grafik belum dibuat!');
        return;
    }
    
    const link = document.createElement('a');
    link.download = `grafik_${chartId}_${Date.now()}.png`;
    link.href = chart.toBase64Image();
    link.click();
}

// Statistics calculation
function calculateStats() {
    const input = document.getElementById('statsData');
    const resultsDiv = document.getElementById('statsResults');
    
    if (!input || !resultsDiv) return;
    
    const dataString = input.value.trim();
    if (!dataString) {
        alert('Silakan masukkan data terlebih dahulu!');
        return;
    }
    
    // Parse data
    const data = dataString.split(',').map(item => parseFloat(item.trim())).filter(num => !isNaN(num));
    
    if (data.length === 0) {
        alert('Format data tidak valid!');
        return;
    }
    
    // Calculate statistics
    const sortedData = [...data].sort((a, b) => a - b);
    const mean = data.reduce((sum, val) => sum + val, 0) / data.length;
    const median = sortedData.length % 2 === 0
        ? (sortedData[sortedData.length / 2 - 1] + sortedData[sortedData.length / 2]) / 2
        : sortedData[Math.floor(sortedData.length / 2)];
    
    // Find mode
    const frequency = {};
    let maxFreq = 0;
    let modes = [];
    
    data.forEach(val => {
        frequency[val] = (frequency[val] || 0) + 1;
        if (frequency[val] > maxFreq) {
            maxFreq = frequency[val];
            modes = [val];
        } else if (frequency[val] === maxFreq && !modes.includes(val)) {
            modes.push(val);
        }
    });
    
    const mode = modes.length === data.length ? 'Tidak ada modus' : modes.join(', ');
    
    // Display results
    resultsDiv.innerHTML = `
        <div class="stat-result">
            <div class="stat-value">${mean.toFixed(2)}</div>
            <div class="stat-label">Rata-rata</div>
        </div>
        <div class="stat-result">
            <div class="stat-value">${median}</div>
            <div class="stat-label">Median</div>
        </div>
        <div class="stat-result">
            <div class="stat-value">${mode}</div>
            <div class="stat-label">Modus</div>
        </div>
        <div class="stat-result">
            <div class="stat-value">${data.length}</div>
            <div class="stat-label">Jumlah Data</div>
        </div>
    `;
    
    // Create histogram
    createStatsChart(data);
    
    // Update progress
    updateProgress(currentGrade, 'stats_calculated', true);
}

function createStatsChart(data) {
    const canvas = document.getElementById('statsChart');
    if (!canvas) return;
    
    // Destroy existing chart
    if (charts.statsChart) {
        charts.statsChart.destroy();
    }
    
    // Create histogram
    const ctx = canvas.getContext('2d');
    charts.statsChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: data.map((_, index) => `${index + 1}`),
            datasets: [{
                label: 'Nilai Data',
                data: data,
                backgroundColor: 'rgba(16, 185, 129, 0.5)',
                borderColor: 'rgba(16, 185, 129, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Distribusi Data'
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Quiz functionality
function checkAnswer(questionName, correctAnswer, buttonElement) {
    const selectedOption = document.querySelector(`input[name="${questionName}"]:checked`);
    const feedbackDiv = buttonElement.parentNode.querySelector('.quiz-feedback');
    
    if (!selectedOption) {
        alert('Silakan pilih jawaban terlebih dahulu!');
        return;
    }
    
    const isCorrect = selectedOption.value === correctAnswer;
    
    feedbackDiv.style.display = 'block';
    feedbackDiv.className = `quiz-feedback ${isCorrect ? 'correct' : 'incorrect'}`;
    
    if (isCorrect) {
        feedbackDiv.innerHTML = '✅ Jawaban benar! Excellent!';
        updateProgress(currentGrade, `quiz_${questionName}`, true);
    } else {
        feedbackDiv.innerHTML = '❌ Jawaban salah. Coba lagi dan perhatikan penjelasan materi.';
    }
    
    // Disable further attempts
    document.querySelectorAll(`input[name="${questionName}"]`).forEach(input => {
        input.disabled = true;
    });
    buttonElement.disabled = true;
}

// Drag and Drop functionality
function setupDragAndDrop() {
    const dragItems = document.querySelectorAll('.drag-item');
    const dropZones = document.querySelectorAll('.drop-zone');
    
    dragItems.forEach(item => {
        item.addEventListener('dragstart', handleDragStart);
        item.addEventListener('dragend', handleDragEnd);
        item.draggable = true;
    });
    
    dropZones.forEach(zone => {
        zone.addEventListener('dragover', handleDragOver);
        zone.addEventListener('dragenter', handleDragEnter);
        zone.addEventListener('dragleave', handleDragLeave);
        zone.addEventListener('drop', handleDrop);
    });
}

function handleDragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.textContent);
    e.dataTransfer.setData('data-type', e.target.dataset.type);
    e.target.classList.add('dragging');
}

function handleDragEnd(e) {
    e.target.classList.remove('dragging');
}

function handleDragOver(e) {
    e.preventDefault();
}

function handleDragEnter(e) {
    e.preventDefault();
    e.target.closest('.drop-zone').classList.add('drag-over');
}

function handleDragLeave(e) {
    e.target.closest('.drop-zone').classList.remove('drag-over');
}

function handleDrop(e) {
    e.preventDefault();
    const dropZone = e.target.closest('.drop-zone');
    dropZone.classList.remove('drag-over');
    
    const draggedText = e.dataTransfer.getData('text/plain');
    const draggedType = e.dataTransfer.getData('data-type');
    const dropType = dropZone.dataset.type;
    
    // Find the original dragged element and remove it
    const draggedElement = Array.from(document.querySelectorAll('.drag-item')).find(item => 
        item.textContent === draggedText && item.classList.contains('dragging'));
    
    if (draggedElement) {
        draggedElement.remove();
        
        // Create new element in drop zone
        const newElement = document.createElement('div');
        newElement.className = 'drag-item';
        newElement.textContent = draggedText;
        newElement.dataset.type = draggedType;
        newElement.dataset.correctType = dropType;
        
        dropZone.querySelector('.drop-items').appendChild(newElement);
    }
}

function checkDragDrop() {
    const dropZones = document.querySelectorAll('.drop-zone');
    const feedbackDiv = document.querySelector('.drag-feedback');
    let correct = 0;
    let total = 0;
    
    dropZones.forEach(zone => {
        const items = zone.querySelectorAll('.drag-item');
        const zoneType = zone.dataset.type;
        
        items.forEach(item => {
            total++;
            if (item.dataset.type === zoneType) {
                correct++;
            }
        });
    });
    
    feedbackDiv.style.display = 'block';
    
    if (correct === total && total > 0) {
        feedbackDiv.className = 'drag-feedback correct';
        feedbackDiv.innerHTML = `✅ Perfect! Semua data telah diklasifikasikan dengan benar (${correct}/${total})`;
        updateProgress(currentGrade, 'drag_drop', true);
    } else {
        feedbackDiv.className = 'drag-feedback incorrect';
        feedbackDiv.innerHTML = `❌ Masih ada yang salah. Benar: ${correct}/${total}. Coba lagi!`;
    }
}

// Case Study functionality
function loadCaseStudy() {
    const caseStudyData = sampleData.caseStudyData;
    const tableBody = document.querySelector('#caseStudyTable tbody');
    const contentDiv = document.getElementById('caseStudyContent');
    const analysisDiv = document.getElementById('caseAnalysis');
    
    // Show content
    contentDiv.classList.remove('hidden');
    
    // Populate table
    tableBody.innerHTML = '';
    caseStudyData.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.day}</td>
            <td>Rp ${item.amount.toLocaleString('id-ID')}</td>
            <td>${item.category}</td>
        `;
        tableBody.appendChild(row);
    });
    
    // Calculate and display analysis
    const totalSpending = caseStudyData.reduce((sum, item) => sum + item.amount, 0);
    const avgSpending = totalSpending / caseStudyData.length;
    const maxSpending = Math.max(...caseStudyData.map(item => item.amount));
    const minSpending = Math.min(...caseStudyData.map(item => item.amount));
    
    // Category analysis
    const categoryTotals = {};
    caseStudyData.forEach(item => {
        categoryTotals[item.category] = (categoryTotals[item.category] || 0) + item.amount;
    });
    
    const mostExpensiveCategory = Object.entries(categoryTotals)
        .sort(([,a], [,b]) => b - a)[0];
    
    analysisDiv.innerHTML = `
        <h6>Hasil Analisis:</h6>
        <div class="stats-results">
            <div class="stat-result">
                <div class="stat-value">Rp ${totalSpending.toLocaleString('id-ID')}</div>
                <div class="stat-label">Total Pengeluaran</div>
            </div>
            <div class="stat-result">
                <div class="stat-value">Rp ${Math.round(avgSpending).toLocaleString('id-ID')}</div>
                <div class="stat-label">Rata-rata Harian</div>
            </div>
            <div class="stat-result">
                <div class="stat-value">Rp ${maxSpending.toLocaleString('id-ID')}</div>
                <div class="stat-label">Pengeluaran Tertinggi</div>
            </div>
            <div class="stat-result">
                <div class="stat-value">${mostExpensiveCategory[0]}</div>
                <div class="stat-label">Kategori Terbesar</div>
            </div>
        </div>
    `;
    
    updateProgress(currentGrade, 'case_study', true);
}

// Big Data simulation
function generateBigData() {
    const categories = ['Elektronik', 'Fashion', 'Makanan', 'Buku'];
    const data = [];
    
    for (let i = 0; i < 1000; i++) {
        data.push({
            id: i + 1,
            name: `Produk ${i + 1}`,
            category: categories[Math.floor(Math.random() * categories.length)],
            price: Math.floor(Math.random() * 1000000) + 10000,
            rating: Math.round((Math.random() * 4 + 1) * 10) / 10,
            sales: Math.floor(Math.random() * 1000) + 1
        });
    }
    
    currentDataset = data;
    updateDataStats();
    createSalesChart();
    createCategoryChart();
    
    updateProgress(currentGrade, 'big_data_generated', true);
}

function filterData() {
    if (currentDataset.length === 0) return;
    
    const categoryFilter = document.getElementById('categoryFilter').value;
    const priceRange = parseInt(document.getElementById('priceRange').value);
    
    let filteredData = currentDataset.filter(item => {
        const matchesCategory = !categoryFilter || item.category === categoryFilter;
        const matchesPrice = item.price <= priceRange;
        return matchesCategory && matchesPrice;
    });
    
    updateDataStats(filteredData);
    createSalesChart(filteredData);
    createCategoryChart(filteredData);
}

function updateDataStats(data = currentDataset) {
    const statsDiv = document.getElementById('dataStats');
    if (!statsDiv || data.length === 0) return;
    
    const totalProducts = data.length;
    const avgPrice = data.reduce((sum, item) => sum + item.price, 0) / data.length;
    const avgRating = data.reduce((sum, item) => sum + item.rating, 0) / data.length;
    const totalSales = data.reduce((sum, item) => sum + item.sales, 0);
    
    statsDiv.innerHTML = `
        <div class="stat-card">
            <div class="stat-card-title">Total Produk</div>
            <div class="stat-card-value">${totalProducts.toLocaleString('id-ID')}</div>
        </div>
        <div class="stat-card">
            <div class="stat-card-title">Rata-rata Harga</div>
            <div class="stat-card-value">Rp ${Math.round(avgPrice).toLocaleString('id-ID')}</div>
        </div>
        <div class="stat-card">
            <div class="stat-card-title">Rata-rata Rating</div>
            <div class="stat-card-value">${avgRating.toFixed(1)}</div>
        </div>
        <div class="stat-card">
            <div class="stat-card-title">Total Penjualan</div>
            <div class="stat-card-value">${totalSales.toLocaleString('id-ID')}</div>
        </div>
    `;
}

function createSalesChart(data = currentDataset) {
    const canvas = document.getElementById('salesChart');
    if (!canvas || data.length === 0) return;
    
    // Destroy existing chart
    if (charts.salesChart) {
        charts.salesChart.destroy();
    }
    
    // Group by price ranges
    const priceRanges = {
        '0-100k': 0,
        '100k-300k': 0,
        '300k-500k': 0,
        '500k-1M': 0
    };
    
    data.forEach(item => {
        if (item.price < 100000) priceRanges['0-100k']++;
        else if (item.price < 300000) priceRanges['100k-300k']++;
        else if (item.price < 500000) priceRanges['300k-500k']++;
        else priceRanges['500k-1M']++;
    });
    
    const ctx = canvas.getContext('2d');
    charts.salesChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Object.keys(priceRanges),
            datasets: [{
                label: 'Jumlah Produk',
                data: Object.values(priceRanges),
                backgroundColor: 'rgba(59, 130, 246, 0.5)',
                borderColor: 'rgba(59, 130, 246, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Distribusi Harga Produk'
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function createCategoryChart(data = currentDataset) {
    const canvas = document.getElementById('categoryChart');
    if (!canvas || data.length === 0) return;
    
    // Destroy existing chart
    if (charts.categoryChart) {
        charts.categoryChart.destroy();
    }
    
    // Count by category
    const categoryCount = {};
    data.forEach(item => {
        categoryCount[item.category] = (categoryCount[item.category] || 0) + 1;
    });
    
    const ctx = canvas.getContext('2d');
    charts.categoryChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: Object.keys(categoryCount),
            datasets: [{
                data: Object.values(categoryCount),
                backgroundColor: [
                    'rgba(239, 68, 68, 0.5)',
                    'rgba(34, 197, 94, 0.5)',
                    'rgba(251, 191, 36, 0.5)',
                    'rgba(168, 85, 247, 0.5)'
                ],
                borderColor: [
                    'rgba(239, 68, 68, 1)',
                    'rgba(34, 197, 94, 1)',
                    'rgba(251, 191, 36, 1)',
                    'rgba(168, 85, 247, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Distribusi Kategori Produk'
                }
            }
        }
    });
}

// Correlation analysis
function analyzeCorrelation() {
    if (currentDataset.length === 0) {
        alert('Silakan generate dataset terlebih dahulu!');
        return;
    }
    
    // Calculate correlation between price and rating
    const prices = currentDataset.map(item => item.price);
    const ratings = currentDataset.map(item => item.rating);
    
    const correlation = calculatePearsonCorrelation(prices, ratings);
    
    const resultsDiv = document.getElementById('correlationResults');
    resultsDiv.innerHTML = `
        <div class="correlation-value">Korelasi: ${correlation.toFixed(3)}</div>
        <p>
            <strong>Interpretasi:</strong> 
            ${getCorrelationInterpretation(correlation)}
        </p>
    `;
    
    // Create scatter plot
    createScatterPlot();
    
    updateProgress(currentGrade, 'correlation_analyzed', true);
}

function calculatePearsonCorrelation(x, y) {
    const n = x.length;
    if (n !== y.length) return 0;
    
    const sumX = x.reduce((a, b) => a + b, 0);
    const sumY = y.reduce((a, b) => a + b, 0);
    const sumXY = x.reduce((sum, xi, i) => sum + xi * y[i], 0);
    const sumXX = x.reduce((sum, xi) => sum + xi * xi, 0);
    const sumYY = y.reduce((sum, yi) => sum + yi * yi, 0);
    
    const numerator = n * sumXY - sumX * sumY;
    const denominator = Math.sqrt((n * sumXX - sumX * sumX) * (n * sumYY - sumY * sumY));
    
    return denominator === 0 ? 0 : numerator / denominator;
}

function getCorrelationInterpretation(correlation) {
    const abs = Math.abs(correlation);
    let strength = '';
    
    if (abs >= 0.7) strength = 'kuat';
    else if (abs >= 0.3) strength = 'sedang';
    else strength = 'lemah';
    
    const direction = correlation > 0 ? 'positif' : 'negatif';
    
    return `Terdapat korelasi ${direction} ${strength} antara harga dan rating produk.`;
}

function createScatterPlot() {
    const canvas = document.getElementById('scatterChart');
    if (!canvas || currentDataset.length === 0) return;
    
    // Destroy existing chart
    if (charts.scatterChart) {
        charts.scatterChart.destroy();
    }
    
    const data = currentDataset.map(item => ({
        x: item.price,
        y: item.rating
    }));
    
    const ctx = canvas.getContext('2d');
    charts.scatterChart = new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [{
                label: 'Harga vs Rating',
                data: data,
                backgroundColor: 'rgba(59, 130, 246, 0.5)',
                borderColor: 'rgba(59, 130, 246, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Scatter Plot: Harga vs Rating'
                }
            },
            scales: {
                x: {
                    type: 'linear',
                    position: 'bottom',
                    title: {
                        display: true,
                        text: 'Harga (Rp)'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Rating'
                    }
                }
            }
        }
    });
}

// Advanced exercise checking
function checkAdvancedAnswers() {
    if (currentDataset.length === 0) {
        alert('Silakan generate dataset terlebih dahulu!');
        return;
    }
    
    const answer1 = document.getElementById('answer1').value.toLowerCase().trim();
    const answer2 = document.getElementById('answer2').value.trim();
    const feedbackDiv = document.getElementById('advancedFeedback');
    
    // Calculate correct answers
    const categorySales = {};
    currentDataset.forEach(item => {
        categorySales[item.category] = (categorySales[item.category] || 0) + item.sales;
    });
    
    const topCategory = Object.entries(categorySales)
        .sort(([,a], [,b]) => b - a)[0][0].toLowerCase();
    
    const fashionItems = currentDataset.filter(item => item.category === 'Fashion');
    const avgFashionPrice = fashionItems.length > 0 
        ? fashionItems.reduce((sum, item) => sum + item.price, 0) / fashionItems.length
        : 0;
    
    // Check answers
    let score = 0;
    let feedback = '';
    
    if (answer1 === topCategory) {
        score++;
        feedback += '✅ Jawaban 1 benar! ';
    } else {
        feedback += `❌ Jawaban 1 salah. Kategori dengan penjualan terbanyak adalah: ${topCategory}. `;
    }
    
    const answer2Num = parseFloat(answer2.replace(/[^0-9]/g, ''));
    const tolerance = avgFashionPrice * 0.1; // 10% tolerance
    
    if (Math.abs(answer2Num - avgFashionPrice) <= tolerance) {
        score++;
        feedback += '✅ Jawaban 2 benar!';
    } else {
        feedback += `❌ Jawaban 2 salah. Rata-rata harga Fashion: Rp ${Math.round(avgFashionPrice).toLocaleString('id-ID')}`;
    }
    
    feedbackDiv.style.display = 'block';
    feedbackDiv.className = `exercise-feedback ${score === 2 ? 'correct' : 'incorrect'}`;
    feedbackDiv.innerHTML = `<strong>Skor: ${score}/2</strong><br>${feedback}`;
    
    if (score === 2) {
        updateProgress(currentGrade, 'advanced_exercise', true);
    }
}

// Reflection and progress management
function saveReflection(grade, module) {
    const reflectionInputs = document.querySelectorAll('.reflection-input');
    const reflections = Array.from(reflectionInputs).map(input => input.value.trim());
    
    if (reflections.every(reflection => reflection === '')) {
        alert('Silakan isi setidaknya satu refleksi sebelum menyimpan!');
        return;
    }
    
    // Save to localStorage
    const key = `reflection_${grade}_${module}`;
    localStorage.setItem(key, JSON.stringify({
        reflections: reflections,
        timestamp: new Date().toISOString()
    }));
    
    // Update progress
    updateProgress(grade, 'reflection', true);
    
    alert('Refleksi berhasil disimpan!');
}

// Progress tracking
function updateProgress(grade, activity, completed) {
    if (!userProgress[grade]) {
        userProgress[grade] = {};
    }
    
    userProgress[grade][activity] = {
        completed: completed,
        timestamp: new Date().toISOString()
    };
    
    saveProgress();
    updateProgressDisplay();
}

function saveProgress() {
    localStorage.setItem('userProgress', JSON.stringify(userProgress));
}

function loadProgress() {
    const savedProgress = localStorage.getItem('userProgress');
    if (savedProgress) {
        userProgress = JSON.parse(savedProgress);
    }
    
    // Load saved grade
    const savedGrade = localStorage.getItem('currentGrade');
    if (savedGrade) {
        switchGrade(parseInt(savedGrade));
    }
}

function updateProgressDisplay() {
    [10, 11, 12].forEach(grade => {
        const gradeProgress = userProgress[grade] || {};
        const completed = Object.values(gradeProgress).filter(activity => activity.completed).length;
        const total = getGradeTotalActivities(grade);
        const percentage = total > 0 ? (completed / total) * 100 : 0;
        
        // Update progress bar
        const progressFill = document.querySelector(`[data-grade="${grade}"]`);
        if (progressFill) {
            progressFill.style.width = `${percentage}%`;
        }
        
        // Update progress details
        const progressDetails = document.getElementById(`progress-${grade}`);
        if (progressDetails) {
            progressDetails.innerHTML = `
                <p>Aktivitas selesai: ${completed}/${total}</p>
                <p>Progress: ${Math.round(percentage)}%</p>
            `;
        }
    });
}

function getGradeTotalActivities(grade) {
    // Define total activities per grade
    const totalActivities = {
        10: 5, // chart_created, quiz_q1, drag_drop, reflection, apersepsi
        11: 5, // stats_calculated, quiz_q2, case_study, reflection, apersepsi
        12: 6  // big_data_generated, correlation_analyzed, advanced_exercise, reflection, apersepsi, big_data_filtered
    };
    
    return totalActivities[grade] || 0;
}

// Utility functions
function formatNumber(num) {
    return num.toLocaleString('id-ID');
}

function formatCurrency(num) {
    return `Rp ${num.toLocaleString('id-ID')}`;
}

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    // Optionally show user-friendly error message
});

// Cleanup function for charts when page unloads
window.addEventListener('beforeunload', function() {
    Object.values(charts).forEach(chart => {
        if (chart && typeof chart.destroy === 'function') {
            chart.destroy();
        }
    });
});

// Accessibility enhancements
document.addEventListener('keydown', function(e) {
    // Escape key closes sidebar
    if (e.key === 'Escape') {
        closeProgressSidebar();
    }
});

// Auto-save functionality for text inputs
document.addEventListener('input', function(e) {
    if (e.target.classList.contains('reflection-input') || 
        e.target.classList.contains('activity-input')) {
        
        const key = `autosave_${e.target.className}_${Date.now()}`;
        localStorage.setItem(key, e.target.value);
        
        // Clean up old autosave entries (keep only last 10)
        const autosaveKeys = Object.keys(localStorage)
            .filter(key => key.startsWith('autosave_'))
            .sort();
        
        if (autosaveKeys.length > 10) {
            for (let i = 0; i < autosaveKeys.length - 10; i++) {
                localStorage.removeItem(autosaveKeys[i]);
            }
        }
    }
});
