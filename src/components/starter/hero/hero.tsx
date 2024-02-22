import { component$ } from "@builder.io/qwik";
import styles from "./hero.module.css";
import ImgThunder from "../../../media/mathground.png?jsx";
import { useNavigate } from "@builder.io/qwik-city";

export default component$(() => {
  const nav = useNavigate();
  return (
    <div class={["container", styles.hero]}>
      <ImgThunder class={styles["hero-image"]} alt="Image thunder" />
      <h1>
        将你从
        <span class="highlight">复杂的</span>
        <br />
        <span class="highlight">数学公式</span>
        解放出来
      </h1>
      <p>使用MathOCR轻松识别PDF/网页中的数学公式</p>
      <div class={styles["button-group"]}>
        <button
          onClick$={async () => {
            const defaults = {
              spread: 360,
              ticks: 70,
              gravity: 0,
              decay: 0.95,
              startVelocity: 30,
              colors: ["006ce9", "ac7ff4", "18b6f6", "713fc2", "ffffff"],
              origin: {
                x: 0.5,
                y: 0.35,
              },
            };

            function loadConfetti() {
              return new Promise<(opts: any) => void>((resolve, reject) => {
                if ((globalThis as any).confetti) {
                  return resolve((globalThis as any).confetti as any);
                }
                const script = document.createElement("script");
                script.src =
                  "https://cdn.jsdelivr.net/npm/canvas-confetti@1.5.1/dist/confetti.browser.min.js";
                script.onload = () =>
                  resolve((globalThis as any).confetti as any);
                script.onerror = reject;
                document.head.appendChild(script);
                script.remove();
              });
            }

            const confetti = await loadConfetti();

            function shoot() {
              confetti({
                ...defaults,
                particleCount: 80,
                scalar: 1.2,
              });

              confetti({
                ...defaults,
                particleCount: 60,
                scalar: 0.75,
              });
            }

            setTimeout(shoot, 0);
            setTimeout(shoot, 100);
            setTimeout(shoot, 200);
            setTimeout(shoot, 300);
            setTimeout(shoot, 400);
            setTimeout(() => {
              nav("/app");
            }, 300);
          }}
        >
          使用网页端
        </button>
        <a
          href="https://qwik.builder.io/docs"
          target="_blank"
          class="button button-dark"
        >
          浏览文档
        </a>
      </div>
    </div>
  );
});
