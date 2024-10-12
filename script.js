var _a, _b;
(_a = document.getElementById('generateResume')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function () {
    var _a;
    var fullname = document.getElementById('fullname').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;
    var education = document.getElementById('education').value;
    var experience = document.getElementById('experience').value;
    var skills = Array.from(document.getElementById('skills').selectedOptions)
        .map(function (option) { return option.value; });
    var profilePic = (_a = document.getElementById('profilePic').files) === null || _a === void 0 ? void 0 : _a[0];
    // Display Resume
    var resumeOutput = document.getElementById('resumeOutput');
    if (resumeOutput) {
        resumeOutput.innerHTML = "\n            <h2>".concat(fullname, "</h2>\n            <p><strong>Email:</strong> ").concat(email, "</p>\n            <p><strong>Phone:</strong> ").concat(phone, "</p>\n            <p><strong>Education:</strong> ").concat(education, "</p>\n            <p><strong>Experience:</strong> ").concat(experience, "</p>\n            <p><strong>Skills:</strong> ").concat(skills.join(', '), "</p>\n        ");
        if (profilePic) {
            var reader = new FileReader();
            reader.onload = function (e) {
                var _a;
                var img = document.createElement('img');
                img.src = (_a = e.target) === null || _a === void 0 ? void 0 : _a.result;
                img.style.width = '150px';
                img.style.height = '150px';
                resumeOutput.appendChild(img);
            };
            reader.readAsDataURL(profilePic);
        }
    }
    // Show Download Button
    document.getElementById('downloadResume').style.display = 'block';
});
(_b = document.getElementById('downloadResume')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', function () {
    var element = document.getElementById('resumeOutput');
    if (element) {
        var opt = {
            margin: 0.5,
            filename: 'resume.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };
        // Ensure html2pdf works properly
        html2pdf().from(element).set(opt).save();
    }
});
