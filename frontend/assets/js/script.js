// Function to fetch and update the domain list
function updateDomainList() {
    // Send an AJAX request to your backend (api.php)
    fetch('../backend/class-api.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: 'action=getDomainAccounts' // Adjust based on your backend
    })
    .then(response => response.json())
    .then(data => {
        const domainList = document.getElementById('domainAccountList');
        domainList.innerHTML = ''; // Clear existing list

        if (data.length > 0) {
            data.forEach(domain => {
                let status = domain.active ? 'Aktiv' : 'Inaktiv';
                let status_color = domain.active ? 'bg-green-500' : 'bg-red-500';

                domainList.innerHTML += `
                    <div class="flex justify-between hover:bg-gray-100 mt-2">
                        <div class="flex flex-col">
                            <span class="font-medium">${domain.name}</span>
                            <span class="text-sm text-gray-500">${domain.created}</span>
                        </div>
                        <div class="flex justify-center items-center">
                            <div class="${status_color} p-0.5 px-2 rounded-md">
                                <span class="text-white text-sm">${status}</span>
                            </div>
                        </div>
                    </div>
                `;
            });
        } else {
            domainList.innerHTML = '<div>Keine Domain-Accounts gefunden</div>';
        }
    })
    .catch(error => {
        console.error('Error fetching domain list:', error);
    });
}

// Initial list population on page load
updateDomainList();