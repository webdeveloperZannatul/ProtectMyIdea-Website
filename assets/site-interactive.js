
document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Toggle
  const menuButtons = document.querySelectorAll('button[aria-label="Open menu"], button[aria-label="Close menu"]');
  const navContainer = document.querySelector('header .container-page');
  
  if (menuButtons.length > 0 && navContainer) {
    let mobileDrawer = document.getElementById('mobile-drawer');
    if (!mobileDrawer) {
      mobileDrawer = document.createElement('div');
      mobileDrawer.id = 'mobile-drawer';
      mobileDrawer.className = 'hidden md:hidden border-t border-border/60 bg-background/95 backdrop-blur-md px-4 py-6 space-y-3 shadow-lg';
      
      const currentPath = window.location.pathname;
      const getHref = (page) => {
        return './' + page;
      };
      
      mobileDrawer.innerHTML = `
        <nav class="flex flex-col space-y-2">
          <a class="rounded-lg px-4 py-2.5 text-sm font-medium hover:bg-accent hover:text-primary transition-colors text-foreground" href="${getHref('index.html')}">Home</a>
          <a class="rounded-lg px-4 py-2.5 text-sm font-medium hover:bg-accent hover:text-primary transition-colors text-foreground" href="${getHref('services.html')}">Services</a>
          <a class="rounded-lg px-4 py-2.5 text-sm font-medium hover:bg-accent hover:text-primary transition-colors text-foreground" href="${getHref('process.html')}">Process</a>
          <a class="rounded-lg px-4 py-2.5 text-sm font-medium hover:bg-accent hover:text-primary transition-colors text-foreground" href="${getHref('about.html')}">About</a>
          <a class="rounded-lg px-4 py-2.5 text-sm font-medium hover:bg-accent hover:text-primary transition-colors text-foreground" href="${getHref('contact.html')}">Contact</a>
          <div class="pt-3 border-t border-border/40">
            <a href="${getHref('contact.html')}" class="w-full inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold bg-primary text-primary-foreground shadow hover:bg-primary/90 h-10 rounded-lg px-4 text-sm">
              Book Free Consult
            </a>
          </div>
        </nav>
      `;
      document.querySelector('header').appendChild(mobileDrawer);
    }

    menuButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const isOpen = !mobileDrawer.classList.contains('hidden');
        if (isOpen) {
          mobileDrawer.classList.add('hidden');
          btn.setAttribute('aria-expanded', 'false');
        } else {
          mobileDrawer.classList.remove('hidden');
          btn.setAttribute('aria-expanded', 'true');
        }
      });
    });
  }

  // 2. IP Needs Finder Radio Selection
  const finderButtons = document.querySelectorAll('div[role="radiogroup"] button[role="radio"]');
  finderButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      finderButtons.forEach(b => {
        b.setAttribute('aria-checked', 'false');
        b.classList.remove('border-primary', 'bg-primary/5', 'text-primary', 'shadow-sm');
        b.classList.add('border-border', 'bg-card');
      });
      btn.setAttribute('aria-checked', 'true');
      btn.classList.remove('border-border', 'bg-card');
      btn.classList.add('border-primary', 'bg-primary/5', 'text-primary', 'shadow-sm');
    });
  });

  // 3. Contact Form Submission Handling
  const contactForm = document.querySelector('form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerText = 'Submitting under NDA...';
        setTimeout(() => {
          contactForm.innerHTML = `
            <div class="rounded-2xl border border-mint/40 bg-mint/10 p-8 text-center">
              <div class="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-mint text-mint-foreground">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              </div>
              <h3 class="mt-4 text-2xl font-bold text-foreground">Enquiry Received</h3>
              <p class="mt-2 text-sm text-muted-foreground">Thank you. Your enquiry has been received under our strict NDA guarantee. An Australian IP specialist will contact you within 48 hours.</p>
            </div>
          `;
        }, 800);
      }
    });
  }
});
