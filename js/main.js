/* ============================================================
   KORRA KIRAN — PORTFOLIO interactions
   vanilla JS · no dependencies
   ============================================================ */
(() => {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- kill SMIL pulses for reduced motion ---------- */
  if (reduceMotion) {
    document.querySelectorAll("animate, animateMotion").forEach((el) => el.remove());
  }

  /* ---------- mobile menu ---------- */
  const burger = document.getElementById("burger");
  const menu = document.getElementById("menu");
  const menuBackdrop = document.getElementById("menuBackdrop");
  const closeMenu = () => {
    document.body.classList.remove("menu-open");
    if (burger) burger.setAttribute("aria-expanded", "false");
    if (menu) menu.setAttribute("aria-hidden", "true");
  };
  if (burger && menu) {
    const closeBtn = document.getElementById("menuCloseBtn");
    burger.addEventListener("click", () => {
      const open = !document.body.classList.contains("menu-open");
      document.body.classList.toggle("menu-open", open);
      burger.setAttribute("aria-expanded", String(open));
      menu.setAttribute("aria-hidden", String(!open));
    });
    if (closeBtn) {
      closeBtn.addEventListener("click", closeMenu);
    }
    if (menuBackdrop) {
      menuBackdrop.addEventListener("click", closeMenu);
    }
    menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", closeMenu));
    window.addEventListener("keydown", (e) => { if (e.key === "Escape") closeMenu(); });
  }

  /* ---------- smart navbar scroll-up reveal & scroll progress ---------- */
  const nav = document.getElementById("nav");
  const progress = document.getElementById("progress");
  let lastScrollY = window.pageYOffset || document.documentElement.scrollTop || 0;

  const handleNavScroll = () => {
    const currentY = Math.max(0, window.pageYOffset || document.documentElement.scrollTop || 0);

    // Update scroll progress bar
    if (progress) {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.transform = `scaleX(${max > 0 ? currentY / max : 0})`;
    }

    if (!nav) return;

    // Add shadow when scrolled
    if (currentY > 10) {
      nav.classList.add("nav-scrolled");
    } else {
      nav.classList.remove("nav-scrolled");
    }

    // Never hide nav if mobile menu is open
    if (document.body.classList.contains("menu-open")) {
      nav.classList.remove("nav-hidden");
      lastScrollY = currentY;
      return;
    }

    const diff = currentY - lastScrollY;

    // Scroll-up reveal logic
    if (currentY <= 40) {
      // Near the top of the page -> always visible
      nav.classList.remove("nav-hidden");
    } else if (diff > 4) {
      // Scrolling down -> hide navbar to maximize reading area
      nav.classList.add("nav-hidden");
    } else if (diff < -3) {
      // Scrolling up even slightly -> immediately reveal navbar & burger
      nav.classList.remove("nav-hidden");
    }

    lastScrollY = currentY;
  };

  window.addEventListener("scroll", handleNavScroll, { passive: true });
  window.addEventListener("touchmove", handleNavScroll, { passive: true });
  handleNavScroll();

  /* ---------- scroll spy ---------- */
  const spyLinks = [...document.querySelectorAll("[data-spy]")];
  if (spyLinks.length) {
    const byId = {};
    spyLinks.forEach((l) => (byId[l.getAttribute("href").slice(1)] = l));
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            spyLinks.forEach((l) => l.classList.remove("active"));
            const link = byId[e.target.id];
            if (link) link.classList.add("active");
          }
        });
      },
      { rootMargin: "-35% 0px -55% 0px" }
    );
    document.querySelectorAll("main section[id]").forEach((s) => spy.observe(s));
  }

  /* ---------- reveal on scroll ---------- */
  const revealEls = [...document.querySelectorAll(".reveal")];
  if (reduceMotion) {
    revealEls.forEach((el) => el.classList.add("in"));
  } else {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );
    revealEls.forEach((el) => io.observe(el));
  }

  /* ---------- animated counters ---------- */
  const counters = [...document.querySelectorAll("[data-count]")];
  const runCounter = (el) => {
    const target = parseInt(el.dataset.count, 10) || 0;
    const pad = parseInt(el.dataset.pad, 10) || 0;
    if (reduceMotion || target === 0) {
      el.textContent = String(target).padStart(pad, "0");
      return;
    }
    const dur = 1300;
    const t0 = performance.now();
    const tick = (t) => {
      const p = Math.min(1, (t - t0) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = String(Math.round(target * eased)).padStart(pad, "0");
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  if (counters.length) {
    const cio = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            runCounter(e.target);
            cio.unobserve(e.target);
          }
        });
      },
      { threshold: 0.6 }
    );
    counters.forEach((el) => cio.observe(el));
  }

  /* ---------- contribution heatmap with real months, year & dates ---------- */
  const heat = document.getElementById("heatmap");
  const heatMonths = document.getElementById("heatmapMonths");
  const heatYear = document.getElementById("heatYear");

  if (heat) {
    const mulberry32 = (a) => () => {
      a |= 0; a = (a + 0x6d2b79f5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
    const rand = mulberry32(20260829);
    const weeks = 52;
    const now = new Date();

    const startYear = now.getFullYear() - 1;
    const endYear = now.getFullYear();
    if (heatYear) {
      heatYear.textContent = `${startYear} – ${endYear}`;
    }

    const startDate = new Date(now);
    startDate.setDate(now.getDate() - (52 * 7 - 1));

    // Render month header row across the 52 columns
    if (heatMonths) {
      heatMonths.innerHTML = "";
      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      let lastMonth = -1;
      let lastMonthWeek = -99;

      for (let w = 0; w < weeks; w++) {
        const weekDate = new Date(startDate);
        weekDate.setDate(startDate.getDate() + w * 7);
        const m = weekDate.getMonth();
        const span = document.createElement("span");

        if (m !== lastMonth && (w - lastMonthWeek) >= 3 && (weeks - w) >= 2) {
          span.textContent = monthNames[m];
          lastMonth = m;
          lastMonthWeek = w;
        } else {
          span.textContent = "";
        }
        heatMonths.appendChild(span);
      }
    }

    const frag = document.createDocumentFragment();
    let momentum = 0.4;
    for (let w = 0; w < weeks; w++) {
      momentum = Math.max(0.05, Math.min(0.95, momentum + (rand() - 0.48) * 0.22));
      for (let d = 0; d < 7; d++) {
        const cellDate = new Date(startDate);
        cellDate.setDate(startDate.getDate() + (w * 7 + d));
        const dateStr = cellDate.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

        const weekend = d === 0 || d === 6;
        const r = rand();
        let level = 0;
        const p = momentum * (weekend ? 0.45 : 1);
        if (r < p * 0.42) level = 1;
        else if (r < p * 0.68) level = 2;
        else if (r < p * 0.86) level = 3;
        else if (r < p * 0.94) level = 4;

        const cell = document.createElement("span");
        cell.className = "cell";
        if (level) cell.dataset.l = level;
        const commits = level === 0 ? "No commits" : `${level * 2 + Math.floor(rand() * 3)} commits`;
        cell.title = `${commits} on ${dateStr}`;
        cell.style.setProperty("--cd", `${Math.min(1.4, (w * 7 + d) * 0.0016)}s`);
        frag.appendChild(cell);
      }
    }
    heat.appendChild(frag);
    heat.classList.add("in");
  }

  /* ---------- IST clock ---------- */
  const clocks = ["clock", "clock2"].map((id) => document.getElementById(id)).filter(Boolean);
  const tickClock = () => {
    const now = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit", minute: "2-digit", hour12: false, timeZone: "Asia/Kolkata",
    }).format(new Date());
    clocks.forEach((c) => {
      c.textContent = now;
      c.setAttribute("datetime", now);
    });
  };
  if (clocks.length) {
    tickClock();
    setInterval(tickClock, 30000);
  }

  /* ---------- copy email ---------- */
  const copyBtn = document.getElementById("copyEmail");
  if (copyBtn) {
    copyBtn.addEventListener("click", async () => {
      const email = "kirankorra831@gmail.com";
      try {
        await navigator.clipboard.writeText(email);
      } catch {
        const ta = document.createElement("textarea");
        ta.value = email;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        ta.remove();
      }
      const prev = copyBtn.textContent;
      copyBtn.textContent = "COPIED ✓";
      copyBtn.classList.add("done");
      setTimeout(() => {
        copyBtn.textContent = prev;
        copyBtn.classList.remove("done");
      }, 1600);
    });
  }

  /* ---------- contact form → Formspree (with mailto fallback) ---------- */
  const form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const status = document.getElementById("formStatus");
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const msg = form.message.value.trim();
      if (!name || !email || !msg) {
        status.textContent = "// PLEASE FILL ALL THREE FIELDS";
        status.classList.add("err");
        return;
      }

      // Check for environment variable or global fallback
      let formspreeUrl = "";
      try {
        if (typeof import.meta !== "undefined" && import.meta.env && import.meta.env.VITE_FORMSPREE_URL) {
          formspreeUrl = import.meta.env.VITE_FORMSPREE_URL;
        }
      } catch (_) {}
      if (!formspreeUrl && typeof window !== "undefined" && window.VITE_FORMSPREE_URL) {
        formspreeUrl = window.VITE_FORMSPREE_URL;
      }

      const submitBtn = form.querySelector("button[type='submit']");
      const prevBtnText = submitBtn ? submitBtn.innerHTML : "";

      if (formspreeUrl && formspreeUrl.trim()) {
        status.classList.remove("err");
        status.textContent = "// TRANSMITTING MESSAGE...";
        if (submitBtn) submitBtn.disabled = true;

        try {
          const res = await fetch(formspreeUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
            body: JSON.stringify({
              name,
              email,
              message: msg,
              source: "Portfolio Contact Form",
              submittedAt: new Date().toISOString()
            })
          });

          if (res.ok) {
            status.textContent = "// MESSAGE SENT SUCCESSFULLY ✓";
            form.reset();
            setTimeout(() => { status.textContent = ""; }, 5000);
          } else {
            const data = await res.json().catch(() => ({}));
            throw new Error(data.error || "Submission failed");
          }
        } catch (err) {
          status.classList.add("err");
          status.textContent = "// ERROR SENDING VIA ENDPOINT. OPENING MAIL CLIENT...";
          setTimeout(() => {
            const subject = encodeURIComponent(`Portfolio contact — ${name}`);
            const body = encodeURIComponent(`${msg}\n\n— ${name}\n${email}`);
            window.location.href = `mailto:kirankorra831@gmail.com?subject=${subject}&body=${body}`;
          }, 1200);
        } finally {
          if (submitBtn) submitBtn.disabled = false;
        }
      } else {
        const subject = encodeURIComponent(`Portfolio contact — ${name}`);
        const body = encodeURIComponent(`${msg}\n\n— ${name}\n${email}`);
        window.location.href = `mailto:kirankorra831@gmail.com?subject=${subject}&body=${body}`;
        status.classList.remove("err");
        status.textContent = "// OPENING YOUR MAIL CLIENT — TALK SOON";
      }
    });
  }

  /* ---------- stories subscribe → Google Sheets (with mailto fallback) ---------- */
  const subForm = document.getElementById("subscribeForm");
  if (subForm) {
    subForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const emailInput = subForm.querySelector("input");
      const email = emailInput.value.trim();
      if (!email) return;

      let sheetsUrl = "";
      try {
        if (typeof import.meta !== "undefined" && import.meta.env && import.meta.env.VITE_SHEETS_URL) {
          sheetsUrl = import.meta.env.VITE_SHEETS_URL;
        }
      } catch (_) {}
      if (!sheetsUrl && typeof window !== "undefined" && window.VITE_SHEETS_URL) {
        sheetsUrl = window.VITE_SHEETS_URL;
      }

      const btn = subForm.querySelector("button");
      const prevHtml = btn ? btn.innerHTML : "";

      if (sheetsUrl && sheetsUrl.trim()) {
        if (btn) {
          btn.textContent = "Subscribing...";
          btn.disabled = true;
        }
        try {
          await fetch(sheetsUrl, {
            method: "POST",
            mode: "no-cors",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, timestamp: new Date().toISOString() })
          });
          if (btn) btn.textContent = "Subscribed ✓";
          emailInput.value = "";
          setTimeout(() => {
            if (btn) {
              btn.innerHTML = prevHtml;
              btn.disabled = false;
            }
          }, 3500);
        } catch (err) {
          const subject = encodeURIComponent("Notify me — first story drop");
          const body = encodeURIComponent(`Hi Kiran,\n\nPlease ping me when the first story goes live.\n\n${email}`);
          window.location.href = `mailto:kirankorra831@gmail.com?subject=${subject}&body=${body}`;
          if (btn) {
            btn.innerHTML = prevHtml;
            btn.disabled = false;
          }
        }
      } else {
        const subject = encodeURIComponent("Notify me — first story drop");
        const body = encodeURIComponent(`Hi Kiran,\n\nPlease ping me when the first story goes live.\n\n${email}`);
        window.location.href = `mailto:kirankorra831@gmail.com?subject=${subject}&body=${body}`;
      }
    });
  }

  /* ---------- hero interactive diagram telemetry simulation ---------- */
  const simBtn = document.getElementById("runSimulation");
  const simConsole = document.getElementById("simConsole");
  if (simBtn && simConsole) {
    let isRunning = false;
    simBtn.addEventListener("click", () => {
      if (isRunning) return;
      isRunning = true;
      simBtn.classList.add("active");
      simConsole.classList.add("active");
      simConsole.innerHTML = "";

      const steps = [
        { tag: "VOICE_IN", val: "Audio payload received: 1.4s .wav (Telugu) [User: Retailer #409]", node: "node-user", delay: 0 },
        { tag: "STT_SARVAM", val: "Sarvam Speech-to-Text transcript: 'ఈరోజు బియ్యం స్టాక్ ఎంత ఉంది?' (Latency: 310ms)", node: "node-llm", delay: 450 },
        { tag: "LANGGRAPH", val: "Agent router selected tool: QueryInventoryState(item='rice', date='today')", node: "node-orchestrator", delay: 900 },
        { tag: "GUARDRAILS", val: "Passed read-only AST check & SQL parameter sanitizer", node: "node-guardrails", delay: 1300 },
        { tag: "MONGODB", val: "Executed db.inventory.find({ item: 'rice' }) -> 420 kg in stock", node: "node-mongo", delay: 1700 },
        { tag: "VOICE_OUT", val: "TTS audio response dispatched via WhatsApp API -> Total RT: 1.18s ✓", node: "node-user", delay: 2100 }
      ];

      steps.forEach((s) => {
        setTimeout(() => {
          const line = document.createElement("div");
          line.className = "sim-line";
          const now = new Date().toISOString().slice(11, 19);
          line.innerHTML = `<span class="ts">[${now}]</span><span class="tag">[${s.tag}]</span><span class="val">${s.val}</span>`;
          simConsole.appendChild(line);
          requestAnimationFrame(() => line.classList.add("in"));
          simConsole.scrollTop = simConsole.scrollHeight;

          // Pulse target node in SVG
          const targetNode = document.querySelector(`[data-node-id="${s.node}"]`);
          if (targetNode) {
            targetNode.classList.add("pulse-active");
            setTimeout(() => targetNode.classList.remove("pulse-active"), 600);
          }
        }, s.delay);
      });

      setTimeout(() => {
        isRunning = false;
        simBtn.classList.remove("active");
      }, 2600);
    });
  }

  /* ---------- project category filtering ---------- */
  const filters = [...document.querySelectorAll("[data-filter]")];
  const projCards = [...document.querySelectorAll(".proj-card, .flagship, .proj-featured")];
  if (filters.length && projCards.length) {
    filters.forEach((btn) => {
      btn.addEventListener("click", () => {
        filters.forEach((f) => f.classList.remove("active"));
        btn.classList.add("active");
        const category = btn.dataset.filter;
        projCards.forEach((card) => {
          const cat = card.dataset.category || "";
          if (category === "all" || cat.includes(category)) {
            card.classList.remove("filtered-out");
          } else {
            card.classList.add("filtered-out");
          }
        });
      });
    });
  }

  /* ---------- native <dialog> modal controls ---------- */
  const modalTriggers = [...document.querySelectorAll(".modal-trigger")];
  modalTriggers.forEach((trigger) => {
    trigger.addEventListener("click", (e) => {
      e.preventDefault();
      const modalId = trigger.dataset.modal;
      const dialog = document.getElementById(modalId);
      if (dialog && typeof dialog.showModal === "function") {
        dialog.showModal();
      }
    });
  });

  const dialogs = [...document.querySelectorAll("dialog.arch-dialog")];
  dialogs.forEach((dialog) => {
    dialog.querySelectorAll(".dialog-close").forEach((btn) => {
      btn.addEventListener("click", () => dialog.close());
    });
    dialog.addEventListener("click", (e) => {
      const rect = dialog.getBoundingClientRect();
      const isInDialog = (
        rect.top <= e.clientY && e.clientY <= rect.top + rect.height &&
        rect.left <= e.clientX && e.clientX <= rect.left + rect.width
      );
      if (!isInDialog) dialog.close();
    });
  });

  /* ---------- tech chip interaction ---------- */
  const techChips = [...document.querySelectorAll(".chip")];
  techChips.forEach((chip) => {
    chip.addEventListener("click", () => {
      const tech = chip.textContent.trim().toLowerCase().replace(/[^a-z0-9]/g, "");
      if (!tech) return;
      const allChips = document.querySelectorAll(".chip");
      const isAlreadyHighlighted = chip.classList.contains("highlighted");
      allChips.forEach((c) => c.classList.remove("highlighted"));
      if (!isAlreadyHighlighted) {
        allChips.forEach((c) => {
          const cTech = c.textContent.trim().toLowerCase().replace(/[^a-z0-9]/g, "");
          if (cTech && (cTech.includes(tech) || tech.includes(cTech))) {
            c.classList.add("highlighted");
          }
        });
      }
    });
  });

  /* ---------- hero runtime diagram: interactive hotspots ---------- */
  const fig = document.getElementById("runtimeFig");
  const heroTip = document.getElementById("heroTip");
  if (fig && heroTip) {
    const hotspots = [...fig.querySelectorAll(".hotspot")];
    const TIP_DEFAULT = heroTip.textContent;
    let cycleIdx = 0;
    let cycleTimer = null;
    let userActive = false;

    const activate = (node) => {
      hotspots.forEach((n) => n.classList.toggle("on", n === node));
      fig.classList.add("focusing");
      heroTip.textContent = node.dataset.tip;
      heroTip.classList.add("active");
    };
    const deactivate = () => {
      hotspots.forEach((n) => n.classList.remove("on"));
      fig.classList.remove("focusing");
      heroTip.textContent = TIP_DEFAULT;
      heroTip.classList.remove("active");
    };

    hotspots.forEach((node) => {
      node.addEventListener("mouseenter", () => { userActive = true; activate(node); });
      node.addEventListener("mouseleave", () => { userActive = false; deactivate(); });
      node.addEventListener("focus", () => { userActive = true; activate(node); });
      node.addEventListener("blur", () => { userActive = false; deactivate(); });
    });
    // touch: tapping a component pins it, tapping elsewhere releases
    document.addEventListener("touchstart", (e) => {
      const hit = e.target.closest && e.target.closest("#runtimeFig .hotspot");
      if (hit) { userActive = true; activate(hit); }
      else if (userActive) { userActive = false; deactivate(); }
    }, { passive: true });

    // idle auto-cycle: walks one component at a time while the fig is on screen
    if (!reduceMotion) {
      cycleTimer = setInterval(() => {
        if (userActive || document.hidden) return;
        const r = fig.getBoundingClientRect();
        if (r.bottom < 0 || r.top > window.innerHeight) return;
        activate(hotspots[cycleIdx % hotspots.length]);
        cycleIdx++;
      }, 3200);
    }
  }

  /* ---------- year ---------- */
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();

