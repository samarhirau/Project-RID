document.getElementById('resetPasswordForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const password = document.getElementById('password').value;

    try {
        const response = await fetch(`/api/auth/reset-password/${token}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ password })
        });
        const result = await response.json();

        if (response.ok) {
            alert(result.message);
        } else {
            alert(result.message);
        }
    } catch (error) {
        alert('Error resetting password.');
    }
});
