document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('#menu-toggle');
  const links = document.querySelector('#navlinks');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    // Close the mobile menu after choosing a destination.
    links.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }
  document.querySelectorAll('[data-copy]').forEach(button => {
    button.addEventListener('click', async () => {
      const value = button.dataset.copy;
      try {
        await navigator.clipboard.writeText(value);
        button.textContent = 'কপি হয়েছে ✓';
      } catch {
        const input = document.createElement('textarea');
        input.value = value;
        document.body.appendChild(input);
        input.select();
        document.execCommand('copy');
        input.remove();
        button.textContent = 'কপি হয়েছে ✓';
      }
    });
  });
  document.querySelectorAll('[data-search]').forEach(input => {
    input.addEventListener('input', () => {
      const term = input.value.trim().toLocaleLowerCase();
      document.querySelectorAll('[data-filter-item]').forEach(item => {
        item.hidden = !item.textContent.toLocaleLowerCase().includes(term);
      });
    });
  });
  document.querySelectorAll('[data-demo-form]').forEach(form => {
    form.addEventListener('submit', event => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const result = form.querySelector('[data-form-result]');
      if (result) {
        result.hidden = false;
        result.textContent = 'ডেমো: তথ্য যাচাই হয়েছে, কিন্তু কোনো সার্ভারে পাঠানো বা সংরক্ষণ করা হয়নি। বাস্তবে অনুরোধ পাঠাতে নিরাপদ ব্যাকএন্ড সংযুক্ত করতে হবে।';
      }
    });
  });
});

// Local-only serial board demonstration. Never represents real hospital queue data.
document.addEventListener('DOMContentLoaded', () => {
  const department = document.querySelector('#queue-department');
  if (!department) return;

  const names = {
    medicine: 'মেডিসিন',
    cardiology: 'কার্ডিওলজি',
    pediatrics: 'শিশু বিভাগ',
    gynecology: 'গাইনি ও প্রসূতি'
  };
  const initial = { medicine: 1, cardiology: 1, pediatrics: 1, gynecology: 1 };
  const counters = { ...initial };
  const format = value => String(value).padStart(2, '0');

  function render() {
    const selected = department.value;
    const current = counters[selected];
    document.querySelector('#queue-current').textContent = format(current);
    document.querySelector('#queue-label').textContent = names[selected];
    document.querySelector('#queue-updated').textContent = 'এই সেশন';
    document.querySelector('#queue-waiting').textContent = 'অজানা';
    document.querySelector('#serial-result').textContent = 'সিরিয়াল নম্বর লিখে অবস্থা দেখুন।';
  }

  department.addEventListener('change', render);
  document.querySelector('#queue-next').addEventListener('click', () => {
    counters[department.value] += 1;
    render();
  });
  document.querySelector('#queue-reset').addEventListener('click', () => {
    counters[department.value] = 1;
    render();
  });
  document.querySelector('#check-serial').addEventListener('click', () => {
    const number = Number(document.querySelector('#my-serial').value);
    const result = document.querySelector('#serial-result');
    if (!Number.isInteger(number) || number < 1 || number > 999) {
      result.textContent = '১ থেকে ৯৯৯-এর মধ্যে একটি নমুনা সিরিয়াল দিন।';
      return;
    }
    const current = counters[department.value];
    if (number < current) result.textContent = 'ডেমো অনুযায়ী এই সিরিয়াল অতিক্রম করেছে।';
    else if (number === current) result.textContent = 'ডেমো অনুযায়ী আপনার সিরিয়াল চলছে।';
    else result.textContent = `ডেমো অনুযায়ী আপনার আগে ${number - current}টি সিরিয়াল রয়েছে। এটি অপেক্ষার সময়ের পূর্বাভাস নয়।`;
  });
  render();
});

/* AS-SHIFA GLOBAL ANIMATION SYSTEM */

(() => {
  function initializeAnimations() {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion) return;

    // Scroll reveal
    const elements = document.querySelectorAll(
      "main .section, main .card, main .split"
    );

    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("visible");
              observer.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.08,
          rootMargin: "0px 0px -25px 0px"
        }
      );

      elements.forEach((element) => {
        element.classList.add("reveal");
        observer.observe(element);
      });

      document.documentElement.classList.add(
        "js-reveal-ready"
      );
    }

    // Smooth page navigation
    document.addEventListener("click", (event) => {
      const link = event.target.closest("a[href]");

      if (!link) return;

      const url = new URL(link.href, location.href);

      // Ignore external links and special actions
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.ctrlKey ||
        event.metaKey ||
        event.shiftKey ||
        event.altKey ||
        link.hasAttribute("download") ||
        link.target === "_blank" ||
        url.origin !== location.origin ||
        url.pathname === location.pathname &&
          url.search === location.search ||
        !url.pathname.endsWith(".html")
      ) {
        return;
      }

      event.preventDefault();

      document.body.classList.add("page-leaving");

      setTimeout(() => {
        window.location.href = url.href;
      }, 220);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      initializeAnimations
    );
  } else {
    initializeAnimations();
  }

  // Reset transition after browser back navigation
  window.addEventListener("pageshow", () => {
    document.body.classList.remove("page-leaving");
  });
})();

/* Hospital photo slot manager */

document.addEventListener("DOMContentLoaded", () => {
  const slots = document.querySelectorAll(
    ".hospital-photo-slot"
  );

  slots.forEach((slot) => {
    const img = slot.querySelector("img");
    if (!img) return;

    const showImage = () => {
      slot.classList.add("has-image");
    };

    const showPlaceholder = () => {
      slot.classList.remove("has-image");
    };

    img.addEventListener("load", showImage);
    img.addEventListener("error", showPlaceholder);

    if (img.complete && img.naturalWidth > 0) {
      showImage();
    }

    if (!("IntersectionObserver" in window)) {
      slot.classList.add("in-view");
    }
  });

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    slots.forEach(slot => observer.observe(slot));
  }
});

/* DOCTOR IMAGE MANAGER */

document.addEventListener("DOMContentLoaded", () => {

  const doctorSlots = document.querySelectorAll(
    ".doctor-photo-slot"
  );

  doctorSlots.forEach((slot) => {

    const img = slot.querySelector("img");

    if (!img) return;

    function checkImage() {
      if (img.complete && img.naturalWidth > 0) {
        slot.classList.add("has-photo");
        console.log("Doctor image loaded:", img.src);
      } else {
        slot.classList.remove("has-photo");
      }
    }

    img.addEventListener("load", () => {
      slot.classList.add("has-photo");
    });

    img.addEventListener("error", () => {
      slot.classList.remove("has-photo");
      console.error("Doctor image NOT FOUND:", img.src);
    });

    checkImage();

  });

});
