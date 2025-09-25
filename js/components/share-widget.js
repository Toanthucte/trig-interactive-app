/**
 * Share Widget Component - Project V2
 * Author: NQQ
 * Created: 25/09/2025
 * 
 * A floating action button (FAB) that expands to show social sharing options.
 */

export const ShareWidget = {
    isInitialized: false,
    elements: {},
    
    init(container) {
        if (this.isInitialized) return;
        console.log('ShareWidget component initialized');
        this.render(container);
        this.cacheElements();
        this.addEventListeners();
        this.isInitialized = true;
    },

    render(container) {
        container.innerHTML = `
            <div class="share-fab-container">
                <div class="share-fab-menu">
                    <button class="share-fab-item" data-network="facebook">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.81C10.44 7.31 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96C18.34 21.21 22 17.06 22 12.06C22 6.53 17.5 2.04 12 2.04Z"/></svg>
                        <span>Facebook</span>
                    </button>
                    <button class="share-fab-item" data-network="twitter">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M22.46 6c-.77.35-1.6.58-2.46.67.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98-3.56-.18-6.73-1.89-8.84-4.48-.37.63-.58 1.37-.58 2.15 0 1.49.76 2.81 1.91 3.58-.7-.02-1.36-.21-1.94-.54v.05c0 2.08 1.48 3.82 3.44 4.21-.36.1-.74.15-1.14.15-.28 0-.55-.03-.81-.08.55 1.7 2.14 2.94 4.03 2.97-1.47 1.15-3.33 1.84-5.36 1.84-.35 0-.69-.02-1.03-.06 1.9 1.22 4.16 1.93 6.56 1.93 7.88 0 12.2-6.54 12.2-12.2 0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/></svg>
                        <span>Twitter</span>
                    </button>
                    <button class="share-fab-item" data-network="zalo">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.5 8.25H13.5V11.25H16.5V8.25M12 8.25H9V11.25H12V8.25M7.5 8.25H4.5V11.25H7.5V8.25M16.5 12.75H13.5V15.75H16.5V12.75M12 12.75H9V15.75H12V12.75M7.5 12.75H4.5V15.75H7.5V12.75M19.5 3H1.5C.67 3 0 3.67 0 4.5V18.75C0 19.38 .3 20 .75 20.4C1.2 20.85 1.95 21 2.25 21H19.5C20.33 21 21 20.33 21 19.5V4.5C21 3.67 20.33 3 19.5 3Z"/></svg>
                        <span>Zalo</span>
                    </button>
                    <button class="share-fab-item" data-network="copy">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>
                        <span>Copy Link</span>
                    </button>
                </div>
                <button class="share-fab-main">
                    <svg class="share-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z"/></svg>
                    <svg class="close-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
                </button>
            </div>
        `;
    },

    cacheElements() {
        this.elements.container = document.querySelector('.share-fab-container');
        this.elements.mainButton = this.elements.container.querySelector('.share-fab-main');
        this.elements.menu = this.elements.container.querySelector('.share-fab-menu');
        this.elements.shareItems = this.elements.container.querySelectorAll('.share-fab-item');
    },

    addEventListeners() {
        this.elements.mainButton.addEventListener('click', () => {
            this.toggleMenu();
        });

        this.elements.shareItems.forEach(item => {
            item.addEventListener('click', (e) => {
                this.handleShare(e.currentTarget.dataset.network);
                this.toggleMenu(false); // Close menu after sharing
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.elements.container.contains(e.target) && this.elements.container.classList.contains('active')) {
                this.toggleMenu(false);
            }
        });
    },

    toggleMenu(forceState) {
        const isActive = typeof forceState === 'boolean' ? forceState : !this.elements.container.classList.contains('active');
        this.elements.container.classList.toggle('active', isActive);
    },

    handleShare(network) {
        const url = 'https://toanthucte.github.io/trig-interactive-app/';
        const title = 'Trig Interactive App - Học Lượng Giác Thật Dễ Dàng!';
        const text = 'Khám phá ứng dụng học lượng giác tương tác này, rất hữu ích cho học sinh lớp 11!';
        
        let shareUrl;

        switch (network) {
            case 'facebook':
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
                break;
            case 'twitter':
                shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
                break;
            case 'zalo':
                // Zalo sharing is primarily mobile-only and requires their SDK for full features.
                // This is a fallback that might not work on all platforms.
                shareUrl = `https://sp.zalo.me/share_inline?url=${encodeURIComponent(url)}&is_show_widget=1`;
                break;
            case 'copy':
                navigator.clipboard.writeText(url).then(() => {
                    this.showToast('Đã sao chép link!');
                }).catch(err => {
                    this.showToast('Lỗi khi sao chép!', 'error');
                    console.error('Failed to copy: ', err);
                });
                return;
        }

        if (shareUrl) {
            window.open(shareUrl, '_blank', 'noopener,noreferrer,width=600,height=400');
        }
    },

    showToast(message, type = 'success') {
        let toast = document.getElementById('share-toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'share-toast';
            document.body.appendChild(toast);
        }
        toast.textContent = message;
        toast.className = `share-toast show ${type}`;
        setTimeout(() => {
            toast.className = toast.className.replace('show', '');
        }, 3000);
    }
};
