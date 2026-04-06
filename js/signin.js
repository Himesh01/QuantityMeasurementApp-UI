 const loginTab = document.getElementById("loginTab");
    const signupTab = document.getElementById("signupTab");
    const loginForm = document.getElementById("loginForm");
    const signupForm = document.getElementById("signupForm");

    loginTab.addEventListener("click", () => {
        loginForm.style.display = "block";
        signupForm.style.display = "none";

        loginTab.classList.add("active");
        signupTab.classList.remove("active");
    });

    signupTab.addEventListener("click", () => {
        signupForm.style.display = "block";
        loginForm.style.display = "none";

        signupTab.classList.add("active");
        loginTab.classList.remove("active");
    });

    const BASE_URL = "http://localhost:8080/api/v1/auth";

// ✅ SIGNUP
async function signup(event) {
    event.preventDefault(); // Prevent form submission
    
    try {
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;
        
        // Validation
        if (!name || !email || !password) {
            alert("Please fill all fields");
            return;
        }
        
        if (password.length < 6) {
            alert("Password must be at least 6 characters");
            return;
        }

        const data = {
            username: name,
            email: email,
            password: password
        };

        const response = await fetch(`${BASE_URL}/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const result = await response.text();
        
        if (response.ok) {
            alert("Signup Successful! Please login.");
            // Clear form
            document.getElementById("name").value = "";
            document.getElementById("email").value = "";
            document.getElementById("password").value = "";
            document.getElementById("mobile").value = "";
            
            // Switch to login tab
            loginTab.click();
        } else {
            alert("Signup Failed: " + result);
        }
    } catch (error) {
        console.error("Signup error:", error);
        alert("Error during signup: " + error.message);
    }
}

// ✅ LOGIN (SIGNIN)
async function login(event) {
    event.preventDefault(); // Prevent form submission from default behavior
    
    try {
        const email = document.getElementById("loginUsername").value.trim();
        const password = document.getElementById("loginPassword").value;
        
        // Validation
        if (!email || !password) {
            alert("Please enter email and password");
            return;
        }

        const data = {
            email: email,
            password: password
        };

        const response = await fetch(`${BASE_URL}/signin`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            const token = await response.text();

            // 🔐 Store JWT token
            localStorage.setItem("token", token);

            alert("Login Successful!");
            
            // Clear form
            document.getElementById("loginUsername").value = "";
            document.getElementById("loginPassword").value = "";

            // Redirect to dashboard
            window.location.href = "dashboard.html";

        } else {
            const errorMsg = await response.text();
            alert("Login Failed: " + (errorMsg || "Invalid credentials"));
        }
    } catch (error) {
        console.error("Login error:", error);
        alert("Error during login: " + error.message);
    }
}