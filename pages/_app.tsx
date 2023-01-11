import "reflect-metadata"
import '../styles/globals.css'
import { container } from "tsyringe";
import type { AppProps } from 'next/app'
import { farService } from "../services/farService";

container.register("iFarService", farService);

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
