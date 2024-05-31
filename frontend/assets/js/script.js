// Function to fetch and update the domain list
function updateDomainList() {
    fetch('../backend/class-api.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: 'action=getDomainAccounts'
    })
    .then(response => response.json())
    .then(data => {
        const domainList = document.getElementById('domainAccountList');
        domainList.innerHTML = '';

        if (data.length > 0) {
            data.forEach(domain => {
                let status_color = domain.status.code < 1 ? 'bg-green-500' : 'bg-[#e30613]';

                domainList.innerHTML += `
                    <div class="flex justify-between hover:bg-gray-100 mt-2">
                        <div class="flex flex-col">
                            <span class="font-medium max-w-72 lg:max-w-sm break-words">${domain.name}</span>
                            <span class="text-sm text-gray-500">${domain.created}</span>
                        </div>
                        <div class="flex justify-center items-center">
                            <div class="${status_color} p-0.5 px-2 rounded-md">
                                <span class="text-white text-sm">${domain.status.text}</span>
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

    const submitButton = document.getElementById('createDomainAccount');
    submitButton.disabled = true;

    const loadingSpinner = document.getElementById('loadingResult');
    loadingSpinner.classList.remove('hidden');

    const resultElement = document.getElementById('result');
    resultElement.textContent = '';

    const formData = new FormData(this);
    formData.append('action', 'createDomainAccount');

    fetch('../backend/class-api.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        resultElement.classList.remove('text-green-500', 'text-[#e30613]');
        resultElement.classList.add(data.error ? 'text-[#e30613]' : 'text-green-500');

        if(data.error) {
            loadingSpinner.classList.add('hidden');
            resultElement.textContent = data.error;
            submitButton.disabled = false;
            return;
        }

        loadingSpinner.classList.add('hidden');
        resultElement.textContent = data.success;
        
        updateDomainList();
        submitButton.disabled = false;
    })
    .catch(error => {
        console.log(error);
        loadingSpinner.classList.add('hidden');
        resultElement.classList.remove('text-green-500', 'text-[#e30613]');
        resultElement.classList.add('text-[#e30613]');
        resultElement.textContent = 'Ein Fehler ist aufgetreten';
        submitButton.disabled = false;

        // Update domain list even if error, because somehow domain was
        updateDomainList();
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