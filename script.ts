 // Ensure that TypeScript knows about html2pdf
declare var html2pdf: any;

document.getElementById('generateResume')?.addEventListener('click', () => {
    const fullname = (document.getElementById('fullname') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const phone = (document.getElementById('phone') as HTMLInputElement).value;
    const education = (document.getElementById('education') as HTMLSelectElement).value;
    const experience = (document.getElementById('experience') as HTMLInputElement).value;
    const skills = Array.from((document.getElementById('skills') as HTMLSelectElement).selectedOptions)
        .map(option => option.value);

    const profilePic = (document.getElementById('profilePic') as HTMLInputElement).files?.[0];

    // Display Resume
    const resumeOutput = document.getElementById('resumeOutput');
    if (resumeOutput) {
        resumeOutput.innerHTML = `
            <h2>${fullname}</h2>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Education:</strong> ${education}</p>
            <p><strong>Experience:</strong> ${experience}</p>
            <p><strong>Skills:</strong> ${skills.join(', ')}</p>
        `;

        if (profilePic) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const img = document.createElement('img');
                img.src = e.target?.result as string;
                img.style.width = '150px';
                img.style.height = '150px';
                resumeOutput.appendChild(img);
            };
            reader.readAsDataURL(profilePic);
        }
    }

    // Show Download Button
    document.getElementById('downloadResume')!.style.display = 'block';
});

document.getElementById('downloadResume')?.addEventListener('click', () => {
    const element = document.getElementById('resumeOutput');
    if (element) {
        const opt = {
            margin: 0.5,
            filename: 'resume.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };

        // html2pdf works 
        html2pdf().from(element).set(opt).save();
    }
});
