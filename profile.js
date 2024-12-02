// Profile data management
let profileData = {
    name: '',
    username: '',
    email: 'user@example.com',
    phone: '+1 234 567 890',
    bio: "Hey there! I'm using this chat app.",
    profilePicture: 'pic2.png.jpg'
};

// Initialize profile data
function initializeProfile() {
    const urlParams = new URLSearchParams(window.location.search);
    const userName = urlParams.get('user');

    if (userName) {
        profileData.name = userName;
        profileData.username = userName;
        updateProfileUI();
    }
}

// Update UI with profile data
function updateProfileUI() {
    document.getElementById('profile-name').textContent = profileData.name;
    document.getElementById('username-text').textContent = profileData.username;
    document.getElementById('email-text').textContent = profileData.email;
    document.getElementById('phone-text').textContent = profileData.phone;
    document.getElementById('bio-text').textContent = profileData.bio;
    document.getElementById('profile-picture').src = profileData.profilePicture;
}

// Navigation functions
function goBack() {
    window.history.back();
}

// Profile picture handling
function editProfilePicture() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = handleProfilePictureChange;
    input.click();
}

function handleProfilePictureChange(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            profileData.profilePicture = e.target.result;
            document.getElementById('profile-picture').src = e.target.result;
            saveProfilePicture(file);
        };
        reader.readAsDataURL(file);
    }
}

// Field editing functions
function editField(fieldName) {
    const element = document.getElementById(`${fieldName}-text`);
    const currentValue = element.textContent;
    
    const input = document.createElement('input');
    input.type = 'text';
    input.value = currentValue;
    input.className = 'edit-input';
    
    element.parentNode.replaceChild(input, element);
    input.focus();

    input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            saveEdit(fieldName, input);
        }
    });

    input.addEventListener('blur', function() {
        saveEdit(fieldName, input);
    });
}

function saveEdit(fieldName, input) {
    const newValue = input.value.trim();
    profileData[fieldName] = newValue;

    const span = document.createElement('span');
    span.id = `${fieldName}-text`;
    span.textContent = newValue;
    input.parentNode.replaceChild(span, input);

    saveProfileData();
}

// Data persistence functions
function saveProfileData() {
    localStorage.setItem('profileData', JSON.stringify(profileData));
}

function loadProfileData() {
    const savedData = localStorage.getItem('profileData');
    if (savedData) {
        profileData = { ...profileData, ...JSON.parse(savedData) };
        updateProfileUI();
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    loadProfileData();
    initializeProfile();
}); 