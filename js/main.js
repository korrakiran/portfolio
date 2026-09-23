/* KORRA KIRAN PORTFOLIO interactions
   vanilla JS, no dependencies */
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

  /* ---------- REAL GITHUB CONTRIBUTION HEATMAP (Live & Instant Fallback) ---------- */
  const heat = document.getElementById("heatmap");
  const heatMonths = document.getElementById("heatmapMonths");
  const heatTotal = document.getElementById("heatTotal");

  if (heat) {
    // Real GitHub baseline data snapshot for @korrakiran (365 days, 521 contributions)
    const REAL_SNAPSHOT = [
      ["2025-08-31",0,0],["2025-09-01",0,0],["2025-09-02",0,0],["2025-09-03",0,0],["2025-09-04",0,0],["2025-09-05",0,0],["2025-09-06",0,0],
      ["2025-09-07",0,0],["2025-09-08",0,0],["2025-09-09",0,0],["2025-09-10",0,0],["2025-09-11",0,0],["2025-09-12",1,1],["2025-09-13",4,1],
      ["2025-09-14",3,1],["2025-09-15",0,0],["2025-09-16",0,0],["2025-09-17",2,1],["2025-09-18",0,0],["2025-09-19",0,0],["2025-09-20",1,1],
      ["2025-09-21",0,0],["2025-09-22",0,0],["2025-09-23",0,0],["2025-09-24",2,1],["2025-09-25",0,0],["2025-09-26",10,2],["2025-09-27",0,0],
      ["2025-09-28",5,1],["2025-09-29",0,0],["2025-09-30",0,0],["2025-10-01",0,0],["2025-10-02",0,0],["2025-10-03",0,0],["2025-10-04",0,0],
      ["2025-10-05",0,0],["2025-10-06",0,0],["2025-10-07",0,0],["2025-10-08",0,0],["2025-10-09",0,0],["2025-10-10",0,0],["2025-10-11",0,0],
      ["2025-10-12",0,0],["2025-10-13",0,0],["2025-10-14",0,0],["2025-10-15",0,0],["2025-10-16",0,0],["2025-10-17",0,0],["2025-10-18",0,0],
      ["2025-10-19",0,0],["2025-10-20",0,0],["2025-10-21",0,0],["2025-10-22",0,0],["2025-10-23",0,0],["2025-10-24",0,0],["2025-10-25",0,0],
      ["2025-10-26",0,0],["2025-10-27",0,0],["2025-10-28",1,1],["2025-10-29",0,0],["2025-10-30",0,0],["2025-10-31",0,0],["2025-11-01",6,1],
      ["2025-11-02",0,0],["2025-11-03",0,0],["2025-11-04",0,0],["2025-11-05",0,0],["2025-11-06",0,0],["2025-11-07",0,0],["2025-11-08",0,0],
      ["2025-11-09",0,0],["2025-11-10",0,0],["2025-11-11",2,1],["2025-11-12",4,1],["2025-11-13",0,0],["2025-11-14",0,0],["2025-11-15",0,0],
      ["2025-11-16",0,0],["2025-11-17",0,0],["2025-11-18",0,0],["2025-11-19",0,0],["2025-11-20",0,0],["2025-11-21",0,0],["2025-11-22",0,0],
      ["2025-11-23",0,0],["2025-11-24",0,0],["2025-11-25",0,0],["2025-11-26",0,0],["2025-11-27",0,0],["2025-11-28",0,0],["2025-11-29",0,0],
      ["2025-11-30",0,0],["2025-12-01",0,0],["2025-12-02",0,0],["2025-12-03",0,0],["2025-12-04",0,0],["2025-12-05",0,0],["2025-12-06",0,0],
      ["2025-12-07",0,0],["2025-12-08",0,0],["2025-12-09",0,0],["2025-12-10",0,0],["2025-12-11",0,0],["2025-12-12",0,0],["2025-12-13",0,0],
      ["2025-12-14",0,0],["2025-12-15",0,0],["2025-12-16",0,0],["2025-12-17",0,0],["2025-12-18",0,0],["2025-12-19",0,0],["2025-12-20",0,0],
      ["2025-12-21",9,2],["2025-12-22",3,1],["2025-12-23",4,1],["2025-12-24",0,0],["2025-12-25",0,0],["2025-12-26",0,0],["2025-12-27",0,0],
      ["2025-12-28",0,0],["2025-12-29",0,0],["2025-12-30",0,0],["2025-12-31",0,0],["2026-01-01",0,0],["2026-01-02",0,0],["2026-01-03",0,0],
      ["2026-01-04",0,0],["2026-01-05",5,1],["2026-01-06",0,0],["2026-01-07",0,0],["2026-01-08",0,0],["2026-01-09",0,0],["2026-01-10",0,0],
      ["2026-01-11",0,0],["2026-01-12",0,0],["2026-01-13",0,0],["2026-01-14",0,0],["2026-01-15",0,0],["2026-01-16",0,0],["2026-01-17",0,0],
      ["2026-01-18",0,0],["2026-01-19",0,0],["2026-01-20",0,0],["2026-01-21",0,0],["2026-01-22",0,0],["2026-01-23",0,0],["2026-01-24",0,0],
      ["2026-01-25",2,1],["2026-01-26",0,0],["2026-01-27",0,0],["2026-01-28",0,0],["2026-01-29",0,0],["2026-01-30",0,0],["2026-01-31",0,0],
      ["2026-02-01",0,0],["2026-02-02",10,2],["2026-02-03",0,0],["2026-02-04",0,0],["2026-02-05",0,0],["2026-02-06",0,0],["2026-02-07",0,0],
      ["2026-02-08",0,0],["2026-02-09",0,0],["2026-02-10",6,1],["2026-02-11",0,0],["2026-02-12",4,1],["2026-02-13",8,1],["2026-02-14",0,0],
      ["2026-02-15",0,0],["2026-02-16",0,0],["2026-02-17",0,0],["2026-02-18",0,0],["2026-02-19",0,0],["2026-02-20",0,0],["2026-02-21",0,0],
      ["2026-02-22",0,0],["2026-02-23",0,0],["2026-02-24",0,0],["2026-02-25",0,0],["2026-02-26",0,0],["2026-02-27",4,1],["2026-02-28",3,1],
      ["2026-03-01",0,0],["2026-03-02",0,0],["2026-03-03",2,1],["2026-03-04",0,0],["2026-03-05",0,0],["2026-03-06",0,0],["2026-03-07",0,0],
      ["2026-03-08",0,0],["2026-03-09",0,0],["2026-03-10",0,0],["2026-03-11",0,0],["2026-03-12",15,2],["2026-03-13",10,2],["2026-03-14",1,1],
      ["2026-03-15",0,0],["2026-03-16",0,0],["2026-03-17",0,0],["2026-03-18",0,0],["2026-03-19",0,0],["2026-03-20",0,0],["2026-03-21",0,0],
      ["2026-03-22",0,0],["2026-03-23",0,0],["2026-03-24",0,0],["2026-03-25",0,0],["2026-03-26",0,0],["2026-03-27",0,0],["2026-03-28",0,0],
      ["2026-03-29",0,0],["2026-03-30",0,0],["2026-03-31",2,1],["2026-04-01",4,1],["2026-04-02",13,2],["2026-04-03",0,0],["2026-04-04",0,0],
      ["2026-04-05",3,1],["2026-04-06",0,0],["2026-04-07",0,0],["2026-04-08",0,0],["2026-04-09",0,0],["2026-04-10",0,0],["2026-04-11",0,0],
      ["2026-04-12",0,0],["2026-04-13",1,1],["2026-04-14",0,0],["2026-04-15",0,0],["2026-04-16",0,0],["2026-04-17",1,1],["2026-04-18",2,1],
      ["2026-04-19",3,1],["2026-04-20",0,0],["2026-04-21",0,0],["2026-04-22",0,0],["2026-04-23",0,0],["2026-04-24",0,0],["2026-04-25",0,0],
      ["2026-04-26",0,0],["2026-04-27",22,3],["2026-04-28",10,2],["2026-04-29",1,1],["2026-04-30",0,0],["2026-05-01",0,0],["2026-05-02",0,0],
      ["2026-05-03",2,1],["2026-05-04",0,0],["2026-05-05",0,0],["2026-05-06",0,0],["2026-05-07",0,0],["2026-05-08",0,0],["2026-05-09",0,0],
      ["2026-05-10",1,1],["2026-05-11",0,0],["2026-05-12",0,0],["2026-05-13",30,4],["2026-05-14",0,0],["2026-05-15",0,0],["2026-05-16",0,0],
      ["2026-05-17",0,0],["2026-05-18",0,0],["2026-05-19",0,0],["2026-05-20",22,3],["2026-05-21",0,0],["2026-05-22",0,0],["2026-05-23",0,0],
      ["2026-05-24",0,0],["2026-05-25",4,1],["2026-05-26",0,0],["2026-05-27",0,0],["2026-05-28",1,1],["2026-05-29",0,0],["2026-05-30",0,0],
      ["2026-05-31",0,0],["2026-06-01",0,0],["2026-06-02",0,0],["2026-06-03",0,0],["2026-06-04",0,0],["2026-06-05",0,0],["2026-06-06",0,0],
      ["2026-06-07",4,1],["2026-06-08",0,0],["2026-06-09",10,2],["2026-06-10",94,4],["2026-06-11",32,4],["2026-06-12",20,3],["2026-06-13",6,1],
      ["2026-06-14",2,1],["2026-06-15",12,2],["2026-06-16",6,1],["2026-06-17",4,1],["2026-06-18",0,0],["2026-06-19",0,0],["2026-06-20",0,0],
      ["2026-06-21",0,0],["2026-06-22",0,0],["2026-06-23",0,0],["2026-06-24",0,0],["2026-06-25",0,0],["2026-06-26",2,1],["2026-06-27",22,3],
      ["2026-06-28",0,0],["2026-06-29",0,0],["2026-06-30",0,0],["2026-07-01",0,0],["2026-07-02",0,0],["2026-07-03",0,0],["2026-07-04",0,0],
      ["2026-07-05",0,0],["2026-07-06",0,0],["2026-07-07",0,0],["2026-07-08",0,0],["2026-07-09",0,0],["2026-07-10",0,0],["2026-07-11",0,0],
      ["2026-07-12",0,0],["2026-07-13",0,0],["2026-07-14",0,0],["2026-07-15",0,0],["2026-07-16",0,0],["2026-07-17",0,0],["2026-07-18",0,0],
      ["2026-07-19",0,0],["2026-07-20",0,0],["2026-07-21",0,0],["2026-07-22",0,0],["2026-07-23",0,0],["2026-07-24",0,0],["2026-07-25",0,0],
      ["2026-07-26",0,0],["2026-07-27",0,0],["2026-07-28",0,0],["2026-07-29",0,0],["2026-07-30",0,0],["2026-07-31",0,0],["2026-08-01",0,0],
      ["2026-08-02",0,0],["2026-08-03",5,1],["2026-08-04",8,1],["2026-08-05",34,4],["2026-08-06",0,0],["2026-08-07",0,0],["2026-08-08",2,1],
      ["2026-08-09",1,1],["2026-08-10",0,0],["2026-08-11",0,0],["2026-08-12",0,0],["2026-08-13",0,0],["2026-08-14",0,0],["2026-08-15",0,0],
      ["2026-08-16",0,0],["2026-08-17",0,0],["2026-08-18",0,0],["2026-08-19",0,0],["2026-08-20",0,0],["2026-08-21",0,0],["2026-08-22",0,0],
      ["2026-08-23",0,0],["2026-08-24",0,0],["2026-08-25",0,0],["2026-08-26",0,0],["2026-08-27",0,0],["2026-08-28",0,0],["2026-08-29",1,1],
      ["2026-08-30",3,1]
    ];

    const renderContributions = (contributions, total) => {
      if (heatTotal && total) {
        heatTotal.textContent = `${total} CONTRIBUTIONS IN THE LAST YEAR`;
      }

      heat.innerHTML = "";
      if (heatMonths) heatMonths.innerHTML = "";

      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const totalWeeks = Math.ceil(contributions.length / 7);
      let lastMonth = -1;
      let lastMonthWeek = -99;

      // Render month header row across the weeks
      if (heatMonths) {
        for (let w = 0; w < totalWeeks; w++) {
          const firstDayOfW = contributions[w * 7];
          const span = document.createElement("span");
          if (firstDayOfW) {
            const date = new Date(firstDayOfW.date || firstDayOfW[0]);
            const m = date.getMonth();
            if (m !== lastMonth && (w - lastMonthWeek) >= 3 && (totalWeeks - w) >= 2) {
              span.textContent = monthNames[m];
              lastMonth = m;
              lastMonthWeek = w;
            } else {
              span.textContent = "";
            }
          }
          heatMonths.appendChild(span);
        }
      }

      // Render cells
      const frag = document.createDocumentFragment();
      contributions.forEach((item, idx) => {
        const dateStr = item.date || item[0];
        const count = item.count !== undefined ? item.count : item[1];
        const level = item.level !== undefined ? item.level : item[2];

        const dateObj = new Date(dateStr);
        const formattedDate = dateObj.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

        const cell = document.createElement("span");
        cell.className = "cell";
        if (level > 0) cell.dataset.l = level;

        const countText = count === 0 ? "No contributions" : `${count} contribution${count === 1 ? "" : "s"}`;
        cell.title = `${countText} on ${formattedDate}`;
        cell.style.setProperty("--cd", `${Math.min(1.4, idx * 0.0016)}s`);
        frag.appendChild(cell);
      });

      heat.appendChild(frag);
      heat.classList.add("in");
    };

    // Render real baseline snapshot immediately
    renderContributions(REAL_SNAPSHOT, 521);

    // Asynchronously fetch live contributions from public GitHub calendar APIs
    fetch("https://github-contributions-api.jogruber.de/v4/korrakiran?y=last")
      .then((res) => {
        if (!res.ok) throw new Error("Network error");
        return res.json();
      })
      .then((data) => {
        if (data && data.contributions && data.contributions.length) {
          const total = data.total && data.total.lastYear ? data.total.lastYear : data.contributions.reduce((acc, c) => acc + (c.count || 0), 0);
          renderContributions(data.contributions, total);
        }
      })
      .catch(() => {
        // Silently use the loaded REAL_SNAPSHOT if network is restricted
      });
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
            const subject = encodeURIComponent(`Portfolio contact from ${name}`);
            const body = encodeURIComponent(`${msg}\n\nFrom ${name}\n${email}`);
            window.location.href = `mailto:kirankorra831@gmail.com?subject=${subject}&body=${body}`;
          }, 1200);
        } finally {
          if (submitBtn) submitBtn.disabled = false;
        }
      } else {
        const subject = encodeURIComponent(`Portfolio contact from ${name}`);
        const body = encodeURIComponent(`${msg}\n\nFrom ${name}\n${email}`);
        window.location.href = `mailto:kirankorra831@gmail.com?subject=${subject}&body=${body}`;
        status.classList.remove("err");
        status.textContent = "// OPENING YOUR MAIL CLIENT, TALK SOON";
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
          const subject = encodeURIComponent("Notify me: first story drop");
          const body = encodeURIComponent(`Hi Kiran,\n\nPlease ping me when the first story goes live.\n\n${email}`);
          window.location.href = `mailto:kirankorra831@gmail.com?subject=${subject}&body=${body}`;
          if (btn) {
            btn.innerHTML = prevHtml;
            btn.disabled = false;
          }
        }
      } else {
        const subject = encodeURIComponent("Notify me: first story drop");
        const body = encodeURIComponent(`Hi Kiran,\n\nPlease ping me when the first story goes live.\n\n${email}`);
        window.location.href = `mailto:kirankorra831@gmail.com?subject=${subject}&body=${body}`;
      }
    });
  }

  /* ---------- project category filtering ---------- */
  const filters = [...document.querySelectorAll("[data-filter]")];
  const projCards = [...document.querySelectorAll(".case, .entry, .dish, .build, .work, .proj-card, .flagship, .proj-featured")];
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

  /* ---------- year ---------- */
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();

