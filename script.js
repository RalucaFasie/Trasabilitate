// === 1. DATELE LANTULUI BLOCKCHAIN ===

const blockData = {
  ferma: {
    tip: "FERMA",
    data: {
      producator: "Ferma Agro Prest 2005 SRL",
      judet: "Călărași",
      cultura: "Grâu panificație",
      lot: "2025-CA-GR-004",
      umiditate: "11.8%",
      pesticide: "Conform registru fitosanitar 2025",
      certificare: "APIA / MADR – Certificat lot 004",
    },
    previousHash: "0000000000000000", // primul block
    hash: ""
  },

  transport: {
    tip: "TRANSPORT & LOGISTICĂ",
    data: {
      operator: "TransAgro Călărași",
      camion: "CL-45-AGRO",
      tip: "Cereale vrac",
      greutate: "24.000 kg",
      data: "18.07.2025",
      destinatie: "Moara Călărași Nord",
      documente: "Aviz nr. 2245"
    },
    previousHash: "",
    hash: ""
  },

  moara: {
    tip: "MOARĂ / PROCESARE",
    data: {
      operator: "Moara Călărași Nord SA",
      lotProcesare: "MCN-2025-LOT-020",
      produs: "Făină albă tip 650",
      randament: "78%",
      umiditate: "14.2%",
      data: "19.07.2025",
      certificare: "ISO 22000 / HACCP"
    },
    previousHash: "",
    hash: ""
  },

  iot: {
    tip: "SENZORI IoT",
    data: {
      senzor: "IoT-SZ-8832",
      temperatura: "21.5°C",
      umiditate: "13.9%",
      infestare: "0%",
      data: "20.07.2025",
      operator: "Călărași Grain Monitoring System"
    },
    previousHash: "",
    hash: ""
  },

  magazin: {
    tip: "MAGAZIN",
    data: {
      magazin: "Profi Călărași – Central",
      produs: "Pâine albă 650",
      codProdus: "PRF-PAINE-650-2025",
      ambalare: "20.07.2025",
      expirare: "22.07.2025",
      pret: "5.20 lei",
      certificare: "Trasabilitate Blockchain Activă"
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

  // mergem în ordine: ferma → transport → moara → iot → magazin
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
  detailsContainer.innerHTML = "";

  for (const key in block.data) {
    const p = document.createElement("p");
    p.innerHTML = `<b>${capitalize(key)}:</b> ${block.data[key]}`;
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
