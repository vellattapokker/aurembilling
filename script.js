function addItem() {
    const tbody = document.getElementById('itemsBody');
    const tr = document.createElement('tr');
    tr.innerHTML = `
        <td><input type="text" class="item-desc" placeholder="e.g. Wedding Day" oninput="updatePreview()"></td>
        <td><textarea class="item-details" placeholder="e.g. 1 Photographer, 1 Videographer" oninput="updatePreview()" rows="2" style="width: 100%; min-height: 40px; resize: vertical;"></textarea></td>
        <td><button class="btn btn-outline" onclick="removeItem(this)">×</button></td>
    `;
    tbody.appendChild(tr);
    updatePreview();
}

function quickAddItem(name, details) {
    const tbody = document.getElementById('itemsBody');
    
    // Check if there's an existing empty row to fill
    const rows = tbody.querySelectorAll('tr');
    for (const row of rows) {
        const descInput = row.querySelector('.item-desc');
        const detailsInput = row.querySelector('.item-details');
        if (descInput && !descInput.value.trim()) {
            descInput.value = name;
            detailsInput.value = details;
            updatePreview();
            return;
        }
    }
    
    // No empty row found, create a new one
    const tr = document.createElement('tr');
    tr.innerHTML = `
        <td><input type="text" class="item-desc" value="${name}" oninput="updatePreview()"></td>
        <td><textarea class="item-details" oninput="updatePreview()" rows="2" style="width: 100%; min-height: 40px; resize: vertical;">${details}</textarea></td>
        <td><button class="btn btn-outline" onclick="removeItem(this)">×</button></td>
    `;
    tbody.appendChild(tr);
    updatePreview();
}

function removeItem(btn) {
    const row = btn.parentNode.parentNode;
    if (document.querySelectorAll('#itemsBody tr').length > 1) {
        row.parentNode.removeChild(row);
        updatePreview();
    }
}

function updatePreview() {
    // Basic Info
    const clientName = document.getElementById('clientName').value || 'Anjali';
    const packageName = document.getElementById('packageName').value || 'Wedding Day Coverage (Single Side)';
    const rawDate = document.getElementById('weddingDate').value || new Date().toISOString().split('T')[0];
    const [year, month, day] = rawDate.split('-');
    const weddingDate = `${day}-${month}-${year}`;
    const caption = document.getElementById('caption').value || 'directed by emotion';
    const description = document.getElementById('description').value || 'We are delighted to be part of your journey. At Aurem Weddings, we don\'t just take photos; we capture the memories that define your most beautiful moments. Our team is dedicated to preserving the raw emotions and the unique story of your special day with a cinematic touch. Since our inception, we have distinguished ourselves as a prominent face in the innovative wedding photography field, providing result-oriented services to worldwide clients. We believe every couple has a unique narrative, and our goal is to translate that narrative into a visual masterpiece that you will cherish for a lifetime. We are honored to be considered for such a significant role in your celebration and look forward to capturing your beautiful memories.';
    const scopeOfWork = document.getElementById('scopeOfWork').value || 'Our scope of work encompasses a comprehensive coverage of your wedding festivities, specializing in cinematic storytelling and artistic portraiture. We utilize state-of-the-art equipment and a tailored editing process to deliver a final product as unique as your love story.\n\nKey Services include: High-End 4K Production, Artistic Post-Production, and Premium Wedding Albums. We ensure a seamless and stress-free experience from the initial meeting to final delivery.';
    const totalCost = document.getElementById('totalCost').value || '0';

    document.getElementById('preview-client-name').innerText = clientName;
    document.getElementById('preview-client-footer').innerText = clientName;
    document.getElementById('preview-date-footer').innerText = weddingDate;
    document.getElementById('preview-package-name').innerText = packageName;
    document.getElementById('preview-caption').innerText = caption;
    document.getElementById('preview-description').innerText = description;
    document.getElementById('preview-scope').innerText = scopeOfWork;
    document.getElementById('preview-total').innerText = totalCost;

    // Items Table
    const itemRows = document.querySelectorAll('#itemsBody tr');
    const previewItemsBody = document.getElementById('preview-items-body');
    previewItemsBody.innerHTML = '';
    
    itemRows.forEach(row => {
        const desc = row.querySelector('.item-desc').value;
        const details = row.querySelector('.item-details').value;

        if (desc || details) {
            const tr = document.createElement('tr');
            // Handle line breaks in details
            const formattedDetails = details ? details.replace(/\n/g, '<br>') : '-';
            // Prepend bullet to description if not present
            const formattedDesc = desc ? (desc.startsWith('•') ? desc : '• ' + desc) : '-';
            tr.innerHTML = `
                <td>${formattedDesc}</td>
                <td>${formattedDetails}</td>
            `;
            previewItemsBody.appendChild(tr);
        }
    });

    // Deliverables List - read from toggle buttons
    const deliverablesList = document.getElementById('preview-deliverables');
    const deliverablesContainer = document.getElementById('container-deliverables');
    const activeDeliverables = document.querySelectorAll('#deliverables-bar .toggle-btn.active');
    
    deliverablesList.innerHTML = '';
    if (activeDeliverables.length > 0) {
        deliverablesContainer.style.display = 'block';
        activeDeliverables.forEach(btn => {
            const li = document.createElement('li');
            li.innerText = btn.getAttribute('data-value');
            deliverablesList.appendChild(li);
        });
    } else {
        deliverablesContainer.style.display = 'none';
    }

    // Addons List - read from toggle buttons
    const addonsList = document.getElementById('preview-addons');
    const addonsContainer = document.getElementById('container-addons');
    const activeAddons = document.querySelectorAll('#addons-bar .toggle-btn.active');
    
    addonsList.innerHTML = '';
    if (activeAddons.length > 0) {
        addonsContainer.style.display = 'block';
        activeAddons.forEach(btn => {
            const li = document.createElement('li');
            li.innerText = btn.getAttribute('data-value');
            addonsList.appendChild(li);
        });
    } else {
        addonsContainer.style.display = 'none';
    }
}

// Toggle selection for deliverables/addons buttons
function toggleSelection(btn) {
    btn.classList.toggle('active');
    updatePreview();
}

// Add custom deliverable
function addCustomDeliverable() {
    const input = document.getElementById('customDeliverable');
    const value = input.value.trim();
    if (!value) return;
    
    const bar = document.getElementById('deliverables-bar');
    const newBtn = document.createElement('button');
    newBtn.className = 'quick-add-btn toggle-btn active';
    newBtn.setAttribute('data-value', value);
    newBtn.setAttribute('onclick', 'toggleSelection(this)');
    newBtn.innerText = value.length > 20 ? value.substring(0, 20) + '...' : value;
    bar.appendChild(newBtn);
    input.value = '';
    updatePreview();
}

// Add custom addon
function addCustomAddon() {
    const input = document.getElementById('customAddon');
    const value = input.value.trim();
    if (!value) return;
    
    const bar = document.getElementById('addons-bar');
    const newBtn = document.createElement('button');
    newBtn.className = 'quick-add-btn toggle-btn active';
    newBtn.setAttribute('data-value', value);
    newBtn.setAttribute('onclick', 'toggleSelection(this)');
    newBtn.innerText = value.length > 20 ? value.substring(0, 20) + '...' : value;
    bar.appendChild(newBtn);
    input.value = '';
    updatePreview();
}

async function sendWhatsApp() {
    const btn = document.querySelector('.btn-accent');
    const originalText = btn.innerHTML;
    btn.innerHTML = 'Generating PDF... <span style="font-size: 10px;">(Please wait)</span>';
    btn.disabled = true;

    try {
        const clientName = document.getElementById('clientName').value || 'Anjali';
        const element = document.getElementById('preview-container');
        
        // Temporarily remove mobile scaling for high quality PDF capture
        const pages = document.querySelectorAll('.page');
        const originalStyles = [];
        pages.forEach(page => {
            originalStyles.push({
                transform: page.style.transform || '',
                marginBottom: page.style.marginBottom || ''
            });
            page.style.transform = 'none';
            page.style.marginBottom = '0';
        });

        // Temporarily adjust container gap to avoid extra blank spaces in PDF
        const originalGap = element.style.gap;
        element.style.gap = '0';

        const opt = {
            margin:       0,
            filename:     `Aurem_Quotation_${clientName}.pdf`,
            image:        { type: 'jpeg', quality: 0.98 },
            html2canvas:  { scale: 2, useCORS: true, scrollY: 0 },
            jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' },
            pagebreak:    { mode: ['css', 'legacy'], after: '.page' }
        };

        const pdfBlob = await html2pdf().set(opt).from(element).output('blob');
        
        // Restore mobile styles
        pages.forEach((page, index) => {
            page.style.transform = originalStyles[index].transform;
            page.style.marginBottom = originalStyles[index].marginBottom;
        });
        element.style.gap = originalGap;

        const file = new File([pdfBlob], opt.filename, { type: 'application/pdf' });

        // Check if Web Share API with files is supported (mostly mobile browsers)
        if (navigator.canShare && navigator.canShare({ files: [file] })) {
            await navigator.share({
                title: 'Aurem Weddings Quotation',
                text: `Hello ${clientName}, here is the quotation for your wedding photography.`,
                files: [file]
            });
        } else {
            // Fallback for Desktop: Download the PDF and open WhatsApp Web with a text message
            const url = URL.createObjectURL(pdfBlob);
            const a = document.createElement('a');
            a.href = url;
            a.download = opt.filename;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            
            const text = `Hello *${clientName}*,\n\nI have generated the quotation for your wedding photography. I am attaching the PDF document now!\n\nWarm regards,\n*AUREM WEDDINGS*`;
            const encodedText = encodeURIComponent(text);
            window.open(`https://wa.me/?text=${encodedText}`, '_blank');
            
            alert('Your PDF has been downloaded! Since you are on a desktop browser, please attach the downloaded PDF manually in the WhatsApp window that just opened.');
        }
    } catch (error) {
        console.error('Error generating PDF:', error);
        alert('Could not generate PDF. Please try again.');
    } finally {
        btn.innerHTML = originalText;
        btn.disabled = false;
    }
}

// Initialize with default preview
window.onload = updatePreview;
