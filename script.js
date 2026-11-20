const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  const open = navLinks.classList.toggle("active");
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
});

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
  });
});

document.getElementById("year").textContent = new Date().getFullYear();

const backToTop = document.getElementById("backToTop");
window.addEventListener("scroll", () => {
  backToTop.classList.toggle("visible", window.scrollY > 350);
});
backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});


/* Safe interactive portfolio terminal: commands are simulated in the browser. */
const terminalForm = document.getElementById("terminalForm");
const terminalInput = document.getElementById("terminalInput");
const terminalOutput = document.getElementById("terminalOutput");

if (terminalForm && terminalInput && terminalOutput) {
  const addTerminalLine = (className, text) => {
    const line = document.createElement("div");
    line.className = `terminal-line ${className}`;
    line.textContent = text;
    terminalOutput.appendChild(line);
  };

  const commands = {
    help: () => "Available commands: help, whoami, neofetch, joke, cmatrix, scan, date, clear",
    whoami: () => "guest — a demo user. No personal information is shown.",
    neofetch: () => "OS: Kali-style demo environment\\nHost: portfolio-terminal\\nShell: safe-demo-shell\\nStatus: learning mode",
    joke: () => "Why do programmers prefer dark mode? Because light attracts bugs. 🐛",
    date: () => new Date().toLocaleString(),
    scan: () => "Starting simulated scan...\\n[OK] Demo host: 127.0.0.1\\n[OK] Result: This is only a visual demo; no network scan was performed.",
    cmatrix: () => "ｱ ﾊ ﾐ ﾋ ｰ ｳ ｼ ﾅ ﾓ ﾆ ｻ\\nﾘ ﾂ ﾃ ﾒ ｶ ｷ ﾑ ﾕ ﾗ ｾ\\nﾈ ﾉ ﾌ ｱ ｳ ﾄ ﾁ ｻ ﾏ ﾛ\\nMATRIX MODE: simulated green rain ✦",
    hack: () => "ACCESS GRANTED... to the snack directory. 🍪\\nJust kidding — this is a harmless portfolio demo.",
    pwd: () => "/home/guest/demo",
    ls: () => "about.txt  skills.txt  projects/  good_vibes.txt"
  };

  terminalForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const command = terminalInput.value.trim().toLowerCase();
    if (!command) return;
    addTerminalLine("terminal-command", `guest@kali:~$ ${command}`);

    if (command === "clear") {
      terminalOutput.textContent = "";
    } else if (Object.prototype.hasOwnProperty.call(commands, command)) {
      const result = commands[command]();
      addTerminalLine(command === "cmatrix" ? "terminal-result matrix-art" : "terminal-result", result);
    } else {
      addTerminalLine("terminal-result", `Command not found: ${command}. Type "help" to see demo commands.`);
    }
    terminalInput.value = "";
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
  });
}
