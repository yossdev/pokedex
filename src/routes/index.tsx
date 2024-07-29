import { Title } from "@solidjs/meta";
import {
  A,
  RouteDefinition,
  RouteSectionProps,
  createAsync,
} from "@solidjs/router";
import {
  ErrorBoundary,
  For,
  Match,
  Suspense,
  Switch,
  createEffect,
} from "solid-js";
import { getPokemons } from "~/lib/networks/api";

export const route = {
  load: ({ location }) => getPokemons(+location.query.offset || 0),
} satisfies RouteDefinition;

export default function Home(props: RouteSectionProps) {
  const offset = () => +props.location.query.offset || 0;
  const pokemonsWithDetails = createAsync(() => getPokemons(offset()));

  console.log("server");
  createEffect(() => console.log("effect"));
  return (
    <div>
      <Title>Home</Title>
      <a href={`?offset=${offset() + 20}`}>Next</a>
      <ErrorBoundary fallback={<div>Something went wrong!</div>}>
        <Suspense fallback={<div>Loading... Index</div>}>
          <For each={pokemonsWithDetails()}>
            {(pokemon) => (
              <Switch>
                <Match when={pokemon.status === "fulfilled"}>
                  <div>{pokemon.value.name}</div>
                </Match>
                <Match when={pokemon.status === "rejected"}>
                  <div>{pokemon.reason.toString()}</div>
                </Match>
              </Switch>
            )}
          </For>
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
