        // Therapist Data - Moved from HTML to JavaScript
        const therapistsData = [
            {
                id: 1,
                name: "Dr. Ama Yankson",
                title: "PhD, Clinical Psychologist",
                specialties: ["Anxiety", "Depression", "CBT"],
                location: "Tema",
                online: true,
                description: "Specializes in cognitive behavioral therapy for adults dealing with anxiety and mood disorders.",
                image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
            },
            {
                id: 2,
                name: "Alex Nyamekye",
                title: "LCSW, Licensed Therapist",
                specialties: ["Trauma", "PTSD", "EMDR"],
                location: "Obuasi",
                online: true,
                description: "Specializes in trauma therapy using EMDR and somatic experiencing techniques.",
                image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
            },
            {
                id: 3,
                name: "Dr. Esther Cobbinah",
                title: "PsyD, Clinical Psychologist",
                specialties: ["LGBTQ+", "Relationships", "DBT"],
                location: "Tarkwa",
                online: true,
                description: "Specializes in working with LGBTQ+ individuals and couples using DBT and affirmative therapy.",
                image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
            },
            {
                id: 4,
                name: "Fiifi Christian",
                title: "LMFT, Marriage & Family Therapist",
                specialties: ["Relationships", "Family Therapy", "Couples"],
                location: "Techiman",
                online: true,
                description: "Specializes in couples counseling and family systems therapy.",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
            },
            {
                id: 5,
                name: "Dr.Yayra Afetogbor",
                title: "MD, Psychiatrist",
                specialties: ["Medication", "Depression", "Anxiety"],
                location: "Hohoe",
                online: true,
                description: "Board-certified psychiatrist specializing in medication management for mood disorders.",
                image: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
            },
            {
                id: 6,
                name: "Naa Shika Wayo",
                title: "LPC, Art Therapist",
                specialties: ["Children", "Teens", "Art Therapy"],
                location: "Online Only",
                online: false,
                description: "Specializes in creative arts therapy for children and adolescents.",
                image: "https://images.unsplash.com/photo-1542190891-2093d38760f2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
            },
            {
                id: 7,
                name: "Dr. Kwame Asante",
                title: "PhD, Neuropsychologist",
                specialties: ["ADHD", "Autism", "Cognitive Testing"],
                location: "Kumasi",
                online: true,
                description: "Specializes in neuropsychological assessments and cognitive rehabilitation.",
                image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
            },
            {
                id: 8,
                name: "Esi Mensah",
                title: "LCSW, Trauma Specialist",
                specialties: ["Trauma", "Domestic Violence", "Women's Issues"],
                location: "Accra",
                online: false,
                description: "Specializes in trauma-informed care for survivors of domestic violence.",
                image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
            },
            {
                id: 9,
                name: "Dr. Kofi Ansah",
                title: "MD, Child Psychiatrist",
                specialties: ["Child Psychiatry", "ADHD", "Autism"],
                location: "Cape Coast",
                online: true,
                description: "Specializes in child and adolescent psychiatry with medication management.",
                image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
            }
        ];

        // Pagination Settings
        const therapistsPerPage = 6;
        let currentPage = 1;

        // DOM Elements
        const therapistsContainer = document.getElementById('therapists-container');
        const paginationContainer = document.getElementById('pagination-container');

        // Mobile Menu Toggle with Hamburger Animation
        const mobileMenuBtn = document.querySelector('.mobile-menu');
        const navLinks = document.querySelector('.nav-links');
        
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuBtn.classList.toggle('active');
            navLinks.classList.toggle('active');
            
            // Prevent scrolling when menu is open
            if (navLinks.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
        
        // Close menu when clicking on a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuBtn.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Display Therapists Function
        function displayTherapists(therapists) {
            therapistsContainer.innerHTML = '';
            
            therapists.forEach(therapist => {
                const therapistCard = document.createElement('div');
                therapistCard.className = 'therapist-card';
                
                therapistCard.innerHTML = `
                    <div class="therapist-img" style="background-image: url('${therapist.image}');"></div>
                    <div class="therapist-info">
                        <h3 class="therapist-name">${therapist.name}</h3>
                        <p class="therapist-title">${therapist.title}</p>
                        
                        <div class="therapist-specialties">
                            ${therapist.specialties.map(specialty => `<span class="specialty-tag">${specialty}</span>`).join('')}
                        </div>
                        
                        <div class="therapist-meta">
                            <span class="meta-item"><i class="fas fa-map-marker-alt"></i> ${therapist.location}</span>
                            ${therapist.online ? '<span class="meta-item"><i class="fas fa-video"></i> Online</span>' : ''}
                        </div>
                        
                        <p>${therapist.description}</p>
                        
                        <a href="#" class="btn">View Profile</a>
                        <a href="#" class="btn btn-outline">Book Session</a>
                    </div>
                `;
                
                therapistsContainer.appendChild(therapistCard);
            });
        }

        // Setup Pagination
        function setupPagination(totalTherapists, therapistsPerPage) {
            const pageCount = Math.ceil(totalTherapists / therapistsPerPage);
            paginationContainer.innerHTML = '';
            
            // Previous button
            const prevButton = document.createElement('button');
            prevButton.className = 'page-btn';
            prevButton.innerHTML = '<i class="fas fa-chevron-left"></i>';
            prevButton.addEventListener('click', () => {
                if (currentPage > 1) {
                    currentPage--;
                    updateDisplay();
                }
            });
            paginationContainer.appendChild(prevButton);
            
            // Page number buttons
            for (let i = 1; i <= pageCount; i++) {
                const pageButton = document.createElement('button');
                pageButton.className = 'page-btn';
                if (i === currentPage) pageButton.classList.add('active');
                pageButton.textContent = i;
                pageButton.addEventListener('click', () => {
                    currentPage = i;
                    updateDisplay();
                });
                paginationContainer.appendChild(pageButton);
            }
            
            // Next button
            const nextButton = document.createElement('button');
            nextButton.className = 'page-btn';
            nextButton.innerHTML = '<i class="fas fa-chevron-right"></i>';
            nextButton.addEventListener('click', () => {
                if (currentPage < pageCount) {
                    currentPage++;
                    updateDisplay();
                }
            });
            paginationContainer.appendChild(nextButton);
        }

        // Update Display
        function updateDisplay() {
            // Calculate start and end index for current page
            const startIndex = (currentPage - 1) * therapistsPerPage;
            const endIndex = startIndex + therapistsPerPage;
            const paginatedTherapists = therapistsData.slice(startIndex, endIndex);
            
            // Display therapists for current page
            displayTherapists(paginatedTherapists);
            
            // Update pagination buttons active state
            const pageButtons = paginationContainer.querySelectorAll('.page-btn');
            pageButtons.forEach((button, index) => {
                if (index === currentPage) {
                    button.classList.add('active');
                } else {
                    button.classList.remove('active');
                }
            });
        }

        // Filter Therapists Function
        function filterTherapists() {
            const searchTerm = searchInput.value.toLowerCase();
            const specialtyValue = specialtyFilter.value;
            const locationValue = locationFilter.value;
            const therapyTypeValue = therapyTypeFilter.value;
            
            const filteredTherapists = therapistsData.filter(therapist => {
                const name = therapist.name.toLowerCase();
                const specialties = therapist.specialties.join(' ').toLowerCase();
                const location = therapist.location.toLowerCase();
                const description = therapist.description.toLowerCase();
                
                const matchesSearch = name.includes(searchTerm) || specialties.includes(searchTerm) || description.includes(searchTerm);
                const matchesSpecialty = !specialtyValue || specialties.includes(specialtyValue);
                const matchesLocation = !locationValue || location.includes(locationValue);
                const matchesTherapyType = !therapyTypeValue || specialties.includes(therapyTypeValue) || description.includes(therapyTypeValue);
                
                return matchesSearch && matchesSpecialty && matchesLocation && matchesTherapyType;
            });
            
            // Reset to page 1 when filtering
            currentPage = 1;
            
            // Update display with filtered therapists
            displayTherapists(filteredTherapists.slice(0, therapistsPerPage));
            setupPagination(filteredTherapists.length, therapistsPerPage);
        }

        // Initialize the page
        function init() {
            // Initial display
            updateDisplay();
            setupPagination(therapistsData.length, therapistsPerPage);
            
            // Search and filter elements
            const searchInput = document.querySelector('.search-input');
            const searchBtn = document.querySelector('.search-btn');
            const specialtyFilter = document.getElementById('specialty');
            const locationFilter = document.getElementById('location');
            const therapyTypeFilter = document.getElementById('therapy-type');
            const resetBtn = document.querySelector('.btn-outline');
            
            // Event listeners for search and filters
            searchBtn.addEventListener('click', filterTherapists);
            searchInput.addEventListener('keyup', (e) => {
                if (e.key === 'Enter') {
                    filterTherapists();
                }
            });
            
            specialtyFilter.addEventListener('change', filterTherapists);
            locationFilter.addEventListener('change', filterTherapists);
            therapyTypeFilter.addEventListener('change', filterTherapists);
            
            resetBtn.addEventListener('click', () => {
                searchInput.value = '';
                specialtyFilter.value = '';
                locationFilter.value = '';
                therapyTypeFilter.value = '';
                currentPage = 1;
                updateDisplay();
                setupPagination(therapistsData.length, therapistsPerPage);
            });
            
            // Highlight current page in navigation
            const currentPage = window.location.pathname.split('/').pop();
            document.querySelectorAll('.nav-links a').forEach(link => {
                if (link.getAttribute('href') === currentPage) {
                    link.classList.add('active');
                }
            });
        }

        // Initialize the page when loaded
        document.addEventListener('DOMContentLoaded', init);
