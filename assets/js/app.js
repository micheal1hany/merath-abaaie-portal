/* ── Tab Navigation ─────────────────────────────────────────────────────── */
function showDay(dayNumber) {
    document.querySelectorAll('.day-section').forEach(function(section) {
        section.classList.remove('active');
    });
    document.querySelectorAll('.nav-button').forEach(function(button) {
        button.classList.remove('active');
    });

    document.getElementById('day' + dayNumber).classList.add('active');
    event.target.classList.add('active');
}

/* ── Dropdown Toggle ────────────────────────────────────────────────────── */
function toggleDropdown(dropdownId) {
    var content = document.getElementById(dropdownId + '-content');
    var arrow   = document.getElementById(dropdownId + '-arrow');
    content.classList.toggle('open');
    arrow.classList.toggle('open');
}

/* ── PDF Viewer Navigation ──────────────────────────────────────────────── */
function openPDF(pdfPath, title) {
    // Build absolute URL so PDF.js can fetch it from the viewer/ subfolder
    var base         = window.location.href.replace(/\/[^\/]*$/, '/');
    var absolutePath = base + pdfPath.replace(/^\.\//, '');
    var encodedPath  = encodeURIComponent(absolutePath);
    var encodedTitle = encodeURIComponent(title || 'عرض الملف');
    window.location.href = 'viewer/pdf-viewer.html?file=' + encodedPath + '&title=' + encodedTitle;
}

/* ── Hymn Navigation ────────────────────────────────────────────────────── */
function navigateToHymn(hymnId) {
    window.location.href = 'hymns/' + hymnId + '.html';
}
