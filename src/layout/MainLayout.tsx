import { JSX } from "solid-js";
import Header from "~/components/Header";

export default function MainLayout(props: { children: JSX.Element }) {
  return (
    <>
      <Header />
      <main class="container">{props.children}</main>
    </>
  );
}
