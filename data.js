// Sample data for the application
const sampleData = {
    // Case study data for Grade 11
    caseStudyData: [
        { day: 'Senin', amount: 25000, category: 'Makanan' },
        { day: 'Selasa', amount: 15000, category: 'Transport' },
        { day: 'Rabu', amount: 30000, category: 'Makanan' },
        { day: 'Kamis', amount: 20000, category: 'Alat Tulis' },
        { day: 'Jumat', amount: 35000, category: 'Makanan' },
        { day: 'Sabtu', amount: 50000, category: 'Hiburan' },
        { day: 'Minggu', amount: 40000, category: 'Transport' }
    ],

    // Sample student grades data
    studentGradesData: [85, 78, 92, 76, 88, 95, 82, 90, 73, 87, 91, 84, 89, 77, 93],

    // Sample quiz questions and answers
    quizData: {
        grade10: {
            q1: {
                question: "Manakah dari berikut ini yang termasuk data kuantitatif?",
                options: [
                    { value: 'a', text: 'Warna rambut' },
                    { value: 'b', text: 'Tinggi badan (cm)' },
                    { value: 'c', text: 'Nama siswa' },
                    { value: 'd', text: 'Hobi' }
                ],
                correct: 'b',
                explanation: 'Tinggi badan (cm) adalah data kuantitatif karena berupa angka yang dapat diukur dan dihitung.'
            },
            q2: {
                question: "Apa yang dimaksud dengan data kualitatif?",
                options: [
                    { value: 'a', text: 'Data berupa angka' },
                    { value: 'b', text: 'Data yang dapat diukur' },
                    { value: 'c', text: 'Data berupa kategori atau kualitas' },
                    { value: 'd', text: 'Data yang selalu berubah' }
                ],
                correct: 'c',
                explanation: 'Data kualitatif adalah data yang berupa kategori, kualitas, atau karakteristik yang tidak dapat diukur dengan angka.'
            }
        },
        grade11: {
            q1: {
                question: "Data nilai ujian: 70, 80, 75, 80, 85, 80, 90. Berapakah modus dari data tersebut?",
                options: [
                    { value: 'a', text: '75' },
                    { value: 'b', text: '80' },
                    { value: 'c', text: '85' },
                    { value: 'd', text: '90' }
                ],
                correct: 'b',
                explanation: 'Modus adalah nilai yang paling sering muncul. Dalam data ini, nilai 80 muncul 3 kali, lebih sering dari nilai lainnya.'
            },
            q2: {
                question: "Kapan sebaiknya menggunakan median daripada rata-rata?",
                options: [
                    { value: 'a', text: 'Ketika data terdistribusi normal' },
                    { value: 'b', text: 'Ketika ada nilai ekstrem (outlier)' },
                    { value: 'c', text: 'Ketika semua data sama' },
                    { value: 'd', text: 'Ketika jumlah data genap' }
                ],
                correct: 'b',
                explanation: 'Median lebih robust terhadap outlier dan memberikan gambaran yang lebih baik saat data memiliki nilai ekstrem.'
            }
        },
        grade12: {
            q1: {
                question: "Apa yang dimaksud dengan Big Data?",
                options: [
                    { value: 'a', text: 'Data yang berukuran lebih dari 1 GB' },
                    { value: 'b', text: 'Data dengan karakteristik Volume, Velocity, dan Variety' },
                    { value: 'c', text: 'Data yang disimpan di cloud' },
                    { value: 'd', text: 'Data yang hanya bisa diakses oleh admin' }
                ],
                correct: 'b',
                explanation: 'Big Data didefinisikan dengan 3V: Volume (besar), Velocity (cepat), dan Variety (beragam jenis).'
            },
            q2: {
                question: "Nilai korelasi -0.8 menunjukkan bahwa:",
                options: [
                    { value: 'a', text: 'Hubungan positif kuat' },
                    { value: 'b', text: 'Hubungan negatif kuat' },
                    { value: 'c', text: 'Tidak ada hubungan' },
                    { value: 'd', text: 'Hubungan lemah' }
                ],
                correct: 'b',
                explanation: 'Nilai korelasi -0.8 menunjukkan hubungan negatif yang kuat (mendekati -1).'
            }
        }
    },

    // Drag and drop items
    dragDropItems: {
        items: [
            { text: 'Umur (tahun)', type: 'kuantitatif' },
            { text: 'Jenis Kelamin', type: 'kualitatif' },
            { text: 'Berat Badan (kg)', type: 'kuantitatif' },
            { text: 'Mata Pelajaran Favorit', type: 'kualitatif' },
            { text: 'Nilai Matematika', type: 'kuantitatif' },
            { text: 'Warna Kesukaan', type: 'kualitatif' },
            { text: 'Tinggi Badan (cm)', type: 'kuantitatif' },
            { text: 'Agama', type: 'kualitatif' }
        ]
    },

    // Learning content for each grade
    learningContent: {
        grade10: {
            title: "Pengantar Data dan Informasi",
            modules: [
                {
                    title: "Konsep Dasar Data",
                    content: `
                        <h5>Apa itu Data?</h5>
                        <p>Data adalah sekumpulan fakta, angka, atau informasi mentah yang dikumpulkan untuk tujuan tertentu. Data dapat berupa:</p>
                        <ul>
                            <li>Angka (contoh: 25, 100, 3.14)</li>
                            <li>Teks (contoh: nama, alamat, deskripsi)</li>
                            <li>Gambar, suara, atau video</li>
                            <li>Tanggal dan waktu</li>
                        </ul>
                        
                        <h5>Data vs Informasi</h5>
                        <p><strong>Data:</strong> Fakta mentah yang belum diproses</p>
                        <p><strong>Informasi:</strong> Data yang sudah diproses dan memiliki makna</p>
                        
                        <div class="example-box">
                            <h6>Contoh:</h6>
                            <p><strong>Data:</strong> 85, 90, 78, 92, 88</p>
                            <p><strong>Informasi:</strong> "Rata-rata nilai kelas adalah 86.6, menunjukkan prestasi baik"</p>
                        </div>
                    `
                },
                {
                    title: "Jenis-jenis Data",
                    content: `
                        <h5>Data Kuantitatif</h5>
                        <p>Data yang berupa angka dan dapat diukur secara numerik.</p>
                        <ul>
                            <li><strong>Diskrit:</strong> Bilangan bulat (jumlah siswa, jumlah mobil)</li>
                            <li><strong>Kontinu:</strong> Dapat berupa desimal (tinggi, berat, suhu)</li>
                        </ul>
                        
                        <h5>Data Kualitatif</h5>
                        <p>Data yang berupa kategori atau kualitas, tidak dapat diukur dengan angka.</p>
                        <ul>
                            <li><strong>Nominal:</strong> Kategori tanpa urutan (warna, jenis kelamin)</li>
                            <li><strong>Ordinal:</strong> Kategori dengan urutan (tingkat kepuasan, grade)</li>
                        </ul>
                    `
                }
            ]
        },
        grade11: {
            title: "Statistik Dasar dan Analisis",
            modules: [
                {
                    title: "Ukuran Pemusatan Data",
                    content: `
                        <h5>Mean (Rata-rata)</h5>
                        <p>Jumlah semua data dibagi dengan banyaknya data</p>
                        <p><strong>Rumus:</strong> x̄ = Σx / n</p>
                        
                        <h5>Median (Nilai Tengah)</h5>
                        <p>Nilai yang berada di tengah setelah data diurutkan</p>
                        <ul>
                            <li>Jika n ganjil: median = data ke-(n+1)/2</li>
                            <li>Jika n genap: median = (data ke-n/2 + data ke-(n/2+1))/2</li>
                        </ul>
                        
                        <h5>Modus (Nilai yang Sering Muncul)</h5>
                        <p>Nilai yang paling banyak muncul dalam dataset</p>
                        <ul>
                            <li>Unimodal: satu modus</li>
                            <li>Bimodal: dua modus</li>
                            <li>Multimodal: lebih dari dua modus</li>
                        </ul>
                    `
                },
                {
                    title: "Interpretasi Data",
                    content: `
                        <h5>Kapan Menggunakan Mean?</h5>
                        <p>Ketika data terdistribusi normal dan tidak ada outlier ekstrem</p>
                        
                        <h5>Kapan Menggunakan Median?</h5>
                        <p>Ketika ada outlier atau data tidak terdistribusi normal</p>
                        
                        <h5>Kapan Menggunakan Modus?</h5>
                        <p>Untuk data kategorikal atau ketika ingin mengetahui nilai yang paling umum</p>
                    `
                }
            ]
        },
        grade12: {
            title: "Big Data dan Analisis Lanjutan",
            modules: [
                {
                    title: "Konsep Big Data",
                    content: `
                        <h5>Karakteristik Big Data (3V)</h5>
                        <ul>
                            <li><strong>Volume:</strong> Ukuran data yang sangat besar</li>
                            <li><strong>Velocity:</strong> Kecepatan pemrosesan data</li>
                            <li><strong>Variety:</strong> Keragaman jenis data</li>
                        </ul>
                        
                        <h5>Tantangan Big Data</h5>
                        <ul>
                            <li>Penyimpanan yang membutuhkan infrastruktur besar</li>
                            <li>Pemrosesan yang memerlukan algoritma efisien</li>
                            <li>Analisis yang kompleks untuk menemukan pola</li>
                        </ul>
                    `
                },
                {
                    title: "Korelasi dan Hubungan Antar Variabel",
                    content: `
                        <h5>Koefisien Korelasi Pearson</h5>
                        <p>Mengukur kekuatan hubungan linear antara dua variabel</p>
                        <p><strong>Rentang:</strong> -1 sampai +1</p>
                        
                        <h5>Interpretasi Korelasi</h5>
                        <ul>
                            <li><strong>r > 0.7:</strong> Korelasi kuat</li>
                            <li><strong>0.3 < r < 0.7:</strong> Korelasi sedang</li>
                            <li><strong>r < 0.3:</strong> Korelasi lemah</li>
                        </ul>
                        
                        <p><strong>Catatan:</strong> Korelasi tidak selalu menunjukkan sebab-akibat!</p>
                    `
                }
            ]
        }
    },

    // Sample big data for simulation
    bigDataSample: {
        categories: ['Elektronik', 'Fashion', 'Makanan', 'Buku', 'Olahraga', 'Kesehatan'],
        brands: ['BrandA', 'BrandB', 'BrandC', 'BrandD', 'BrandE'],
        
        generateProduct: function(id) {
            return {
                id: id,
                name: `Produk ${id}`,
                category: this.categories[Math.floor(Math.random() * this.categories.length)],
                brand: this.brands[Math.floor(Math.random() * this.brands.length)],
                price: Math.floor(Math.random() * 1000000) + 10000,
                rating: Math.round((Math.random() * 4 + 1) * 10) / 10,
                sales: Math.floor(Math.random() * 1000) + 1,
                reviews: Math.floor(Math.random() * 500) + 10,
                inStock: Math.random() > 0.1 // 90% chance in stock
            };
        }
    },

    // Reflection prompts for each grade
    reflectionPrompts: {
        grade10: [
            "Apa yang telah kalian pelajari tentang perbedaan data dan informasi?",
            "Bagaimana kalian akan menggunakan pengetahuan tentang jenis data dalam kehidupan sehari-hari?",
            "Mengapa penting untuk memahami cara merepresentasikan data dalam bentuk grafik?"
        ],
        grade11: [
            "Bagaimana statistik dasar membantu dalam memahami data?",
            "Dalam situasi apa kalian akan menggunakan mean, median, atau modus?",
            "Apa tantangan yang kalian hadapi saat menganalisis data studi kasus?"
        ],
        grade12: [
            "Bagaimana pengalaman kalian dalam menganalisis data besar?",
            "Apa yang kalian pelajari tentang hubungan antar variabel melalui analisis korelasi?",
            "Bagaimana skill analisis data ini akan membantu di masa depan?"
        ]
    },

    // Pedagogical content structure
    pedagogicalStructure: {
        apersepsi: {
            title: "🎯 Apersepsi",
            description: "Kegiatan pembuka untuk menghubungkan pengetahuan sebelumnya dengan materi baru",
            activities: [
                "Tanya jawab tentang pengalaman sehari-hari",
                "Observasi lingkungan sekitar",
                "Diskusi singkat tentang topik terkait"
            ]
        },
        pertanyaanPemantik: {
            title: "❓ Pertanyaan Pemantik",
            description: "Pertanyaan stimulus untuk memancing rasa ingin tahu dan berpikir kritis",
            purpose: "Merangsang curiosity dan critical thinking siswa"
        },
        materiPembelajaran: {
            title: "📚 Materi Pembelajaran",
            description: "Konten inti pembelajaran dengan elemen interaktif",
            components: [
                "Konsep dasar",
                "Contoh nyata",
                "Demo interaktif",
                "Studi kasus"
            ]
        },
        latihanInteraktif: {
            title: "🎮 Latihan Interaktif",
            description: "Aktivitas praktik dengan umpan balik instan",
            types: [
                "Kuis pilihan ganda",
                "Drag & drop",
                "Input dan analisis data",
                "Eksplorasi dataset"
            ]
        },
        refleksi: {
            title: "🤔 Refleksi",
            description: "Kegiatan perenungan dan penerapan pembelajaran",
            questions: [
                "Apa yang telah dipelajari?",
                "Bagaimana penerapannya?",
                "Apa yang masih ingin dipelajari?"
            ]
        }
    },

    // Assessment criteria
    assessmentCriteria: {
        understanding: {
            excellent: "Memahami konsep dengan sangat baik dan dapat menjelaskan kepada orang lain",
            good: "Memahami konsep dengan baik dan dapat memberikan contoh",
            satisfactory: "Memahami konsep dasar dengan bantuan",
            needsImprovement: "Masih membutuhkan bimbingan untuk memahami konsep"
        },
        application: {
            excellent: "Dapat menerapkan konsep dalam situasi baru dan kompleks",
            good: "Dapat menerapkan konsep dalam situasi yang sudah dipelajari",
            satisfactory: "Dapat menerapkan konsep dengan bantuan",
            needsImprovement: "Masih kesulitan dalam menerapkan konsep"
        },
        analysis: {
            excellent: "Dapat menganalisis data dengan tepat dan menarik kesimpulan yang valid",
            good: "Dapat menganalisis data dengan bantuan minimal",
            satisfactory: "Dapat menganalisis data sederhana",
            needsImprovement: "Masih kesulitan dalam menganalisis data"
        }
    },

    // Real-world applications
    realWorldApplications: {
        grade10: [
            "Survei preferensi makanan di kantin sekolah",
            "Analisis data kehadiran siswa",
            "Grafik perbandingan nilai antar mata pelajaran"
        ],
        grade11: [
            "Analisis pengeluaran bulanan keluarga",
            "Statistik prestasi olahraga sekolah",
            "Data penggunaan internet siswa"
        ],
        grade12: [
            "Analisis tren media sosial",
            "Data penjualan online marketplace",
            "Korelasi antara waktu belajar dan prestasi akademik"
        ]
    },

    // Vocabulary and glossary
    glossary: {
        "Data": "Sekumpulan fakta, angka, atau informasi mentah yang dikumpulkan untuk tujuan analisis",
        "Informasi": "Data yang telah diproses dan memiliki makna atau konteks",
        "Statistik": "Ilmu yang mempelajari cara mengumpulkan, menganalisis, dan menafsirkan data",
        "Mean": "Rata-rata dari sekumpulan data, dihitung dengan menjumlahkan semua nilai dan membagi dengan jumlah data",
        "Median": "Nilai tengah dari data yang telah diurutkan dari terkecil ke terbesar",
        "Modus": "Nilai yang paling sering muncul dalam sekumpulan data",
        "Korelasi": "Ukuran hubungan atau keterkaitan antara dua variabel",
        "Big Data": "Dataset yang sangat besar dan kompleks yang memerlukan tools khusus untuk diproses",
        "Outlier": "Nilai data yang sangat berbeda dari nilai-nilai lainnya dalam dataset",
        "Visualisasi Data": "Representasi grafis dari data untuk memudahkan pemahaman dan analisis"
    },

    // Tips for teachers
    teacherTips: {
        preparation: [
            "Siapkan contoh data dari kehidupan sehari-hari siswa",
            "Pastikan semua perangkat dan koneksi internet berfungsi",
            "Siapkan pertanyaan follow-up untuk diskusi mendalam"
        ],
        facilitation: [
            "Beri waktu cukup untuk siswa mengeksplorasi tools interaktif",
            "Dorong siswa untuk berkolaborasi dalam menganalisis data",
            "Gunakan pertanyaan terbuka untuk memancing pemikiran kritis"
        ],
        assessment: [
            "Gunakan rubrik yang jelas untuk menilai pemahaman konsep",
            "Berikan feedback konstruktif untuk setiap aktivitas",
            "Dokumentasikan progress siswa untuk evaluasi berkelanjutan"
        ]
    },

    // Common errors and misconceptions
    commonErrors: {
        grade10: [
            "Mengira semua angka adalah data kuantitatif (nomor telepon adalah kualitatif)",
            "Tidak memahami perbedaan antara data dan informasi",
            "Salah memilih jenis grafik untuk jenis data tertentu"
        ],
        grade11: [
            "Selalu menggunakan mean tanpa mempertimbangkan outlier",
            "Mengira median selalu berada di tengah posisi data",
            "Tidak memahami kapan menggunakan masing-masing ukuran pemusatan"
        ],
        grade12: [
            "Mengira korelasi selalu menunjukkan sebab-akibat",
            "Tidak memahami batasan analisis korelasi",
            "Mengabaikan konteks saat menginterpretasi hasil analisis"
        ]
    }
};

// Helper functions for data manipulation
const dataHelpers = {
    // Generate random data for exercises
    generateRandomData: function(type, count) {
        const data = [];
        for (let i = 0; i < count; i++) {
            switch(type) {
                case 'grades':
                    data.push(Math.floor(Math.random() * 41) + 60); // 60-100
                    break;
                case 'ages':
                    data.push(Math.floor(Math.random() * 5) + 15); // 15-19
                    break;
                case 'heights':
                    data.push(Math.floor(Math.random() * 40) + 150); // 150-189
                    break;
                default:
                    data.push(Math.floor(Math.random() * 100));
            }
        }
        return data;
    },

    // Format data for display
    formatData: function(data, type) {
        switch(type) {
            case 'currency':
                return data.map(d => `Rp ${d.toLocaleString('id-ID')}`);
            case 'percentage':
                return data.map(d => `${d}%`);
            case 'decimal':
                return data.map(d => d.toFixed(2));
            default:
                return data;
        }
    },

    // Calculate basic statistics
    calculateStats: function(data) {
        const sorted = [...data].sort((a, b) => a - b);
        const n = data.length;
        const sum = data.reduce((acc, val) => acc + val, 0);
        
        return {
            count: n,
            sum: sum,
            mean: sum / n,
            median: n % 2 === 0 
                ? (sorted[n/2 - 1] + sorted[n/2]) / 2 
                : sorted[Math.floor(n/2)],
            min: Math.min(...data),
            max: Math.max(...data),
            range: Math.max(...data) - Math.min(...data)
        };
    },

    // Find mode in dataset
    findMode: function(data) {
        const frequency = {};
        let maxFreq = 0;
        
        data.forEach(val => {
            frequency[val] = (frequency[val] || 0) + 1;
            maxFreq = Math.max(maxFreq, frequency[val]);
        });
        
        const modes = Object.keys(frequency)
            .filter(key => frequency[key] === maxFreq)
            .map(key => parseFloat(key));
            
        return {
            modes: modes,
            frequency: maxFreq,
            isUnimodal: modes.length === 1,
            hasMode: maxFreq > 1
        };
    },

    // Validate user input
    validateInput: function(input, type) {
        switch(type) {
            case 'numbers':
                return /^[\d\s,.-]+$/.test(input.trim());
            case 'text':
                return input.trim().length > 0;
            case 'email':
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.trim());
            default:
                return true;
        }
    },

    // Clean and parse user input
    parseInput: function(input, type) {
        switch(type) {
            case 'numbers':
                return input.split(',')
                    .map(item => parseFloat(item.trim()))
                    .filter(num => !isNaN(num));
            case 'text':
                return input.split(',').map(item => item.trim()).filter(item => item.length > 0);
            default:
                return input.trim();
        }
    }
};

// Export data for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { sampleData, dataHelpers };
}
