// Secure Online Voting System - Enhanced Application Logic
class VotingSystem {
    constructor() {
        this.voters = [
            {"Name": "Swanik Srivastava", "Phone": "9871211148", "Aadhaar": "234567890123"},
            {"Name": "Srijan Jha", "Phone": "7011027926", "Aadhaar": "234567890161"},
            {"Name": "Daksha Yadav", "Phone": "6388679407", "Aadhaar": "234567890451"},
            {"Name": "Nishant Sharma", "Phone": "8839805099", "Aadhaar": "234567890192"}
        ];
        
        this.candidates = [
            {"id": 1, "name": "Rajesh Kumar", "party": "National Progress Party", "symbol": "🌟", "color": "#1e40af"},
            {"id": 2, "name": "Priya Sharma", "party": "Democratic Alliance", "symbol": "🌲", "color": "#059669"},
            {"id": 3, "name": "Amit Singh", "party": "People's Movement", "symbol": "✊", "color": "#dc2626"},
            {"id": 4, "name": "Sunita Verma", "party": "Unity Front", "symbol": "🤝", "color": "#7c2d12"}
        ];
        
        this.adminCredentials = {
            username: "admin",
            password: "secureAdmin123"
        };
        
        this.currentSession = null;
        this.currentOtp = null;
        this.otpExpiry = null;
        this.votedAadhaars = new Set();
        this.votes = [];
        this.auditLog = [];
        this.otpTimer = null;
        this.resendTimer = null;
        this.isAdmin = false;
        this.selectedCandidate = null;
        
        this.init();
    }
    
    init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.initializeEventListeners();
                this.setupInputHandlers();
                this.initializeAnimations();
                this.showPage('landingPage');
            });
        } else {
            this.initializeEventListeners();
            this.setupInputHandlers();
            this.initializeAnimations();
            this.showPage('landingPage');
        }
    }
    
    initializeAnimations() {
        // Initialize gradient background animations
        this.startBackgroundAnimations();
        
        // Add intersection observer for fade-in animations
        this.setupScrollAnimations();
    }
    
    startBackgroundAnimations() {
        // Enhanced gradient orb animations
        const orbs = document.querySelectorAll('.gradient-orb');
        orbs.forEach((orb, index) => {
            const animationDelay = index * 2000;
            setTimeout(() => {
                orb.style.animation = `float ${20 + index * 2}s ease-in-out infinite`;
                orb.style.animationDelay = `-${index * 5}s`;
            }, animationDelay);
        });
        
        // Initialize mesh movement
        const mesh = document.querySelector('.gradient-mesh');
        if (mesh) {
            mesh.style.animation = 'meshMove 30s ease-in-out infinite';
        }
    }
    
    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);
        
        // Observe elements that should animate on scroll
        document.querySelectorAll('.card, .security-feature, .candidate-card').forEach(el => {
            observer.observe(el);
        });
    }
    
    setupInputHandlers() {
        const aadhaarInput = document.getElementById('aadhaarInput');
        if (aadhaarInput) {
            aadhaarInput.addEventListener('input', (e) => {
                let value = e.target.value.replace(/\D/g, '');
                if (value.length > 12) value = value.substring(0, 12);
                e.target.value = value;
                this.addInputFeedback(e.target);
            });
            
            aadhaarInput.addEventListener('paste', (e) => {
                e.preventDefault();
                const paste = (e.clipboardData || window.clipboardData).getData('text');
                const cleanPaste = paste.replace(/\D/g, '').substring(0, 12);
                e.target.value = cleanPaste;
                this.addInputFeedback(e.target);
            });
        }
        
        const phoneInput = document.getElementById('phoneInput');
        if (phoneInput) {
            phoneInput.addEventListener('input', (e) => {
                let value = e.target.value.replace(/\D/g, '');
                if (value.length > 10) value = value.substring(0, 10);
                e.target.value = value;
                this.addInputFeedback(e.target);
            });
            
            phoneInput.addEventListener('paste', (e) => {
                e.preventDefault();
                const paste = (e.clipboardData || window.clipboardData).getData('text');
                const cleanPaste = paste.replace(/\D/g, '').substring(0, 10);
                e.target.value = cleanPaste;
                this.addInputFeedback(e.target);
            });
        }
        
        const otpInput = document.getElementById('otpInput');
        if (otpInput) {
            otpInput.addEventListener('input', (e) => {
                let value = e.target.value.replace(/\D/g, '');
                if (value.length > 6) value = value.substring(0, 6);
                e.target.value = value;
                this.addInputFeedback(e.target);
            });
            
            otpInput.addEventListener('paste', (e) => {
                e.preventDefault();
                const paste = (e.clipboardData || window.clipboardData).getData('text');
                const cleanPaste = paste.replace(/\D/g, '').substring(0, 6);
                e.target.value = cleanPaste;
                this.addInputFeedback(e.target);
            });
        }
    }
    
    addInputFeedback(input) {
        // Add visual feedback for input validation
        const wrapper = input.closest('.input-wrapper');
        const gradientBorder = wrapper?.querySelector('.input-gradient-border');
        
        if (input.value.length > 0) {
            input.classList.add('has-value');
            if (gradientBorder) {
                gradientBorder.style.opacity = '0.3';
            }
        } else {
            input.classList.remove('has-value');
            if (gradientBorder) {
                gradientBorder.style.opacity = '0';
            }
        }
    }
    
    showPage(pageId) {
        // Enhanced page transitions with animations
        const currentPage = document.querySelector('.page-section.active');
        const targetPage = document.getElementById(pageId);
        
        if (currentPage) {
            currentPage.style.opacity = '0';
            currentPage.style.transform = 'translateY(-20px)';
            
            setTimeout(() => {
                currentPage.classList.remove('active');
                
                if (targetPage) {
                    targetPage.classList.add('active');
                    targetPage.style.opacity = '0';
                    targetPage.style.transform = 'translateY(20px)';
                    
                    // Trigger reflow
                    targetPage.offsetHeight;
                    
                    targetPage.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
                    targetPage.style.opacity = '1';
                    targetPage.style.transform = 'translateY(0)';
                    
                    // Add page-specific animations
                    this.addPageAnimations(pageId);
                }
            }, 200);
        } else {
            if (targetPage) {
                targetPage.classList.add('active');
                targetPage.style.opacity = '1';
                targetPage.style.transform = 'translateY(0)';
                this.addPageAnimations(pageId);
            }
        }
    }
    
    addPageAnimations(pageId) {
        // Add specific animations for different pages
        switch(pageId) {
            case 'landingPage':
                this.animateLandingElements();
                break;
            case 'votingPage':
                this.animateVotingElements();
                break;
            case 'confirmationPage':
                this.animateConfirmationElements();
                break;
        }
    }
    
    animateLandingElements() {
        const heroElements = document.querySelectorAll('.hero-badge, .hero-title, .hero-subtitle, .security-features, .cta-button, .trust-indicators');
        heroElements.forEach((el, index) => {
            if (el) {
                el.style.opacity = '0';
                el.style.transform = 'translateY(30px)';
                
                setTimeout(() => {
                    el.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }
    
    animateVotingElements() {
        const candidateCards = document.querySelectorAll('.candidate-card');
        candidateCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateX(-30px)';
            
            setTimeout(() => {
                card.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
                card.style.opacity = '1';
                card.style.transform = 'translateX(0)';
            }, index * 100);
        });
    }
    
    animateConfirmationElements() {
        const successIcon = document.querySelector('.success-icon');
        if (successIcon) {
            successIcon.style.transform = 'scale(0)';
            setTimeout(() => {
                successIcon.style.transition = 'transform 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
                successIcon.style.transform = 'scale(1)';
            }, 200);
        }
        
        // Trigger success ripple animation
        const ripple = document.querySelector('.success-ripple');
        if (ripple) {
            ripple.style.animation = 'ripple 2s infinite';
        }
    }
    
    showError(elementId, message) {
        const errorElement = document.getElementById(elementId);
        if (errorElement) {
            errorElement.textContent = message;
            if (message) {
                errorElement.classList.add('active');
                errorElement.style.animation = 'slideIn 0.3s ease-out';
                
                // Add shake animation for error
                errorElement.style.animation = 'shake 0.5s ease-in-out';
            }
            
            setTimeout(() => {
                errorElement.textContent = '';
                errorElement.classList.remove('active');
                errorElement.style.animation = '';
            }, 5000);
        }
    }
    
    generateOTP() {
        return Math.floor(100000 + Math.random() * 900000).toString();
    }
    
    generateVoteHash(aadhaar, candidateId, timestamp) {
        const data = `${aadhaar}_${candidateId}_${timestamp}`;
        let hash = 0;
        for (let i = 0; i < data.length; i++) {
            const char = data.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return Math.abs(hash).toString(16).padStart(8, '0').toUpperCase();
    }
    
    formatPhone(phone) {
        return phone.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
    }
    
    maskAadhaar(aadhaar) {
        return aadhaar.replace(/(\d{4})(\d{4})(\d{4})/, '****-****-$3');
    }
    
    addAuditEntry(action, details = '') {
        this.auditLog.push({
            timestamp: new Date().toLocaleString(),
            action,
            details,
            sessionId: this.currentSession?.aadhaar ? this.maskAadhaar(this.currentSession.Aadhaar) : 'Unknown'
        });
    }
    
    initializeEventListeners() {
        // Navigation
        const startVotingBtn = document.getElementById('startVotingBtn');
        if (startVotingBtn) {
            startVotingBtn.addEventListener('click', () => {
                this.addButtonClickEffect(startVotingBtn);
                setTimeout(() => this.showPage('voterLoginPage'), 200);
            });
        }
        
        const backToLandingBtn = document.getElementById('backToLandingBtn');
        if (backToLandingBtn) {
            backToLandingBtn.addEventListener('click', () => {
                this.addButtonClickEffect(backToLandingBtn);
                this.resetSession();
                setTimeout(() => this.showPage('landingPage'), 200);
            });
        }
        
        const backToLoginBtn = document.getElementById('backToLoginBtn');
        if (backToLoginBtn) {
            backToLoginBtn.addEventListener('click', () => {
                this.addButtonClickEffect(backToLoginBtn);
                this.clearOTP();
                setTimeout(() => this.showPage('voterLoginPage'), 200);
            });
        }
        
        const backToDashboardBtn = document.getElementById('backToDashboardBtn');
        if (backToDashboardBtn) {
            backToDashboardBtn.addEventListener('click', () => {
                this.addButtonClickEffect(backToDashboardBtn);
                setTimeout(() => this.showPage('voterDashboardPage'), 200);
            });
        }
        
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                this.addButtonClickEffect(logoutBtn);
                setTimeout(() => this.logout(), 200);
            });
        }
        
        const finishVotingBtn = document.getElementById('finishVotingBtn');
        if (finishVotingBtn) {
            finishVotingBtn.addEventListener('click', () => {
                this.addButtonClickEffect(finishVotingBtn);
                setTimeout(() => this.logout(), 200);
            });
        }
        
        // Forms
        const voterLoginForm = document.getElementById('voterLoginForm');
        if (voterLoginForm) {
            voterLoginForm.addEventListener('submit', (e) => {
                this.handleVoterLogin(e);
            });
        }
        
        const otpVerificationForm = document.getElementById('otpVerificationForm');
        if (otpVerificationForm) {
            otpVerificationForm.addEventListener('submit', (e) => {
                this.handleOTPVerification(e);
            });
        }
        
        const proceedToVoteBtn = document.getElementById('proceedToVoteBtn');
        if (proceedToVoteBtn) {
            proceedToVoteBtn.addEventListener('click', () => {
                this.addButtonClickEffect(proceedToVoteBtn);
                setTimeout(() => this.initializeVoting(), 200);
            });
        }
        
        // Cast Vote Button
        const castVoteBtn = document.getElementById('castVoteBtn');
        if (castVoteBtn) {
            castVoteBtn.addEventListener('click', () => {
                this.addButtonClickEffect(castVoteBtn);
                setTimeout(() => this.handleVoteSubmission(), 200);
            });
        }
        
        // OTP Actions
        const resendOtpBtn = document.getElementById('resendOtpBtn');
        if (resendOtpBtn) {
            resendOtpBtn.addEventListener('click', () => {
                this.addButtonClickEffect(resendOtpBtn);
                setTimeout(() => this.resendOTP(), 200);
            });
        }
        
        // Admin Modal
        const adminLoginBtn = document.getElementById('adminLoginBtn');
        if (adminLoginBtn) {
            adminLoginBtn.addEventListener('click', () => {
                this.addButtonClickEffect(adminLoginBtn);
                const modal = document.getElementById('adminLoginModal');
                if (modal) {
                    modal.classList.remove('hidden');
                    this.animateModal(modal, true);
                }
            });
        }
        
        const closeAdminModal = document.getElementById('closeAdminModal');
        if (closeAdminModal) {
            closeAdminModal.addEventListener('click', () => {
                const modal = document.getElementById('adminLoginModal');
                if (modal) {
                    this.animateModal(modal, false);
                    setTimeout(() => modal.classList.add('hidden'), 300);
                }
            });
        }
        
        const adminLoginForm = document.getElementById('adminLoginForm');
        if (adminLoginForm) {
            adminLoginForm.addEventListener('submit', (e) => {
                this.handleAdminLogin(e);
            });
        }
        
        // Candidate Card (change event - delegated)
        document.addEventListener('change', (e) => {
            if (e.target && e.target.name === 'candidate') {
                this.handleCandidateSelection(e);
            }
        });
        
        // Modal click outside close
        document.addEventListener('click', (e) => {
            const modal = document.getElementById('adminLoginModal');
            if (modal && e.target === modal) {
                this.animateModal(modal, false);
                setTimeout(() => modal.classList.add('hidden'), 300);
            }
        });
        
        // Enhanced hover effects for interactive elements
        this.setupHoverEffects();
    }
    
    addButtonClickEffect(button) {
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = '';
        }, 150);
    }
    
    animateModal(modal, show) {
        const modalContent = modal.querySelector('.modal-content');
        if (show) {
            modal.style.opacity = '0';
            modalContent.style.transform = 'scale(0.8)';
            
            setTimeout(() => {
                modal.style.transition = 'opacity 0.3s ease';
                modalContent.style.transition = 'transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
                modal.style.opacity = '1';
                modalContent.style.transform = 'scale(1)';
            }, 10);
        } else {
            modal.style.opacity = '0';
            modalContent.style.transform = 'scale(0.8)';
        }
    }
    
    setupHoverEffects() {
        // Add enhanced hover effects for candidate cards
        document.addEventListener('mouseover', (e) => {
            if (e.target.closest('.candidate-card')) {
                const card = e.target.closest('.candidate-card');
                const symbol = card.querySelector('.candidate-symbol');
                if (symbol) {
                    symbol.style.transform = 'scale(1.1) rotate(5deg)';
                    symbol.style.filter = 'drop-shadow(0 0 12px rgba(0, 0, 0, 0.2))';
                }
            }
            
            if (e.target.closest('.security-feature')) {
                const feature = e.target.closest('.security-feature');
                const icon = feature.querySelector('.security-feature__icon');
                if (icon) {
                    icon.style.transform = 'scale(1.2)';
                    icon.style.filter = 'drop-shadow(0 0 15px rgba(34, 211, 238, 0.4))';
                }
            }
        });
        
        document.addEventListener('mouseout', (e) => {
            if (e.target.closest('.candidate-card')) {
                const card = e.target.closest('.candidate-card');
                const symbol = card.querySelector('.candidate-symbol');
                if (symbol) {
                    symbol.style.transform = '';
                    symbol.style.filter = '';
                }
            }
            
            if (e.target.closest('.security-feature')) {
                const feature = e.target.closest('.security-feature');
                const icon = feature.querySelector('.security-feature__icon');
                if (icon) {
                    icon.style.transform = '';
                    icon.style.filter = '';
                }
            }
        });
    }
    
    showLoading(btn) {
        if (!btn) return;
        btn.classList.add('loading');
        btn.disabled = true;
        const spinner = btn.querySelector('.loading-spinner');
        if (spinner) spinner.style.display = 'inline-block';
    }
    
    hideLoading(btn) {
        if (!btn) return;
        btn.classList.remove('loading');
        btn.disabled = false;
        const spinner = btn.querySelector('.loading-spinner');
        if (spinner) spinner.style.display = 'none';
    }
    
    async handleVoterLogin(e) {
        e.preventDefault();
        const aadhaarInput = document.getElementById('aadhaarInput');
        const phoneInput = document.getElementById('phoneInput');
        const btn = document.getElementById('generateOtpBtn');
        
        if (!aadhaarInput || !phoneInput) return;
        
        const aadhaar = aadhaarInput.value.trim();
        const phone = phoneInput.value.trim();
        
        this.showError('loginError', '');
        
        // Validation
        if (aadhaar.length !== 12 || !/^\d{12}$/.test(aadhaar)) {
            this.showError('loginError', 'Please enter a valid 12-digit Aadhaar number');
            return;
        }
        
        if (phone.length !== 10 || !/^\d{10}$/.test(phone)) {
            this.showError('loginError', 'Please enter a valid 10-digit phone number');
            return;
        }
        
        if (this.votedAadhaars.has(aadhaar)) {
            this.showError('loginError', 'This Aadhaar number has already been used to vote');
            this.addAuditEntry('Duplicate vote attempt', `Aadhaar: ${this.maskAadhaar(aadhaar)}`);
            return;
        }
        
        // Find voter
        const voter = this.voters.find(v => v.Aadhaar === aadhaar && v.Phone === phone);
        if (!voter) {
            this.showError('loginError', 'Invalid credentials. Please check your Aadhaar number and phone number');
            this.addAuditEntry('Invalid login attempt', `Aadhaar: ${this.maskAadhaar(aadhaar)}, Phone: ${phone}`);
            return;
        }
        
        this.showLoading(btn);
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        this.currentOtp = this.generateOTP();
        this.otpExpiry = Date.now() + (5 * 60 * 1000);
        this.currentSession = { ...voter };
        
        this.addAuditEntry('OTP generated', `Voter: ${voter.Name}`);
        
        this.hideLoading(btn);
        this.showOTPPage();
    }
    
    showOTPPage() {
        // Enhanced OTP display with proper visibility
        const displayedOtp = document.getElementById('displayedOtp');
        if (displayedOtp) {
            displayedOtp.textContent = this.currentOtp;
            displayedOtp.style.opacity = '1';
            displayedOtp.style.visibility = 'visible';
            
            // Add pulse animation to OTP display
            const pulseBackground = displayedOtp.parentElement?.querySelector('.otp-pulse-bg');
            if (pulseBackground) {
                pulseBackground.style.animation = 'pulse 3s infinite';
            }
        }
        
        this.startOTPTimer();
        this.startResendTimer();
        this.showPage('otpPage');
    }
    
    startOTPTimer() {
        const updateTimer = () => {
            const remaining = Math.max(0, this.otpExpiry - Date.now());
            const minutes = Math.floor(remaining / 60000);
            const seconds = Math.floor((remaining % 60000) / 1000);
            
            const timerElement = document.getElementById('otpTimer');
            if (timerElement) {
                timerElement.textContent = `Valid for: ${minutes}:${seconds.toString().padStart(2, '0')}`;
                
                // Change color based on remaining time
                if (remaining < 60000) { // Less than 1 minute
                    timerElement.style.color = '#ef4444';
                    timerElement.style.textShadow = '0 0 5px rgba(239, 68, 68, 0.5)';
                } else if (remaining < 120000) { // Less than 2 minutes
                    timerElement.style.color = '#f59e0b';
                    timerElement.style.textShadow = '0 0 5px rgba(245, 158, 11, 0.5)';
                } else {
                    timerElement.style.color = 'var(--color-primary)';
                    timerElement.style.textShadow = '0 0 5px rgba(34, 211, 238, 0.3)';
                }
            }
            
            if (remaining <= 0) {
                clearInterval(this.otpTimer);
                this.expireOTP();
            }
        };
        
        updateTimer();
        this.otpTimer = setInterval(updateTimer, 1000);
    }
    
    startResendTimer() {
        let countdown = 30;
        const btn = document.getElementById('resendOtpBtn');
        if (!btn) return;
        
        const updateResendTimer = () => {
            btn.textContent = `Resend OTP (${countdown}s)`;
            btn.disabled = true;
            btn.style.opacity = '0.6';
            
            if (countdown <= 0) {
                btn.textContent = 'Resend OTP';
                btn.disabled = false;
                btn.style.opacity = '1';
                clearInterval(this.resendTimer);
            }
            countdown--;
        };
        
        updateResendTimer();
        this.resendTimer = setInterval(updateResendTimer, 1000);
    }
    
    expireOTP() {
        this.showError('otpError', 'OTP has expired. Please go back and generate a new one.');
        
        const otpInput = document.getElementById('otpInput');
        const resendBtn = document.getElementById('resendOtpBtn');
        const displayedOtp = document.getElementById('displayedOtp');
        
        if (otpInput) otpInput.disabled = true;
        if (displayedOtp) {
            displayedOtp.style.opacity = '0.5';
            displayedOtp.textContent = 'EXPIRED';
        }
        if (resendBtn) {
            resendBtn.disabled = false;
            resendBtn.textContent = 'Generate New OTP';
            resendBtn.style.opacity = '1';
        }
    }
    
    async handleOTPVerification(e) {
        e.preventDefault();
        const otpInput = document.getElementById('otpInput');
        const btn = e.submitter;
        
        if (!otpInput) return;
        
        const enteredOtp = otpInput.value.trim();
        
        this.showError('otpError', '');
        
        if (enteredOtp.length !== 6 || !/^\d{6}$/.test(enteredOtp)) {
            this.showError('otpError', 'Please enter a valid 6-digit OTP');
            return;
        }
        
        if (Date.now() > this.otpExpiry) {
            this.showError('otpError', 'OTP has expired');
            return;
        }
        
        if (enteredOtp !== this.currentOtp) {
            this.showError('otpError', 'Invalid OTP. Please check and try again.');
            this.addAuditEntry('Invalid OTP attempt', `Voter: ${this.currentSession.Name}`);
            return;
        }
        
        this.showLoading(btn);
        
        // Simulate verification delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        this.addAuditEntry('OTP verified successfully', `Voter: ${this.currentSession.Name}`);
        
        this.hideLoading(btn);
        this.clearOTP();
        this.showVoterDashboard();
    }
    
    resendOTP() {
        if (this.currentSession) {
            this.currentOtp = this.generateOTP();
            this.otpExpiry = Date.now() + (5 * 60 * 1000);
            
            const displayedOtp = document.getElementById('displayedOtp');
            const otpInput = document.getElementById('otpInput');
            const otpError = document.getElementById('otpError');
            
            if (displayedOtp) {
                displayedOtp.textContent = this.currentOtp;
                displayedOtp.style.opacity = '1';
                displayedOtp.style.visibility = 'visible';
            }
            if (otpInput) {
                otpInput.disabled = false;
                otpInput.value = '';
                otpInput.style.opacity = '1';
            }
            if (otpError) otpError.textContent = '';
            
            this.startOTPTimer();
            this.startResendTimer();
            
            this.addAuditEntry('OTP resent', `Voter: ${this.currentSession.Name}`);
        }
    }
    
    clearOTP() {
        this.currentOtp = null;
        this.otpExpiry = null;
        clearInterval(this.otpTimer);
        clearInterval(this.resendTimer);
        
        const otpInput = document.getElementById('otpInput');
        if (otpInput) otpInput.value = '';
    }
    
    showVoterDashboard() {
        const voterName = document.getElementById('voterName');
        const voterPhone = document.getElementById('voterPhone');
        const voterAadhaar = document.getElementById('voterAadhaar');
        
        if (voterName) voterName.textContent = this.currentSession.Name;
        if (voterPhone) voterPhone.textContent = this.formatPhone(this.currentSession.Phone);
        if (voterAadhaar) voterAadhaar.textContent = this.maskAadhaar(this.currentSession.Aadhaar);
        
        this.showPage('voterDashboardPage');
    }
    
    initializeVoting() {
        this.renderCandidates();
        this.selectedCandidate = null;
        this.showPage('votingPage');
    }
    
    renderCandidates() {
        const form = document.getElementById('votingForm');
        if (!form) return;
        
        form.innerHTML = '';
        
        this.candidates.forEach(candidate => {
            const candidateCard = document.createElement('div');
            candidateCard.className = 'candidate-card';
            candidateCard.style.borderColor = candidate.color;
            candidateCard.style.position = "relative";
            
            candidateCard.innerHTML = `
                <input type="radio" name="candidate" value="${candidate.id}" id="candidate-${candidate.id}" class="candidate-radio">
                <span class="candidate-symbol">${candidate.symbol}</span>
                <div class="candidate-info">
                    <div class="candidate-name">${candidate.name}</div>
                    <div class="candidate-party">${candidate.party}</div>
                </div>
            `;
            
            candidateCard.addEventListener('click', () => {
                const radio = candidateCard.querySelector('input[type="radio"]');
                if (radio) {
                    radio.checked = true;
                    this.handleCandidateSelection({ target: radio });
                }
            });
            
            form.appendChild(candidateCard);
        });
    }
    
    handleCandidateSelection(e) {
        const candidateId = parseInt(e.target.value);
        const candidate = this.candidates.find(c => c.id === candidateId);
        
        if (candidate) {
            this.selectedCandidate = candidate;
            
            // Update UI to show selection
            document.querySelectorAll('.candidate-card').forEach(card => {
                card.classList.remove('selected');
            });
            
            e.target.closest('.candidate-card').classList.add('selected');
            
            // Enable cast vote button
            const castVoteBtn = document.getElementById('castVoteBtn');
            if (castVoteBtn) {
                castVoteBtn.disabled = false;
                castVoteBtn.style.opacity = '1';
            }
            
            this.addAuditEntry('Candidate selected', `Candidate: ${candidate.name}`);
        }
    }
    
    async handleVoteSubmission() {
        if (!this.selectedCandidate || !this.currentSession) {
            this.showError('votingError', 'Please select a candidate before casting your vote');
            return;
        }
        
        const castVoteBtn = document.getElementById('castVoteBtn');
        this.showLoading(castVoteBtn);
        
        // Simulate vote submission delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        const timestamp = new Date().toISOString();
        const voteHash = this.generateVoteHash(
            this.currentSession.Aadhaar,
            this.selectedCandidate.id,
            timestamp
        );
        
        // Record the vote
        const vote = {
            voterAadhaar: this.maskAadhaar(this.currentSession.Aadhaar),
            candidateId: this.selectedCandidate.id,
            candidateName: this.selectedCandidate.name,
            party: this.selectedCandidate.party,
            timestamp: timestamp,
            hash: voteHash
        };
        
        this.votes.push(vote);
        this.votedAadhaars.add(this.currentSession.Aadhaar);
        
        this.addAuditEntry('Vote cast successfully', `Candidate: ${this.selectedCandidate.name}`);
        
        this.hideLoading(castVoteBtn);
        this.showVoteConfirmation(vote);
    }
    
    showVoteConfirmation(vote) {
        // Update receipt details
        const receiptCandidate = document.getElementById('receiptCandidate');
        const receiptParty = document.getElementById('receiptParty');
        const receiptTimestamp = document.getElementById('receiptTimestamp');
        const receiptHash = document.getElementById('receiptHash');
        
        if (receiptCandidate) receiptCandidate.textContent = vote.candidateName;
        if (receiptParty) receiptParty.textContent = vote.party;
        if (receiptTimestamp) receiptTimestamp.textContent = new Date(vote.timestamp).toLocaleString();
        if (receiptHash) receiptHash.textContent = vote.hash;
        
        this.showPage('confirmationPage');
    }
    
    handleAdminLogin(e) {
        e.preventDefault();
        
        const username = document.getElementById('adminUsername').value;
        const password = document.getElementById('adminPassword').value;
        
        if (username === this.adminCredentials.username && 
            password === this.adminCredentials.password) {
            
            this.isAdmin = true;
            this.showAdminDashboard();
            
            const modal = document.getElementById('adminLoginModal');
            if (modal) modal.classList.add('hidden');
            
            this.addAuditEntry('Admin login successful', `Admin: ${username}`);
        } else {
            this.showError('adminError', 'Invalid admin credentials');
            this.addAuditEntry('Invalid admin login attempt', `Username: ${username}`);
        }
    }
    
    showAdminDashboard() {
        // Create admin dashboard dynamically
        const main = document.querySelector('.main');
        if (main) {
            main.innerHTML = `
                <div class="card confirmation-container">
                    <div class="confirmation-content">
                        <h2>Admin Dashboard</h2>
                        <div class="admin-stats">
                            <div class="stat-item">
                                <h3>Total Votes Cast</h3>
                                <p class="stat-number">${this.votes.length}</p>
                            </div>
                            <div class="stat-item">
                                <h3>Total Registered Voters</h3>
                                <p class="stat-number">${this.voters.length}</p>
                            </div>
                            <div class="stat-item">
                                <h3>Voting Participation</h3>
                                <p class="stat-number">${((this.votes.length / this.voters.length) * 100).toFixed(1)}%</p>
                            </div>
                        </div>
                        <div class="vote-results">
                            <h3>Vote Results</h3>
                            ${this.getVoteResults()}
                        </div>
                        <div class="audit-log">
                            <h3>Audit Log</h3>
                            <div class="log-entries">
                                ${this.auditLog.slice(-10).map(entry => 
                                    `<div class="log-entry">
                                        <span class="log-timestamp">${entry.timestamp}</span>
                                        <span class="log-action">${entry.action}</span>
                                        <span class="log-details">${entry.details}</span>
                                    </div>`
                                ).join('')}
                            </div>
                        </div>
                        <button class="btn btn--outline btn--full-width" onclick="location.reload()">
                            Return to Voting System
                        </button>
                    </div>
                </div>
            `;
        }
    }
    
    getVoteResults() {
        const results = this.candidates.map(candidate => {
            const votes = this.votes.filter(vote => vote.candidateId === candidate.id).length;
            const percentage = this.votes.length > 0 ? (votes / this.votes.length * 100).toFixed(1) : 0;
            
            return `
                <div class="result-item" style="border-left: 4px solid ${candidate.color}">
                    <div class="result-candidate">
                        <span class="result-symbol">${candidate.symbol}</span>
                        <div>
                            <div class="result-name">${candidate.name}</div>
                            <div class="result-party">${candidate.party}</div>
                        </div>
                    </div>
                    <div class="result-stats">
                        <div class="result-votes">${votes} votes</div>
                        <div class="result-percentage">${percentage}%</div>
                    </div>
                </div>
            `;
        }).join('');
        
        return results || '<p>No votes cast yet</p>';
    }
    
    resetSession() {
        this.currentSession = null;
        this.currentOtp = null;
        this.otpExpiry = null;
        this.selectedCandidate = null;
        this.clearOTP();
    }
    
    logout() {
        this.resetSession();
        this.showPage('landingPage');
        this.addAuditEntry('User logged out');
    }
}

// Initialize the voting system when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const votingSystem = new VotingSystem();
    
    // Global reference for debugging (remove in production)
    window.votingSystem = votingSystem;
});

// Add global styles for admin dashboard
const adminStyles = `
    <style>
    .admin-stats {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: var(--space-6);
        margin: var(--space-6) 0;
    }
    
    .stat-item {
        background: var(--color-primary-light);
        padding: var(--space-6);
        border-radius: var(--radius-lg);
        text-align: center;
        border: 1px solid rgba(34, 211, 238, 0.3);
    }
    
    .stat-number {
        font-size: 2rem;
        font-weight: var(--font-weight-bold);
        color: var(--color-primary);
        margin-top: var(--space-2);
    }
    
    .vote-results, .audit-log {
        margin: var(--space-8) 0;
        padding: var(--space-6);
        background: rgba(255, 255, 255, 0.05);
        border-radius: var(--radius-lg);
        border: 1px solid rgba(255, 255, 255, 0.1);
    }
    
    .result-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: var(--space-4);
        margin: var(--space-3) 0;
        background: var(--color-surface);
        border-radius: var(--radius-base);
        color: var(--color-text-on-surface);
    }
    
    .result-candidate {
        display: flex;
        align-items: center;
        gap: var(--space-4);
    }
    
    .result-symbol {
        font-size: 1.5em;
    }
    
    .result-name {
        font-weight: var(--font-weight-semibold);
        margin-bottom: var(--space-1);
    }
    
    .result-party {
        font-size: var(--font-size-sm);
        opacity: 0.8;
    }
    
    .result-stats {
        text-align: right;
    }
    
    .result-votes {
        font-weight: var(--font-weight-bold);
        color: var(--color-primary);
    }
    
    .result-percentage {
        font-size: var(--font-size-sm);
        opacity: 0.8;
    }
    
    .log-entries {
        max-height: 300px;
        overflow-y: auto;
        background: rgba(0, 0, 0, 0.1);
        border-radius: var(--radius-base);
        padding: var(--space-4);
    }
    
    .log-entry {
        display: grid;
        grid-template-columns: auto 1fr auto;
        gap: var(--space-4);
        padding: var(--space-2) 0;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        font-size: var(--font-size-sm);
    }
    
    .log-entry:last-child {
        border-bottom: none;
    }
    
    .log-timestamp {
        color: var(--color-text-muted);
        font-family: var(--font-family-mono);
    }
    
    .log-action {
        color: var(--color-primary);
        font-weight: var(--font-weight-medium);
    }
    
    .log-details {
        color: var(--color-text-secondary);
        text-align: right;
    }
    </style>
`;

// Inject admin styles into the document
if (typeof document !== 'undefined') {
    document.head.insertAdjacentHTML('beforeend', adminStyles);
}
