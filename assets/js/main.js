AOS.init();
// You can also pass an optional settings object
// below listed default settings
AOS.init({
  
  // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
  offset: 120, // offset (in px) from the original trigger point
  delay: 0, // values from 0 to 3000, with step 50ms
  duration: 700, // values from 0 to 3000, with step 50ms
  easing: 'ease', // default easing for AOS animations
  once: false, // whether animation should happen only once - while scrolling down
  mirror: false, // whether elements should animate out while scrolling past them
  anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation

});

const terminalOutput = document.getElementById('terminal-output');
const terminalCommand = document.getElementById('terminal-command');
const terminalWindow = document.querySelector('.terminal-window');
const clockElement = document.getElementById('taskbar-clock');

const devInfo = {
name: 'Kaustubh Gupta',
profession: 'B.Tech in Computer Science & Info. Tech. Student',
email: 'kaustubhg10@gmail.com',
portfolio: 'ka-us-tubh.github.io/portfolio',
skills: [
    'Python (NumPy, Pandas, Scikit-learn)',
    'C++',
    'TensorFlow, Huggingface',
    'Matplotlib, Seaborn',
    'PowerBI, MySQL',
    'Microsoft Power Automate',
    'Streamlit, Qiskit',
    'Technical Writing'
],
experience: [
    'Data Analytics Internship at Edunet-IBM skill build (August 2023, 6 weeks)',
    'Python Internship at IIPC-KIET (August 2021)'
],
projects: [
    'Two-Tower Recommendation System (March 2024)',
    'Farmer Support System (March 2024)',
    'AutoPIPE: Targeted Marketing (January 2024)',
    'Retail Analysis Dashboard (May 2023)',
    'Edge Detection Using a Quantum Computer (April 2023)'
]
};
function toggleWindow(windowId) {
    const windowElement = document.getElementById(`${windowId}-window`);
    windowElement.style.display = windowElement.style.display === 'none' || windowElement.style.display === '' ? 'block' : 'none';
}

function closeWindow(windowId) {
    const windowElement = document.getElementById(`${windowId}-window`);
    windowElement.style.display = 'none';
}

function maximizeWindow(windowId) {
    const windowElement = document.getElementById(`${windowId}-window`);
    if (windowElement.style.width === '100%') {
        windowElement.style.width = '80%';
        windowElement.style.height = '60%';
        windowElement.style.top = '50%';
        windowElement.style.left = '50%';
        windowElement.style.transform = 'translate(-50%, -50%)';
    } else {
        windowElement.style.width = '100%';
        windowElement.style.height = '100%';
        windowElement.style.top = '0';
        windowElement.style.left = '0';
        windowElement.style.transform = 'none';
    }
}
function toggleTerminal() {
    terminalWindow.style.display = terminalWindow.style.display === 'none' ? 'block' : 'none';
    if (terminalWindow.style.display === 'block') {
        terminalCommand.focus();
    }
}

terminalCommand.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        const command = this.value.trim().toLowerCase();
        let response = '';

        switch (command) {
            case 'help':
                response = 'Available commands: help, date, echo, clear, ls, info, skill, project, experience';
                break;
            case 'ls':
                response = 'resume.pdf<br>project_list.html<br>Documents<br>Downloads';
                break;
            case 'date':
                response = new Date().toString();
                break;
            case 'clear':
                terminalOutput.innerHTML = '';
                this.value = '';
                return;
            case 'info':
            response = `
                            Name: ${devInfo.name}<br>
                            Profession: ${devInfo.profession}<br>
                            Email: ${devInfo.email}
                                                `;
            break;
            case 'skill':
            response = `
                            Skills: ${devInfo.skills.join(', ')}
                            
                                                `;
                break;
            case 'experience':
            response = `
                            Experience: ${devInfo.experience.join(', ')}
                            
                                                `;
                break;
            case 'project':
            response = `Projects: ${devInfo.projects.join(', ')}.`;
            break;

            default:
                if (command.startsWith('echo ')) {
                    response = command.slice(5);
                } else {
                    response = `Command not found: ${command}`;
                }
        }

        terminalOutput.innerHTML += `<div>$ ${this.value}</div>`;
        terminalOutput.innerHTML += `<div>${response}</div>`;
        this.value = '';

        // Scroll to bottom
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }
});

// Taskbar Clock
function updateClock() {
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    clockElement.textContent = timeString;
}
setInterval(updateClock, 1000);
