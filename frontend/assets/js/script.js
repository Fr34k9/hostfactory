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
            domainList.innerHTML = '<div class="mb-6">Keine Domain-Accounts gefunden</div>';
        }
    })
    .catch(error => {
        console.error('Error fetching domain list:', error);
    });
}

// Event listener for form submission
document.getElementById('domainAccountForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // disable submit button
    const submitButton = document.getElementById('createDomainAccount');
    submitButton.disabled = true;

    const formData = new FormData(this);
    formData.append('action', 'createDomainAccount'); // Add action to form data

    // Send form data to backend
    fetch('../backend/class-api.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        // Update modal with response
        document.getElementById('result').classList.remove('text-green-500', 'text-red-500');
        document.getElementById('result').classList.add(data.error ? 'text-red-500' : 'text-green-500');

        if(data.error) {
            document.getElementById('result').textContent = data.error;
            submitButton.disabled = false;
            return;
        }

        document.getElementById('result').textContent = data.success;
        
        updateDomainList();
        submitButton.disabled = false;
    })
    .catch(error => {
        console.log(error);
        document.getElementById('result').classList.remove('text-green-500', 'text-red-500');
        document.getElementById('result').classList.add('text-red-500');
        document.getElementById('result').textContent = 'Ein Fehler ist aufgetreten';
        submitButton.disabled = false;
    });
});

// Event listener for modal open
document.getElementById('createAccount').addEventListener('click', function() {
    document.getElementById('modal').classList.remove('hidden');
});

// Close modal on ESC key press
document.onkeydown = function(event) {
    if (event.key === 'Escape') {
        document.getElementById('modal').classList.add('hidden');
    }    
};

// Close modal when clicking outside of it
document.getElementById('modal').addEventListener('click', function(event) {
    if (event.target.id === 'modal') {
        document.getElementById('modal').classList.add('hidden');
    }
});

// Initial list population on page load
updateDomainList();