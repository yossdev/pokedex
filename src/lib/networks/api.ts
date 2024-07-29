"use server";
import { cache } from "@solidjs/router";
import { createPromiseClient } from "@connectrpc/connect";
import {
  createConnectTransport,
  createGrpcWebTransport,
} from "@connectrpc/connect-web";
import { GreetService } from "./pub/gen/greet/v1/greet_connect";

export const getPokemons = cache(async (offset = 0) => {
  // "use server";
  try {
    const pokemons = await fetchJson(
      `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=20`
    );

    // console.log("error pokemon");
    // const rpcResp = await connectClient();
    // const rpcResp = await connectWithGRPCClient();
    // console.log(rpcResp);

    const pokemonsWithDetails = await Promise.allSettled(
      pokemons.results.map(
        async ({ url }: { url: string }) => await fetchJson(url)
      )
    );

    // console.log(pokemonsWithDetails);
    console.log("--------------- DONE ------------");

    return pokemonsWithDetails;
    // return pokemonsWithDetails.map((p) => {
    //   return { name: p.name };
    // });
  } catch (error) {
    console.log(error);
    throw new Error(`Server Error: ${error}`);
  }
}, "pokemons");

async function fetchJson(url: string) {
  // if (url === "https://pokeapi.co/api/v2/pokemon?offset=0&limit=20") {
  //   throw new Error("Simulated error");
  // }
  // if (url === "https://pokeapi.co/api/v2/pokemon/18/") {
  //   throw new Error("Simulated error");
  // }
  console.log("fetch");
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`HTTP error!, Status: ${res.status}`);
    }
    const data = await res.json();
    return data;
  } catch (e) {
    console.log(e);
    throw e;
  }
}

async function connectClient() {
  const transport = createConnectTransport({
    baseUrl: "http://localhost:8080",
    useBinaryFormat: true,
  });
  const client = createPromiseClient(GreetService, transport);
  const request = { name: "Jason" };
  const response = await client.greet(request);

  return response;
}

async function connectWithGRPCClient() {
  const transport = createConnectTransport({
    baseUrl: "http://127.0.0.1:8081",
  });
  const client = createPromiseClient(GreetService, transport);
  const request = { name: "Jason2" };
  const response = await client.greet(request);

  return response;
}
