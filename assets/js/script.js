document.addEventListener('DOMContentLoaded', () => {
    // JavaScript code here
    console.log('DOM loaded');

    // Example of adding click event to an element
    const button = document.getElementById('toggleSidebar');
    if (button) {
        button.addEventListener('click', () => {
            const sidebar = document.getElementById('sidebarContent');
            if (sidebar) {
                sidebar.classList.toggle('collapsed');
            }
        });
    }
});
