// JavaScript for handling Sign In, Log In, and Scholarship Filtration

// Utility function to get users from localStorage
function getUsers() {
  const users = localStorage.getItem('users');
  return users ? JSON.parse(users) : [];
}

// Utility function to save users to localStorage
function saveUsers(users) {
  localStorage.setItem('users', JSON.stringify(users));
}

// Handle Sign In form submission
const signInForm = document.getElementById('signInForm');
if (signInForm) {
  signInForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const name = signInForm.name.value.trim();
    const email = signInForm.email.value.trim().toLowerCase();
    const password = signInForm.password.value;

    if (!name || !email || !password) {
      alert('Please fill all fields.');
      return;
    }

    let users = getUsers();
    const userExists = users.some(user => user.email === email);
    if (userExists) {
      alert('User with this email already exists. Please log in.');
      return;
    }

    users.push({ name, email, password });
    saveUsers(users);
    alert('Sign In successful! Please log in now.');
    window.location.href = 'login.html';
  });
}

// Handle Log In form submission
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const name = loginForm.loginName.value.trim();
    const email = loginForm.loginEmail.value.trim().toLowerCase();
    const password = loginForm.loginPassword.value;

    if (!name || !email || !password) {
      alert('Please fill all fields.');
      return;
    }

    const users = getUsers();
    // Accept name case-insensitively
    const user = users.find(user => user.email === email && user.password === password && user.name.toLowerCase() === name.toLowerCase());
    if (!user) {
      alert('Invalid login details. Please try again.');
      return;
    }

    // Save logged in user info in sessionStorage
    sessionStorage.setItem('loggedInUser', JSON.stringify(user));
    window.location.href = 'filter.html';
  });
}

// Sample scholarship data
const scholarships = [
  // Science scholarships (5)
  { id: 1, title: "Science Innovators Grant", field: "Science", eligibility: "Graduate", providers: ["Harvard University", "MIT", "Stanford University"] },
  { id: 2, title: "Environmental Studies Grant", field: "Science", eligibility: "Undergraduate", providers: ["University of California, Berkeley", "Yale University", "University of Oxford"] },
  { id: 3, title: "Biology Research Scholarship", field: "Science", eligibility: "Undergraduate", providers: ["Johns Hopkins University", "University of Cambridge", "University of Toronto"] },
  { id: 4, title: "Physics Excellence Award", field: "Science", eligibility: "Graduate", providers: ["Caltech", "Princeton University", "ETH Zurich"] },
  { id: 5, title: "Chemistry Scholars Fund", field: "Science", eligibility: "Undergraduate", providers: ["University of Chicago", "Columbia University", "University of Tokyo"] },

  // Computer Science scholarships (5)
  { id: 26, title: "Computer Science Innovators Award", field: "Computer Science", eligibility: "Undergraduate", providers: ["Carnegie Mellon University", "University of Washington", "University of Illinois Urbana-Champaign"] },
  { id: 27, title: "AI Research Grant", field: "Computer Science", eligibility: "Graduate", providers: ["MIT", "Stanford University", "University of Toronto"] },
  { id: 28, title: "Software Engineering Scholarship", field: "Computer Science", eligibility: "Undergraduate", providers: ["University of California, San Diego", "Georgia Tech", "University of Texas at Austin"] },
  { id: 29, title: "Data Science Fellowship", field: "Computer Science", eligibility: "Graduate", providers: ["Harvard University", "Columbia University", "University of Michigan"] },
  { id: 30, title: "Cybersecurity Scholars Fund", field: "Computer Science", eligibility: "Undergraduate", providers: ["University of Maryland", "University of California, Berkeley", "University of Cambridge"] },

  // Commerce scholarships (5)
  { id: 6, title: "Commerce Leaders Scholarship", field: "Commerce", eligibility: "Undergraduate" },
  { id: 7, title: "Business Excellence Grant", field: "Commerce", eligibility: "Graduate" },
  { id: 8, title: "Accounting Scholars Award", field: "Commerce", eligibility: "Undergraduate" },
  { id: 9, title: "Finance Future Fund", field: "Commerce", eligibility: "Graduate" },
  { id: 10, title: "Marketing Innovators Grant", field: "Commerce", eligibility: "Undergraduate" },

  // Arts scholarships (5)
  { id: 11, title: "Arts Creativity Award", field: "Arts", eligibility: "Undergraduate" },
  { id: 12, title: "Fine Arts Scholarship", field: "Arts", eligibility: "Graduate" },
  { id: 13, title: "Performing Arts Grant", field: "Arts", eligibility: "Undergraduate" },
  { id: 14, title: "Visual Arts Fellowship", field: "Arts", eligibility: "Graduate" },
  { id: 15, title: "Literature Scholars Fund", field: "Arts", eligibility: "Undergraduate" },

  // Humanities scholarships (5)
  { id: 16, title: "Humanities Research Grant", field: "Humanities", eligibility: "Graduate" },
  { id: 17, title: "Philosophy Scholars Award", field: "Humanities", eligibility: "Undergraduate" },
  { id: 18, title: "History Excellence Scholarship", field: "Humanities", eligibility: "Undergraduate" },
  { id: 19, title: "Cultural Studies Fellowship", field: "Humanities", eligibility: "Graduate" },
  { id: 20, title: "Linguistics Grant", field: "Humanities", eligibility: "Undergraduate" },

  // Law scholarships (5)
  { id: 21, title: "Law Scholars Fellowship", field: "Law", eligibility: "Graduate" },
  { id: 22, title: "Legal Excellence Award", field: "Law", eligibility: "Undergraduate" },
  { id: 23, title: "Criminal Justice Grant", field: "Law", eligibility: "Graduate" },
  { id: 24, title: "International Law Scholarship", field: "Law", eligibility: "Undergraduate" },
  { id: 25, title: "Human Rights Fellowship", field: "Law", eligibility: "Graduate" }
];

// Handle Scholarship Filtration form submission
const filterForm = document.getElementById('filterForm');
if (filterForm) {
  filterForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const fieldOfStudy = filterForm.fieldOfStudy.value.trim().toLowerCase();
    const eligibility = filterForm.eligibility.value.trim().toLowerCase();

    if (!fieldOfStudy || !eligibility) {
      alert('Please fill all fields.');
      return;
    }

    const resultsList = document.getElementById('resultsList');
    resultsList.innerHTML = '';

    const filtered = scholarships.filter(scholarship =>
      scholarship.field.toLowerCase().includes(fieldOfStudy) &&
      scholarship.eligibility.toLowerCase().includes(eligibility)
    ).slice(0, 10);

    if (filtered.length === 0) {
      resultsList.innerHTML = '<li class="text-gray-600">No scholarships found matching your criteria.</li>';
      return;
    }

    filtered.forEach(scholarship => {
      const li = document.createElement('li');
      li.className = 'border p-4 rounded shadow-sm hover:shadow-md transition cursor-pointer';
      li.innerHTML = `
        <h3 class="text-lg font-semibold text-indigo-700">${scholarship.title}</h3>
        <p><strong>Field of Study:</strong> ${scholarship.field}</p>
        <p><strong>Eligibility:</strong> ${scholarship.eligibility}</p>
      `;
      // Add click event to show providers
      li.addEventListener('click', () => {
        alert('Provided by: ' + (scholarship.providers ? scholarship.providers.join(', ') : 'No providers listed'));
      });
      resultsList.appendChild(li);
    });
  });
}

// Redirect to login if not logged in on filter page
if (window.location.pathname.endsWith('filter.html')) {
  const loggedInUser = sessionStorage.getItem('loggedInUser');
  if (!loggedInUser) {
    alert('Please log in first.');
    window.location.href = 'login.html';
  }
}
