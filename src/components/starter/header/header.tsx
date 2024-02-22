import { component$ } from "@builder.io/qwik";

import styles from "./header.module.css";
import PiLogo from "../icons/logo.png?jsx";

export default component$(() => {
  return (
    <header class={styles.header}>
      <div class={["container", styles.wrapper]}>
        <div class={styles.logo} style={"width:50%"}>
          <a href="/" title="">
            <PiLogo class={styles["pilogo-image"]} alt="PiLogo" />
          </a>
        </div>
        <ul>
          <li>
            <a
              href="https://qwik.builder.io/docs/components/overview/"
              target="_blank"
            >
              文档
            </a>
          </li>
          <li>
            <a
              href="https://qwik.builder.io/examples/introduction/hello-world/"
              target="_blank"
            >
              应用下载
            </a>
          </li>
          <li>
            <a
              href="https://qwik.builder.io/tutorial/welcome/overview/"
              target="_blank"
            >
              快速教程
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
});
