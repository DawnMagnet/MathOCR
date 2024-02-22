/* eslint-disable qwik/no-use-visible-task */
import {
  component$,
  useVisibleTask$,
  useStore,
  useStylesScoped$,
} from "@builder.io/qwik";
import { type DocumentHead } from "@builder.io/qwik-city";
import styles from "./app.css?inline";
import FileUploader from "~/components/file-upload/file-uploader";
export default component$(() => {
  useStylesScoped$(styles);
  // let reader = new FileReader();
  // reader.onload = (event) => {
  //   console.log(event.target.result);
  // };

  const state = useStore({
    count: 0,
    number: 20,
  });

  useVisibleTask$(({ cleanup }) => {
    const timeout = setTimeout(() => (state.count = 1), 500);
    cleanup(() => clearTimeout(timeout));

    const internal = setInterval(() => state.count++, 7000);
    cleanup(() => clearInterval(internal));
  });

  // const dropzone = new Dropzone("div#myId", { url: "/file/post" });

  return (
    <div class="container container-center">
      <div role="presentation" class="ellipsis"></div>
      <FileUploader />
      {/* <h1>
        <span class="highlight">Generate</span> Flowers
      </h1>
      <input
        class="input"
        type="range"
        value={state.number}
        max={50}
        onInput$={(ev, el) => {
          state.number = el.valueAsNumber;
        }}
      />
      <div
        style={{
          "--state": `${state.count * 0.1}`,
        }}
        class={{
          host: true,
          pride: loc.url.searchParams.get("pride") === "true",
        }}
      >
        {Array.from({ length: state.number }, (_, i) => (
          <div
            key={i}
            class={{
              square: true,
              odd: i % 2 === 0,
            }}
            style={{ "--index": `${i + 1}` }}
          />
        )).reverse()}
      </div> */}
    </div>
  );
});

export const head: DocumentHead = {
  title: "MathOCR-应用",
};
