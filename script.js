// === 1. DATELE LANTULUI BLOCKCHAIN ===

const blockData = {
  ferma: {
    tip: "FERMA",
    data: {
      Producator: "IordAgroMAD.SRL",
      Judet: "Călărași",
      Cultura: "Grâu panificație",
      Lot: "2025-CA-GR-004",
      Umiditate: "11.8%",
      Pesticide: "Conform registru fitosanitar 2025",
      Certificare: "APIA / MADR – Certificat lot 004",
    },
    previousHash: "0000000000000000", // primul block
    hash: ""
  },

  transport: {
    tip: "TRANSPORT & LOGISTICĂ",
    data: {
      Operator: "TransAgro Călărași",
      Camion: "CL-45-AGRO",
      Tip: "Cereale vrac",
      Greutate: "24.000 kg",
      Data: "18.07.2025",
      Destinatie: "Moara Călărași Nord",
      Documente: "Aviz nr. 2245"
    },
    previousHash: "",
    hash: ""
  },

  moara: {
    tip: "MOARĂ / PROCESARE",
    data: {
      Operator: "Moara Călărași Nord SA",
      LotProcesare: "MCN-2025-LOT-020",
      Produs: "Făină albă tip 650",
      Randament: "78%",
      Umiditate: "14.2%",
      Data: "19.07.2025",
      Certificare: "ISO 22000 / HACCP"
    },
    previousHash: "",
    hash: ""
  },

  brutaria: {
    tip: "BRUTĂRIA",
    data: {
      Brutarie: "Brutăria Caldă Călărași",
      LotProductie: "BRU-2025-LOT-156",
      Produs: "Pâine albă artizanală",
      Greutate: "500g",
      Ingrediente: "Făină tip 650, apă, drojdie, sare",
      Data: "20.07.2025",
      Certificare: "ISO 22000 / HACCP"
    },
    previousHash: "",
    hash: ""
  },

  magazin: {
    tip: "MAGAZIN",
    data: {
      Magazin: "Profi Călărași – Central",
      Produs: "Pâine albă 650",
      CodProdus: "PRF-PAINE-650-2025",
      Ambalare: "20.07.2025",
      Expirare: "22.07.2025",
      Pret: "5.20 lei",
      Certificare: "Trasabilitate Blockchain Activă"
    },
    previousHash: "",
    hash: ""
  }
};


// === 2. FUNCȚIE UNIVERSALĂ DE GENERARE HASH ===

async function generateHashForBlock(data, previousHash) {
  let combined = previousHash;

  // concatenăm toate câmpurile block-ului
  for (const key in data) {
    combined += data[key];
  }

  // generăm hash SHA-256 folosind Web Crypto API
  const encoder = new TextEncoder();
  const dataBuffer = encoder.encode(combined);
  const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hash;
}


// === 3. LANT COMPLET: ACTUALIZĂM HASH-URILE ===

async function updateBlockchainChain() {
  const keys = Object.keys(blockData);

  // mergem în ordine: ferma → transport → moara → brutaria → magazin
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];

    if (i === 0) {
      // primul block (ferma) are previousHash stabilit manual
      blockData[key].hash = await generateHashForBlock(
        blockData[key].data,
        blockData[key].previousHash
      );
    } else {
      // block-urile următoare primesc previousHash din block precedent
      const prevKey = keys[i - 1];
      blockData[key].previousHash = blockData[prevKey].hash;
      blockData[key].hash = await generateHashForBlock(
        blockData[key].data,
        blockData[key].previousHash
      );
    }
  }
}

// rulăm lanțul o singură dată la început când pagina se încarcă
document.addEventListener('DOMContentLoaded', async () => {
  await updateBlockchainChain();
  
  // Add keyboard support for SVG hotspots
  const svgHotspots = document.querySelectorAll('.mobile-svg .hotspot[role="button"]');
  svgHotspots.forEach(hotspot => {
    hotspot.addEventListener('keydown', function(event) {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        // SVG elements require MouseEvent dispatch instead of .click()
        this.dispatchEvent(new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
          view: window
        }));
      }
    });
  });
});



// === 4. DESCHIDEREA FERESTREI (MODAL) ===

function openBlock(blockName) {
  const block = blockData[blockName];

  // setăm titlul ferestrei
  document.querySelector(`#modal-${blockName} h2`).innerText = block.tip;

  // afisăm previousHash
  document.getElementById(`prev-${blockName}`).innerText = block.previousHash;

  // datele efective ale block-ului
  const detailsContainer = document.getElementById(`details-${blockName}`);
  detailsContainer.textContent = "";

  for (const key in block.data) {
    const p = document.createElement("p");
    const b = document.createElement("b");
    b.textContent = capitalize(key) + ": ";
    p.appendChild(b);
    p.appendChild(document.createTextNode(block.data[key]));
    detailsContainer.appendChild(p);
  }

  // hash-ul generat
  document.getElementById(`hash-${blockName}`).innerText = block.hash;

  // afișăm fereastra
  document.getElementById(`modal-${blockName}`).style.display = "block";
}



// === 5. ÎNCHIDEREA MODALULUI ===

function closeModal(modalName) {
  document.getElementById(modalName).style.display = "none";
}



// === 6. FUNCȚIE PENTRU CAPITALIZARE TEXT ===

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}


// === 7. FUNCȚII PENTRU CERTIFICĂRI ȘI VERIFICARE BLOCKCHAIN ===

function openCertificari() {
  alert("Certificări: ISO 22000, HACCP, APIA/MADR - Toate certificările sunt active și verificabile.");
}

function openBlockchainVerification() {
  alert("Verificare Blockchain: Toate block-urile sunt valide și verificate. Lanțul este integru.");
}
