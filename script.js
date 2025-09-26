   // Page Navigation
        document.addEventListener('DOMContentLoaded', function() {
            const menuItems = document.querySelectorAll('.menu-item');
            const pages = document.querySelectorAll('.page');
            const sidebar = document.getElementById('sidebar');
            const menuToggle = document.getElementById('menuToggle');
            
            // Menu item selection
            menuItems.forEach(item => {
                item.addEventListener('click', function() {
                    const pageId = this.getAttribute('data-page');
                    
                    // Update active menu item
                    menuItems.forEach(i => i.classList.remove('active'));
                    this.classList.add('active');
                    
                    // Show corresponding page
                    pages.forEach(page => {
                        page.classList.remove('active');
                        if (page.id === pageId) {
                            page.classList.add('active');
                        }
                    });
                    
                    // Close sidebar on mobile after selection
                    if (window.innerWidth <= 768) {
                        sidebar.classList.remove('active');
                    }
                });
            });
            
            // Mobile menu toggle
            menuToggle.addEventListener('click', function() {
                sidebar.classList.toggle('active');
            });
            
            // Close sidebar when clicking outside on mobile
            document.addEventListener('click', function(event) {
                if (window.innerWidth <= 768 && 
                    !sidebar.contains(event.target) && 
                    !menuToggle.contains(event.target)) {
                    sidebar.classList.remove('active');
                }
            });
            
            // Status update simulation
            const statusButtons = document.querySelectorAll('.action-edit');
            statusButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const row = this.closest('tr');
                    const statusCell = row.querySelector('.status');
                    
                    if (statusCell.classList.contains('status-new')) {
                        statusCell.textContent = 'In Progress';
                        statusCell.className = 'status status-in-progress';
                    } else if (statusCell.classList.contains('status-in-progress')) {
                        statusCell.textContent = 'Resolved';
                        statusCell.className = 'status status-resolved';
                    }
                });
            });
        });


           // Worker Management JavaScript
    document.addEventListener('DOMContentLoaded', function() {
        const workerCardsContainer = document.getElementById('workerCardsContainer');
        const workersTable = document.getElementById('workersTable');
        const tableViewBtn = document.getElementById('tableViewBtn');
        const cardViewBtn = document.getElementById('cardViewBtn');
        const workerCards = document.querySelector('.worker-cards');
        
        // Sample worker data
        const workers = [
            {
                id: "EMP-2021-045",
                name: "Michael Brown",
                department: "Road Repair",
                specialization: "Asphalt Specialist",
                email: "michael.b@city.gov",
                phone: "+1 (555) 123-4567",
                status: "Active",
                tasks: 3,
                avatar: "https://ui-avatars.com/api/?name=Michael+Brown&background=3498db&color=fff"
            },
            {
                id: "EMP-2022-128",
                name: "Jessica Wilson",
                department: "Sanitation",
                specialization: "Waste Management",
                email: "jessica.w@city.gov",
                phone: "+1 (555) 234-5678",
                status: "On Leave",
                tasks: 0,
                avatar: "https://ui-avatars.com/api/?name=Jessica+Wilson&background=2ecc71&color=fff"
            },
            {
                id: "EMP-2020-087",
                name: "Robert Taylor",
                department: "Utilities",
                specialization: "Electrical Systems",
                email: "robert.t@city.gov",
                phone: "+1 (555) 345-6789",
                status: "Active",
                tasks: 2,
                avatar: "https://ui-avatars.com/api/?name=Robert+Taylor&background=e74c3c&color=fff"
            },
            {
                id: "EMP-2023-012",
                name: "Amanda Lee",
                department: "Public Safety",
                specialization: "Traffic Control",
                email: "amanda.l@city.gov",
                phone: "+1 (555) 456-7890",
                status: "Training",
                tasks: 1,
                avatar: "https://ui-avatars.com/api/?name=Amanda+Lee&background=9b59b6&color=fff"
            }
        ];
        
        // Generate worker cards
        function generateWorkerCards() {
            workerCardsContainer.innerHTML = '';
            
            workers.forEach(worker => {
                const card = document.createElement('div');
                card.className = 'worker-card';
                
                // Determine status class
                let statusClass = 'status-resolved';
                if (worker.status === 'On Leave') statusClass = 'status-in-progress';
                if (worker.status === 'Training') statusClass = 'status-new';
                
                card.innerHTML = `
                    <div class="worker-card-header">
                        <img src="${worker.avatar}" class="worker-avatar" alt="${worker.name}">
                        <div>
                            <div class="worker-name">${worker.name}</div>
                            <div class="worker-id">${worker.id}</div>
                        </div>
                    </div>
                    <div class="worker-details">
                        <div class="worker-detail">
                            <span class="worker-detail-label">Department:</span>
                            <span class="worker-detail-value">${worker.department}</span>
                        </div>
                        <div class="worker-detail">
                            <span class="worker-detail-label">Specialization:</span>
                            <span class="worker-detail-value">${worker.specialization}</span>
                        </div>
                        <div class="worker-detail">
                            <span class="worker-detail-label">Contact:</span>
                            <span class="worker-detail-value">${worker.email}</span>
                        </div>
                        <div class="worker-detail">
                            <span class="worker-detail-label">Current Tasks:</span>
                            <span class="worker-detail-value">${worker.tasks}</span>
                        </div>
                    </div>
                    <div class="worker-actions">
                        <span class="worker-status status ${statusClass}">${worker.status}</span>
                        <div>
                            <button class="action-btn action-view"><i class="fas fa-eye"></i></button>
                            <button class="action-btn action-edit"><i class="fas fa-edit"></i></button>
                            <button class="action-btn action-delete"><i class="fas fa-trash"></i></button>
                        </div>
                    </div>
                `;
                
                workerCardsContainer.appendChild(card);
            });
        }
        
        // View toggle functionality
        tableViewBtn.addEventListener('click', function() {
            tableViewBtn.classList.add('active');
            cardViewBtn.classList.remove('active');
            workersTable.style.display = 'table';
            workerCards.style.display = 'none';
        });
        
        cardViewBtn.addEventListener('click', function() {
            cardViewBtn.classList.add('active');
            tableViewBtn.classList.remove('active');
            workersTable.style.display = 'none';
            workerCards.style.display = 'grid';
            generateWorkerCards();
        });
        
        // Filter functionality
        const departmentFilter = document.getElementById('departmentFilter');
        const statusFilter = document.getElementById('statusFilter');
        const searchWorker = document.getElementById('searchWorker');
        
        function filterWorkers() {
            const departmentValue = departmentFilter.value;
            const statusValue = statusFilter.value;
            const searchValue = searchWorker.value.toLowerCase();
            
            const rows = workersTable.querySelectorAll('tbody tr');
            const cards = workerCardsContainer.querySelectorAll('.worker-card');
            
            rows.forEach(row => {
                const department = row.cells[2].textContent;
                const status = row.cells[5].querySelector('.status').textContent;
                const name = row.cells[0].textContent.toLowerCase();
                
                const departmentMatch = !departmentValue || department === departmentValue;
                const statusMatch = !statusValue || status === statusValue;
                const searchMatch = !searchValue || name.includes(searchValue);
                
                row.style.display = departmentMatch && statusMatch && searchMatch ? '' : 'none';
            });
            
            cards.forEach(card => {
                const name = card.querySelector('.worker-name').textContent.toLowerCase();
                const department = card.querySelector('.worker-detail-value').textContent;
                const status = card.querySelector('.worker-status').textContent;
                
                const departmentMatch = !departmentValue || department === departmentValue;
                const statusMatch = !statusValue || status === statusValue;
                const searchMatch = !searchValue || name.includes(searchValue);
                
                card.style.display = departmentMatch && statusMatch && searchMatch ? '' : 'none';
            });
        }
        
        departmentFilter.addEventListener('change', filterWorkers);
        statusFilter.addEventListener('change', filterWorkers);
        searchWorker.addEventListener('input', filterWorkers);
        
        // Add worker button functionality
        const addWorkerBtn = document.getElementById('addWorkerBtn');
        addWorkerBtn.addEventListener('click', function() {
            alert('Add Worker functionality would open a modal form here.');
            // In a real implementation, this would open a modal with a form to add a new worker
        });
        
        // Initialize the page with table view
        tableViewBtn.click();
    });