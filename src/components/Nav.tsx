import { A } from "@solidjs/router";
import { For } from "solid-js";

export default function Nav() {
  const navs = [
    {
      path: "/",
      name: "Home",
    },
    {
      path: "/collection",
      name: "Collection",
    },
  ];

  return (
    <nav class="mx-auto px-10">
      <ul class="flex gap-7">
        <For each={navs}>
          {(nav) => (
            <li>
              <A href={nav.path} activeClass="underline" end>
                {nav.name}
              </A>
            </li>
          )}
        </For>
      </ul>
    </nav>
  );
}
