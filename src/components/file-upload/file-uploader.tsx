/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable qwik/no-use-visible-task */
// import { useDocumentHead, useLocation } from "@builder.io/qwik-city";
import {
  component$,
  useVisibleTask$,
  useSignal,
  useStore,
} from "@builder.io/qwik";
import styles from "./file-uploader.module.css";
import clipboard from "clipboardy";
// import "bytemd/dist/index.css";
// import Stackedit from "stackedit-js";
// import gfm from "@bytemd/plugin-gfm";
// import { Editor, Viewer } from "bytemd";
// import "cherry-markdown/dist/cherry-markdown.css";
import katex from "katex";
import "katex/dist/katex.min.css";
import * as monaco from "monaco-editor";

export default component$(() => {
  const draggableRef = useSignal<HTMLElement>();
  const fileinputRef = useSignal<HTMLInputElement>();
  const katex_string = useStore({
    t: "f(x)=-\\frac{-b\\pm\\sqrt{b^2-4ac}}{2a}",
  });
  const katex_ref = useSignal<HTMLElement>();

  useVisibleTask$(({ cleanup }) => {
    const editor = monaco.editor.create(document.getElementById("monaco")!, {
      value: katex_string.t, //编辑器初始显示文字
      language: "latex", //语言支持自行查阅demo
      automaticLayout: true, //自动布局
      theme: "vs-dark", //官方自带三种主题vs, hc-black, or vs-dark
    });
    const fetch_result = async (f: File) => {
      const url = "";
      const form = new FormData();
      form.append("file", f);

      const options = { method: "POST", body: form };
      try {
        const response = await fetch(url, options);
        const data = await response.text();
        katex_string.t = data
          .substring(1, data.length - 1)
          .replaceAll("\\\\", "\\");
        editor.setValue(katex_string.t);
        // editor
        katex_ref.value!.innerHTML = katex.renderToString(katex_string.t, {
          throwOnError: false,
          output: "html",
          displayMode: true,
        });
        // eslint-disable-next-line qwik/valid-lexical-scope
        // cherryInstance.setValue(`$$\n${data}\n$$`);
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };

    editor.getModel()!.onDidChangeContent((_) => {
      // console.log("changed!");
      katex_string.t = editor.getValue();
      katex_ref.value!.innerHTML = katex.renderToString(katex_string.t, {
        throwOnError: false,
        output: "html",
        displayMode: true,
      });
    });
    katex_ref.value!.innerHTML = katex.renderToString(katex_string.t, {
      throwOnError: false,
      output: "html",
      displayMode: true,
    });

    if (fileinputRef.value) {
      fileinputRef.value.addEventListener("change", (event) => {
        const fileInput = document.getElementById(
          "file-input"
        ) as HTMLInputElement;
        const file = fileInput.files![0];
        console.log(file);
        fetch_result(file);
      });
    }
    if (draggableRef.value) {
      // Use the DOM API to add an event listener.
      const draghandler = (event: DragEvent) => {
        console.log(event.type);
        event.preventDefault();
        if (event.type === "drop") {
          // 文件进入并松开鼠标,文件边框恢复正常
          draggableRef.value!.style.borderColor = "#a89b9b";
          const files = event.dataTransfer!.files;
          if (files.length > 1) {
            alert("最多只能上传一个文件");
            return;
          }
          const file = files[0];
          fetch_result(file);
        } else if (event.type === "dragleave") {
          // 离开时边框恢复
          draggableRef.value!.style.borderColor = "#a89b9b";
        } else {
          // 进入边框变为红色
          draggableRef.value!.style.borderColor = "red";
        }
      };

      draggableRef.value!.addEventListener("dragstart", draghandler);
      draggableRef.value!.addEventListener("dragenter", draghandler);
      draggableRef.value!.addEventListener("drop", draghandler);
      draggableRef.value!.addEventListener("dragover", draghandler);
      draggableRef.value!.addEventListener("dragend", draghandler);
      draggableRef.value!.addEventListener("dragleave", draghandler);

      cleanup(() => {
        draggableRef.value!.removeEventListener("dragstart", draghandler);
        draggableRef.value!.removeEventListener("dragenter", draghandler);
        draggableRef.value!.removeEventListener("drop", draghandler);
        draggableRef.value!.removeEventListener("dragend", draghandler);
        draggableRef.value!.removeEventListener("dragover", draghandler);
        draggableRef.value!.removeEventListener("dragleave", draghandler);
      });
    }
  });

  return (
    <div>
      <div class={styles["main"]} ref={draggableRef}>
        <p class={styles["drop-text"]}>
          拖拽文件到此上传文件/
          <span onClick$={() => fileinputRef.value!.click()}>点击上传</span>
        </p>
        <input
          id="file-input"
          type="file"
          style={"display: none"}
          ref={fileinputRef}
        ></input>
        <div id="drop" class={styles["dropbox"]}></div>
      </div>
      <div class={styles["editorandpreview"]}>
        <div id="monaco" class={styles["monaco"]}></div>
        <div ref={katex_ref}></div>
        <button onClick$={() => clipboard.write(katex_string.t)}>
          复制Latex公式
        </button>
        <button
          onClick$={() =>
            clipboard.write(
              katex.renderToString(katex_string.t, {
                throwOnError: false,
                output: "mathml",
                displayMode: true,
              })
            )
          }
        >
          复制Word公式
        </button>
        <button onClick$={() => clipboard.write(katex_ref.value!.innerHTML)}>
          复制HTML
        </button>
      </div>
    </div>
  );
});
