// Blockchain structure
const blockchain = {
    ferma: {
        title: "Ferma",
        previousHash: "0000000000000000000000000000000000000000000000000000000000000000",
        data: "Date ferma - vor fi completate ulterior",
        currentHash: null
    },
    transport: {
        title: "Transport & Logistică",
        previousHash: null,
        data: "Date transport - vor fi completate ulterior",
        currentHash: null
    },
    moara: {
        title: "Moară / Procesare",
        previousHash: null,
        data: "Date procesare - vor fi completate ulterior",
        currentHash: null
    },
    senzori: {
        title: "Senzori IoT",
        previousHash: null,
        data: "Date senzori - vor fi completate ulterior",
        currentHash: null
    },
    magazin: {
        title: "Magazin",
        previousHash: null,
        data: "Date magazin - vor fi completate ulterior",
        currentHash: null
    }
};

// Chain order
const chainOrder = ["ferma", "transport", "moara", "senzori", "magazin"];

// SHA-256 hash function using Web Crypto API
async function generateHash(data) {
    const encoder = new TextEncoder();
    const dataBuffer = encoder.encode(data);
    const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}

// Initialize blockchain hashes
async function initializeBlockchain() {
    for (let i = 0; i < chainOrder.length; i++) {
        const stage = chainOrder[i];
        const block = blockchain[stage];
        
        // Set previous hash from previous block
        if (i > 0) {
            const previousStage = chainOrder[i - 1];
            block.previousHash = blockchain[previousStage].currentHash;
        }
        
        // Generate current hash
        const hashInput = block.previousHash + block.data;
        block.currentHash = await generateHash(hashInput);
    }
}

// Modal elements
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modal-title');
const previousHashDiv = document.getElementById('previous-hash');
const blockDataDiv = document.getElementById('block-data');
const currentHashDiv = document.getElementById('current-hash');
const closeBtn = document.querySelector('.close');

// Open modal with block information
function openModal(stage) {
    const block = blockchain[stage];
    
    modalTitle.textContent = block.title;
    previousHashDiv.textContent = block.previousHash;
    blockDataDiv.textContent = block.data;
    currentHashDiv.textContent = block.currentHash;
    
    modal.style.display = 'block';
}

// Close modal
function closeModal() {
    modal.style.display = 'none';
}

// Event listeners
document.addEventListener('DOMContentLoaded', async () => {
    // Initialize blockchain
    await initializeBlockchain();
    
    // Add click event to all stage buttons
    const stageButtons = document.querySelectorAll('.stage-button');
    stageButtons.forEach(button => {
        button.addEventListener('click', () => {
            const stage = button.getAttribute('data-stage');
            openModal(stage);
        });
    });
    
    // Close modal events
    closeBtn.addEventListener('click', closeModal);
    
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });
    
    // Close on ESC key
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });
});
